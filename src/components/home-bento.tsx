import type { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Post } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

const CHEMEX = "/images/675337_066f59671f3b4a92b61cb21d62577c8b~mv2.jpg";
const CUPS = "/images/675337_942531fd7b744f1a961704d870be1f0a~mv2.jpg";
const WORLD = "/images/675337_87f13b2039374f44a74f6156d7141986~mv2.jpg";
const WHEEL = "/images/675337_635b291743a84837a77127fe674c2dbb~mv2.png";

const tileClass =
  "group relative flex min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-card outline-none transition hover:border-amber/60 focus-visible:ring-2 focus-visible:ring-amber";

function TileOverlay({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/85 to-transparent p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TileImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding="async"
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}

export function HomeBento({ posts }: { posts: Post[] }) {
  const latest = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-cream sm:text-5xl">
          Find, share and enjoy better coffee
        </h1>
      </header>

      <div className="grid gap-4 lg:h-[min(82vh,880px)] lg:grid-cols-2 lg:grid-rows-3">
        <Link
          href="/brewing-guides"
          className={cn(tileClass, "min-h-[340px] lg:row-span-3 lg:min-h-0")}
        >
          <TileImage src={CHEMEX} alt="" className="object-[center_35%] bg-[#f4f4f4]" />
          <TileOverlay>
            <h2 className="font-serif text-3xl text-cream sm:text-4xl">Home Brewing Guides</h2>
          </TileOverlay>
        </Link>

        <Link href="/archive" className={cn(tileClass, "min-h-[240px]")}>
          <TileImage src={CUPS} alt="" className="object-[center_70%]" />
          <TileOverlay>
            <p className="text-xs uppercase tracking-[0.22em] text-amber">Latest posts</p>
            <h2 className="mt-1 font-serif text-2xl text-cream">Blog Archive</h2>
            {latest.length ? (
              <ul className="mt-3 space-y-1.5 text-sm text-cream/80">
                {latest.map((post) => (
                  <li key={post.slug} className="line-clamp-1">
                    <span className="text-amber/80">{formatDate(post.date)}</span>
                    <span className="text-cream/40"> · </span>
                    {post.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-cream/70">Posts from the archive.</p>
            )}
          </TileOverlay>
        </Link>

        <Link href="/world-coffee-guide" className={cn(tileClass, "min-h-[240px]")}>
          <TileImage src={WORLD} alt="" className="object-center" />
          <TileOverlay>
            <h2 className="font-serif text-2xl text-cream">World Coffee Guide</h2>
          </TileOverlay>
        </Link>

        <a href="https://rambler.coffee" className={cn(tileClass, "min-h-[260px] bg-[#0b0a08]")}>
          <TileImage src={WHEEL} alt="" className="object-[center_42%]" />
          <TileOverlay>
            <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler AI</p>
            <h2 className="mt-1 font-serif text-2xl text-cream">Gets smarter the more you brew</h2>
            <span
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-3 pointer-events-none bg-primary text-primary-foreground",
              )}
            >
              rambler.coffee
            </span>
          </TileOverlay>
        </a>
      </div>
    </div>
  );
}
