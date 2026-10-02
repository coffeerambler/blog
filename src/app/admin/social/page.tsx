import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Social</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/70">
        Open an approved post or country guide. The share box fills a caption and opens X, Facebook,
        or LinkedIn so you can post it yourself. A country guide uses its lede as the summary and its
        growing map as the picture on the link. Drafts and pages in review have no share box.
      </p>
      <p className="mt-4 text-sm">
        <Link className="text-amber hover:underline" href="/admin/posts">
          Go to posts
        </Link>
      </p>
    </div>
  );
}
