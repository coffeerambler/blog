import { plausibleDomain } from "@/lib/plausible";

export const dynamic = "force-dynamic";

const SCRIPT = "https://plausible.io/js/script.outbound-links.js";

export async function GET() {
  if (!plausibleDomain()) return new Response("Not found", { status: 404 });
  const upstream = await fetch(SCRIPT, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers: { "User-Agent": "CoffeeRamblerAdmin/1.0 (+https://www.coffeerambler.com)" },
  });
  if (!upstream.ok) return new Response("The count script could not be loaded.", { status: 502 });
  return new Response(await upstream.arrayBuffer(), {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
