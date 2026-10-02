import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { readSocialQueue, runSocialJob, saveSocialQueue, updateSocialCaption, markSocialPosted, removeSocialItem } from "@/lib/social-queue";

export const dynamic = "force-dynamic";

async function authorised() {
  const store = await cookies();
  return store.get("cr_admin")?.value === expectedAdminCookie();
}

export async function POST(request: Request) {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { id?: string; caption?: string } | null;
  const id = body?.id?.trim() || "";
  if (!id || typeof body?.caption !== "string") {
    return NextResponse.json({ error: "Missing caption." }, { status: 400 });
  }
  const caption = body.caption.trim();
  if (!caption) return NextResponse.json({ error: "The caption is empty." }, { status: 400 });
  const found = await runSocialJob(() => {
    const items = readSocialQueue();
    if (!items.some((item) => item.id === id)) return false;
    saveSocialQueue(updateSocialCaption(items, id, caption));
    return true;
  });
  if (!found) return NextResponse.json({ error: "That social post is not in the lineup." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { id?: string; action?: string } | null;
  const id = body?.id?.trim() || "";
  if (!id || (body?.action !== "posted" && body?.action !== "remove")) {
    return NextResponse.json({ error: "Missing action." }, { status: 400 });
  }
  const found = await runSocialJob(() => {
    const items = readSocialQueue();
    if (!items.some((item) => item.id === id)) return false;
    saveSocialQueue(body?.action === "posted" ? markSocialPosted(items, id) : removeSocialItem(items, id));
    return true;
  });
  if (!found) return NextResponse.json({ error: "That social post is not in the lineup." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
