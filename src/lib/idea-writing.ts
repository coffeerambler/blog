import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { loadCategories } from "@/lib/content";
import {
  acceptedPicks,
  draftFromModel,
  draftSchema,
  ensureSourceLink,
  internalLinks,
  readingMinutes,
  selectionSchema,
  slugifyTitle,
  uniqueSlug,
} from "@/lib/idea-model";
import { fetchEuropePmc, fetchOpenAlex, fetchSource, ideaSearchWords, IDEA_SOURCES, type FeedItem } from "@/lib/idea-sources";
import {
  hasSeen,
  ideaFingerprint,
  readIdeas,
  rememberSeen,
  runIdeaJob,
  saveIdeas,
  type Idea,
} from "@/lib/ideas";
import { writeLocalStatus } from "@/lib/local-publish";
import { completeStructured, writingKey } from "@/lib/openai";
import { todayIsoDate } from "@/lib/publish";

const PILE = 30;
const PER_SOURCE = 10;
const POSTS = path.join(process.cwd(), "content", "posts");

const CHOOSE_INSTRUCTIONS = `You choose blog ideas for Coffee Rambler. British English. Keiran Jones writes the site.

Keep at most three items from the numbered list:
- Research findings, studies, and what they mean for growing, processing, or tasting coffee. OpenAlex and Europe PMC items are papers.
- Cultural pieces about how people grow, drink, and understand coffee.

Leave out funding rounds, jobs, executive appointments, cafe openings and build-outs, events calendars, gear launches, and news that does not change much for a reader.

If none qualify, return an empty picks list. Do not invent a story that is not in the list. Do not pad the three with a weak headline. If two items are the same story, keep one. Do not prefer an item only because it is newer.

For each pick:
- id: the number from the list, copied exactly.
- title: plain house voice. The point is in the title. No hype.
- summary: a few sentences on what happened, why a Coffee Rambler reader would care, and the source name. Use only facts that are in the description. Do not invent figures, harvest months, or study results.
- category: one of the allowed slugs.

Never use these fragments: "the kilos", "the pile", "If you go, go in harvest".`;

const WRITE_INSTRUCTIONS = `Write one Coffee Rambler post in British English, as Keiran Jones.

The opening line carries the point. Sentences are complete. No hype. Do not use "the kilos", "the pile", or "If you go, go in harvest".

Use only the summary and the feed description. Do not invent figures, harvest months, or study results. Do not paste the source article. Do not claim you read anything beyond what is written here.

Cite the source by name and include the exact source URL in the body as a markdown link.

If the material is too thin to support a post, set ok to false, explain why in reason, and leave title, description, and body as empty strings.

If ok is true, reason is an empty string. title is the post title. description is one or two sentences. body is markdown with no h1. Short ## sections are fine.`;

export type FindResult = {
  added: Idea[];
  failures: string[];
  note: string;
  needsKey: boolean;
};

export type WriteResult =
  | { needsKey: true }
  | { ok: false; error: string; status: number }
  | { ok: false; tooThin: true; reason: string }
  | { ok: true; slug: string; path: string };

function clip(value: string, max: number) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

function pileText(pile: FeedItem[], categories: { slug: string; title: string }[]) {
  const guide = categories.map((category) => `${category.slug} (${category.title})`).join(", ");
  const items = pile.map((item, index) => {
    const date = item.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 10) : "unknown";
    return [
      `${index + 1}. ${item.title}`,
      `Source: ${item.sourceName}`,
      `Date: ${date}`,
      `Description: ${clip(item.description, 800) || "(no description)"}`,
    ].join("\n");
  });
  return `Allowed categories: ${guide}\n\n${items.join("\n\n")}`;
}

function unseenPile(items: FeedItem[]) {
  const file = readIdeas();
  const candidates: FeedItem[] = [];
  const batch = new Set<string>();
  const sorted = [...items].sort((a, b) => b.publishedAt - a.publishedAt);
  for (const item of sorted) {
    const fingerprint = ideaFingerprint(item.title);
    if (!item.url || batch.has(item.url) || batch.has(fingerprint) || hasSeen(file, item.url, fingerprint)) {
      continue;
    }
    batch.add(item.url);
    batch.add(fingerprint);
    candidates.push(item);
  }
  const counts = new Map<string, number>();
  const pile: FeedItem[] = [];
  const rest: FeedItem[] = [];
  for (const item of candidates) {
    const count = counts.get(item.sourceName) || 0;
    if (count >= PER_SOURCE) {
      rest.push(item);
      continue;
    }
    counts.set(item.sourceName, count + 1);
    pile.push(item);
    if (pile.length >= PILE) return pile;
  }
  for (const item of rest) {
    if (pile.length >= PILE) break;
    pile.push(item);
  }
  return pile;
}

async function loadFeeds(words: string) {
  const jobs = [
    ...IDEA_SOURCES.map((source) => ({ name: source.name, run: () => fetchSource(source) })),
    { name: "OpenAlex", run: () => fetchOpenAlex(words) },
    { name: "Europe PMC", run: () => fetchEuropePmc(words) },
  ];
  const settled = await Promise.all(
    jobs.map(async (job) => {
      try {
        return { name: job.name, items: await job.run() };
      } catch {
        return { name: job.name, items: null as FeedItem[] | null };
      }
    }),
  );
  const items: FeedItem[] = [];
  const failures: string[] = [];
  for (const result of settled) {
    if (!result.items) failures.push(result.name);
    else items.push(...result.items);
  }
  return { items, failures };
}

export async function findReviewedIdeas(limit = 3, wordsRaw = ""): Promise<FindResult> {
  return runIdeaJob(async () => {
    if (!writingKey()) return { added: [], failures: [], note: "", needsKey: true };
    const words = ideaSearchWords(wordsRaw);

    const { items, failures } = await loadFeeds(words);
    const pile = unseenPile(items);
    if (!pile.length) {
      return {
        added: [],
        failures,
        needsKey: false,
        note: items.length
          ? words
            ? "Nothing new matched those words."
            : "The research index and the feeds had nothing else new."
          : "",
      };
    }

    const categories = loadCategories();
    const slugs = categories.map((category) => category.slug);
    const focus = words
      ? `\n\nThe reader asked for ideas about: ${words}\nKeep an item only when the title or description is about those words. If none are, return an empty picks list.`
      : "";
    const parsed = await completeStructured({
      name: "idea_picks",
      schema: selectionSchema(slugs),
      instructions: CHOOSE_INSTRUCTIONS,
      input: pileText(pile, categories) + focus,
      maxOutputTokens: 4000,
    });
    const picks = acceptedPicks(parsed, pile.length, slugs).slice(0, limit);
    const added: Idea[] = [];
    for (const pick of picks) {
      const item = pile[pick.index];
      if (!item) continue;
      added.push({
        id: randomUUID(),
        status: "new",
        title: pick.title || item.title,
        summary: pick.summary,
        sourceTitle: item.title,
        sourceUrl: item.url,
        sourceName: item.sourceName,
        sourceDescription: item.description,
        category: pick.category,
        postSlug: "",
        createdAt: new Date().toISOString(),
      });
    }

    if (added.length) {
      const file = readIdeas();
      for (const idea of added) {
        rememberSeen(file, idea.sourceUrl, ideaFingerprint(idea.sourceTitle || idea.title));
      }
      file.ideas = [...added, ...file.ideas];
      saveIdeas(file);
    }

    return {
      added,
      failures,
      needsKey: false,
      note: added.length
        ? ""
        : words
          ? "Nothing matched those words. Nothing was saved."
          : "None of these were research findings or cultural pieces. Nothing was saved.",
    };
  });
}

export async function writeIdeaPost(id: string): Promise<WriteResult> {
  return runIdeaJob(async () => {
    if (!writingKey()) return { needsKey: true as const };
    const file = readIdeas();
    const idea = file.ideas.find((row) => row.id === id);
    if (!idea || idea.status === "dismissed") {
      return { ok: false as const, error: "That idea is not in the inbox.", status: 404 };
    }
    if (idea.status !== "new") {
      return { ok: false as const, error: "This idea was already written.", status: 409 };
    }

    const parsed = await completeStructured({
      name: "post_draft",
      schema: draftSchema(),
      instructions: WRITE_INSTRUCTIONS,
      input: [
        `Source name: ${idea.sourceName}`,
        `Source title: ${idea.sourceTitle}`,
        `Source URL: ${idea.sourceUrl}`,
        `Category: ${idea.category || "(none)"}`,
        "",
        "Summary:",
        idea.summary,
        "",
        "Feed description:",
        clip(idea.sourceDescription || "", 2000) || "(no description)",
      ].join("\n"),
      maxOutputTokens: 8000,
    });
    const draft = draftFromModel(parsed);
    if (!draft.ok) return { ok: false as const, tooThin: true as const, reason: draft.reason };

    const categories = new Set(loadCategories().map((category) => category.slug));
    const category = idea.category && categories.has(idea.category) ? idea.category : "";
    const body = ensureSourceLink(draft.body, idea.sourceName, idea.sourceUrl);
    const slug = uniqueSlug(slugifyTitle(draft.title) || slugifyTitle(idea.sourceTitle) || "coffee-note", (candidate) =>
      fs.existsSync(path.join(POSTS, `${candidate}.json`)),
    );
    const description = draft.description;
    const record = {
      type: "post" as const,
      slug,
      path: `/post/${slug}`,
      title: draft.title,
      description,
      date: todayIsoDate(),
      datetime: new Date().toISOString(),
      author: "Keiran Jones",
      minutes: readingMinutes(body),
      categories: category ? [category] : [],
      coverImage: null,
      excerpt: description,
      body,
      images: [],
      internalLinks: internalLinks(body),
      seoTitle: draft.title,
      seoDescription: description,
      status: "in_review" as const,
      draft: false,
      generatedBy: "agent" as const,
    };
    fs.mkdirSync(POSTS, { recursive: true });
    fs.writeFileSync(path.join(POSTS, `${slug}.json`), JSON.stringify(record, null, 2) + "\n");
    writeLocalStatus(slug, "in_review");
    idea.status = "used";
    idea.postSlug = slug;
    saveIdeas(file);
    return { ok: true as const, slug, path: record.path };
  });
}
