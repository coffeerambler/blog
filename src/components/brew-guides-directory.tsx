import { brewGuides, displayTitle, type SitePage } from "@/lib/content";
import { BrewGuideTile } from "@/components/brew-guide-tile";

const DIRECTORY_ORDER = [
  "/french-press",
  "/clever-cup",
  "/syphon",
  "/chemex",
  "/pour-over-filter",
  "/aeropress",
  "/moka-pot",
  "/immersion-cold-brew",
  "/cupping",
];

function tileName(guide: SitePage, hub?: SitePage | null) {
  const fromHub = hub?.images?.find((_, index) => hub.internalLinks?.[index] === guide.path);
  if (fromHub?.alt?.trim()) return fromHub.alt.trim();
  return displayTitle(guide)
    .replace(/\s*\|\s*Brew Guides.*$/i, "")
    .replace(/\s*\|\s*Coffee Rambler.*$/i, "")
    .trim();
}

function tileImage(guide: SitePage, hub?: SitePage | null) {
  const fromHub = hub?.images?.find((_, index) => hub.internalLinks?.[index] === guide.path);
  if (fromHub?.local) return fromHub.local;
  const grind = guide.images?.find((image) => /grind/i.test(image.alt || ""));
  return grind?.local || guide.images?.[0]?.local || "";
}

export function BrewGuidesDirectory({ hub }: { hub: SitePage }) {
  const byPath = new Map(brewGuides().map((guide) => [guide.path, guide]));
  const tiles = DIRECTORY_ORDER.map((path) => byPath.get(path)).filter(
    (guide): guide is SitePage => Boolean(guide),
  );
  const heading =
    hub.body.match(/^#\s+(.+)$/m)?.[1]?.trim() || displayTitle(hub);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">Brewing Guides</p>
        <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">{heading}</h1>
      </header>
      {tiles.length === 0 ? (
        <p className="text-cream/70">Brew guides are still importing.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((guide) => (
            <li key={guide.path}>
              <BrewGuideTile
                href={guide.path}
                src={tileImage(guide, hub)}
                name={tileName(guide, hub)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
