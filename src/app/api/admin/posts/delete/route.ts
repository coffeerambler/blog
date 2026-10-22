import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { deleteCupboardDraft } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { slug?: unknown } | null;
  const slug = typeof body?.slug === "string" ? body.slug : "";
  const error = await deleteCupboardDraft(slug);
  if (error) return NextResponse.json({ error }, { status: 400 });
  revalidatePath("/admin");
  revalidatePath("/archive");
  revalidatePath(`/post/${slug}`);
  return NextResponse.json({ ok: true });
}
