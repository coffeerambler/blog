"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminMarkdownPreview } from "@/components/admin-markdown-preview";
import { AdminShareBox } from "@/components/admin-share-box";
import { AdminStatusSelect } from "@/components/admin-status-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postAdminSave } from "@/lib/admin-save";
import type { PublishStatus } from "@/lib/publish";

type ImageItem = { src: string; name: string };

function firstMarkdownImage(markdown: string) {
  const match = markdown.match(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  return match?.[1] || "";
}

export function AdminPostEditor(props: {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  markdown: string;
  status: PublishStatus;
  coverImage: string;
  category: string;
  topics: { slug: string; title: string }[];
  viewHref: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(props.title);
  const [seoTitle, setSeoTitle] = useState(props.seoTitle || props.title);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.date);
  const [status, setStatus] = useState(props.status);
  const [markdown, setMarkdown] = useState(props.markdown);
  const [coverImage, setCoverImage] = useState(props.coverImage);
  const [category, setCategory] = useState(props.category);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [images, setImages] = useState<ImageItem[] | null>(null);
  const [imageQuery, setImageQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const dirty = useMemo(() => {
    return (
      title !== props.title ||
      seoTitle !== (props.seoTitle || props.title) ||
      description !== props.description ||
      date !== props.date ||
      status !== props.status ||
      markdown !== props.markdown ||
      coverImage !== props.coverImage ||
      category !== props.category
    );
  }, [title, seoTitle, description, date, status, markdown, coverImage, category, props]);

  async function loadImages() {
    if (images) return;
    const res = await fetch("/api/admin/images", { credentials: "include", cache: "no-store" });
    const data = (await res.json()) as { images?: ImageItem[]; error?: string };
    if (!res.ok) throw new Error(data.error || "Could not list images.");
    setImages(data.images || []);
  }

  async function openPicker() {
    setMessage("");
    try {
      await loadImages();
      setPickerOpen(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not list images.");
    }
  }

  async function uploadFile(file: File) {
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/admin/images", {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const data = (await res.json()) as { src?: string; name?: string; error?: string };
    if (!res.ok || !data.src) throw new Error(data.error || "Upload failed.");
    setImages((current) => [{ src: data.src!, name: data.name || data.src! }, ...(current || [])]);
    return data.src;
  }

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setMessage("");
    try {
      const src = await uploadFile(file);
      setCoverImage(src);
      setPickerOpen(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  function insertImage(src: string) {
    setMarkdown((current) => `${current.trimEnd()}\n\n![](${src})\n`);
    if (!coverImage) setCoverImage(src);
  }

  async function save(nextStatus: PublishStatus) {
    const cover = coverImage || firstMarkdownImage(markdown);
    if (nextStatus === "approved" && !cover) {
      setMessage("Pick or upload a cover image before publishing.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await postAdminSave({
        kind: "post",
        slug: props.slug,
        title,
        seoTitle,
        description,
        date,
        markdown,
        status: nextStatus,
        coverImage: cover || null,
        categories: category ? [category] : [],
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
      setSaving(false);
      return;
    }
    setStatus(nextStatus);
    if (cover && !coverImage) setCoverImage(cover);
    setSaving(false);
    setMessage(
      nextStatus === "approved"
        ? "Approved. This is now live."
        : nextStatus === "draft"
          ? "Unpublished. The public URL is no longer live."
          : "Saved.",
    );
    router.refresh();
  }

  function viewOnSite() {
    if (dirty && !window.confirm("You have unsaved edits. Open the live page anyway?")) return;
    window.open(props.viewHref, "_blank", "noopener,noreferrer");
  }

  const visibleImages = (images || []).filter((item) => {
    if (!imageQuery.trim()) return true;
    return item.name.toLowerCase().includes(imageQuery.trim().toLowerCase());
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void save(status);
      }}
      className="mt-8 pb-24"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(event) => setTitle(event.target.value)} className="text-cream" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seoTitle">SEO title</Label>
          <Input
            id="seoTitle"
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            className="text-cream"
          />
          <p className="text-xs text-cream/50">Used in the tab title and search results. Can differ from the heading.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">SEO description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="text-cream"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" value={date} onChange={(event) => setDate(event.target.value)} className="text-cream" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <AdminStatusSelect value={status} onChange={setStatus} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Archive topic</Label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-cream"
            >
              <option value="" className="bg-background">
                Keep current archive grouping
              </option>
              {props.topics.map((topic) => (
                <option key={topic.slug} value={topic.slug} className="bg-background">
                  {topic.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Cover image</Label>
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt=""
              className="max-h-56 w-full rounded-xl border border-white/10 object-cover"
            />
          ) : (
            <p className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-sm text-cream/50">
              No cover yet. Pick one from the library or upload.
            </p>
          )}
          <p className="truncate text-xs text-cream/50">{coverImage || "coverImage is empty"}</p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => void openPicker()}>
              Choose from library
            </Button>
            <Button type="button" variant="outline" size="sm" asChild>
              <label className="cursor-pointer">
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={(event) => void onUpload(event)} />
              </label>
            </Button>
            {coverImage ? (
              <Button type="button" variant="ghost" size="sm" onClick={() => setCoverImage("")}>
                Clear cover
              </Button>
            ) : null}
          </div>
          {pickerOpen ? (
            <div className="rounded-xl border border-white/10 bg-card p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Input
                  value={imageQuery}
                  onChange={(event) => setImageQuery(event.target.value)}
                  placeholder="Filter images"
                  className="text-cream sm:max-w-xs"
                />
                <Button type="button" variant="ghost" size="sm" onClick={() => setPickerOpen(false)}>
                  Close library
                </Button>
              </div>
              <div className="mt-3 grid max-h-80 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
                {visibleImages.map((item) => (
                  <button
                    key={item.src}
                    type="button"
                    className={`overflow-hidden rounded-md border ${
                      coverImage === item.src ? "border-amber" : "border-white/10"
                    }`}
                    onClick={() => setCoverImage(item.src)}
                    onDoubleClick={() => insertImage(item.src)}
                    title={item.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt="" className="aspect-square h-auto w-full object-cover" />
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-cream/50">Click to set the cover. Double-click to insert into the body.</p>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="markdown">Body (markdown)</Label>
          <button
            type="button"
            className="text-sm text-amber hover:underline"
            onClick={() => setShowPreview((value) => !value)}
          >
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
        </div>
        <div className={showPreview ? "grid gap-4 lg:grid-cols-2" : ""}>
          <Textarea
            id="markdown"
            value={markdown}
            onChange={(event) => setMarkdown(event.target.value)}
            rows={22}
            className="min-h-80 font-mono text-sm text-cream"
          />
          {showPreview ? (
            <div className="max-h-[40rem] overflow-y-auto rounded-xl border border-white/10 bg-card p-4">
              <AdminMarkdownPreview markdown={markdown} />
            </div>
          ) : null}
        </div>
      </div>

      {props.status === "approved" ? <AdminShareBox title={title} path={props.viewHref} /> : null}

      <div className="sticky bottom-0 z-30 -mx-4 mt-8 border-t border-white/10 bg-background px-4 py-3 sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
          {status !== "approved" ? (
            <Button type="button" disabled={saving} onClick={() => void save("approved")}>
              Approve &amp; publish
            </Button>
          ) : (
            <Button type="button" variant="outline" disabled={saving} onClick={() => void save("draft")}>
              Unpublish
            </Button>
          )}
          <button type="button" className="text-sm text-amber hover:underline" onClick={viewOnSite}>
            View on site
          </button>
          {dirty ? <span className="text-xs text-cream/50">Unsaved edits</span> : null}
        </div>
        {message ? <p className="mt-2 text-sm text-amber">{message}</p> : null}
      </div>
    </form>
  );
}
