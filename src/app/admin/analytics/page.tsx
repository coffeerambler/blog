import { requireAdmin } from "@/lib/admin-guard";
import { plausibleDomain, plausibleEmbedSrc } from "@/lib/plausible";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const domain = plausibleDomain();
  const embed = plausibleEmbedSrc(process.env.PLAUSIBLE_EMBED_URL);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">Analytics</h1>
      <p className="mt-3 max-w-2xl text-sm text-cream/70">
        Visitors, pages opened, and clicks onward to other sites. Plausible keeps the count. It uses no
        tracking cookie. These numbers are for this site. They are not the visitors on the Wix site. The
        count runs on the deployed site, not while you are reading it on this machine.
      </p>
      {!domain ? (
        <div className="mt-6 max-w-2xl space-y-3 text-sm leading-6 text-cream/75">
          <p>To turn the count on:</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Create a Plausible site for coffeerambler.com. Leave off https and www.</li>
            <li>
              Add <code className="text-cream">NEXT_PUBLIC_PLAUSIBLE_DOMAIN=coffeerambler.com</code> to{" "}
              <code className="text-cream">.env.local</code>, then restart.
            </li>
            <li>
              In Plausible, share the site and put that link in{" "}
              <code className="text-cream">PLAUSIBLE_EMBED_URL</code>. The dashboard then shows on this page.
            </li>
          </ol>
        </div>
      ) : null}
      {domain && !embed.src ? (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-cream/75">
          The count is set for {domain}.
          {embed.invalid
            ? " The shared link is not a Plausible link, so the dashboard cannot load here."
            : " Add the shared link from Plausible as PLAUSIBLE_EMBED_URL to see the dashboard here."}{" "}
          <a className="text-amber hover:underline" href={`https://plausible.io/${domain}`}>
            Open Plausible
          </a>
          .
        </p>
      ) : null}
      {embed.src ? (
        <iframe
          src={embed.src}
          loading="lazy"
          title="Plausible"
          className="mt-6 h-[1600px] w-full rounded-xl border border-white/10 bg-background"
        />
      ) : null}
    </div>
  );
}
