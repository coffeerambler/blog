import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";

export function RelatedCategoryPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="mt-14 border-t border-white/10 pt-8">
      {posts.length ? (
        <>
          <h2 className="font-serif text-2xl text-cream">Other posts in this category</h2>
          <ul className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={post.path} className="group block">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      width={480}
                      height={320}
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="aspect-[3/2] w-full rounded-lg border border-white/10 object-cover"
                    />
                  ) : (
                    <span className="block aspect-[3/2] rounded-lg bg-gradient-to-br from-amber/30 to-background" />
                  )}
                  <span className="mt-2 block font-serif text-lg leading-snug text-cream group-hover:text-amber">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <p className={posts.length ? "mt-8" : undefined}>
        <Link href="/archive" className="inline-flex min-h-11 items-center text-amber hover:underline">
          Back to archive
        </Link>
      </p>
    </section>
  );
}
