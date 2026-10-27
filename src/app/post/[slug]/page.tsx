import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { notFound } from "next/navigation";
import { RelatedCategoryPosts } from "@/components/related-category-posts";
import { UnpublishedBanner } from "@/components/unpublished-banner";
import { hasAdminSession } from "@/lib/admin";
import { loadPost, otherPostsInSameCategory } from "@/lib/content";
import { MarkdownWithGalleries } from "@/lib/markdown";
import { splitMarkdownAfterParagraphs, stripDuplicateCoverImage } from "@/lib/post-body";
import { publishStatus } from "@/lib/publish";
import { formatDate, siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const admin = await hasAdminSession();
  const post = await loadPost(decodeURIComponent(slug), admin ? "all" : "live");
  if (!post) notFound();
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;
  const url = siteUrl(post.path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      publishedTime: post.datetime || post.date,
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function blogPostingJsonLd(post: NonNullable<Awaited<ReturnType<typeof loadPost>>>) {
  const url = siteUrl(post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.description,
    datePublished: post.datetime || post.date,
    author: {
      "@type": "Person",
      name: post.author || "Keiran Jones",
    },
    publisher: {
      "@type": "Organization",
      name: "Coffee Rambler",
      url: "https://www.coffeerambler.com",
    },
    mainEntityOfPage: url,
    url,
    image: post.coverImage ? [siteUrl(post.coverImage)] : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const admin = await hasAdminSession();
  const post = await loadPost(decodeURIComponent(slug), admin ? "all" : "live");
  if (!post) notFound();
  const status = publishStatus(post);
  const body = stripDuplicateCoverImage(post.body, post.coverImage, post.title);
  const { lead, rest } = splitMarkdownAfterParagraphs(body, 2);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(post)) }}
      />
      {admin && status !== "approved" ? (
        <UnpublishedBanner
          status={status}
          kind="post"
          slug={post.slug}
          editHref={`/admin/edit/post/${encodeURIComponent(post.slug)}`}
        />
      ) : null}
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-amber">
          {formatDate(post.date)}
          {post.minutes ? ` · ${post.minutes} min read` : ""}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-sm text-cream/60">By {post.author}</p>
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            decoding="async"
            className="mt-8 w-full rounded-xl border border-white/10 object-cover"
          />
        ) : null}
        {lead ? (
          <div className="mt-8">
            <MarkdownWithGalleries markdown={lead} />
          </div>
        ) : null}
        <AdSlot slot="article" className="my-8" />
        {rest ? <MarkdownWithGalleries markdown={rest} /> : null}
        <RelatedCategoryPosts posts={await otherPostsInSameCategory(post)} />
      </article>
    </>
  );
}
