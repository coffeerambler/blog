import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { HarvestCalendar } from "@/components/harvest-calendar";
import { COFFEE_HARVEST_SEASONS } from "@/lib/coffee-harvest-seasons";
import { formatMonthWindow } from "@/lib/harvest-window";

const PAGE_TITLE = "Coffee Harvest Calendar | Coffee Rambler";
const PAGE_DESCRIPTION =
  "When coffee is harvested in each country, from Ethiopia and Kenya to Brazil and Colombia, and when fresh lots usually reach roasters.";
const PAGE_URL = "https://www.coffeerambler.com/harvest-calendar";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
};

function harvestCalendarJsonLd() {
  const origins = [...COFFEE_HARVEST_SEASONS].sort((a, b) => a.country.localeCompare(b.country));
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Coffee Harvest Calendar",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    mainEntity: {
      "@type": "ItemList",
      name: "Coffee harvest by country",
      itemListElement: origins.map((origin, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${origin.country} coffee harvest`,
        description: `${origin.country} coffee harvest: ${formatMonthWindow(origin.harvestMonths)}. On market: ${formatMonthWindow(origin.marketMonths)}.`,
      })),
    },
  };
}

export default function HarvestCalendarPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
        <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">Coffee Harvest Calendar</h1>
        <p className="mt-4 text-lg text-cream/70">
          See when each country harvests coffee, and when that crop usually reaches roasters. These are
          approximate country-level windows. Origin notes are in the{" "}
          <Link href="/world-coffee-guide" className="text-amber hover:underline">
            World Coffee Guide
          </Link>
          .
        </p>
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(harvestCalendarJsonLd()).replace(/</g, "\\u003c") }}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <AdSlot slot="article" className="mb-8 border-x-0" />
          <HarvestCalendar />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
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
