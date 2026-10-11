# trishianunez.com

Personal site for Trishia Nunez. It is plain HTML, CSS and a few lines of vanilla JS, with no build step and no dependencies. The only external request is Google Fonts.

```
website/
  index.html                      the whole site
  styles.css                      all styling (colour tokens at the top)
  script.js                       portfolio image swap + footer year
  favicon.svg                     TN monogram
  robots.txt, sitemap.xml
  assets/
    Trishia_Nunez_Resume.pdf      linked by both "Download résumé" buttons
    og-image.png                  1200x630 social card (LinkedIn, iMessage, Slack...)
    apple-touch-icon.png, favicon-32.png
    portfolio/                    drop design work here (see below)
  screenshots/                    QA screenshots, not needed for deploy (safe to delete)
```

## Preview locally

Any static server works. From this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000. You can also double-click `index.html`, but the portfolio auto-swap only works from a server.

## Add design work to the portfolio

There are six placeholder tiles. Each one shows the exact file name it expects:

| Tile | Save the image as |
|---|---|
| Brand identity (wide) | `assets/portfolio/brand-identity.jpg` |
| Illustration (tall) | `assets/portfolio/illustration.jpg` |
| Character design | `assets/portfolio/character-design.jpg` |
| Animation & storyboard | `assets/portfolio/animation.jpg` |
| Web & UX design (wide) | `assets/portfolio/web-design.jpg` |
| Magazine layout | `assets/portfolio/magazine-layout.jpg` |

1. Export each piece as a JPG, about 1600px on the long side and under roughly 400 KB (squoosh.app is free).
2. Drop it into `assets/portfolio/` with the name above. The tile swaps itself on page load; images are cropped to fill the frame.
3. In `index.html`, search for `Design work`. On each `<figure>`, replace the `[PLACEHOLDER]` in `data-alt` with a short description of the image (screen readers read this), and replace `[PLACEHOLDER] Project title` in the `<figcaption>`.
4. To change a category, edit the `piece__kind` text and the `data-src` file name together.

Until an image exists, the browser console logs a 404 for that tile. This is harmless and stops once the image is there.

## Placeholder checklist

Search `index.html` for `PLACEHOLDER` to find each one.

- [ ] **Email**: `mailto:[PLACEHOLDER-EMAIL]` appears twice (hero "Email Trishia" button and contact section). The contact button's visible text is also `[PLACEHOLDER-EMAIL]`; replace it with the address.
- [ ] **LinkedIn URL**: `href="[PLACEHOLDER-LINKEDIN-URL]"` in the contact section. Also add `"sameAs": ["https://www.linkedin.com/in/..."]` to the JSON-LD block in `<head>` (a comment there shows where).
- [ ] **Headshot**: in the About section, replace the `portrait-ph` div with `<img src="assets/headshot.jpg" alt="Portrait of Trishia Nunez" width="800" height="1000">`. Use a 4:5 portrait; the arch crop is applied automatically.
- [ ] **Portfolio**: six images, six `data-alt` descriptions, six project titles (see above).
- [ ] **Résumé PDF**: `assets/Trishia_Nunez_Resume.pdf` was copied from `..\resume\resume_master.pdf` on 2026-10-11. That draft still contains `[ASK TRISHIA: ...]` and `[PHONE]`/`[EMAIL]` placeholders. Re-copy the final version over it before going live.

## Deploy for free

The site is the contents of this folder. Delete `screenshots/` first if you like; it's harmless either way.

### Option A: Netlify (easiest, drag and drop)

1. Create a free account at https://app.netlify.com.
2. Go to **Sites → Add new site → Deploy manually** and drag this `website` folder onto the page. You get a URL like `random-name.netlify.app` within seconds.
3. **Site configuration → Change site name** to something like `trishianunez` (gives `trishianunez.netlify.app`).
4. Connect the domain: **Domain management → Add a domain → `trishianunez.com`**. Netlify shows the DNS records to add. At your registrar's DNS settings:
   - `A` record, host `@` → `75.2.60.5` (Netlify's load balancer; confirm the value Netlify shows you)
   - `CNAME` record, host `www` → `trishianunez.netlify.app`
   - Or switch the domain's nameservers to the four Netlify nameservers it lists (Netlify DNS), which handles both automatically.
5. HTTPS is issued automatically (Let's Encrypt) once DNS propagates, usually within an hour.
6. To update later, drag the folder onto **Deploys** again, or connect a GitHub repo for automatic deploys.

### Option B: Cloudflare Pages

1. Create a free account at https://dash.cloudflare.com.
2. **Workers & Pages → Create → Pages → Upload assets**. Name the project `trishianunez`, then upload this folder. You get `trishianunez.pages.dev`.
3. **Custom domains → Set up a custom domain → `trishianunez.com`**, and repeat for `www.trishianunez.com`.
   - Simplest path: add `trishianunez.com` to Cloudflare as a site (free plan) and change the nameservers at the registrar to the two Cloudflare gives you. Pages then creates the DNS records itself.
   - Without moving nameservers: add a `CNAME` for `www` → `trishianunez.pages.dev` at the registrar. The apex `@` needs CNAME flattening/ALIAS support, so moving nameservers to Cloudflare is the cleaner option.
4. HTTPS is automatic.

GitHub Pages and Vercel also work with no changes, since there's nothing to build.

### After deploy

- Check the social card with https://www.opengraph.xyz or LinkedIn's Post Inspector (https://www.linkedin.com/post-inspector/). Paste `https://trishianunez.com`.
- Optional: add the site in Google Search Console and submit `https://trishianunez.com/sitemap.xml`.

## The domain: trishianunez.com is already registered

RDAP lookup (rdap.verisign.com) on 2026-10-11:

| Field | Value |
|---|---|
| Status | active (registered) |
| Registered | 2025-08-15 |
| Expires | 2028-08-15 |
| Registrar | Squarespace Domains LLC |
| Nameservers | ns-cloud-a1..a4.googledomains.com (Google Cloud DNS) |

It was registered in August 2025 with a three-year term. **First, check whether Trishia (or someone on her behalf) registered it.** Squarespace took over Google Domains' customers, so a domain bought on Google Domains in 2025 would show up exactly like this. If it's hers, log in at https://account.squarespace.com/domains, open DNS settings and add the Netlify or Cloudflare records above. No purchase needed. You can also transfer it to Cloudflare Registrar for at-cost renewals.

If it isn't hers, the domain isn't available. Alternatives to check: `trishianunez.design`, `trishia.design`, `trishianunez.co`, `trishianunez.me`, `nunez.studio`. Nothing has been bought.

### Recommended registrars (for any new or transferred domain)

- **Cloudflare Registrar**: sells at wholesale cost with no markup, free WHOIS privacy, and pairs with Cloudflare Pages. Needs Cloudflare nameservers.
- **Porkbun**: cheap, clear pricing, free WHOIS privacy and SSL, simple DNS UI.
- **Namecheap**: well known, easy UI, free privacy; watch for higher renewal prices than first-year promos.
- **Squarespace Domains**: fine if the domain is already there; renewals cost more than the options above.
