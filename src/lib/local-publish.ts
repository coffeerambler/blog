import fs from "node:fs";
import path from "node:path";
import type { CountryGuideEditorial } from "@/data/country-guides/types";
import { isPublishStatus, type PublishStatus } from "@/lib/publish";

const STATUS_FILE = path.join(process.cwd(), "content", "local-status.json");
const EDITORIAL_FILE = path.join(process.cwd(), "content", "local-editorial.json");

type StatusMap = Record<string, PublishStatus>;
type EditorialMap = Record<string, CountryGuideEditorial>;

function readJsonFile<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJsonAtomic(file: string, value: unknown) {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2) + "\n");
  fs.renameSync(tmp, file);
}

export function readLocalStatus(): StatusMap {
  const parsed = readJsonFile<Record<string, unknown>>(STATUS_FILE, {});
  const out: StatusMap = {};
  for (const [slug, value] of Object.entries(parsed)) {
    if (isPublishStatus(value)) out[slug] = value;
  }
  return out;
}

export function writeLocalStatus(slug: string, status: PublishStatus) {
  const next = { ...readLocalStatus(), [slug]: status };
  writeJsonAtomic(STATUS_FILE, next);
}

export function readLocalEditorial(): EditorialMap {
  const parsed = readJsonFile<Record<string, unknown>>(EDITORIAL_FILE, {});
  const out: EditorialMap = {};
  for (const [slug, value] of Object.entries(parsed)) {
    if (value && typeof value === "object") out[slug] = value as CountryGuideEditorial;
  }
  return out;
}

export function writeLocalEditorial(slug: string, guide: CountryGuideEditorial) {
  const next = { ...readLocalEditorial(), [slug]: guide };
  writeJsonAtomic(EDITORIAL_FILE, next);
}

/**
 * Local overlay survives `git checkout` of JSON.
 *
 * Posts: overlay wins, including draft/in_review over a git-approved JSON file,
 * so Unpublish actually takes the article off the public site.
 *
 * Country guides and other pages: JSON `approved` still wins over a stale overlay
 * that would un-publish, and overlay `approved` recovers a git-reset in_review page.
 */
export function applyLocalStatus<
  T extends { slug?: string; status?: string; type?: string; path?: string },
>(record: T): T {
  const slug = record.slug;
  if (!slug) return record;
  const overlay = readLocalStatus()[slug];
  const jsonStatus = isPublishStatus(record.status) ? record.status : undefined;
  const isPost = record.type === "post" || Boolean(record.path?.startsWith("/post/"));

  if (isPost) {
    if (!overlay) return record;
    if (overlay === "draft") return { ...record, status: "draft" };
    if (overlay === "in_review") return { ...record, status: "in_review" };
    if (overlay === "approved") return { ...record, status: "approved" };
    return record;
  }

  if (jsonStatus === "approved") {
    if (overlay && overlay !== "approved") writeLocalStatus(slug, "approved");
    return jsonStatus === record.status ? record : { ...record, status: "approved" };
  }

  if (!overlay) return record;

  if (overlay === "approved") {
    return { ...record, status: "approved" };
  }

  if (overlay === record.status) return record;
  return { ...record, status: overlay };
}

/** Last saved editorial, used when JSON lost its `guide` key (git reset). */
export function applyLocalEditorial<T extends { slug?: string; guide?: CountryGuideEditorial }>(record: T): T {
  if (!record.slug || record.guide) return record;
  const overlay = readLocalEditorial()[record.slug];
  if (!overlay) return record;
  return { ...record, guide: overlay };
}
