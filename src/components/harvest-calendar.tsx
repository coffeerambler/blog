"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, Info, Loader2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FullscreenModal } from "@/components/fullscreen-modal";
import { HarvestSeasonGantt } from "@/components/harvest-season-gantt";
import { COFFEE_HARVEST_SEASONS, type SeasonPhase } from "@/lib/coffee-harvest-seasons";

const HarvestSeasonMap = dynamic(
  () => import("@/components/harvest-season-map").then((mod) => mod.HarvestSeasonMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[140px] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    ),
  },
);

const PHASE_LABELS: Record<SeasonPhase, string> = {
  harvest: "Harvesting",
  market: "On market",
  off: "Off season",
};

const LOCALE = "en-GB";

const LEGEND: { phase: SeasonPhase; dot: string }[] = [
  { phase: "harvest", dot: "bg-[#8fcb86]" },
  { phase: "market", dot: "bg-[#C8925A]" },
  { phase: "off", dot: "bg-muted-foreground/35" },
];

export type HarvestCalendarProps = {
  mapTourTarget?: string;
  mapFirst?: boolean;
  initialMonth?: number;
};

function PhaseLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      {LEGEND.map((item) => (
        <li key={item.phase} className="inline-flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
          {PHASE_LABELS[item.phase]}
        </li>
      ))}
    </ul>
  );
}

export function HarvestCalendar({
  mapTourTarget,
  mapFirst = false,
  initialMonth,
}: HarvestCalendarProps) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => {
    if (initialMonth && initialMonth >= 1 && initialMonth <= 12) return initialMonth;
    return new Date().getMonth() + 1;
  });
  const [mapFullscreen, setMapFullscreen] = useState(false);

  function shiftMonth(delta: number) {
    const next = month + delta;
    if (next < 1) {
      setYear((current) => current - 1);
      setMonth(12);
      return;
    }
    if (next > 12) {
      setYear((current) => current + 1);
      setMonth(1);
      return;
    }
    setMonth(next);
  }

  const monthYearLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(LOCALE, { month: "long", year: "numeric" }).format(
        new Date(year, month - 1, 1),
      ),
    [year, month],
  );

  const formatCountryName = (name: string) => name;
  const formatCountryNotes = (_name: string, notes?: string) => notes;

  const map = (
    <div
      data-tour={mapTourTarget}
      className="relative w-full overflow-hidden rounded-xl border border-border/40 bg-card/20"
      style={{ aspectRatio: "2 / 1" }}
    >
      <HarvestSeasonMap
        month={month}
        phaseLabels={PHASE_LABELS}
        formatCountryName={formatCountryName}
        formatCountryNotes={formatCountryNotes}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card/20 px-3 py-3 sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft />
            </Button>
            <span className="min-w-[10.5rem] text-center text-base font-medium tabular-nums">{monthYearLabel}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight />
            </Button>
          </div>
          {mapFirst ? null : (
            <Button variant="outline" size="sm" className="h-9 px-3 text-sm" onClick={() => setMapFullscreen(true)}>
              <Maximize2 className="size-3.5" />
              Expand map
            </Button>
          )}
        </div>
        <PhaseLegend />
      </div>

      <div className="flex flex-col gap-5">
        {map}
        {mapFirst ? null : (
          <>
            <HarvestSeasonGantt selectedMonth={month} locale={LOCALE} onMonthSelect={setMonth} />
            <div className="flex gap-3 rounded-xl border border-border/40 bg-card/20 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0" />
              <div className="space-y-2">
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
            <p className="text-center text-sm text-muted-foreground">
              {COFFEE_HARVEST_SEASONS.length} origins in this calendar
            </p>
          </>
        )}
      </div>

      <FullscreenModal
        isOpen={mapFullscreen}
        onClose={() => setMapFullscreen(false)}
        title={`Harvest season map · ${monthYearLabel}`}
      >
        <div className="h-full min-h-0">
          <HarvestSeasonMap
            month={month}
            phaseLabels={PHASE_LABELS}
            formatCountryName={formatCountryName}
            formatCountryNotes={formatCountryNotes}
            enableZoom
          />
        </div>
      </FullscreenModal>
    </div>
  );
}
