export const PUBLISH_STATUSES = ["draft", "in_review", "approved"] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];

/** New agent country guides start in review until Keiran signs them off. */
export const AGENT_IN_REVIEW_SLUGS = new Set([
  "country-guide-kenya",
  "country-guide-indonesia",
  "country-guide-brazil",
  "country-guide-papuanewguinea",
  "country-guide-guatemala",
  "country-guide-rwanda",
  "country-guide-burundi",
  "country-guide-ecuador",
  "country-guide-vietnam",
  "country-guide-uganda",
  "country-guide-mexico",
]);

export function isPublishStatus(value: unknown): value is PublishStatus {
  return value === "draft" || value === "in_review" || value === "approved";
}

export function publishStatus(record: {
  status?: string;
  draft?: boolean;
  slug?: string;
}): PublishStatus {
  // JSON/overlay `status` is the source of truth. The agent slug list is only
  // a default when a new guide file has no status yet.
  if (isPublishStatus(record.status)) return record.status;
  if (record.draft) return "draft";
  if (record.slug && AGENT_IN_REVIEW_SLUGS.has(record.slug)) return "in_review";
  return "approved";
}

export function isApproved(record: { status?: string; draft?: boolean; slug?: string }) {
  return publishStatus(record) === "approved";
}

export function statusLabel(status: PublishStatus) {
  switch (status) {
    case "draft":
      return "Draft";
    case "in_review":
      return "In review";
    case "approved":
      return "Approved";
  }
}

export function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
