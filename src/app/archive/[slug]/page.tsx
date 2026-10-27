import { notFound, permanentRedirect } from "next/navigation";
import { loadPost } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

/** Old Wix archive post URLs permanently redirect to the canonical `/post/...` path. */
export default async function ArchiveSlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "categories") notFound();
  const post = await loadPost(decodeURIComponent(slug));
  if (!post) notFound();
  permanentRedirect(post.path);
}
