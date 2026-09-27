import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminNewPostForm } from "@/components/admin-new-post-form";
import { expectedAdminCookie } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  const store = await cookies();
  if (store.get("cr_admin")?.value !== expectedAdminCookie()) {
    redirect("/admin");
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm">
        <Link className="text-amber hover:underline" href="/admin">
          Back to admin
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-3xl text-cream">New post</h1>
      <p className="mt-3 text-sm text-cream/70">
        Title and slug only. It lands in Review until you write it, add a cover, and publish.
      </p>
      <AdminNewPostForm />
    </div>
  );
}
