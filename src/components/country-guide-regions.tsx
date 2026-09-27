"use client";

import { useState } from "react";
import { CountryGrowingMap } from "@/components/country-growing-map";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaptionWithLinks } from "@/components/caption-with-links";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CountryGuide } from "@/data/country-guides/types";
import type { Feature, Geometry } from "geojson";
import type { GrowingRegionFeature, MapSource } from "@/lib/country-guides";

export function CountryGuideRegions({
  guide,
  country,
  regions,
  mapSource,
}: {
  guide: CountryGuide;
  country: Feature<Geometry, { id: string; name: string }>;
  regions: GrowingRegionFeature[];
  mapSource: MapSource;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const hasRobusta = guide.regions.some((row) => row.species === "robusta");

  return (
    <>
      <section aria-labelledby="growing-map-heading" className="space-y-3">
        <h2 id="growing-map-heading" className="font-serif text-2xl text-cream">
          Growing regions
        </h2>
        <CountryGrowingMap
          country={country}
          countryName={guide.name}
          regions={regions}
          points={guide.mapPoints}
          activeId={activeId}
          onActiveId={setActiveId}
          insetLabel={guide.insetLabel}
          legendArabica={guide.legendArabica}
          legendRobusta={guide.legendRobusta}
        />
        <p className="text-sm text-cream/55">
          Numbers on the map match the table.
          {hasRobusta ? " Amber is arabica; brown is robusta." : " Amber is arabica."}{" "}
          <CaptionWithLinks text={guide.regionsCaption} /> Source: {mapSource.name} ({mapSource.license}).
        </p>
      </section>
      <section aria-labelledby="facts-heading">
        <h2 id="facts-heading" className="font-serif text-2xl text-cream">
          Factfile
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {guide.facts.map((fact) => (
            <div key={fact.label} className="bg-card px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.16em] text-cream/45">{fact.label}</dt>
              <dd className="mt-1 text-cream">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="regions-table-heading">
        <h2 id="regions-table-heading" className="sr-only">
          Region details
        </h2>
        <Table>
          <TableCaption>
            <CaptionWithLinks text={guide.regionsCaption} />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No.</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Altitude</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guide.regions.map((row) => {
              const active = activeId === row.id;
              return (
                <TableRow
                  key={row.id}
                  data-state={active ? "selected" : undefined}
                  onMouseEnter={() => setActiveId(row.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className={cn(active && "bg-amber/20 ring-1 ring-inset ring-amber/40")}
                >
                  <TableCell className="font-medium text-amber">{row.number}</TableCell>
                  <TableCell className="font-medium text-cream">{row.name}</TableCell>
                  <TableCell>
                    <Badge variant={row.species === "arabica" ? "default" : "secondary"}>
                      {row.species}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.altitude}</TableCell>
                  <TableCell>{row.season}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
