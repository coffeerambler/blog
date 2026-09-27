import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveYearList } from "@/components/archive-index";
import { EmptyState } from "@/components/post-card";
import {
  displayTitle,
  documentTitle,
  loadCategories,
  loadPageByPath,
  postsInCategory,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return loadCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = loadPageByPath(`/archive/categories/${slug}`);
  const title = page ? documentTitle(page) : slug;
  return {
    title: { absolute: title },
    description: page?.description,
    alternates: { canonical: `https://www.coffeerambler.com/archive/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const page = loadPageByPath(`/archive/categories/${decoded}`);
  if (!page) notFound();
  const posts = postsInCategory(decoded);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-amber">Archive</p>
      <h1 className="mt-2 font-serif text-4xl text-cream">{displayTitle(page)}</h1>
      {page.description ? <p className="mt-4 text-cream/70">{page.description}</p> : null}
      {posts.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No posts in this category yet"
            body="The category URL is live. Posts will appear here once category membership is fully mapped."
          />
        </div>
      ) : (
        <div className="mt-10">
          <ArchiveYearList posts={posts} />
        </div>
      )}
    </div>
  );
}
