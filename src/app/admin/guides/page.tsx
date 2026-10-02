import { AdminRecordList } from "@/components/admin-record-list";
import { requireAdmin } from "@/lib/admin-guard";
import { countryGuideRecords, loadAdminRecords } from "@/lib/admin-items";

export const dynamic = "force-dynamic";

export default async function AdminGuidesPage() {
  await requireAdmin();
  const guides = countryGuideRecords(loadAdminRecords()).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Country guides</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">
        Every country guide, in review and approved.
      </p>
      <AdminRecordList records={guides} empty="No country guides." />
    </div>
  );
}
