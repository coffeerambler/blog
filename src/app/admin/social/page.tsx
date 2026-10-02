import { AdminSoon } from "@/components/admin-soon";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  await requireAdmin();
  return (
    <AdminSoon
      title="Social"
      detail="Not built yet. Sharing an approved post comes later."
    />
  );
}
