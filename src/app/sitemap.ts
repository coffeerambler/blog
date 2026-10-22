import type { MetadataRoute } from "next";
import { loadPages, loadPosts } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await loadPosts()).map((post) => ({
    url: siteUrl(post.path),
    lastModified: post.date || undefined,
  }));
  const pages = (await loadPages())
    .filter((page) => page.type !== "region" && page.path !== "/country-guides-1")
    .map((page) => ({
      url: siteUrl(page.path),
      lastModified: page.date || undefined,
    }));
  return [
    ...pages,
    ...posts,
    { url: siteUrl("/privacy") },
    { url: siteUrl("/harvest-calendar") },
  ];
}
