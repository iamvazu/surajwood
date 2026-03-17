# SurajWood Full Build Walkthrough
## Using Claude Code inside Google Antigravity IDE

**From PRD to Production in 10 Sprints**

---

## Your Setup (Based on Your Screenshot)

You have Google Antigravity IDE (Google's agent-first IDE, a VS Code fork) with the **Claude Code for VS Code** extension (v2.1.77) installed. The Agent sidebar on the right shows Claude Code ready to accept prompts. You also have access to Gemini 3 Flash via Antigravity's native agent. This is an excellent setup because you can use Claude Code (powered by Claude Opus/Sonnet) for complex architectural work and Gemini for quick edits.

---

## PHASE 0: ENVIRONMENT SETUP (Day 1)

### Step 0.1 — Prerequisites to Install on Your Machine

Open a terminal in Antigravity (Terminal > New Terminal or Ctrl+`) and run these:

```bash
# Check Node.js (need 18+)
node --version

# If not installed, download from https://nodejs.org (LTS version)
# Or use nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20

# Check npm
npm --version

# Install pnpm (faster than npm, recommended for Next.js)
npm install -g pnpm

# Check Git
git --version

# If not installed: https://git-scm.com/download/win
```

### Step 0.2 — Create Your Project Folder

```bash
# Create a workspace folder
mkdir C:\Projects\surajwood
cd C:\Projects\surajwood

# Initialize git
git init
```

### Step 0.3 — Open the Folder in Antigravity

In Antigravity, click **"Open Folder"** (you can see this button in your screenshot on the left panel) and navigate to `C:\Projects\surajwood`.

### Step 0.4 — Create the CLAUDE.md File (CRITICAL)

This is the most important file for Claude Code. It tells Claude about your project context. In Antigravity, create a new file called `CLAUDE.md` in the root of your project.

**Click on the Claude Code Agent sidebar (right panel in your screenshot) and type:**

```
Create a CLAUDE.md file in the project root with the following content for a SurajWood website project:

Project: SurajWood.com - Premium Acrylic Panel Manufacturer Website
Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + WordPress Headless CMS + FluentCRM
Architecture: Headless - React frontend consuming WordPress REST/GraphQL API

## Project Structure
- /surajwood-frontend - Next.js 14 app (App Router, TypeScript, Tailwind, shadcn/ui)
- /surajwood-cms - WordPress headless CMS (ACF Pro, WPGraphQL, FluentCRM)

## Key Rules
1. Always use TypeScript strict mode
2. Use Next.js App Router (not Pages Router)
3. All components use Tailwind CSS utility classes only (no custom CSS files)
4. Use shadcn/ui for base components (Radix primitives)
5. All images through next/image with WebP format
6. Every page must have JSON-LD schema markup via a SchemaMarkup component
7. Forms use React Hook Form + Zod validation
8. All API calls to WordPress go through lib/wordpress.ts
9. CRM submissions go through /api/lead route to WordPress FluentCRM endpoint
10. Follow the 15-page sitemap + 50 PSEO pages architecture from the PRD

## Brand
- Primary Color: #1B2A4A (Navy)
- Accent Color: #B87333 (Copper)
- Font: Inter (headings) + DM Sans (body)
- Products: ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, ACRYGLASS MATTE

## Performance Targets
- Lighthouse Performance > 90
- LCP < 2.0s
- CLS < 0.1
- Total JS < 200KB gzipped
```

---

## PHASE 1: SCAFFOLD THE FRONTEND (Sprint 1, Weeks 1-2)

### Step 1.1 — Create Next.js App

**Prompt to Claude Code in Antigravity sidebar:**

```
Create a new Next.js 14 project with App Router in a folder called "surajwood-frontend" with:
- TypeScript strict mode
- Tailwind CSS v3
- ESLint
- pnpm as package manager
- src/ directory disabled (use app/ at root)
- Import alias @/ mapped to root

After creating, install these additional dependencies:
- @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip
- react-hook-form @hookform/resolvers zod
- framer-motion
- lucide-react
- next-sitemap
- sharp (for next/image optimization)
- class-variance-authority clsx tailwind-merge

Then set up the folder structure:
app/
  layout.tsx
  page.tsx
  about/page.tsx
  products/[slug]/page.tsx
  applications/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  contact/page.tsx
  dealers/page.tsx
  faq/page.tsx
  [product]/[application]/[city]/page.tsx  (PSEO pages)
  api/lead/route.ts
  api/revalidate/route.ts
components/
  ui/        (shadcn components)
  sections/  (Hero, ProductGrid, Testimonials, etc.)
  seo/       (SchemaMarkup, MetaTags, Breadcrumb)
  forms/     (ContactForm, SampleRequestForm, DealerForm)
  layout/    (Navbar, Footer, MobileMenu, WhatsAppWidget)
lib/
  wordpress.ts   (WP API client)
  schema.ts      (JSON-LD generators)
  crm.ts         (CRM submission helper)
  analytics.ts   (GA4 event helpers)
  pseo-data.ts   (PSEO matrix data)
  utils.ts       (cn() helper, formatters)
types/
  wordpress.ts   (WP API response types)
  product.ts     (Product type definitions)
  form.ts        (Form schemas)
```

### Step 1.2 — Set Up Tailwind Config with Brand Colors

**Prompt to Claude Code:**

```
Update tailwind.config.ts in surajwood-frontend with:

Brand colors:
- navy: #1B2A4A (primary)
- navy-light: #2C3E6B
- copper: #B87333 (accent)
- copper-light: #C8A96E
- cream: #F5F1EB (backgrounds)
- cream-dark: #E8E2D8

Font families:
- heading: Inter
- body: DM Sans

Add @next/font imports for Inter and DM Sans in app/layout.tsx

Custom animations:
- fadeIn, slideUp, slideInLeft (for Framer Motion integration)

Extend the theme with custom spacing and container settings for the design system.
```

### Step 1.3 — Create the shadcn/ui Base Components

**Prompt to Claude Code:**

```
Set up shadcn/ui in the project. Initialize it with:
- Style: New York
- Base color: Neutral
- CSS variables: yes

Then create these components using the shadcn/ui CLI pattern (manually, since we're headless):
- Button (primary copper, secondary navy, ghost, outline variants)
- Card
- Dialog (for modal forms)
- Accordion (for product specs and FAQ)
- Tabs (for application showcase)
- Badge (for finish type labels like "Satin", "Matte", "High Gloss")
- Input, Textarea, Select (form elements)
- Sheet (for mobile menu drawer)
- Separator
- Skeleton (loading states)

Each component should use the cn() utility from lib/utils.ts for class merging.
```

### Step 1.4 — Build the WordPress API Client

**Prompt to Claude Code:**

```
Create lib/wordpress.ts - a typed WordPress REST API client for our headless setup.

The WordPress CMS is at https://cms.surajwood.com (will be configured later).
Use NEXT_PUBLIC_WP_API_URL environment variable.

Create these async functions with full TypeScript types:

1. getProducts() - fetches all sw_product custom post type entries with ACF fields
2. getProductBySlug(slug) - single product with all ACF fields (specs, gallery, faq, colors)
3. getApplications() - all sw_application entries
4. getApplicationBySlug(slug) - single application
5. getPSEOPages() - all sw_pseo entries for static generation
6. getPSEOPage(product, application, city) - single PSEO page data
7. getTestimonials() - all sw_testimonial entries
8. getFAQs(productId?) - FAQs, optionally filtered by product
9. getPosts(page, perPage) - blog posts with pagination
10. getPostBySlug(slug) - single blog post
11. getHomepageData() - aggregated data for homepage (featured products, latest posts, testimonials)

Each function should:
- Use fetch with next: { revalidate: X } for ISR
- Return properly typed responses
- Handle errors gracefully with try/catch
- Include a WPResponse<T> generic wrapper type

Also create types/wordpress.ts with interfaces for:
WPProduct, WPApplication, WPPSEOPage, WPTestimonial, WPFAQ, WPPost, WPMedia
```

### Step 1.5 — Create the Schema Markup System

**Prompt to Claude Code:**

```
Create lib/schema.ts - JSON-LD schema generators for SEO.

Create these functions that return valid JSON-LD objects:

1. generateOrganizationSchema() - Suraj Wood Products Pvt. Ltd.
   - name, url, logo, description, telephone: +91-9999995553
   - address: 45 KM Stone, VPO Rohad, Bahadurgarh, Haryana 124501
   - sameAs: [LinkedIn, Instagram, IndiaMART URLs]

2. generateProductSchema(product: WPProduct) - for each product page
   - name, description, image, brand: "Suraj Wood"
   - material, offers with priceCurrency: INR

3. generateLocalBusinessSchema(city?) - for contact and PSEO pages
   - Two locations: Delhi (factory) and Bangalore

4. generateFAQSchema(faqs: WPFAQ[]) - for FAQ sections
   - mainEntity array with Question/Answer pairs

5. generateBreadcrumbSchema(items: {name, url}[]) - for all pages

6. generateArticleSchema(post: WPPost) - for blog posts

7. generateWebSiteSchema() - for homepage only (with SearchAction)

Then create components/seo/SchemaMarkup.tsx - a React component that:
- Accepts a schemas prop (array of schema objects)
- Renders them as <script type="application/ld+json"> in the page head
- Used in every page layout
```

---

## PHASE 2: BUILD CORE PAGES (Sprint 2-3, Weeks 3-6)

### Step 2.1 — Root Layout with Navigation

**Prompt to Claude Code:**

```
Build the root app/layout.tsx with:

1. HTML metadata: lang="en", charset, viewport
2. Font loading: Inter + DM Sans via next/font/google
3. Global Navbar component (components/layout/Navbar.tsx):
   - Logo (left)
   - Nav links: Home, About, Products (dropdown with 5 products), Applications (dropdown), Blog, Contact
   - CTA button: "Request Quote" (opens dialog modal)
   - Mobile: hamburger menu using Sheet component
   - Sticky on scroll with backdrop blur

4. Global Footer component (components/layout/Footer.tsx):
   - 4 columns: About (logo + description), Quick Links, Products, Contact Info
   - Phone: +91-9999995553, Email: sales@surajwood.com
   - Address: Bahadurgarh, Haryana
   - Social icons: Instagram, LinkedIn
   - Copyright bar

5. WhatsApp floating widget (components/layout/WhatsAppWidget.tsx):
   - Fixed bottom-right green WhatsApp icon
   - Links to wa.me/919999995553 with pre-filled message
   - Animate in after 3 seconds

6. Google Analytics: Load GA4 via next/script with GTM container

7. Organization schema on every page via SchemaMarkup component

The layout should be clean, premium, minimal - think high-end European furniture brand aesthetic.
Navy (#1B2A4A) and copper (#B87333) accent palette. Lots of whitespace.
```

### Step 2.2 — Homepage

**Prompt to Claude Code:**

```
Build app/page.tsx - the SurajWood homepage. This is the most important page.

Use getHomepageData() from lib/wordpress.ts (mock the data for now with realistic content).

Sections in order:

1. HERO SECTION
   - Full-width, 90vh height
   - Background: high-quality kitchen interior image (use placeholder from Unsplash for now)
   - Overlay gradient (navy to transparent)
   - Headline: "Premium Acrylic Panels for Modern Indian Interiors"
   - Sub-headline: "European Technology. Indian Manufacturing. Pan-India Delivery."
   - Primary CTA: "Request Free Sample Kit" (opens dialog with SampleRequestForm)
   - Secondary CTA: "Explore Collections" (scrolls to products section)
   - Trust bar below hero: "15+ Years | 50+ Shades | 10K+ Projects | Delhi & Bangalore"
   - Animate elements in with Framer Motion (fade up on load)

2. PRODUCT COLLECTIONS (components/sections/ProductGrid.tsx)
   - Section heading: "Our Collections"
   - 5 product cards in a responsive grid (3 on desktop, 2 on tablet, 1 on mobile)
   - Each card: product image, name, finish type badge, brief description, "Explore" link
   - Cards: ACRYLUX (Satin), ACRYSILK (Soft Satin), ACRYMATTE (Matte), ACRYGLASS (High Gloss), ACRYGLASS MATTE (Matte Glass)
   - Hover effect: subtle scale + shadow

3. WHY SURAJ WOOD (components/sections/WhyChooseUs.tsx)
   - 4-column grid with icons (Lucide icons)
   - European Manufacturing | Premium Surface Quality | 24/7 Expert Support | Quality You Can Trust
   - Each with icon, title, 2-line description

4. APPLICATION SHOWCASE (components/sections/ApplicationShowcase.tsx)
   - Tabs component: Kitchens | Wardrobes | Commercial
   - Each tab: 2x2 image grid with room renders + brief description

5. TESTIMONIALS (components/sections/TestimonialCarousel.tsx)
   - Auto-rotating carousel (pause on hover)
   - Each testimonial: quote, name, designation, company, star rating
   - Use mock data for 4-5 testimonials from architects and designers

6. BLOG PREVIEW (components/sections/BlogPreview.tsx)
   - Latest 3 posts as cards: featured image, title, excerpt, reading time, "Read More"

7. CTA BANNER (components/sections/CTABanner.tsx)
   - Full-width copper/navy gradient banner
   - "Ready to transform your space?"
   - Inline form: name, phone, email, product interest dropdown
   - Submits to /api/lead endpoint

8. FOOTER (already in layout)

Make it beautiful. This needs to look BETTER than praveedh.com. Premium, spacious, elegant.
Use Framer Motion for scroll-triggered animations on each section.
```

### Step 2.3 — About / Manufacturing Page

**Prompt to Claude Code:**

```
Build app/about/page.tsx - the About & Manufacturing Story page.

Sections:
1. Hero with headline: "Crafting India's Premium Acrylic Surfaces"
2. Our Story section: founding story, European technology partnership, manufacturing excellence
3. Manufacturing Process: 4-step visual timeline (Material Sourcing > Bonding > Quality Control > Finishing)
4. Factory Stats: animated counter numbers (15+ Years, 50+ Shades, 10K+ Projects, 2 Locations)
5. Our Team: brief section with Mayank Singhal & Dhruv as Directors
6. Quality Certifications section (placeholder for ISO, fire safety)
7. CTA: "Visit Our Factory" or "Request Samples"

Include Organization schema + BreadcrumbList schema.
This page is crucial for AI/AEO - make it FACT-DENSE with specific details:
- "PMMA (Polymethyl Methacrylate) acrylic bonded to 18mm MDF substrate"
- "European flat lamination technology using German PUR hotmelt adhesive"
- "Factory: 45 KM Stone, VPO Rohad, Bahadurgarh, Haryana"
```

### Step 2.4 — Product Page Template

**Prompt to Claude Code:**

```
Build app/products/[slug]/page.tsx - the dynamic product page template.

This page renders for: acrylux, acrysilk, acrymatte, acryglass, acryglass-matte

Use generateStaticParams() to pre-build all 5 pages.
Use getProductBySlug() for data (mock with realistic data for now).

Sections:
1. PRODUCT HERO
   - Large product swatch image + product name + finish type badge
   - 2-line description
   - CTA: "Request Quote" + "Download Spec Sheet" (gated - email required)

2. TECHNICAL SPECS ACCORDION (using Accordion component)
   - Material Composition
   - Thickness & Dimensions (8ft x 4ft standard)
   - Surface Properties (scratch resistance, UV stability, anti-fingerprint)
   - Colour Range
   - Core Material Options
   - Warranty Information

3. APPLICATION GALLERY
   - Masonry grid of 6-8 interior renders showing product in context
   - Lightbox on click (use Dialog component)

4. COLOUR SELECTOR
   - Visual swatch grid of all available colours
   - Click to enlarge
   - Each swatch: color name, hex value, availability

5. PRODUCT COMPARISON TABLE
   - Side-by-side with 1-2 other Suraj Wood products
   - Compare: finish, thickness, scratch resistance, UV stability, ideal use

6. FAQ SECTION (components/sections/ProductFAQ.tsx)
   - 5-8 product-specific FAQs in Accordion
   - Rendered with FAQPage schema JSON-LD

7. RELATED PRODUCTS
   - Horizontal scroll of other product cards

8. STICKY MOBILE CTA
   - Fixed bottom bar on mobile: "Get Quote" | "Call Now" | "WhatsApp"
   - Only shows on scroll

Include Product schema + FAQPage schema + BreadcrumbList schema.
Make technical specs EXTREMELY detailed for AI crawlability.
```

### Step 2.5 — Contact Page with CRM Integration

**Prompt to Claude Code:**

```
Build app/contact/page.tsx with full CRM-connected forms.

The page has:
1. Hero section: "Get in Touch"
2. Two-column layout:
   LEFT: Contact form (components/forms/ContactForm.tsx)
   RIGHT: Contact info + Google Maps embed

ContactForm fields (using React Hook Form + Zod):
- full_name (required, min 2 chars)
- email (required, valid email)
- phone (required, Indian phone format validation: 10 digits)
- company (optional)
- user_type (select: Architect, Interior Designer, Homeowner, Dealer, OEM Manufacturer, Other)
- product_interest (multi-select checkboxes: ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, ACRYGLASS MATTE)
- inquiry_type (select: Request Quote, Sample Kit, Dealer Enquiry, Technical Query, Other)
- message (textarea, optional)
- consent checkbox: "I agree to receive communications from Suraj Wood"

Hidden fields (auto-populated):
- source_page: current URL (window.location.href)
- utm_source, utm_medium, utm_campaign: from URL params

On submit:
1. Client-side Zod validation
2. Show loading spinner on button
3. POST to /api/lead with form data
4. On success: show thank-you message, fire GA4 event 'lead_form_submit'
5. On error: show error toast

Also build app/api/lead/route.ts:
- Receives POST with form data
- Validates with Zod server-side
- Honeypot field check (hidden input, reject if filled)
- reCAPTCHA v3 verification (using RECAPTCHA_SECRET_KEY env var)
- Forwards to WordPress: POST https://cms.surajwood.com/wp-json/surajwood/v1/lead
  with X-SW-API-Key header
- Returns { success: true, message: "..." }

Include LocalBusiness schema for Delhi + Bangalore.
```

---

## PHASE 3: PSEO PAGES + BLOG (Sprint 4-5, Weeks 7-10)

### Step 3.1 — PSEO Data Matrix

**Prompt to Claude Code:**

```
Create lib/pseo-data.ts - the Programmatic SEO data matrix.

Define the matrix:
- 5 products: acrylux, acrysilk, acrymatte, acryglass, acryglass-matte
- 2 applications: kitchens, wardrobes
- 5 cities: delhi, mumbai, bangalore, hyderabad, chennai

Total: 5 x 2 x 5 = 50 pages

For each combination, define:
{
  product: { slug, name, finishType, description },
  application: { slug, name, benefits[] },
  city: { slug, name, state, climateNote, designTrend, dealerAvailability },
  seo: {
    title: "[Product] [Finish] Acrylic [Application] Panels in [City] | Suraj Wood",
    description: "Premium [Product] acrylic panels for [application] in [City]. [climateNote]. Contact our [City] team for samples and quotes.",
    h1: "Premium [Product] Acrylic Panels for [Application] in [City]"
  }
}

Include unique local context for each city:
- Delhi: "Engineered for North India's extreme temperature variations from 45°C summers to 5°C winters"
- Mumbai: "Moisture-resistant finish ideal for Mumbai's high humidity coastal climate"
- Bangalore: "Perfect for Bangalore's modern apartment aesthetic and tech-hub design sensibility"
- Hyderabad: "Growing demand in Hyderabad's expanding luxury residential market"
- Chennai: "Salt-air resistant properties ideal for Chennai's tropical coastal environment"

Export a function getAllPSEOParams() that returns all 50 combinations for generateStaticParams().
Export a function getPSEOData(product, application, city) for individual page data.
```

### Step 3.2 — PSEO Page Template

**Prompt to Claude Code:**

```
Build app/[product]/[application]/[city]/page.tsx - the PSEO page template.

Use generateStaticParams() with getAllPSEOParams() to pre-build all 50 pages.
Use generateMetadata() for dynamic SEO meta tags.

Page structure:
1. Breadcrumb: Home > Products > [Product] > [Application] > [City]
2. H1: "Premium [Product] Acrylic Panels for [Application] in [City]"
3. Introduction: 2-3 paragraphs with unique local context (from pseo-data.ts)
4. Product overview section (pulled from product data)
5. Application benefits section (why this product for this room type)
6. Local context section: "[City] [Application] Design Trends"
7. Image gallery: 4-6 contextual images
8. CTA form: pre-filled with city and product interest
9. FAQ: 3-5 questions specific to this combination (with FAQPage schema)
10. Related pages: links to same product in other cities + same city other products
11. Internal links to parent product page and application page

Schema: Product + LocalBusiness + FAQPage + BreadcrumbList

CRITICAL: Each page must have genuinely unique content in the introduction and local context sections. NOT templated filler. Use the city-specific data from pseo-data.ts.
```

### Step 3.3 — Blog System

**Prompt to Claude Code:**

```
Build the blog system:

1. app/blog/page.tsx - Blog index with pagination
   - Grid of post cards (featured image, title, excerpt, date, reading time, category badge)
   - "Load More" button or pagination
   - Uses getPosts(page, perPage) from wordpress.ts

2. app/blog/[slug]/page.tsx - Individual blog post
   - Hero: featured image + title + date + author + reading time
   - Article body: rendered from WordPress HTML content
   - Table of contents (auto-generated from H2/H3 headings)
   - Author bio card at bottom
   - Related posts (3 cards)
   - CTA banner at end: "Interested in acrylic panels? Request a sample kit."
   - Article schema + BreadcrumbList schema

3. Create 6 mock blog posts in the WordPress API mock data:
   - "Acrylic vs Laminate: The Complete Guide for Indian Kitchens"
   - "2026 Kitchen Design Trends India"
   - "How to Clean High-Gloss Acrylic Kitchen Panels"
   - "Acrylic Panel Thickness Guide: 1mm vs 1.5mm vs 3mm"
   - "Modular Kitchen Material Comparison: Acrylic vs PU vs Membrane vs Laminate"
   - "Architect's Guide to Specifying Acrylic Panels"
```

---

## PHASE 4: CRM + ANALYTICS + PERFORMANCE (Sprint 6-7, Weeks 11-14)

### Step 4.1 — Analytics Integration

**Prompt to Claude Code:**

```
Create the complete analytics integration:

1. lib/analytics.ts - GA4 event helper functions:
   - trackLeadFormSubmit(formType, productInterest, city, userType)
   - trackSampleKitRequest(productInterest, city)
   - trackCatalogueDownload(productName, userEmail)
   - trackWhatsAppClick(pageUrl, productInterest)
   - trackPhoneClick(pageUrl)
   - trackProductView(productSlug, sourcePage)
   - trackPSEOPageView(product, application, city)
   - trackColourSwatchClick(productSlug, colourName)
   - trackFAQExpand(questionText, pageUrl)
   - trackScrollDepth(pageUrl, threshold)
   - trackBlogReadComplete(postSlug, readingTime)

   All functions use window.gtag() with proper event parameters.

2. components/analytics/ScrollTracker.tsx - client component
   - Tracks 25%, 50%, 75%, 90% scroll depth
   - Uses Intersection Observer API
   - Fires GA4 events at each threshold

3. Update app/layout.tsx to include:
   - Google Tag Manager container script (via next/script strategy="afterInteractive")
   - Google Analytics 4 gtag.js

Use environment variables: NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID
```

### Step 4.2 — ISR Revalidation Webhook

**Prompt to Claude Code:**

```
Build app/api/revalidate/route.ts - the ISR revalidation endpoint.

When WordPress content is updated, it sends a webhook to this endpoint
to trigger Next.js on-demand revalidation.

Logic:
1. Receive POST with { secret, paths[], type } from WordPress
2. Validate secret against WP_REVALIDATION_SECRET env var
3. Based on type:
   - "product": revalidate /products/[slug] + all PSEO pages containing that product
   - "post": revalidate /blog + /blog/[slug] + homepage (blog preview)
   - "testimonial": revalidate homepage
   - "faq": revalidate relevant product page + FAQ page
   - "all": revalidate everything
4. Use revalidatePath() from next/cache
5. Return { revalidated: true, paths: [...] }
```

### Step 4.3 — Performance Optimization

**Prompt to Claude Code:**

```
Optimize the entire project for performance. Go through every page and component:

1. Images:
   - All images use next/image with width, height, sizes props
   - Hero images: priority={true}, fetchPriority="high"
   - Below-fold images: loading="lazy" (default)
   - Placeholder: "blur" with blurDataURL for above-fold images
   - Format: automatically served as WebP/AVIF by Next.js

2. Fonts:
   - Inter and DM Sans loaded via next/font/google with display: "swap"
   - Subset: "latin" only
   - Preload critical font weights only (400, 500, 600, 700)

3. Third-party scripts:
   - GA/GTM: strategy="afterInteractive"
   - reCAPTCHA: loaded only on pages with forms (dynamic import)
   - WhatsApp widget: loaded after 3s delay

4. Code splitting:
   - Heavy components (testimonial carousel, image lightbox) use dynamic() import
   - Form components use dynamic() with ssr: false

5. Metadata:
   - Every page has proper <title>, <meta description>, og:image
   - next-sitemap configured for automatic sitemap.xml generation
   - robots.txt: allow all, block /api/

6. Run Lighthouse audit and fix any issues below 90 score.
```

---

## PHASE 5: WORDPRESS CMS SETUP (Sprint 3-4, Parallel Track)

### Step 5.1 — WordPress Server Setup

This part is done outside Antigravity, on your server. Here are the exact commands:

```bash
# On a DigitalOcean Droplet (Ubuntu 22.04, 2GB RAM)
# Or use RunCloud/GridPane for managed WordPress

# SSH into server
ssh root@your-server-ip

# Install LEMP stack
apt update && apt upgrade -y
apt install nginx mysql-server php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip php8.2-gd php8.2-imagick -y

# Download WordPress
cd /var/www
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
mv wordpress cms.surajwood.com
chown -R www-data:www-data cms.surajwood.com

# Configure Nginx for headless (API-only)
# Create /etc/nginx/sites-available/cms.surajwood.com
# Point to /var/www/cms.surajwood.com
# Enable SSL with Let's Encrypt (certbot)

# Set up MySQL database
mysql -u root -p
CREATE DATABASE surajwood_cms;
CREATE USER 'surajwood'@'localhost' IDENTIFIED BY 'your-secure-password';
GRANT ALL ON surajwood_cms.* TO 'surajwood'@'localhost';
FLUSH PRIVILEGES;

# Complete WordPress installation at https://cms.surajwood.com/wp-admin
```

### Step 5.2 — Install Required Plugins

In WordPress Admin (https://cms.surajwood.com/wp-admin):

```
Install and activate these plugins in this order:

1. Advanced Custom Fields (ACF) Pro - upload from acf.com license
2. WPGraphQL - install from wp.org
3. WPGraphQL for ACF - install from wp.org
4. FluentCRM (free) + FluentCRM Pro - from fluentcrm.com
5. Fluent Forms + Fluent Forms Pro - from fluentforms.com
6. WP Mail SMTP - configure with Brevo SMTP
7. Wordfence - security
8. UpdraftPlus - backups
9. WP REST Cache - API performance
10. Redirection - 301 redirects from old .php URLs
11. Jetstyle headless theme - or any blank API-only theme
```

### Step 5.3 — Configure ACF Custom Post Types

**Go back to Antigravity and prompt Claude Code:**

```
Generate the ACF field group JSON export files for importing into WordPress ACF.
Create one JSON file per Custom Post Type that I can import via ACF > Tools > Import.

1. sw_product (Products):
   Fields: hero_image (image), gallery (gallery), finish_type (select: satin/soft-satin/matte/high-gloss/matte-glass), ideal_for (checkbox: kitchens/wardrobes/commercial/offices), thickness (text), dimensions (text), material_composition (textarea), surface_properties (textarea), colour_range (repeater: colour_name, hex_value, swatch_image), technical_specs (group: scratch_resistance, uv_stability, anti_fingerprint, fire_rating, warranty), faq (repeater: question, answer), related_products (relationship), seo_title (text), seo_description (textarea)

2. sw_application (Applications):
   Fields: hero_image, description (wysiwyg), gallery, suitable_products (relationship to sw_product), room_type (select), design_tips (wysiwyg), faq (repeater)

3. sw_testimonial (Testimonials):
   Fields: client_name, designation, company, quote (textarea), photo (image), rating (number 1-5), project_type (text)

4. sw_faq (FAQs):
   Fields: question (text), answer (wysiwyg), category (select: product/general/maintenance/technical), linked_product (relationship to sw_product)

Generate the JSON files in /surajwood-cms/acf-exports/ folder.
```

### Step 5.4 — Create Custom REST API Endpoint for Lead Submission

**Prompt to Claude Code:**

```
Create a WordPress plugin file: surajwood-cms/wp-content/plugins/surajwood-crm-bridge/surajwood-crm-bridge.php

This plugin:
1. Registers a custom REST endpoint: POST /wp-json/surajwood/v1/lead
2. Validates the X-SW-API-Key header against a constant defined in wp-config.php
3. Receives lead data: full_name, email, phone, company, user_type, product_interest[], inquiry_type, city, source_page, utm_source, message, consent
4. Creates a new FluentCRM contact via FluentCRM's PHP API:
   - Set name, email, phone
   - Add tags based on: user_type, product_interest items, city, source (if from PSEO page: 'pseo-lead')
   - Assign to pipeline/list based on inquiry_type
   - Trigger the welcome email automation sequence
5. Also registers: POST /wp-json/surajwood/v1/revalidate
   - Calls the Next.js revalidation endpoint when content is published/updated
   - Uses the wp_after_insert_post action hook

Include proper error handling, input sanitization, and response formatting.
```

---

## PHASE 6: SEO POLISH + LAUNCH (Sprint 8-9, Weeks 15-18)

### Step 6.1 — Sitemap + Robots + Redirects

**Prompt to Claude Code:**

```
Configure next-sitemap in the project:

1. Create next-sitemap.config.js:
   - siteUrl: https://www.surajwood.com
   - generateRobotsTxt: true
   - robotsTxtOptions: disallow ['/api/', '/cms/']
   - Include all static pages
   - Include all 50 PSEO pages via additionalPaths
   - Include all blog post URLs fetched from WP API
   - Change frequency: product pages weekly, PSEO monthly, blog weekly, homepage daily

2. Create public/robots.txt as fallback

3. Create next.config.js redirects array:
   Map all old surajwood.com URLs to new routes:
   - /index.php -> /
   - /about-us.php -> /about
   - /products.php -> /products/acrylux (default to first product)
   - /contact-us.php -> /contact
   - /design-your-own-interior.php -> /applications/kitchens
   All as permanent (308) redirects.

4. Add proper canonical tags to all pages via generateMetadata().
```

### Step 6.2 — Final QA Prompt

**Prompt to Claude Code:**

```
Run a comprehensive QA check on the entire project:

1. TypeScript: Run tsc --noEmit and fix ALL type errors
2. Lint: Run eslint . --fix
3. Build: Run pnpm build and ensure zero errors
4. Check every page has:
   - Unique <title> tag
   - Unique <meta name="description">
   - og:title, og:description, og:image
   - At least one JSON-LD schema block
   - BreadcrumbList schema (except homepage)
   - Proper heading hierarchy (single H1, logical H2-H6)
   - All images have alt text
   - All links have descriptive text (no "click here")
5. Check all forms submit correctly to /api/lead
6. Check all pages are mobile-responsive (test at 360px width)
7. Verify next-sitemap generates correct XML sitemap
8. Verify robots.txt is correct
9. Check 301 redirects work
10. Run Lighthouse on homepage - target 90+ on all metrics
```

---

## PHASE 7: DEPLOYMENT

### Step 7.1 — Deploy Frontend to Vercel

```bash
# In the surajwood-frontend directory
pnpm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_WP_API_URL = https://cms.surajwood.com/wp-json/wp/v2
# NEXT_PUBLIC_GRAPHQL_URL = https://cms.surajwood.com/graphql
# WP_REVALIDATION_SECRET = (generate a random 32-char string)
# SW_API_KEY = (generate a random 32-char string, same in WP)
# NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
# NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY = (from Google reCAPTCHA console)
# RECAPTCHA_SECRET_KEY = (from Google reCAPTCHA console)
```

### Step 7.2 — Configure Cloudflare DNS

```
1. Add surajwood.com to Cloudflare
2. Point DNS:
   - www.surajwood.com CNAME -> cname.vercel-dns.com (frontend)
   - cms.surajwood.com A -> your-server-ip (WordPress)
3. Enable:
   - SSL: Full (Strict)
   - Always Use HTTPS
   - HSTS
   - Auto Minify: JS, CSS, HTML
   - Brotli compression
   - Caching: Standard
```

---

## TIPS FOR USING CLAUDE CODE IN ANTIGRAVITY EFFECTIVELY

### Use Planning Mode for Big Tasks
For architecture-level work (building a full page, setting up the CRM bridge), use Antigravity's **Planning mode**. This makes Claude Code generate a task list and implementation plan before writing code. Review the plan, leave comments, then let it execute.

### Use Fast Mode for Quick Fixes
For small changes ("fix this TypeScript error", "add hover effect to this button"), use **Fast mode** for instant execution.

### Leverage Multi-Agent Parallelism
Antigravity's killer feature is parallel agents. While Claude Code works on the frontend product page template, spawn a second agent (using Gemini 3) to work on the PSEO data matrix or blog mock data. Use the **Manager Surface** to orchestrate this.

### Keep Context with @-mentions
In the Claude Code sidebar, you can @-mention files to give Claude context:
- `@lib/wordpress.ts update the getProductBySlug function to include colour_range field`
- `@components/sections/Hero.tsx make the CTA button pulse with a copper glow animation`

### Use /plan Before Complex Changes
Type `/plan` in Claude Code before asking it to build a complex feature. It will outline the approach and wait for your approval before writing code.

### Commit Frequently
After each major feature, commit:
```bash
git add -A
git commit -m "feat: build product page template with specs accordion and FAQ schema"
```

### Test Locally Before Deploying
```bash
pnpm dev        # Development server at localhost:3000
pnpm build      # Production build (catches SSG/ISR errors)
pnpm start      # Production server locally
```

---

## SPRINT-BY-PROMPT SUMMARY

| Sprint | Week | What to Prompt Claude Code |
|--------|------|---------------------------|
| 0 | 1 | CLAUDE.md + project scaffold + folder structure |
| 1 | 2 | Tailwind config + shadcn components + WP API client + schema lib |
| 2 | 3-4 | Root layout + Navbar + Footer + WhatsApp widget + Homepage |
| 3 | 5-6 | About page + Product page template (all 5) + Contact page |
| 4 | 7-8 | PSEO data matrix + PSEO template (50 pages) + Blog system |
| 5 | 9-10 | Application pages + Dealer page + FAQ page |
| 6 | 11-12 | Analytics integration + CRM workflows + ISR webhook |
| 7 | 13-14 | Performance optimization + schema audit + sitemap/robots |
| 8 | 15-16 | WordPress CMS setup + ACF fields + CRM bridge plugin |
| 9 | 17-18 | Full QA + Lighthouse audit + deploy to Vercel + Cloudflare |
| 10 | 19-20 | Bug fixes + content entry + GBP setup + handover docs |

---

*This document is designed to be used as a direct reference while working in Google Antigravity with Claude Code. Each prompt box can be copied and pasted directly into the Claude Code agent sidebar.*