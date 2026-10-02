import { AdminSoon } from "@/components/admin-soon";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  return (
    <AdminSoon
      title="Analytics"
      detail="Not built yet. Visitor counts come later, after a store is chosen."
    />
  );
}