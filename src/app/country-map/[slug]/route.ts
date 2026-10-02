import sharp from "sharp";
import { getCountryGuideBundle } from "@/lib/country-guides";
import { countryMapSvg } from "@/lib/country-map-svg";
import { readPageFile } from "@/lib/content";
import { isApproved } from "@/lib/publish";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const bundle = getCountryGuideBundle(decoded);
  const page = readPageFile(decoded);
  if (!bundle || !isApproved(page || { slug: decoded })) {
    return new Response("Not found", { status: 404 });
  }

  const png = await sharp(Buffer.from(countryMapSvg(bundle)))
    .resize({ width: 1200, height: 630, fit: "contain", background: "#120f0c" })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
