import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { dismissIdea } from "@/lib/ideas";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { id?: unknown } | null;
  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const idea = dismissIdea(id);
  if (!idea) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
