import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { ModelError } from "@/lib/openai";
import { createSocialPosts } from "@/lib/social-draft";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(request: Request) {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { picks?: { kind?: string; slug?: string }[] } | null;
  const picks = Array.isArray(body?.picks)
    ? body.picks
        .filter((pick) => pick && (pick.kind === "guide" || pick.kind === "post") && typeof pick.slug === "string")
        .map((pick) => ({ kind: pick.kind as string, slug: pick.slug as string }))
    : [];
  try {
    const result = await createSocialPosts(picks);
    if (result.needsKey) return NextResponse.json({ needsKey: true });
    return NextResponse.json({
      added: result.added.length,
      note: result.note,
    });
  } catch (error) {
    const message = error instanceof ModelError ? error.message : "The social posts could not be written.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
