import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CountryGuideEditorial } from "@/data/country-guides/types";
import { expectedAdminCookie } from "@/lib/admin";
import { readEditableRecord, writeEditableRecord } from "@/lib/content-store";
import { isPublishStatus, todayIsoDate, type PublishStatus } from "@/lib/publish";

export const dynamic = "force-dynamic";

function safeFileSlug(slug: string) {
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  return slug;
}

function revalidateAfterSave(pagePath: string) {
  revalidatePath(pagePath);
  revalidatePath("/archive");
  revalidatePath("/world-coffee-guide");
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as {
    kind: "post" | "page";
    slug: string;
    title?: string;
    seoTitle?: string;
    description?: string;
    date?: string;
    markdown?: string;
    draft?: boolean;
    status?: PublishStatus;
    coverImage?: string | null;
    categories?: string[];
    guide?: CountryGuideEditorial;
  };
  const slug = safeFileSlug(body.slug || "");
  if (!slug || (body.kind !== "post" && body.kind !== "page")) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const existing = (await readEditableRecord(body.kind, slug)) || {
    type: body.kind,
    slug,
    path: body.kind === "post" ? `/post/${slug}` : `/${slug}`,
    images: [],
    author: "Keiran Jones",
    body: "",
  };

  const next: Record<string, unknown> = { ...existing };
  if (body.title !== undefined) next.title = body.title;
  if (typeof body.seoTitle === "string") {
    const seo = body.seoTitle.trim();
    next.seoTitle = seo || body.title || existing.seoTitle;
  } else if (body.title !== undefined) {
    const existingSeo = typeof existing.seoTitle === "string" ? existing.seoTitle : "";
    const existingTitle = typeof existing.title === "string" ? existing.title : "";
    if (!existingSeo || existingSeo === existingTitle) next.seoTitle = body.title;
  }
  if (body.description !== undefined) {
    next.description = body.description;
    next.seoDescription = body.description;
  }
  if (body.date !== undefined) next.date = body.date;
  if (body.markdown !== undefined) next.body = body.markdown;
  if (body.coverImage !== undefined) {
    next.coverImage = body.coverImage || null;
  }
  if (Array.isArray(body.categories)) {
    next.categories = body.categories.filter((value) => typeof value === "string");
  }
  if (body.guide !== undefined) next.guide = body.guide;

  let status: PublishStatus | undefined;
  if (isPublishStatus(body.status)) status = body.status;
  else if (typeof body.draft === "boolean") status = body.draft ? "draft" : "approved";
  if (status) {
    next.status = status;
    next.draft = status === "draft";
    if (status === "approved") next.approvedAt = todayIsoDate();
    else delete next.approvedAt;
  }

  try {
    await writeEditableRecord(body.kind, slug, next, {
      status,
      guide: body.guide,
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    if (code === "EROFS" || code === "EPERM" || code === "EACCES") {
      return NextResponse.json(
        { error: "This server cannot store the edit. Add BLOB_READ_WRITE_TOKEN on Vercel." },
        { status: 500 },
      );
    }
    throw error;
  }

  const pagePath = typeof next.path === "string" ? next.path : `/${slug}`;
  revalidateAfterSave(pagePath);

  return NextResponse.json({
    ok: true,
    path: pagePath,
    status: (typeof next.status === "string" && next.status) || status || "approved",
  });
}
