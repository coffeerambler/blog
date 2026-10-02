"use client";

import { useMemo, useState } from "react";
import type { Feature, Geometry } from "geojson";
import type { CountryMapPoint, MapPointKind } from "@/data/country-guides/types";
import type { GrowingRegionFeature } from "@/lib/country-guides";
import { layoutCountryMap } from "@/lib/country-map-layout";

const ARABICA = "#C8925A";
const ARABICA_HOVER = "#E4C08A";
const ROBUSTA = "#8a6d55";
const ROBUSTA_HOVER = "#a48468";
const COUNTRY_FILL = "#3a342c";
const COUNTRY_STROKE = "#8a8176";

export function CountryGrowingMap({
  country,
  countryName,
  regions,
  points = [],
  activeId,
  onActiveId,
  insetLabel,
  legendArabica = "Arabica",
  legendRobusta = "Robusta",
}: {
  country: Feature<Geometry, { id: string; name: string }>;
  countryName: string;
  regions: GrowingRegionFeature[];
  points?: CountryMapPoint[];
  activeId: string | null;
  onActiveId: (id: string | null) => void;
  insetLabel?: string;
  legendArabica?: string;
  legendRobusta?: string;
}) {
  const hasRobusta = regions.some((region) => region.properties.species === "robusta");
  const showInset = Boolean(insetLabel) && regions.some((region) => region.properties.species === "arabica");
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);

  const { viewW, viewH, countryD, regionDraws, inset, legendX, placeDraws } = useMemo(
    () => layoutCountryMap({ country, regions, points, showInset }),
    [country, regions, points, showInset],
  );

  const fillFor = (region: GrowingRegionFeature, active: boolean) => {
    if (region.properties.species === "arabica") return active ? ARABICA_HOVER : ARABICA;
    return active ? ROBUSTA_HOVER : ROBUSTA;
  };
  const activeRegion = regions.find((region) => region.properties.id === activeId) ?? null;
  const activePlace = points.find((place) => place.id === activePlaceId) ?? null;
  const ariaSpecies = hasRobusta
    ? "Amber is arabica; brown is robusta."
    : "Amber marks arabica growing regions.";
  const kinds = new Set(points.map((place) => place.kind));

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-white/10 bg-[#120f0c]"
      style={{ aspectRatio: `${viewW} / ${viewH}` }}
    >
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full"
        style={{ background: "#120f0c" }}
        role="group"
        aria-label={`Map of ${countryName} with numbered coffee-growing regions and labelled towns. ${ariaSpecies}`}
        onMouseMove={(event) => {
          const hit = event.target instanceof Element ? event.target.closest("[data-region-id]") : null;
          const place = event.target instanceof Element ? event.target.closest("[data-place-id]") : null;
          onActiveId(hit?.getAttribute("data-region-id") ?? null);
          setActivePlaceId(place?.getAttribute("data-place-id") ?? null);
        }}
        onMouseLeave={() => {
          onActiveId(null);
          setActivePlaceId(null);
        }}
      >
        <path d={countryD} fill={COUNTRY_FILL} stroke={COUNTRY_STROKE} strokeWidth={1.1} />
        {regionDraws.map(({ region, d, x, y }) => {
          const active = activeId === region.properties.id;
          const numberOnMain = !showInset || region.properties.species !== "arabica";
          return (
            <g key={region.properties.id} data-region-id={region.properties.id} style={{ cursor: "pointer" }}>
              <path
                d={d}
                data-region-id={region.properties.id}
                fill={fillFor(region, active)}
                stroke={active ? "#f4efe6" : COUNTRY_STROKE}
                strokeWidth={active ? 2 : 0.6}
                pointerEvents="auto"
              />
              {numberOnMain ? (
                <NumberBadge x={x} y={y} n={region.properties.number} active={active} />
              ) : null}
            </g>
          );
        })}
        {showInset ? (
          <>
            <rect
              x={inset.x}
              y={inset.y}
              width={inset.w}
              height={inset.h}
              rx={10}
              fill="#120f0c"
              stroke="rgba(244,239,230,0.16)"
            />
            <text
              x={inset.x + 14}
              y={inset.y + 22}
              fill="#c8925a"
              fontSize={12}
              fontFamily="DM Sans, sans-serif"
            >
              {insetLabel}
            </text>
            {regionDraws
              .filter(({ region }) => region.properties.species === "arabica")
              .map(({ region, insetD, insetX, insetY }) => {
                const active = activeId === region.properties.id;
                return (
                  <g
                    key={`inset-${region.properties.id}`}
                    data-region-id={region.properties.id}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d={insetD}
                      data-region-id={region.properties.id}
                      fill={fillFor(region, active)}
                      stroke={active ? "#f4efe6" : COUNTRY_STROKE}
                      strokeWidth={active ? 2 : 1}
                    />
                    <NumberBadge x={insetX} y={insetY} n={region.properties.number} active={active} />
                  </g>
                );
              })}
          </>
        ) : null}
        {placeDraws.map(({ place, x, y }) => (
          <PlaceMark key={place.id} place={place} x={x} y={y} viewW={viewW} viewH={viewH} />
        ))}
        {showInset
          ? placeDraws
              .filter(
                ({ insetX, insetY }) =>
                  insetX >= inset.x + 8 &&
                  insetX <= inset.x + inset.w - 8 &&
                  insetY >= inset.y + 28 &&
                  insetY <= inset.y + inset.h - 8,
              )
              .map(({ place, insetX, insetY }) => (
                <PlaceMark
                  key={`inset-${place.id}`}
                  place={place}
                  x={insetX}
                  y={insetY}
                  viewW={viewW}
                  viewH={viewH}
                />
              ))
          : null}
        <Legend
          x={legendX}
          arabica={legendArabica}
          robusta={hasRobusta ? legendRobusta : null}
          kinds={kinds}
        />
      </svg>
      {activePlace ? (
        <div
          className="pointer-events-none absolute bottom-3 left-3 rounded border border-white/15 bg-[#221e18] px-2 py-1 font-sans text-sm text-cream shadow-md"
          data-place-tooltip="true"
        >
          {activePlace.name} — {placeKindLabel(activePlace.kind)}
        </div>
      ) : activeRegion ? (
        <div
          className="pointer-events-none absolute bottom-3 left-3 rounded border border-white/15 bg-[#221e18] px-2 py-1 font-sans text-sm text-cream shadow-md"
          data-region-tooltip="true"
        >
          {activeRegion.properties.number}. {activeRegion.properties.name}
          {activeRegion.properties.species === "arabica" ? " — arabica" : " — robusta"}
        </div>
      ) : null}
    </div>
  );
}

function NumberBadge({
  x,
  y,
  n,
  active,
}: {
  x: number;
  y: number;
  n: number;
  active: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none">
      <circle r={active ? 11 : 9} fill="#0E0D0B" stroke="#C8925A" strokeWidth={1.4} />
      <text
        textAnchor="middle"
        dy="0.35em"
        fill="#f4efe6"
        fontSize={11}
        fontFamily="DM Sans, sans-serif"
        fontWeight={600}
      >
        {n}
      </text>
    </g>
  );
}

function placeKindLabel(kind: MapPointKind) {
  if (kind === "capital") return "capital";
  if (kind === "port") return "coffee port";
  return "city";
}

function PlaceMark({
  place,
  x,
  y,
  viewW,
  viewH,
}: {
  place: CountryMapPoint;
  x: number;
  y: number;
  viewW: number;
  viewH: number;
}) {
  const side = place.label ?? (x > viewW - 96 ? "left" : "right");
  let textX = 10;
  let textY = 4;
  let anchor: "start" | "end" | "middle" = "start";
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

  return (
    <g transform={`translate(${x}, ${y})`} data-place-id={place.id} style={{ cursor: "default" }}>
      <circle r={10} fill="transparent" data-place-id={place.id} />
      {place.kind === "capital" ? (
        <path
          d="M0,-8.5 L2.1,-2.6 L8.4,-2.6 L3.3,1.1 L5.2,7.4 L0,3.6 L-5.2,7.4 L-3.3,1.1 L-8.4,-2.6 L-2.1,-2.6 Z"
          fill="#C8925A"
          stroke="#f4efe6"
          strokeWidth={1}
          data-place-id={place.id}
        />
      ) : null}
      {place.kind === "city" ? (
        <circle r={4.2} fill="#f4efe6" stroke="#C8925A" strokeWidth={1.5} data-place-id={place.id} />
      ) : null}
      {place.kind === "port" ? (
        <rect
          x={-4.4}
          y={-4.4}
          width={8.8}
          height={8.8}
          rx={1}
          transform="rotate(45)"
          fill="#8a6d55"
          stroke="#f4efe6"
          strokeWidth={1.2}
          data-place-id={place.id}
        />
      ) : null}
      <text
        x={textX}
        y={textY}
        textAnchor={anchor}
        fill="#f4efe6"
        stroke="#120f0c"
        strokeWidth={3}
        paintOrder="stroke"
        fontSize={11}
        fontFamily="DM Sans, sans-serif"
        fontWeight={600}
        pointerEvents="none"
      >
        {place.name}
      </text>
    </g>
  );
}

function Legend({
  x,
  arabica,
  robusta,
  kinds,
}: {
  x: number;
  arabica: string;
  robusta: string | null;
  kinds: Set<MapPointKind>;
}) {
  const extra = (kinds.has("capital") ? 1 : 0) + (kinds.has("city") ? 1 : 0) + (kinds.has("port") ? 1 : 0);
  const base = robusta ? 58 : 40;
  const height = base + (extra ? extra * 18 + 8 : 0);
  const row = robusta ? 58 : 40;

  const rows: { kind: MapPointKind; label: string }[] = [];
  if (kinds.has("capital")) rows.push({ kind: "capital", label: "Capital" });
  if (kinds.has("city")) rows.push({ kind: "city", label: "City" });
  if (kinds.has("port")) rows.push({ kind: "port", label: "Coffee port" });

  return (
    <g transform={`translate(${x}, 24)`} fontFamily="DM Sans, sans-serif" fontSize={12}>
      <rect x={0} y={0} width={236} height={height} rx={8} fill="#120f0c" stroke="rgba(244,239,230,0.12)" />
      <rect x={14} y={16} width={14} height={14} rx={2} fill={ARABICA} />
      <text x={34} y={27} fill="#f4efe6">
        {arabica}
      </text>
      {robusta ? (
        <>
          <rect x={14} y={36} width={14} height={14} rx={2} fill={ROBUSTA} />
          <text x={34} y={47} fill="#f4efe6">
            {robusta}
          </text>
        </>
      ) : null}
      {rows.map((rowItem, index) => {
        const y = row + 6 + index * 18;
        return (
          <g key={rowItem.kind} transform={`translate(21, ${y})`}>
            {rowItem.kind === "capital" ? (
              <path
                d="M0,-6 L1.5,-1.8 L6,-1.8 L2.4,0.8 L3.7,5.3 L0,2.6 L-3.7,5.3 L-2.4,0.8 L-6,-1.8 L-1.5,-1.8 Z"
                fill="#C8925A"
                stroke="#f4efe6"
                strokeWidth={0.8}
              />
            ) : null}
            {rowItem.kind === "city" ? (
              <circle r={3.4} fill="#f4efe6" stroke="#C8925A" strokeWidth={1.3} />
            ) : null}
            {rowItem.kind === "port" ? (
              <rect
                x={-3.4}
                y={-3.4}
                width={6.8}
                height={6.8}
                transform="rotate(45)"
                fill="#8a6d55"
                stroke="#f4efe6"
                strokeWidth={1}
              />
            ) : null}
            <text x={16} y={4} fill="#f4efe6">
              {rowItem.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
