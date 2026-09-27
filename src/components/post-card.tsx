import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-card">
      <Link href={post.path} className="block">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="flex h-48 items-end bg-gradient-to-br from-amber/30 to-background p-4">
            <span className="font-serif text-lg text-cream">{post.title}</span>
          </div>
        )}
        <div className="space-y-2 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-amber">
            {formatDate(post.date)}
            {post.minutes ? ` · ${post.minutes} min` : ""}
          </p>
          <h2 className="font-serif text-xl text-cream group-hover:text-amber">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-cream/70">
            {post.excerpt || post.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 px-6 py-16 text-center">
      <h2 className="font-serif text-2xl text-cream">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">{body}</p>
    </div>
  );
}
