import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { AdSlot } from "@/components/ad-slot";
import { OriginsMap } from "@/components/origins-map";
import { originCountryGuides } from "@/lib/coffee-belt-pages";
import { displayTitle, documentTitle, loadPageByPath } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = loadPageByPath("/world-coffee-guide");
  return {
    title: { absolute: page ? documentTitle(page) : "World Coffee Guide | Coffee Rambler" },
    description: page?.description,
    alternates: { canonical: "https://www.coffeerambler.com/world-coffee-guide" },
  };
}

export default async function WorldCoffeeGuidePage() {
  await connection();
  const page = loadPageByPath("/world-coffee-guide");
  const guides = originCountryGuides();
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
        <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">
          {page ? displayTitle(page) : "World Coffee Guide"}
        </h1>
        <p className="mt-4 text-lg text-cream/70">
          {page?.description ||
            "Explore coffee around the world. Hover on desktop or tap on mobile to highlight a growing country, then open its guide."}
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-8">
          <AdSlot slot="article" className="border-x-0" />
          <OriginsMap guides={guides} />
          <p className="text-sm text-cream/60">
            Amber countries have a written guide. Other coffee-belt countries still highlight; pages for
            those origins come later. The{" "}
            <Link href="/harvest-calendar" className="text-amber hover:underline">
              harvest calendar
            </Link>{" "}
            shows which origins are being picked, or arriving at roasters, each month.
          </p>
          {guides.length ? (
            <ul className="flex flex-wrap gap-2 text-sm">
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    className="inline-flex min-h-11 items-center text-amber underline decoration-amber/40 underline-offset-4"
                    href={guide.href}
                  >
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <aside className="space-y-4">
          <AdSlot slot="sidebar" className="border" />
          <div className="rounded-xl border border-white/10 bg-card p-4 text-sm text-cream/75">
            <p className="font-serif text-lg text-cream">Coffee Rambler AI</p>
            <p className="mt-2">The same coffee-belt map used in the app, here as navigation into country guides.</p>
            <a href="https://rambler.coffee" className="mt-3 inline-flex min-h-11 items-center text-amber hover:underline">
              Open rambler.coffee
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
