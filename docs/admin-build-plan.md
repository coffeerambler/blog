# Admin build plan

This file is the context for the admin rebuild. Read it before changing `/admin`. Build only the step the user has asked for, then stop so they can review. Do not start the next step in the same pass.

Nothing in this file is built yet. The public site, the country guides, and the privacy copy stay as they are until a step below says otherwise.

## What we are building

A private admin that behaves more like Wix: one left-hand toolbar, and a tidy place for each kind of work.

1. Review posts, country guides, and ordinary pages without scrolling one long list.
2. Find three blog ideas from a fixed list of coffee news feeds, remember them so the same idea never comes back, and let Keiran read a summary.
3. On a second click, write that idea up as a normal blog post and put it in Review. Publishing stays a separate approval.
4. Later, post an approved piece to social accounts from a button.
5. Later, show visitors and which links they open, on a page inside the same toolbar.

## The call on the writing-model account

Yes, the ideas tool needs a key. No, a Cursor, ChatGPT, Claude, or Grok chat subscription cannot be linked to the site.

The buttons run on the website, on the server, when Keiran is logged into `/admin`. Cursor models are only available inside a Cursor chat. A chat plan does not hand the website a way to call the model.

What to add, and only when Step 5 starts:

- One API key in `.env.local`, which is gitignored. Never commit the value. Never print it in the admin page.
- The provider is Anthropic. The variable is `ANTHROPIC_API_KEY`.
- Add the name, with an empty value, to `.env.example` in that same step, next to `ADMIN_PASSWORD`.
- The key comes from Anthropic's API console, not from a Claude.ai login. It is billed per use. Three idea summaries are a small request. One full article is a larger one. At this volume the bill stays small.
- One provider only. Do not build a model picker.
- Grok is the weaker choice for this site's copy, from Keiran's own experience with it. OpenAI is a fallback only if he already has an API key and says to use that instead. If he does, the variable is `OPENAI_API_KEY` and the rest of this plan stays the same.

Steps 1 to 4 do not need the key. The Find and Write buttons stay visible and explain that the key is missing until Step 5. The rest of admin works without it.

## How the site works today

- Next.js App Router. Admin is `/admin`, `/admin/new/post`, and `/admin/edit/[kind]/[slug]`.
- Login is the `cr_admin` cookie, checked against `ADMIN_PASSWORD` in `src/lib/admin.ts`. There is no username and no visitor login.
- `/admin` is one scrolling page: Review, Approved country guides, Drafts, Posts, Site pages. The public header, footer, and cookie notice still wrap it (`src/app/layout.tsx`). There is no `src/app/admin/layout.tsx`.
- Posts live in `content/posts/*.json`. Pages live in `content/pages/*.json`. Country guides are pages with `type: "country"`, and the guide copy is the TypeScript module plus an optional `guide` overlay.
- Status is `draft`, `in_review`, or `approved` (`src/lib/publish.ts`). Only `approved` is public. New posts are created as `in_review` by `src/app/api/admin/new-post/route.ts`.
- Saving writes JSON on disk (`src/app/api/admin/save/route.ts`). `content/local-status.json` and `content/local-editorial.json` are gitignored overlays. Do not commit them.
- There is no database. Do not add one in Steps 1 to 6.
- The privacy page says Google Analytics, Meta Pixel, and similar trackers are not installed. The cookie notice says the site does not use tracking cookies unless ads are on.
- coffeerambler.com is still the Wix site until DNS moves. Leave DNS alone. Analytics and social links on this app count and share this app only.

## Rules for every step

- Leave DNS alone. Leave `.env.local`, AdSense IDs, and `ADMIN_PASSWORD` uncommitted.
- A generated post is `in_review`. Approval is still Keiran's click in the existing editor. Nothing in this plan publishes a post.
- British spelling. The house voice is the Costa Rica and China country guides: the opening line carries the point, sentences are complete, and stock fragments stay out ("the kilos", "the pile", "If you go, go in harvest").
- Do not invent harvest months, production figures, or study results. A draft may say only what the source excerpt supports, and it links that source.
- Read feed titles and descriptions. Do not download or paste the full article.
- Logged-out visitors never see `/admin` content, idea files, or in-review posts.
- Each step gets its own branch, `cursor/<name>-7e9f`, off the current main, with a pull request. Do not mix this work into the country-guide branch.

## Step 1. Left toolbar

Put every admin screen in one shell.

- Add `src/app/admin/layout.tsx`. When the cookie is missing, render the page with no toolbar, so login stays a simple form. When the cookie matches, render a fixed left bar and the page in the remaining width.
- Hide the public header and footer on `/admin` routes. The cookie notice can stay.
- Bar items, in this order: Review, Posts, Country guides, Pages, Ideas, Social, Analytics. Ideas, Social, and Analytics can be links that land on a short "not built yet" page, so the bar is complete and those steps have a home.
- Review is `/admin`. Posts move toward `/admin/posts`, country guides toward `/admin/guides`, pages toward `/admin/pages`. In this step it is enough that each item opens its own screen and the old lists still show the same records.
- New post and Edit keep their current forms. They open in the main area with the bar still visible, and a way back to the list they came from.
- The bar collapses to a menu on a narrow screen.
- Keep the dark palette already used on the site (`bg-background`, cream text, amber links).

Done when: login still works, logout still works, each bar item opens, and an in-review post is still hidden from a logged-out visit.

## Step 2. Three tidy lists

Split the work Keiran actually reviews. Reuse `loadAdminRecords`, `AdminRecordList`, and `AdminPostsQueue`. Do not change publish rules.

- **Review** (`/admin`) is one inbox of posts, country guides, and other pages sitting in `in_review`, with a filter for each kind. Empty copy: "Nothing waiting for review."
- **Posts** (`/admin/posts`) is every blog post, with the search box and the draft / in review / approved filter that already exist.
- **Country guides** (`/admin/guides`) is only `pageType === "country"`, split into In review and Approved.
- **Pages** (`/admin/pages`) is everything else that is not a post and not a country guide (home, brew guides, archive).
- Drop the single scrolling stack. Approved country guides no longer sit in the middle of the review page.

Done when: the same records appear as before, a country guide does not show up in Posts, and approving or unpublishing from the editor still behaves as it does now.

## Step 3. Ideas inbox, with no model

Give the ideas a place to live before any feed or model is attached.

- Store them in `content/ideas.json`, which is committed. Shape:

```json
{
  "seen": [{ "url": "", "fingerprint": "", "seenAt": "" }],
  "ideas": [
    {
      "id": "",
      "status": "new",
      "title": "",
      "summary": "",
      "sourceTitle": "",
      "sourceUrl": "",
      "sourceName": "",
      "category": "",
      "postSlug": "",
      "createdAt": ""
    }
  ]
}
```

- `status` is `new`, `dismissed`, or `used`. Dismissed and used both stay in `seen`.
- `fingerprint` is a normalised title (lowercase, punctuation stripped, a short hash). It is how two outlets covering one story collapse into one idea.
- `/admin/ideas` lists `new` ideas, with Dismiss on each card. Dismiss writes the file and the idea does not return.
- Find 3 ideas and Write this post are on the page. Until Step 5 they do nothing except say that the writing key is not set. Step 4 will make Find 3 ideas work from the feeds alone.
- The API that writes the file checks the admin cookie, the same way `src/app/api/admin/save/route.ts` does.

Done when: a dismissed idea stays dismissed after a refresh, the file is the only storage, and a logged-out request is rejected.

## Step 4. Feeds and the "never again" rule

Find 3 ideas reads feeds. It still does not call a model.

Default sources, unless Keiran replaces this list before the step is built:

| Name | Feed |
| --- | --- |
| Daily Coffee News | `https://dailycoffeenews.com/feed/` |
| Sprudge | `https://sprudge.com/feed` |
| Perfect Daily Grind | `https://perfectdailygrind.com/feed/` |

Keep the list in one module, `src/lib/idea-sources.ts`, so adding a feed later is a one-line change. Skip a source that fails and say so on the page. Do not block the other two.

On **Find 3 ideas**:

1. Fetch each feed. Keep the title, link, date, and description. Discard the rest.
2. Drop any item whose link or fingerprint is already in `seen`, including dismissed and used ideas.
3. Take the three newest remaining items.
4. Save three `new` ideas. The summary at this step is the feed description, trimmed, plus the source name and link. Mark their links and fingerprints as seen immediately, so a second click cannot return them.
5. If fewer than three are new, show the ones that are new and say the feeds had nothing else.

Do not follow the article URL. Do not store the full article.

Done when: running the action twice never repeats an idea, a failed feed does not wipe ideas already saved, and the three cards are readable in the inbox.

## Step 5. Summarise, then write the post

This is the step that needs `ANTHROPIC_API_KEY` in `.env.local`. Restart the dev server after the key is added. If the key is empty, the buttons keep the Step 3 message and change nothing.

**Find 3 ideas** stays the Step 4 flow, then asks the model to rewrite each card:

- A title in the house voice.
- A summary of a few sentences: what happened, why a Coffee Rambler reader would care, and the source.
- One category slug from `content/categories.json`.

The source title, URL, and name stay on the card, unchanged by the model. The model does not choose a different story.

**Write this post** on one card:

- Asks the model for a full post from that summary and the feed description only.
- Saves `content/posts/<slug>.json` with `status: "in_review"`, `generatedBy: "agent"`, `author: "Keiran Jones"`, the chosen category, a description, and a body that links the source.
- Sets the idea to `used` and stores `postSlug`.
- The post then shows in Review. It does not show on the public site.
- Slug from the title, ASCII, and unique against existing posts.
- Prompt rules to send every time: British spelling, complete sentences, no invented figures or harvest months, no pasted article text, cite the source, and stop rather than guess. If the source is too thin to support a post, the button returns that reason and does not write a file.

Done when: a written post opens in the existing editor as in review, a logged-out visit to its URL does not show it, and the idea cannot be written a second time.

## Step 6. Share an approved post

The safe social step. No network accounts and no API fees.

- On an approved post in the editor, show a short caption filled from the title and the public URL `https://www.coffeerambler.com` plus the post path. Keiran can edit the caption in the box.
- Buttons open the network's own share window for X, Facebook, and LinkedIn, with that caption. They do not post by themselves.
- Hide the box on draft and in-review posts. A private URL should not be shared.
- Remember nothing yet. Real posting, and the "do not post twice" log, are Step 8.

Done when: an approved post can open a share window with the right link, and an in-review post shows no share box.

## Step 7. Analytics

Do not build this until Keiran picks one of the two stores below. Page views must not be written into git.

What the page shows, either way: visitors or visits by day, pages opened, and onward clicks to other sites. The admin page is `/admin/analytics`, already reserved in the bar.

Two ways to do it:

1. **Cookie-free counts on a small hosted store.** The site records the path, the day, and a coarse referrer. No cookie, no person, no profile. Outbound clicks send a small beacon. The privacy page gets one honest sentence added in this step. This needs somewhere to put the rows (a hosted database, chosen at the start of the step). It counts this Next.js site, not the Wix site.
2. **A privacy-friendly hosted product** (Plausible or Umami). The admin page links to, or embeds, that dashboard. The account is Keiran's. The privacy page still needs a sentence if their script is added.

Google Analytics is a third option and a worse fit. The privacy page would need a real rewrite, and the cookie notice would too, before it was switched on. Do not add it unless he asks.

Done when: the page loads inside the toolbar, the numbers match the chosen store, and the privacy page describes what is actually collected.

## Step 8. Post for real

Build this only after Keiran names the accounts. One network per pass.

- The button sits on an approved post, next to the Step 6 caption.
- The first click sends the caption and link. The site stores, in `content/social-log.json`, the post slug, the network, and the time, so a second click does not send it again.
- Keys live in `.env.local` only.
- Instagram needs an image. Skip it for a post with no cover, and say so.
- X's posting API is a paid product. Facebook and Instagram go through Meta. LinkedIn needs its own app. Bluesky is the simplest if that is one of the accounts.
- The link has to be the live public URL. Leave this step until that URL serves this site, or the button will promote the Wix page.

Done when: one named network receives a single test post from an approved article, and the second click reports that it was already sent.

## Suggested order

1. Toolbar.
2. Three lists.
3. Ideas file and inbox.
4. Feeds and dedupe.
5. Writing key, summaries, and the post button.
6. Share windows.
7. Analytics, after the store is chosen.
8. Real posting, after the accounts are named.

Steps 1 to 4 are safe to build with no accounts. Step 5 waits on the Anthropic key. Steps 7 and 8 wait on a decision from Keiran.

## Still open, and not blocking Steps 1 to 4

- Replace the three default feeds if other sites matter more. Research papers are a later source (Crossref or PubMed), not part of Step 4.
- Name the social accounts before Step 8.
- Pick the analytics store before Step 7.
