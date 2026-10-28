/** Sidebar promo for the Coffee Rambler AI app. Keep copy identical site-wide. */
export function AppPromoBox() {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-4 text-sm text-cream/75">
      <p className="font-serif text-lg text-cream">Coffee Rambler AI</p>
      <p className="mt-2">
        Track your beans, brews and palate with your own coffee coach assistant.
      </p>
      <a
        href="https://rambler.coffee"
        className="mt-3 inline-flex min-h-11 items-center text-amber hover:underline"
      >
        Open rambler.coffee
      </a>
    </div>
  );
}
