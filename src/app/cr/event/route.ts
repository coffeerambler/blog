import { plausibleDomain } from "@/lib/plausible";

export const dynamic = "force-dynamic";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "";
  return request.headers.get("x-real-ip")?.trim() || "";
}

export async function POST(request: Request) {
  if (!plausibleDomain()) return new Response(null, { status: 404 });
  const body = await request.text();
  if (body.length > 20_000) return new Response(null, { status: 413 });
  const headers = new Headers({
    "Content-Type": request.headers.get("content-type") || "application/json",
    "User-Agent": request.headers.get("user-agent") || "",
  });
  const ip = clientIp(request);
  if (ip) headers.set("X-Forwarded-For", ip);
  const upstream = await fetch("https://plausible.io/api/event", {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(10_000),
  });
  return new Response(null, { status: upstream.status });
}
