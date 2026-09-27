"use client";

import { geoEquirectangular, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useMemo } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countriesTopo from "@/data/countries-110m.json";
import {
  COFFEE_BELT_VIEWBOX_HEIGHT,
  COFFEE_BELT_VIEWBOX_WIDTH,
  ORIGIN_COUNTRIES,
  coffeeBeltFeatureId,
} from "@/lib/coffee-belt";

export type BeltFeature = Feature<Geometry, { name?: string }>;

export function useCoffeeBeltFeatures() {
  return useMemo(() => {
    const originIds = new Set(ORIGIN_COUNTRIES.map((country) => country.numericCode));
    const nameById = new Map(ORIGIN_COUNTRIES.map((country) => [country.numericCode, country.name]));
    const topology = countriesTopo as unknown as Topology<{ countries: GeometryCollection }>;
    const collection = feature(topology, topology.objects.countries) as FeatureCollection<
      Geometry,
      { name?: string }
    >;
    const features = (collection.features ?? []).filter((entry) => originIds.has(coffeeBeltFeatureId(entry)));
    const projection = geoEquirectangular().fitSize(
      [COFFEE_BELT_VIEWBOX_WIDTH, COFFEE_BELT_VIEWBOX_HEIGHT],
      { type: "FeatureCollection", features },
    );
    const generator = geoPath(projection);
    const pathGen = (entry: BeltFeature) => generator(entry) ?? "";
    return { nameById, pathGen, features };
  }, []);
}
