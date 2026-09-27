import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";

export const dynamic = "force-dynamic";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function listImages() {
  if (!fs.existsSync(IMAGE_DIR)) return [];
  return fs
    .readdirSync(IMAGE_DIR)
    .filter((name) => ALLOWED.has(path.extname(name).toLowerCase()))
    .sort((a, b) => {
      const aTime = fs.statSync(path.join(IMAGE_DIR, a)).mtimeMs;
      const bTime = fs.statSync(path.join(IMAGE_DIR, b)).mtimeMs;
      return bTime - aTime;
    })
    .map((name) => ({ src: `/images/${name}`, name }));
}

export async function GET() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ images: listImages() });
}

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ error: "Use a jpg, png, webp or gif." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Keep uploads under 8MB." }, { status: 400 });
  }
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  const safeBase = (file.name || "cover")
    .toLowerCase()
    .replace(ext, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const name = `upload-${Date.now()}-${safeBase || "image"}${ext}`;
  const dest = path.join(IMAGE_DIR, name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  return NextResponse.json({ ok: true, src: `/images/${name}`, name });
}
