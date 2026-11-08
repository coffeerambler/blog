import { draftMode } from "next/headers";

/** True only for the logged-in preview cookie. Everyone else gets the saved public page. */
export async function isAdminPreview() {
  const { isEnabled } = await draftMode();
  return isEnabled;
}
