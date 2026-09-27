import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export function adminPassword() {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password ? password : null;
}

export function adminCookieValue(password: string) {
  return createHash("sha256").update(`coffee-rambler:${password}`).digest("hex");
}

export function expectedAdminCookie() {
  const password = adminPassword();
  if (!password) return null;
  return adminCookieValue(password);
}

export async function hasAdminSession() {
  const expected = expectedAdminCookie();
  if (!expected) return false;
  const store = await cookies();
  return store.get("cr_admin")?.value === expected;
}
