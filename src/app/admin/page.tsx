import { cookies } from "next/headers";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminReviewInbox } from "@/components/admin-review-inbox";
import { expectedAdminCookie } from "@/lib/admin";
import { loadAdminRecords, recordsByStatus } from "@/lib/admin-items";

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

  const review = recordsByStatus(loadAdminRecords(), "in_review");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Review</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">
        Posts, country guides, and pages waiting for a decision. They stay off the public site until you approve them.
      </p>
      <AdminReviewInbox records={review} />
    </div>
  );
}
