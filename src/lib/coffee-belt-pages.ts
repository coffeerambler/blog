import { ORIGIN_COUNTRIES, type CountryGuideLink } from "@/lib/coffee-belt";
import { isTemplatedCountryGuide, isLiveCountryGuide } from "@/lib/country-guides";
import { loadPages, type SitePage } from "@/lib/content";

export function originCountryGuides(): CountryGuideLink[] {
  const pages = loadPages().filter(
    (page) => page.type === "country" && page.path !== "/country-guides-1",
  );
  const links: CountryGuideLink[] = [];
  for (const country of ORIGIN_COUNTRIES) {
    const page = pages.find((candidate) => countryPageMatches(candidate, country.name, country.code));
    if (page) {
      links.push({ name: country.name, href: page.path, numericCode: country.numericCode });
      continue;
    }
    const slug = `country-guide-${country.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;
    if (isTemplatedCountryGuide(slug) && isLiveCountryGuide(slug)) {
      links.push({ name: country.name, href: `/${slug}`, numericCode: country.numericCode });
    }
  }
  return links;
}

function countryPageMatches(page: SitePage, name: string, code: string): boolean {
  const slug = page.slug.replace(/^country-guides?-/, "").replace(/-/g, "");
  const codeSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (slug === codeSlug || slug === code.toLowerCase()) return true;
  const title = (page.title || "").replace(/\s*\|\s*World Coffee Guide.*$/i, "").trim();
  return title.toLowerCase() === name.toLowerCase();
}

