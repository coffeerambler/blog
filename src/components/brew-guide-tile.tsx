"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BrewGuideTile({
  href,
  src,
  name,
}: {
  href: string;
  src: string;
  name: string;
}) {
  const [tapped, setTapped] = useState(false);

  return (
    <Link
      href={href}
      aria-label={name}
      className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/10 bg-card outline-none focus-visible:ring-2 focus-visible:ring-amber"
      onClick={(event) => {
        const coarse = window.matchMedia("(hover: none)").matches;
        if (coarse && !tapped) {
          event.preventDefault();
          setTapped(true);
        }
      }}
      onBlur={() => setTapped(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
      />
      <span
        className={cn(
          "pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-background via-background/70 to-transparent p-4 opacity-0 transition duration-200",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
          tapped && "opacity-100",
        )}
      >
        <span className="font-serif text-2xl text-cream">{name}</span>
      </span>
    </Link>
  );
}
