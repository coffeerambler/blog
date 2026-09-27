function fileKey(src: string) {
  try {
    const path = src.split("?")[0].split("#")[0];
    const slash = path.lastIndexOf("/");
    return (slash >= 0 ? path.slice(slash + 1) : path).toLowerCase();
  } catch {
    return src.toLowerCase();
  }
}

function sameFile(a: string, b: string) {
  if (!a || !b) return false;
  const left = a.split("?")[0].replace(/\/+$/, "").toLowerCase();
  const right = b.split("?")[0].replace(/\/+$/, "").toLowerCase();
  return left === right || fileKey(a) === fileKey(b);
}

function normaliseWords(value: string) {
  return value
    .replace(/^\*+|\*+$/g, "")
    .replace(/[_]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function restatesTitle(line: string, title: string, alt: string) {
  const text = normaliseWords(line);
  if (!text || text.length > 90) return false;
  const words = text.split(" ").filter(Boolean);
  if (words.length > 10) return false;
  const t = normaliseWords(title);
  const a = normaliseWords(alt);
  if (text === t || (a && text === a)) return true;
  if (words.length >= 2 && (t.startsWith(text) || t.includes(text))) return true;
  const head = normaliseWords(title.split(/[-–—:|]/)[0] || title);
  if (head && words.length <= 8 && (text === head || text.startsWith(`${head} by `))) return true;
  return false;
}

const IMAGE = /!\[([^\]]*)\]\(([^)]+)\)/;

/** Drop the first markdown image when it is the same file as the post cover. */
export function stripDuplicateCoverImage(markdown: string, coverImage?: string | null, title = "") {
  if (!coverImage || !markdown) return markdown;
  const match = markdown.match(IMAGE);
  if (!match || match.index === undefined) return markdown;
  if (!sameFile(match[2], coverImage)) return markdown;

  const alt = match[1] || "";
  const head = markdown.slice(0, match.index).trimEnd();
  let tail = markdown.slice(match.index + match[0].length).replace(/^\s+/, "");

  const caption = tail.match(/^([^\n]+)\n*/);
  if (caption && restatesTitle(caption[1].trim(), title, alt)) {
    tail = tail.slice(caption[0].length).replace(/^\s+/, "");
  }

  if (!head) return tail;
  if (!tail) return head;
  return `${head}\n\n${tail}`;
}

function isParagraph(block: string) {
  const trim = block.trim();
  if (!trim) return false;
  if (/^#{1,6}\s/.test(trim)) return false;
  if (/^!\[/.test(trim)) return false;
  if (/^[-*+]\s/.test(trim)) return false;
  if (/^\d+\.\s/.test(trim)) return false;
  if (/^>/.test(trim)) return false;
  if (/^```/.test(trim)) return false;
  return true;
}

/** Split markdown after `count` paragraphs so an ad can sit in the article, not under the hero. */
export function splitMarkdownAfterParagraphs(markdown: string, count = 2): { lead: string; rest: string } {
  const trimmed = markdown.trim();
  if (!trimmed) return { lead: "", rest: "" };
  const blocks = trimmed.split(/\n{2,}/);
  let seen = 0;
  let at = blocks.length;
  for (let i = 0; i < blocks.length; i++) {
    if (isParagraph(blocks[i])) {
      seen += 1;
      if (seen >= count) {
        at = i + 1;
        break;
      }
    }
  }
  if (at >= blocks.length) return { lead: trimmed, rest: "" };
  return {
    lead: blocks.slice(0, at).join("\n\n"),
    rest: blocks.slice(at).join("\n\n"),
  };
}

export type GalleryItem = { src: string; alt: string; caption: string };

export type MarkdownSegment =
  | { type: "markdown"; text: string }
  | { type: "gallery"; items: GalleryItem[] };

function isShortCaption(text: string) {
  const t = text
    .trim()
    .replace(/^\*+|\*+$/g, "")
    .trim();
  if (!t) return false;
  if (/^#{1,6}\s/.test(t) || /^!\[/.test(t)) return false;
  const words = t.split(/\s+/).filter(Boolean);
  return words.length <= 12;
}

const IMAGE_UNIT = /(?:[-*+]\s+)?!\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * Group consecutive (or near-consecutive, short-caption-only) markdown images
 * into gallery segments. Lone figures stay as ordinary markdown.
 */
export function segmentMarkdownGalleries(markdown: string): MarkdownSegment[] {
  const source = markdown.replace(/\n​\n/g, "\n\n").replace(/^​$/gm, "");
  if (!source.trim()) return [];

  const units: { start: number; end: number; src: string; alt: string; caption: string }[] = [];
  IMAGE_UNIT.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = IMAGE_UNIT.exec(source))) {
    const start = match.index;
    const imgEnd = start + match[0].length;
    const rest = source.slice(imgEnd);
    const capMatch = rest.match(
      /^(?:[ \t]*\r?\n){1,2}[ \t]*(?![-*+][ \t]*!\[)(?!#{1,6}\s)(?!!\[)([^\n]+)/,
    );
    let caption = "";
    let end = imgEnd;
    if (capMatch && isShortCaption(capMatch[1])) {
      caption = capMatch[1].trim().replace(/^\*+|\*+$/g, "").trim();
      end = imgEnd + capMatch[0].length;
    }
    units.push({ start, end, src: match[2], alt: match[1], caption });
  }

  const groups: (typeof units)[] = [];
  let current: typeof units = [];
  for (const unit of units) {
    if (!current.length) {
      current.push(unit);
      continue;
    }
    const prev = current[current.length - 1];
    const gap = source.slice(prev.end, unit.start);
    if (gap.trim() === "") current.push(unit);
    else {
      groups.push(current);
      current = [unit];
    }
  }
  if (current.length) groups.push(current);

  const galleries = groups.filter((group) => group.length >= 2);
  if (!galleries.length) return [{ type: "markdown", text: source }];

  const segments: MarkdownSegment[] = [];
  let cursor = 0;
  for (const group of galleries) {
    const from = group[0].start;
    const to = group[group.length - 1].end;
    const before = source.slice(cursor, from).trim();
    if (before) segments.push({ type: "markdown", text: before });
    segments.push({
      type: "gallery",
      items: group.map((unit) => ({ src: unit.src, alt: unit.alt, caption: unit.caption })),
    });
    cursor = to;
  }
  const after = source.slice(cursor).trim();
  if (after) segments.push({ type: "markdown", text: after });
  return segments;
}
