import originCountries from "@/data/origin-countries.json";

export type OriginCountry = {
  name: string;
  code: string;
  numericCode: string;
};

export const ORIGIN_COUNTRIES = originCountries as OriginCountry[];

export const COFFEE_BELT_FILL_HARVEST = "#8fcb86";
export const COFFEE_BELT_FILL_HARVEST_HOVER = "#a5d9a0";
export const COFFEE_BELT_FILL_MARKET = "#C8925A";
export const COFFEE_BELT_FILL_MARKET_HOVER = "#D4A574";
export const COFFEE_BELT_FILL_OFF_DARK = "#2A2520";
export const COFFEE_BELT_FILL_OFF_HOVER_DARK = "#3d3732";
export const COFFEE_BELT_FILL_OFF_HOVER_LIGHT = "#CEC3A5";
export const COFFEE_BELT_FILL_OFF_LIGHT = "#DDD8B8";
export const COFFEE_BELT_STROKE = "#1a1614";
export const COFFEE_BELT_STROKE_WIDTH = 0.5;
export const COFFEE_BELT_VIEWBOX_HEIGHT = 500;
export const COFFEE_BELT_VIEWBOX_WIDTH = 1000;

export type CountryGuideLink = {
  name: string;
  href: string;
  numericCode: string;
};

export function coffeeBeltFeatureId(feature: { id?: string | number | null }): string {
  return String(feature.id ?? "");
}
