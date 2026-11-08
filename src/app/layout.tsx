import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeScript } from "@/components/theme-script";
import { searchConsoleVerification } from "@/lib/ads";
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

export async function generateMetadata(): Promise<Metadata> {
  const google = searchConsoleVerification();
  return {
    metadataBase: new URL("https://www.coffeerambler.com"),
    title: {
      default: "Coffee Rambler",
      template: "%s | Coffee Rambler",
    },
    description:
      "Find, share and enjoy better coffee. Brewing guides, origin notes and independent specialty writing from Keiran Jones.",
    alternates: {
      canonical: "https://www.coffeerambler.com",
      types: {
        "application/rss+xml": [
          { url: "https://www.coffeerambler.com/blog-feed.xml", title: "Coffee Rambler" },
        ],
      },
    },
    openGraph: {
      type: "website",
      siteName: "Coffee Rambler",
      locale: "en_GB",
    },
    verification: google ? { google } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
