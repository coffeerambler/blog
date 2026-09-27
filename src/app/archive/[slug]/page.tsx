import { notFound } from "next/navigation";
import PostPage, { generateMetadata as postMeta } from "@/app/post/[slug]/page";
import { loadPost } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const post = loadPost(decodeURIComponent(slug));
  if (!post) return { title: "Archive" };
  return postMeta({ params: Promise.resolve({ slug }) });
}

export default async function ArchiveSlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "categories") notFound();
  const post = loadPost(decodeURIComponent(slug));
  if (!post) notFound();
  return PostPage({ params: Promise.resolve({ slug: post.slug }) });
}
