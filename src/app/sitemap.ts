import type { MetadataRoute } from "next";
import { loadPages, loadPosts } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = loadPosts().map((post) => ({
    url: siteUrl(post.path),
    lastModified: post.date || undefined,
  }));
  const pages = loadPages()
    .filter((page) => page.type !== "region")
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
