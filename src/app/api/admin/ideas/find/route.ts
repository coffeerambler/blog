import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { expectedAdminCookie } from "@/lib/admin";
import { findNewIdeas } from "@/lib/ideas";

export const dynamic = "force-dynamic";

export async function POST() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await findNewIdeas(3);
  return NextResponse.json({
    added: result.added.length,
    failures: result.failures,
    note: result.note,
  });
}
