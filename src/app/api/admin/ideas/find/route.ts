import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { findReviewedIdeas } from "@/lib/idea-writing";
import { ModelError } from "@/lib/openai";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await findReviewedIdeas(3);
    if (result.needsKey) return NextResponse.json({ needsKey: true });
    return NextResponse.json({
      added: result.added.length,
      failures: result.failures,
      note: result.note,
    });
  } catch (error) {
    const message = error instanceof ModelError ? error.message : "The feeds could not be read.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
