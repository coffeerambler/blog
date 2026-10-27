import { notFound, permanentRedirect } from "next/navigation";
import { rewriteInternalPath } from "@/lib/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

/** Legacy Wix `/single-post/...` URLs redirect to the matching `/post/...` when we have it. */
export default async function SinglePostRedirect({ params }: Props) {
  const { slug } = await params;
  const parts = slug ?? [];
  const raw = `/single-post/${parts.map((part) => decodeURIComponent(part)).join("/")}`;
  const next = rewriteInternalPath(raw.replace(/\/$/, "") || "/single-post");
  if (!next.startsWith("/post/")) notFound();
  permanentRedirect(next);
}
