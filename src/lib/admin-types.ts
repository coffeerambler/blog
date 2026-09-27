import type { PublishStatus } from "@/lib/publish";

export type AdminRecord = {
  kind: "post" | "page";
  slug: string;
  fileSlug: string;
  title: string;
  path: string;
  status: PublishStatus;
  pageType: string;
  date?: string;
  generatedBy?: "agent" | "import";
};

export function editHref(record: Pick<AdminRecord, "kind" | "fileSlug">) {
  return `/admin/edit/${record.kind}/${encodeURIComponent(record.fileSlug)}`;
}
