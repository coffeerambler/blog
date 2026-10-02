import { AdminSocialPanel } from "@/components/admin-social-panel";
import { requireAdmin } from "@/lib/admin-guard";
import { writingKey } from "@/lib/openai";
import { readSocialQueue } from "@/lib/social-queue";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  await requireAdmin();
  const items = readSocialQueue();
  const ready = items.filter((item) => item.status === "ready");
  const posted = items.filter((item) => item.status === "posted");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Social</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/70">
        Create social posts writes a short caption and lines it up here. Country guides go first, and
        each one uses its growing map as the picture. Blog posts follow, newest first. Open X,
        Facebook, or LinkedIn from a lined-up post when you are ready. Nothing is sent until you press
        Post in that window.
      </p>
      <AdminSocialPanel ready={ready} posted={posted} hasWritingKey={Boolean(writingKey())} />
    </div>
  );
}
