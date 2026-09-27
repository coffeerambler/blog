import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { rewriteInternalPath } from "@/lib/content";
import { segmentMarkdownGalleries, type GalleryItem } from "@/lib/post-body";
import { cn } from "@/lib/utils";

const components: Components = {
  a({ href, children }) {
    const next = href ? rewriteInternalPath(href) : href;
    const external = Boolean(next && /^https?:\/\//.test(next));
    return (
      <a
        href={next}
        className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    if (!src) return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        className="my-6 w-full rounded-lg border border-white/10 object-cover"
      />
    );
  },
  h1({ children }) {
    return <h1 className="font-serif text-3xl text-cream sm:text-4xl">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="mt-10 font-serif text-2xl text-cream">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="mt-8 font-serif text-xl text-cream">{children}</h3>;
  },
  p({ children }) {
    return <p className="text-pretty leading-7 text-cream/85">{children}</p>;
  },
  ul({ children }) {
    return <ul className="list-disc space-y-2 pl-5 text-cream/85">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal space-y-2 pl-5 text-cream/85">{children}</ol>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-amber pl-4 text-cream/80 italic">
        {children}
      </blockquote>
    );
  },
};

export function MarkdownBody({ markdown }: { markdown: string }) {
  const cleaned = markdown.replace(/\n​\n/g, "\n\n").replace(/^​$/gm, "");
  return (
    <div className="prose-rambler space-y-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {cleaned}
      </ReactMarkdown>
    </div>
  );
}

function GalleryCaption({ markdown }: { markdown: string }) {
  return (
    <figcaption className="mt-2 text-center text-sm leading-5 text-cream/55">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            return <span>{children}</span>;
          },
          a: components.a,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </figcaption>
  );
}

function ArticleGallery({ items }: { items: GalleryItem[] }) {
  const cols = items.length === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2";
  return (
    <div
      data-article-gallery=""
      className={cn("my-8 grid gap-3", cols)}
    >
      {items.map((item) => (
        <figure key={`${item.src}-${item.alt}`} className="min-w-0">
          <Image
            src={item.src}
            alt={item.alt || ""}
            width={800}
            height={600}
            sizes="(max-width: 640px) 100vw, 50vw"
            quality={70}
            className="aspect-[4/3] h-auto w-full rounded-lg border border-white/10 object-cover"
          />
          {item.caption ? <GalleryCaption markdown={item.caption} /> : null}
        </figure>
      ))}
    </div>
  );
}

/** Post-template markdown: clustered images become a gallery, copy is unchanged. */
export function MarkdownWithGalleries({ markdown }: { markdown: string }) {
  if (!markdown?.trim()) return null;
  const segments = segmentMarkdownGalleries(markdown);
  return (
    <>
      {segments.map((segment, index) =>
        segment.type === "gallery" ? (
          <ArticleGallery key={`gallery-${index}`} items={segment.items} />
        ) : (
          <MarkdownBody key={`md-${index}`} markdown={segment.text} />
        ),
      )}
    </>
  );
}
