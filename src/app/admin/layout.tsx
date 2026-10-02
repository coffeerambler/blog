import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell";
import { hasAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!(await hasAdminSession())) return children;
  return <AdminShell>{children}</AdminShell>;
}
