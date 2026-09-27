import type { Metadata } from "next";
import { adsenseEnabled, googleAdsEnabled } from "@/lib/ads";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const adsOn = adsenseEnabled();
  return {
    title: "Privacy and cookies",
    description: adsOn
      ? "Coffee Rambler has no member login. Google AdSense may set cookies to serve ads. The homepage hero does not carry an advertisement."
      : "Coffee Rambler has no member login. Advertisement boxes stay placeholders and do not set ad cookies until a publisher ID is set.",
    alternates: { canonical: "https://www.coffeerambler.com/privacy" },
  };
}

export default function PrivacyPage() {
  const adsOn = adsenseEnabled();
  const gtagOn = googleAdsEnabled();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
      <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">Privacy and cookies</h1>
      <p className="mt-4 text-lg text-cream/70">
        This website is for reading. There is no visitor login and no membership. The Coffee Rambler AI
        app is at{" "}
        <a href="https://rambler.coffee" className="text-amber hover:underline">
          rambler.coffee
        </a>{" "}
        and has its own signup.
      </p>

      <div className="mt-10 space-y-8 text-cream/85">
        <section>
          <h2 className="font-serif text-2xl text-cream">What this site stores</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>
              Casual visits create no account and no profile. Google Analytics, Meta Pixel and similar
              trackers are not installed.
            </li>
            <li>
              {adsOn ? (
                <>
                  Advertisement boxes in the header (not the homepage hero), articles, sidebar and
                  footer load Google AdSense. Google may set cookies to serve and measure those ads.
                  The homepage hero does not carry an advertisement.
                </>
              ) : (
                <>
                  Advertisement boxes in the header (not the homepage hero), articles, sidebar and
                  footer are empty labelled placeholders. They do not load Google ad code and do not
                  set ad cookies. Google AdSense is prepared for when a publisher ID is supplied in the
                  host environment.
                </>
              )}
            </li>
            {gtagOn ? (
              <li>
                A Google Ads tag may also run. Google may set cookies for conversion measurement.
              </li>
            ) : null}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Cookies</h2>
          {adsOn || gtagOn ? (
            <p className="mt-3 leading-7">
              This site does not set its own tracking cookies for visitors. There is no member cookie
              and no “remember me” for the public site. Google may set cookies for ads
              {gtagOn ? " and conversion measurement" : ""} when those tags are active.
            </p>
          ) : (
            <p className="mt-3 leading-7">
              This site does not set tracking cookies for visitors. There is no member cookie and no
              “remember me” for the public site. Advertisement placeholders do not set ad cookies.
            </p>
          )}
          <p className="mt-3 leading-7">
            The cookie notice at the bottom of the page remembers that it was dismissed in this browser.
            That uses local storage on the device, not a tracking cookie.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Links off-site</h2>
          <p className="mt-3 leading-7">
            Posts and guides link out to shops, origin sites, YouTube and rambler.coffee. Those services
            have their own privacy policies. This site does not control what they store.
          </p>
        </section>
      </div>
    </article>
  );
}
