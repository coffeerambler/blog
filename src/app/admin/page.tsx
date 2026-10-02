import { cookies } from "next/headers";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminPostsQueue } from "@/components/admin-posts-queue";
import { AdminRecordList } from "@/components/admin-record-list";
import { Button } from "@/components/ui/button";
import { expectedAdminCookie } from "@/lib/admin";
import {
  countryGuideRecords,
  loadAdminRecords,
  postRecords,
  recordsByStatus,
} from "@/lib/admin-items";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-serif text-4xl text-cream">Admin</h1>
        <AdminLoginForm />
      </div>
    );
  }

  const records = loadAdminRecords();
  const countries = countryGuideRecords(records);
  const posts = postRecords(records);
  const countryReview = recordsByStatus(countries, "in_review");
  const postReview = recordsByStatus(posts, "in_review");
  const countryApproved = recordsByStatus(countries, "approved");
  const drafts = recordsByStatus(records, "draft");
  const pages = records.filter(
    (record) => record.kind === "page" && record.pageType !== "country" && record.pageType !== "region",
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-cream">Admin</h1>
          <p className="mt-3 max-w-2xl text-sm text-cream/70">
            Country guides and new blog posts land in Review until you sign them off. Search Posts
            to edit a blog post. Filter Draft, In review or Approved.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/new/post">New post</Link>
        </Button>
      </div>

      <section className="mt-12" id="review">
        <h2 className="font-serif text-2xl text-cream">Review</h2>
        <p className="mt-2 text-sm text-cream/60">
          New country guides and blog posts land here. They stay off the public site until you approve them.
        </p>
        <AdminRecordList
          records={[...countryReview, ...postReview]}
          empty="Nothing waiting for review."
        />
      </section>

      <section className="mt-12" id="approved">
        <h2 className="font-serif text-2xl text-cream">Approved / publish</h2>
        <p className="mt-2 text-sm text-cream/60">
          Signed-off country guides. These are live on the preview now.
        </p>
        <AdminRecordList records={countryApproved} empty="No approved country guides yet." />
      </section>

      <section className="mt-12" id="drafts">
        <h2 className="font-serif text-2xl text-cream">Drafts</h2>
        <p className="mt-2 text-sm text-cream/60">Unpublished posts and pages. Not live.</p>
        <AdminRecordList records={drafts} empty="No drafts." />
      </section>

      <section className="mt-12" id="posts">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-2xl text-cream">Posts</h2>
          <Link
            className="inline-flex min-h-11 items-center text-sm text-amber hover:underline"
            href="/admin/new/post"
          >
            Add a post
          </Link>
        </div>
        <p className="mt-2 text-sm text-cream/60">Search and filter every blog post, including drafts.</p>
        <AdminPostsQueue posts={posts} />
      </section>

      <section className="mt-12" id="pages">
        <h2 className="font-serif text-2xl text-cream">Site pages</h2>
        <p className="mt-2 text-sm text-cream/60">Home, brew guides, archive pages.</p>
        <AdminRecordList records={pages} empty="No other pages." />
      </section>
    </div>
  );
}
