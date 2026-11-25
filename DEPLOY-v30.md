# Crystal RV — v30 deploy notes (2026-11-24)

Deployed to iFastNet on 2026-11-25. The repo's `.htaccess` is the live production file (it includes the v30 404 and redirect rules and a Google Maps fix in the CSP frame-src).

## 1. Upload
Upload everything else to `public_html/` on iFastNet, keeping the folder structure and replacing existing files.
- **New files:** `404.html`, `rv-rental-south-bay.html`, `rv-rental-peninsula.html`
- **Replaced with small redirect stubs (upload them):** the 9 merged suburb pages and `camper-van-rental-san-jose.html`. Until the .htaccess redirects are live, they forward visitors to the right hub page.

## 2. Update `.htaccess`
Open `public_html/.htaccess` in the iFastNet File Manager and paste the block from `.htaccess-v30-additions.txt` **above** the existing rewrite rules. Keep your current HTTPS, www and caching rules.

If the file has a catch-all that sends every URL to the homepage, delete it. Look for:
- `FallbackResource /index.html`
- `RewriteRule . /index.html`
- `ErrorDocument 404 /index.html`

That catch-all is why missing pages currently return status 200.

**Test afterwards:**
- https://crystalrv.com/this-page-does-not-exist should show the new 404 page. To confirm the status really is 404, use https://httpstatus.io.
- https://crystalrv.com/rv-rental-cupertino.html should land on /rv-rental-south-bay.html#cupertino.

## 3. Google Search Console
1. **Sitemaps:** delete the misspelled `sitemp.xml` entry, then resubmit `https://crystalrv.com/sitemap.xml`. It now has 46 URLs (was 54).
2. **URL Inspection → Request indexing** for:
   - /rv-rental-south-bay.html
   - /rv-rental-peninsula.html
   - /rv-rental-bay-area.html
   - /rv-rental-oakland.html
3. **Structured data:** in 1–2 weeks, check Enhancements. The review-snippet items should disappear, which is expected.

## What changed

### Structured data
- Removed the self-published "5.0 / 25 reviews" `aggregateRating` from all 40 pages that had it. Google doesn't show stars for a business's own ratings of itself.
- Removed the 4 vehicle `Product` blocks and the duplicate `LocalBusiness` + 6 `review` block from the homepage.
- The homepage `AutoRental` now has `@id` `#business` and links to the Organization.
- Organization `sameAs` now also lists Outdoorsy, RVezy, RVshare and LinkedIn.

### City pages: merged into regional hubs (54 → 46 URLs)
| Old page | Now | Redirect |
|---|---|---|
| Campbell, Cupertino, Los Gatos, Saratoga, Milpitas | `/rv-rental-south-bay.html` (one section per town) | 301 to `#town` |
| Los Altos, Menlo Park, Redwood City | `/rv-rental-peninsula.html` | 301 to `#town` |
| Berkeley | Berkeley section on `/rv-rental-oakland.html` | 301 to `#berkeley` |
| Camper Van Rental San Jose | `/rv-rental-san-jose.html` | 301 |

Each town's own copy (distances, local notes, trips, FAQs) moved into its hub section, so nothing local was lost.

These pages are kept and unchanged apart from links: San Francisco, San Jose, Oakland, Fremont, Palo Alto, San Mateo, Mountain View, Sunnyvale, Santa Clara, SFO and SJC.

### Internal linking
- **Bay Area page:** the unlinked city "pills" are now a linked grid of 4 regions. The page is now the main hub for "RV rental Bay Area".
- **Homepage:** the "Service Area" rows now link to the San Francisco, Oakland, South Bay and Peninsula pages, plus "See every Bay Area city we serve".
- **Footer:** the service-areas list on all 44 pages with one is now 14 links to live pages (was 22).
- **llms.txt:** updated to match.

### 404 handling
New `404.html` (noindex), with links to service areas, fleet, trip guides and phone.

## Not changed — please check
- Pages still say "5.0★ Google rating" and "Superhost on RVezy" in visible text. The public RVezy profile showed no Superhost badge on Nov 23. If you've lost the badge, tell me and I'll remove the claim in v31.
- The San Francisco page still ranks around position 46. The next step is a rewrite with SF-specific pickup and delivery logistics.
