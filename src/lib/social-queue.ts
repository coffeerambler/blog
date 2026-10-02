import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type SocialKind = "guide" | "post";

export type SocialChoice = {
  kind: SocialKind;
  slug: string;
  title: string;
};
export type SocialStatus = "ready" | "posted";

export type SocialItem = {
  id: string;
  kind: SocialKind;
  slug: string;
  title: string;
  caption: string;
  path: string;
  imagePath: string;
  status: SocialStatus;
  createdAt: string;
  postedAt: string;
};

type SocialFile = { items: SocialItem[] };

const FILE = path.join(process.cwd(), "content", "social-queue.json");

function isKind(value: unknown): value is SocialKind {
  return value === "guide" || value === "post";
}

function isStatus(value: unknown): value is SocialStatus {
  return value === "ready" || value === "posted";
}

function readItem(value: unknown): SocialItem | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<SocialItem>;
  if (!row.id || !isKind(row.kind) || !row.slug || !isStatus(row.status)) return null;
  return {
    id: row.id,
    kind: row.kind,
    slug: row.slug,
    title: typeof row.title === "string" ? row.title : "",
    caption: typeof row.caption === "string" ? row.caption : "",
    path: typeof row.path === "string" ? row.path : "",
    imagePath: typeof row.imagePath === "string" ? row.imagePath : "",
    status: row.status,
    createdAt: typeof row.createdAt === "string" ? row.createdAt : "",
    postedAt: typeof row.postedAt === "string" ? row.postedAt : "",
  };
}

export function readSocialQueue(): SocialItem[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<SocialFile>;
    if (!Array.isArray(parsed.items)) return [];
    return parsed.items.map(readItem).filter((item): item is SocialItem => Boolean(item));
  } catch {
    return [];
  }
}

export function saveSocialQueue(items: SocialItem[]) {
  const tmp = `${FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify({ items } satisfies SocialFile, null, 2) + "\n");
  fs.renameSync(tmp, FILE);
}

let socialChain: Promise<void> = Promise.resolve();

export function runSocialJob<T>(job: () => Promise<T> | T): Promise<T> {
  const run = socialChain.then(() => job());
  socialChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function socialKey(kind: SocialKind, slug: string) {
  return `${kind}:${slug}`;
}

export function takenSocialKeys(items: SocialItem[]) {
  return new Set(items.map((item) => socialKey(item.kind, item.slug)));
}

export function appendSocialItem(
  items: SocialItem[],
  draft: Omit<SocialItem, "id" | "status" | "createdAt" | "postedAt">,
) {
  const next: SocialItem = {
    ...draft,
    id: randomUUID(),
    status: "ready",
    createdAt: new Date().toISOString(),
    postedAt: "",
  };
  return [...items, next];
}

export function updateSocialCaption(items: SocialItem[], id: string, caption: string) {
  return items.map((item) => (item.id === id ? { ...item, caption } : item));
}

export function markSocialPosted(items: SocialItem[], id: string) {
  const postedAt = new Date().toISOString();
  return items.map((item) => (item.id === id ? { ...item, status: "posted" as const, postedAt } : item));
}

export function removeSocialItem(items: SocialItem[], id: string) {
  return items.filter((item) => item.id !== id);
}
