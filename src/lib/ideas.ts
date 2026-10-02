import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

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
  sourceDescription: string;
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
      ideas: Array.isArray(parsed.ideas)
        ? parsed.ideas.map((idea) => ({ ...idea, sourceDescription: idea.sourceDescription || "" }))
        : [],
    };
  } catch {
    return emptyFile();
  }
}

export function saveIdeas(file: IdeaFile) {
  const tmp = `${FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(file, null, 2) + "\n");
  fs.renameSync(tmp, FILE);
}

let ideaChain: Promise<void> = Promise.resolve();

/** One admin click at a time, so two finds cannot save the same story. */
export function runIdeaJob<T>(job: () => Promise<T> | T): Promise<T> {
  const run = ideaChain.then(() => job());
  ideaChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
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
  return runIdeaJob(() => {
    const file = readIdeas();
    const idea = file.ideas.find((row) => row.id === id);
    if (!idea || idea.status !== "new") return null;
    idea.status = "dismissed";
    rememberSeen(file, idea.sourceUrl, ideaFingerprint(idea.sourceTitle || idea.title));
    saveIdeas(file);
    return idea;
  });
}
