export type CountryFact = {
  label: string;
  value: string;
};

export type CountryRegionRow = {
  id: string;
  number: number;
  name: string;
  species: "arabica" | "robusta";
  altitude: string;
  season: string;
  notes: string;
};

export type CountryGuideSection = {
  id: string;
  title: string;
  markdown: string;
};

/**
 * Section order for a country guide. Grading is its own heading, as on the
 * Costa Rica page: how that origin sorts coffee, then the classifications.
 */
export const COUNTRY_GUIDE_SECTION_TEMPLATE: CountryGuideSection[] = [
  { id: "processes", title: "Common processes", markdown: "" },
  { id: "grading", title: "Grading", markdown: "" },
  { id: "history", title: "Historical development", markdown: "" },
  { id: "culture", title: "Present-day coffee culture", markdown: "" },
];

export type CountryGuideGalleryImage = {
  src: string;
  alt: string;
};

export type MapPointKind = "capital" | "city" | "port";

/** WGS84 lon/lat. Same Mercator projection as the growing-region polygons. */
export type CountryMapPoint = {
  id: string;
  name: string;
  kind: MapPointKind;
  /** [longitude, latitude] */
  coordinates: [number, number];
  /** Put the label on the other side when the default would clip or collide. */
  label?: "left" | "right" | "top" | "bottom";
};

/** Editable copy overlay stored on the page JSON. Empty strings are kept; nothing is invented. */
export type CountryGuideEditorial = {
  name?: string;
  kicker?: string;
  lede?: string;
  facts?: CountryFact[];
  regionsCaption?: string;
  regions?: Array<{
    id: string;
    name?: string;
    altitude?: string;
    season?: string;
    notes?: string;
  }>;
  sections?: CountryGuideSection[];
};

export type CountryGuide = {
  slug: string;
  path: string;
  name: string;
  kicker: string;
  lede: string;
  flag: { src: string; alt: string };
  facts: CountryFact[];
  regions: CountryRegionRow[];
  regionsCaption: string;
  /** Zoom panel on the map, used when arabica sits in a small cluster (China / Yunnan). */
  insetLabel?: string;
  legendArabica?: string;
  legendRobusta?: string;
  sections: CountryGuideSection[];
  gallery: CountryGuideGalleryImage[];
  /** Capitals, coffee cities and export ports. Keep this short. */
  mapPoints?: CountryMapPoint[];
};
