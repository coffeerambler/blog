export const SOCIAL_CAPTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    caption: { type: "string" },
  },
  required: ["caption"],
} as const;

/** Keep a model caption only when it is a real sentence, and drop any URL it added. */
export function captionFromModel(parsed: unknown) {
  if (!parsed || typeof parsed !== "object") return "";
  const raw = (parsed as { caption?: unknown }).caption;
  if (typeof raw !== "string") return "";
  const caption = raw
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (caption.length < 40) return "";
  if (caption.length <= 600) return caption;
  const cut = caption.slice(0, 600);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return (lastStop > 200 ? cut.slice(0, lastStop + 1) : cut).trim();
}
