import { get, put } from "@vercel/blob";

/** Private JSON document. Ideas, captions, approvals, and phone-made drafts live here. */
export const CUPBOARD_PATH = "cupboard.json";

export type CupboardImage = {
  name: string;
  url: string;
  pathname: string;
};

export type CupboardData = {
  ideas: unknown;
  social: unknown;
  status: Record<string, unknown>;
  editorial: Record<string, unknown>;
  posts: Record<string, unknown>;
  pages: Record<string, unknown>;
  images: CupboardImage[];
};

const MEMORY_MS = 5000;
/** A failed read must not be retried on every page view. Each retry is another billed operation. */
const FAILURE_MS = 60 * 60 * 1000;
/** Public reads use the CDN cache. One hour keeps a normal month under the free 10,000 simple operations. */
const CACHE_MAX_AGE_SECONDS = 60 * 60;

let memory: { at: number; value: CupboardData; failed: boolean } | null = null;
let writeChain: Promise<void> = Promise.resolve();

export function blobReadWriteToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || "";
}

export function cupboardEnabled() {
  return Boolean(blobReadWriteToken());
}

/** Pass the token on every call. On Vercel, a connected store also sets BLOB_STORE_ID, and the SDK then ignores BLOB_READ_WRITE_TOKEN unless it is passed in. */
function blobAuth() {
  return { token: blobReadWriteToken() };
}

export function emptyCupboard(): CupboardData {
  return {
    ideas: { seen: [], ideas: [] },
    social: [],
    status: {},
    editorial: {},
    posts: {},
    pages: {},
    images: [],
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function parseCupboard(text: string): CupboardData {
  try {
    const raw = asRecord(JSON.parse(text));
    const images = Array.isArray(raw.images) ? raw.images : [];
    return {
      ideas: raw.ideas ?? { seen: [], ideas: [] },
      social: raw.social ?? [],
      status: asRecord(raw.status),
      editorial: asRecord(raw.editorial),
      posts: asRecord(raw.posts),
      pages: asRecord(raw.pages),
      images: images.filter((item): item is CupboardImage => {
        if (!item || typeof item !== "object") return false;
        const row = item as Partial<CupboardImage>;
        return Boolean(row.name && row.url && row.pathname);
      }),
    };
  } catch {
    return emptyCupboard();
  }
}

async function loadRaw(fresh = false): Promise<CupboardData> {
  const result = await get(CUPBOARD_PATH, {
    access: "private",
    // A fresh read is only for a save. Public pages must be allowed to hit the CDN cache,
    // because a cache miss is a billed simple operation and a hit is free.
    ...(fresh ? { useCache: false as const } : {}),
    ...blobAuth(),
  });
  if (!result || result.statusCode !== 200 || !result.stream) return emptyCupboard();
  const text = await new Response(result.stream).text();
  return parseCupboard(text);
}

export async function readCupboard(): Promise<CupboardData> {
  if (!cupboardEnabled()) return emptyCupboard();
  if (memory) {
    const maxAge = memory.failed ? FAILURE_MS : MEMORY_MS;
    if (Date.now() - memory.at < maxAge) return structuredClone(memory.value);
  }
  try {
    const data = await loadRaw(false);
    memory = { at: Date.now(), value: data, failed: false };
    return structuredClone(data);
  } catch (error) {
    // A blocked or unreachable store must not take down public pages.
    // Writes still go through loadRaw, which throws rather than saving over an empty document.
    console.error("Cupboard read failed; serving the copies in git.", error);
    const fallback = emptyCupboard();
    memory = { at: Date.now(), value: fallback, failed: true };
    return structuredClone(fallback);
  }
}

export async function updateCupboard(mutate: (draft: CupboardData) => void): Promise<void> {
  if (!cupboardEnabled()) return;
  const run = writeChain.then(async () => {
    const data = await loadRaw(true);
    mutate(data);
    await put(CUPBOARD_PATH, JSON.stringify(data), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: CACHE_MAX_AGE_SECONDS,
      contentType: "application/json",
      ...blobAuth(),
    });
    memory = { at: Date.now(), value: structuredClone(data), failed: false };
  });
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  await run;
}
