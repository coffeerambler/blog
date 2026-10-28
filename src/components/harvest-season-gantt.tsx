"use client";

import { useMemo, useCallback, useState } from "react";
import {
  COFFEE_HARVEST_SEASONS,
  getPhaseForMonth,
  isOriginActiveInMonth,
  MONTHS_IN_YEAR,
  type OriginHarvestSeason,
  type SeasonPhase,
} from "@/lib/coffee-harvest-seasons";
import { Toggle } from "@/components/ui/toggle";
import { formatMonthWindow } from "@/lib/harvest-window";
import { cn } from "@/lib/utils";

const PHASE_FILL: Record<SeasonPhase, string> = {
  harvest: "bg-[#8fcb86]",
  market: "bg-[#C8925A]",
  off: "bg-foreground/10",
};

const PHASE_BADGE: Record<SeasonPhase, string> = {
  harvest: "bg-[#8fcb86]/20 text-cream",
  market: "bg-[#C8925A]/20 text-cream",
  off: "bg-foreground/5 text-muted-foreground",
};

const PHASE_LABEL: Record<SeasonPhase, string> = {
  harvest: "Harvesting",
  market: "On market",
  off: "Off season",
};

const MONTH_GRID = "grid grid-cols-12 gap-0.5 sm:gap-1";

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

function GanttRow({
  origin,
  selectedMonth,
  countryLabel,
  notesLabel,
  locale,
  onMonthSelect,
}: {
  origin: OriginHarvestSeason;
  selectedMonth: number;
  countryLabel: string;
  notesLabel?: string;
  locale: string;
  onMonthSelect: (month: number) => void;
}) {
  const selectedPhase = getPhaseForMonth(origin, selectedMonth);
  const harvestWindow = formatMonthWindow(origin.harvestMonths);
  const marketWindow = formatMonthWindow(origin.marketMonths);

  return (
    <li className="px-3 py-4 sm:px-4">
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-medium leading-snug text-foreground">{countryLabel}</h3>
          <p className="mt-1 text-sm leading-relaxed text-cream/80">
            Coffee harvest: {harvestWindow}. On market: {marketWindow}.
          </p>
          {notesLabel ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{notesLabel}</p>
          ) : null}
        </div>
        <span
          className={cn(
            "mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            PHASE_BADGE[selectedPhase],
          )}
        >
          {PHASE_LABEL[selectedPhase]}
        </span>
      </div>
      <div className={MONTH_GRID}>
        {MONTHS_IN_YEAR.map((m) => {
          const phase = getPhaseForMonth(origin, m);
          const isSelected = m === selectedMonth;
          return (
            <button
              key={m}
              type="button"
              onClick={() => onMonthSelect(m)}
              aria-label={`${countryLabel} coffee harvest in ${monthLongLabel(m, locale)}: ${PHASE_LABEL[phase]}`}
              aria-current={isSelected ? "true" : undefined}
              className={cn(
                "flex h-9 items-center rounded-md px-0.5 transition-colors hover:bg-foreground/[0.06]",
                isSelected && "bg-foreground/[0.08] ring-1 ring-inset ring-amber/80",
              )}
            >
              <span
                className={cn("pointer-events-none block h-2.5 w-full rounded-full sm:h-3", PHASE_FILL[phase])}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </li>
  );
}

export function HarvestSeasonGantt({ selectedMonth, locale, onMonthSelect }: HarvestSeasonGanttProps) {
  const [activeOnly, setActiveOnly] = useState(false);

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

  const selectMonthLabel = useCallback(
    (month: number) => `View ${monthLongLabel(month, locale)}`,
    [locale],
  );

  return (
    <div className="rounded-xl border border-border/40 bg-card/30">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/30 px-3 py-3 sm:px-4">
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold text-foreground">Season chart</h2>
          <p className="mt-0.5 text-sm text-muted-foreground tabular-nums">
            {visibleOrigins.length} of {COFFEE_HARVEST_SEASONS.length} origins
          </p>
        </div>
        <Toggle
          variant="outline"
          size="sm"
          pressed={activeOnly}
          onPressedChange={setActiveOnly}
          className="h-9 shrink-0 px-3 text-sm data-[state=on]:border-primary/40 data-[state=on]:bg-primary/10 data-[state=on]:text-foreground"
          aria-label={
            activeOnly
              ? "Showing origins harvesting or on market this month"
              : "Show all origins"
          }
        >
          Active this month
        </Toggle>
      </div>

      <div className="sticky top-0 z-30 border-b border-border/40 bg-card px-3 py-2.5 shadow-[0_10px_18px_rgba(0,0,0,0.45)] sm:px-4">
        <div className={MONTH_GRID}>
          {MONTHS_IN_YEAR.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onMonthSelect(m)}
              aria-label={selectMonthLabel(m)}
              aria-current={m === selectedMonth ? "true" : undefined}
              className={cn(
                "rounded-md py-1 text-center text-[10px] font-medium tracking-tight text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground sm:text-xs",
                m === selectedMonth && "bg-foreground/[0.08] font-semibold text-foreground ring-1 ring-inset ring-amber/80",
              )}
            >
              {monthShortLabel(m, locale)}
            </button>
          ))}
        </div>
      </div>

      {visibleOrigins.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          No origins are harvesting or on market this month.
        </p>
      ) : (
        <ul className="divide-y divide-border/30">
          {visibleOrigins.map((origin) => (
            <GanttRow
              key={origin.country}
              origin={origin}
              selectedMonth={selectedMonth}
              countryLabel={origin.country}
                notesLabel={origin.notes}
                locale={locale}
                onMonthSelect={onMonthSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
