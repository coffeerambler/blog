"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AdminMarkdownPreview({ markdown }: { markdown: string }) {
  if (!markdown.trim()) {
    return <p className="text-sm text-cream/50">Nothing to preview yet.</p>;
  }
  return (
    <div className="prose-rambler space-y-4 text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            return (
              <a href={href} className="text-amber underline decoration-amber/40 underline-offset-4">
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
                className="my-4 w-full rounded-lg border border-white/10 object-cover"
              />
            );
          },
          h1({ children }) {
            return <h1 className="font-serif text-2xl text-cream">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="mt-6 font-serif text-xl text-cream">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="mt-4 font-serif text-lg text-cream">{children}</h3>;
          },
          p({ children }) {
            return <p className="leading-6 text-cream/85">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc space-y-1 pl-5 text-cream/85">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal space-y-1 pl-5 text-cream/85">{children}</ol>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
