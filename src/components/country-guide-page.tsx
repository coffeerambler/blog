import { AdSlot } from "@/components/ad-slot";
import { CountryGuideRegions } from "@/components/country-guide-regions";
import { MarkdownBody } from "@/lib/markdown";
import type { CountryGuide, CountryGuideGalleryImage } from "@/data/country-guides/types";
import type { Feature, Geometry } from "geojson";
import type { GrowingRegionFeature, MapSource } from "@/lib/country-guides";

function splitPhotos(guide: CountryGuide): {
  divider?: CountryGuideGalleryImage;
  gallery: CountryGuideGalleryImage[];
} {
  const photos = guide.gallery;
  if (photos.length >= 2) {
    return { divider: photos[0], gallery: photos.slice(1) };
  }
  return { gallery: photos };
}

export function CountryGuidePage({
  guide,
  country,
  regions,
  mapSource,
}: {
  guide: CountryGuide;
  country: Feature<Geometry, { id: string; name: string }>;
  regions: GrowingRegionFeature[];
  mapSource: MapSource;
}) {
  const { divider, gallery } = splitPhotos(guide);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">{guide.kicker}</p>
        <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">{guide.name}</h1>
        <p className="mt-4 text-lg text-cream/70">{guide.lede}</p>
      </header>
      <AdSlot slot="article" className="mb-8 border-x-0" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-10">
          <CountryGuideRegions
            guide={guide}
            country={country}
            regions={regions}
            mapSource={mapSource}
          />
          {guide.sections.map((section) => (
            <div key={section.id} className="space-y-10">
              <section aria-labelledby={section.id}>
                <h2 id={section.id} className="font-serif text-2xl text-cream">
                  {section.title}
                </h2>
                <div className="mt-4">
                  <MarkdownBody markdown={section.markdown} />
                </div>
              </section>
              {section.id === "history" && divider ? (
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={divider.src}
                    alt={divider.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full rounded-lg border border-white/10 object-cover sm:aspect-[2/1]"
                  />
                </figure>
              ) : null}
            </div>
          ))}
          {gallery.length ? (
            <section aria-labelledby="gallery-heading" className="space-y-4">
              <h2 id="gallery-heading" className="font-serif text-2xl text-cream">
                In the country
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {gallery.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-lg border border-white/10 object-cover"
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/10 bg-card p-4 text-sm text-cream/75">
            <p className="font-serif text-lg text-cream">Coffee Rambler AI</p>
            <p className="mt-2">
              Personalised brewing guidance, a brew diary and sensory coaching.
            </p>
            <a href="https://rambler.coffee" className="mt-3 inline-flex min-h-11 items-center text-amber hover:underline">
              Open rambler.coffee
            </a>
          </div>
          <figure className="rounded-xl border border-white/10 bg-card p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={guide.flag.src}
              alt=""
              className="mx-auto h-auto w-28 rounded-sm border border-white/10 sm:w-32"
            />
          </figure>
          <AdSlot slot="sidebar" className="border" />
        </aside>
      </div>
    </article>
  );
}
