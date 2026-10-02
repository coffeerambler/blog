import { AdminIdeasPanel } from "@/components/admin-ideas-panel";
import { requireAdmin } from "@/lib/admin-guard";
import { readIdeas } from "@/lib/ideas";

export const dynamic = "force-dynamic";

export default async function AdminIdeasPage() {
  await requireAdmin();
  const ideas = readIdeas().ideas.filter((idea) => idea.status === "new");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Ideas</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">
        Find 3 ideas reads Daily Coffee News, Sprudge, and Perfect Daily Grind. Dismiss anything you do not
        want. The same story will not come back. Writing the full post waits until the writing key is set.
      </p>
      <AdminIdeasPanel ideas={ideas} />
    </div>
  );
}
