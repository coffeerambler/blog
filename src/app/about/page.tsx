import type { Metadata } from "next";
import { ImportedPage } from "@/components/imported-page";
import { documentTitle, loadPageByPath } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadPageByPath("/about");
  const description =
    page?.seoDescription ||
    page?.description ||
    "Keiran Jones built Coffee Rambler to help more people brew great coffee at home, share what they learn, and explore the craft behind specialty coffee.";
  return {
    title: { absolute: page ? documentTitle(page) : "About | Coffee Rambler" },
    description,
    alternates: { canonical: "https://www.coffeerambler.com/about" },
    openGraph: {
      title: page ? documentTitle(page) : "About | Coffee Rambler",
      description,
      url: "https://www.coffeerambler.com/about",
      images: page?.images?.[0]?.local ? [page.images[0].local] : undefined,
    },
  };
}

export default async function AboutPage() {
  const page = await loadPageByPath("/about");
  if (!page) return null;
  return <ImportedPage page={page} />;
}
