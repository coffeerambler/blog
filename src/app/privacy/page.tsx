import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for coffeerambler.com. How Coffee Rambler uses Google Analytics, Google AdSense, and cookies.",
  alternates: { canonical: "https://www.coffeerambler.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-amber">Coffee Rambler</p>
      <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-cream/55">Last updated: October 2026</p>

      <div className="mt-10 space-y-8 text-cream/85">
        <p className="leading-7">
          This policy covers the website at coffeerambler.com. The Coffee Rambler AI app at{" "}
          <a href="https://rambler.coffee" className="text-amber hover:underline">
            rambler.coffee
          </a>{" "}
          is a separate service with its own terms and privacy information.
        </p>

        <section>
          <h2 className="font-serif text-2xl text-cream">Summary</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Coffee Rambler does not require an account or login.</li>
            <li>We do not collect your name, email address, or payment details through this site.</li>
            <li>We do not sell your personal information.</li>
            <li>
              We use Google Analytics to measure site usage and Google AdSense to display
              advertising. Both may set cookies on your device.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Information we collect</h2>
          <p className="mt-3 leading-7">
            We do not collect personal information directly through this website.
          </p>
          <p className="mt-3 leading-7">
            <strong className="font-medium text-cream">Google Analytics.</strong> We use Google
            Analytics to understand which pages are viewed, how visitors arrive at the site, and
            whether they return. Google Analytics uses cookies and similar technologies on your
            device to collect this information.
          </p>
          <p className="mt-3 leading-7">
            <strong className="font-medium text-cream">Google Search Console.</strong> We use Search
            Console to see which Google searches lead visitors to the site. It does not set cookies
            on your device.
          </p>
          <p className="mt-3 leading-7">
            <strong className="font-medium text-cream">Google AdSense.</strong> We display ads
            through Google AdSense in several locations: below the header on most pages (excluding
            the homepage hero), within articles, in the sidebar, and in the footer. Google may use
            cookies to select, display, and measure these ads.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Cookies</h2>
          <p className="mt-3 leading-7">
            Coffee Rambler does not set its own tracking cookies, and the public site has no login
            cookie.
          </p>
          <p className="mt-3 leading-7">
            The following third-party cookies may be set while their services are active:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>
              <strong className="font-medium text-cream">Google Analytics:</strong> measures site
              visits and page usage.
            </li>
            <li>
              <strong className="font-medium text-cream">Google AdSense:</strong> serves and measures
              advertising.
            </li>
          </ul>
          <p className="mt-3 leading-7">
            The cookie notice at the bottom of the page stores your &quot;Got it&quot; selection in
            your browser&apos;s local storage. This is not a tracking cookie, and the information is
            not sent to us.
          </p>
          <p className="mt-3 leading-7">
            You can block or delete cookies in your browser settings. Some browsers and extensions
            block analytics and advertising tools by default. The site works normally if they are
            blocked.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Third-party links</h2>
          <p className="mt-3 leading-7">
            Our articles and guides link to external sites, including retailers, coffee origin
            sites, YouTube, and{" "}
            <a href="https://rambler.coffee" className="text-amber hover:underline">
              rambler.coffee
            </a>
            . These sites operate under their own privacy policies, and we are not responsible for
            how they handle your data. If outbound click tracking is enabled in our Google Analytics
            account, clicks on external links may be recorded as events.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-cream">Contact</h2>
          <p className="mt-3 leading-7">
            You can read more about who runs the site on our{" "}
            <Link href="/about" className="text-amber hover:underline">
              About
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </article>
  );
}
