import { getCountryGuideBundle } from "@/lib/country-guides";
import { ensureCountryMapFonts } from "@/lib/country-map-fonts";
import { countryMapSvg } from "@/lib/country-map-svg";
import { readPageFile } from "@/lib/content";
import { isApproved } from "@/lib/publish";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const bundle = await getCountryGuideBundle(decoded);
  const page = await readPageFile(decoded);
  if (!bundle || !isApproved(page || { slug: decoded })) {
    return new Response("Not found", { status: 404 });
  }

  // Fontconfig must be pointed at the bundled TTFs before sharp/librsvg initializes.
  ensureCountryMapFonts();
  const sharp = (await import("sharp")).default;
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
