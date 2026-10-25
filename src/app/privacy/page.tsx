import type { Metadata } from "next";
import { adsenseEnabled, gaEnabled, googleAdsEnabled } from "@/lib/ads";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const adsOn = adsenseEnabled();
  const visitsOn = gaEnabled();
  return {
    title: "Privacy and cookies",
    description: visitsOn
      ? "How Coffee Rambler uses Google Analytics and cookies. There is no visitor login on this site."
      : adsOn
        ? "How Coffee Rambler uses Google AdSense and cookies. There is no visitor login on this site."
        : "Coffee Rambler privacy information. There is no visitor login on this site.",
    alternates: { canonical: "https://www.coffeerambler.com/privacy" },
  };
}

export default function PrivacyPage() {
  const adsOn = adsenseEnabled();
  const gtagOn = googleAdsEnabled();
  const visitsOn = gaEnabled();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
      <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">Privacy and cookies</h1>
      <p className="mt-4 text-lg text-cream/70">
        This page explains what happens when you read Coffee Rambler. It is written in plain language
        on purpose.
      </p>

      <div className="mt-10 space-y-8 text-cream/85">
        <section>
          <h2 className="font-serif text-2xl text-cream">In short</h2>
          <p className="mt-3 leading-7">
            Coffee Rambler is a reading site. You do not need an account, and we do not run a member
            login here. We do not sell your personal information.{" "}
            {visitsOn && adsOn
              ? "Google Analytics and Google AdSense may set cookies so we can measure visits and show ads."
              : visitsOn
                ? "Google Analytics may set cookies so we can measure visits."
                : adsOn
                  ? "Google AdSense may set cookies so we can show ads."
                  : "Right now this site does not use tracking cookies."}
            {gtagOn ? " A Google Ads tag may also set cookies for conversion measurement." : ""} The
            coffee AI app at{" "}
            <a href="https://rambler.coffee" className="text-amber hover:underline">
              rambler.coffee
            </a>{" "}
            is separate and has its own signup rules.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">What we collect</h2>
          <p className="mt-3 leading-7">
            We do not ask for your name, email, or payment details on this website. Opening a page
            does not create an account with us.
          </p>
          {visitsOn ? (
            <p className="mt-3 leading-7">
              We use Google Analytics to understand which pages people open, roughly where a visit
              came from, and whether someone comes back. Google Analytics uses cookies and similar
              storage on your device for that. We also use Google Search Console to see which Google
              searches bring people here. Search Console does not put a cookie on your phone or
              computer when you visit this site.
            </p>
          ) : (
            <p className="mt-3 leading-7">
              Google Analytics, Meta Pixel, and similar visit trackers are not installed on this
              site.
            </p>
          )}
          {adsOn ? (
            <p className="mt-3 leading-7">
              We use Google AdSense to show advertisements in a few places on the site: below the
              header on most pages (not on the homepage hero), in articles, in the sidebar, and in
              the footer. Google may set cookies to choose, show, and measure those ads.
            </p>
          ) : (
            <p className="mt-3 leading-7">
              Advertisement boxes on the site are empty placeholders for now. They do not load Google
              ad code and do not set ad cookies until advertising is switched on.
            </p>
          )}
          {gtagOn ? (
            <p className="mt-3 leading-7">
              A Google Ads tag may also run. Google may set cookies to measure whether an ad led to a
              visit or action.
            </p>
          ) : null}
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Cookies</h2>
          <p className="mt-3 leading-7">
            A cookie is a small piece of data a website can store in your browser. Coffee Rambler
            itself does not set tracking cookies, and there is no “remember me” login cookie for the
            public site.
          </p>
          {visitsOn || adsOn || gtagOn ? (
            <p className="mt-3 leading-7">
              Third parties can set cookies when their tools are active:
            </p>
          ) : (
            <p className="mt-3 leading-7">
              With advertising and Analytics off, advertisement placeholders do not set cookies
              either.
            </p>
          )}
          {visitsOn || adsOn || gtagOn ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
              {visitsOn ? (
                <li>Google Analytics cookies help us measure visits and page use.</li>
              ) : null}
              {adsOn ? <li>Google AdSense cookies help serve and measure ads.</li> : null}
              {gtagOn ? (
                <li>Google Ads cookies may help measure conversions from ads.</li>
              ) : null}
            </ul>
          ) : null}
          <p className="mt-3 leading-7">
            The small notice at the bottom of the page remembers that you pressed “Got it”. That
            memory is kept in local storage on your device. It is not a tracking cookie, and it is
            not shared with us.
          </p>
          <p className="mt-3 leading-7">
            You can block or clear cookies in your browser settings. Some privacy-focused browsers
            and extensions already block Analytics or ads. The site still works if those tools are
            blocked.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Links to other websites</h2>
          <p className="mt-3 leading-7">
            Posts and guides often link to shops, coffee origin sites, YouTube, or{" "}
            <a href="https://rambler.coffee" className="text-amber hover:underline">
              rambler.coffee
            </a>
            . Those sites have their own privacy policies. Once you leave Coffee Rambler, what they
            collect is under their rules, not ours.
            {visitsOn
              ? " If outbound click tracking is switched on in our Analytics account, a click to another site can be recorded as a visit event."
              : ""}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Questions</h2>
          <p className="mt-3 leading-7">
            If something on this page is unclear, start with the{" "}
            <a href="/about" className="text-amber hover:underline">
              About
            </a>{" "}
            page for who runs Coffee Rambler. This privacy note only covers the website at
            coffeerambler.com.
          </p>
        </section>
      </div>
    </article>
  );
}
