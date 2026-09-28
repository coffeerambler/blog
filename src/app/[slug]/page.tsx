import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CountryGuidePage } from "@/components/country-guide-page";
import { BrewGuidePage } from "@/components/brew-guide-page";
import { ImportedPage } from "@/components/imported-page";
import { UnpublishedBanner } from "@/components/unpublished-banner";
import { hasAdminSession } from "@/lib/admin";
import { documentTitle, loadPages, pageFileSlug, readPageFile } from "@/lib/content";
import { getCountryGuideBundle, isLiveCountryGuide, templatedCountrySlugs } from "@/lib/country-guides";
import { isApproved, publishStatus } from "@/lib/publish";
import { siteUrl } from "@/lib/utils";

const RESERVED = new Set([
  "post",
  "archive",
  "brewing-guides",
  "world-coffee-guide",
  "harvest-calendar",
  "about",
  "privacy",
  "admin",
  "api",
  "api",
  "blog-feed.xml",
  "robots.txt",
  "sitemap.xml",
]);

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const page of loadPages()) {
    if (!page.slug || RESERVED.has(page.slug) || page.path === "/") continue;
    if (page.type === "region") continue;
    if (page.path.split("/").filter(Boolean).length !== 1) continue;
    slugs.add(page.slug);
  }
  for (const slug of templatedCountrySlugs()) {
    if (isLiveCountryGuide(slug)) slugs.add(slug);
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  if (RESERVED.has(decoded)) notFound();
  const admin = await hasAdminSession();
  const page = readPageFile(decoded);
  const bundle = getCountryGuideBundle(decoded);
  if (!page && !bundle) return { title: "Not found" };
  const record = page || { slug: decoded };
  if (!isApproved(record) && !admin) return { title: "Not found", robots: { index: false } };
  if (bundle) {
    return {
      title: {
        absolute: page
          ? documentTitle(page)
          : `${bundle.guide.name} | World Coffee Guide | Coffee Rambler`,
      },
      description: page?.seoDescription || page?.description || bundle.guide.lede,
      alternates: { canonical: siteUrl(bundle.guide.path) },
    };
  }
  return {
    title: { absolute: documentTitle(page!) },
    description: page!.seoDescription || page!.description,
    alternates: { canonical: siteUrl(page!.path) },
  };
}

export default async function RootSlugPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  if (RESERVED.has(decoded)) notFound();
  const admin = await hasAdminSession();
  const page = readPageFile(decoded);
  const bundle = getCountryGuideBundle(decoded);
  if (!page && !bundle) notFound();
  const record = page || { slug: decoded, path: `/${decoded}` };
  const status = publishStatus(record);
  if (status !== "approved" && !admin) notFound();

  const banner =
    admin && status !== "approved" ? (
      <UnpublishedBanner
        status={status}
        kind="page"
        slug={pageFileSlug(page?.slug || decoded)}
        editHref={`/admin/edit/page/${encodeURIComponent(pageFileSlug(page?.slug || decoded))}`}
      />
    ) : null;

  if (bundle) {
    return (
      <>
        {banner}
        <CountryGuidePage
          guide={bundle.guide}
          country={bundle.country}
          regions={bundle.regions}
          mapSource={bundle.mapSource}
        />
      </>
    );
  }
  if (!page) notFound();
  if (page.type === "region") notFound();
  if (page.type === "brew-guide") {
    return (
      <>
        {banner}
        <BrewGuidePage page={page} />
      </>
    );
  }
  return (
    <>
      {banner}
      <ImportedPage page={page} />
    </>
  );
}
