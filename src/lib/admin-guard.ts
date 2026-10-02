import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin";

export async function requireAdmin() {
  if (!(await hasAdminSession())) redirect("/admin");
}
