"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminStatusSelect } from "@/components/admin-status-select";
import { postAdminSave } from "@/lib/admin-save";
import { editorialFromGuide } from "@/lib/guide-editorial";
import type { CountryFact, CountryGuide, CountryGuideSection, CountryRegionRow } from "@/data/country-guides/types";
import type { PublishStatus } from "@/lib/publish";

export function AdminCountryGuideEditor(props: {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: PublishStatus;
  guide: CountryGuide;
  viewHref: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(props.status);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.date);
  const [name, setName] = useState(props.guide.name);
  const [kicker, setKicker] = useState(props.guide.kicker);
  const [lede, setLede] = useState(props.guide.lede);
  const [regionsCaption, setRegionsCaption] = useState(props.guide.regionsCaption);
  const [facts, setFacts] = useState<CountryFact[]>(props.guide.facts);
  const [regions, setRegions] = useState<CountryRegionRow[]>(props.guide.regions);
  const [sections, setSections] = useState<CountryGuideSection[]>(props.guide.sections);
  const [message, setMessage] = useState("");

  async function save(nextStatus: PublishStatus) {
    const guide = editorialFromGuide({
      ...props.guide,
      name,
      kicker,
      lede,
      facts,
      regionsCaption,
      regions,
      sections,
    });
    try {
      await postAdminSave({
        kind: "page",
        slug: props.slug,
        title,
        description,
        date,
        status: nextStatus,
        guide,
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
      return;
    }
    setStatus(nextStatus);
    setMessage(nextStatus === "approved" ? "Approved. This guide is now live." : "Saved.");
    router.refresh();
    if (nextStatus === "approved") {
      window.location.assign(props.viewHref);
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void save(status);
      }}
      className="mt-8 space-y-8"
    >
      <p className="text-sm text-cream/65">
        Edit the copy that is already here. Empty fields stay empty. Saving does not invent sentences.
      </p>
      <div className="space-y-2">
        <Label htmlFor="title">Page title</Label>
        <Input id="title" value={title} onChange={(event) => setTitle(event.target.value)} className="text-cream" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">SEO description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="text-cream"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" value={date} onChange={(event) => setDate(event.target.value)} className="text-cream" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <AdminStatusSelect value={status} onChange={setStatus} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Country name</Label>
          <Input id="name" value={name} onChange={(event) => setName(event.target.value)} className="text-cream" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kicker">Kicker</Label>
          <Input id="kicker" value={kicker} onChange={(event) => setKicker(event.target.value)} className="text-cream" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lede">Lede</Label>
        <Textarea id="lede" value={lede} onChange={(event) => setLede(event.target.value)} rows={4} className="text-cream" />
      </div>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl text-cream">Facts</h2>
        {facts.map((fact, index) => (
          <div key={`${fact.label}-${index}`} className="grid gap-3 sm:grid-cols-2">
            <Input
              aria-label={`Fact ${index + 1} label`}
              value={fact.label}
              onChange={(event) => {
                const next = [...facts];
                next[index] = { ...fact, label: event.target.value };
                setFacts(next);
              }}
              className="text-cream"
            />
            <Input
              aria-label={`Fact ${index + 1} value`}
              value={fact.value}
              onChange={(event) => {
                const next = [...facts];
                next[index] = { ...fact, value: event.target.value };
                setFacts(next);
              }}
              className="text-cream"
            />
          </div>
        ))}
      </section>
      <div className="space-y-2">
        <Label htmlFor="regionsCaption">Regions caption</Label>
        <Textarea
          id="regionsCaption"
          value={regionsCaption}
          onChange={(event) => setRegionsCaption(event.target.value)}
          rows={3}
          className="text-cream"
        />
      </div>
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-cream">Growing regions</h2>
        <p className="text-sm text-cream/60">Numbers and species stay tied to the map. Notes are the copy to check.</p>
        {regions.map((region, index) => (
          <div key={region.id} className="space-y-3 rounded-xl border border-white/10 bg-card p-4">
            <p className="text-sm text-amber">
              {region.number}. {region.name} ({region.species})
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`region-name-${region.id}`}>Name</Label>
                <Input
                  id={`region-name-${region.id}`}
                  value={region.name}
                  onChange={(event) => {
                    const next = [...regions];
                    next[index] = { ...region, name: event.target.value };
                    setRegions(next);
                  }}
                  className="text-cream"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`region-alt-${region.id}`}>Altitude</Label>
                <Input
                  id={`region-alt-${region.id}`}
                  value={region.altitude}
                  onChange={(event) => {
                    const next = [...regions];
                    next[index] = { ...region, altitude: event.target.value };
                    setRegions(next);
                  }}
                  className="text-cream"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`region-season-${region.id}`}>Season</Label>
                <Input
                  id={`region-season-${region.id}`}
                  value={region.season}
                  onChange={(event) => {
                    const next = [...regions];
                    next[index] = { ...region, season: event.target.value };
                    setRegions(next);
                  }}
                  className="text-cream"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`region-notes-${region.id}`}>Notes</Label>
              <Textarea
                id={`region-notes-${region.id}`}
                value={region.notes}
                onChange={(event) => {
                  const next = [...regions];
                  next[index] = { ...region, notes: event.target.value };
                  setRegions(next);
                }}
                rows={2}
                className="text-cream"
              />
            </div>
          </div>
        ))}
      </section>
      <section className="space-y-6">
        <h2 className="font-serif text-2xl text-cream">Sections</h2>
        {sections.map((section, index) => (
          <div key={section.id} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor={`section-title-${section.id}`}>Heading</Label>
              <Input
                id={`section-title-${section.id}`}
                value={section.title}
                onChange={(event) => {
                  const next = [...sections];
                  next[index] = { ...section, title: event.target.value };
                  setSections(next);
                }}
                className="text-cream"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`section-body-${section.id}`}>Markdown</Label>
              <Textarea
                id={`section-body-${section.id}`}
                value={section.markdown}
                onChange={(event) => {
                  const next = [...sections];
                  next[index] = { ...section, markdown: event.target.value };
                  setSections(next);
                }}
                rows={10}
                className="min-h-48 font-mono text-sm text-cream"
              />
            </div>
          </div>
        ))}
      </section>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Save</Button>
        {status !== "approved" ? (
          <Button type="button" onClick={() => void save("approved")}>
            Approve &amp; publish
          </Button>
        ) : null}
        <a className="text-sm text-amber hover:underline" href={props.viewHref}>
          View on site
        </a>
      </div>
      {message ? <p className="text-sm text-amber">{message}</p> : null}
    </form>
  );
}
