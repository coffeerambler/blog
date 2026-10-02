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

const SEARCH_STOP = new Set(["and", "or", "not"]);

/** Keep a short list of words. Punctuation and query words are dropped so they cannot change the search. */
export function ideaSearchWords(raw: string) {
  return raw
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((word) => word && !SEARCH_STOP.has(word.toLowerCase()))
    .join(" ")
    .slice(0, 80);
}

function plainText(value: string) {
  return decode(decode(value)).slice(0, 2000);
}

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

export async function fetchOpenAlex(words = ""): Promise<FeedItem[]> {
  const url = new URL("https://api.openalex.org/works");
  url.searchParams.set("filter", `primary_topic.id:${OPENALEX_TOPIC},type:article,language:en,has_abstract:true`);
  url.searchParams.set("sort", "publication_date:desc");
  url.searchParams.set("per-page", "12");
  url.searchParams.set("select", "display_name,publication_date,doi,id,abstract_inverted_index");
  if (words) url.searchParams.set("search", words);
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

function europePmcQuery(words: string) {
  const coffee = `(TITLE:"coffea" OR TITLE:"coffee bean" OR TITLE:"arabica" OR TITLE:"robusta" OR ABSTRACT:"Coffea arabica" OR ABSTRACT:"coffee fermentation") AND HAS_ABSTRACT:Y AND LANG:eng`;
  if (!words) return coffee;
  const terms = words
    .split(" ")
    .filter(Boolean)
    .map((word) => `(TITLE:"${word}" OR ABSTRACT:"${word}")`)
    .join(" AND ");
  return `(${coffee}) AND (${terms})`;
}

/** Europe PMC is the open archive behind PubMed. The coffee terms keep stray medical papers out. */
export async function fetchEuropePmc(words = ""): Promise<FeedItem[]> {
  const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
  url.searchParams.set("query", europePmcQuery(words));
  url.searchParams.set("format", "json");
  url.searchParams.set("pageSize", "12");
  url.searchParams.set("resultType", "core");
  url.searchParams.set("sort", "P_PDATE_D desc");
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "CoffeeRamblerAdmin/1.0 (+https://www.coffeerambler.com)",
    },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Europe PMC returned ${response.status}`);
  const payload = (await response.json()) as { resultList?: { result?: unknown } };
  const rows = payload.resultList?.result;
  if (!Array.isArray(rows)) return [];
  const items: FeedItem[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const paper = row as {
      title?: unknown;
      abstractText?: unknown;
      doi?: unknown;
      id?: unknown;
      source?: unknown;
      firstPublicationDate?: unknown;
    };
    const title = typeof paper.title === "string" ? plainText(paper.title) : "";
    const description = typeof paper.abstractText === "string" ? plainText(paper.abstractText) : "";
    const doi = typeof paper.doi === "string" ? paper.doi.trim() : "";
    const recordId = typeof paper.id === "string" ? paper.id.trim() : "";
    const recordSource = typeof paper.source === "string" ? paper.source.trim() : "MED";
    const link = doi ? `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}` : recordId ? `https://europepmc.org/article/${recordSource}/${recordId}` : "";
    if (!title || !link || description.length < 40) continue;
    const publishedAt = typeof paper.firstPublicationDate === "string" ? Date.parse(paper.firstPublicationDate) : NaN;
    items.push({
      title,
      url: link,
      description,
      publishedAt: Number.isNaN(publishedAt) ? 0 : publishedAt,
      sourceName: "Europe PMC",
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
