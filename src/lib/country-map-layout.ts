import { geoArea, geoMercator, geoPath } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import type { CountryMapPoint } from "@/data/country-guides/types";
import type { GrowingRegionFeature } from "@/lib/country-guides";

export const MAP_FRAME_W = 900;
const PAD_X = 24;
const PAD_Y = 16;

function reverseGeometry(geometry: Geometry): Geometry {
  if (geometry.type === "Polygon") {
    return { ...geometry, coordinates: geometry.coordinates.map((ring) => [...ring].reverse()) };
  }
  if (geometry.type === "MultiPolygon") {
    return {
      ...geometry,
      coordinates: geometry.coordinates.map((polygon) => polygon.map((ring) => [...ring].reverse())),
    };
  }
  return geometry;
}

function rewindFeature<T extends Feature<Geometry>>(feature: T): T {
  if (geoArea(feature) <= Math.PI) return feature;
  return { ...feature, geometry: reverseGeometry(feature.geometry) };
}

export type CountryMapLayout = {
  viewW: number;
  viewH: number;
  countryD: string;
  regionDraws: {
    region: GrowingRegionFeature;
    d: string;
    insetD: string;
    x: number;
    y: number;
    insetX: number;
    insetY: number;
  }[];
  inset: { x: number; y: number; w: number; h: number };
  legendX: number;
  placeDraws: {
    place: CountryMapPoint;
    x: number;
    y: number;
    insetX: number;
    insetY: number;
  }[];
};

/** Same projection the guide page uses, so a social picture matches the map on the page. */
export function layoutCountryMap({
  country,
  regions,
  points,
  showInset,
}: {
  country: Feature<Geometry, { id: string; name: string }>;
  regions: GrowingRegionFeature[];
  points: CountryMapPoint[];
  showInset: boolean;
}): CountryMapLayout {
  const countryFixed = rewindFeature(country);
  const regionsFixed = regions.map((region) => rewindFeature(region));
  const probe = geoPath(geoMercator());
  const [[x0, y0], [x1, y1]] = probe.bounds(countryFixed);
  const geoW = Math.max(x1 - x0, 1);
  const geoH = Math.max(y1 - y0, 1);
  const innerW = MAP_FRAME_W - PAD_X * 2;
  const innerH = innerW * (geoH / geoW);
  const viewW = MAP_FRAME_W;
  const viewH = Math.round(innerH + PAD_Y * 2);
  const projection = geoMercator().fitExtent(
    [
      [PAD_X, PAD_Y],
      [viewW - PAD_X, viewH - PAD_Y],
    ],
    countryFixed,
  );
  const path = geoPath(projection);
  const arabica = {
    type: "FeatureCollection" as const,
    features: regionsFixed.filter((region) => region.properties.species === "arabica"),
  };
  const insetProj = geoMercator().fitExtent(
    [
      [48, 64],
      [320, 286],
    ],
    arabica.features.length ? arabica : countryFixed,
  );
  const insetPath = geoPath(insetProj);
  return {
    viewW,
    viewH,
    countryD: path(countryFixed) ?? "",
    regionDraws: regionsFixed.map((region) => {
      const [lon, lat] = region.properties.label;
      const mainPt = projection([lon, lat]);
      const insetPt = region.properties.species === "arabica" ? insetProj([lon, lat]) : null;
      return {
        region,
        d: path(region) ?? "",
        insetD: region.properties.species === "arabica" ? (insetPath(region) ?? "") : "",
        x: mainPt?.[0] ?? 0,
        y: mainPt?.[1] ?? 0,
        insetX: insetPt?.[0] ?? 0,
        insetY: insetPt?.[1] ?? 0,
      };
    }),
    inset: { x: 36, y: 36, w: 300, h: 268 },
    legendX: Math.max(viewW - 260, 24),
    placeDraws: points.map((place) => {
      const mainPt = projection(place.coordinates);
      const insetPt = showInset ? insetProj(place.coordinates) : null;
      return {
        place,
        x: mainPt?.[0] ?? 0,
        y: mainPt?.[1] ?? 0,
        insetX: insetPt?.[0] ?? 0,
        insetY: insetPt?.[1] ?? 0,
      };
    }),
  };
}
