export const WRITING_MODEL = "gpt-6.1-sol";

export type ChosenCard = {
  index: number;
  title: string;
  summary: string;
  category: string;
};

export type DraftResult =
  | { ok: false; reason: string }
  | { ok: true; title: string; description: string; body: string };

export function textFromResponse(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as { output_text?: unknown; output?: unknown };
  if (typeof record.output_text === "string" && record.output_text.trim()) return record.output_text;
  if (!Array.isArray(record.output)) return "";
  const parts: string[] = [];
  for (const item of record.output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const block of content) {
      if (!block || typeof block !== "object") continue;
      const text = (block as { text?: unknown }).text;
      if (typeof text === "string" && text.trim()) parts.push(text);
    }
  }
  return parts.join("\n");
}

export function parseModelJson(text: string): unknown {
  const trimmed = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(trimmed);
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  const clean = value.replace(/\u0000/g, "").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

export function acceptedPicks(parsed: unknown, pileCount: number, categories: readonly string[]): ChosenCard[] {
  if (!parsed || typeof parsed !== "object") return [];
  const picks = (parsed as { picks?: unknown }).picks;
  if (!Array.isArray(picks)) return [];
  const allowed = new Set(categories);
  const used = new Set<number>();
  const cards: ChosenCard[] = [];
  for (const pick of picks) {
    if (cards.length >= 3) break;
    if (!pick || typeof pick !== "object") continue;
    const row = pick as { id?: unknown; title?: unknown; summary?: unknown; category?: unknown };
    const rawId = row.id;
    const id =
      typeof rawId === "number" && Number.isInteger(rawId)
        ? String(rawId)
        : typeof rawId === "string"
          ? rawId.trim()
          : "";
    const index = Number(id) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= pileCount || used.has(index)) continue;
    const summary = cleanText(row.summary, 1200);
    if (!summary) continue;
    used.add(index);
    const category = typeof row.category === "string" && allowed.has(row.category) ? row.category : "";
    cards.push({
      index,
      title: cleanText(row.title, 180),
      summary,
      category,
    });
  }
  return cards;
}

export function draftFromModel(parsed: unknown): DraftResult {
  if (!parsed || typeof parsed !== "object") {
    return { ok: false, reason: "The writing model sent something this page could not read." };
  }
  const row = parsed as { ok?: unknown; reason?: unknown; title?: unknown; description?: unknown; body?: unknown };
  const reason = cleanText(row.reason, 400);
  const title = cleanText(row.title, 180);
  const description = cleanText(row.description, 400);
  const body = typeof row.body === "string" ? row.body.replace(/\u0000/g, "").trim() : "";
  if (row.ok !== true || !title || body.length < 80) {
    return { ok: false, reason: reason || "The source is too thin to support a post." };
  }
  return { ok: true, title, description: description || title, body };
}

export function slugifyTitle(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
    .replace(/-$/g, "");
}

export function uniqueSlug(base: string, taken: (slug: string) => boolean) {
  const root = base || "coffee-note";
  if (!taken(root)) return root;
  for (let n = 2; n < 100; n += 1) {
    const candidate = `${root.slice(0, 76)}-${n}`.replace(/^-|-$/g, "");
    if (!taken(candidate)) return candidate;
  }
  return `${root.slice(0, 60)}-${Date.now().toString(36)}`;
}

export function ensureSourceLink(body: string, sourceName: string, sourceUrl: string) {
  const trimmed = body.trim();
  if (!sourceUrl || trimmed.includes(sourceUrl)) return trimmed;
  const name = sourceName.trim() || "Source";
  return `${trimmed}\n\n[${name}](${sourceUrl}).`.trim();
}

export function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function internalLinks(body: string) {
  return [...body.matchAll(/\]\((\/[^)\s]+)\)/g)].map((match) => match[1]);
}

export function selectionSchema(categories: readonly string[]) {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      picks: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            summary: { type: "string" },
            category: { type: "string", enum: [...categories] },
          },
          required: ["id", "title", "summary", "category"],
        },
      },
    },
    required: ["picks"],
  };
}

export function draftSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      ok: { type: "boolean" },
      reason: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      body: { type: "string" },
    },
    required: ["ok", "reason", "title", "description", "body"],
  };
}
