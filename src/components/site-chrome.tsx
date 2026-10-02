"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CookieNotice } from "@/components/cookie-notice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");

  return (
    <>
      {admin ? null : <SiteHeader />}
      <main className="flex-1">{children}</main>
      {admin ? null : <SiteFooter />}
      <CookieNotice />
    </>
  );
}
