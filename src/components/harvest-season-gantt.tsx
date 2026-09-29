"use client";

import { useMemo, useRef, useCallback, useState } from "react";
import {
  COFFEE_HARVEST_SEASONS,
  getPhaseForMonth,
  isOriginActiveInMonth,
  MONTHS_IN_YEAR,
  type OriginHarvestSeason,
  type SeasonPhase,
} from "@/lib/coffee-harvest-seasons";
import { Toggle } from "@/components/ui/toggle";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

const PHASE_FILL: Record<SeasonPhase, string> = {
  harvest: "bg-[#8fcb86]",
  market: "bg-[#C8925A]",
  off: "bg-muted-foreground/15",
};

const GRID_COLS =
  "grid grid-cols-[minmax(5.5rem,7rem)_repeat(12,minmax(1.25rem,1fr))] gap-px";

type HarvestSeasonGanttProps = {
  selectedMonth: number;
  locale: string;
  onMonthSelect: (month: number) => void;
};

function monthLongLabel(month: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2024, month - 1, 1));
}

function monthShortLabel(month: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2024, month - 1, 1));
}

function sortOrigins(origins: OriginHarvestSeason[], locale: string): OriginHarvestSeason[] {
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  return [...origins].sort((a, b) => collator.compare(a.country, b.country));
}

const COUNTRY_CELL_CLASS =
  "sticky left-0 z-[1] flex min-w-0 items-center border-r border-border/30 bg-card/95 py-1 pr-1.5 text-[11px] font-medium leading-tight text-foreground backdrop-blur-sm";

function CountryNameCell({ countryLabel, notesLabel }: { countryLabel: string; notesLabel?: string }) {
  if (!notesLabel) {
    return (
      <div className={COUNTRY_CELL_CLASS}>
        <span className="truncate">{countryLabel}</span>
      </div>
    );
  }

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(COUNTRY_CELL_CLASS, "w-full cursor-help text-left hover:bg-card")}
          aria-label={`${countryLabel} — ${notesLabel}`}
        >
          <span className="truncate underline decoration-dotted decoration-border/60 underline-offset-2">
            {countryLabel}
          </span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="start" className="w-auto max-w-[16rem] p-2.5 text-xs leading-snug">
        <p className="font-medium">{countryLabel}</p>
        <p className="mt-1 text-muted-foreground">{notesLabel}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

function GanttRow({
  origin,
  selectedMonth,
  countryLabel,
  notesLabel,
  onMonthSelect,
  selectMonthLabel,
}: {
  origin: OriginHarvestSeason;
  selectedMonth: number;
  countryLabel: string;
  notesLabel?: string;
  onMonthSelect: (month: number) => void;
  selectMonthLabel: (month: number) => string;
}) {
  return (
    <div className={GRID_COLS}>
      <CountryNameCell countryLabel={countryLabel} notesLabel={notesLabel} />
      {MONTHS_IN_YEAR.map((m) => {
        const phase = getPhaseForMonth(origin, m);
        const isSelected = m === selectedMonth;
        return (
          <button
            key={m}
            type="button"
            onClick={() => onMonthSelect(m)}
            aria-label={selectMonthLabel(m)}
            aria-current={isSelected ? "true" : undefined}
            className={cn(
              "flex items-center rounded-sm py-0.5 transition-colors hover:bg-foreground/[0.04]",
              isSelected && "bg-foreground/[0.06] ring-1 ring-inset ring-foreground/15",
            )}
          >
            <div
              className={cn("pointer-events-none h-1.5 w-full rounded-sm", PHASE_FILL[phase])}
              role="img"
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}

export function HarvestSeasonGantt({ selectedMonth, locale, onMonthSelect }: HarvestSeasonGanttProps) {
  const [activeOnly, setActiveOnly] = useState(false);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const syncingScroll = useRef(false);

  const sortedOrigins = useMemo(
    () => sortOrigins(COFFEE_HARVEST_SEASONS, locale),
    [locale],
  );

  const visibleOrigins = useMemo(
    () =>
      activeOnly
        ? sortedOrigins.filter((origin) => isOriginActiveInMonth(origin, selectedMonth))
        : sortedOrigins,
    [sortedOrigins, activeOnly, selectedMonth],
  );

  const syncScrollLeft = useCallback((source: HTMLDivElement, target: HTMLDivElement) => {
    if (syncingScroll.current) return;
    syncingScroll.current = true;
    target.scrollLeft = source.scrollLeft;
    syncingScroll.current = false;
  }, []);

  const onBodyScroll = useCallback(() => {
    const body = bodyScrollRef.current;
    const header = headerScrollRef.current;
    if (body && header) syncScrollLeft(body, header);
  }, [syncScrollLeft]);

  const onHeaderScroll = useCallback(() => {
    const body = bodyScrollRef.current;
    const header = headerScrollRef.current;
    if (body && header) syncScrollLeft(header, body);
  }, [syncScrollLeft]);

  const selectMonthLabel = useCallback(
    (month: number) => `View ${monthLongLabel(month, locale)}`,
    [locale],
  );

  return (
    <div className="rounded-md border border-border/40 bg-card/20">
      <div className="flex items-center justify-between gap-2 border-b border-border/30 px-2.5 py-1.5">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="font-serif text-xs font-semibold text-foreground">Season chart</h3>
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {visibleOrigins.length} of {COFFEE_HARVEST_SEASONS.length} showing
          </span>
        </div>
        <Toggle
          variant="outline"
          size="sm"
          pressed={activeOnly}
          onPressedChange={setActiveOnly}
          className="h-7 shrink-0 px-2 text-[11px] data-[state=on]:border-primary/40 data-[state=on]:bg-primary/10 data-[state=on]:text-foreground"
          aria-label={
            activeOnly
              ? "Showing origins harvesting or on market this month"
              : "Show all origins"
          }
        >
          Active this month
        </Toggle>
      </div>

      <div className="sticky top-0 z-20 border-b border-border/30 bg-card/95 shadow-sm backdrop-blur-sm">
        <div ref={headerScrollRef} className="overflow-x-auto overscroll-x-contain" onScroll={onHeaderScroll}>
          <div className={cn("min-w-[36rem] px-1 pt-1.5", GRID_COLS)}>
            <div className="sticky left-0 z-[1] border-r border-border/30 bg-card/95 backdrop-blur-sm" />
            {MONTHS_IN_YEAR.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onMonthSelect(m)}
                aria-label={selectMonthLabel(m)}
                aria-current={m === selectedMonth ? "true" : undefined}
                className={cn(
                  "rounded-sm pb-0.5 text-center text-[10px] font-medium text-muted-foreground tabular-nums transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                  m === selectedMonth && "bg-foreground/[0.06] font-semibold text-foreground",
                )}
              >
                {monthShortLabel(m, locale)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={bodyScrollRef} className="overflow-x-auto overscroll-x-contain" onScroll={onBodyScroll}>
        <div className="min-w-[36rem] space-y-px px-1 py-1.5">
          {visibleOrigins.length === 0 ? (
            <p className="px-1 py-3 text-center text-[11px] text-muted-foreground">
              No origins are harvesting or on market this month.
            </p>
          ) : (
            visibleOrigins.map((origin) => (
              <GanttRow
                key={origin.country}
                origin={origin}
                selectedMonth={selectedMonth}
                countryLabel={origin.country}
                notesLabel={origin.notes}
                onMonthSelect={onMonthSelect}
                selectMonthLabel={selectMonthLabel}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
