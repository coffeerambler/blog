export const AD_SLOT_NAMES = ["header", "article", "sidebar", "footer"] as const;
export type AdSlotName = (typeof AD_SLOT_NAMES)[number];

/** Publisher ID from NEXT_PUBLIC_ADSENSE_CLIENT. Empty or invalid → placeholders. */
export function adsenseClient(): string {
  // Static access so Next inlines NEXT_PUBLIC_* for client components.
  const raw = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();
  if (/^ca-pub-\d+$/.test(raw)) return raw;
  if (/^pub-\d+$/.test(raw)) return `ca-${raw}`;
  return "";
}

export function adsenseEnabled(): boolean {
  return adsenseClient().length > 0;
}

/** Optional numeric AdSense unit for a labelled slot. Empty if unset. */
export function adsenseSlotId(slot: AdSlotName): string {
  const bySlot: Record<AdSlotName, string> = {
    header: (process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER ?? "").trim(),
    article: (process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "").trim(),
    sidebar: (process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "").trim(),
    footer: (process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "").trim(),
  };
  const raw = bySlot[slot];
  if (!/^\d+$/.test(raw)) return "";
  return raw;
}

/** Optional Google Ads / gtag ID from NEXT_PUBLIC_GOOGLE_ADS_ID. */
export function googleAdsId(): string {
  const raw = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();
  if (!/^(AW|G|GT)-[A-Z0-9]+$/i.test(raw)) return "";
  return raw;
}

export function googleAdsEnabled(): boolean {
  return googleAdsId().length > 0;
}

/** GA4 measurement ID from NEXT_PUBLIC_GA_MEASUREMENT_ID. Empty if unset. */
export function gaMeasurementId(): string {
  const raw = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(raw)) return "";
  return raw;
}

export function gaEnabled(): boolean {
  return gaMeasurementId().length > 0;
}

/** Search Console HTML-tag code, the content value only. */
export function searchConsoleVerification(): string {
  const raw = (process.env.GOOGLE_SITE_VERIFICATION ?? "").trim();
  if (!/^[A-Za-z0-9_-]{8,200}$/.test(raw)) return "";
  return raw;
}
