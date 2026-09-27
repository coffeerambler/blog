import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveFeaturedPost, ArchiveTopicList } from "@/components/archive-index";
import { EmptyState } from "@/components/post-card";
import { loadCategories, loadPageByPath, loadPosts } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = loadPageByPath("/archive");
  return {
    title: { absolute: "Archive | Coffee Rambler" },
    description:
      page?.description ||
      "Explore more about all things specialty coffee with Coffee Rambler's past blog posts.",
    alternates: { canonical: "https://www.coffeerambler.com/archive" },
  };
}

export default function ArchivePage() {
  const page = loadPageByPath("/archive");
  const posts = loadPosts();
  const categories = loadCategories();
  const featured = posts[0];
  const rest = posts.slice(1);
  const dek =
    page?.description || "Explore more about all things specialty coffee with Coffee Rambler's past blog posts.";
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
      <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">Archive</h1>
      <p className="mt-4 max-w-2xl text-cream/70">{dek}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.path}
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-3 text-sm text-cream/80 hover:border-amber hover:text-amber"
          >
            {cat.title}
          </Link>
        ))}
      </div>
      {posts.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No posts yet"
            body="The archive is empty until posts finish importing from Wix."
          />
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {featured ? <ArchiveFeaturedPost post={featured} /> : null}
          <ArchiveTopicList posts={rest} />
        </div>
      )}
    </div>
  );
}
