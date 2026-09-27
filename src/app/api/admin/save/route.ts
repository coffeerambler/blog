import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CountryGuideEditorial } from "@/data/country-guides/types";
import { expectedAdminCookie } from "@/lib/admin";
import { writeLocalEditorial, writeLocalStatus } from "@/lib/local-publish";
import { isPublishStatus, todayIsoDate, type PublishStatus } from "@/lib/publish";

export const dynamic = "force-dynamic";

function safeFileSlug(slug: string) {
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  return slug;
}

function writeJsonAtomic(file: string, value: unknown) {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2) + "\n");
  fs.renameSync(tmp, file);
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
  const dir = path.join(process.cwd(), "content", body.kind === "post" ? "posts" : "pages");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${slug}.json`);
  const existing = fs.existsSync(file)
    ? (JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>)
    : {
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
  if (body.guide !== undefined) {
    next.guide = body.guide;
    writeLocalEditorial(slug, body.guide);
  }

  let status: PublishStatus | undefined;
  if (isPublishStatus(body.status)) status = body.status;
  else if (typeof body.draft === "boolean") status = body.draft ? "draft" : "approved";
  if (status) {
    next.status = status;
    next.draft = status === "draft";
    if (status === "approved") next.approvedAt = todayIsoDate();
    else delete next.approvedAt;
    writeLocalStatus(slug, status);
  }

  writeJsonAtomic(file, next);
  const written = JSON.parse(fs.readFileSync(file, "utf8")) as { status?: string; path?: string };
  if (status && written.status !== status) {
    return NextResponse.json({ error: "Status did not persist to disk." }, { status: 500 });
  }

  const pagePath = typeof next.path === "string" ? next.path : `/${slug}`;
  revalidateAfterSave(pagePath);

  return NextResponse.json({
    ok: true,
    path: pagePath,
    status: written.status || status || "approved",
  });
}
