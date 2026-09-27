import { adsenseClient, googleAdsId } from "@/lib/ads";

export function AdScripts() {
  const client = adsenseClient();
  const adsId = googleAdsId();

  return (
    <>
      {client ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
          crossOrigin="anonymous"
        />
      ) : null}
      {adsId ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(adsId)});`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
