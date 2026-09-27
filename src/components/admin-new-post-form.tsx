"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function slugFromTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function AdminNewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("/api/admin/new-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug }),
    });
    const payload = (await res.json()) as { error?: string; slug?: string };
    if (!res.ok) {
      setError(payload.error || "Could not create the post.");
      return;
    }
    router.push(`/admin/edit/post/${encodeURIComponent(payload.slug || slug)}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(event) => {
            const next = event.target.value;
            setTitle(next);
            if (!slugTouched) setSlug(slugFromTitle(next));
          }}
          required
          className="text-cream"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
          required
          className="font-mono text-sm text-cream"
        />
      </div>
      <p className="text-sm text-cream/60">
        The post starts in Review with a blank body. Add a cover before you publish.
      </p>
      <Button type="submit">Create draft</Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
