# SurajWood Full Build Walkthrough v2.0
## Option A: Vercel + Sanity.io + Perfex CRM on GoDaddy

### Final Architecture (Locked)

```
FRONTEND: Next.js 14 (App Router) → Deployed on Vercel (FREE)
CONTENT:  Sanity.io (blog + products + FAQs — single source of truth) → FREE tier
CRM:      Perfex CRM (leads, pipelines, email) → Your GoDaddy cPanel (existing)
DNS:      Cloudflare (free SSL, CDN, DDoS protection) → FREE
TOTAL ADDITIONAL HOSTING: ₹0/month
```

### What Goes Where

| Component | Domain | Hosting | Cost |
|-----------|--------|---------|------|
| Frontend (React) | www.surajwood.com | Vercel free tier | ₹0 |
| Perfex CRM | crm.surajwood.com | GoDaddy cPanel (existing) | ₹0 extra |
| Content Studio | surajwood.sanity.studio | Sanity.io cloud | ₹0 |
| DNS + SSL | surajwood.com | Cloudflare free | ₹0 |
| Analytics | — | GA4 + GTM + Clarity | ₹0 |
| Transactional Email | — | Brevo free (300/day) | ₹0 |

---

## PHASE 0: ACCOUNTS & ENVIRONMENT (Day 1)

### Step 0.1 — Create Required Accounts

```
1. Vercel: https://vercel.com → Sign up with GitHub
2. Sanity.io: https://sanity.io → Sign up (free plan: 3 users, 500K API calls/month)
3. Cloudflare: https://cloudflare.com → Sign up (free plan)
4. GitHub: https://github.com → Create repo: surajwood/surajwood-website
5. Google: GA4 property + GTM container + Search Console + reCAPTCHA v3 keys
6. Brevo: https://brevo.com → Sign up for free SMTP (configure in Perfex CRM)
```

### Step 0.2 — Prerequisites on Your Machine

Open terminal in Antigravity (Ctrl+`):

```bash
# Check Node.js (need 18+)
node --version

# If not installed: https://nodejs.org (LTS)
# Install pnpm
npm install -g pnpm

# Check Git
git --version
```

### Step 0.3 — Create Project & Open in Antigravity

```bash
mkdir C:\Projects\surajwood
cd C:\Projects\surajwood
git init
```

Click **"Open Folder"** in Antigravity left panel → navigate to `C:\Projects\surajwood`

### Step 0.4 — Create CLAUDE.md (Paste this into Claude Code sidebar)

```
Create a CLAUDE.md file in the project root with this exact content:

# SurajWood.com — Technical Context for Claude Code

## Project
Premium acrylic panel manufacturer website. Competitor target: Praveedh Decor (praveedh.com).

## Architecture
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Content: Sanity.io (headless CMS for blog, products, FAQs, testimonials — single source of truth)
- CRM: Perfex CRM on GoDaddy cPanel (custom REST endpoint for lead capture)
- Hosting: Vercel (frontend) + GoDaddy cPanel (Perfex CRM) + Cloudflare (DNS/SSL)

## Key Rules
1. Always TypeScript strict mode
2. Next.js App Router only (never Pages Router)
3. Tailwind CSS utilities only (no custom CSS files)
4. shadcn/ui for base components (Radix primitives)
5. All images through next/image (WebP, lazy loading, blur placeholders)
6. Every page needs JSON-LD schema markup via SchemaMarkup component
7. Forms use React Hook Form + Zod validation
8. Content fetched from Sanity via GROQ queries in lib/sanity.ts
9. Lead submissions: React form → /api/lead route → Perfex CRM API
10. 15 core pages + 50 PSEO pages

## Products (5 collections)
ACRYLUX (Satin), ACRYSILK (Soft Satin), ACRYMATTE (Matte), ACRYGLASS (High Gloss), ACRYGLASS MATTE (Matte Glass)

## Brand
- Navy: #1B2A4A | Navy Light: #2C3E6B
- Copper: #B87333 | Copper Light: #C8A96E
- Cream: #F5F1EB | Cream Dark: #E8E2D8
- Fonts: Inter (headings), DM Sans (body)

## Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, PERFEX_API_URL (https://crm.surajwood.com/api/leads/create), PERFEX_API_KEY, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY

## Performance Targets
Lighthouse > 90, LCP < 2.0s, CLS < 0.1, JS < 200KB gzipped
```

---

## PHASE 1: SCAFFOLD FRONTEND (Sprint 1, Week 1-2)

### Step 1.1 — Create Next.js Project

**Paste into Claude Code sidebar:**

```
Create a Next.js 14 project in a folder called "frontend" with:
- TypeScript strict, Tailwind CSS v3, ESLint, pnpm
- App Router (app/ directory at root, no src/)
- Import alias @/ mapped to root

Install these dependencies:
- @sanity/client @sanity/image-url next-sanity (Sanity client)
- @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip
- react-hook-form @hookform/resolvers zod
- framer-motion lucide-react
- next-sitemap sharp
- class-variance-authority clsx tailwind-merge

Create this folder structure:
app/
  layout.tsx, page.tsx
  about/page.tsx
  products/[slug]/page.tsx
  applications/[slug]/page.tsx
  blog/page.tsx, blog/[slug]/page.tsx
  contact/page.tsx
  dealers/page.tsx
  faq/page.tsx
  [product]/[application]/[city]/page.tsx
  api/lead/route.ts
  api/revalidate/route.ts
components/
  ui/ (shadcn base components)
  sections/ (Hero, ProductGrid, Testimonials, CTABanner, etc.)
  seo/ (SchemaMarkup, MetaTags, Breadcrumb)
  forms/ (ContactForm, SampleRequestForm, DealerForm)
  layout/ (Navbar, Footer, MobileMenu, WhatsAppWidget)
lib/
  sanity.ts (Sanity client + GROQ queries)
  schema.ts (JSON-LD generators)
  crm.ts (Perfex CRM submission helper)
  analytics.ts (GA4 event helpers)
  pseo-data.ts (PSEO city/product matrix)
  utils.ts (cn() helper)
types/
  sanity.ts (Sanity document type definitions)
  form.ts (Zod form schemas)
sanity/
  schemas/ (Sanity Studio schema definitions)
  sanity.config.ts
  sanity.cli.ts
```

### Step 1.2 — Set Up Sanity.io Project

**Paste into Claude Code sidebar:**

```
Set up Sanity.io for this project. Create the Sanity Studio configuration and ALL content schemas.

1. Initialize Sanity in a "sanity" subfolder using @sanity/cli:
   - Project name: surajwood-cms
   - Dataset: production
   - Template: clean

2. Create these Sanity document schemas in sanity/schemas/:

PRODUCT SCHEMA (product.ts):
- title (string, required)
- slug (slug, from title)
- finishType (string, options: Satin, Soft Satin, Matte, High Gloss, Matte Glass)
- heroImage (image with hotspot)
- gallery (array of images)
- shortDescription (text, max 200 chars)
- fullDescription (block content / portable text)
- idealFor (array of strings: Kitchens, Wardrobes, Commercial, Offices, Living Spaces)
- technicalSpecs (object):
  - materialComposition (string)
  - thickness (string)
  - dimensions (string)
  - scratchResistance (string)
  - uvStability (string)
  - antiFingerprint (boolean)
  - fireRating (string)
  - warranty (string)
- colourRange (array of objects: colourName, hexValue, swatchImage)
- features (array of strings)
- faq (array of objects: question (string), answer (text))
- relatedProducts (array of references to product)
- seoTitle (string)
- seoDescription (text)
- order (number, for sorting)

APPLICATION SCHEMA (application.ts):
- title, slug, heroImage, description (block content), gallery
- suitableProducts (array of references to product)
- roomType (string: Kitchen, Wardrobe, Commercial)
- designTips (block content)
- faq (array of objects: question, answer)
- seoTitle, seoDescription

BLOG POST SCHEMA (blogPost.ts):
- title, slug, featuredImage (image), publishedAt (datetime)
- author (string)
- categories (array of strings: Product Education, Kitchen Design, Maintenance, Industry Trends, Architect Guide)
- excerpt (text, max 300 chars)
- body (block content / portable text with support for images, code blocks, callouts)
- readingTime (number)
- faq (array of objects: question, answer)
- relatedPosts (array of references to blogPost)
- seoTitle, seoDescription

TESTIMONIAL SCHEMA (testimonial.ts):
- clientName, designation, company, quote (text), photo (image)
- rating (number 1-5), projectType (string)
- order (number)

FAQ SCHEMA (faq.ts):
- question (string), answer (text)
- category (string: Product, General, Maintenance, Technical)
- linkedProduct (reference to product, optional)

HOMEPAGE SETTINGS SCHEMA (homepageSettings.ts) — singleton:
- heroHeadline, heroSubheadline, heroCTAText
- heroImage (image), heroVideo (url, optional)
- trustBarItems (array of objects: number, label)
- featuredProducts (array of references to product)

SITE SETTINGS SCHEMA (siteSettings.ts) — singleton:
- companyName, phone, email, address, googleMapsEmbed
- socialLinks (object: instagram, linkedin, youtube, facebook)
- footerDescription (text)

3. Create sanity/schemas/index.ts that exports all schemas.
4. Update sanity.config.ts with the schema array.
5. Create lib/sanity.ts in the frontend with:
   - Sanity client configured with projectId, dataset, apiVersion, useCdn
   - GROQ query functions:
     * getAllProducts()
     * getProductBySlug(slug)
     * getAllApplications()
     * getApplicationBySlug(slug)
     * getAllBlogPosts(page, perPage)
     * getBlogPostBySlug(slug)
     * getAllTestimonials()
     * getFAQs(category?)
     * getFAQsByProduct(productSlug)
     * getHomepageSettings()
     * getSiteSettings()
   - Image URL builder using @sanity/image-url
   - All functions return properly typed data using types/sanity.ts
```

### Step 1.3 — Tailwind Config + shadcn/ui Components

**Paste into Claude Code sidebar:**

```
Set up the design system:

1. Update tailwind.config.ts with brand colors:
   navy: #1B2A4A, navy-light: #2C3E6B, copper: #B87333, copper-light: #C8A96E
   cream: #F5F1EB, cream-dark: #E8E2D8
   Font families: heading (Inter), body (DM Sans)

2. Set up shadcn/ui with New York style, neutral base color, CSS variables.
   Create these components in components/ui/:
   Button (copper primary, navy secondary, ghost, outline variants)
   Card, Dialog, Accordion, Tabs, Badge, Input, Textarea, Select
   Sheet (mobile menu), Separator, Skeleton

3. Create lib/utils.ts with cn() class merge helper.

4. Load Inter + DM Sans via next/font/google in app/layout.tsx.
```

### Step 1.4 — Schema Markup System + CRM Helper

**Paste into Claude Code sidebar:**

```
Create two critical utility files:

1. lib/schema.ts — JSON-LD schema generators:
   - generateOrganizationSchema(): Suraj Wood Products Pvt. Ltd., address in Bahadurgarh Haryana, phone +91-9999995553, sameAs links
   - generateProductSchema(product): from Sanity product data
   - generateLocalBusinessSchema(city?): Delhi factory + Bangalore office
   - generateFAQSchema(faqs): FAQPage schema from FAQ array
   - generateBreadcrumbSchema(items): BreadcrumbList
   - generateArticleSchema(post): for blog posts
   - generateWebSiteSchema(): homepage only, with SearchAction
   Create components/seo/SchemaMarkup.tsx that renders JSON-LD script tags.

2. lib/crm.ts — Perfex CRM submission helper:
   - submitLead(data) function that:
     a. POSTs to /api/lead (our Next.js API route, NOT directly to Perfex)
     b. Returns { success, leadId, message } or { success: false, error }
   - Type definitions for LeadFormData
   
3. app/api/lead/route.ts — Next.js API route:
   - Receives POST with lead form data
   - Server-side Zod validation
   - Honeypot field check
   - reCAPTCHA v3 verification (POST to google recaptcha verify API)
   - Forwards clean data to Perfex CRM: POST to PERFEX_API_URL with X-API-Key header
   - Returns JSON response
   - Logs errors

Environment variables used:
PERFEX_API_URL=https://crm.surajwood.com/api/leads/create
PERFEX_API_KEY=your-32-char-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret
```

---

## PHASE 2: BUILD CORE PAGES (Sprint 2-3, Weeks 3-6)

### Step 2.1 — Root Layout + Navigation + Footer

**Paste into Claude Code sidebar:**

```
Build app/layout.tsx and global layout components:

1. Root layout: lang="en", Inter + DM Sans fonts, metadata defaults, GA4/GTM scripts

2. Navbar (components/layout/Navbar.tsx):
   - Logo left, nav links center, "Request Quote" CTA button right
   - Links: Home, About, Products (dropdown: 5 products), Applications (dropdown: Kitchens, Wardrobes, Commercial), Blog, Contact
   - Mobile: hamburger → Sheet drawer
   - Sticky with backdrop blur on scroll
   - Fetch site settings from Sanity for phone/email display

3. Footer (components/layout/Footer.tsx):
   - 4 columns: About, Quick Links, Products, Contact
   - Social icons, Google Maps embed, copyright
   - Fetch from Sanity siteSettings

4. WhatsAppWidget (components/layout/WhatsAppWidget.tsx):
   - Fixed bottom-right, green icon, links to wa.me/919999995553
   - Animates in after 3 seconds delay

5. Organization schema on every page via SchemaMarkup in layout

Premium aesthetic: Navy + copper, lots of whitespace, elegant typography. Must look better than praveedh.com.
```

### Step 2.2 — Homepage

**Paste into Claude Code sidebar:**

```
Build app/page.tsx — the SurajWood homepage.

Fetch data from Sanity: getHomepageSettings(), getAllProducts(), getAllTestimonials(), getAllBlogPosts(1, 3)

8 sections:
1. HERO: 90vh, interior render background, gradient overlay, "Premium Acrylic Panels for Modern Indian Interiors", sub: "European Technology. Indian Manufacturing. Pan-India Delivery." Primary CTA: "Request Free Sample Kit" (dialog), Secondary: "Explore Collections" (scroll). Trust bar: "15+ Years | 50+ Shades | 10K+ Projects | Delhi & Bangalore". Framer Motion fade-up.

2. PRODUCT COLLECTIONS: "Our Collections" — 5 cards, responsive grid. Each: Sanity image, name, finish badge, description, "Explore" link. Hover: scale + shadow.

3. WHY SURAJ WOOD: 4-column icon grid. European Manufacturing | Premium Quality | Expert Support | Trusted Quality.

4. APPLICATION SHOWCASE: Tabs — Kitchens | Wardrobes | Commercial. Each tab: 2x2 image grid + brief copy.

5. TESTIMONIALS CAROUSEL: Auto-rotating. From Sanity testimonials. Quote, name, company, rating.

6. BLOG PREVIEW: Latest 3 posts from Sanity. Card: image, title, excerpt, reading time.

7. CTA BANNER: Copper/navy gradient. Inline form: name, phone, email, product interest. Submits via lib/crm.ts to Perfex.

8. Footer (from layout)

WebSite schema + Organization schema. Scroll-triggered Framer Motion animations per section.
```

### Step 2.3 — Product Page Template

**Paste into Claude Code sidebar:**

```
Build app/products/[slug]/page.tsx — dynamic product pages.

generateStaticParams() fetches all product slugs from Sanity.
generateMetadata() sets dynamic title/description from Sanity seoTitle/seoDescription.

Data: getProductBySlug(slug) from Sanity.

8 sections:
1. PRODUCT HERO: Large swatch image, product name, finish badge, description, "Request Quote" CTA, "Download Spec Sheet" (gated: email capture via Dialog + Fluent Form)

2. TECHNICAL SPECS ACCORDION: Expandable sections from Sanity technicalSpecs object. Material, Thickness, Dimensions, Surface Properties, Colour Range, Core Materials, Warranty.

3. APPLICATION GALLERY: Masonry grid from Sanity gallery[]. Lightbox on click.

4. COLOUR SELECTOR: Swatch grid from Sanity colourRange[]. Click to enlarge.

5. COMPARISON TABLE: Side-by-side with 1-2 related products. Fetch relatedProducts from Sanity.

6. FAQ SECTION: From Sanity product faq[]. Accordion component. FAQPage schema JSON-LD.

7. RELATED PRODUCTS: Horizontal scroll of related product cards.

8. STICKY MOBILE CTA: Fixed bottom bar on mobile — "Get Quote" | "Call Now" | "WhatsApp"

Schema: Product + FAQPage + BreadcrumbList. Make specs EXTREMELY detailed for AI crawlability.
```

### Step 2.4 — Contact Page

**Paste into Claude Code sidebar:**

```
Build app/contact/page.tsx with Perfex CRM-connected forms.

Two-column: LEFT = ContactForm, RIGHT = contact info + Google Maps.

ContactForm (components/forms/ContactForm.tsx) using React Hook Form + Zod:
Fields: full_name (req), email (req), phone (req, Indian 10-digit), company (optional), user_type (select: Architect/Designer/Homeowner/Dealer/OEM/Other), product_interest (multi-checkbox: 5 products), inquiry_type (select: Quote/Sample/Dealer/Technical/Other), message (optional), consent checkbox.
Hidden: source_page (window.location.href), utm_source/medium/campaign (from URL params), honeypot (hidden input).

On submit: Zod validate → loading spinner → POST to /api/lead → success toast + GA4 event 'lead_form_submit' → OR error toast.

Include LocalBusiness schema for Delhi + Bangalore.
```

### Step 2.5 — About / Manufacturing Page

**Paste into Claude Code sidebar:**

```
Build app/about/page.tsx — About & Manufacturing Story.

Sections: Hero, Our Story, Manufacturing Process (4-step timeline), Factory Stats (animated counters), Team, Certifications, CTA.

CRITICAL for AI/AEO: Make it fact-dense with specific details:
"PMMA (Polymethyl Methacrylate) acrylic bonded to 18mm MDF substrate using European flat lamination technology with German PUR hotmelt adhesive. Factory: 45 KM Stone, VPO Rohad, Bahadurgarh, Haryana 124501."

Organization schema + BreadcrumbList.
```

---

## PHASE 3: PSEO + BLOG + APPLICATIONS (Sprint 4-5, Weeks 7-10)

### Step 3.1 — PSEO Data Matrix + Template

**Paste into Claude Code sidebar:**

```
Build the Programmatic SEO system:

1. lib/pseo-data.ts — data matrix:
   5 products x 2 applications (kitchens, wardrobes) x 5 cities (Delhi, Mumbai, Bangalore, Hyderabad, Chennai) = 50 pages.
   Each entry: product info, application info, city-specific context (climate, design trends, dealer availability).
   Unique local context per city:
   - Delhi: "Engineered for extreme temp variations 45°C to 5°C"
   - Mumbai: "Moisture-resistant for high humidity coastal climate"
   - Bangalore: "Modern apartment aesthetic, tech-hub sensibility"
   - Hyderabad: "Growing luxury residential market"
   - Chennai: "Salt-air resistant for tropical coastal environment"
   Export getAllPSEOParams() and getPSEOData(product, application, city).

2. app/[product]/[application]/[city]/page.tsx:
   generateStaticParams() from getAllPSEOParams().
   Dynamic generateMetadata() with unique title/description per page.
   
   Sections: Breadcrumb, H1, unique intro (2-3 paragraphs with LOCAL context from pseo-data), product overview (fetch from Sanity), application benefits, local design trends section, image gallery, CTA form (pre-filled city + product), FAQ (3-5 city-specific), related PSEO pages.
   
   Schema: Product + LocalBusiness + FAQPage + BreadcrumbList.
   EVERY page must have genuinely unique content — not templated filler.
```

### Step 3.2 — Blog System

**Paste into Claude Code sidebar:**

```
Build the blog:

1. app/blog/page.tsx — Blog index:
   Fetch getAllBlogPosts() from Sanity. Grid of cards: image, title, excerpt, date, reading time, category badge. Pagination.

2. app/blog/[slug]/page.tsx — Single post:
   Fetch getBlogPostBySlug() from Sanity. Render Portable Text body with custom components for images, callouts. Table of contents from headings. Author bio, related posts, CTA banner at end.
   Article schema + BreadcrumbList.

3. Create 6 initial blog posts in Sanity Studio (populate after studio is deployed):
   - "Acrylic vs Laminate: Complete Guide for Indian Kitchens"
   - "2026 Kitchen Design Trends India"
   - "How to Clean High-Gloss Acrylic Panels"
   - "Acrylic Panel Thickness Guide: 1mm vs 1.5mm vs 3mm"
   - "Material Comparison: Acrylic vs PU vs Membrane vs Laminate"
   - "Architect's Guide to Specifying Acrylic Panels"
```

### Step 3.3 — Application Pages + FAQ + Dealer Pages

**Paste into Claude Code sidebar:**

```
Build remaining pages:

1. app/applications/[slug]/page.tsx — for kitchens, wardrobes, commercial.
   Fetch from Sanity. Hero, description, product recommendations, gallery, design tips, FAQ, CTA.

2. app/faq/page.tsx — All FAQs grouped by category.
   Fetch from Sanity getFAQs(). Accordion sections. FAQPage schema.

3. app/dealers/page.tsx — Dealer enquiry page.
   Hero, dealer form (specialized version of ContactForm with user_type pre-set to "Dealer"), benefits of becoming a dealer, contact info.
```

---

## PHASE 4: ANALYTICS + PERFORMANCE + SEO (Sprint 6-7, Weeks 11-14)

### Step 4.1 — Analytics + Revalidation

**Paste into Claude Code sidebar:**

```
Build analytics and content revalidation:

1. lib/analytics.ts — GA4 event helpers:
   trackLeadFormSubmit, trackSampleKitRequest, trackCatalogueDownload, trackWhatsAppClick, trackPhoneClick, trackProductView, trackPSEOPageView, trackColourSwatchClick, trackFAQExpand, trackScrollDepth, trackBlogReadComplete.

2. components/analytics/ScrollTracker.tsx — Intersection Observer for 25/50/75/90% scroll depth.

3. app/api/revalidate/route.ts — Webhook for Sanity:
   When content changes in Sanity, it POSTs to this endpoint → revalidatePath() for affected pages.
   Validate with a shared secret.

4. Configure Sanity webhook in Sanity Dashboard → API → Webhooks:
   URL: https://www.surajwood.com/api/revalidate
   Trigger on: create, update, delete
   Filter: _type in ["product", "blogPost", "testimonial", "faq", "application"]
```

### Step 4.2 — Performance + SEO Polish

**Paste into Claude Code sidebar:**

```
Final optimization pass:

1. All images: next/image, blur placeholders, WebP/AVIF, lazy loading below fold
2. Fonts: next/font/google with display swap, latin subset only
3. Third-party scripts: GA/GTM afterInteractive, reCAPTCHA only on form pages
4. Code splitting: dynamic() for heavy components (carousel, lightbox, map)
5. next-sitemap config: generate sitemap.xml + robots.txt, all 65+ pages
6. Redirects in next.config.js: /index.php→/, /about-us.php→/about, /products.php→/products/acrylux, /contact-us.php→/contact
7. Canonical tags on all pages via generateMetadata()
8. og:title, og:description, og:image on every page
9. Run tsc --noEmit, eslint fix, pnpm build — zero errors
10. Lighthouse audit: target 90+ on all metrics
```

---

## PHASE 5: PERFEX CRM SETUP ON GODADDY (Sprint 4, parallel)

### Step 5.1 — Deploy the Custom API Endpoint

This is done in GoDaddy cPanel, not in Antigravity:

```
1. Log into GoDaddy cPanel → File Manager
2. Navigate to your Perfex CRM installation root
3. Create folder: application/controllers/api/ (if doesn't exist)
4. Upload the Website_leads.php file (provided separately)
5. Edit the file and update:
   - ALLOWED_ORIGIN: 'https://www.surajwood.com'
   - API_KEY: Generate with a password generator (32 chars), save it
   - DEFAULT_ASSIGNED_STAFF: Your staff member ID from Perfex Admin
   - LEAD_SOURCE_WEBSITE: Create "Website" source in Perfex → Leads → Sources

6. Add routes to application/config/routes.php:
   $route['api/leads/create'] = 'api/website_leads/create';
   $route['api/leads/health'] = 'api/website_leads/health';

7. Create Custom Fields in Perfex Admin → Setup → Custom Fields → Leads:
   - User Type (Select): Architect, Interior Designer, Homeowner, Dealer, OEM, Other
   - Product Interest (Textarea): stores comma-separated product names
   - Source Page (Input): URL of the page that generated the lead
   - Inquiry Type (Select): Request Quote, Sample Kit, Dealer Enquiry, Technical Query, Other

8. Update custom field IDs in Website_leads.php → _save_custom_fields()

9. Test: curl https://crm.surajwood.com/api/leads/health
   Should return: {"status":"ok","service":"SurajWood Lead API"}
```

### Step 5.2 — Configure Perfex CRM for Lead Management

```
In Perfex CRM Admin:

1. Lead Sources: Add "Website", "PSEO Page", "Blog", "Social Media"
2. Lead Statuses: Configure Hot/Warm/Cold/Won/Lost
3. Email Templates: Create "Website Lead Welcome" email template
4. Auto-assign rules: Set default staff member for website leads
5. SMTP: Configure Brevo SMTP in Setup → Email → SMTP Settings
   Host: smtp-relay.brevo.com, Port: 587, Username: your-brevo-login
```

---

## PHASE 6: DEPLOYMENT (Sprint 8-9, Weeks 15-18)

### Step 6.1 — Deploy Sanity Studio

```bash
cd sanity
npx sanity deploy
# Choose hostname: surajwood (→ surajwood.sanity.studio)
```

### Step 6.2 — Deploy Frontend to Vercel

```bash
cd frontend
pnpm install -g vercel
vercel login
vercel --prod
```

Set environment variables in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-read-token
PERFEX_API_URL=https://crm.surajwood.com/api/leads/create
PERFEX_API_KEY=your-32-char-key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

### Step 6.3 — Configure Cloudflare DNS

```
1. Sign up at cloudflare.com, add surajwood.com
2. GoDaddy: Change nameservers to Cloudflare's (instructions provided by CF)
3. DNS Records in Cloudflare:
   - www  CNAME  cname.vercel-dns.com  (proxied)
   - @    CNAME  cname.vercel-dns.com  (proxied)
   - crm  A      [your-godaddy-server-ip]  (proxied)
4. SSL: Full (Strict)
5. Enable: Always HTTPS, HSTS, Auto Minify, Brotli
6. Caching: Standard rules
```

### Step 6.4 — Vercel Domain Setup

```
Vercel Dashboard → Project → Settings → Domains:
- Add: www.surajwood.com
- Add: surajwood.com (redirects to www)
```

---

## PHASE 7: QA + LAUNCH (Sprint 9-10, Weeks 17-20)

### Step 7.1 — Final QA

**Paste into Claude Code sidebar:**

```
Run comprehensive QA:
1. tsc --noEmit — zero type errors
2. eslint . --fix — zero lint errors
3. pnpm build — zero build errors, all 65+ pages generated
4. Every page: unique <title>, unique <meta description>, og tags, JSON-LD schema, BreadcrumbList, proper H1-H6 hierarchy, all images have alt text
5. All forms: submit to /api/lead → create lead in Perfex CRM → GA4 event fires
6. Mobile: test at 360px width, sticky CTA bar, hamburger menu, tap targets >48px
7. next-sitemap: verify XML sitemap is correct
8. 301 redirects: test all old .php URLs
9. Schema: validate with Google Rich Results Test for homepage, product page, PSEO page, blog post
10. Lighthouse: homepage >90 on all metrics
11. Sanity webhook: change a product in Sanity Studio → verify frontend updates within 60 seconds
12. Perfex CRM: submit test lead → verify it appears with correct tags, status, custom fields
```

---

## SPRINT-BY-PROMPT SUMMARY

| Sprint | Week | What to Build |
|--------|------|---------------|
| 0 | 1 | Accounts, CLAUDE.md, project scaffold |
| 1 | 2 | Sanity schemas, Tailwind config, shadcn/ui, API clients |
| 2 | 3-4 | Root layout, Navbar, Footer, WhatsApp widget, Homepage |
| 3 | 5-6 | About page, all 5 Product pages, Contact page |
| 4 | 7-8 | PSEO data matrix + 50 pages, Blog system, Perfex API deploy |
| 5 | 9-10 | Application pages, Dealer page, FAQ page |
| 6 | 11-12 | Analytics, CRM workflows, ISR webhook, Sanity webhook |
| 7 | 13-14 | Performance optimization, schema audit, sitemap, redirects |
| 8 | 15-16 | Deploy Sanity Studio + Vercel + Cloudflare DNS |
| 9 | 17-18 | Full QA, Lighthouse, content entry in Sanity, GBP setup |
| 10 | 19-20 | Bug fixes, handover docs, training, 90-day forward plan |

---

## ANTIGRAVITY + CLAUDE CODE TIPS

- **Planning Mode** for architecture work (full pages, Sanity schemas, CRM integration)
- **Fast Mode** for quick fixes (TypeScript errors, styling tweaks, copy changes)
- **Parallel agents**: Use Antigravity Manager to run Claude Code on frontend while Gemini 3 works on Sanity schema definitions or test data
- **@-mentions**: `@lib/sanity.ts add a query for fetching FAQs by product slug`
- **Commit after each feature**: `git add -A && git commit -m "feat: product page template"`
- **Test locally**: `pnpm dev` → localhost:3000
- **Build before deploy**: `pnpm build` catches all SSG/ISR errors

---

*Every prompt box in this document can be copied directly into the Claude Code sidebar in Google Antigravity.*
