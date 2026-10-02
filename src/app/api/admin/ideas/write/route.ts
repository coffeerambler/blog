import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { writeIdeaPost } from "@/lib/idea-writing";
import { ModelError } from "@/lib/openai";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { id?: unknown } | null;
  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const result = await writeIdeaPost(id);
    if ("needsKey" in result) return NextResponse.json({ needsKey: true });
    if ("tooThin" in result) return NextResponse.json({ tooThin: true, reason: result.reason });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, slug: result.slug, path: result.path });
  } catch (error) {
    const message = error instanceof ModelError ? error.message : "That post could not be written.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
