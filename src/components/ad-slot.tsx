"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  adsenseClient,
  adsenseSlotId,
  type AdSlotName,
} from "@/lib/ads";

const LABELS: Record<AdSlotName, string> = {
  header: "Advertisement",
  article: "Advertisement",
  sidebar: "Advertisement",
  footer: "Advertisement",
};

const SLOT_FRAME: Record<AdSlotName, string> = {
  header: "ad-slot-frame ad-slot-frame--banner",
  footer: "ad-slot-frame ad-slot-frame--banner",
  article: "ad-slot-frame ad-slot-frame--body",
  sidebar: "ad-slot-frame ad-slot-frame--body",
};

const SLOT_FORMAT: Record<AdSlotName, string> = {
  header: "horizontal",
  footer: "horizontal",
  article: "auto",
  sidebar: "auto",
};

function AdFrame({
  slot,
  children,
}: {
  slot: AdSlotName;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const maxH = slot === "header" || slot === "footer" ? "7rem" : "15rem";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lock = () => {
      if (el.style.getPropertyValue("max-height") !== maxH) {
        el.style.setProperty("max-height", maxH, "important");
      }
      if (el.style.getPropertyValue("overflow") !== "hidden") {
        el.style.setProperty("overflow", "hidden", "important");
      }
      if (el.style.getPropertyValue("max-width") !== "100%") {
        el.style.setProperty("max-width", "100%", "important");
      }
      if (el.style.getPropertyPriority("height") === "important") {
        el.style.removeProperty("height");
      }
    };
    lock();
    const observer = new MutationObserver(lock);
    observer.observe(el, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, [maxH]);

  return (
    <div ref={ref} className={SLOT_FRAME[slot]}>
      {children}
    </div>
  );
}

function Placeholder({
  slot,
  className,
}: {
  slot: AdSlotName;
  className: string;
}) {
  return (
    <AdFrame slot={slot}>
      <aside
        aria-label={LABELS[slot]}
        data-ad-slot={slot}
        className={`border-y border-dashed border-white/10 bg-white/[0.02] ${className}`}
      >
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-center px-4 py-3 text-center sm:px-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-cream/35">
            {LABELS[slot]}
          </p>
        </div>
      </aside>
    </AdFrame>
  );
}

export function AdSlot({
  slot,
  className = "",
}: {
  slot: AdSlotName;
  className?: string;
}) {
  const pathname = usePathname();
  const insRef = useRef<HTMLModElement>(null);
  const [mounted, setMounted] = useState(false);
  const client = adsenseClient();
  const unit = adsenseSlotId(slot);

  const skip =
    pathname?.startsWith("/admin") || (slot === "header" && pathname === "/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || skip || !client) return;
    const id = window.setTimeout(() => {
      const el = insRef.current;
      if (!el || el.getAttribute("data-adsbygoogle-status")) return;
      try {
        const w = window as Window & { adsbygoogle?: object[] };
        (w.adsbygoogle = w.adsbygoogle || []).push({});
      } catch {
        /* AdSense throws if a unit was already filled */
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [mounted, client, skip]);

  if (skip) return null;
  if (!client) return <Placeholder slot={slot} className={className} />;

  return (
    <AdFrame slot={slot}>
      <aside
        aria-label={LABELS[slot]}
        data-ad-slot={slot}
        className={`border-y border-dashed border-white/10 bg-white/[0.02] ${className}`}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-col items-center justify-center gap-2 overflow-hidden px-4 py-3 text-center sm:px-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-cream/35">
            {LABELS[slot]}
          </p>
          {mounted ? (
            <ins
              ref={insRef}
              className="adsbygoogle block w-full max-w-full"
              style={{ display: "block", width: "100%", maxWidth: "100%" }}
              data-ad-client={client}
              {...(unit ? { "data-ad-slot": unit } : {})}
              data-ad-format={SLOT_FORMAT[slot]}
            />
          ) : null}
        </div>
      </aside>
    </AdFrame>
  );
}
