import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { get, put } from "@vercel/blob";

export const CUPBOARD_PATH = "cupboard.json";
export const ROOT = process.cwd();
export const MANIFEST = path.join(ROOT, "content", ".cupboard-fold.json");

export function hashValue(value) {
  const data = Buffer.isBuffer(value) ? value : JSON.stringify(value);
  return createHash("sha256").update(data).digest("hex");
}

export function requireToken() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Set BLOB_READ_WRITE_TOKEN for this command only. Leave it out of .env.local.");
    process.exit(1);
  }
}

export function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readCupboardFile() {
  const result = await get(CUPBOARD_PATH, { access: "private", useCache: false, token: blobToken() });
  if (!result || result.statusCode !== 200 || !result.stream) return { data: null, etag: undefined };
  const data = JSON.parse(await new Response(result.stream).text());
  return { data, etag: result.blob.etag || undefined };
}

export async function writeCupboardFile(data, etag) {
  await put(CUPBOARD_PATH, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: blobToken(),
    ...(etag ? { ifMatch: etag } : {}),
  });
}

export function safeSlug(slug) {
  return typeof slug === "string" && slug && !slug.includes("..") && !slug.includes("/") && !slug.includes("\\");
}

export function recordFile(kind, slug) {
  return path.join(ROOT, "content", kind, `${slug}.json`);
}

export function writePretty(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

export function isPostRecord(record) {
  return record?.type === "post" || (typeof record?.path === "string" && record.path.startsWith("/post/"));
}

/** Match the live site: a post overlay wins, and an approved page file stays approved. */
export function applyFoldedStatus(record, overlay) {
  if (!overlay) return record;
  if (isPostRecord(record)) return { ...record, status: overlay, draft: overlay === "draft" };
  if (record.status === "approved") return record;
  if (record.status === overlay) return record;
  const next = { ...record, status: overlay, draft: overlay === "draft" };
  if (overlay === "approved") next.approvedAt = record.approvedAt || new Date().toISOString().slice(0, 10);
  else delete next.approvedAt;
  return next;
}
