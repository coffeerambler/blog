/** Public origin used in share captions. The live domain still serves Wix until DNS moves. */
export const PUBLIC_SITE = "https://www.coffeerambler.com";

export function publicPostUrl(path: string) {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${PUBLIC_SITE}${normalised}`;
}

export function defaultShareCaption(title: string, url: string, summary = "") {
  const heading = title.trim() || "Coffee Rambler";
  const brief = summary.replace(/\s+/g, " ").trim();
  if (!brief) return `${heading}\n${url}`;
  return `${heading}\n\n${brief}\n\n${url}`;
}

export type ShareWindow = {
  name: "X" | "Facebook" | "LinkedIn";
  href: string;
};

/** Opens the network's own share window. These URLs do not post by themselves. */
export function shareWindows(caption: string, url: string): ShareWindow[] {
  const text = caption.trim() || url;
  return [
    {
      name: "X",
      href: `https://x.com/intent/tweet?${new URLSearchParams({ text }).toString()}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({
        u: url,
        quote: text,
      }).toString()}`,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url }).toString()}`,
    },
  ];
}
