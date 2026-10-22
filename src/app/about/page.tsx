import type { Metadata } from "next";
import { ImportedPage } from "@/components/imported-page";
import { documentTitle, loadPageByPath } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadPageByPath("/about");
  return {
    title: { absolute: page ? documentTitle(page) : "About | Coffee Rambler" },
    description: page?.description,
    alternates: { canonical: "https://www.coffeerambler.com/about" },
  };
}

export default async function AboutPage() {
  const page = await loadPageByPath("/about");
  if (!page) return null;
  return <ImportedPage page={page} />;
}
