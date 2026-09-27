import { loadPosts } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export function GET() {
  const posts = loadPosts();
  const items = posts
    .map(
      (post) => `  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl(post.path)}</link>
    <guid isPermaLink="true">${siteUrl(post.path)}</guid>
    <pubDate>${post.datetime ? new Date(post.datetime).toUTCString() : ""}</pubDate>
    <description><![CDATA[${post.excerpt || post.description || ""}]]></description>
  </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Coffee Rambler</title>
  <link>https://www.coffeerambler.com/archive</link>
  <description>coffeerambler</description>
${items}
</channel>
</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
