"use client";

import type { ReactNode } from "react";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Render `[text](href)` inside a caption without pulling server markdown. */
export function CaptionWithLinks({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(LINK.source, "g");
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const href = match[2];
    const external = /^https?:\/\//.test(href);
    nodes.push(
      <a
        key={`${match.index}-${href}`}
        href={href}
        className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {match[1]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
