# Moving Coffee Rambler off Wix

Follow this in order. Do not change the domain until the preview site in step 3 looks right.

The ten country guides still in review (Burundi, Ecuador, Guatemala, Indonesia, Kenya, Mexico, Papua New Guinea, Rwanda, Uganda, Vietnam) stay unpublished. They are not part of this move. The public world map keeps the eight guides that are already approved.

`rambler.coffee` is a different domain. Leave it alone.

## Already done in the site

These are in the repo. You do not repeat them.

- The homepage description no longer says “Login and share your experiences with our growing community.” Google will pick up the new sentence after the domain points here and the page is recrawled.
- `/country-guides-1` redirects to `/world-coffee-guide`. That address was a Wix template full of placeholder text, and it is no longer in the sitemap.
- A missing page tells people to try the archive or the homepage.
- `public/ads.txt` is the same single line the Wix site already serves, so AdSense can keep recognising the site.

## 1. Put the site on Vercel, without the domain

1. Open [vercel.com/new](https://vercel.com/new) and sign in with the GitHub account that owns `coffeerambler/blog`.
2. Import `coffeerambler/blog`. Framework preset: **Next.js**. Root directory: the repository root. Leave the build command as `npm run build` and the install command as `npm install`.
3. Do not add `coffeerambler.com` yet. Deploy.
4. Open the `*.vercel.app` address Vercel gives you. That is the preview. The real domain still serves Wix.

Production deploys run from `main`. A push to `main` publishes a new version. Keep working on other branches until you mean to go live.

## 2. Add the environment variables

In the Vercel project, open **Settings → Environment Variables**. Add each row for the **Production** environment. Values starting with `NEXT_PUBLIC_` are baked in at build time, so after you add or change one, open **Deployments** and redeploy the latest production deployment.

Set a password before you share the preview address. `/admin` is on that address too.

| Name | What to paste | Where it comes from |
| --- | --- | --- |
| `ADMIN_PASSWORD` | A password only you know | You choose it. There is no username. |
| `OPENAI_API_KEY` | Your OpenAI API key | [platform.openai.com](https://platform.openai.com/api-keys). Needed for Find 3 ideas and for writing social captions. A ChatGPT login is not this key. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | The existing `G-…` ID | See below. Add this only when you are about to move the domain, then redeploy. The preview address would otherwise count visits in the same property as the live site. |
| `GOOGLE_SITE_VERIFICATION` | The content value of the verification tag | See below. Safe to add during the preview. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-3729038989288939` | This is the publisher ID already on the live site. Add it after the domain points here, then redeploy. Ads on the `*.vercel.app` address are not an approved AdSense site. |
| `NEXT_PUBLIC_ADSENSE_SLOT_HEADER` | A numeric unit ID, or leave empty | Optional. Empty still loads AdSense in the labelled slots once the publisher ID is set. |
| `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE` | same | Optional. |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | same | Optional. |
| `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` | same | Optional. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | An `AW-…` ID, or leave empty | Only if you run Google Ads campaigns. The live Wix page is not using one. |

Do not create a second Analytics property or a second Search Console property. Both already point at `coffeerambler.com`.

### Google Analytics measurement ID

1. Open [analytics.google.com](https://analytics.google.com) and select the property already used for `coffeerambler.com`.
2. Open **Admin** (the gear), then **Data streams**, then the web stream for this domain.
3. Copy **Measurement ID**. It starts with `G-`.
4. In that same stream, turn on **Enhanced measurement**, including outbound clicks.
5. Leave this variable empty until step 6, the domain move. Then paste it, save, and redeploy.

Visit counting is off on your own computer. It sends only from a production deployment, and only when this ID is set. The cookie notice and the privacy page name Google Analytics on their own once the ID is present. You do not edit that copy.

### Search Console verification

The domain’s DNS already has a `google-site-verification` TXT record. In step 5 you leave that record in place. That is what keeps Search Console verified if the property was proved with a DNS record.

Also copy the HTML tag, in case the property was proved with a meta tag:

1. Open `https://www.coffeerambler.com`, view the page source, and find `google-site-verification`.
2. Copy only the `content` value. There may be more than one tag. In [Search Console](https://search.google.com/search-console) open **Settings → Ownership verification** and use the value shown for the `https://www.coffeerambler.com` property.
3. Paste that value into `GOOGLE_SITE_VERIFICATION`.

## 3. Check the preview before you touch DNS

On the `*.vercel.app` address, click through these and confirm each one loads.

- `/` — homepage, Chemex photo, archive tile, world map tile. The page source description must not contain “Login and share”.
- `/archive` — category pills and post cards.
- `/post/what-is-specialty-coffee` — article, photo, related posts.
- `/brewing-guides` and `/chemex`.
- `/world-coffee-guide` — map, and these eight names: Bolivia, Brazil, China, Colombia, Costa Rica, El Salvador, Ethiopia, Taiwan.
- `/country-guide-ethiopia` — guide text and growing map.
- `/harvest-calendar` — month, coloured map, season chart.
- `/about` and `/privacy`.
- `/country-guides-1` and `/africa` — both should land on `/world-coffee-guide`.
- `/admin` — sign in with `ADMIN_PASSWORD`, then sign out.

Empty **Advertisement** bars are expected until step 7. A phone-width check of the homepage is worth doing: the header should collapse to **Menu**.

The ten in-review country guides should 404 on the preview. That is correct.

## 4. Tell Vercel about the domain, still without changing Wix

The domain is registered at Wix. Nameservers are `ns0.wixdns.net` and `ns1.wixdns.net`. There is no email on the domain (no MX records). Keep the nameservers at Wix. Changing them would drop the Search Console TXT record unless you recreate it.

1. In the Vercel project, open **Settings → Domains**.
2. Add `www.coffeerambler.com`. This is the primary host. The site’s canonical links already use `www`.
3. Add `coffeerambler.com`.
4. Edit `coffeerambler.com` and set **Redirect to** `www.coffeerambler.com`. Vercel will offer this when you add the apex. Accept it.
5. Read the records on each domain card. Use those values, not a copied example from an old page. They are usually:
   - Apex: an **A** record at `@` pointing at the IPv4 address on the card (often `76.76.21.21`).
   - `www`: a **CNAME** pointing at the project target on the card (a name ending in `vercel-dns.com` or similar).

Vercel will say the domain is misconfigured until step 5. Leave it that way while you read the card.

## 5. Point the Wix DNS records at Vercel

Do this in one sitting, after step 3. The A records currently have a one-hour TTL, so some visitors can still reach Wix for about an hour after the change. Do not unpublish the Wix site first. Do not let the Wix domain registration lapse. You can drop the Wix website plan later. You still need the domain.

1. In Wix, open the domain `coffeerambler.com` and find **Manage DNS Records** (sometimes labelled **DNS Records** or **Edit DNS**).
2. Leave the TXT record that starts with `google-site-verification` exactly as it is.
3. Leave both nameserver records as they are.
4. Delete every **A** record on the apex. Today those are `185.230.63.107`, `185.230.63.171`, and `185.230.63.186`. If any one of them remains, some visitors still get Wix.
5. Add one **A** record: host `@`, value the IPv4 address from the Vercel apex card.
6. Edit the **CNAME** for `www`. It currently points at `cdn3.wixdns.net`. Change the target to the CNAME target on the Vercel `www` card. Do not create a second `www` CNAME beside the old one.
7. Save. In Vercel, wait until both domains show a valid configuration and a certificate. Refresh the domain cards. This often takes a few minutes and can take up to the one-hour TTL.

## 6. Confirm the domain, then turn analytics on

1. Open `https://www.coffeerambler.com` in a private window. You should see this Next.js site, not Wix. Hard-refresh if a tab still shows the old page.
2. Open `https://coffeerambler.com`. It should jump to `https://www.coffeerambler.com`.
3. Open `https://rambler.coffee` and confirm the app is unchanged.
4. Repeat the click-through list from step 3 on the real domain.
5. Paste `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel, save, and redeploy. After the deploy, open the site once in a private window, then in Analytics open **Realtime** and confirm the visit appears.
6. In Search Console, open the existing `https://www.coffeerambler.com` property. If it asks you to verify, the TXT record from step 5 plus `GOOGLE_SITE_VERIFICATION` covers the two methods already in use. Then open **Sitemaps** and submit `https://www.coffeerambler.com/sitemap.xml`.
7. Use **URL inspection** on the homepage and request indexing, so the new description replaces the old one.

Only after `www` is serving this site: unpublish or disconnect the Wix site. Keep the domain in the Wix account.

## 7. Turn advertising back on

1. In [AdSense](https://www.google.com/adsense), confirm `coffeerambler.com` is already an approved site. Use the existing account. The publisher ID is `ca-pub-3729038989288939`.
2. Add `NEXT_PUBLIC_ADSENSE_CLIENT` with that value in Vercel and redeploy.
3. Load an article. The dashed **Advertisement** label should be replaced by an AdSense unit. The homepage hero stays free of a header ad. The first hours can still show a blank unit while AdSense reviews the new pages.
4. If you create specific units in AdSense (**Ads → By ad unit**), paste each numeric ID into the matching `NEXT_PUBLIC_ADSENSE_SLOT_*` variable and redeploy. Leaving them empty is fine.
5. The cookie notice changes on its own to say that Google may use cookies for ads, and for Analytics if that ID is set. The privacy page does the same. Read both after the redeploy and confirm they match what is actually on.

## 8. How publishing works once the site is on Vercel

`/admin` on the Vercel site can sign you in, but it cannot be where you save work. Posts, approvals, ideas, and the social lineup are files on the server’s disk. Vercel does not keep that disk. A post you approve there can vanish on the next deploy, and a second visit may not see it.

Do the editing on your computer:

```bash
git pull
npm install
npm run dev
```

Open `http://127.0.0.1:43127/admin`. Approve, edit, or create the piece. Then commit the JSON under `content/` and push to `main`. Vercel redeploys, and that version is what the world sees.

`content/social-queue.json` is not in git. It lives only on the computer where you created it. That is the lineup in the next section.

## 9. What has to be true for social posts to work

Shared links use `https://www.coffeerambler.com/...`. Until step 6 is done, a post you publish opens the Wix page. Share after the domain serves this site.

### What you can do the day the domain moves

This part is built. Nothing is posted until you press Post in X, Facebook, or LinkedIn.

1. On your computer, with `OPENAI_API_KEY` in `.env.local`, run the site and sign in at `http://127.0.0.1:43127/admin`.
2. Open **Social**.
3. Tick a country guide, or search for a blog post. Up to five at a time. Only approved pieces are offered. The ten guides still in review will not appear, and they should not.
4. Write the captions. Each one is a short summary plus four hashtags taken from that piece. You can edit the text before you share it.
5. A country guide’s picture is its growing map. A blog post’s picture is its cover. Those pictures are not uploaded as files. X, Facebook, and LinkedIn fetch the live page and use its preview. That preview exists only after step 6.
6. Allow pop-ups for the site. Press **X**, **Facebook**, or **LinkedIn**, then press Post in that window.
7. If the window is blocked, press **Copy caption** and paste it into the network yourself. The link has to be the `www.coffeerambler.com` URL in the caption.
8. **Remove from list** drops a caption from the lineup on this computer. **Mark as posted** is only a note on this computer. It does not tell the network anything.

After the first shares, refresh each network’s preview of the old Wix page:

- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/) — paste the post URL and scrape again.
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/).
- X: post once, and if the card still shows Wix, use the card validator linked from X’s developer docs for that URL.

### What is not built, and what finishing it requires

The site does not post on a timer, and it does not send a post by itself. The Social page on the Vercel `/admin` will not remember a lineup, because that file is not kept there. Do not use the hosted admin for this.

To have the site release posts on a schedule later, all of the following have to exist. None of them are required for the domain move.

1. A store Vercel keeps (for example Vercel KV, Blob, or a small database). The lineup, the “already posted” log, and any new article you approve from the hosted admin have to live there. A file in the project is not that store.
2. One connected account at a time, with that network’s keys stored as Vercel environment variables, never in git.
3. A scheduled job that runs when you are not at the machine. Vercel Cron can wake one. The job has to read the lineup from the store in step 1.
4. The network’s own posting access:
   - **X**: the posting API is a paid product. A share window is free. Automatic posting is not.
   - **Facebook**: a Meta app, with permission to publish as the page.
   - **Instagram**: the same Meta app, plus an image. Skip a post that has no cover. A country guide can use its growing map.
   - **LinkedIn**: a LinkedIn app with permission to post as you or the page.
   - **Bluesky** is the smallest of these if you add a network, and it is not wired up either.
5. The public link in the caption has to be this site. That is true only after step 6.

Until that work is done, social is effective by using the share buttons on your computer, after `www.coffeerambler.com` serves this site, and by refreshing the old link previews once.
