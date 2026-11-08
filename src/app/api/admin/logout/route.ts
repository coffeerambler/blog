import { cookies, draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const store = await cookies();
  const draft = await draftMode();
  draft.disable();
  store.delete("cr_admin");
  return NextResponse.json({ ok: true });
}
