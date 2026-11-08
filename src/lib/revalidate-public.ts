import { revalidatePath } from "next/cache";

/** Drop saved public copies after a publish, edit, or delete. */
export function revalidatePublic(pagePath?: string) {
  if (pagePath) revalidatePath(pagePath);
  revalidatePath("/", "layout");
  revalidatePath("/blog-feed.xml");
  revalidatePath("/sitemap.xml");
}
