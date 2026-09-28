"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HarvestSeasonGantt } from "@/components/harvest-season-gantt";
import { HarvestSeasonMap } from "@/components/harvest-season-map";
import {
  COFFEE_BELT_FILL_HARVEST,
  COFFEE_BELT_FILL_MARKET,
  COFFEE_BELT_FILL_OFF_DARK,
} from "@/lib/coffee-belt";
import {
  COFFEE_HARVEST_SEASONS,
  MONTH_NAMES,
  getMonthPhaseCounts,
  type SeasonPhase,
} from "@/lib/coffee-harvest-seasons";

const PHASE_LABELS: Record<SeasonPhase, string> = {
  harvest: "Harvesting",
  market: "On market",
  off: "Off season",
};

const LEGEND: { phase: SeasonPhase; fill: string }[] = [
  { phase: "harvest", fill: COFFEE_BELT_FILL_HARVEST },
  { phase: "market", fill: COFFEE_BELT_FILL_MARKET },
  { phase: "off", fill: COFFEE_BELT_FILL_OFF_DARK },
];

export type HarvestCalendarProps = {
  initialMonth?: number;
  mapFirst?: boolean;
};

function clampMonth(month: number) {
  if (month < 1 || month > 12) return new Date().getMonth() + 1;
  return month;
}

export function HarvestCalendar({ initialMonth, mapFirst = true }: HarvestCalendarProps) {
  const [month, setMonth] = useState(() => clampMonth(initialMonth ?? new Date().getMonth() + 1));
  const [activeOnly, setActiveOnly] = useState(false);
  const counts = useMemo(() => getMonthPhaseCounts(month), [month]);
  const monthName = MONTH_NAMES[month - 1];

  function shift(delta: number) {
    setMonth((current) => ((current - 1 + delta + 12) % 12) + 1);
  }

  const map = (
    <section aria-labelledby="harvest-map-title">
      <h2 id="harvest-map-title" className="mb-3 font-serif text-2xl text-cream">
        Harvest season map
      </h2>
      <HarvestSeasonMap month={month} phaseLabels={PHASE_LABELS} />
    </section>
  );

  const chart = (
    <HarvestSeasonGantt month={month} onMonthChange={setMonth} activeOnly={activeOnly} />
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/15 text-cream hover:bg-white/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="min-w-36 text-center font-serif text-3xl text-cream">{monthName}</p>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/15 text-cream hover:bg-white/5"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
          {LEGEND.map((item) => (
            <li key={item.phase} className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ background: item.fill }} />
              {PHASE_LABELS[item.phase]}
              <span className="text-cream/50">
                {item.phase === "harvest" ? counts.harvest : item.phase === "market" ? counts.market : counts.off}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {mapFirst ? (
        <>
          {map}
          {chart}
        </>
      ) : (
        <>
          {chart}
          {map}
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          aria-pressed={activeOnly}
          onClick={() => setActiveOnly((current) => !current)}
          className={`inline-flex min-h-11 items-center rounded-md border px-3 text-sm ${
            activeOnly
              ? "border-amber bg-amber text-background"
              : "border-white/15 text-cream hover:bg-white/5"
          }`}
        >
          Active this month
        </button>
        <p className="text-sm text-cream/60">
          {activeOnly
            ? "Showing origins harvesting or on market this month"
            : "Show all origins"}
          {" · "}
          {COFFEE_HARVEST_SEASONS.length} origins in this calendar
        </p>
      </div>

      <div className="space-y-2 text-sm leading-6 text-cream/60">
        <p>
          These are approximate country-level windows. Actual arrival at roasters depends on region,
          processing, and shipping.
        </p>
        <p>
          On market means harvest has finished for that crop. If a month overlaps both windows, we show
          harvesting — but beans from earlier picks may still be on sale at roasters during harvest months.
        </p>
      </div>
    </div>
  );
}
