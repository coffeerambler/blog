import { displayTitle, type SitePage } from "@/lib/content";
import { MarkdownBody } from "@/lib/markdown";
import { AdSlot } from "@/components/ad-slot";
import { AppPromoBox } from "@/components/app-promo-box";

export function ImportedPage({ page }: { page: SitePage }) {
  const title = displayTitle(page);
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
        <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">{title}</h1>
        {page.description ? (
          <p className="mt-4 text-lg text-cream/70">{page.description}</p>
        ) : null}
      </header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <AdSlot slot="article" className="mb-8 border-x-0" />
          <MarkdownBody markdown={page.body} />
        </div>
        <aside className="space-y-4">
          <AdSlot slot="sidebar" className="border" />
          <AppPromoBox />
        </aside>
      </div>
    </article>
  );
}
