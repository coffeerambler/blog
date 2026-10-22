import { del } from "@vercel/blob";
import fs from "node:fs";
import {
  MANIFEST,
  blobToken,
  hashValue,
  readCupboardFile,
  requireToken,
  writeCupboardFile,
} from "./cupboard-files.mjs";

requireToken();

if (!fs.existsSync(MANIFEST)) {
  console.error("Fold the cupboard first with npm run fold-cupboard, then commit and push.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const { data, etag } = await readCupboardFile();
if (!data) {
  console.log("The cupboard is already empty of saved articles.");
  process.exit(0);
}

const kept = [];

function takeMatching(bucket, folded) {
  if (!bucket || !folded) return;
  for (const [slug, expected] of Object.entries(folded)) {
    if (!(slug in bucket)) continue;
    if (hashValue(bucket[slug]) === expected) delete bucket[slug];
    else kept.push(slug);
  }
}

takeMatching(data.posts, manifest.posts);
takeMatching(data.pages, manifest.pages);
takeMatching(data.status, manifest.status);
takeMatching(data.editorial, manifest.editorial);

const images = Array.isArray(data.images) ? data.images : [];
const remaining = [];
for (const image of images) {
  const folded = (manifest.images || []).find((item) => item.pathname === image.pathname && item.name === image.name);
  if (!folded) {
    remaining.push(image);
    continue;
  }
  const response = await fetch(image.url);
  if (!response.ok) {
    kept.push(image.name);
    remaining.push(image);
    continue;
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (hashValue(bytes) !== folded.hash) {
    kept.push(image.name);
    remaining.push(image);
    continue;
  }
  await del(image.pathname, { token: blobToken() });
}
data.images = remaining;

await writeCupboardFile(data, etag);
if (kept.length) {
  console.log(`Left these in the cupboard because they changed after the fold: ${kept.join(", ")}`);
}
console.log("Emptied the folded articles, approvals, and pictures. Ideas and the social lineup stay in the cupboard.");
