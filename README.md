# MotorsLuxe Pro™ — Luxury Mobile Detailing Website

A fast, cinematic, fully-responsive static website for MotorsLuxe Pro (Charleston, SC).
No build step, no framework lock-in — just open it or upload it to Hostinger.

---

## 📁 File structure

```
MotorsLuxe Pro/
├── index.html          ← the main one-page site
├── privacy.html        ← privacy policy (template)
├── robots.txt          ← SEO
├── sitemap.xml         ← SEO
├── css/styles.css      ← all styling (black + gold luxury theme)
├── js/
│   ├── site-config.js  ← ⭐ EDIT THIS: your phone, email, booking link, socials
│   └── main.js         ← animations, slider, gallery, modals (no need to edit)
└── assets/
    └── logo.png        ← your logo (extracted from your SVG)
```

---

## ✅ What you need to fill in (quick)

Everything below is in **`js/site-config.js`** — edit it in any text editor. It's the single
source of truth; the whole site updates from it.

| Field | What to add |
|------|-------------|
| `contact.phoneDisplay` / `phoneHref` | Your real phone number |
| `contact.email` | Your business email |
| `bookingUrl` | Your booking tool link (Calendly, Square, HeyGoldie, etc.) |
| `social.instagram` / `facebook` / `tiktok` / `youtube` | Your profile URLs (leave `""` to hide) |
| `reviews.googleReviewUrl` | Your Google "write a review" link |
| `reviews.googleProfileUrl` | Your Google Business profile link |

Until `bookingUrl` is set, every **Book** / **Request a Quote** button falls back to your phone link.

---

## 🖼 Adding your real photos & video

The site uses elegant **labeled placeholders** so it looks premium even before your media is in.
To add real media:

**Hero background video** — drop your file at `assets/hero.mp4` (and optionally `assets/hero.webm`
for smaller size). It auto-plays, muted and looping. Until then a luxury gradient shows.

**Photos (services, gallery, before/after, about, map)** — each placeholder is a `div` with
`class="media-slot"`. To use a real photo, add an inline background. Example in `index.html`:

```html
<!-- before -->
<div class="media-slot" data-label="Automobile detailing photo"></div>

<!-- after: put your image in assets/ and reference it -->
<div class="media-slot has-img" style="background-image:url('assets/my-car.jpg');
     background-size:cover; background-position:center;"></div>
```

Gallery items are listed in `js/main.js` (the `GALLERY` array) — change the labels there, or
replace them with real `background-image` the same way.

---

## ⭐ Adding live Google reviews (free widget)

The reviews section is ready for a live Google Reviews widget. Steps:

1. Go to **trustindex.io** (free) — or elfsight.com — and create an account.
2. Choose **Google Reviews**, search for and connect your **MotorsLuxe Pro** Google Business Profile.
3. Pick a style (dark theme suits this site), then copy the **embed code** they give you
   (usually a `<script>` tag, sometimes with a `<div>`).
4. In `index.html`, find `<div id="reviewsWidget" ...></div>` and paste the embed code **inside**
   that div. Then delete the `<div ... id="reviewsEmpty">…</div>` block right below it.
5. Save and re-upload — your real reviews now show and auto-update.

> Or just send the embed code to Claude and it will insert it for you.
> We never post fake reviews — only your real, verified ones.

The map in the Service Area section is a **live Google Map** (no setup needed). To center it on
your exact business pin later, replace the `src` of the `<iframe>` in the Service Area section.

---

## 🚀 Deploy to Hostinger

1. In Hostinger, open **hPanel → Files → File Manager** (or use FTP).
2. Go to your site's `public_html` folder.
3. Upload **everything** in this folder (`index.html`, `privacy.html`, `css/`, `js/`,
   `assets/`, `robots.txt`, `sitemap.xml`), keeping the folder structure.
4. Visit your domain — done.

> If you're replacing an existing WordPress site, back it up first and confirm you want a
> static site in its place.

---

## 🔎 Preview locally

Open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## 🛠 Tech notes

- **GSAP + ScrollTrigger** (via CDN) power the scroll reveals, hero animation, and parallax.
- Respects **`prefers-reduced-motion`** (animations off, video hidden for accessibility).
- SEO: meta tags, Open Graph/Twitter cards, `LocalBusiness` JSON-LD schema, sitemap, robots.
- Before updating the live `schema` phone number, also edit it inside `index.html` (JSON-LD block).
