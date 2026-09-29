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
    <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
      {LEGEND.map((item) => (
        <li key={item.phase} className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${item.dot}`} />
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
      className="relative w-full overflow-hidden rounded-md border border-border/40 bg-card/20"
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
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex shrink-0 flex-col gap-2 border-b border-border/30 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft />
            </Button>
            <span className="min-w-[9.5rem] text-center text-sm font-medium tabular-nums">{monthYearLabel}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight />
            </Button>
          </div>
          {mapFirst ? null : (
            <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]" onClick={() => setMapFullscreen(true)}>
              <Maximize2 className="size-3" />
              Expand
            </Button>
          )}
        </div>
        <PhaseLegend />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-3 py-3">
          {map}
          {mapFirst ? null : (
            <>
              <HarvestSeasonGantt selectedMonth={month} locale={LOCALE} onMonthSelect={setMonth} />
              <div className="flex gap-2 rounded-md border border-border/40 bg-card/20 px-2.5 py-2 text-[11px] leading-snug text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                <div className="space-y-1">
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
              <p className="text-center text-[11px] text-muted-foreground">
                {COFFEE_HARVEST_SEASONS.length} origins in this calendar
              </p>
            </>
          )}
        </div>
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
