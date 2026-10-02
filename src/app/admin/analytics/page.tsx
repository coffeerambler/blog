import { requireAdmin } from "@/lib/admin-guard";
import { gaMeasurementId, searchConsoleVerification } from "@/lib/ads";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const measurementId = gaMeasurementId();
  const verification = searchConsoleVerification();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Analytics</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/70">
        Visitors, pages, return visits, and where people came from are in Google Analytics. Google
        searches that lead here are in Search Console. Clicks onward to other sites show in Analytics
        after outbound clicks are switched on there.
      </p>
      <p className="mt-4 flex flex-wrap gap-4 text-sm">
        <a className="text-amber hover:underline" href="https://analytics.google.com">
          Open Google Analytics
        </a>
        <a className="text-amber hover:underline" href="https://search.google.com/search-console">
          Open Search Console
        </a>
      </p>
      {measurementId ? (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-cream/75">
          Visit counting is set for {measurementId}. It measures this site. The Wix visitors stay in
          Wix until the domain points here. In Google Analytics, open the property, then Data streams,
          and switch on enhanced measurement, including outbound clicks.
        </p>
      ) : (
        <div className="mt-6 max-w-2xl space-y-3 text-sm leading-6 text-cream/75">
          <p>To count visits:</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Open{" "}
              <a className="text-amber hover:underline" href="https://analytics.google.com">
                Google Analytics
              </a>{" "}
              and create a property for coffeerambler.com.
            </li>
            <li>Copy the measurement ID. It starts with G-.</li>
            <li>
              Add <code className="text-cream">NEXT_PUBLIC_GA_MEASUREMENT_ID=G-your-id</code> to{" "}
              <code className="text-cream">.env.local</code>, then restart.
            </li>
            <li>In that property, switch on enhanced measurement, including outbound clicks.</li>
          </ol>
        </div>
      )}
      {verification ? (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-cream/75">
          The Search Console verification tag is set. The search report for the live domain is the site
          Google is indexing now, which is still Wix until the domain points here.
        </p>
      ) : (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-cream/75">
          Search Console is separate from the visit count. If coffeerambler.com is already verified
          there through Wix, the search report is already available. To verify this app when it is the
          live site, choose the HTML tag method and put only the content code in{" "}
          <code className="text-cream">GOOGLE_SITE_VERIFICATION</code> in{" "}
          <code className="text-cream">.env.local</code>.
        </p>
      )}
    </div>
  );
}
