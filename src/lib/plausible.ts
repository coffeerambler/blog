const DOMAIN = /^[a-z0-9.-]+\.[a-z]{2,}$/;

export function normalisePlausibleDomain(raw: string) {
  const value = raw.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!DOMAIN.test(value)) return "";
  return value;
}

export function plausibleDomain() {
  return normalisePlausibleDomain(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "");
}

/** Count on the deployed site only, so local reading does not land in the numbers. */
export function plausibleEnabled() {
  return process.env.NODE_ENV === "production" && plausibleDomain().length > 0;
}

export function plausibleEmbedSrc(raw: string | undefined) {
  const value = (raw ?? "").trim();
  if (!value) return { src: "", invalid: false };
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { src: "", invalid: true };
  }
  const host = url.hostname.toLowerCase();
  const allowed = host === "plausible.io" || host.endsWith(".plausible.io");
  if (url.protocol !== "https:" || !allowed) return { src: "", invalid: true };
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "dark");
  return { src: url.toString(), invalid: false };
}
