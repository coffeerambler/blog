import type { CountryMapPoint, MapPointKind } from "@/data/country-guides/types";
import type { CountryGuideBundle } from "@/lib/country-guides";
import { layoutCountryMap, type CountryMapLayout } from "@/lib/country-map-layout";

const ARABICA = "#C8925A";
const ROBUSTA = "#8a6d55";
const COUNTRY_FILL = "#3a342c";
const COUNTRY_STROKE = "#8a8176";
const CREAM = "#f4efe6";
const INK = "#120f0c";

function xml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function numberBadge(x: number, y: number, n: number) {
  return `<g transform="translate(${x}, ${y})"><circle r="9" fill="#0E0D0B" stroke="${ARABICA}" stroke-width="1.4"/><text text-anchor="middle" dy="0.35em" fill="${CREAM}" font-size="11" font-family="DejaVu Sans, sans-serif" font-weight="600">${n}</text></g>`;
}

function placeMark(place: CountryMapPoint, x: number, y: number, viewW: number, viewH: number) {
  const side = place.label ?? (x > viewW - 96 ? "left" : "right");
  let textX = 10;
  let textY = 4;
  let anchor = "start";
  if (side === "left") {
    textX = -10;
    anchor = "end";
  } else if (side === "top") {
    textX = 0;
    textY = -12;
    anchor = "middle";
  } else if (side === "bottom") {
    textX = 0;
    textY = 16;
    anchor = "middle";
  }
  if (y < 18 && side !== "bottom") textY = 16;
  if (y > viewH - 18 && side !== "top") textY = -12;

  const mark =
    place.kind === "capital"
      ? `<path d="M0,-8.5 L2.1,-2.6 L8.4,-2.6 L3.3,1.1 L5.2,7.4 L0,3.6 L-5.2,7.4 L-3.3,1.1 L-8.4,-2.6 L-2.1,-2.6 Z" fill="${ARABICA}" stroke="${CREAM}" stroke-width="1"/>`
      : place.kind === "port"
        ? `<rect x="-4.4" y="-4.4" width="8.8" height="8.8" rx="1" transform="rotate(45)" fill="${ROBUSTA}" stroke="${CREAM}" stroke-width="1.2"/>`
        : `<circle r="4.2" fill="${CREAM}" stroke="${ARABICA}" stroke-width="1.5"/>`;

  return `<g transform="translate(${x}, ${y})">${mark}<text x="${textX}" y="${textY}" text-anchor="${anchor}" fill="${CREAM}" stroke="${INK}" stroke-width="3" paint-order="stroke" font-size="11" font-family="DejaVu Sans, sans-serif" font-weight="600">${xml(place.name)}</text></g>`;
}

function legendMark(kind: MapPointKind) {
  if (kind === "capital") {
    return `<path d="M0,-6 L1.5,-1.8 L6,-1.8 L2.4,0.8 L3.7,5.3 L0,2.6 L-3.7,5.3 L-2.4,0.8 L-6,-1.8 L-1.5,-1.8 Z" fill="${ARABICA}" stroke="${CREAM}" stroke-width="0.8"/>`;
  }
  if (kind === "port") {
    return `<rect x="-3.4" y="-3.4" width="6.8" height="6.8" transform="rotate(45)" fill="${ROBUSTA}" stroke="${CREAM}" stroke-width="1"/>`;
  }
  return `<circle r="3.4" fill="${CREAM}" stroke="${ARABICA}" stroke-width="1.3"/>`;
}

function legend(layout: CountryMapLayout, arabica: string, robusta: string | null, kinds: Set<MapPointKind>) {
  const extra = (kinds.has("capital") ? 1 : 0) + (kinds.has("city") ? 1 : 0) + (kinds.has("port") ? 1 : 0);
  const base = robusta ? 58 : 40;
  const height = base + (extra ? extra * 18 + 8 : 0);
  const row = robusta ? 58 : 40;
  const rows: { kind: MapPointKind; label: string }[] = [];
  if (kinds.has("capital")) rows.push({ kind: "capital", label: "Capital" });
  if (kinds.has("city")) rows.push({ kind: "city", label: "City" });
  if (kinds.has("port")) rows.push({ kind: "port", label: "Coffee port" });

  const species = [
    `<rect x="14" y="16" width="14" height="14" rx="2" fill="${ARABICA}"/><text x="34" y="27" fill="${CREAM}">${xml(arabica)}</text>`,
  ];
  if (robusta) {
    species.push(
      `<rect x="14" y="36" width="14" height="14" rx="2" fill="${ROBUSTA}"/><text x="34" y="47" fill="${CREAM}">${xml(robusta)}</text>`,
    );
  }
  const places = rows
    .map((rowItem, index) => {
      const y = row + 6 + index * 18;
      return `<g transform="translate(21, ${y})">${legendMark(rowItem.kind)}<text x="16" y="4" fill="${CREAM}">${xml(rowItem.label)}</text></g>`;
    })
    .join("");

  return `<g transform="translate(${layout.legendX}, 24)" font-family="DejaVu Sans, sans-serif" font-size="12"><rect x="0" y="0" width="236" height="${height}" rx="8" fill="${INK}" stroke="rgba(244,239,230,0.12)"/>${species.join("")}${places}</g>`;
}

/** Static copy of the growing map, for the social picture. */
export function countryMapSvg(bundle: CountryGuideBundle) {
  const { guide, country, regions } = bundle;
  const points = guide.mapPoints ?? [];
  const hasRobusta = regions.some((region) => region.properties.species === "robusta");
  const showInset = Boolean(guide.insetLabel) && regions.some((region) => region.properties.species === "arabica");
  const layout = layoutCountryMap({ country, regions, points, showInset });
  const { viewW, viewH, inset } = layout;

  const regionsSvg = layout.regionDraws
    .map(({ region, d, x, y }) => {
      const numberOnMain = !showInset || region.properties.species !== "arabica";
      const fill = region.properties.species === "arabica" ? ARABICA : ROBUSTA;
      return `<g><path d="${d}" fill="${fill}" stroke="${COUNTRY_STROKE}" stroke-width="0.6"/>${
        numberOnMain ? numberBadge(x, y, region.properties.number) : ""
      }</g>`;
    })
    .join("");

  const insetSvg = showInset
    ? `<rect x="${inset.x}" y="${inset.y}" width="${inset.w}" height="${inset.h}" rx="10" fill="${INK}" stroke="rgba(244,239,230,0.16)"/><text x="${inset.x + 14}" y="${inset.y + 22}" fill="${ARABICA}" font-size="12" font-family="DejaVu Sans, sans-serif">${xml(guide.insetLabel || "")}</text>${layout.regionDraws
        .filter(({ region }) => region.properties.species === "arabica")
        .map(
          ({ region, insetD, insetX, insetY }) =>
            `<g><path d="${insetD}" fill="${ARABICA}" stroke="${COUNTRY_STROKE}" stroke-width="1"/>${numberBadge(insetX, insetY, region.properties.number)}</g>`,
        )
        .join("")}`
    : "";

  const places = layout.placeDraws
    .map(({ place, x, y }) => placeMark(place, x, y, viewW, viewH))
    .join("");

  const insetPlaces = showInset
    ? layout.placeDraws
        .filter(
          ({ insetX, insetY }) =>
            insetX >= inset.x + 8 &&
            insetX <= inset.x + inset.w - 8 &&
            insetY >= inset.y + 28 &&
            insetY <= inset.y + inset.h - 8,
        )
        .map(({ place, insetX, insetY }) => placeMark(place, insetX, insetY, viewW, viewH))
        .join("")
    : "";

  const kinds = new Set(points.map((place) => place.kind));
  const legendSvg = legend(
    layout,
    guide.legendArabica || "Arabica",
    hasRobusta ? guide.legendRobusta || "Robusta" : null,
    kinds,
  );

  return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${viewW}" height="${viewH}" viewBox="0 0 ${viewW} ${viewH}"><rect width="${viewW}" height="${viewH}" fill="${INK}"/><path d="${layout.countryD}" fill="${COUNTRY_FILL}" stroke="${COUNTRY_STROKE}" stroke-width="1.1"/>${regionsSvg}${insetSvg}${places}${insetPlaces}${legendSvg}</svg>`;
}
