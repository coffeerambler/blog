"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Idea } from "@/lib/ideas";

const KEY_MESSAGE = "The writing key is not set. Summaries and full drafts wait until that step.";

export function AdminIdeasPanel({ ideas }: { ideas: Idea[] }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pendingId, setPendingId] = useState("");

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

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => setMessage(KEY_MESSAGE)}>
          Find 3 ideas
        </Button>
        {message ? <p className="text-sm text-cream/70">{message}</p> : null}
      </div>
      {!ideas.length ? (
        <p className="mt-6 text-sm text-cream/55">No new ideas.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {ideas.map((idea) => (
            <li key={idea.id} className="rounded-xl border border-white/10 bg-card px-4 py-4">
              <p className="font-medium text-cream">{idea.title}</p>
              {idea.summary ? <p className="mt-2 text-sm leading-6 text-cream/75">{idea.summary}</p> : null}
              {idea.sourceUrl ? (
                <p className="mt-2 text-xs text-cream/50">
                  {idea.sourceName ? `${idea.sourceName} · ` : null}
                  <a href={idea.sourceUrl} className="text-amber hover:underline">
                    {idea.sourceTitle || idea.sourceUrl}
                  </a>
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setMessage(KEY_MESSAGE)}>
                  Write this post
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={pendingId === idea.id}
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
