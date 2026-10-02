import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminCountryGuideEditor } from "@/components/admin-country-guide-editor";
import { AdminEditor } from "@/components/admin-editor";
import { AdminPostEditor } from "@/components/admin-post-editor";
import { requireAdmin } from "@/lib/admin-guard";
import { loadCategories, loadPost, pageFileSlug, readPageFile } from "@/lib/content";
import { getCountryGuideBundle, isTemplatedCountryGuide } from "@/lib/country-guides";
import { publishStatus } from "@/lib/publish";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ kind: string; slug: string }> };

export default async function AdminEditPage({ params }: Props) {
  await requireAdmin();
  const { kind, slug } = await params;
  if (kind !== "post" && kind !== "page") notFound();
  const decoded = decodeURIComponent(slug);

  if (kind === "post") {
    const record = loadPost(decoded, "all");
    if (!record) notFound();
    const topics = loadCategories();
    const category =
      (record.categories || []).find((slug) => topics.some((topic) => topic.slug === slug)) || "";
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm">
          <Link className="text-amber hover:underline" href="/admin/posts">
            Back to posts
          </Link>
        </p>
        <h1 className="mt-4 font-serif text-3xl text-cream">Edit post</h1>
        <AdminPostEditor
          slug={record.slug}
          title={record.title}
          seoTitle={record.seoTitle || record.title}
          description={record.description}
          date={record.date}
          markdown={record.body}
          status={publishStatus(record)}
          coverImage={record.coverImage || ""}
          category={category}
          topics={topics}
          viewHref={record.path}
        />
      </div>
    );
  }

  const record = readPageFile(decoded) || readPageFile(decoded.replaceAll("--", "/"));
  if (!record) notFound();
  const fileSlug = pageFileSlug(record.slug);
  const bundle = isTemplatedCountryGuide(record.slug) ? getCountryGuideBundle(record.slug) : null;

  const backHref = bundle ? "/admin/guides" : "/admin/pages";
  const backLabel = bundle ? "Back to country guides" : "Back to pages";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="text-sm">
        <Link className="text-amber hover:underline" href={backHref}>
          {backLabel}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-3xl text-cream">
        {bundle ? `Review ${bundle.guide.name}` : "Edit page"}
      </h1>
      {bundle ? (
        <AdminCountryGuideEditor
          slug={fileSlug}
          title={record.title}
          description={record.description}
          date={record.date || ""}
          status={publishStatus(record)}
          guide={bundle.guide}
          viewHref={record.path}
        />
      ) : (
        <AdminEditor
          kind="page"
          slug={fileSlug}
          title={record.title}
          description={record.description}
          date={record.date || ""}
          markdown={record.body}
          status={publishStatus(record)}
          viewHref={record.path}
        />
      )}
    </div>
  );
}
