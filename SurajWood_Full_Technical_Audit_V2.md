# SurajWood.com — Full Technical Audit V2
## UI/UX · SEO · Programmatic SEO · GEO · AEO

**Date:** May 11, 2026  
**Audited URL:** https://www.surajwood.com/  
**Competitor:** https://praveedh.com/  

---

## WHAT CHANGED SINCE LAST AUDIT (Progress Tracker)

| Recommendation | Status | Notes |
|---|---|---|
| Fix Google verification code | ❌ STILL BROKEN | `/products/acrylux` still shows `your-google-verification-code`. Homepage may have been fixed but product pages haven't. |
| Fix social media links | ⚠️ PARTIALLY FIXED | About page, Contact, Dealers, Blog → now point to `/surajwoodproducts` (Facebook) and `/@surajwoodproducts` (YouTube). BUT the HOMEPAGE still points to generic `facebook.com/` and `youtube.com/`. Two different codebases running. |
| Add og:image to homepage | ❌ STILL MISSING | Homepage has NO og:image tag. About page has one (`about-bg.jpg`). Aluminum Profiles has one (`ottimo.png`). Blog has one (`blog-og.jpg`). But the most-shared page — the homepage — still has nothing. |
| Replace placeholder og:images on product pages | ❌ STILL BROKEN | ACRYLUX product page still shows `placehold.co/1440x900/1B2A4A/F5F1EB?text=SurajWood` as og:image. This means every time someone shares your ACRYLUX page on WhatsApp/LinkedIn/Facebook, they see a grey placeholder. |
| Add actual colour names to swatches | ❌ NOT DONE | ACRYLUX still shows "Solid 1", "Solid 2", etc. Your shade card PDF has proper codes (1301 Red, 1302 White, etc.) — none are on the website. |
| Create /products hub page | ⚠️ UNCLEAR | Breadcrumbs link to `/products` but unclear if it's a standalone page or redirect. |
| Add Downloads section | ✅ DONE | `/downloads` exists with a gated lead capture form. Well structured. |
| Add Aluminum Profiles | ✅ DONE | Full AL-PROFHAN page at `/products/aluminum-profiles` with all 7 series. Well executed. |
| Add Events section | ⚠️ PARTIALLY | Footer links to `/#events` but this anchor doesn't appear on the homepage content. |
| Update navigation | ✅ DONE | Mobile nav now shows "Acrylic Panels" and "Aluminum Profiles" categories plus "Downloads". |
| Blog content | ✅ DONE | 13 articles now live. Featured article is "Acrylic vs Laminate Kitchen Panels: The Complete Indian Guide 2026". Good topics. |
| Add Dealers page | ✅ DONE | `/dealers` page with 3-tier programme (Authorised, Premium, Platinum). Well designed with application form. |
| About page | ✅ IMPROVED | Now has Manufacturing Blueprint section, Directors section, factory tour CTA. Good. |
| Fix footer | ✅ IMPROVED | Footer now shows Aluminum Profiles, Technical Resources, Industry Exhibitions, Dealer Enquiry links. |

---

## PART 1: UI/UX — WHAT STILL NEEDS FIXING

### 1.1 Homepage Layout Problem (STILL THE #1 ISSUE)

Your homepage has NOT been restructured. The "Five Distinct Finishes" section still shows 5 oversized vertical cards that take 5+ screen-heights to scroll through. This is still the single biggest UX failure versus Praveedh.

The homepage appears to be running DIFFERENT CODE than the inner pages. Evidence:
- Homepage social links → `facebook.com/` and `youtube.com/` (generic)
- About page social links → `facebook.com/surajwoodproducts` and `youtube.com/@surajwoodproducts` (correct)
- Homepage still has `google-site-verification: your-google-verification-code`
- Product pages also have this placeholder
- But About, Blog, Contact, Dealers pages do NOT have it

This suggests you updated all the inner pages but the homepage and product pages are running from a different component or were deployed separately and the homepage deployment is stale.

**Action: Redeploy homepage with the same updated codebase as inner pages. Then redesign the collections section into a compact grid.**

### 1.2 Navigation Inconsistency

Desktop navigation shows the old structure: `Home | About | Products ▼ | Applications ▼ | Blog | Contact`

Mobile navigation shows the new structure: `Home | About | Acrylic Panels | Aluminum Profiles | Downloads | Blog | Contact`

These need to be unified. The desktop Products dropdown needs to match the mobile nav structure, showing both Acrylic Panels and Aluminum Profiles as primary categories.

### 1.3 X (Twitter) Link Still Broken

Across ALL pages, the X/Twitter link points to `https://x.com/` — the generic X homepage. Either create a real X profile or remove this link entirely. Dead social links hurt credibility.

### 1.4 "View All Products" Still Links Wrong

On the homepage, "View All Products" still links to `/products/acrylux` instead of `/products`. This sends users to one product instead of an overview. Must be fixed.

### 1.5 Homepage Doesn't Reflect New Products

The homepage still only shows 5 acrylic panel collections. Aluminum Profiles — your newest and most significant product addition — is not visible anywhere on the homepage. Someone landing on the homepage would never know you sell aluminum profiles unless they check the mobile nav or the footer.

**Action: Add a "Complete Solutions" or "Our Product Range" section on the homepage showing BOTH Acrylic Panels and Aluminum Profiles as distinct categories.**

### 1.6 Aluminum Profiles Page — Good But Needs Polish

The AL-PROFHAN page is well structured with all 7 series. However:
- No pricing is shown (intentional B2B strategy, fine)
- The "Download Catalog" button links to `/contact?inquiry=hardware-catalog` rather than directly to the downloads page or a direct PDF
- No cross-section dimension diagrams are shown (these are in your PDF and are essential for architects/carpenters who need to specify profiles)
- The "Available Finishes" section at the bottom uses plain text. Show actual finish swatches/images

### 1.7 About Page — Missing Director Photos

The Directors section shows initials (MS, DH) instead of actual photos. Praveedh has a full Team page with photos. Initials look like the site is hiding something. Add real headshots or remove the section.

### 1.8 Testimonials Still Appear Generic

Same 3 testimonials with no photos. Praveedh has 6 detailed testimonials from named professionals at identifiable companies (Livspace, Rehau, IVAS Kitchens, Sujako Interiors). Your testimonials name "Studio Priya" and "RM Associates" — if these are real firms, add links. If they're not verifiable, they're hurting more than helping.

---

## PART 2: SEO AUDIT — TECHNICAL

### 2.1 Critical: Inconsistent Meta Tags Across Deployments

Your site has TWO versions of meta tags running simultaneously:

**Homepage + Product Pages (OLD deployment):**
- `meta-google-site-verification: your-google-verification-code` ← PLACEHOLDER
- Social links: generic `facebook.com/`, `youtube.com/`
- `meta-keywords` tag: same keyword set on every page (bad practice)
- ACRYLUX og:image: `placehold.co` placeholder

**About + Blog + Contact + Dealers + Downloads + Aluminum (NEW deployment):**
- No broken verification code
- Social links: correct brand-specific URLs
- Proper og:images with real product/facility photos
- Blog has `article:published_time` and `article:author` tags (good)

**Action: Whatever deployment pipeline you have, ensure ALL pages get the latest code. This is not an SEO issue — it's a deployment/CI issue.**

### 2.2 Title Tag Audit

| Page | Title | Assessment |
|---|---|---|
| Homepage | `SurajWood \| Premium Factory Prelaminated Acrylic Panels` | OK but "Factory Prelaminated" is jargon. Consider: "SurajWood — Premium Acrylic Panels Manufacturer India" |
| About | `Manufacturing Excellence \| Factory-Direct Acrylic Panels \| SurajWood \| SurajWood – Premium Acrylic Panels` | TOO LONG — "SurajWood" appears TWICE. Google will truncate. |
| ACRYLUX | `ACRYLUX Acrylic Panels \| Satin Finish \| SurajWood \| SurajWood – Premium Acrylic Panels` | "SurajWood" appears TWICE. |
| Blog index | `Interior Design Blog \| Acrylic Panels Guide \| SurajWood \| SurajWood – Premium Acrylic Panels` | DUPLICATE "SurajWood" again. |
| Blog post | `Acrylic vs Laminate... 2026 \| SurajWood Blog \| SurajWood – Premium Acrylic Panels` | Same pattern. |
| Contact | `Contact Us \| Get Acrylic Panel Samples & Quotes \| SurajWood \| SurajWood – Premium Acrylic Panels` | Same. |
| Dealers | `Become a SurajWood Dealer \| Acrylic Panel Distributors India \| SurajWood – Premium Acrylic Panels` | Acceptable, still slightly long. |
| Aluminum | `AL-PROFHAN by Suraj Wood \| Premium Aluminum Profiles & Hardware \| SurajWood – Premium Acrylic Panels` | Good primary title but suffix makes it too long. |
| Downloads | `SurajWood — Premium Acrylic Panels Manufacturer India \| ACRYLUX, ACRYSILK, ACRYMATTE` | This is the HOMEPAGE title being reused. Wrong page. |
| Delhi pSEO | `ACRYLUX Satin Acrylic Kitchens in Delhi \| Suraj Wood \| SurajWood – Premium Acrylic Panels` | Decent but double branding. |

**Pattern: Every page appends `| SurajWood – Premium Acrylic Panels` as a suffix, and many also have `| SurajWood` before it, creating double-branding. This wastes ~30 characters of your title tag on repetition.**

**Fix: Use a consistent suffix pattern. Either `| SurajWood` (short) or `| SurajWood – Premium Acrylic Panels` (long) — never both. And the Downloads page needs its own unique title.**

### 2.3 Meta Keywords Tag

Every single page uses the EXACT SAME keywords meta tag:
```
acrylic panels India,acrylic kitchen panels,ACRYLUX panels,premium acrylic panels,acrylic wardrobe panels,modular kitchen acrylic,Suraj Wood,SurajWood panels,acrylic panel manufacturer India
```

This is problematic for three reasons: (1) Google ignores keywords meta entirely, (2) using identical keywords on every page tells Google nothing useful about individual page focus, and (3) it exposes your keyword strategy to competitors.

**Fix: Remove the keywords meta tag entirely from all pages. It provides zero SEO value and minor competitive intelligence risk.**

### 2.4 Canonical Tags

- Homepage: `canonical: https://www.surajwood.com` (no trailing slash)
- About: `canonical: https://www.surajwood.com/about` ✓
- Contact: `canonical: https://www.surajwood.com/contact` ✓
- ACRYLUX: No explicit canonical found
- Downloads: No canonical tag
- Dealers: No canonical tag

**Fix: Every page needs a canonical tag. Missing canonicals can cause duplicate content issues, especially with Next.js which can serve pages with and without trailing slashes.**

### 2.5 Schema Markup (Structured Data)

Based on all pages fetched, I see NO evidence of JSON-LD structured data anywhere. This is a major miss. You need:

| Schema Type | Where | Why |
|---|---|---|
| Organization | Homepage | Company name, logo, contact, social profiles. Feeds Google Knowledge Panel. |
| LocalBusiness | Homepage + Contact | Physical address, hours, phone. Essential for "near me" searches. |
| Product | Each product page (ACRYLUX, etc.) | Product name, category, brand, manufacturer. Can trigger rich results. |
| BreadcrumbList | All pages | Already have visual breadcrumbs — add the schema to match. |
| Article | Blog posts | Already have `article:published_time` — add full Article schema for rich snippets. |
| FAQPage | Product pages, blog posts | If you add FAQ sections, this triggers expandable FAQ rich results in Google. |
| Review/AggregateRating | Homepage (testimonials section) | Can trigger star ratings in search results. |

**This is one of the highest-ROI SEO tasks you can do. Schema markup directly influences rich results, Knowledge Panels, and AI answer extraction.**

### 2.6 Internal Linking Gaps

- Homepage "Explore Collections" button has no `href` — it's a scroll trigger, not a link. Search engines can't follow it.
- Blog posts link to product pages (good internal linking). But product pages don't link to related blog posts.
- Aluminum Profiles page links to ACRYLUX and ACRYMATTE at bottom (good cross-sell). But acrylic panel pages don't link to Aluminum Profiles.
- No `/products` index page linking to all categories.

### 2.7 Image SEO

Product images on ACRYLUX page are named generically: `acrylux-solid-1.png`, `acrylux-solid-2.png`. Alt text is also generic: "Solid 1", "Solid 2".

**Fix: Rename images and alt text to actual colour codes. Example: `acrylux-1301-red.png` with alt "ACRYLUX 1301 Red — Solid Satin Acrylic Panel". This generates image search traffic for people searching for specific panel colours.**

---

## PART 3: PROGRAMMATIC SEO (pSEO)

### 3.1 Current pSEO Pages

You have city-specific landing pages at:
```
/acrylux/kitchens/delhi
/acrylux/kitchens/mumbai
/acrylux/kitchens/bangalore
/acrylux/kitchens/hyderabad
/acrylux/kitchens/chennai
/acrylux/kitchens/ahmedabad
/acrylux/kitchens/pune
```

### 3.2 Quality Assessment

I checked the Delhi page in detail. The content is well-written and genuinely unique — it mentions Delhi's specific climate challenges (45°C summers to near-freezing winters), references local market conditions, and even names the competitor ("outperforms Praveedh OpuLux or Nivesa"). This is good pSEO execution — NOT thin template-swapped content.

### 3.3 What's Missing from pSEO Strategy

**Scale problem:** You have 7 city pages but ONLY for ACRYLUX + Kitchens. The URL structure suggests you should have pages for:

Every product × Every application × Every city:
```
/acrylux/kitchens/delhi         ✅ EXISTS
/acrylux/wardrobes/delhi        ❌ MISSING
/acrysilk/kitchens/delhi        ❌ MISSING
/acrymatte/kitchens/mumbai      ❌ MISSING
/aluminum-profiles/kitchens/delhi ❌ MISSING
... etc.
```

That's potentially 5 products × 3 applications × 7 cities = 105 pages. Even being conservative (top 3 products × 2 applications × 7 cities = 42 pages), you're leaving massive long-tail traffic on the table.

**BUT — critical warning:** Only expand pSEO if each page has genuinely differentiated content. Google's March 2024 Helpful Content update specifically targets template-swapped pSEO pages. Each page needs unique insights about that specific product+application+city combination.

### 3.4 pSEO Expansion Recommendations

**Phase 1 — High priority (next 4 weeks):**
- Add `/acrylux/wardrobes/{city}` for all 7 cities
- Add `/acrymatte/kitchens/{city}` for top 4 cities (Delhi, Mumbai, Bangalore, Hyderabad)
- Total: ~11 new pages

**Phase 2 — Medium priority:**
- Add `/aluminum-profiles/kitchens/{city}` for top 4 cities
- Add `/acrysilk/kitchens/{city}` for top 4 cities
- Total: ~8 new pages

**Phase 3 — Add more cities:**
- Jaipur, Lucknow, Kolkata, Chandigarh, Kochi, Nagpur, Indore
- Total: ~20-30 new pages

### 3.5 pSEO Technical Issues

The Delhi page title includes BOTH `| Suraj Wood` AND `| SurajWood – Premium Acrylic Panels` — same double-branding problem. At 84+ characters, Google truncates this.

Meta description is good and city-specific: "Premium ACRYLUX acrylic panels for kitchens in Delhi."

The page correctly uses breadcrumbs: Home → ACRYLUX → Kitchens → Delhi. This is excellent for both UX and crawlability.

---

## PART 4: GEO (Generative Engine Optimization)

GEO is about optimizing your content so AI systems (ChatGPT, Google AI Overviews, Perplexity, Claude) can find, understand, and cite your brand when answering user queries.

### 4.1 Current GEO Readiness — Score: 5/10

**What you're doing right:**
- Clear, factual claims with specific numbers (3H scratch resistance, 95% reflectivity, Class B1 fire rating, 10+ years UV stability)
- Direct comparison content (SurajWood vs PETG vs Laminates table on homepage)
- Blog posts answering common comparison queries ("Acrylic vs Laminate")
- City-specific pages with unique content (good for location-specific AI queries)

**What's missing:**

**1. No FAQ Schema or FAQ Content**
AI models heavily pull from FAQ sections when answering user questions. You have ZERO FAQ content on any page. Add FAQ sections to:
- Each product page: "What is ACRYLUX? How thick is it? What substrates is it available on? Is it scratch-proof? How to clean it?"
- Each blog post: Add 3-5 FAQs at the bottom
- Homepage: General FAQs about acrylic panels
- Each FAQ section should have FAQPage schema markup

**2. No "How To" Content**
AI systems answer "how to" queries aggressively. You need pages like:
- "How to install acrylic panels on kitchen cabinets"
- "How to clean and maintain acrylic kitchen panels"  ← You have this blog post, but it needs HowTo schema
- "How to choose between acrylic and laminate for modular kitchens"
- "How to select the right aluminum profile for handleless kitchens"

**3. No Technical Specification Tables**
AI models LOVE structured, tabular data they can extract. Your homepage comparison table is good but it's embedded in styled HTML. Create dedicated specification pages with clean, extractable data tables:
- Full product specifications per collection (dimensions, thickness, weight per sqft, substrate options, color count, fire rating, scratch rating, UV rating, price range)

**4. No Glossary/Definition Content**
AI systems cite definitional content. Create a glossary page or embed definitions:
- "What is PMMA acrylic?"
- "What is PUR hotmelt bonding?"
- "What is prelaminated vs post-laminated?"
- "What is E1-Grade MDF?"
- "What is 3H scratch hardness?"

**5. Author/Expertise Signals Weak**
Google and AI systems assess E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Your blog posts are attributed to "Suraj Wood Editorial Team" — a generic name. Better: attribute to named experts with credentials. Example: "By Mayank Singhal, Director, Suraj Wood Products — 15+ years in acrylic manufacturing."

### 4.2 GEO Priority Actions

1. Add FAQ sections with FAQPage schema to all product and blog pages
2. Add HowTo schema to instructional blog posts
3. Create a Technical Specifications page with clean data tables
4. Add author bios with expertise credentials to blog posts
5. Create definition/glossary content for industry terms
6. Ensure all factual claims include specific, extractable numbers

---

## PART 5: AEO (Answer Engine Optimization)

AEO focuses specifically on getting your content featured as the direct answer in search features: Google Featured Snippets, People Also Ask, AI Overviews, voice assistants, and zero-click results.

### 5.1 Current AEO Readiness — Score: 3/10

**You're not optimized for any answer formats.**

### 5.2 Target Queries and How to Win Them

**Query: "acrylic panels vs laminate for kitchen India"**
- You have a blog post for this. BUT it lacks a concise, extractable summary paragraph at the top. Featured snippets pull 40-60 word answers.
- **Fix:** Add a TL;DR box at the top of the article: "Acrylic panels outperform laminates in scratch resistance (3H vs 2H), UV stability (10+ years vs 2-5 years), and moisture resistance. While acrylic costs 30-40% more upfront, it lasts 3x longer and requires no polishing. For premium Indian kitchens, acrylic is the superior choice."

**Query: "best acrylic panel brands in India"**
- You have NO content optimized for this list-format query. Google shows listicle results for "best X" queries.
- **Fix:** Create a blog post: "Top Acrylic Panel Manufacturers in India: A Technical Comparison" — include yourself alongside competitors with honest pros/cons. This sounds counterintuitive but Google rewards balanced content and it positions you as the authority.

**Query: "what is PMMA acrylic panel"**
- No definitional content exists on your site.
- **Fix:** Create a dedicated page or blog post with a clear definition in the first paragraph, structured for snippet extraction.

**Query: "acrylic panel price per sqft India 2026"**
- No pricing content on your site. Even if you don't show exact prices, create content around price ranges and factors: "Acrylic panel prices in India typically range from ₹X to ₹Y per sqft depending on finish type, substrate, and thickness."
- This captures high-intent commercial queries.

**Query: "handleless kitchen profile aluminum India"**
- Your Aluminum Profiles page covers this but isn't optimized for search. The page title focuses on "AL-PROFHAN" — a brand name nobody searches for.
- **Fix:** Add content targeting natural search queries: "aluminum gola profile for kitchen India", "handleless kitchen cabinet hardware".

### 5.3 People Also Ask (PAA) Optimization

For the query "acrylic panels for kitchen," Google's PAA likely shows questions like:
- "Are acrylic panels good for kitchen?"
- "What is the cost of acrylic panel per sqft?"
- "Which is better, acrylic or laminate?"
- "How long do acrylic panels last?"
- "Are acrylic panels heat resistant?"

**Every single one of these should be answered on your website** — either in FAQ sections on product pages or as standalone blog posts. Format the answer as: Question (H2/H3) → Direct answer in first sentence → Supporting detail.

### 5.4 Voice Search Optimization

Voice queries are conversational: "Hey Google, what's the best kitchen panel material in India?" Your content needs conversational fragments that directly answer such questions.

**Fix:** Add natural-language Q&A pairs throughout your product pages. Example: "Looking for the best kitchen panel material in India? SurajWood's ACRYLUX uses optical-grade PMMA acrylic with 3H scratch resistance and German PUR bonding — making it the premium choice for Indian kitchens."

---

## PART 6: COMPETITOR GAP ANALYSIS — What Praveedh Has That You Don't

| Feature | Praveedh | SurajWood | Impact |
|---|---|---|---|
| Events/Exhibition showcase | 3 events with photos (Interzum, IndiaWood, Acetech) | Footer link to `/#events` but no actual section | HIGH — shows industry presence |
| Team page with photos | Full team page | Initials only for 2 directors | MEDIUM — trust signal |
| Infrastructure page | Dedicated page | Manufacturing mentioned on About | MEDIUM — B2B trust |
| Network/Dealer map | Network page | Dealer page exists but no map | LOW |
| Careers page | Exists with job application form | Not present | LOW |
| Blog depth | ~4 educational posts visible | 13 posts (you WIN here) | You're ahead |
| Product sub-categories (finish types under each brand) | OpuLux → 6 sub-pages, Nivesa → 4, Zooper → 3, Acrymica → 4 = 17 product sub-pages | ACRYLUX → 1 page, etc. = 6 total product pages | HIGH — Praveedh has 3x the indexable product pages |
| Application page richness | 6 application categories with images | 3 categories (Kitchens, Wardrobes, Commercial) | MEDIUM |
| Downloads with lead gating | Form-gated downloads per product line | Single gated downloads page | You match this now |
| Registered brand symbols (®/™) | OpuLux®, Nivesa™, Zooper®, Acrymica® | No trademark symbols used | LOW but perception matters |
| WordPress with Slider Revolution | Rich visual animations | Next.js (technically better but less visual flair on homepage) | NEUTRAL |
| Cookie/Privacy banner | Present | Not visible | LOW |

### Key Gap: Product Page Depth

This is where Praveedh crushes you. Under OpuLux alone they have:
- OpuLux Satin
- OpuLux Supermatt  
- OpuLux Matt Glass
- OpuLux Acryl Glass
- OpuLux High Gloss
- OpuLux Classic

Each is a separate indexable page with unique content. You have ONE page for ACRYLUX that tries to cover everything.

**Fix: Consider breaking ACRYLUX into sub-pages by finish variant or by application type.** Even if ACRYLUX is one product, you can create rich sub-pages like:
- `/products/acrylux/solid-colours`
- `/products/acrylux/metallic-colours`
- `/products/acrylux/wood-grain-designs`

This would give you 3x the indexable pages per product, matching Praveedh's depth.

---

## PART 7: COMPLETE PRIORITY ACTION LIST

### 🔴 Critical (Do This Week)

1. **Sync homepage deployment** — Homepage has stale code (broken verification, generic social links, old nav). Deploy the same version as inner pages.
2. **Fix og:image on homepage** — Add a real branded image (1200x630px)
3. **Fix ACRYLUX og:image** — Replace `placehold.co` with actual product image. Check ALL other product pages.
4. **Remove `meta-google-site-verification: your-google-verification-code`** placeholder from all pages, or replace with actual code.
5. **Fix "View All Products" link** — Change from `/products/acrylux` to `/products`
6. **Fix X/Twitter link** — Either point to real profile or remove entirely.

### 🟡 High Priority (Next 2 Weeks)

7. **Add Aluminum Profiles to homepage** — New section or modify collections section
8. **Fix duplicate "SurajWood" in all title tags** — Remove one instance across all pages
9. **Fix Downloads page title** — It's using the homepage title
10. **Add canonical tags** to all pages missing them
11. **Rename product colour images and alt text** — Use actual shade codes from your PDF
12. **Add FAQ sections** to at least 3 product pages + homepage
13. **Add Organization + LocalBusiness schema** to homepage
14. **Unify desktop and mobile navigation**

### 🟢 Medium Priority (Next 4-6 Weeks)

15. **Add Product schema** to all product pages
16. **Add Article schema** to all blog posts
17. **Add BreadcrumbList schema** to all pages
18. **Create `/products` index page** listing all 6 categories
19. **Add HowTo schema** to instructional blog posts
20. **Create FAQ page** as standalone resource
21. **Add cross-links** between product pages ↔ blog posts ↔ aluminum profiles
22. **Add Events/Exhibitions section** to homepage (IndiaWood, Acetech, DelhiWood etc.)
23. **Add real testimonial photos** or replace with verifiable ones
24. **Break ACRYLUX into sub-pages** (solid colours, metallics, wood grains)
25. **Add director photos** to About page

### 🔵 Growth Phase (Next 2-3 Months)

26. **Expand pSEO** — Add `/acrylux/wardrobes/{city}` pages for 7 cities
27. **Create "Best Acrylic Panels in India"** comparison blog post
28. **Create pricing guide** blog post (even with ranges)
29. **Create technical glossary** page
30. **Add author bios** with expertise credentials to blog posts
31. **Create Infrastructure page** (factory photos, production capacity, certifications)
32. **Add more application categories** (Study Rooms, Bathroom Vanities, Retail Spaces, Hospitals, Offices)
33. **Build remaining product categories** (PetG Panels, Acrylic Laminates, PetG Laminates, Membrane Shutters)
34. **Add cross-section dimension diagrams** to Aluminum Profiles page
35. **Register trademarks** and add ® / ™ symbols to brand names (ACRYLUX®, ACRYSILK™, etc.)

---

## SUMMARY SCORES

| Category | Score | Key Issue |
|---|---|---|
| UI/UX | 6/10 | Homepage layout still bloated; nav inconsistency; deployment mismatch |
| Traditional SEO | 4/10 | Placeholder codes, duplicate titles, no schema, generic image names |
| Programmatic SEO | 7/10 | Good city pages with unique content, but only 7 pages for one product |
| GEO (Generative Engine) | 5/10 | Good factual content but zero FAQ schema, no definitions, weak author signals |
| AEO (Answer Engine) | 3/10 | No content formatted for featured snippets, no PAA optimization, no voice search |
| Content Depth | 7/10 | 13 blog posts is strong, but product pages are thin compared to Praveedh |
| Technical Foundation | 8/10 | Next.js is excellent, good image optimization, clean URLs, breadcrumbs |

**Overall: 5.7/10 — You have a strong foundation and good content strategy, but execution gaps (especially the deployment sync issue and missing schema) are holding you back significantly. The inner pages show clear improvement; the homepage and product pages need the same treatment.**
