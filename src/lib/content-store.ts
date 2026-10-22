import fs from "node:fs";
import path from "node:path";
import type { CountryGuideEditorial } from "@/data/country-guides/types";
import { cupboardEnabled, readCupboard, updateCupboard } from "@/lib/cupboard";
import { writeLocalEditorial, writeLocalStatus } from "@/lib/local-publish";
import { isPublishStatus, publishStatus, type PublishStatus } from "@/lib/publish";

const ROOT = path.join(process.cwd(), "content");

function folder(kind: "post" | "page") {
  return kind === "post" ? "posts" : "pages";
}

export function gitPostExists(slug: string) {
  return fs.existsSync(path.join(ROOT, "posts", `${slug}.json`));
}

export function readGitRecord(kind: "post" | "page", slug: string): Record<string, unknown> | null {
  const file = path.join(ROOT, folder(kind), `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
}

function writeGitRecord(kind: "post" | "page", slug: string, value: unknown) {
  const dir = path.join(ROOT, folder(kind));
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${slug}.json`);
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2) + "\n");
  fs.renameSync(tmp, file);
}

export async function readEditableRecord(
  kind: "post" | "page",
  slug: string,
): Promise<Record<string, unknown> | null> {
  if (cupboardEnabled()) {
    const data = await readCupboard();
    const stored = kind === "post" ? data.posts[slug] : data.pages[slug];
    if (stored && typeof stored === "object") return { ...(stored as Record<string, unknown>) };
  }
  return readGitRecord(kind, slug);
}

export async function writeEditableRecord(
  kind: "post" | "page",
  slug: string,
  record: object,
  options?: { status?: PublishStatus; guide?: CountryGuideEditorial },
): Promise<void> {
  if (cupboardEnabled()) {
    await updateCupboard((draft) => {
      if (kind === "post") draft.posts[slug] = record as Record<string, unknown>;
      else draft.pages[slug] = record as Record<string, unknown>;
      if (options?.status) draft.status[slug] = options.status;
      if (options?.guide) draft.editorial[slug] = options.guide;
    });
    return;
  }
  if (options?.guide) writeLocalEditorial(slug, options.guide);
  if (options?.status) writeLocalStatus(slug, options.status);
  writeGitRecord(kind, slug, record);
}

function effectiveStatus(record: Record<string, unknown>, overlay: unknown): PublishStatus {
  if (isPublishStatus(overlay)) return overlay;
  return publishStatus({
    slug: typeof record.slug === "string" ? record.slug : undefined,
    status: typeof record.status === "string" ? record.status : undefined,
    draft: record.draft === true,
  });
}

/** Phone-made in-review drafts have no file in the repository. */
export async function canDeleteCupboardDraft(slug: string) {
  if (!slug || gitPostExists(slug) || !cupboardEnabled()) return false;
  const data = await readCupboard();
  const stored = data.posts[slug];
  if (!stored || typeof stored !== "object") return false;
  return effectiveStatus(stored as Record<string, unknown>, data.status[slug]) !== "approved";
}

export async function deleteCupboardDraft(slug: string): Promise<string | null> {
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return "Missing slug.";
  if (gitPostExists(slug)) {
    return "This article is in the repository. Unpublish it here. Remove the file on your computer if you want it gone.";
  }
  if (!cupboardEnabled()) return "This server has no cupboard, so a draft cannot be removed from another device.";
  const data = await readCupboard();
  const stored = data.posts[slug];
  if (!stored || typeof stored !== "object") return "That draft is not in the cupboard.";
  if (effectiveStatus(stored as Record<string, unknown>, data.status[slug]) === "approved") {
    return "Unpublish this post before deleting it.";
  }
  await updateCupboard((draft) => {
    delete draft.posts[slug];
    delete draft.status[slug];
  });
  return null;
}
