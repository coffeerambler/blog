import type { Metadata } from "next";
import { HomeBento } from "@/components/home-bento";
import { documentTitle, loadPageByPath, loadPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = loadPageByPath("/");
  return {
    title: {
      absolute: page
        ? documentTitle(page)
        : "Find, share and enjoy better coffee | Coffee Rambler",
    },
    description:
      page?.description ||
      "Coffee Rambler is a free resource for discovering more about specialty coffee, with home brew guides, a coffee archive and coffee around the world.",
    alternates: { canonical: "https://www.coffeerambler.com/" },
  };
}

export default function HomePage() {
  const posts = loadPosts();
  return <HomeBento posts={posts} />;
}
