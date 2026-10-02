"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adsenseEnabled, gaEnabled } from "@/lib/ads";

const STORAGE_KEY = "cr-cookie-notice-dismissed";

export function CookieNotice() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const adsOn = adsenseEnabled();
  const visitsOn = gaEnabled();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setOpen(false);
      return;
    }
    try {
      setOpen(window.localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.documentElement.style.removeProperty("--cookie-notice-h");
      return;
    }
    const el = barRef.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--cookie-notice-h", `${el.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--cookie-notice-h");
    };
  }, [open]);

  if (!open) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  return (
    <div
      ref={barRef}
      data-cookie-notice="true"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-cream/80">
          {adsOn && visitsOn
            ? "You do not need an account to read Coffee Rambler. Google may use cookies to serve and measure advertisements, and Google Analytics uses cookies to measure visits."
            : visitsOn
              ? "You do not need an account to read Coffee Rambler. Google Analytics uses cookies to measure visits to this site."
              : adsOn
                ? "You do not need an account to read Coffee Rambler. Google may use cookies to serve and measure advertisements on this site."
                : "You do not need an account to read Coffee Rambler. This site does not use tracking cookies."}{" "}
          <Link href="/privacy" className="text-amber hover:underline">
            Privacy and cookies
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-amber/40 px-4 text-sm text-amber hover:bg-amber/10"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
