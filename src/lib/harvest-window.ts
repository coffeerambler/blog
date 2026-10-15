import { MONTH_NAMES } from "@/lib/coffee-harvest-seasons";

/** Collapse month numbers into ranges, including seasons that wrap past December. */
export function formatMonthWindow(months: number[]): string {
  const unique = [...new Set(months)].filter((month) => month >= 1 && month <= 12).sort((a, b) => a - b);
  if (unique.length === 0) return "";

  const ranges: [number, number][] = [];
  let start = unique[0];
  let end = unique[0];
  for (let i = 1; i < unique.length; i++) {
    if (unique[i] === end + 1) {
      end = unique[i];
      continue;
    }
    ranges.push([start, end]);
    start = unique[i];
    end = unique[i];
  }
  ranges.push([start, end]);

  if (ranges.length > 1 && ranges[0][0] === 1 && ranges[ranges.length - 1][1] === 12) {
    const opening = ranges.shift();
    const closing = ranges.pop();
    if (opening && closing) ranges.push([closing[0], opening[1]]);
  }

  const label = (month: number) => MONTH_NAMES[month - 1];
  const parts = ranges.map(([from, to]) => (from === to ? label(from) : `${label(from)}–${label(to)}`));
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}
