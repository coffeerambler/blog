import { AdminIdeasPanel } from "@/components/admin-ideas-panel";
import { requireAdmin } from "@/lib/admin-guard";
import { readIdeas } from "@/lib/ideas";
import { writingKey } from "@/lib/openai";

export const dynamic = "force-dynamic";

export default async function AdminIdeasPage() {
  await requireAdmin();
  const ideas = readIdeas().ideas.filter((idea) => idea.status === "new");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Ideas</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">
        Find 3 ideas looks through coffee research on OpenAlex, and reads Daily Coffee News, Sprudge, and
        Perfect Daily Grind. The writing model keeps research findings and cultural pieces, and leaves out
        funding, jobs, and shop openings. Write this post drafts the article and puts it in Review. Publishing
        stays a separate approval.
        {writingKey()
          ? ""
          : " Add OPENAI_API_KEY to .env.local and restart the dev server, then these buttons will run."}
      </p>
      <AdminIdeasPanel ideas={ideas} hasWritingKey={Boolean(writingKey())} />
    </div>
  );
}
