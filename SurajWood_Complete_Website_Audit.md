# SurajWood.com — Complete Website Audit & Strategic Recommendations

**Date:** May 11, 2026  
**Prepared for:** Suraj Wood Products Pvt. Ltd.  
**Scope:** UI/UX Review, SEO Audit, Competitor Comparison (Praveedh.com), New Product Category Integration, Product Structure Recommendations

---

## PART 1: UI/UX REVIEW — HONEST FEEDBACK

### What's Working Well
Your website is built on Next.js which is great for SEO and performance. The overall brand identity (logo, red/dark color scheme) is consistent. The "Request Free Sample Kit" CTA is prominent and conversion-focused. The technical comparison table (SurajWood vs PETG vs Laminates) is a strong trust-builder. The WhatsApp floating button is essential for Indian B2B/B2C audiences.

### Critical UI/UX Problems

**1. Sections Don't Fit in One Viewport (Your Main Complaint)**
This is your biggest issue and you're right to flag it. Every major section on your homepage requires scrolling to see it fully. Compare this to Praveedh where each section (hero, product categories, products, applications) is designed to be consumed in a single viewport.

*The root cause:* Your sections have too much vertical padding, oversized images, and text blocks that push content below the fold unnecessarily. The "Our Collections" section is the worst offender — each product card is enormous with a large image + long description paragraph, forcing users to scroll through what feels like 5 separate pages just for one section.

*Fix:* Reduce vertical padding by 30-40%. Use a grid layout (3-4 cards per row) instead of oversized single-card layouts. Product cards should show: image, name, one-line tagline, and a CTA link. Save the detailed descriptions for individual product pages. The goal is: one section = one screen.

**2. Product Collection Section is Too Spread Out**
Your "Five Distinct Finishes" section shows 5 products in a vertical scroll that takes approximately 5 full screen-heights to get through. Praveedh shows 4 product categories in ONE viewport using a clean 4-column grid with lifestyle images. This is the single biggest layout improvement you need.

*Fix:* Display all 5 collections in a single row/grid. Use square or 4:3 ratio lifestyle images (not panel product shots). Below each image: product name + one-line descriptor + "Explore" link. Total section height should be ONE viewport.

**3. Hero Banner Issues**
Your hero banner is good in concept but has problems. The text "Elevate Every Interior With Premium Acrylic Surfaces" is partially obscured by the dropdown menu in some states (visible in your screenshot). The stats bar (15+ Years | 50+ Shades | 10,000+ Projects | Pan-India Delivery) scrolls below the fold on most screens.

*Fix:* Reduce hero height slightly. Ensure the stats bar is always visible within the hero section. Consider a carousel of lifestyle images like Praveedh does (they have 3-4 rotating banners showing different contexts).

**4. "Why SurajWood" Section — Good Content, Poor Presentation**
The 4-pillar layout (Factory Prelaminated, Optical-Grade PMMA, Technical Excellence, Architect's Choice) is informative but looks generic. The red circle icons are bland. Compare to Praveedh's "Vision Meets Execution" section which uses storytelling.

*Fix:* Replace generic icons with actual product/factory photos or custom illustrations. Add brief stat callouts (e.g., "10+ years UV stability" as a highlighted number). Make this section more visual, less text-heavy.

**5. Applications Section Needs Work**
Your tabs (Kitchens, Wardrobes, Commercial Spaces) are functional but the gallery images don't fill the space well. The tab switching feels disconnected.

*Fix:* Use full-width lifestyle images with hover overlays. Show 6-8 application categories (like Praveedh shows: Wall Paneling, Retail Display, Cabinet, Bedroom, Children's Rooms, Wardrobes). More categories = more relevance to different buyer personas.

**6. Testimonials Section**
You have 3 testimonials which is the minimum. Praveedh has 6 from named industry professionals with photos and company names. Your testimonials mention "Priya Sharma, Principal Interior Designer, Studio Priya, Delhi" — this feels potentially fabricated. If these are real people, add their photos and link to their businesses. If they're not real, replace them with genuine testimonials immediately. Fake testimonials destroy trust.

**7. Footer — Solid but Missing Elements**
Your footer is clean and well-organized. Good inclusion of city-specific landing pages. Missing: a "Downloads" section (Praveedh has this prominently), Dealer Enquiry could be more prominent, no careers page linked.

**8. Missing Sections Compared to Praveedh**
- No Events/Exhibitions section (Praveedh showcases Interzum 2025, IndiaWood 2025, Acetech 2024)
- No Blog preview on homepage (Praveedh shows 4 recent posts)
- No Infrastructure/Factory showcase
- No Team page
- No Downloads page (for shade cards, brochures, technical specs)
- No Network/Dealer map

---

## PART 2: COMPLETE SEO AUDIT

### On-Page SEO

**Title Tag:**
Current: "SurajWood | Premium Factory Prelaminated Acrylic Panels"
This is decent but could be stronger. The meta title in the source shows "SurajWood | Technical Authority in Acrylic Panels" which differs from the actual page title — this inconsistency is a problem.

*Fix:* Standardize to one title. Recommended: "SurajWood — Premium Acrylic Panels Manufacturer India | ACRYLUX, ACRYSILK, ACRYMATTE"

**Meta Description:**
Current: "India's leading manufacturer of prelaminated PMMA acrylic panels. SurajWood outperforms PETG and laminates with German PUR technology, 3H scratch resistance, and optical clarity."
This is well-written and includes key differentiators. At ~170 characters it's slightly long but acceptable.

**Google Site Verification:**
CRITICAL ISSUE: Your verification code is set to "your-google-verification-code" — a placeholder that was never updated. This means Google Search Console may not be properly verified.

*Fix immediately:* Replace with your actual Google verification code.

**Open Graph Tags:**
- og:image is MISSING on the homepage. This means when anyone shares your homepage on social media, there's no preview image.
- Product pages use placeholder images (placehold.co URLs) for og:image. This is extremely unprofessional.

*Fix:* Add a proper branded og:image (1200x630px) for the homepage and real product images for each product page.

**Keywords Meta Tag:**
You're using the keywords meta tag which Google has publicly stated it ignores since 2009. It's not harmful but it's wasted effort.

**H1 Tag:**
Homepage H1: "Elevate Every Interior With Premium Acrylic Surfaces" — This is okay but doesn't contain your primary keyword "acrylic panels." Better: "Premium Acrylic Panels for Indian Interiors" or similar.

**Product Page SEO (ACRYLUX example):**
- Title is good: "ACRYLUX Acrylic Panels | Satin Finish | SurajWood"
- BUT the colour swatches are all labeled generically ("Solid 1", "Solid 2", etc.) instead of actual colour names like "Red", "White", "Cream" etc. This is a massive missed opportunity for long-tail SEO. Each colour should have its actual name and shade code (like in your PDF shade card: "1301 Red", "1302 White", etc.)

### Technical SEO

**Framework:** Next.js — Excellent choice for SEO (server-side rendering)

**URL Structure:**
- surajwood.com/products/acrylux ✓ Clean
- surajwood.com/applications/kitchens ✓ Clean
- surajwood.com/acrylux/kitchens/delhi — This is a programmatic SEO play for city-specific landing pages. Smart strategy IF these pages have unique content. If they're thin/duplicate content, Google will penalize them.

**Schema Markup:**
Could not verify structured data from the fetch. You should have at minimum: Organization schema, Product schema on product pages, BreadcrumbList schema, LocalBusiness schema, FAQ schema where applicable.

**Sitemap:**
Not verified — ensure sitemap.xml is submitted to Google Search Console.

**Robots.txt:**
Not checked — ensure it's not blocking important pages.

**Page Speed:**
Next.js with Image optimization (_next/image) is good. However, the hero image (bg3.jpg at 3840px width) is massive. Ensure proper srcset and lazy loading are implemented.

**Internal Linking:**
The "View All Products" button links to /products/acrylux instead of a /products index page. This means there's no central products hub page — a major SEO gap. Create a /products page that lists all product categories.

**Blog:**
You have a /blog route but it's unclear how much content exists. Praveedh has educational blog posts about panel materials, core materials, polymer laminates — this is strong topical authority building. You need minimum 15-20 quality blog posts covering: acrylic vs PETG comparison, how to choose kitchen panels, maintenance guides, installation guides, cost comparisons, etc.

### Off-Page SEO

**Social Media Links:**
Facebook, Instagram, LinkedIn, YouTube, X (Twitter) are all linked — but the Facebook and YouTube links point to generic URLs (facebook.com/ and youtube.com/) not your actual brand pages. Fix this immediately.

**City Landing Pages:**
You have pages for Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Ahmedabad, Pune. This is a good local SEO strategy but these pages need genuinely unique content per city (local project photos, dealer info, delivery timelines) — not just templated pages with the city name swapped in.

### SEO Comparison: SurajWood vs Praveedh

| Factor | SurajWood | Praveedh | Winner |
|--------|-----------|----------|--------|
| Meta titles/descriptions | Good but inconsistent | Well-optimized | Praveedh |
| Open Graph images | Placeholder/missing | Properly configured | Praveedh |
| Content depth | Thin product pages | Rich product descriptions + educational content | Praveedh |
| Blog content | Minimal | 4+ visible posts with real industry insight | Praveedh |
| Schema markup | Unclear | Likely better (WordPress with SEO plugins) | Praveedh |
| Site architecture | Flat, missing hub pages | Well-organized category hierarchy | Praveedh |
| Internal linking | Weak | Strong cross-linking between products/categories | Praveedh |
| Downloads/Lead Magnets | None visible | Gated downloads (brochures require form fill = lead gen) | Praveedh |
| Events/Authority signals | None | Multiple exhibition showcases | Praveedh |
| Mobile responsiveness | Good (Next.js) | Good (WordPress responsive) | Tie |
| Page speed potential | Better (Next.js) | Decent (WordPress but heavier) | SurajWood |

**Verdict:** Praveedh wins on SEO in almost every category except potential page speed. Your Next.js foundation is actually superior technology — you're just not utilizing it properly.

---

## PART 3: COMPETITOR COMPARISON — UI/UX

### What Praveedh Does Better

**1. Product Category Display**
Praveedh shows 4 branded product lines (OpuLux®, Nivesa™, Zooper®, Acrymica®) in a single-viewport grid using lifestyle images. Each feels like a distinct brand with its own identity. Your 5 collections look identical in presentation — just different panel shots on the same beige background.

**2. Product Hierarchy**
Praveedh has a 3-level hierarchy: Brand (OpuLux) → Finish (Satin, Supermatt, High Gloss) → Individual Shades. Your structure is only 2 levels deep: Collection (ACRYLUX) → Shades. This makes Praveedh feel like a bigger, more organized brand.

**3. Navigation Depth**
Praveedh's mega menu shows the full product hierarchy. Yours is a simple dropdown with 5 items. This gives Praveedh a perception of having a much wider range even if the actual number of SKUs is similar.

**4. Social Proof**
Praveedh has testimonials from named industry professionals at real companies (Livspace, Rehau, IVAS Kitchens). These carry real weight. Ensure your testimonials are equally verifiable.

**5. Events & Authority**
Praveedh showcases participation in Interzum (Germany), IndiaWood, Acetech — major industry events. This signals they're a serious, international-grade manufacturer. You attend these events too based on your LinkedIn — but your website doesn't show it.

**6. Downloads Section**
Praveedh gates their brochure downloads behind a form — collecting leads while providing value. You have no downloads section at all despite having beautiful shade card PDFs.

### What SurajWood Does Better

**1. Technical Differentiation Messaging**
Your comparison table (SurajWood vs PETG vs Laminates) is genuinely excellent. Praveedh doesn't have anything this direct. Keep this and make it even more prominent.

**2. Clear Technical Specs**
The "Engineered for Indian Interiors" section with specific claims (3H scratch resistance, Class B1 fire rating, 95% reflectivity) is stronger than Praveedh's vaguer "quality" messaging.

**3. City-Specific Pages**
Praveedh doesn't have localized landing pages. Your Delhi/Mumbai/Bangalore pages are a genuine SEO advantage — just ensure they have unique content.

**4. Sample Kit CTA**
Your "Request Free Sample Kit" is more compelling than Praveedh's generic "Contact Us." Physical samples are a powerful conversion tool in this industry.

---

## PART 4: NEW PRODUCT CATEGORY — ALUMINUM PROFILES (AL-PROFHAN)

### What the PDF Tells Us

From the uploaded "SURAJ_WOOD_ALUMINIUM_FOLDER_2025.pdf," here's the complete product catalog:

**Brand Name:** AL-PROFHAN by Suraj Wood

**Product Series:**

**1. OTTIMO SERIES (Pages 01-02)**
- PAPS-5220: Aluminum Shutter L Profile Handle with Gasket (3mtr) — ₹3,100-3,350
- PAPS-5221: Aluminum Shutter C Profile Handle (3mtr) — ₹2,400-2,600
- PAPS-5311: Aluminum Wall Gola Profile Handle with Gasket (3mtr) — ₹2,600-2,850
- PAPS-5313: Aluminum 3 Side Profile (3mtr) — ₹3,050-3,350
- End Caps: PACP-5220, PACP-5221, PACP-5311 — ₹130-150/2pc
- Connectors: PACP-5313A (Steel), PACP-5313B (Aluminum) — ₹320/2pc

**2. AEROLINEA SERIES (Pages 03-04)**
- PAPS-6631: Aluminum Shutter L Profile Handle with Gasket (3mtr) — ₹3,300-3,600
- PAPS-6632: Aluminum Shutter C Profile Handle (3mtr) — ₹2,200-2,400
- PAPS-6634: Aluminum Edge Profile / T Patti (3mtr) — ₹800-900
- End Caps: PACP-6631, PACP-6632 — ₹130-150/2pc
- Corner Caps: PACP-6634 — ₹60/2pc

**3. HANDLE PROFILES (Pages 05-06)**
- PAPS-1336: Aluminum Shutter L Profile Handle (3mtr) — ₹2,700-3,000
- PAPS-5677: Aluminum Shutter J Profile Handle with Gasket (3mtr) — ₹2,900-3,150
- PAPS-1335: Aluminum Shutter Profile Handle with Gasket (3mtr) — ₹3,200-3,500
- End Caps: Metal (PACP-1336) ₹180/2pc, PVC (PACP-1335) ₹80/2pc

**4. SHELF PROFILES (Pages 07-08)**
- PAPS-5037: Aluminum Profile for Glass Shelf (3mtr) — ₹3,900-4,300
- PAPS-5037A: Aluminum Profile for LED Glass Shelf (3mtr) — ₹3,850-4,200
- PAHL-5037: Aluminum Glass Shelf Profile Holder — ₹470/4pc
- PACN-5037/5037A: Shelf Connectors — ₹470/4pc

**5. LUMINARE SERIES — LED Profiles (Pages 09-10)**
- PAPS-3136A: Aluminum 45° Degree LED Light Profile (3mtr) — ₹1,950-2,100
- PAPS-3062A: Aluminum LED Light Profile (3mtr) — ₹1,350-1,450

**6. HANGING ROD (Page 09)**
- PAPS-6413: Aluminum LED Hanging Rod for Clothes (3mtr) — ₹2,920-3,120
- PACP-6414: Aluminum Clothes Hanging Bracket — ₹890/2pc

**7. VELARO SERIES (Pages 11-12)**
- PAPS-1351A: Glass Shutter Profile with Gasket (3mtr) — ₹3,000-3,160
- PAHD-1351C: Aluminum Handle (128mm) — ₹1,675/4pc
- PACN-1351A: Steel Connector — ₹520/4pc

**Available Finishes Across All Series:**
- Black Brush
- Bronze Brush
- Coffee Painted
- Anthracite Painted
- Champagne Painted (Velaro series only)

**Key Facts for Website Content:**
- All profiles are 3 meters in length
- European-quality aluminum sourcing
- Designed for modular kitchens, wardrobes, and commercial furniture
- Compatible with acrylic panels (upsell opportunity with existing products)
- LED-integrated options available
- Complete ecosystem: profiles + end caps + connectors + holders

---

## PART 5: PRODUCT STRUCTURE RECOMMENDATION

### Your Full Product Range (How to Categorize)

Based on your stated product list, here's how to restructure the Products section:

**Current Structure (Flat — 5 items):**
```
Products
├── ACRYLUX
├── ACRYSILK
├── ACRYMATTE
├── ACRYGLASS
└── ACRYGLASS MATTE
```

**Recommended Structure (Hierarchical — Like Praveedh but Better):**

```
Products
├── PRELAMINATED ACRYLIC PANELS (PMMA)
│   ├── ACRYLUX (Satin Finish)
│   ├── ACRYSILK (Soft Satin Finish)
│   ├── ACRYMATTE (Matte Finish)
│   ├── ACRYGLASS (High Gloss Finish)
│   └── ACRYGLASS MATTE (Matte Glass Finish)
│
├── PetG PRELAMINATED PANELS
│   └── [Sub-categories by finish type]
│
├── ACRYLIC LAMINATES
│   └── [Sub-categories by finish type]
│
├── PetG LAMINATES
│   └── [Sub-categories by finish type]
│
├── ALUMINUM PROFILES (AL-PROFHAN)
│   ├── Ottimo Series (Gola/Shutter Profiles)
│   ├── Aerolinea Series (Slim Profiles)
│   ├── Handle Profiles
│   ├── Shelf Profiles
│   ├── Luminare Series (LED Profiles)
│   ├── Hanging Rod System
│   └── Velaro Series (Glass Shutter System)
│
└── MEMBRANE SHUTTERS
    └── [Sub-categories as applicable]
```

### How This Should Appear on the Website

**Navigation Mega Menu:**
Your dropdown should expand into a mega menu (full-width) like Praveedh's, showing the complete hierarchy. Right now your dropdown is a narrow list of 5 items. With 6 product categories and multiple sub-categories, you need a mega menu.

**Homepage Product Section:**
Show 6 product category cards in a 3x2 grid (or 6 in a row on desktop). Each card should have:
- A lifestyle/application image (not a panel product shot)
- Category name
- One-line description (e.g., "Premium PMMA panels with satin finish")
- "Explore" link
- Total section height: ONE viewport

**Individual Category Pages:**
Each category gets its own landing page with: hero image, description, sub-product listing, technical specs, shade card, application photos, and related products.

**Products Hub Page (CRITICAL — Currently Missing):**
Create /products as an index page showing ALL 6 categories. This is essential for both SEO and user navigation. Currently /products doesn't exist as a standalone page.

### Aluminum Profiles Page — Specific Recommendations

This is a completely different product type from your panels. It needs its own distinct visual treatment:

**Page Structure:**
1. Hero section with lifestyle wardrobe/kitchen image showing aluminum profiles in use
2. "AL-PROFHAN by Suraj Wood" branding section
3. Series cards (Ottimo, Aerolinea, Handle, Shelf, Luminare, Hanging Rod, Velaro) in a grid
4. Each series expands to show: product codes, dimensions diagram, pricing table, colour options, compatible accessories
5. Application gallery showing profiles installed in real projects
6. Cross-sell section: "Complete Your Project — Pair with ACRYLUX/ACRYSILK Panels"
7. Download section for the full catalog PDF
8. Request quote form

**Pricing Display:**
The PDF shows prices (₹800-4,300 per 3mtr profile). Decide whether to show prices on the website. Most B2B panel companies don't show prices publicly. If you do, it's a competitive advantage for transparency. If you don't, add a "Request Price List" CTA.

---

## PART 6: PRIORITY ACTION ITEMS

### Immediate (Do This Week)

1. **Fix the Google verification code** — "your-google-verification-code" is still a placeholder
2. **Fix social media links** — Facebook and YouTube point to generic URLs
3. **Add og:image** to the homepage — essential for social sharing
4. **Replace placeholder og:images** on product pages (placehold.co URLs)
5. **Add actual colour names** to product shade swatches (not "Solid 1, Solid 2")

### Short-Term (Next 2-4 Weeks)

6. **Redesign the homepage product section** — compress 5 cards into a single-viewport grid
7. **Reduce section padding across the entire site** — everything is too spread out
8. **Create a /products hub page** — list all product categories
9. **Add a Downloads section** — gate shade card PDFs and brochures behind a lead capture form
10. **Add an Events/Exhibitions section** — showcase IndiaWood, Acetech, any other events you attend
11. **Build the Aluminum Profiles (AL-PROFHAN) product category** — new pages for each series

### Medium-Term (Next 1-3 Months)

12. **Implement a mega menu** for the Products dropdown
13. **Create 15-20 SEO blog posts** — acrylic vs PETG, kitchen panel selection guide, installation tutorials, cost comparisons, maintenance guides
14. **Add Product schema markup** to all product pages
15. **Create an Infrastructure/Factory page** — show your manufacturing capability
16. **Add real, verifiable testimonials** — with photos, company names, and ideally video
17. **Ensure city landing pages have unique content** — not just template swaps
18. **Add an Application gallery page** — separate from the homepage section, with more categories (study rooms, bathroom vanities, retail, hospitals, offices)

### Long-Term (3-6 Months)

19. **Build out PetG Panels, Acrylic Laminates, PetG Laminates, and Membrane Shutters pages**
20. **Create a virtual showroom or 3D room visualizer**
21. **Add a Dealer Locator map**
22. **Develop case study pages** — detailed project stories with before/after photos
23. **Consider adding a comparison tool** — let users compare finishes side by side (Praveedh has a product comparison feature)

---

## PART 7: LAYOUT SPACING — SPECIFIC CSS RECOMMENDATIONS

Your main complaint about sections being too spread out and requiring scrolling:

**Current problems (approximate):**
- Section vertical padding: ~100-120px top and bottom
- Product cards: full-width single column with ~200px images
- Hero section: ~100vh (full viewport height)
- Text blocks: too much line-height and margin

**Recommended changes:**
- Section vertical padding: 60-80px max
- Product cards: grid layout, 3-4 per row, max 300px card height
- Hero section: 70-80vh with visible stat bar
- Collections section: all 5 (soon 6) products visible in one viewport
- "Why SurajWood" section: tighter grid with smaller icons and shorter text
- Applications: horizontal scroll gallery or compact grid instead of tall tabbed section
- Testimonials: carousel instead of stacked cards

**The Praveedh Principle:**
Look at how Praveedh's homepage flows — hero → product categories → featured products → applications → testimonials → events → blog → CTA → footer. Each section is ONE viewport tall. The user scrolls through the full homepage in about 8-10 scrolls. Your homepage currently takes 15-20+ scrolls. Cut it in half.

---

## SUMMARY

Your website has a strong technological foundation (Next.js), good brand messaging, and genuine technical differentiation. But the execution is letting you down in three key areas:

1. **Layout density** — everything is too spread out, requiring excessive scrolling
2. **SEO fundamentals** — placeholder codes, missing images, thin content, no hub pages
3. **Content depth** — no downloads, no events, no blog presence, no factory showcase

Praveedh isn't a better brand than you — they just present themselves more completely and professionally on the web. Their WordPress site actually has worse technical potential than your Next.js site. You have the better engine; they have the better paint job. Fix the paint job.

The addition of Aluminum Profiles (AL-PROFHAN) is a smart move — it positions you as a complete interior solutions provider, not just a panel company. Make sure the website reflects this expanded identity from day one.
