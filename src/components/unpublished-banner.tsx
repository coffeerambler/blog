"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { postAdminSave } from "@/lib/admin-save";
import { statusLabel, type PublishStatus } from "@/lib/publish";

export function UnpublishedBanner({
  status,
  kind,
  slug,
  editHref,
}: {
  status: PublishStatus;
  kind: "post" | "page";
  slug: string;
  editHref: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function approve() {
    try {
      await postAdminSave({ kind, slug, status: "approved" });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Approve failed.");
      return;
    }
    router.refresh();
    window.location.reload();
  }

  return (
    <div className="border-b border-amber/40 bg-amber/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-cream">
          {statusLabel(status)} — not on the live site. Only you can see this page.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={editHref}>Edit</Link>
          </Button>
          {status !== "approved" ? (
            <Button type="button" size="sm" onClick={approve}>
              Approve &amp; publish
            </Button>
          ) : null}
        </div>
      </div>
      {message ? <p className="mx-auto max-w-6xl px-4 pb-3 text-sm text-amber sm:px-6">{message}</p> : null}
    </div>
  );
}
