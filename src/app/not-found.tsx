import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-amber">404</p>
      <h1 className="mt-3 font-serif text-4xl text-cream">Page not found</h1>
      <p className="mt-4 text-cream/70">
        This page is not on Coffee Rambler. Try the{" "}
        <Link href="/archive" className="text-amber hover:underline">
          archive
        </Link>
        , or go back to the{" "}
        <Link href="/" className="text-amber hover:underline">
          homepage
        </Link>
        .
      </p>
    </div>
  );
}
