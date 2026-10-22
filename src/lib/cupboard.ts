import { get, put, BlobPreconditionFailedError } from "@vercel/blob";

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

let memory: { at: number; value: CupboardData } | null = null;
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

async function loadRaw(): Promise<{ data: CupboardData; etag?: string }> {
  const result = await get(CUPBOARD_PATH, { access: "private", useCache: false, ...blobAuth() });
  if (!result || result.statusCode !== 200 || !result.stream) return { data: emptyCupboard() };
  const text = await new Response(result.stream).text();
  return { data: parseCupboard(text), etag: result.blob.etag || undefined };
}

export async function readCupboard(): Promise<CupboardData> {
  if (!cupboardEnabled()) return emptyCupboard();
  if (memory && Date.now() - memory.at < MEMORY_MS) return structuredClone(memory.value);
  const { data } = await loadRaw();
  memory = { at: Date.now(), value: data };
  return structuredClone(data);
}

export async function updateCupboard(mutate: (draft: CupboardData) => void): Promise<void> {
  if (!cupboardEnabled()) return;
  const run = writeChain.then(async () => {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const { data, etag } = await loadRaw();
      mutate(data);
      try {
        await put(CUPBOARD_PATH, JSON.stringify(data), {
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: "application/json",
          ...blobAuth(),
          ...(etag ? { ifMatch: etag } : {}),
        });
        memory = { at: Date.now(), value: structuredClone(data) };
        return;
      } catch (error) {
        if (attempt < 3 && error instanceof BlobPreconditionFailedError) continue;
        throw error;
      }
    }
  });
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  await run;
}
