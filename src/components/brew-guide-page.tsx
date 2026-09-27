import Link from "next/link";
import { MarkdownBody } from "@/lib/markdown";
import { parseBrewGuide } from "@/lib/parse-brew-guide";
import type { SitePage } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function BrewImage({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) {
  const wheel = /grind size wheel/i.test(alt);
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className={cn(
        "mx-auto rounded-xl border border-white/10 object-contain",
        wheel ? "max-h-[28rem] w-auto max-w-full" : "max-h-[22rem] w-auto max-w-full",
      )}
    />
  );
  if (!href) return <figure className="py-2">{img}</figure>;
  return (
    <figure className="py-2">
      <Link href={href} className="block">
        {img}
      </Link>
    </figure>
  );
}

export function BrewGuidePage({ page }: { page: SitePage }) {
  const blocks = parseBrewGuide(page.body);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {blocks.map((block, index) => {
        if (block.type === "h1") {
          return (
            <header key={index} className="mb-8">
              <p className="text-xs uppercase tracking-[0.22em] text-amber">Brewing Guides</p>
              <h1 className="mt-2 font-serif text-4xl text-cream sm:text-5xl">{block.text}</h1>
            </header>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={index} className="mt-12 font-serif text-2xl text-cream sm:text-3xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === "rich") {
          return (
            <div key={index} className="mt-4">
              <MarkdownBody markdown={block.markdown} />
            </div>
          );
        }
        if (block.type === "image") {
          return (
            <BrewImage
              key={index}
              src={block.image.src}
              alt={block.image.alt}
              href={block.image.href}
            />
          );
        }
        if (block.type === "specs") {
          return (
            <dl
              key={index}
              className="my-8 grid gap-3 rounded-2xl border border-white/10 bg-card p-4 sm:grid-cols-3"
            >
              {block.items.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-amber">{item.label}</dt>
                  <dd className="mt-1 font-serif text-xl text-cream">{item.value}</dd>
                </div>
              ))}
            </dl>
          );
        }
        if (block.type === "need") {
          return (
            <section key={index} className="my-8">
              <h2 className="font-serif text-2xl text-cream">You&apos;ll need...</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-card px-3 py-2 text-cream/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        if (block.type === "steps") {
          return (
            <ol key={index} className="mt-10 space-y-6">
              {block.steps.map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-white/10 bg-card p-5 sm:p-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber font-serif text-lg text-background">
                      {step.n}
                    </span>
                    <h2 className="font-serif text-2xl text-cream">{step.title}</h2>
                  </div>
                  {step.markdown ? (
                    <div className="mt-4">
                      <MarkdownBody markdown={step.markdown} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={index} className="mt-12">
            <Link href={block.href} className={cn(buttonVariants(), "bg-primary text-primary-foreground")}>
              {block.text}
            </Link>
          </p>
        );
      })}
    </article>
  );
}
