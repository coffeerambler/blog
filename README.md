# Coffee Rambler blog

Next.js site for [coffeerambler.com](https://www.coffeerambler.com). Canonical host stays `www`. The Coffee Rambler AI app stays at [rambler.coffee](https://rambler.coffee). DNS and Wix are unchanged until cutover.

## Stack

Next.js (App Router), TypeScript, Tailwind, shadcn/ui. Posts and pages live as JSON in `content/`. Images are in `public/images`.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

Fill secrets in `.env.local` only. That file is gitignored. Do not commit it.

```bash
# .env.local (not git)
ADMIN_PASSWORD=
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=
```

- `ADMIN_PASSWORD` — private `/admin` login. Empty `.env.local` is fine for reading the public site.
- `NEXT_PUBLIC_ADSENSE_CLIENT` — AdSense publisher ID (`ca-pub-…`). Empty keeps labelled placeholders and does not load Google ad code. Header ads stay off the homepage hero.
- `NEXT_PUBLIC_GOOGLE_ADS_ID` — optional gtag.
- `NEXT_PUBLIC_ADSENSE_SLOT_*` — optional numeric unit IDs.

Restart the app after changing these.

There is no visitor login. Contact is the footer email.

Pages use `draft` | `in_review` | `approved`. Only **approved** pages are live. A gitignored overlay (`content/local-status.json` and `content/local-editorial.json`) can keep a local approve if JSON is reset. Do not commit those overlay files.

## What this repo includes

- Public Wix URLs from the live sitemaps, including `/post/{slug}`, brew guides at root slugs, `/archive`, `/about`, `/privacy`, `/world-coffee-guide`, and `/country-guide-*`
- Rehosted images
- Site chrome in the rambler.coffee palette (`#0E0D0B`, `#C8925A`, DM Sans + Playfair Display)
- AdSense in labelled slots when `NEXT_PUBLIC_ADSENSE_CLIENT` is set
- Private `/admin` for review and publish
- No comments, no member sign-in, no DNS change
