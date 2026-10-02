"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { publicPostUrl, shareWindows } from "@/lib/share-post";
import type { SocialItem } from "@/lib/social-queue";

const KEY_MESSAGE = "The writing key is not set. Add OPENAI_API_KEY to .env.local and restart the dev server.";

function openWindow(href: string) {
  const popup = window.open(href, "cr-share", "popup,width=640,height=720");
  return Boolean(popup);
}

function SocialCard({ item }: { item: SocialItem }) {
  const router = useRouter();
  const [caption, setCaption] = useState(item.caption);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const url = publicPostUrl(item.path);

  async function saveCaption(next: string) {
    const trimmed = next.trim();
    if (!trimmed || trimmed === item.caption) return true;
    const response = await fetch("/api/admin/social/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, caption: trimmed }),
    });
    if (!response.ok) {
      setNote("The caption could not be saved.");
      return false;
    }
    return true;
  }

  async function act(action: "posted" | "remove") {
    setBusy(true);
    setNote("");
    if (action === "posted") {
      const saved = await saveCaption(caption);
      if (!saved) {
        setBusy(false);
        return;
      }
    }
    const response = await fetch("/api/admin/social/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, action }),
    });
    setBusy(false);
    if (!response.ok) {
      setNote("That could not be updated.");
      return;
    }
    router.refresh();
  }

  async function share(href: string) {
    setNote("");
    const saved = await saveCaption(caption);
    if (!saved) return;
    if (!openWindow(href)) {
      setNote("The share window was blocked. Allow pop-ups for this site, then try again.");
    }
  }

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(caption);
      setNote("Caption copied.");
    } catch {
      setNote("Could not copy the caption. Select it and copy it yourself.");
    }
  }

  return (
    <li className="rounded-xl border border-white/10 bg-card px-4 py-4">
      <p className="text-xs uppercase tracking-wide text-cream/45">
        {item.kind === "guide" ? "Country guide" : "Blog post"}
      </p>
      <p className="mt-1 font-medium text-cream">{item.title}</p>
      {item.imagePath ? (
        <figure className="mt-3 max-w-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imagePath}
            alt={item.kind === "guide" ? `Coffee growing map of ${item.title}` : ""}
            className="w-full rounded-xl border border-white/10"
          />
          <figcaption className="mt-2 text-xs text-cream/50">
            {item.kind === "guide" ? "This map is the picture on the link." : "This is the picture on the link."}
          </figcaption>
        </figure>
      ) : (
        <p className="mt-3 text-xs text-cream/50">This post has no picture.</p>
      )}
      <Textarea
        value={caption}
        rows={6}
        onChange={(event) => {
          setCaption(event.target.value);
          setNote("");
        }}
        onBlur={() => void saveCaption(caption)}
        className="mt-3 text-cream"
        aria-label={`Caption for ${item.title}`}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {shareWindows(caption, url).map((windowItem) => (
          <Button
            key={windowItem.name}
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => void share(windowItem.href)}
          >
            {windowItem.name}
          </Button>
        ))}
        <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={() => void copyCaption()}>
          Copy caption
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => void act("posted")}>
          Mark as posted
        </Button>
        <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={() => void act("remove")}>
          Remove
        </Button>
      </div>
      {note ? <p className="mt-2 text-sm text-amber">{note}</p> : null}
    </li>
  );
}

export function AdminSocialPanel({
  ready,
  posted,
  hasWritingKey,
}: {
  ready: SocialItem[];
  posted: SocialItem[];
  hasWritingKey: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);

  async function create() {
    if (!hasWritingKey) {
      setMessage(KEY_MESSAGE);
      return;
    }
    setCreating(true);
    setMessage("");
    const response = await fetch("/api/admin/social/create", { method: "POST" });
    const body = (await response.json().catch(() => null)) as {
      added?: number;
      note?: string;
      waiting?: number;
      needsKey?: boolean;
      error?: string;
    } | null;
    setCreating(false);
    if (body?.needsKey) {
      setMessage(KEY_MESSAGE);
      return;
    }
    if (!response.ok || !body) {
      setMessage(body?.error || "The social posts could not be written.");
      return;
    }
    const parts: string[] = [];
    if (body.added) parts.push(body.added === 1 ? "1 social post lined up." : `${body.added} social posts lined up.`);
    if (body.note) parts.push(body.note);
    setMessage(parts.join(" ") || "Nothing new to line up.");
    router.refresh();
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" disabled={creating} onClick={() => void create()}>
          {creating ? "Writing…" : "Create social posts"}
        </Button>
        {message ? <p className="text-sm text-cream/70">{message}</p> : null}
      </div>
      {!hasWritingKey ? <p className="mt-3 text-sm text-cream/60">{KEY_MESSAGE}</p> : null}
      {!ready.length ? (
        <p className="mt-6 text-sm text-cream/55">Nothing lined up yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {ready.map((item) => (
            <SocialCard key={item.id} item={item} />
          ))}
        </ul>
      )}
      {posted.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-2xl text-cream">Already posted</h2>
          <ul className="mt-3 space-y-2">
            {posted.map((item) => (
              <li key={item.id} className="text-sm text-cream/60">
                {item.title}
                <span className="text-cream/40"> · {item.kind === "guide" ? "country guide" : "blog post"}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
