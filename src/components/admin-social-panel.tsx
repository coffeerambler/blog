"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MAX_SOCIAL_PICKS } from "@/lib/social-caption";
import { publicPostUrl, shareWindows } from "@/lib/share-post";
import type { SocialChoice, SocialItem } from "@/lib/social-queue";

const KEY_MESSAGE = "The writing key is not set. Add OPENAI_API_KEY to .env.local and restart the dev server.";

function choiceKey(kind: string, slug: string) {
  return `${kind}:${slug}`;
}

function openWindow(href: string) {
  const popup = window.open(href, "cr-share", "popup,width=640,height=720");
  return Boolean(popup);
}

function SocialCard({ item, onRemove }: { item: SocialItem; onRemove: (id: string) => Promise<void> }) {
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

  async function markPosted() {
    setBusy(true);
    setNote("");
    const saved = await saveCaption(caption);
    if (!saved) {
      setBusy(false);
      return;
    }
    const response = await fetch("/api/admin/social/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, action: "posted" }),
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
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-cream/45">
            {item.kind === "guide" ? "Country guide" : "Blog post"}
          </p>
          <p className="mt-1 font-medium text-cream">{item.title}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={busy}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => void onRemove(item.id)}
        >
          Remove from list
        </Button>
      </div>
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
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => void markPosted()}>
          Mark as posted
        </Button>
      </div>
      {note ? <p className="mt-2 text-sm text-amber">{note}</p> : null}
    </li>
  );
}

function ChoiceList({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: SocialChoice[];
  selected: Set<string>;
  onToggle: (choice: SocialChoice) => void;
}) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-cream/45">{label}</p>
      <ul className="mt-2 space-y-1">
        {items.map((choice) => {
          const key = choiceKey(choice.kind, choice.slug);
          const checked = selected.has(key);
          return (
            <li key={key}>
              <label className="flex cursor-pointer items-start gap-2 rounded-md px-1 py-1 text-sm text-cream hover:bg-white/5">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={checked}
                  onChange={() => onToggle(choice)}
                />
                <span>{choice.title}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AdminSocialPanel({
  ready,
  posted,
  choices,
  hasWritingKey,
}: {
  ready: SocialItem[];
  posted: SocialItem[];
  choices: SocialChoice[];
  hasWritingKey: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SocialChoice[]>([]);
  const selectedKeys = useMemo(() => new Set(selected.map((choice) => choiceKey(choice.kind, choice.slug))), [selected]);

  const needle = query.trim().toLowerCase();
  const guides = choices.filter((choice) => choice.kind === "guide" && (!needle || choice.title.toLowerCase().includes(needle)));
  const posts = needle.length >= 2
    ? choices.filter((choice) => choice.kind === "post" && choice.title.toLowerCase().includes(needle)).slice(0, 12)
    : [];

  function toggle(choice: SocialChoice) {
    const key = choiceKey(choice.kind, choice.slug);
    if (selectedKeys.has(key)) {
      setMessage("");
      setSelected((current) => current.filter((item) => choiceKey(item.kind, item.slug) !== key));
      return;
    }
    if (selected.length >= MAX_SOCIAL_PICKS) {
      setMessage(`Write up to ${MAX_SOCIAL_PICKS} at a time.`);
      return;
    }
    setMessage("");
    setSelected((current) => [...current, choice]);
  }

  async function create() {
    if (!hasWritingKey) {
      setMessage(KEY_MESSAGE);
      return;
    }
    if (!selected.length) {
      setMessage("Tick a country guide or search for a blog post first.");
      return;
    }
    setCreating(true);
    setMessage("");
    const response = await fetch("/api/admin/social/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        picks: selected.map((choice) => ({ kind: choice.kind, slug: choice.slug })),
      }),
    });
    const body = (await response.json().catch(() => null)) as {
      added?: number;
      note?: string;
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
    setSelected([]);
    setQuery("");
    router.refresh();
  }

  async function remove(id: string) {
    setMessage("");
    const response = await fetch("/api/admin/social/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "remove" }),
    });
    if (!response.ok) {
      setMessage("That post could not be removed.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="mt-6">
      <div className="rounded-xl border border-white/10 bg-card px-4 py-4">
        <label htmlFor="social-search" className="text-sm text-cream">
          Choose what to write
        </label>
        <Input
          id="social-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts, or leave blank to see the country guides"
          className="mt-2 text-cream"
        />
        <div className="mt-4 space-y-4">
          <ChoiceList label="Country guides" items={guides} selected={selectedKeys} onToggle={toggle} />
          {needle.length >= 2 ? (
            <ChoiceList label="Blog posts" items={posts} selected={selectedKeys} onToggle={toggle} />
          ) : (
            <p className="text-sm text-cream/50">Type at least two letters to find a blog post.</p>
          )}
          {needle.length >= 2 && !posts.length ? <p className="text-sm text-cream/50">No blog post matches that.</p> : null}
        </div>
        {selected.length ? (
          <p className="mt-4 text-sm text-cream/70">
            Selected: {selected.map((choice) => choice.title).join(", ")}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button" disabled={creating || !selected.length} onClick={() => void create()}>
            {creating ? "Writing…" : selected.length ? `Write ${selected.length} caption${selected.length === 1 ? "" : "s"}` : "Write captions"}
          </Button>
          {message ? <p className="text-sm text-cream/70">{message}</p> : null}
        </div>
      </div>
      {!hasWritingKey ? <p className="mt-3 text-sm text-cream/60">{KEY_MESSAGE}</p> : null}
      {!ready.length ? (
        <p className="mt-6 text-sm text-cream/55">Nothing lined up yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {ready.map((item) => (
            <SocialCard key={item.id} item={item} onRemove={remove} />
          ))}
        </ul>
      )}
      {posted.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-2xl text-cream">Already posted</h2>
          <ul className="mt-3 space-y-2">
            {posted.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 text-sm text-cream/60">
                <span>
                  {item.title}
                  <span className="text-cream/40"> · {item.kind === "guide" ? "country guide" : "blog post"}</span>
                </span>
                <Button type="button" variant="outline" size="sm" onClick={() => void remove(item.id)}>
                  Remove from list
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
