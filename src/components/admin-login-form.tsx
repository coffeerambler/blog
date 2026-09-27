"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") || "");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Wrong password.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Admin password</Label>
        <Input id="password" name="password" type="password" required className="text-cream" />
      </div>
      <Button type="submit">Sign in</Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
