import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fetchSource, IDEA_SOURCES, type FeedItem } from "@/lib/idea-sources";

export type IdeaStatus = "new" | "dismissed" | "used";

export type SeenIdea = {
  url: string;
  fingerprint: string;
  seenAt: string;
};

export type Idea = {
  id: string;
  status: IdeaStatus;
  title: string;
  summary: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  postSlug: string;
  createdAt: string;
};

export type IdeaFile = {
  seen: SeenIdea[];
  ideas: Idea[];
};

const FILE = path.join(process.cwd(), "content", "ideas.json");

function emptyFile(): IdeaFile {
  return { seen: [], ideas: [] };
}

export function ideaFingerprint(title: string) {
  const normalised = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return createHash("sha256").update(normalised || title).digest("hex").slice(0, 16);
}

export function readIdeas(): IdeaFile {
  try {
    const parsed = JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<IdeaFile>;
    return {
      seen: Array.isArray(parsed.seen) ? parsed.seen : [],
      ideas: Array.isArray(parsed.ideas) ? parsed.ideas : [],
    };
  } catch {
    return emptyFile();
  }
}

function writeIdeas(file: IdeaFile) {
  const tmp = `${FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(file, null, 2) + "\n");
  fs.renameSync(tmp, FILE);
}

export function rememberSeen(file: IdeaFile, url: string, fingerprint: string) {
  const seenAt = new Date().toISOString();
  const existing = file.seen.find((row) => row.url === url || row.fingerprint === fingerprint);
  if (existing) {
    if (url) existing.url = url;
    if (fingerprint) existing.fingerprint = fingerprint;
    existing.seenAt = seenAt;
    return;
  }
  file.seen.push({ url, fingerprint, seenAt });
}

export function hasSeen(file: IdeaFile, url: string, fingerprint: string) {
  return file.seen.some(
    (row) => (url && row.url === url) || (fingerprint && row.fingerprint === fingerprint),
  );
}

export function dismissIdea(id: string) {
  const file = readIdeas();
  const idea = file.ideas.find((row) => row.id === id);
  if (!idea || idea.status !== "new") return null;
  idea.status = "dismissed";
  rememberSeen(file, idea.sourceUrl, ideaFingerprint(idea.sourceTitle || idea.title));
  writeIdeas(file);
  return idea;
}

function trimDescription(value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= 500) return clean;
  const cut = clean.slice(0, 500);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 300 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function summaryFor(item: FeedItem) {
  const description = trimDescription(item.description);
  const sourceLine = `Source: ${item.sourceName}. ${item.url}`;
  return description ? `${description}\n\n${sourceLine}` : sourceLine;
}

export async function findNewIdeas(limit = 3) {
  const file = readIdeas();
  const collected: FeedItem[] = [];
  const failures: string[] = [];
  for (const source of IDEA_SOURCES) {
    try {
      collected.push(...(await fetchSource(source)));
    } catch {
      failures.push(source.name);
    }
  }
  collected.sort((a, b) => b.publishedAt - a.publishedAt);

  const added: Idea[] = [];
  const batch = new Set<string>();
  for (const item of collected) {
    if (added.length >= limit) break;
    const fingerprint = ideaFingerprint(item.title);
    const key = `${item.url} ${fingerprint}`;
    if (batch.has(key) || hasSeen(file, item.url, fingerprint)) continue;
    batch.add(key);
    const idea: Idea = {
      id: randomUUID(),
      status: "new",
      title: item.title,
      summary: summaryFor(item),
      sourceTitle: item.title,
      sourceUrl: item.url,
      sourceName: item.sourceName,
      category: "",
      postSlug: "",
      createdAt: new Date().toISOString(),
    };
    file.ideas.unshift(idea);
    rememberSeen(file, item.url, fingerprint);
    added.push(idea);
  }
  if (added.length) writeIdeas(file);
  return {
    added,
    failures,
    note: added.length < limit ? "The feeds had nothing else new." : "",
  };
}
