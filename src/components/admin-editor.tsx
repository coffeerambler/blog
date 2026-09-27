"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminStatusSelect } from "@/components/admin-status-select";
import { postAdminSave } from "@/lib/admin-save";
import type { PublishStatus } from "@/lib/publish";

export function AdminEditor(props: {
  kind: "post" | "page";
  slug: string;
  title: string;
  description: string;
  date: string;
  markdown: string;
  status: PublishStatus;
  viewHref: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(props.status);
  const [message, setMessage] = useState("");

  async function save(nextStatus: PublishStatus) {
    const form = document.getElementById("admin-editor-form") as HTMLFormElement | null;
    if (!form) return;
    const data = new FormData(form);
    try {
      await postAdminSave({
        kind: props.kind,
        slug: props.slug,
        title: data.get("title"),
        description: data.get("description"),
        date: data.get("date"),
        markdown: data.get("markdown"),
        status: nextStatus,
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
      return;
    }
    setStatus(nextStatus);
    setMessage(nextStatus === "approved" ? "Approved. This is now live." : "Saved.");
    router.refresh();
    if (nextStatus === "approved") {
      window.location.assign(props.viewHref);
    }
  }

  return (
    <form
      id="admin-editor-form"
      onSubmit={(event) => {
        event.preventDefault();
        void save(status);
      }}
      className="mt-8 space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={props.title} className="text-cream" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">SEO description</Label>
        <Textarea id="description" name="description" defaultValue={props.description} className="text-cream" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" defaultValue={props.date} className="text-cream" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <AdminStatusSelect value={status} onChange={setStatus} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="markdown">Body (markdown)</Label>
        <Textarea
          id="markdown"
          name="markdown"
          defaultValue={props.markdown}
          rows={22}
          className="min-h-80 font-mono text-sm text-cream"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Save</Button>
        {status !== "approved" ? (
          <Button type="button" onClick={() => void save("approved")}>
            Approve &amp; publish
          </Button>
        ) : null}
        <a className="text-sm text-amber hover:underline" href={props.viewHref}>
          View on site
        </a>
      </div>
      {message ? <p className="text-sm text-amber">{message}</p> : null}
    </form>
  );
}
