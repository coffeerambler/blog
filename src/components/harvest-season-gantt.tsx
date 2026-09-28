"use client";

import {
  COFFEE_HARVEST_SEASONS,
  MONTH_LABELS,
  MONTH_NAMES,
  MONTHS_IN_YEAR,
  getPhaseForMonth,
  isOriginActiveInMonth,
  type SeasonPhase,
} from "@/lib/coffee-harvest-seasons";
import {
  COFFEE_BELT_FILL_HARVEST,
  COFFEE_BELT_FILL_MARKET,
  COFFEE_BELT_FILL_OFF_DARK,
} from "@/lib/coffee-belt";

const PHASE_FILL: Record<SeasonPhase, string> = {
  harvest: COFFEE_BELT_FILL_HARVEST,
  market: COFFEE_BELT_FILL_MARKET,
  off: COFFEE_BELT_FILL_OFF_DARK,
};

const PHASE_LABEL: Record<SeasonPhase, string> = {
  harvest: "Harvesting",
  market: "On market",
  off: "Off season",
};

type HarvestSeasonGanttProps = {
  month: number;
  onMonthChange: (month: number) => void;
  activeOnly: boolean;
};

export function HarvestSeasonGantt({ month, onMonthChange, activeOnly }: HarvestSeasonGanttProps) {
  const origins = COFFEE_HARVEST_SEASONS.filter((origin) =>
    activeOnly ? isOriginActiveInMonth(origin, month) : true,
  ).sort((a, b) => a.country.localeCompare(b.country));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-2xl text-cream">Season chart</h2>
        <p className="text-sm text-cream/60">
          {origins.length} of {COFFEE_HARVEST_SEASONS.length} showing
        </p>
      </div>
      {origins.length === 0 ? (
        <p className="text-sm text-cream/70">No origins are harvesting or on market this month.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="sticky left-0 z-10 bg-card px-3 py-2 font-medium text-cream/70">Origin</th>
                {MONTHS_IN_YEAR.map((value) => {
                  const selected = value === month;
                  return (
                    <th key={value} className="px-1 py-2 text-center font-medium">
                      <button
                        type="button"
                        onClick={() => onMonthChange(value)}
                        aria-label={`View ${MONTH_NAMES[value - 1]}`}
                        aria-pressed={selected}
                        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-1 ${
                          selected ? "bg-amber text-background" : "text-cream/70 hover:text-cream"
                        }`}
                      >
                        {MONTH_LABELS[value - 1]}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {origins.map((origin) => (
                <tr key={origin.country} className="border-b border-white/5 last:border-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card px-3 py-2 text-left font-normal text-cream"
                  >
                    {origin.country}
                  </th>
                  {MONTHS_IN_YEAR.map((value) => {
                    const phase = getPhaseForMonth(origin, value);
                    const selected = value === month;
                    return (
                      <td key={value} className="px-1 py-1.5">
                        <span
                          title={`${origin.country}, ${MONTH_NAMES[value - 1]}: ${PHASE_LABEL[phase]}`}
                          className={`block h-6 rounded-sm ${selected ? "ring-1 ring-cream/70" : ""}`}
                          style={{ background: PHASE_FILL[phase] }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
