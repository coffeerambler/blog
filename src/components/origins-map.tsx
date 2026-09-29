"use client";

import { useCallback, useMemo, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useCoffeeBeltFeatures } from "@/hooks/use-coffee-belt-features";
import {
  COFFEE_BELT_FILL_MARKET,
  COFFEE_BELT_FILL_MARKET_HOVER,
  COFFEE_BELT_FILL_OFF_DARK,
  COFFEE_BELT_FILL_OFF_HOVER_DARK,
  COFFEE_BELT_STROKE,
  COFFEE_BELT_STROKE_WIDTH,
  COFFEE_BELT_VIEWBOX_HEIGHT,
  COFFEE_BELT_VIEWBOX_WIDTH,
  coffeeBeltFeatureId,
  type CountryGuideLink,
} from "@/lib/coffee-belt";

type Tooltip = { x: number; y: number; name: string; href: string | null };

export function OriginsMap({ guides }: { guides: CountryGuideLink[] }) {
  const router = useRouter();
  const frameRef = useRef<HTMLDivElement>(null);
  const { nameById, pathGen, features } = useCoffeeBeltFeatures();
  const hrefById = useMemo(
    () => new Map(guides.map((guide) => [guide.numericCode, guide.href])),
    [guides],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const hrefFor = useCallback((id: string) => hrefById.get(id) ?? null, [hrefById]);

  const showCountry = useCallback(
    (id: string | null, clientX: number, clientY: number) => {
      setActiveId(id);
      if (!id) {
        setTooltip(null);
        return;
      }
      const name = nameById.get(id) ?? "";
      const href = hrefFor(id);
      const box = frameRef.current?.getBoundingClientRect();
      if (box) {
        const x = Math.min(Math.max(clientX - box.left, 72), Math.max(box.width - 72, 72));
        const y = Math.min(Math.max(clientY - box.top, 28), Math.max(box.height - 8, 28));
        setTooltip({ x, y, name, href });
      } else {
        setTooltip({ x: clientX, y: clientY, name, href });
      }
    },
    [hrefFor, nameById],
  );

  const clearCountry = useCallback(() => {
    setActiveId(null);
    setTooltip(null);
  }, []);

  const goTo = useCallback(
    (id: string) => {
      const href = hrefFor(id);
      if (href) router.push(href);
    },
    [hrefFor, router],
  );

  const idFromTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return null;
    return target.closest("[data-id]")?.getAttribute("data-id") ?? null;
  };

  return (
    <div
      ref={frameRef}
      className="origins-map relative w-full overflow-hidden"
      style={{ aspectRatio: `${COFFEE_BELT_VIEWBOX_WIDTH} / ${COFFEE_BELT_VIEWBOX_HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${COFFEE_BELT_VIEWBOX_WIDTH} ${COFFEE_BELT_VIEWBOX_HEIGHT}`}
        width="100%"
        height="100%"
        className="block h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#161410]"
        style={{ background: "transparent", maxWidth: "none", touchAction: "manipulation" }}
        aria-label="Coffee-growing countries. Hover or tap a country to highlight it."
        onMouseMove={(event: MouseEvent<SVGSVGElement>) => {
          const id = idFromTarget(event.target);
          if (id) showCountry(id, event.clientX, event.clientY);
          else clearCountry();
        }}
        onMouseLeave={clearCountry}
      >
        <g>
          {features.map((entry) => {
            const id = coffeeBeltFeatureId(entry);
            const name = nameById.get(id) ?? "";
            const href = hrefFor(id);
            const active = activeId === id;
            const fill = href
              ? active
                ? COFFEE_BELT_FILL_MARKET_HOVER
                : COFFEE_BELT_FILL_MARKET
              : active
                ? COFFEE_BELT_FILL_OFF_HOVER_DARK
                : COFFEE_BELT_FILL_OFF_DARK;
            const d = pathGen(entry);
            if (!d) return null;
            const shape = (
              <path
                d={d}
                fill={fill}
                stroke={COFFEE_BELT_STROKE}
                strokeWidth={COFFEE_BELT_STROKE_WIDTH}
                data-id={id}
                data-country={name}
                data-has-guide={href ? "true" : "false"}
                pointerEvents="auto"
                style={{ cursor: href ? "pointer" : "default" }}
                aria-label={href ? `${name}, open country guide` : name}
                onMouseEnter={(event) => showCountry(id, event.clientX, event.clientY)}
                onMouseMove={(event) => showCountry(id, event.clientX, event.clientY)}
                onClick={(event) => {
                  if (!href) return;
                  event.preventDefault();
                  goTo(id);
                }}
                onTouchEnd={(event) => {
                  const touch = event.changedTouches?.[0];
                  if (!touch) return;
                  event.preventDefault();
                  const hit = document.elementFromPoint(touch.clientX, touch.clientY);
                  const pathEl = hit instanceof Element ? hit.closest("[data-id]") : null;
                  const tappedId =
                    pathEl?.getAttribute("data-id") ??
                    (event.currentTarget as SVGPathElement).dataset?.id;
                  if (!tappedId) return;
                  showCountry(tappedId, touch.clientX, touch.clientY - 40);
                  goTo(tappedId);
                }}
              />
            );
            if (!href) {
              return <g key={id}>{shape}</g>;
            }
            return (
              <a
                key={id}
                href={href}
                data-id={id}
                data-country={name}
                aria-label={`${name} country guide`}
              >
                {shape}
              </a>
            );
          })}
        </g>
      </svg>
      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 rounded border border-white/15 bg-[#221e18] px-2 py-1 font-sans text-sm text-cream shadow-md"
          data-map-tooltip="true"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%) translateY(-8px)",
          }}
        >
          {tooltip.name}
        </div>
      ) : null}
    </div>
  );
}
