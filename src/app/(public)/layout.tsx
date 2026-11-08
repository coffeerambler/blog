import type { ReactNode } from "react";
import { AdScripts } from "@/components/ad-scripts";
import { CookieNotice } from "@/components/cookie-notice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdScripts />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieNotice />
    </>
  );
}
