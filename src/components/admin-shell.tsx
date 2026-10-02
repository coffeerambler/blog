"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin-logout-button";

const ITEMS = [
  { href: "/admin", label: "Review", exact: true },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/guides", label: "Country guides" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/ideas", label: "Ideas" },
  { href: "/admin/social", label: "Social" },
  { href: "/admin/analytics", label: "Analytics" },
];

function isCurrent(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpenPath(null)}
        />
      ) : null}
      <aside
        className={`${
          open ? "fixed inset-y-0 left-0 z-40 flex w-64" : "hidden"
        } flex-col border-r border-white/10 bg-background lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-auto`}
      >
        <div className="border-b border-white/10 px-4 py-5">
          <p className="font-serif text-lg text-cream">Coffee Rambler</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-amber">Admin</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {ITEMS.map((item) => {
            const current = isCurrent(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm ${
                  current ? "bg-amber/15 text-amber" : "text-cream/80 hover:bg-white/5 hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <AdminLogoutButton />
        </div>
      </aside>
      <div className="min-w-0">
        <div className="sticky top-0 z-20 flex h-14 items-center border-b border-white/10 bg-background px-4 lg:hidden">
          <button
            type="button"
            className="inline-flex min-h-11 items-center text-sm text-amber"
            onClick={() => setOpenPath(pathname)}
          >
            Menu
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
