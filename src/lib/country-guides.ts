import type { Feature, FeatureCollection, Geometry } from "geojson";
import chinaMap from "@/data/country-guides/china-map.json";
import colombiaMap from "@/data/country-guides/colombia-map.json";
import ethiopiaMap from "@/data/country-guides/ethiopia-map.json";
import costaricaMap from "@/data/country-guides/costarica-map.json";
import elsalvadorMap from "@/data/country-guides/elsalvador-map.json";
import kenyaMap from "@/data/country-guides/kenya-map.json";
import boliviaMap from "@/data/country-guides/bolivia-map.json";
import indonesiaMap from "@/data/country-guides/indonesia-map.json";
import brazilMap from "@/data/country-guides/brazil-map.json";
import papuanewguineaMap from "@/data/country-guides/papuanewguinea-map.json";
import taiwanMap from "@/data/country-guides/taiwan-map.json";
import guatemalaMap from "@/data/country-guides/guatemala-map.json";
import rwandaMap from "@/data/country-guides/rwanda-map.json";
import burundiMap from "@/data/country-guides/burundi-map.json";
import ecuadorMap from "@/data/country-guides/ecuador-map.json";
import vietnamMap from "@/data/country-guides/vietnam-map.json";
import ugandaMap from "@/data/country-guides/uganda-map.json";
import mexicoMap from "@/data/country-guides/mexico-map.json";
import { chinaGuide } from "@/data/country-guides/china";
import { colombiaGuide } from "@/data/country-guides/colombia";
import { ethiopiaGuide } from "@/data/country-guides/ethiopia";
import { costaRicaGuide } from "@/data/country-guides/costarica";
import { elSalvadorGuide } from "@/data/country-guides/elsalvador";
import { kenyaGuide } from "@/data/country-guides/kenya";
import { boliviaGuide } from "@/data/country-guides/bolivia";
import { indonesiaGuide } from "@/data/country-guides/indonesia";
import { brazilGuide } from "@/data/country-guides/brazil";
import { papuaNewGuineaGuide } from "@/data/country-guides/papuanewguinea";
import { taiwanGuide } from "@/data/country-guides/taiwan";
import { guatemalaGuide } from "@/data/country-guides/guatemala";
import { rwandaGuide } from "@/data/country-guides/rwanda";
import { burundiGuide } from "@/data/country-guides/burundi";
import { ecuadorGuide } from "@/data/country-guides/ecuador";
import { vietnamGuide } from "@/data/country-guides/vietnam";
import { ugandaGuide } from "@/data/country-guides/uganda";
import { mexicoGuide } from "@/data/country-guides/mexico";
import type { CountryGuide } from "@/data/country-guides/types";
import { readPageFile } from "@/lib/content";
import { applyGuideEditorial } from "@/lib/guide-editorial";
import { isApproved } from "@/lib/publish";

/**
 * Add a country: write `src/data/country-guides/{slug}.ts` + `{slug}-map.json`
 * (see scripts/extract-country-growing-regions.py), register both maps below,
 * and drop a `content/pages/country-guide-{slug}.json` so the world map can link it.
 * New guides must set `"status": "in_review"` — they are not live until Keiran approves.
 * Add `mapPoints` on the guide module (capital, coffee cities, export ports; OSM lon/lat).
 * The `[slug]` route renders any registered guide with CountryGuidePage.
 */

export type RegionSpecies = "arabica" | "robusta";

export type GrowingRegionProperties = {
  id: string;
  name: string;
  number: number;
  species: RegionSpecies;
  label: [number, number];
};

export type GrowingRegionFeature = Feature<Geometry, GrowingRegionProperties>;

export type MapSource = {
  name: string;
  license: string;
  country: string;
  regionsAdm2: string;
  regionsAdm1: string;
  note: string;
};

export type CountryGuideBundle = {
  guide: CountryGuide;
  country: Feature<Geometry, { id: string; name: string }>;
  regions: GrowingRegionFeature[];
  mapSource: MapSource;
};

const GUIDES: Record<string, CountryGuide> = {
  "country-guide-china": chinaGuide,
  "country-guide-colombia": colombiaGuide,
  "country-guide-ethiopia": ethiopiaGuide,
  "country-guide-costarica": costaRicaGuide,
  "country-guide-elsalvador": elSalvadorGuide,
  "country-guide-kenya": kenyaGuide,
  "country-guide-bolivia": boliviaGuide,
  "country-guide-indonesia": indonesiaGuide,
  "country-guide-brazil": brazilGuide,
  "country-guide-papuanewguinea": papuaNewGuineaGuide,
  "country-guide-taiwan": taiwanGuide,
  "country-guide-guatemala": guatemalaGuide,
  "country-guide-rwanda": rwandaGuide,
  "country-guide-burundi": burundiGuide,
  "country-guide-ecuador": ecuadorGuide,
  "country-guide-vietnam": vietnamGuide,
  "country-guide-uganda": ugandaGuide,
  "country-guide-mexico": mexicoGuide,
};

const MAPS: Record<string, FeatureCollection<Geometry> & { source: MapSource }> = {
  "country-guide-china": chinaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-colombia": colombiaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-ethiopia": ethiopiaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-costarica": costaricaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-elsalvador": elsalvadorMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-kenya": kenyaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-bolivia": boliviaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-indonesia": indonesiaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-brazil": brazilMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-papuanewguinea": papuanewguineaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-taiwan": taiwanMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-guatemala": guatemalaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-rwanda": rwandaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-burundi": burundiMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-ecuador": ecuadorMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-vietnam": vietnamMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-uganda": ugandaMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
  "country-guide-mexico": mexicoMap as unknown as FeatureCollection<Geometry> & { source: MapSource },
};

export function isTemplatedCountryGuide(slug: string) {
  return slug in GUIDES;
}

export function isLiveCountryGuide(slug: string) {
  if (!isTemplatedCountryGuide(slug)) return false;
  const page = readPageFile(slug);
  return page ? isApproved(page) : isApproved({ slug });
}

export function getCountryGuideBundle(slug: string): CountryGuideBundle | null {
  const guide = GUIDES[slug];
  const collection = MAPS[slug];
  if (!guide || !collection) return null;
  const country = collection.features.find((entry) => !("number" in (entry.properties || {})));
  if (!country) return null;
  const regions = collection.features
    .filter((entry) => entry !== country)
    .map((entry) => entry as GrowingRegionFeature)
    .sort((a, b) => a.properties.number - b.properties.number);
  const page = readPageFile(slug);
  return {
    guide: applyGuideEditorial(guide, page?.guide),
    country: country as Feature<Geometry, { id: string; name: string }>,
    regions,
    mapSource: collection.source,
  };
}

export function templatedCountrySlugs() {
  return Object.keys(GUIDES);
}
