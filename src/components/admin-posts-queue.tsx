"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AdminStatusBadge } from "@/components/admin-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editHref, type AdminRecord } from "@/lib/admin-types";
import { PUBLISH_STATUSES, type PublishStatus } from "@/lib/publish";

type StatusFilter = "all" | PublishStatus;

export function AdminPostsQueue({
  posts,
  initialStatus = "all",
  heading,
}: {
  posts: AdminRecord[];
  initialStatus?: StatusFilter;
  heading?: string;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>(initialStatus);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (status !== "all" && post.status !== status) return false;
      if (!needle) return true;
      return `${post.title} ${post.path} ${post.slug}`.toLowerCase().includes(needle);
    });
  }, [posts, query, status]);

  return (
    <div className="mt-4">
      {heading ? <h3 className="font-serif text-xl text-cream">{heading}</h3> : null}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts by title or slug"
          aria-label="Search posts"
          className="text-cream sm:max-w-sm"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as StatusFilter)}
          aria-label="Filter by status"
          className="min-h-11 rounded-md border border-input bg-transparent px-3 text-sm text-cream"
        >
          <option value="all" className="bg-background">
            All statuses
          </option>
          {PUBLISH_STATUSES.map((value) => (
            <option key={value} value={value} className="bg-background">
              {value === "in_review" ? "In review" : value[0].toUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
        <p className="text-xs text-cream/50">
          {filtered.length} of {posts.length}
        </p>
      </div>
      {!filtered.length ? (
        <p className="mt-4 text-sm text-cream/55">No posts match that search.</p>
      ) : (
        <ul className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-card">
          {filtered.map((record) => (
            <li
              key={record.slug}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium text-cream">{record.title}</p>
                <p className="mt-1 text-xs text-cream/50">{record.path}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <AdminStatusBadge status={record.status} />
                <Button asChild variant="outline" size="sm" className="min-h-10">
                  <Link href={editHref(record)}>Edit</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="min-h-10">
                  <Link href={record.path}>View</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
