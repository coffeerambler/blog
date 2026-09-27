export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-amber">404</p>
      <h1 className="mt-3 font-serif text-4xl text-cream">Page not found</h1>
      <p className="mt-4 text-cream/70">
        This path is not in the imported Wix inventory. Check the archive, or keep the live Wix URL until DNS cutover.
      </p>
    </div>
  );
}
