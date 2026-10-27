import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  expireTime: 0,
  // Next's N overlay + SwiftShader in Try Live was crashing the compositor (Aw, Snap).
  devIndicators: false,
  async redirects() {
    return [
      { source: "/signup", destination: "https://rambler.coffee/signup", permanent: false },
      {
        source: "/post/advanced-brewing-presentation-with-barista-hustle-something-to-think-about",
        destination: "/archive",
        statusCode: 301,
      },
      {
        source: "/archive/advanced-brewing-presentation-with-barista-hustle-something-to-think-about",
        destination: "/archive",
        statusCode: 301,
      },
      {
        source: "/archive/hashtags/:tag",
        destination: "/archive",
        statusCode: 301,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        statusCode: 301,
      },
      {
        source: "/cookie-policy",
        destination: "/privacy",
        statusCode: 301,
      },
      { source: "/country-guides-1", destination: "/world-coffee-guide", statusCode: 301 },
      { source: "/africa", destination: "/world-coffee-guide", statusCode: 301 },
      { source: "/asia", destination: "/world-coffee-guide", statusCode: 301 },
      { source: "/central-america", destination: "/world-coffee-guide", statusCode: 301 },
      { source: "/south-america", destination: "/world-coffee-guide", statusCode: 301 },
      // Legacy Wix / feed aliases — keep old bookmarks and subscribers on the new site.
      { source: "/blog", destination: "/archive", statusCode: 301 },
      { source: "/feed.xml", destination: "/blog-feed.xml", statusCode: 301 },
      { source: "/rss.xml", destination: "/blog-feed.xml", statusCode: 301 },
      {
        source: "/single-post/coffee-brewing-tips",
        destination: "/post/coffee-brewing-tips-simple-ways-to-improve-your-brew",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
