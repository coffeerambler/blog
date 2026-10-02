"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();

  async function onClick() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" onClick={onClick}>
      Sign out
    </Button>
  );
}
