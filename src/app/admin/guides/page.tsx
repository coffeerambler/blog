import { AdminRecordList } from "@/components/admin-record-list";
import { requireAdmin } from "@/lib/admin-guard";
import { countryGuideRecords, loadAdminRecords, recordsByStatus } from "@/lib/admin-items";

export const dynamic = "force-dynamic";

export default async function AdminGuidesPage() {
  await requireAdmin();
  const guides = countryGuideRecords(loadAdminRecords());
  const review = recordsByStatus(guides, "in_review");
  const approved = recordsByStatus(guides, "approved");
  const drafts = recordsByStatus(guides, "draft");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Country guides</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">
        In review until you sign them off. Approved guides are live.
      </p>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-cream">In review</h2>
        <AdminRecordList records={review} empty="No country guides in review." />
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-cream">Approved</h2>
        <AdminRecordList records={approved} empty="No approved country guides yet." />
      </section>

      {drafts.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-2xl text-cream">Drafts</h2>
          <AdminRecordList records={drafts} empty="No drafts." />
        </section>
      ) : null}
    </div>
  );
}
