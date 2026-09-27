import type { CountryGuide, CountryGuideEditorial } from "@/data/country-guides/types";

export function editorialFromGuide(guide: CountryGuide): CountryGuideEditorial {
  return {
    name: guide.name,
    kicker: guide.kicker,
    lede: guide.lede,
    facts: guide.facts,
    regionsCaption: guide.regionsCaption,
    regions: guide.regions.map(({ id, name, altitude, season, notes }) => ({
      id,
      name,
      altitude,
      season,
      notes,
    })),
    sections: guide.sections,
  };
}

export function applyGuideEditorial(
  guide: CountryGuide,
  editorial?: CountryGuideEditorial | null,
): CountryGuide {
  if (!editorial) return guide;
  const overlays = new Map((editorial.regions || []).map((row) => [row.id, row]));
  return {
    ...guide,
    name: editorial.name ?? guide.name,
    kicker: editorial.kicker ?? guide.kicker,
    lede: editorial.lede ?? guide.lede,
    facts: editorial.facts ?? guide.facts,
    regionsCaption: editorial.regionsCaption ?? guide.regionsCaption,
    regions: guide.regions.map((row) => {
      const over = overlays.get(row.id);
      if (!over) return row;
      return {
        ...row,
        name: over.name ?? row.name,
        altitude: over.altitude ?? row.altitude,
        season: over.season ?? row.season,
        notes: over.notes ?? row.notes,
      };
    }),
    sections: editorial.sections
      ? editorial.sections.map((section) => {
          const base = guide.sections.find((entry) => entry.id === section.id);
          return {
            id: section.id || base?.id || "section",
            title: section.title ?? base?.title ?? "",
            markdown: section.markdown ?? base?.markdown ?? "",
          };
        })
      : guide.sections,
  };
}
