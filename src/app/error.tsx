"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl text-cream">Something went wrong</h1>
      <p className="mt-4 text-cream/70">The page failed to render. Try again, or open the archive.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-amber px-5 py-2 text-sm text-background"
      >
        Try again
      </button>
    </div>
  );
}
