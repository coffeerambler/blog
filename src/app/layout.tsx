import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AdScripts } from "@/components/ad-scripts";
import { CookieNotice } from "@/components/cookie-notice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AdScripts />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieNotice />
      </body>
    </html>
  );
}
