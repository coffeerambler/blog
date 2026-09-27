import type { Metadata } from "next";
import { ImportedPage } from "@/components/imported-page";
import { documentTitle, loadPageByPath } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = loadPageByPath("/about");
  return {
    title: { absolute: page ? documentTitle(page) : "About/Contact Me | Coffee Rambler" },
    description: page?.description,
    alternates: { canonical: "https://www.coffeerambler.com/about" },
  };
}

export default function AboutPage() {
  const page = loadPageByPath("/about");
  if (!page) return null;
  return <ImportedPage page={page} />;
}
