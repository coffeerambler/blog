import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import { AdScripts } from "@/components/ad-scripts";
import { CookieNotice } from "@/components/cookie-notice";
import { PlausibleScript } from "@/components/plausible-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hasAdminSession } from "@/lib/admin";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coffeerambler.com"),
  title: {
    default: "Coffee Rambler",
    template: "%s | Coffee Rambler",
  },
  description:
    "Find, share and enjoy better coffee. Brewing guides, origin notes and independent specialty writing from Keiran Jones.",
  alternates: { canonical: "https://www.coffeerambler.com" },
  openGraph: {
    type: "website",
    siteName: "Coffee Rambler",
    locale: "en_GB",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const path = (await headers()).get("x-pathname") ?? "";
  const admin = path.startsWith("/admin");
  const loggedIn = await hasAdminSession();

  return (
    <html
      lang="en-GB"
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AdScripts />
        {admin || loggedIn ? null : <PlausibleScript />}
        {admin ? null : <SiteHeader />}
        <main className="flex-1">{children}</main>
        {admin ? null : <SiteFooter />}
        <CookieNotice />
      </body>
    </html>
  );
}
