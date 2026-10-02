export const MAX_SOCIAL_PICKS = 5;

export const SOCIAL_CAPTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    caption: { type: "string" },
    hashtags: {
      type: "array",
      items: { type: "string" },
      minItems: 4,
      maxItems: 4,
    },
  },
  required: ["caption", "hashtags"],
} as const;

function hashtag(value: unknown) {
  if (typeof value !== "string") return "";
  const raw = value
    .trim()
    .replace(/^#+/, "")
    .replace(/[^\p{L}\p{N}]/gu, "");
  if (raw.length < 2 || raw.length > 40) return "";
  return `#${raw}`;
}

/** Keep a model caption only when it is a real sentence, and add up to four hashtags from the source. */
export function captionFromModel(parsed: unknown) {
  if (!parsed || typeof parsed !== "object") return "";
  const raw = (parsed as { caption?: unknown; hashtags?: unknown }).caption;
  if (typeof raw !== "string") return "";
  let caption = raw
    .replace(/https?:\/\/\S+/g, "")
    .replace(/#[\p{L}\p{N}_]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (caption.length < 40) return "";
  if (caption.length > 600) {
    const cut = caption.slice(0, 600);
    const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
    caption = (lastStop > 200 ? cut.slice(0, lastStop + 1) : cut).trim();
  }
  const list = Array.isArray((parsed as { hashtags?: unknown }).hashtags)
    ? (parsed as { hashtags: unknown[] }).hashtags
    : [];
  const tags: string[] = [];
  const seen = new Set<string>();
  for (const item of list) {
    const tag = hashtag(item);
    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
    if (tags.length === 4) break;
  }
  return tags.length ? `${caption}\n\n${tags.join(" ")}` : caption;
}
