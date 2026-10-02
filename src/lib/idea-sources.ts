export type IdeaSource = {
  name: string;
  url: string;
};

export const IDEA_SOURCES: IdeaSource[] = [
  { name: "Daily Coffee News", url: "https://dailycoffeenews.com/feed/" },
  { name: "Sprudge", url: "https://sprudge.com/feed" },
  { name: "Perfect Daily Grind", url: "https://perfectdailygrind.com/feed/" },
];

export type FeedItem = {
  title: string;
  url: string;
  description: string;
  publishedAt: number;
  sourceName: string;
};

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num: string) => String.fromCodePoint(Number(num)))
    .replace(/\s+/g, " ")
    .trim();
}

function inner(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decode(match[1]) : "";
}

function itemLink(block: string) {
  const tags = [...block.matchAll(/<link\b([^>]*)\/?>([\s\S]*?)<\/link>|<link\b([^>]*)\/>/gi)];
  let fallback = "";
  for (const tag of tags) {
    const attrs = tag[1] || tag[3] || "";
    const href = attrs.match(/href=["']([^"']+)["']/i)?.[1];
    const rel = attrs.match(/rel=["']([^"']+)["']/i)?.[1] || "";
    const text = tag[2] ? decode(tag[2]) : "";
    const candidate = href || text;
    if (!candidate || rel.includes("self")) continue;
    if (!rel || rel.includes("alternate")) return candidate.trim();
    if (!fallback) fallback = candidate.trim();
  }
  return fallback || inner(block, "link") || inner(block, "id");
}

function publishedAt(block: string) {
  const raw = inner(block, "pubDate") || inner(block, "published") || inner(block, "updated") || inner(block, "dc:date");
  const time = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(time) ? 0 : time;
}

export function parseFeed(xml: string, sourceName: string): FeedItem[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  const items: FeedItem[] = [];
  for (const block of blocks) {
    const title = inner(block, "title");
    const url = itemLink(block);
    if (!title || !url) continue;
    const description = inner(block, "description") || inner(block, "summary");
    items.push({
      title,
      url,
      description: description.slice(0, 2000),
      publishedAt: publishedAt(block),
      sourceName,
    });
  }
  return items;
}

/** OpenAlex topic "Coffee research and impacts". Primary topic keeps side mentions out. */
const OPENALEX_TOPIC = "T11264";

export function abstractFromInvertedIndex(index: unknown) {
  if (!index || typeof index !== "object") return "";
  const words: string[] = [];
  for (const [word, positions] of Object.entries(index as Record<string, unknown>)) {
    if (!Array.isArray(positions)) continue;
    for (const position of positions) {
      if (typeof position === "number" && position >= 0 && position < 8000) words[position] = word;
    }
  }
  return words.filter((word) => word !== undefined).join(" ").replace(/\s+/g, " ").trim();
}

export function paperLink(doi: unknown, id: unknown) {
  if (typeof doi === "string" && doi.startsWith("https://")) return doi;
  if (typeof doi === "string" && doi.startsWith("10.")) return `https://doi.org/${doi}`;
  if (typeof id === "string" && id.startsWith("https://")) return id;
  return "";
}

export async function fetchOpenAlex(): Promise<FeedItem[]> {
  const url = new URL("https://api.openalex.org/works");
  url.searchParams.set("filter", `primary_topic.id:${OPENALEX_TOPIC},type:article,language:en,has_abstract:true`);
  url.searchParams.set("sort", "publication_date:desc");
  url.searchParams.set("per-page", "12");
  url.searchParams.set("select", "display_name,publication_date,doi,id,abstract_inverted_index");
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "CoffeeRamblerAdmin/1.0 (+https://www.coffeerambler.com)",
    },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`OpenAlex returned ${response.status}`);
  const payload = (await response.json()) as { results?: unknown };
  if (!Array.isArray(payload.results)) return [];
  const items: FeedItem[] = [];
  for (const row of payload.results) {
    if (!row || typeof row !== "object") continue;
    const paper = row as {
      display_name?: unknown;
      publication_date?: unknown;
      doi?: unknown;
      id?: unknown;
      abstract_inverted_index?: unknown;
    };
    const title = typeof paper.display_name === "string" ? paper.display_name.replace(/\s+/g, " ").trim() : "";
    const link = paperLink(paper.doi, paper.id);
    const description = abstractFromInvertedIndex(paper.abstract_inverted_index).slice(0, 2000);
    if (!title || !link || !description) continue;
    const publishedAt = typeof paper.publication_date === "string" ? Date.parse(paper.publication_date) : NaN;
    items.push({
      title,
      url: link,
      description,
      publishedAt: Number.isNaN(publishedAt) ? 0 : publishedAt,
      sourceName: "OpenAlex",
    });
  }
  return items;
}

export async function fetchSource(source: IdeaSource): Promise<FeedItem[]> {
  const response = await fetch(source.url, {
    headers: {
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      "User-Agent": "CoffeeRamblerAdmin/1.0 (+https://www.coffeerambler.com)",
    },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`${source.name} returned ${response.status}`);
  const xml = (await response.text()).slice(0, 1_000_000);
  return parseFeed(xml, source.name);
}
