import Link from "next/link";
import { AdminPostsQueue } from "@/components/admin-posts-queue";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-guard";
import { loadAdminRecords, postRecords } from "@/lib/admin-items";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireAdmin();
  const posts = postRecords(loadAdminRecords());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-cream">Posts</h1>
          <p className="mt-3 max-w-2xl text-sm text-cream/70">
            Search and filter every blog post, including drafts.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/new/post">New post</Link>
        </Button>
      </div>
      <AdminPostsQueue posts={posts} />
    </div>
  );
}
