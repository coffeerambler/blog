import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookieValue, expectedAdminCookie } from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const expected = expectedAdminCookie();
  if (!body.password || adminCookieValue(body.password) !== expected) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  const store = await cookies();
  store.set("cr_admin", expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return NextResponse.json({ ok: true });
}
