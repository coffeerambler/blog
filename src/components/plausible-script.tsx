import { plausibleDomain, plausibleEnabled } from "@/lib/plausible";

export function PlausibleScript() {
  const domain = plausibleDomain();
  if (!plausibleEnabled() || !domain) return null;
  return <script defer data-domain={domain} data-api="/cr/event" src="/cr/visit" />;
}
