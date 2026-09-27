import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { writeLocalStatus } from "@/lib/local-publish";
import { todayIsoDate } from "@/lib/publish";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as { title?: string; slug?: string };
  const title = (body.title || "").trim();
  const slug = slugify(body.slug || title);
  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Slug can only use letters, numbers and hyphens." }, { status: 400 });
  }
  const file = path.join(process.cwd(), "content", "posts", `${slug}.json`);
  if (fs.existsSync(file)) {
    return NextResponse.json({ error: "That slug already exists." }, { status: 409 });
  }
  const record = {
    type: "post",
    slug,
    path: `/post/${slug}`,
    title,
    description: "",
    date: todayIsoDate(),
    author: "Keiran Jones",
    minutes: null,
    categories: [],
    coverImage: null,
    excerpt: "",
    body: "",
    images: [],
    status: "in_review",
    draft: false,
    generatedBy: "import",
  };
  fs.writeFileSync(file, JSON.stringify(record, null, 2) + "\n");
  writeLocalStatus(slug, "in_review");
  return NextResponse.json({ ok: true, slug, path: record.path });
}
