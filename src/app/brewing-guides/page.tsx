import type { Metadata } from "next";
import { BrewGuidesDirectory } from "@/components/brew-guides-directory";
import { documentTitle, loadPageByPath } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = loadPageByPath("/brewing-guides");
  return {
    title: { absolute: page ? documentTitle(page) : "Home Brewing Guides | Coffee Rambler" },
    description: page?.description,
    alternates: { canonical: "https://www.coffeerambler.com/brewing-guides" },
  };
}

export default function BrewingGuidesPage() {
  const page = loadPageByPath("/brewing-guides");
  if (!page) return null;
  return <BrewGuidesDirectory hub={page} />;
}
