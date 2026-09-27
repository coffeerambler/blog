import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <AdSlot slot="footer" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-xl text-cream">Coffee Rambler</p>
          <p className="mt-2 max-w-sm text-sm text-cream/70">
            Independent writing on brewing, origin and taste. The Coffee Rambler
            AI app lives at{" "}
            <a
              href="https://rambler.coffee"
              className="inline-flex min-h-11 items-center text-amber hover:underline"
            >
              rambler.coffee
            </a>
            .
          </p>
        </div>
        <div className="text-sm text-cream/70">
          <p>
            Email:{" "}
            <a className="inline-flex min-h-11 items-center text-amber" href="mailto:CoffeeRambler@yahoo.com">
              CoffeeRambler@yahoo.com
            </a>
          </p>
          <p className="mt-2">© 2017–26 Coffee Rambler All rights reserved</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/about" className="inline-flex min-h-11 items-center hover:text-amber">
              About
            </Link>
            <Link href="/archive" className="inline-flex min-h-11 items-center hover:text-amber">
              Archive
            </Link>
            <Link href="/brewing-guides" className="inline-flex min-h-11 items-center hover:text-amber">
              Brewing Guides
            </Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-amber">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
