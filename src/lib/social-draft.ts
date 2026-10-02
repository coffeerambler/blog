import { loadPosts, readPageFile } from "@/lib/content";
import { getCountryGuideBundle, templatedCountrySlugs } from "@/lib/country-guides";
import { captionFromModel, MAX_SOCIAL_PICKS, SOCIAL_CAPTION_SCHEMA } from "@/lib/social-caption";
import { isApproved } from "@/lib/publish";
import { completeStructured, writingKey } from "@/lib/openai";
import { publicPostUrl } from "@/lib/share-post";
import {
  appendSocialItem,
  readSocialQueue,
  runSocialJob,
  saveSocialQueue,
  takenSocialKeys,
  type SocialChoice,
  type SocialItem,
  type SocialKind,
} from "@/lib/social-queue";

const INSTRUCTIONS = `You write the social caption for Coffee Rambler, in the voice of Keiran Jones.
British spelling. Two or three complete sentences. The opening line carries the point.
Use only the source text. Do not invent figures, harvest months, places, or study results.
Do not add hashtags. Do not include a URL. Do not mention that you are writing a caption.`;

export type SocialCandidate = {
  kind: SocialKind;
  slug: string;
  title: string;
  path: string;
  imagePath: string;
  sourceText: string;
};

function clip(text: string, max = 1200) {
  const plain = text.replace(/!\[[^\]]*]\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return (lastStop > max * 0.6 ? cut.slice(0, lastStop + 1) : cut).trim();
}

export function listSocialCandidates(): SocialCandidate[] {
  const guides: SocialCandidate[] = [];
  for (const slug of templatedCountrySlugs()) {
    const page = readPageFile(slug);
    if (!isApproved(page || { slug })) continue;
    const bundle = getCountryGuideBundle(slug);
    if (!bundle) continue;
    const sections = bundle.guide.sections.map((section) => `${section.title}\n${section.markdown}`).join("\n\n");
    guides.push({
      kind: "guide",
      slug,
      title: bundle.guide.name,
      path: bundle.guide.path,
      imagePath: `/country-map/${slug}`,
      sourceText: clip(`${bundle.guide.lede}\n\n${sections}`, 1600),
    });
  }
  guides.sort((a, b) => a.title.localeCompare(b.title));

  const posts: SocialCandidate[] = loadPosts("live").map((post) => ({
    kind: "post" as const,
    slug: post.slug,
    title: post.title,
    path: post.path,
    imagePath: post.coverImage || "",
    sourceText: clip(`${post.description}\n\n${post.body}`),
  }));

  return [...guides, ...posts];
}

export function listSocialChoices(): SocialChoice[] {
  return listSocialCandidates().map(({ kind, slug, title }) => ({ kind, slug, title }));
}

/** Keep the picks the admin chose, in that order, skipping anything already lined up. */
export function chosenSocialCandidates(
  candidates: SocialCandidate[],
  taken: Set<string>,
  picks: { kind: string; slug: string }[],
) {
  const chosen: SocialCandidate[] = [];
  const seen = new Set<string>();
  for (const pick of picks) {
    if (pick.kind !== "guide" && pick.kind !== "post") continue;
    const key = `${pick.kind}:${pick.slug}`;
    if (seen.has(key) || taken.has(key)) continue;
    const match = candidates.find((item) => item.kind === pick.kind && item.slug === pick.slug);
    if (!match) continue;
    seen.add(key);
    chosen.push(match);
    if (chosen.length >= MAX_SOCIAL_PICKS) break;
  }
  return chosen;
}

function withLink(caption: string, path: string) {
  const url = publicPostUrl(path);
  if (caption.includes(url)) return caption;
  return `${caption}\n\n${url}`;
}

export async function createSocialPosts(picks: { kind: string; slug: string }[]) {
  return runSocialJob(async () => {
    if (!writingKey()) return { needsKey: true as const, added: [] as SocialItem[], note: "" };
    const queued = readSocialQueue();
    const taken = takenSocialKeys(queued);
    const batch = chosenSocialCandidates(listSocialCandidates(), taken, picks);
    if (!batch.length) {
      return {
        needsKey: false as const,
        added: [] as SocialItem[],
        note: "Pick a country guide or a blog post that is not already in the list.",
      };
    }

    let items = queued;
    const added: SocialItem[] = [];
    const skipped: string[] = [];
    for (const candidate of batch) {
      const parsed = await completeStructured({
        name: "social_caption",
        schema: SOCIAL_CAPTION_SCHEMA,
        instructions: INSTRUCTIONS,
        input: `Title: ${candidate.title}\nKind: ${candidate.kind === "guide" ? "country guide" : "blog post"}\nSource:\n${candidate.sourceText}`,
        maxOutputTokens: 800,
      });
      const caption = captionFromModel(parsed);
      if (!caption) {
        skipped.push(candidate.title);
        continue;
      }
      items = appendSocialItem(items, {
        kind: candidate.kind,
        slug: candidate.slug,
        title: candidate.title,
        caption: withLink(caption, candidate.path),
        path: candidate.path,
        imagePath: candidate.imagePath,
      });
      added.push(items[items.length - 1]);
      saveSocialQueue(items);
    }

    const note = skipped.length ? `No caption was kept for ${skipped.join(", ")}.` : "";
    return { needsKey: false as const, added, note };
  });
}
