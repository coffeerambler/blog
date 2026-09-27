export type BrewImage = {
  src: string;
  alt: string;
  href?: string;
};

export type BrewSpec = {
  label: string;
  value: string;
};

export type BrewStep = {
  n: string;
  title: string;
  markdown: string;
};

export type BrewBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "rich"; markdown: string }
  | { type: "image"; image: BrewImage }
  | { type: "specs"; items: BrewSpec[] }
  | { type: "need"; items: string[] }
  | { type: "steps"; steps: BrewStep[] }
  | { type: "back"; href: string; text: string };

const ZW = /[\u200b\u200c\u200d\ufeff]/g;

function stripZw(value: string) {
  return value.replace(ZW, "");
}

function isBlank(line: string) {
  return !stripZw(line).trim();
}

const LINKED_IMAGE = /^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/;
const IMAGE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const SPEC = /^(Brew time|Brew Ratio|Water Temp)\s*\|\s*(.+)$/i;
const H1 = /^#\s+(.+)$/;
const H2 = /^##\s+(.+)$/;
const H5 = /^#{3,6}\s+(.*)$/;
const MD_LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

function parseImage(line: string): BrewImage | null {
  const linked = line.match(LINKED_IMAGE);
  if (linked) return { alt: linked[1], src: linked[2], href: linked[3] };
  const plain = line.match(IMAGE);
  if (plain) return { alt: plain[1], src: plain[2] };
  return null;
}

function headingText(line: string) {
  const h5 = line.match(H5);
  return h5 ? stripZw(h5[1]).trim() : "";
}

export function parseBrewGuide(markdown: string): BrewBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: BrewBlock[] = [];
  let i = 0;

  const skipBlank = () => {
    while (i < lines.length && isBlank(lines[i])) i += 1;
  };

  while (i < lines.length) {
    const raw = lines[i];
    if (isBlank(raw)) {
      i += 1;
      continue;
    }
    const line = stripZw(raw).trimEnd();

    const h1 = line.match(H1);
    if (h1) {
      blocks.push({ type: "h1", text: stripZw(h1[1]).trim() });
      i += 1;
      continue;
    }

    const h2 = line.match(H2);
    if (h2) {
      blocks.push({ type: "h2", text: stripZw(h2[1]).trim() });
      i += 1;
      continue;
    }

    const image = parseImage(line.trim());
    if (image) {
      blocks.push({ type: "image", image });
      i += 1;
      continue;
    }

    const spec = line.trim().match(SPEC);
    if (spec) {
      const items: BrewSpec[] = [];
      while (i < lines.length) {
        if (isBlank(lines[i])) {
          i += 1;
          continue;
        }
        const next = stripZw(lines[i]).trim().match(SPEC);
        if (!next) break;
        items.push({ label: next[1], value: next[2].trim() });
        i += 1;
      }
      blocks.push({ type: "specs", items });
      continue;
    }

    if (/^you'll need/i.test(line.trim())) {
      i += 1;
      const items: string[] = [];
      while (i < lines.length) {
        if (isBlank(lines[i])) {
          i += 1;
          continue;
        }
        const peek = stripZw(lines[i]).trim();
        if (
          peek.startsWith("#") ||
          parseImage(peek) ||
          SPEC.test(peek) ||
          /^remember these are guidelines/i.test(peek)
        ) {
          break;
        }
        items.push(peek);
        i += 1;
      }
      blocks.push({ type: "need", items });
      continue;
    }

    const h5 = line.match(H5);
    if (h5) {
      const text = stripZw(h5[1]).trim();
      const link = text.match(MD_LINK);
      if (link) {
        blocks.push({ type: "back", href: link[2], text: link[1] });
        i += 1;
        continue;
      }
      if (/^\d+$/.test(text)) {
        const steps: BrewStep[] = [];
        while (i < lines.length) {
          skipBlank();
          if (i >= lines.length) break;
          const numLine = headingText(lines[i]);
          if (!/^\d+$/.test(numLine)) break;
          const n = numLine;
          i += 1;
          skipBlank();
          while (i < lines.length && isBlank(lines[i])) i += 1;
          while (i < lines.length && headingText(lines[i]) === "") i += 1;
          skipBlank();
          let title = "";
          if (i < lines.length && lines[i].match(H5) && !/^\d+$/.test(headingText(lines[i]))) {
            const maybe = headingText(lines[i]);
            if (maybe.match(MD_LINK)) break;
            title = maybe;
            i += 1;
          }
          const body: string[] = [];
          while (i < lines.length) {
            if (isBlank(lines[i])) {
              body.push("");
              i += 1;
              continue;
            }
            const nxt = stripZw(lines[i]).trim();
            if (nxt.match(H1) || nxt.match(H2) || nxt.match(H5)) break;
            body.push(lines[i]);
            i += 1;
          }
          steps.push({
            n,
            title,
            markdown: body.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
          });
        }
        if (steps.length) blocks.push({ type: "steps", steps });
        continue;
      }
      blocks.push({ type: "h2", text });
      i += 1;
      continue;
    }

    const rich: string[] = [];
    while (i < lines.length) {
      if (isBlank(lines[i])) {
        rich.push("");
        i += 1;
        const j = i;
        skipBlank();
        if (i >= lines.length) break;
        const nxt = stripZw(lines[i]).trim();
        if (
          nxt.match(H1) ||
          nxt.match(H2) ||
          nxt.match(H5) ||
          parseImage(nxt) ||
          SPEC.test(nxt) ||
          /^you'll need/i.test(nxt)
        ) {
          i = j;
          break;
        }
        continue;
      }
      const nxt = stripZw(lines[i]).trim();
      if (
        nxt.match(H1) ||
        nxt.match(H2) ||
        nxt.match(H5) ||
        parseImage(nxt) ||
        SPEC.test(nxt) ||
        /^you'll need/i.test(nxt)
      ) {
        break;
      }
      rich.push(lines[i]);
      i += 1;
    }
    const markdown = rich.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    if (markdown) blocks.push({ type: "rich", markdown });
  }

  return blocks;
}
