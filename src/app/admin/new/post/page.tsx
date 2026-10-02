import Link from "next/link";
import { AdminNewPostForm } from "@/components/admin-new-post-form";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="text-sm">
        <Link className="text-amber hover:underline" href="/admin/posts">
          Back to posts
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-3xl text-cream">New post</h1>
      <p className="mt-3 text-sm text-cream/70">
        Title and slug only. It lands in Review until you write it, add a cover, and publish.
      </p>
      <AdminNewPostForm />
    </div>
  );
}
