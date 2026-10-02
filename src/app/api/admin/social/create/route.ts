import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { ModelError } from "@/lib/openai";
import { createSocialPosts } from "@/lib/social-draft";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await createSocialPosts(3);
    if (result.needsKey) return NextResponse.json({ needsKey: true });
    return NextResponse.json({
      added: result.added.length,
      note: result.note,
      waiting: result.waiting,
    });
  } catch (error) {
    const message = error instanceof ModelError ? error.message : "The social posts could not be written.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
