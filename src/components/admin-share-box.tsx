"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultShareCaption, publicPostUrl, shareWindows } from "@/lib/share-post";

export function AdminShareBox({
  title,
  path,
  summary = "",
  imageSrc = "",
  imageAlt = "",
}: {
  title: string;
  path: string;
  summary?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const url = publicPostUrl(path);
  const suggested = defaultShareCaption(title, url, summary);
  const [override, setOverride] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const caption = override ?? suggested;

  function openWindow(href: string) {
    const popup = window.open(href, "cr-share", "popup,width=640,height=720");
    if (popup) {
      setNote("");
      return;
    }
    setNote("The share window was blocked. Allow pop-ups for this site, then try again.");
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
    <section className="mt-8 rounded-xl border border-white/10 bg-card p-4">
      <h2 className="font-serif text-2xl text-cream">Share</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-cream/70">
        These buttons open X, Facebook, or LinkedIn. You finish the post there. X receives this
        caption. Facebook and LinkedIn receive the link, so paste the caption if their window leaves
        it blank.
      </p>
      {imageSrc ? (
        <figure className="mt-4 max-w-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={imageAlt} className="w-full rounded-xl border border-white/10" />
          <figcaption className="mt-2 text-xs leading-5 text-cream/55">
            This map is the picture social sites use with the link.
          </figcaption>
        </figure>
      ) : null}
      <div className="mt-4 space-y-2">
        <Label htmlFor="share-caption">Caption</Label>
        <Textarea
          id="share-caption"
          value={caption}
          rows={summary ? 7 : 4}
          onChange={(event) => {
            setOverride(event.target.value);
            setNote("");
          }}
          className="text-cream"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {shareWindows(caption, url).map((item) => (
          <Button key={item.name} type="button" variant="outline" size="sm" onClick={() => openWindow(item.href)}>
            {item.name}
          </Button>
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={() => void copyCaption()}>
          Copy caption
        </Button>
      </div>
      {note ? <p className="mt-2 text-sm text-amber">{note}</p> : null}
    </section>
  );
}
