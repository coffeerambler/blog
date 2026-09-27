import { displayTitle, loadPages, loadPosts, pageFileSlug, type Post, type SitePage } from "@/lib/content";
import type { AdminRecord } from "@/lib/admin-types";
import { publishStatus, type PublishStatus } from "@/lib/publish";

export type { AdminRecord } from "@/lib/admin-types";
export { editHref } from "@/lib/admin-types";

function fromPage(page: SitePage): AdminRecord {
  return {
    kind: "page",
    slug: page.slug,
    fileSlug: pageFileSlug(page.slug),
    title: displayTitle(page),
    path: page.path,
    status: publishStatus(page),
    pageType: page.type,
    date: page.date,
    generatedBy: page.generatedBy,
  };
}

function fromPost(post: Post): AdminRecord {
  return {
    kind: "post",
    slug: post.slug,
    fileSlug: post.slug,
    title: post.title,
    path: post.path,
    status: publishStatus(post),
    pageType: "post",
    date: post.date,
    generatedBy: post.generatedBy,
  };
}

export function loadAdminRecords(): AdminRecord[] {
  return [...loadPages("all").map(fromPage), ...loadPosts("all").map(fromPost)];
}

function countryFirst(a: AdminRecord, b: AdminRecord) {
  const ac = a.pageType === "country" ? 0 : a.kind === "page" ? 1 : 2;
  const bc = b.pageType === "country" ? 0 : b.kind === "page" ? 1 : 2;
  if (ac !== bc) return ac - bc;
  return a.title.localeCompare(b.title);
}

export function recordsByStatus(records: AdminRecord[], status: PublishStatus) {
  return records.filter((record) => record.status === status).sort(countryFirst);
}

export function countryGuideRecords(records: AdminRecord[]) {
  return records.filter((record) => record.kind === "page" && record.pageType === "country");
}

export function postRecords(records: AdminRecord[]) {
  return records
    .filter((record) => record.kind === "post")
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
}
