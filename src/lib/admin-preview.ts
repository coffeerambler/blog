"use server";

import { draftMode } from "next/headers";
import { hasAdminSession } from "@/lib/admin";

/** Turn on live preview for an existing login. Login and logout set the cookie themselves. */
export async function enableAdminPreview() {
  if (!(await hasAdminSession())) return;
  const draft = await draftMode();
  if (!draft.isEnabled) draft.enable();
}
