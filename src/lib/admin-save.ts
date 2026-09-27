import type { PublishStatus } from "@/lib/publish";

export async function postAdminSave(payload: Record<string, unknown>) {
  const res = await fetch("/api/admin/save", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string; status?: PublishStatus; path?: string };
  if (!res.ok) {
    const hint =
      res.status === 401 ? "Session expired. Log in again at /admin." : data.error || `Save failed (${res.status})`;
    throw new Error(hint);
  }
  return data;
}
