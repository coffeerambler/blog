import fs from "node:fs";
import path from "node:path";
import type { CountryGuideEditorial } from "@/data/country-guides/types";
import { applyLocalEditorial, applyLocalStatus } from "@/lib/local-publish";
import { isApproved, publishStatus, type PublishStatus } from "@/lib/publish";

export type ContentImage = {
  wix: string;
  local: string;
  alt?: string;
};

export type Post = {
  type: "post";
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  datetime?: string;
  author: string;
  minutes?: number | null;
  categories: string[];
  categoryIds?: string[];
  coverImage?: string | null;
  excerpt?: string;
  body: string;
  images: ContentImage[];
  internalLinks?: string[];
  seoTitle?: string;
  seoDescription?: string;
  draft?: boolean;
  status?: PublishStatus;
  generatedBy?: "agent" | "import";
  approvedAt?: string;
};

export type SitePage = {
  type: string;
  slug: string;
  path: string;
  title: string;
  description: string;
  date?: string;
  body: string;
  images: ContentImage[];
  internalLinks?: string[];
  seoTitle?: string;
  seoDescription?: string;
  draft?: boolean;
  status?: PublishStatus;
  generatedBy?: "agent" | "import";
  approvedAt?: string;
  guide?: CountryGuideEditorial;
};

export type ContentScope = "live" | "all";

export type Category = {
  slug: string;
  path: string;
  title: string;
  description?: string;
};

const ROOT = path.join(process.cwd(), "content");

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export function loadPosts(scope: ContentScope = "live"): Post[] {
  const dir = path.join(ROOT, "posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) =>
      applyLocalStatus(applyLocalEditorial(JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Post)),
    )
    .filter((p) => scope === "all" || isApproved(p))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function loadPost(slug: string, scope: ContentScope = "live"): Post | null {
  const file = path.join(ROOT, "posts", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const post = applyLocalStatus(
    applyLocalEditorial(JSON.parse(fs.readFileSync(file, "utf8")) as Post),
  );
  if (scope === "live" && !isApproved(post)) return null;
  return post;
}

export function loadPages(scope: ContentScope = "live"): SitePage[] {
  const dir = path.join(ROOT, "pages");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) =>
      applyLocalStatus(applyLocalEditorial(JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as SitePage)),
    )
    .filter((p) => scope === "all" || isApproved(p));
}

export function loadPageByPath(pathname: string, scope: ContentScope = "live"): SitePage | null {
  const pages = loadPages(scope);
  return pages.find((p) => p.path === pathname) || null;
}

export function pageFileSlug(slug: string) {
  return slug.replaceAll("/", "--");
}

export function readPageFile(slug: string): SitePage | null {
  const file = path.join(ROOT, "pages", `${pageFileSlug(slug)}.json`);
  if (!fs.existsSync(file)) return null;
  return applyLocalStatus(
    applyLocalEditorial(JSON.parse(fs.readFileSync(file, "utf8")) as SitePage),
  );
}

export function loadPageBySlug(slug: string, scope: ContentScope = "live"): SitePage | null {
  const page = readPageFile(slug);
  if (!page) return null;
  if (scope === "live" && !isApproved(page)) return null;
  return page;
}

export { isApproved, publishStatus };
export type { PublishStatus };

export function loadCategories(): Category[] {
  const fromFile = readJson<Category[]>(path.join(ROOT, "categories.json"), []);
  if (fromFile.length && fromFile[0]?.slug) return fromFile;
  return [
    { slug: "about-coffee-1", path: "/archive/categories/about-coffee-1", title: "About Coffee" },
    { slug: "brewing-basics", path: "/archive/categories/brewing-basics", title: "Brewing Basics" },
    { slug: "sensory", path: "/archive/categories/sensory", title: "Sensory" },
    { slug: "coffee-production", path: "/archive/categories/coffee-production", title: "Coffee Production" },
    { slug: "recipes", path: "/archive/categories/recipes", title: "Recipes" },
    { slug: "city-guides", path: "/archive/categories/city-guides", title: "City Guides" },
  ];
}

export function postsInCategory(slug: string): Post[] {
  const page = loadPageByPath(`/archive/categories/${slug}`);
  const posts = loadPosts();
  const links = new Set(
    (page?.internalLinks || [])
      .map((href) => href.replace(/^https?:\/\/www\.coffeerambler\.com/, ""))
      .map(rewriteInternalPath)
      .filter((href) => href.startsWith("/post/"))
      .map((href) => href.slice("/post/".length)),
  );
  const overridden = new Set(
    posts.filter((p) => Array.isArray(p.categories) && p.categories.length > 0).map((p) => p.slug),
  );
  const explicit = posts.filter((p) => p.categories?.includes(slug));
  let inherited: Post[] = [];
  if (links.size) {
    inherited = posts.filter((p) => links.has(p.slug) && !overridden.has(p.slug));
  } else {
    const body = page?.body || "";
    inherited = posts.filter(
      (p) => !overridden.has(p.slug) && (body.includes(p.slug) || body.includes(p.title)),
    );
  }
  const bySlug = new Map<string, Post>();
  for (const post of [...inherited, ...explicit]) bySlug.set(post.slug, post);
  return [...bySlug.values()].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

/** Prefer a specific topic when a Wix post sits in more than one pill. */
const TOPIC_SPECIFICITY = [
  "city-guides",
  "coffee-production",
  "brewing-basics",
  "sensory",
  "recipes",
  "about-coffee-1",
];

/** Last-resort bucket when Wix category pages do not mention the post. */
export function guessArchiveTopicSlug(post: Post): string {
  const hay = `${post.slug} ${post.title}`.toLowerCase();
  if (/city-caf|coffee-in-(london|bristol|tokyo|beijing|wuhan)/.test(hay)) return "city-guides";
  if (/\b(pancake|tiramisu|cheesecake|yerba-mate|arabic-coffee)\b/.test(hay)) return "recipes";
  if (/process|variet|geisha|instant-coffee|pest|species/.test(hay)) return "coffee-production";
  if (/brew|v60|aeropress|espresso|grind|water|milk|cold-brew|peak-water/.test(hay)) return "brewing-basics";
  if (/taste|tasting|flavour|flavor|sensory|covid|compound/.test(hay)) return "sensory";
  return "about-coffee-1";
}

export type TopicGroup = {
  topic: Category;
  posts: Post[];
};

/** One primary topic per post, newest first. Leftovers go to About Coffee or Other. */
export function groupPostsByTopic(posts: Post[]): TopicGroup[] {
  const categories = loadCategories();
  const members = new Map<string, Set<string>>();
  for (const cat of categories) {
    members.set(cat.slug, new Set(postsInCategory(cat.slug).map((p) => p.slug)));
  }

  const buckets = new Map<string, Post[]>();
  for (const cat of categories) buckets.set(cat.slug, []);
  const other: Post[] = [];

  for (const post of posts) {
    const explicit = (post.categories || []).find((slug) => buckets.has(slug));
    const fromWix = TOPIC_SPECIFICITY.find((slug) => members.get(slug)?.has(post.slug));
    const slug = explicit || fromWix || guessArchiveTopicSlug(post);
    const bucket = buckets.get(slug);
    if (bucket) bucket.push(post);
    else other.push(post);
  }

  const groups: TopicGroup[] = [];
  for (const cat of categories) {
    const list = buckets.get(cat.slug) || [];
    list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (list.length) groups.push({ topic: cat, posts: list });
  }
  if (other.length) {
    other.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    groups.push({
      topic: { slug: "other", path: "/archive#other", title: "Other" },
      posts: other,
    });
  }
  return groups;
}

export const RETIRED_CONTINENT_PATHS = [
  "/africa",
  "/asia",
  "/central-america",
  "/south-america",
] as const;

const RETIRED_CONTINENT_SET = new Set<string>(RETIRED_CONTINENT_PATHS);

export function rewriteInternalPath(href: string): string {
  if (!href) return href;
  let raw = href;
  if (/^https?:\/\/(www\.)?coffeerambler\.com(\/|$)/i.test(href)) {
    try {
      const url = new URL(href);
      raw = `${url.pathname}${url.search}`;
    } catch {
      /* keep href */
    }
  }
  const [pathname, search] = raw.split("?");
  const suffix = search ? `?${search}` : "";
  const clean = pathname.replace(/\/$/, "") || "/";
  if (RETIRED_CONTINENT_SET.has(clean)) return `/world-coffee-guide${suffix}`;
  if (pathname.startsWith("/post/")) return pathname + suffix;
  if (pathname.startsWith("/archive/categories/")) return pathname + suffix;
  if (pathname.startsWith("/archive/hashtags/")) return "/archive" + suffix;
  if (pathname === "/single-post/coffee-brewing-tips") {
    return `/post/coffee-brewing-tips-simple-ways-to-improve-your-brew${suffix}`;
  }
  const archivePost = pathname.match(/^\/archive\/([^/]+)$/);
  if (archivePost) {
    const slug = archivePost[1];
    if (fs.existsSync(path.join(ROOT, "posts", `${slug}.json`))) {
      return `/post/${slug}${suffix}`;
    }
  }
  const single = pathname.match(/^\/single-post\/\d{4}\/\d{2}\/\d{2}\/(.+)$/);
  if (single) {
    const guess = single[1]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    if (fs.existsSync(path.join(ROOT, "posts", `${guess}.json`))) {
      return `/post/${guess}${suffix}`;
    }
  }
  return pathname + suffix;
}

export function brewGuides(): SitePage[] {
  return loadPages()
    .filter((p) => p.type === "brew-guide")
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function countryPages(): SitePage[] {
  return loadPages().filter((p) => p.type === "country");
}

function isLogoTitle(value?: string | null) {
  const t = (value || "").replace(/\s+/g, " ").trim();
  if (!t) return true;
  return /^(coffee rambler|home)$/i.test(t);
}

const TITLE_FALLBACK: Record<string, string> = {
  "/": "Find, share and enjoy better coffee",
  "/about": "About",
  "/privacy": "Privacy and cookies",
  "/archive": "Make Better Coffee | Archive",
  "/brewing-guides": "Home Brewing Guides",
  "/world-coffee-guide": "World Coffee Guide",
  "/french-press": "French Press | Brew Guides",
  "/aeropress": "Aeropress | Brew Guides",
  "/chemex": "Chemex | Brew Guides",
  "/clever-cup": "Clever Cup | Brew Guides",
  "/syphon": "Syphon | Brew Guides",
  "/moka-pot": "Moka Pot | Brew Guides",
  "/pour-over-filter": "Pour Over Filters | Brew Guides",
  "/immersion-cold-brew": "Immersion Cold Brew | Brew Guides",
  "/cupping": "Cupping | Brew Guides",
  "/africa": "Africa | World Coffee Guide",
  "/asia": "Asia | World Coffee Guide",
  "/central-america": "Central America | World Coffee Guide",
  "/south-america": "South America | World Coffee Guide",
  "/country-guide-china": "China | World Coffee Guide",
  "/country-guide-colombia": "Colombia | World Coffee Guide",
  "/country-guide-ethiopia": "Ethiopia | World Coffee Guide",
  "/country-guide-costarica": "Costa Rica | World Coffee Guide",
  "/country-guide-elsalvador": "El Salvador | World Coffee Guide",
  "/country-guide-kenya": "Kenya | World Coffee Guide",
  "/country-guide-bolivia": "Bolivia | World Coffee Guide",
  "/country-guide-indonesia": "Indonesia | World Coffee Guide",
  "/country-guide-brazil": "Brazil | World Coffee Guide",
  "/country-guide-papuanewguinea": "Papua New Guinea | World Coffee Guide",
  "/country-guide-taiwan": "Taiwan | World Coffee Guide",
  "/country-guide-guatemala": "Guatemala | World Coffee Guide",
  "/country-guide-rwanda": "Rwanda | World Coffee Guide",
  "/country-guide-burundi": "Burundi | World Coffee Guide",
  "/country-guide-ecuador": "Ecuador | World Coffee Guide",
  "/country-guide-vietnam": "Vietnam | World Coffee Guide",
  "/country-guide-uganda": "Uganda | World Coffee Guide",
  "/country-guide-mexico": "Mexico | World Coffee Guide",
  "/country-guides-1": "World Coffee Guide",
  "/archive/categories/about-coffee-1": "About Coffee",
  "/archive/categories/brewing-basics": "Brewing Basics",
  "/archive/categories/sensory": "Sensory",
  "/archive/categories/coffee-production": "Coffee Production",
  "/archive/categories/recipes": "Recipes",
  "/archive/categories/city-guides": "City Guides",
};

export function displayTitle(page: {
  title: string;
  path: string;
  seoTitle?: string;
  description?: string;
  body?: string;
}): string {
  const candidates = [page.title, page.seoTitle, TITLE_FALLBACK[page.path]];
  for (const raw of candidates) {
    if (!raw) continue;
    const cleaned = raw.replace(/\s*\|\s*Coffee Rambler.*$/i, "").trim();
    if (!isLogoTitle(cleaned)) return cleaned;
  }
  const heading = page.body?.match(/^#\s+(.+)$/m)?.[1]?.replace(/\s+/g, " ").trim();
  if (heading && !isLogoTitle(heading)) return heading;
  return TITLE_FALLBACK[page.path] || page.title;
}

export function documentTitle(page: {
  title: string;
  path: string;
  seoTitle?: string;
  body?: string;
}): string {
  const seo = (page.seoTitle || "").trim();
  const seoCore = seo.replace(/\s*\|\s*Coffee Rambler.*$/i, "").trim();
  if (seo && !isLogoTitle(seoCore)) return seo;
  const visible = displayTitle(page);
  return /\| Coffee Rambler$/i.test(visible) ? visible : `${visible} | Coffee Rambler`;
}
