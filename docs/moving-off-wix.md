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
| `GOOGLE_SITE_VERIFICATION` | `Qbo5yKPNAP1yAMbrHJ_z9SfKrBD-942AmrtmRVZYENI` | Paste this exact value. See below. Safe to add during the preview. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-3729038989288939` | Leave this empty until step 7. Ads on the `*.vercel.app` address are not allowed. |
| `NEXT_PUBLIC_ADSENSE_SLOT_HEADER` | Leave empty | Optional. Skip unless you create a specific ad unit later. |
| `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE` | Leave empty | Optional. Skip. |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Leave empty | Optional. Skip. |
| `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` | Leave empty | Optional. Skip. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Leave empty | This is Google Ads campaigns, not AdSense. The live site is not using one. |

Do not create a second Analytics property or a second Search Console property. Both already point at `coffeerambler.com`.

### Google Analytics measurement ID

1. Open [analytics.google.com](https://analytics.google.com) and select the property already used for `coffeerambler.com`.
2. Open **Admin** (the gear), then **Data streams**, then the web stream for this domain.
3. Copy **Measurement ID**. It starts with `G-`.
4. In that same stream, turn on **Enhanced measurement**, including outbound clicks.
5. Leave this variable empty until step 6, the domain move. Then paste it, save, and redeploy.

Visit counting is off on your own computer. It sends only from a production deployment, and only when this ID is set. The cookie notice and the privacy page name Google Analytics on their own once the ID is present. You do not edit that copy.

### Search Console verification

Google already knows you own `coffeerambler.com`. You are not creating a new Search Console property, and you do not need to open the page source.

Do this now, in Vercel:

1. Open the project, then **Settings → Environment Variables → Add**.
2. Name: `GOOGLE_SITE_VERIFICATION`
3. Value: `Qbo5yKPNAP1yAMbrHJ_z9SfKrBD-942AmrtmRVZYENI`
4. Environment: **Production**. Save.

That value is already on the live Wix homepage and in the domain’s DNS. Pasting it here puts the same tag on the new site, so Google still accepts the site after Wix is gone.

Later, in step 5, you will see a DNS record whose value starts with `google-site-verification=Qbo5yKPNAP1yAMbrHJ_z9SfKrBD-942AmrtmRVZYENI`. Leave that record. Do not edit it and do not delete it.

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

Do this only after `https://www.coffeerambler.com` is the new site. Until then, leave every AdSense variable empty. The dashed **Advertisement** bars on the preview are supposed to be there.

You already have an AdSense account. Do not open a second one. The publisher ID on the live site is `ca-pub-3729038989288939`. `public/ads.txt` in the repo is already the matching line, so you do not upload that file anywhere.

1. Open [AdSense](https://www.google.com/adsense) and sign in with the account that already serves coffeerambler.com. Under **Sites**, `coffeerambler.com` should say it is ready. If it asks you to add a site, add `coffeerambler.com` and use the existing publisher ID. Do not add the `*.vercel.app` address.
2. In Vercel, **Settings → Environment Variables → Add**. Name: `NEXT_PUBLIC_ADSENSE_CLIENT`. Value: `ca-pub-3729038989288939`. Environment: **Production**. Save.
3. Leave `NEXT_PUBLIC_ADSENSE_SLOT_HEADER`, `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE`, `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`, `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER`, and `NEXT_PUBLIC_GOOGLE_ADS_ID` empty.
4. Open **Deployments**, redeploy the latest production deployment, and wait until it finishes. This variable is baked in at build time, so saving it is not enough on its own.
5. Open an article on `https://www.coffeerambler.com` in a private window. The dashed **Advertisement** label should be replaced by an ad. The homepage hero stays free of a header ad. A blank gap for the first few hours is normal while AdSense looks at the new pages.
6. Read the cookie bar and the privacy page. Both should now say that Google may use cookies for ads. You do not edit that text.

Skip creating new ad units. The four slot variables are only for a unit you build yourself later under **Ads → By ad unit**. The number from that screen is what you would paste. Empty slots still show ads.

## 8. How publishing works once the site is on Vercel

Approving on the Vercel admin publishes the public page on the next load. The approval is stored in a private Vercel Blob cupboard, not in git. The articles already in the repository stay in git. When both have the same piece, the cupboard copy is the one visitors see.

### One-time setup

1. In the Vercel project, open **Storage** and create one private Blob store.
2. Add `BLOB_READ_WRITE_TOKEN` to **Production** and **Preview**. Add it after this branch is merged, so an unfinished preview does not write into the live cupboard.
3. Add `OPENAI_API_KEY` to **Preview** as well as **Production**, or **Find 3 ideas** and **Write captions** stay dead on the preview URL.
4. Leave the Blob token out of `.env.local`. This computer keeps writing files, as it does now.

A new country, with a new map, is still made on this computer and deployed with a commit. The ten guides already in review can be approved from the phone.

### On another device

1. Sign in to the Vercel admin.
2. Open **Review**, then the article or country guide.
3. Tap **Approve & publish**.
4. Open the public page and confirm it is there.

That is the whole publish. Do not edit that same piece in the repository until you fold it. A git edit before the fold stays hidden, because visitors are reading the cupboard copy.

**Ideas** and **Social** save into the same cupboard. **Dismiss** removes an idea and remembers it. **Delete draft** removes a phone-made draft that is not in the repository. **Remove from list** and **Mark as posted** update the caption lineup.

For Instagram, tap **Copy caption**, save the picture by holding it, and paste both into the app. The site does not post to Instagram.

### When you are next at this computer

The fold copies the cupboard back into `content/` and `public/images/`. Run it with the token in the command, not saved in `.env.local`:

```bash
BLOB_READ_WRITE_TOKEN="the token from Vercel" npm run fold-cupboard
```

Read the diff. The article or guide should now say approved. Commit it and push it. After that push, empty the entries you just folded. Ideas and the social lineup stay in the cupboard.

```bash
BLOB_READ_WRITE_TOKEN="the token from Vercel" npm run empty-cupboard
```

Do not approve something new on your phone between the fold and the empty. A piece that changed after the fold is left in the cupboard, and the script names it. Deleting the Blob store is how phone-made work that has not been folded would be lost. Emptying a folded entry is the reconcile.

## 9. What has to be true for social posts to work

Shared links use `https://www.coffeerambler.com/...`. Until step 6 is done, a post you publish opens the Wix page. Share after the domain serves this site.

### What you can do the day the domain moves

Nothing is posted until you press Post in X, Facebook, or LinkedIn, or you paste a caption into Instagram yourself.

1. Sign in at the Vercel `/admin` once `BLOB_READ_WRITE_TOKEN` and `OPENAI_API_KEY` are set. This computer still works at `http://127.0.0.1:43127/admin` with `OPENAI_API_KEY` in `.env.local`.
2. Open **Social**.
3. Tick a country guide, or search for a blog post. Up to five at a time. Only approved pieces are offered. The ten guides still in review will not appear, and they should not.
4. Write the captions. Each one is a short summary plus four hashtags taken from that piece. You can edit the text before you share it.
5. A country guide’s picture is its growing map. A blog post’s picture is its cover. X, Facebook, and LinkedIn fetch the live page and use its preview. That preview exists only after step 6. A cover you upload on Vercel is stored in the cupboard until you fold it.
6. Allow pop-ups for the site. Press **X**, **Facebook**, or **LinkedIn**, then press Post in that window.
7. If the window is blocked, or you are posting to Instagram, press **Copy caption**. Save the picture, then paste both into the app. The link has to be the `www.coffeerambler.com` URL in the caption.
8. **Remove from list** drops a caption. **Mark as posted** is only a note in the lineup. It does not tell the network anything. On Vercel those notes stay in the cupboard. On this computer they stay in `content/social-queue.json`, which is not committed.

After the first shares, refresh each network’s preview of the old Wix page:

- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/) — paste the post URL and scrape again.
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/).
- X: post once, and if the card still shows Wix, use the card validator linked from X’s developer docs for that URL.

### What is not built, and what finishing it requires

The site does not post on a timer, and it does not send a post by itself. The hosted admin remembers the lineup in the cupboard from section 8. It still does not press Post for you.

To have the site release posts on a schedule later, all of the following have to exist. None of them are required for the domain move.

1. The cupboard from section 8 is the store. A scheduled job would read the lineup from it.
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
