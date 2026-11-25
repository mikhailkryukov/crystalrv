# Crystal RV — Website Project

**Live site:** [crystalrv.com](https://crystalrv.com)  
**Business:** Premium Class C RV Rentals — Mountain View, CA (San Francisco Bay Area)  
**Phone:** +1 (669) 245-5636 · **Email:** info@crystalrv.com  
**Hours:** Mon–Sun, 8 AM – 8 PM

---

## 📁 Project Structure

```
crystalrv.com/
│
├── index.html                  ← Single-page app (all sections inside)
├── README.md                   ← This file
├── robots.txt                  ← Search engine crawl rules
├── sitemap.xml                 ← SEO sitemap (hash-based sections)
├── .gitignore                  ← Git ignore rules
├── .htaccess                   ← Apache config (HTTPS, caching, security)
├── LICENSE                     ← MIT License
├── SECURITY.md                 ← Vulnerability reporting policy
├── privacy-policy.html         ← Privacy Policy (CCPA compliant)
├── terms-of-service.html       ← Terms of Service (RV rental specific)
├── config.example.json         ← Config template (copy → config.json)
│
├── css/
│   └── styles.css              ← All site styles (~75 KB)
│
├── js/
│   ├── main.js                 ← Navigation, routing, FAQ, fleet filters, forms
│
└── images/
    ├── logo.png                ← Crystal RV badge logo (navbar + favicon)
    ├── hero.jpg                ← Hero section background (Big Sur campfire)
    ├── daybreak.jpg            ← 2021 Thor Motor Coach Daybreak 22GOC
    ├── conquest.jpg            ← 2022 Gulfstream Conquest 6245
    ├── leprechaun.jpg          ← 2024 Coachmen Leprechaun 220XG
    ├── entrada.jpg             ← 2025 East to West Entrada 210NSC
    ├── team_xeniya.jpg         ← Co-founder Xeniya
    ├── team_michael.jpg        ← Co-founder Michael
    ├── team_elton.jpg          ← Elton (the dog)
    └── team_squad.jpg          ← Full family photo
```

---

## 🚀 Deployment — cPanel (Recommended)

1. Log in to your hosting → open **File Manager**
2. Navigate to `public_html/`
3. Delete any old `index.html` if present
4. Upload `index.html` to `public_html/`
5. Upload `.htaccess`, `robots.txt`, `sitemap.xml`, `privacy-policy.html`, `terms-of-service.html` to `public_html/`
6. Create folders `css/`, `js/`, `images/` inside `public_html/`
7. Upload each file into its matching folder

### Via FTP (FileZilla etc.)
Mirror this folder structure into `public_html/`. Relative paths (`css/styles.css`, `js/main.js`, `images/hero.jpg`) must be preserved exactly.

---

## ⚙️ Configuration Reference

### Wheelbase Booking Widget
Already configured in `index.html`. No changes needed unless dealer ID changes.
```html
<wheelbase-store dealer-id="1440877" hide-hero="true" show-reviews="true">
```

### Google Analytics
Installed in `index.html` `<head>`. Tracking ID: `G-T587L369L1`

### Google Reviews
Hardcoded in `index.html` — currently showing 5.0★ rating with 18 reviews.
To update: search for "Google Rating" and "Google Reviews" in the HTML.

---

## 🚐 Fleet

| Year | Make / Model | Sleeps | Length |
|------|-------------|--------|--------|
| 2021 | Thor Motor Coach Daybreak 22GOC | 6 | 24 ft |
| 2022 | Gulfstream Conquest 6245 | 5 | 24 ft 11 in |
| 2024 | Coachmen Leprechaun 220XG | 6 | 24 ft 9 in |
| 2025 | East to West Entrada 210NSC | 6 | 24 ft 4 in |

---

## 📄 Pages (Single-Page App, Hash Routing)

| Hash | Section |
|------|---------|
| `#home` / `/` | Hero, fleet preview, why Crystal RV, how it works, testimonials, map, FAQ preview, blog preview, newsletter |
| `#fleet` | All 4 RVs with full specs and compare feature |
| `#booking` | Wheelbase widget + trust bar + phone CTA |
| `#about` | Story, team (Michael, Xeniya, kids, Elton), values, Starlink section, mission |
| `#blog` | 9 full articles with modal popup reader |
| `#faq` | 7 categories, 35+ questions with real policy details |
| `#insurance` | Full Mobilitas + Lloyd's of London coverage breakdown |
| `#cancellation` | Moderate policy — exact terms and payment schedule |
| `#contact` | Form + map + contact info |

---

## 🔑 Key Policies (Quick Reference)

- **Minimum rental:** 3 nights
- **Security deposit:** $1,500 (all vehicles)
- **Mileage:** 100 miles/day included
- **Cleaning fee:** $115/trip
- **Minimum driver age:** 25 with valid license held 2+ years
- **Cancellation:** Full refund 5+ days before pickup · 75% refund under 5 days · Add-ons always refundable
- **Delivery:** Complimentary for 5+ nights in primary zone · $100 for SFO/SJC airport delivery
- **Insurance:** $1M liability (Mobilitas) + up to $300K collision/comprehensive (Lloyd's of London)

---

## 🔧 Making Changes

### Update RV prices or specs
Search `index.html` for the RV name (e.g. `"Thor Daybreak"`) and edit the card content.

### Add a new blog article
Blog posts are standalone pages in `/blog/`. Copy an existing post (e.g. `blog/rv-generator-tips.html`), keep its three JSON-LD blocks (Article with Person author, BreadcrumbList pointing at `/blog/`, FAQPage whose questions are also visible on the page), then:
1. Add a card to `blog/index.html` (the crawlable Trip Guides hub)
2. Add a card to the Blog view in `index.html`
3. Add the URL to `sitemap.xml` and `llms.txt`

### Update contact details
Search and replace in `index.html`:
- Phone: `+1 (669) 245-5636`
- Email: `info@crystalrv.com`
- Address: `1001 La Avenida St, Mountain View, CA 94043`

### Replace RV photos
Drop new `.jpg` files into `images/` using the same filenames:
`daybreak.jpg`, `conquest.jpg`, `leprechaun.jpg`, `entrada.jpg`

---

## 📏 File Sizes

| File | Size |
|------|------|
| index.html | ~122 KB |
| css/styles.css | ~75 KB |
| js/main.js | ~12 KB |
| images/hero.jpg | ~295 KB |
| images/logo.png | ~19 KB |
| images/ (fleet + team) | ~340 KB |
| **Total** | **~1.3 MB** |

---

*Built April 2026 · Crystal RV · Mountain View, CA*  
*Owners: Michael & Xeniya*

---

## v29 (2026-11-04)
New: `about.html`, `blog/index.html` (Trip Guides hub), `rv-rental-sequoia.html`, `rv-rental-mendocino.html`, `rv-rental-events.html`, `blog/winter-rv-trips-bay-area.html`.
Retired: World Cup 2026 landing page + blog post (now redirect to `rv-rental-events.html`). Removed dead `js/articles.js` + article modal.
See `DEPLOY-v29.md` for the full change log and deploy steps.
