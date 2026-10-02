"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Idea } from "@/lib/ideas";

const KEY_MESSAGE = "The writing key is not set. Add OPENAI_API_KEY to .env.local and restart the dev server.";

export function AdminIdeasPanel({ ideas, hasWritingKey }: { ideas: Idea[]; hasWritingKey: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [draftHref, setDraftHref] = useState("");
  const [pendingId, setPendingId] = useState("");
  const [writingId, setWritingId] = useState("");
  const [finding, setFinding] = useState(false);
  const busy = finding || Boolean(pendingId) || Boolean(writingId);

  async function dismiss(id: string) {
    setPendingId(id);
    setMessage("");
    const response = await fetch("/api/admin/ideas/dismiss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPendingId("");
    if (!response.ok) {
      setMessage("That idea could not be dismissed.");
      return;
    }
    router.refresh();
  }

  async function find() {
    if (!hasWritingKey) {
      setMessage(KEY_MESSAGE);
      setDraftHref("");
      return;
    }
    setFinding(true);
    setMessage("");
    setDraftHref("");
    const response = await fetch("/api/admin/ideas/find", { method: "POST" });
    const body = (await response.json().catch(() => null)) as {
      added?: number;
      failures?: string[];
      note?: string;
      needsKey?: boolean;
      error?: string;
    } | null;
    setFinding(false);
    if (body?.needsKey) {
      setMessage(KEY_MESSAGE);
      return;
    }
    if (!response.ok || !body) {
      setMessage(body?.error || "The feeds could not be read.");
      return;
    }
    const parts: string[] = [];
    if (body.added) parts.push(body.added === 1 ? "1 new idea." : `${body.added} new ideas.`);
    if (body.note) parts.push(body.note);
    if (body.failures?.length) parts.push(`Could not read ${body.failures.join(", ")}.`);
    setMessage(parts.join(" ") || "No new ideas.");
    router.refresh();
  }

  async function write(id: string) {
    if (!hasWritingKey) {
      setMessage(KEY_MESSAGE);
      setDraftHref("");
      return;
    }
    setWritingId(id);
    setMessage("");
    setDraftHref("");
    const response = await fetch("/api/admin/ideas/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const body = (await response.json().catch(() => null)) as {
      needsKey?: boolean;
      tooThin?: boolean;
      reason?: string;
      error?: string;
      slug?: string;
    } | null;
    setWritingId("");
    if (body?.needsKey) {
      setMessage(KEY_MESSAGE);
      return;
    }
    if (body?.tooThin) {
      setMessage(body.reason || "The source is too thin to support a post.");
      return;
    }
    if (!response.ok || !body?.slug) {
      setMessage(body?.error || "That post could not be written.");
      return;
    }
    setMessage("Draft is in Review.");
    setDraftHref(`/admin/edit/post/${body.slug}`);
    router.refresh();
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" disabled={busy} onClick={() => void find()}>
          {finding ? "Choosing…" : "Find 3 ideas"}
        </Button>
        {message ? <p className="text-sm text-cream/70">{message}</p> : null}
        {draftHref ? (
          <a className="text-sm text-amber hover:underline" href={draftHref}>
            Open the draft
          </a>
        ) : null}
      </div>
      {!ideas.length ? (
        <p className="mt-6 text-sm text-cream/55">No new ideas.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {ideas.map((idea) => (
            <li key={idea.id} className="rounded-xl border border-white/10 bg-card px-4 py-4">
              <p className="font-medium text-cream">{idea.title}</p>
              {idea.summary ? (
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-cream/75">{idea.summary}</p>
              ) : null}
              {idea.sourceUrl ? (
                <p className="mt-2 text-xs text-cream/50">
                  {idea.sourceName ? `${idea.sourceName} · ` : null}
                  <a href={idea.sourceUrl} className="text-amber hover:underline">
                    {idea.sourceTitle || idea.sourceUrl}
                  </a>
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={busy}
                  onClick={() => void write(idea.id)}
                >
                  {writingId === idea.id ? "Writing…" : "Write this post"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={busy || pendingId === idea.id}
                  onClick={() => dismiss(idea.id)}
                >
                  Dismiss
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
