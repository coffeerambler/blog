import { NextResponse } from "next/server";
import { rewriteInternalPath } from "@/lib/content";

type Props = { params: Promise<{ slug?: string[] }> };

/** Legacy Wix `/single-post/...` URLs → matching `/post/...` when we have the article. */
export async function GET(request: Request, { params }: Props) {
  const { slug } = await params;
  const parts = slug ?? [];
  const raw = `/single-post/${parts.map((part) => decodeURIComponent(part)).join("/")}`.replace(
    /\/$/,
    "",
  );
  const next = rewriteInternalPath(raw || "/single-post");
  if (!next.startsWith("/post/")) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.redirect(new URL(next, request.url), 301);
}
