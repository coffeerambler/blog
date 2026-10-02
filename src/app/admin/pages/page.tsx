import { AdminRecordList } from "@/components/admin-record-list";
import { requireAdmin } from "@/lib/admin-guard";
import { loadAdminRecords } from "@/lib/admin-items";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  await requireAdmin();
  const pages = loadAdminRecords()
    .filter((record) => record.kind === "page" && record.pageType !== "country")
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Pages</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">Home, brew guides, archive, and region pages.</p>
      <AdminRecordList records={pages} empty="No other pages." />
    </div>
  );
}
