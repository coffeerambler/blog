"use client";

import { useCallback, useMemo, useState, type MouseEvent } from "react";
import { useCoffeeBeltFeatures } from "@/hooks/use-coffee-belt-features";
import {
  COFFEE_BELT_FILL_HARVEST,
  COFFEE_BELT_FILL_HARVEST_HOVER,
  COFFEE_BELT_FILL_MARKET,
  COFFEE_BELT_FILL_MARKET_HOVER,
  COFFEE_BELT_FILL_OFF_DARK,
  COFFEE_BELT_FILL_OFF_HOVER_DARK,
  COFFEE_BELT_STROKE,
  COFFEE_BELT_STROKE_WIDTH,
  COFFEE_BELT_VIEWBOX_HEIGHT,
  COFFEE_BELT_VIEWBOX_WIDTH,
  coffeeBeltFeatureId,
} from "@/lib/coffee-belt";
import {
  buildPhaseByCountryMap,
  getOriginSeasonByCountry,
  type SeasonPhase,
} from "@/lib/coffee-harvest-seasons";

export type HarvestSeasonMapProps = {
  month: number;
  phaseLabels: Record<SeasonPhase, string>;
};

function fillForPhase(phase: SeasonPhase, isHovered: boolean): string {
  if (phase === "harvest") {
    return isHovered ? COFFEE_BELT_FILL_HARVEST_HOVER : COFFEE_BELT_FILL_HARVEST;
  }
  if (phase === "market") {
    return isHovered ? COFFEE_BELT_FILL_MARKET_HOVER : COFFEE_BELT_FILL_MARKET;
  }
  return isHovered ? COFFEE_BELT_FILL_OFF_HOVER_DARK : COFFEE_BELT_FILL_OFF_DARK;
}

export function HarvestSeasonMap({ month, phaseLabels }: HarvestSeasonMapProps) {
  const { nameById, pathGen, features } = useCoffeeBeltFeatures();
  const phaseByCountry = useMemo(() => buildPhaseByCountryMap(month), [month]);
  const [frame, setFrame] = useState<HTMLDivElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    phase: SeasonPhase;
    notes?: string;
  } | null>(null);

  const showTooltip = useCallback(
    (id: string | null, clientX: number, clientY: number) => {
      setHoveredId(id);
      if (!id) {
        setTooltip(null);
        return;
      }
      const name = nameById.get(id) ?? "";
      const phase = phaseByCountry.get(name) ?? "off";
      const notes = getOriginSeasonByCountry(name)?.notes;
      const box = frame?.getBoundingClientRect();
      const x = box ? clientX - box.left : clientX;
      const y = box ? clientY - box.top : clientY;
      setTooltip({ x, y, name, phase, notes });
    },
    [frame, nameById, phaseByCountry],
  );

  const hideTooltip = useCallback(() => {
    setHoveredId(null);
    setTooltip(null);
  }, []);

  const idFromTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return null;
    return target.closest("[data-id]")?.getAttribute("data-id") ?? null;
  };

  return (
    <div
      ref={setFrame}
      className="origins-map relative w-full overflow-hidden"
      style={{ aspectRatio: `${COFFEE_BELT_VIEWBOX_WIDTH} / ${COFFEE_BELT_VIEWBOX_HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${COFFEE_BELT_VIEWBOX_WIDTH} ${COFFEE_BELT_VIEWBOX_HEIGHT}`}
        width="100%"
        height="100%"
        className="block h-full w-full overflow-hidden rounded-xl border border-white/10 bg-card"
        aria-label="Harvest season map. Hover or tap a country to see whether it is harvesting or on market."
        onMouseMove={(event: MouseEvent<SVGSVGElement>) => {
          const id = idFromTarget(event.target);
          if (id) showTooltip(id, event.clientX, event.clientY);
          else hideTooltip();
        }}
        onMouseLeave={hideTooltip}
      >
        <g>
          {features.map((entry) => {
            const id = coffeeBeltFeatureId(entry);
            const name = nameById.get(id) ?? "";
            const phase = phaseByCountry.get(name) ?? "off";
            const d = pathGen(entry);
            if (!d) return null;
            return (
              <path
                key={id}
                d={d}
                fill={fillForPhase(phase, hoveredId === id)}
                stroke={COFFEE_BELT_STROKE}
                strokeWidth={COFFEE_BELT_STROKE_WIDTH}
                data-id={id}
                data-country={name}
                pointerEvents="auto"
                style={{ cursor: "pointer" }}
                aria-label={`${name}, ${phaseLabels[phase]}`}
                onMouseEnter={(event) => showTooltip(id, event.clientX, event.clientY)}
                onMouseMove={(event) => showTooltip(id, event.clientX, event.clientY)}
                onClick={(event) => showTooltip(id, event.clientX, event.clientY)}
                onTouchEnd={(event) => {
                  const touch = event.changedTouches?.[0];
                  if (!touch) return;
                  const hit = document.elementFromPoint(touch.clientX, touch.clientY);
                  const pathEl = hit instanceof Element ? hit.closest("[data-id]") : null;
                  const tappedId =
                    pathEl?.getAttribute("data-id") ??
                    (event.currentTarget as SVGPathElement).dataset.id;
                  if (!tappedId) return;
                  showTooltip(tappedId, touch.clientX, touch.clientY - 40);
                }}
              />
            );
          })}
        </g>
      </svg>
      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 max-w-[220px] rounded border border-white/15 bg-[#221e18] px-2 py-1 text-sm text-cream shadow-md"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%) translateY(-8px)",
          }}
        >
          <div className="font-medium">{tooltip.name}</div>
          <div className="text-xs text-cream/60">{phaseLabels[tooltip.phase]}</div>
          {tooltip.notes ? (
            <div className="mt-0.5 text-[11px] leading-snug text-cream/60">{tooltip.notes}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
