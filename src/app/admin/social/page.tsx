import { AdminSocialPanel } from "@/components/admin-social-panel";
import { requireAdmin } from "@/lib/admin-guard";
import { writingKey } from "@/lib/openai";
import { listSocialChoices } from "@/lib/social-draft";
import { readSocialQueue, socialKey } from "@/lib/social-queue";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  await requireAdmin();
  const items = readSocialQueue();
  const taken = new Set(items.map((item) => socialKey(item.kind, item.slug)));
  const ready = items.filter((item) => item.status === "ready");
  const posted = items.filter((item) => item.status === "posted");
  const choices = listSocialChoices().filter((choice) => !taken.has(socialKey(choice.kind, choice.slug)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Social</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/70">
        Tick a country guide, or search for a blog post, then write the captions. Up to five at a
        time. They line up below, with the growing map as the picture on a country guide. Remove from
        list drops one. Open X, Facebook, or LinkedIn when you are ready. Nothing is sent until you
        press Post in that window.
      </p>
      <AdminSocialPanel
        ready={ready}
        posted={posted}
        choices={choices}
        hasWritingKey={Boolean(writingKey())}
      />
    </div>
  );
}
