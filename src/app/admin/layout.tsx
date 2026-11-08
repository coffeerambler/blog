import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell";
import { EnableAdminPreview } from "@/components/enable-admin-preview";
import { hasAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const loggedIn = await hasAdminSession();
  return (
    <main className="flex-1">
      {loggedIn ? <EnableAdminPreview /> : null}
      {loggedIn ? <AdminShell>{children}</AdminShell> : children}
    </main>
  );
}
