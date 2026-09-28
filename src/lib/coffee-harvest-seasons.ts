/**
 * Typical specialty-coffee harvest and on-market windows by origin country.
 * Country names match the canonical names in src/data/origin-countries.json.
 *
 * harvestMonths — primary picking / harvest period (approximate, country-level).
 * marketMonths — when fresh lots typically reach roasters (harvest + processing/shipping lag).
 *
 * Data is indicative only; regions within a country often differ.
 */

export type SeasonPhase = "harvest" | "market" | "off";

export type OriginHarvestSeason = {
  country: string;
  harvestMonths: number[];
  marketMonths: number[];
  notes?: string;
};

export const COFFEE_HARVEST_SEASONS: OriginHarvestSeason[] = [
  {
    country: "Ethiopia",
    harvestMonths: [10, 11, 12, 1],
    marketMonths: [2, 3, 4, 5],
    notes: "Yirgacheffe & Sidamo often Oct–Jan; dry regions may shift slightly.",
  },
  {
    country: "Kenya",
    harvestMonths: [3, 4, 5, 10, 11, 12],
    marketMonths: [5, 6, 7, 12, 1, 2],
    notes: "Main crop Oct–Dec; fly crop Mar–May.",
  },
  {
    country: "Colombia",
    harvestMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    marketMonths: [5, 6, 7, 11, 12, 1, 2],
    notes: "Mitaca (Jan), mid-year (Apr–Jun), and main crop (Oct–Dec).",
  },
  {
    country: "Brazil",
    harvestMonths: [5, 6, 7, 8, 9],
    marketMonths: [8, 9, 10, 11, 12],
    notes: "Southern arabica belt; naturals often ship later in the window.",
  },
  {
    country: "Guatemala",
    harvestMonths: [11, 12, 1, 2, 3],
    marketMonths: [1, 2, 3, 4, 5],
    notes: "Highlands peak Dec–Mar.",
  },
  {
    country: "Costa Rica",
    harvestMonths: [11, 12, 1, 2, 3],
    marketMonths: [1, 2, 3, 4, 5],
    notes: "Tarrazú & Central Valley similar window.",
  },
  {
    country: "Honduras",
    harvestMonths: [11, 12, 1, 2, 3],
    marketMonths: [1, 2, 3, 4, 5],
  },
  {
    country: "El Salvador",
    harvestMonths: [11, 12, 1, 2],
    marketMonths: [1, 2, 3, 4],
  },
  {
    country: "Nicaragua",
    harvestMonths: [11, 12, 1, 2, 3],
    marketMonths: [1, 2, 3, 4, 5],
  },
  {
    country: "Panama",
    harvestMonths: [12, 1, 2, 3],
    marketMonths: [2, 3, 4, 5],
    notes: "Boquete & Volcán Barú Dec–Mar.",
  },
  {
    country: "Mexico",
    harvestMonths: [11, 12, 1, 2, 3],
    marketMonths: [1, 2, 3, 4, 5],
    notes: "Chiapas & Oaxaca Nov–Mar.",
  },
  {
    country: "Peru",
    harvestMonths: [5, 6, 7, 8, 9],
    marketMonths: [7, 8, 9, 10, 11],
  },
  {
    country: "Bolivia",
    harvestMonths: [5, 6, 7, 8, 9, 10],
    marketMonths: [7, 8, 9, 10, 11, 12],
    notes: "Yungas & Caranavi May–Sep.",
  },
  {
    country: "Ecuador",
    harvestMonths: [3, 4, 5, 6, 9, 10, 11],
    marketMonths: [5, 6, 7, 8, 11, 12, 1],
    notes: "Coastal and Andean harvests differ.",
  },
  {
    country: "Rwanda",
    harvestMonths: [3, 4, 5, 9, 10, 11, 12],
    marketMonths: [5, 6, 7, 11, 12, 1, 2],
  },
  {
    country: "Burundi",
    harvestMonths: [3, 4, 5, 9, 10, 11, 12, 1],
    marketMonths: [5, 6, 7, 11, 12, 1, 2, 3],
  },
  {
    country: "Democratic Republic of the Congo",
    harvestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    marketMonths: [5, 6, 7, 8, 11, 12, 1, 2, 3],
    notes: "Kivu & Ituri: main Apr–Jul and Sep–Dec; fly crop Jan–Mar.",
  },
  {
    country: "Tanzania",
    harvestMonths: [6, 7, 8, 9, 10, 11, 12],
    marketMonths: [8, 9, 10, 11, 12, 1, 2],
    notes: "North (Kilimanjaro/Arusha) peaks Jun–Aug.",
  },
  {
    country: "Uganda",
    harvestMonths: [10, 11, 12, 1, 2],
    marketMonths: [12, 1, 2, 3, 4],
    notes: "Arabica (Bugisu, Elgon) Oct–Feb.",
  },
  {
    country: "Yemen",
    harvestMonths: [10, 11, 12, 1, 2, 3],
    marketMonths: [12, 1, 2, 3, 4, 5],
  },
  {
    country: "Indonesia",
    harvestMonths: [5, 6, 7, 8, 9, 10, 11, 12],
    marketMonths: [7, 8, 9, 10, 11, 12, 1, 2],
    notes: "Sumatra Jun–Dec; Java May–Sep; Sulawesi varies.",
  },
  {
    country: "India",
    harvestMonths: [11, 12, 1, 2, 3],
    marketMonths: [2, 3, 4, 5],
    notes: "Arabica (Karnataka, Kerala): main Dec–Mar; fly crop Nov–Dec.",
  },
  {
    country: "Papua New Guinea",
    harvestMonths: [5, 6, 7, 8],
    marketMonths: [7, 8, 9, 10],
  },
  {
    country: "Timor-Leste",
    harvestMonths: [5, 6, 7, 8, 9],
    marketMonths: [7, 8, 9, 10, 11],
  },
  {
    country: "Thailand",
    harvestMonths: [11, 12, 1, 2],
    marketMonths: [1, 2, 3, 4],
    notes: "Northern arabica Nov–Feb.",
  },
  {
    country: "Laos",
    harvestMonths: [11, 12, 1, 2],
    marketMonths: [1, 2, 3, 4],
  },
  {
    country: "Vietnam",
    harvestMonths: [10, 11, 12, 1],
    marketMonths: [12, 1, 2, 3],
    notes: "Mostly robusta; specialty arabica Da Lat Oct–Jan.",
  },
  {
    country: "China",
    harvestMonths: [10, 11, 12, 1],
    marketMonths: [12, 1, 2, 3],
    notes: "Yunnan arabica Oct–Jan.",
  },
  {
    country: "Taiwan",
    harvestMonths: [10, 11, 12, 1],
    marketMonths: [12, 1, 2, 3],
  },
  {
    country: "United States",
    harvestMonths: [9, 10, 11, 12, 1],
    marketMonths: [11, 12, 1, 2, 3],
    notes: "Hawaii (Kona) Sep–Jan.",
  },
  {
    country: "Jamaica",
    harvestMonths: [8, 9, 10, 11, 12, 1],
    marketMonths: [10, 11, 12, 1, 2, 3],
    notes: "Blue Mountain Aug–Mar.",
  },
  {
    country: "Malawi",
    harvestMonths: [5, 6, 7, 8, 9],
    marketMonths: [7, 8, 9, 10, 11],
  },
  {
    country: "Zambia",
    harvestMonths: [5, 6, 7, 8],
    marketMonths: [7, 8, 9, 10],
  },
  {
    country: "Zimbabwe",
    harvestMonths: [5, 6, 7, 8, 9],
    marketMonths: [7, 8, 9, 10, 11],
  },
  {
    country: "Haiti",
    harvestMonths: [8, 9, 10, 11, 12],
    marketMonths: [10, 11, 12, 1, 2],
  },
  {
    country: "Dominican Republic",
    harvestMonths: [10, 11, 12, 1, 2],
    marketMonths: [12, 1, 2, 3, 4],
  },
  {
    country: "Cuba",
    harvestMonths: [9, 10, 11, 12, 1],
    marketMonths: [11, 12, 1, 2, 3],
  },
  {
    country: "Philippines",
    harvestMonths: [10, 11, 12, 1, 2],
    marketMonths: [12, 1, 2, 3, 4],
  },
  {
    country: "Myanmar",
    harvestMonths: [11, 12, 1, 2],
    marketMonths: [1, 2, 3, 4],
  },
  {
    country: "Madagascar",
    harvestMonths: [5, 6, 7, 8, 9],
    marketMonths: [7, 8, 9, 10, 11],
  },
];

export const MONTHS_IN_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export function getPhaseForMonth(origin: OriginHarvestSeason, month: number): SeasonPhase {
  if (origin.harvestMonths.includes(month)) return "harvest";
  if (origin.marketMonths.includes(month)) return "market";
  return "off";
}

export function isOriginActiveInMonth(origin: OriginHarvestSeason, month: number): boolean {
  return getPhaseForMonth(origin, month) !== "off";
}

export type OriginWithPhase = OriginHarvestSeason & { phase: SeasonPhase };

export function groupOriginsByPhase(month: number): {
  harvest: OriginWithPhase[];
  market: OriginWithPhase[];
  off: OriginWithPhase[];
} {
  const harvest: OriginWithPhase[] = [];
  const market: OriginWithPhase[] = [];
  const off: OriginWithPhase[] = [];
  for (const origin of COFFEE_HARVEST_SEASONS) {
    const phase = getPhaseForMonth(origin, month);
    const row: OriginWithPhase = { ...origin, phase };
    if (phase === "harvest") harvest.push(row);
    else if (phase === "market") market.push(row);
    else off.push(row);
  }
  const byCountry = (a: OriginWithPhase, b: OriginWithPhase) => a.country.localeCompare(b.country);
  harvest.sort(byCountry);
  market.sort(byCountry);
  off.sort(byCountry);
  return { harvest, market, off };
}

export function getMonthPhaseCounts(month: number): {
  harvest: number;
  market: number;
  off: number;
  total: number;
} {
  const grouped = groupOriginsByPhase(month);
  return {
    harvest: grouped.harvest.length,
    market: grouped.market.length,
    off: grouped.off.length,
    total: COFFEE_HARVEST_SEASONS.length,
  };
}

export function getOriginSeasonByCountry(country: string): OriginHarvestSeason | undefined {
  return COFFEE_HARVEST_SEASONS.find((origin) => origin.country === country);
}

export function buildPhaseByCountryMap(month: number): Map<string, SeasonPhase> {
  const map = new Map<string, SeasonPhase>();
  for (const origin of COFFEE_HARVEST_SEASONS) {
    map.set(origin.country, getPhaseForMonth(origin, month));
  }
  return map;
}
