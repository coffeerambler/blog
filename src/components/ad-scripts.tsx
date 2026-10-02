import { adsenseClient, gaEnabled, gaMeasurementId, googleAdsId } from "@/lib/ads";

export function AdScripts({ measureVisits = true }: { measureVisits?: boolean }) {
  const client = adsenseClient();
  const adsId = googleAdsId();
  const gaId = measureVisits && gaEnabled() ? gaMeasurementId() : "";
  const tagIds = [adsId, gaId].filter(Boolean);
  const primary = tagIds[0];

  return (
    <>
      {client ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
          crossOrigin="anonymous"
        />
      ) : null}
      {primary ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${tagIds.map((id) => `gtag('config', ${JSON.stringify(id)});`).join("\n")}`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
