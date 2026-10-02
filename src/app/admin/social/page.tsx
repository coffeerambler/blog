import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Social</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/70">
        Open an approved post. The share box under the editor fills a caption from the title and the
        public link, and it opens X, Facebook, or LinkedIn so you can post it yourself. Drafts and
        posts in review have no share box.
      </p>
      <p className="mt-4 text-sm">
        <Link className="text-amber hover:underline" href="/admin/posts">
          Go to posts
        </Link>
      </p>
    </div>
  );
}
