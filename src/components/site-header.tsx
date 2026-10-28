"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { HeaderAdSlot } from "@/components/header-ad-slot";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/brewing-guides", label: "Brewing Guides" },
  { href: "/world-coffee-guide", label: "World Coffee Guide" },
  { href: "/about", label: "About" },
  { href: "https://rambler.coffee", label: "App", external: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <header>
      <div className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link href="/" className="shrink-0 py-1" onClick={closeMenu}>
            <p className="font-serif text-lg tracking-wide text-cream sm:text-xl">
              Coffee Rambler
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber">
              Find, share, enjoy
            </p>
          </Link>
          <nav className="hidden items-center gap-1 text-sm text-cream/80 lg:flex">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full border border-amber/40 px-3 text-amber hover:bg-amber hover:text-background"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-2 hover:text-amber"
                >
                  {item.label}
                </Link>
              ),
            )}
            <ThemeToggle className="ml-1" />
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <details ref={menuRef} className="relative z-50">
              <summary className="inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md border border-border px-3 text-sm text-cream [&::-webkit-details-marker]:hidden">
                Menu
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-border bg-card p-2 shadow-xl">
                {NAV.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex min-h-11 items-center rounded px-3 text-sm text-amber"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-11 items-center rounded px-3 text-sm text-cream hover:bg-foreground/5"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </details>
          </div>
        </div>
      </div>
      <HeaderAdSlot />
    </header>
  );
}
