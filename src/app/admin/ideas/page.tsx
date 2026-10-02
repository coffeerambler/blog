import { AdminSoon } from "@/components/admin-soon";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminIdeasPage() {
  await requireAdmin();
  return (
    <AdminSoon
      title="Ideas"
      detail="Not built yet. Blog ideas will be reviewed here."
    />
  );
}
