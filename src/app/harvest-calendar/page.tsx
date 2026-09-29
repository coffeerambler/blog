import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { HarvestCalendar } from "@/components/harvest-calendar";

export const metadata: Metadata = {
  title: { absolute: "Harvest Calendar | Coffee Rambler" },
  description: "Harvest calendar.",
  alternates: { canonical: "https://www.coffeerambler.com/harvest-calendar" },
};

export default function HarvestCalendarPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
        <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">Harvest Calendar</h1>
        <p className="mt-4 text-lg text-cream/70">
          Country guides on{" "}
          <Link href="/world-coffee-guide" className="text-amber hover:underline">
            World Coffee Guide
          </Link>
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <AdSlot slot="article" className="mb-8 border-x-0" />
          <div className="h-[80vh] min-h-[36rem] overflow-hidden rounded-md border border-border/40 bg-card/10">
            <HarvestCalendar />
          </div>
        </div>
        <aside className="space-y-4">
          <AdSlot slot="sidebar" className="border" />
          <div className="rounded-xl border border-white/10 bg-card p-4 text-sm text-cream/75">
            <Link href="/world-coffee-guide" className="inline-flex min-h-11 items-center font-serif text-lg text-cream hover:text-amber">
              World Coffee Guide
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
