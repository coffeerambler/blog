import fs from "node:fs";
import path from "node:path";
import {
  MANIFEST,
  applyFoldedStatus,
  hashValue,
  readCupboardFile,
  recordFile,
  requireToken,
  safeSlug,
  writePretty,
} from "./cupboard-files.mjs";

requireToken();

const { data } = await readCupboardFile();
if (!data) {
  console.log("The cupboard has no saved articles or approvals.");
  process.exit(0);
}

const images = Array.isArray(data.images) ? data.images : [];
const imageManifest = [];
for (const image of images) {
  if (!image?.name || !image.url || !safeSlug(image.name)) {
    console.error(`Skipping an image with an unsafe name: ${image?.name || "(none)"}`);
    continue;
  }
  const response = await fetch(image.url);
  if (!response.ok) {
    console.error(`Could not download ${image.name}.`);
    process.exit(1);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const dest = path.join(process.cwd(), "public", "images", image.name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, bytes);
  imageManifest.push({ name: image.name, pathname: image.pathname, hash: hashValue(bytes) });
}

function rewriteImages(record) {
  const sorted = [...images].filter((image) => image.url).sort((a, b) => b.url.length - a.url.length);
  let json = JSON.stringify(record);
  for (const image of sorted) json = json.split(image.url).join(`/images/${image.name}`);
  return JSON.parse(json);
}

const posts = data.posts && typeof data.posts === "object" ? data.posts : {};
const pages = data.pages && typeof data.pages === "object" ? data.pages : {};
const status = data.status && typeof data.status === "object" ? data.status : {};
const editorial = data.editorial && typeof data.editorial === "object" ? data.editorial : {};

function writeRecord(kind, slug, record) {
  if (!safeSlug(slug) || !record || typeof record !== "object") return;
  let next = rewriteImages(record);
  const overlay = typeof status[slug] === "string" ? status[slug] : undefined;
  next = applyFoldedStatus(next, overlay);
  if (kind === "pages" && !next.guide && editorial[slug] && typeof editorial[slug] === "object") {
    next = { ...next, guide: editorial[slug] };
  }
  writePretty(recordFile(kind, slug), next);
}

for (const [slug, record] of Object.entries(posts)) writeRecord("posts", slug, record);
for (const [slug, record] of Object.entries(pages)) writeRecord("pages", slug, record);

for (const [slug, overlay] of Object.entries(status)) {
  if (!safeSlug(slug) || typeof overlay !== "string") continue;
  const postFile = recordFile("posts", slug);
  const pageFile = recordFile("pages", slug);
  const file = fs.existsSync(postFile) ? postFile : fs.existsSync(pageFile) ? pageFile : null;
  if (!file) continue;
  const current = JSON.parse(fs.readFileSync(file, "utf8"));
  writePretty(file, applyFoldedStatus(current, overlay));
}

for (const [slug, guide] of Object.entries(editorial)) {
  if (!safeSlug(slug) || !guide || typeof guide !== "object") continue;
  const file = recordFile("pages", slug);
  if (!fs.existsSync(file)) continue;
  const current = JSON.parse(fs.readFileSync(file, "utf8"));
  if (current.guide) continue;
  writePretty(file, { ...current, guide });
}

const manifest = {
  foldedAt: new Date().toISOString(),
  posts: Object.fromEntries(Object.entries(posts).filter(([slug]) => safeSlug(slug)).map(([slug, record]) => [slug, hashValue(record)])),
  pages: Object.fromEntries(Object.entries(pages).filter(([slug]) => safeSlug(slug)).map(([slug, record]) => [slug, hashValue(record)])),
  status: Object.fromEntries(
    Object.entries(status)
      .filter(([slug, value]) => safeSlug(slug) && typeof value === "string")
      .map(([slug, value]) => [slug, hashValue(value)]),
  ),
  editorial: Object.fromEntries(
    Object.entries(editorial)
      .filter(([slug, value]) => safeSlug(slug) && value && typeof value === "object")
      .map(([slug, value]) => [slug, hashValue(value)]),
  ),
  images: imageManifest,
};

writePretty(MANIFEST, manifest);
const postCount = Object.keys(manifest.posts).length;
const pageCount = Object.keys(manifest.pages).length;
console.log(
  `Folded ${postCount} post${postCount === 1 ? "" : "s"}, ${pageCount} page${pageCount === 1 ? "" : "s"}, and ${imageManifest.length} picture${imageManifest.length === 1 ? "" : "s"} into the repository.`,
);
console.log("Read the diff, commit it, and push it. Then run npm run empty-cupboard.");
