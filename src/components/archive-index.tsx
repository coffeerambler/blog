import Image from "next/image";
import Link from "next/link";
import { groupPostsByTopic, type Post } from "@/lib/content";
import { formatDate, postYear } from "@/lib/utils";

function dek(post: Post) {
  return (post.description || post.excerpt || "").replace(/\s+/g, " ").trim();
}

export function groupPostsByYear(posts: Post[]) {
  const years: { year: string; posts: Post[] }[] = [];
  const index = new Map<string, Post[]>();
  for (const post of posts) {
    const year = postYear(post.date) || "Undated";
    let bucket = index.get(year);
    if (!bucket) {
      bucket = [];
      index.set(year, bucket);
      years.push({ year, posts: bucket });
    }
    bucket.push(post);
  }
  years.sort((a, b) => Number(b.year) - Number(a.year) || b.year.localeCompare(a.year));
  return years;
}

export function ArchiveFeaturedPost({ post }: { post: Post }) {
  const summary = dek(post);
  return (
    <article>
      <Link
        href={post.path}
        className="group grid gap-6 overflow-hidden rounded-xl border border-white/10 bg-card sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            decoding="async"
            className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto sm:min-h-[220px]"
          />
        ) : (
          <div className="min-h-[180px] bg-gradient-to-br from-amber/30 to-background" />
        )}
        <div className="flex flex-col justify-center px-5 py-5 sm:py-8 sm:pr-8">
          <p className="text-xs uppercase tracking-[0.18em] text-amber">{formatDate(post.date)}</p>
          <h2 className="mt-2 font-serif text-3xl text-cream transition-colors group-hover:text-amber sm:text-4xl">{post.title}</h2>
          {summary ? <p className="mt-3 max-w-xl text-sm leading-6 text-cream/70">{summary}</p> : null}
        </div>
      </Link>
    </article>
  );
}

function CoverThumb({ src }: { src?: string | null }) {
  if (!src) {
    return <span className="size-14 shrink-0 rounded-md bg-gradient-to-br from-amber/30 to-background" />;
  }
  return (
    <Image
      src={src}
      alt=""
      width={56}
      height={56}
      sizes="56px"
      quality={60}
      className="size-14 shrink-0 rounded-md border border-white/10 object-cover"
    />
  );
}

function ArchivePostRows({ posts }: { posts: Post[] }) {
  return (
    <ul className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
      {posts.map((post) => {
        const summary = dek(post);
        const dated = formatDate(post.date);
        return (
          <li key={post.slug}>
            <Link
              href={post.path}
              className="group grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-3"
            >
              <CoverThumb src={post.coverImage} />
              <span className="min-w-0">
                <span className="font-serif text-lg leading-snug text-cream group-hover:text-amber">
                  {post.title}
                </span>
                {summary ? (
                  <span className="mt-1 block truncate text-sm text-cream/55">{summary}</span>
                ) : null}
                {dated ? (
                  <time dateTime={post.date} className="mt-1 block text-xs tabular-nums text-amber/80">
                    {dated}
                  </time>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ArchiveYearList({ posts }: { posts: Post[] }) {
  const years = groupPostsByYear(posts);
  if (!years.length) return null;
  return (
    <div className="space-y-12">
      {years.map(({ year, posts: entries }) => (
        <section key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="font-serif text-2xl text-cream">
            {year}
          </h2>
          <ArchivePostRows posts={entries} />
        </section>
      ))}
    </div>
  );
}

export function ArchiveTopicList({ posts }: { posts: Post[] }) {
  const groups = groupPostsByTopic(posts);
  if (!groups.length) return null;
  return (
    <div className="space-y-12">
      {groups.map(({ topic, posts: entries }) => (
        <section key={topic.slug} aria-labelledby={`topic-${topic.slug}`}>
          <h2 id={`topic-${topic.slug}`} className="font-serif text-2xl text-cream">
            {topic.title}
          </h2>
          <ArchivePostRows posts={entries} />
        </section>
      ))}
    </div>
  );
}
