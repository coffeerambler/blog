import fs from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { cupboardEnabled, readCupboard, updateCupboard } from "@/lib/cupboard";

export const dynamic = "force-dynamic";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function listDiskImages() {
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

async function listImages() {
  const disk = listDiskImages();
  if (!cupboardEnabled()) return disk;
  const uploaded = (await readCupboard()).images.map((image) => ({ src: image.url, name: image.name }));
  const seen = new Set(uploaded.map((image) => image.src));
  return [...uploaded, ...disk.filter((image) => !seen.has(image.src))];
}

export async function GET() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ images: await listImages() });
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
  const safeBase = (file.name || "cover")
    .toLowerCase()
    .replace(ext, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const name = `upload-${Date.now()}-${safeBase || "image"}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (cupboardEnabled()) {
    const blob = await put(`images/${name}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || "application/octet-stream",
    });
    await updateCupboard((draft) => {
      draft.images = [
        { name, url: blob.url, pathname: blob.pathname },
        ...draft.images.filter((image) => image.name !== name),
      ];
    });
    return NextResponse.json({ ok: true, src: blob.url, name });
  }

  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMAGE_DIR, name), buffer);
  return NextResponse.json({ ok: true, src: `/images/${name}`, name });
}
