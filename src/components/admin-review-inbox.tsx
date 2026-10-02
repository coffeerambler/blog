"use client";

import { useMemo, useState } from "react";
import { AdminRecordList } from "@/components/admin-record-list";
import type { AdminRecord } from "@/lib/admin-types";

type KindFilter = "all" | "post" | "country" | "page";

const FILTERS: { value: KindFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "post", label: "Posts" },
  { value: "country", label: "Country guides" },
  { value: "page", label: "Pages" },
];

function matches(record: AdminRecord, filter: KindFilter) {
  if (filter === "all") return true;
  if (filter === "post") return record.kind === "post";
  if (filter === "country") return record.pageType === "country";
  return record.kind === "page" && record.pageType !== "country";
}

export function AdminReviewInbox({ records }: { records: AdminRecord[] }) {
  const [filter, setFilter] = useState<KindFilter>("all");
  const shown = useMemo(() => records.filter((record) => matches(record, filter)), [records, filter]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter review by kind">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={`inline-flex min-h-11 items-center rounded-md border px-3 text-sm ${
              filter === item.value
                ? "border-amber/50 bg-amber/15 text-amber"
                : "border-white/10 text-cream/70 hover:text-cream"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <AdminRecordList
        records={shown}
        empty={records.length ? "Nothing in this filter." : "Nothing waiting for review."}
      />
    </div>
  );
}
