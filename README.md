# 🌟 SurajWood Enterprise Ecosystem
### The Complete B2B/B2C Digital Front, Sales Intelligence CRM, and Autonomous AI Outreach Infrastructure

Welcome to the central repository for the **SurajWood Products Pvt Ltd** digital transformation engine. This project integrates a world-class premium e-commerce showroom, a robust self-hosted CRM, high-speed B2B mapping engines, and autonomous AI-driven lead nurturing pipelines to capture, score, and close premium corporate and residential architectural accounts.

---

## 🗺️ System Overview & Architecture

The SurajWood system operates as a unified multi-layered lead generation and sales closing flywheel:

```
                  ┌──────────────────────────────────────────────┐
                  │          SURROUNDING ACQUISITION FILTERS     │
                  │  (1,292 Programmatic Local SEO Routes)      │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
┌──────────────────────┐       ┌──────────────────┐       ┌──────────────────────┐
│  AI BDM AGENT SCRIP  │       │  NEXT.JS FRONTEN │       │  METADATA HR PIPELI  │
│  (Google Maps Scout  │       │  (Public Portal)  │       │  (Scout, Hunter, SDR)│
└──────────┬───────────┘       └────────┬─────────┘       └──────────┬───────────┘
           │                            │                            │
           │ (Lead API POST)            │ (Sample/Quote Forms)       │ (CRM Sync)
           ▼                            ▼                            ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                          PERFEX ENTERPRISE CRM                                 │
│        (Hosted on GoDaddy — crm.surajwood.com | SQLite CRM Database)           │
└──────────────────────────────────────┬─────────────────────────────────────────┘
                                       │
                                       ▼
                  ┌──────────────────────────────────────────────┐
                  │           BDM CLOSING WORKSPACE              │
                  │   (One-Click WhatsApp Outreach Links)        │
                  └──────────────────────────────────────────────┘
```

---

## 📦 Core Subsystems

### 1. Premium E-Commerce Showroom (`surajwood-frontend`)
A blazing-fast, visually breathtaking frontend web application built using **Next.js 14**, **React 18**, **TypeScript**, and styled with **Vanilla CSS & Tailwind**.

*   **Key Features**:
    *   **Interactive Galleries**: Curated visual portfolios across six focus spaces: **Kitchens**, **Wardrobes**, **Commercial**, **Office Spaces**, **Kids Rooms**, and **Wall Paneling**. Features dynamic filtering, client project showcases, and ultra-high-resolution 4K lightbox zooms.
    *   **Curated Product Collection Selector**: Rich collection guides for ACRYLUX, ACRYMATTE, ACRYSILK, and ACRYGLASS featuring live HSL-curated color pickers, design catalogs, and custom technical specification charts.
    *   **Programmatic SEO Core**: Built-in dynamic router rendering over **1,292 localized landing pages** combining products, application spaces, and key Indian target markets (Bangalore, Chennai, Delhi, Pune, Kochi, Chandigarh, Coimbatore, Surat, Mumbai).
    *   **Sitemap Automation**: Features automated sitemap generator (`next-sitemap`) outputting standard indices (`sitemap.xml`) post-build.
    *   **Unified Contact & Location**: Features a custom high-fidelity hybrid satellite location panel mapping the Suraj Wood factory coordinates with elegant glassmorphic interactive tags pointing directly to [Google Maps Navigation (maps.app.goo.gl)](https://maps.app.goo.gl/iUHqrGrSFW4rcUgS9).
    *   **Analytics Integrity**: Hardwired with Google Analytics 4 tags tracking client behavior, click events, and sample requests.

### 2. Self-Hosted Enterprise CRM (`perfex_crm`)
An enterprise-grade, PHP-based Customer Relationship Management platform hosted securely on GoDaddy cPanel at `https://crm.surajwood.com`.

*   **Custom Lead API Extensions**:
    *   **End-points**: Custom routing handled at `api/leads/create` and `api/leads/health` with strict key-based authorization.
    *   **Custom Fields**: Auto-binds parameters for `user_type` (Architect, Interior Designer, Dealer, OEM Manufacturer, Homeowner), `product_interest`, `source_page`, and `inquiry_type` (Request Quote, Sample Kit, Dealer Enquiry).
    *   **Smart Categorization**: Configured lead statuses automatically routing targets into `ELITE (Luxury)`, `PREMIUM (Showroom)`, or `VOLUME (Essential)` segments.

### 3. Autonomous AI Sales BDM Agents (`suraj_agent.py` / `suraj_engine.py`)
A collection of autonomous Python agents executing high-efficiency lead generation, online scraping, and B2B communication drafting.

*   **Target Niches**:
    *   **Premium Partners**: High-end Architects, Luxury Interior Designers, Modular Kitchen Showrooms, Premium Villa Developers.
    *   **Volume Buyers**: Modular Furniture Manufacturers, Plywood Merchants, Timber Yards, Kitchen Hardware Outlets.
*   **The AI Nurturing Pipeline**:
    1.  **Google Maps Scout**: Utilizes the `SearchAPI.io` Google Maps engine to run hyper-localized geo-targeted queries for target businesses in specified Indian cities.
    2.  **Genius Lead Profiler**: Classifies businesses based on composite rating indicators (e.g. Rating > 4.5 & Reviews > 20 → Luxury Elite, "Design" keywords → Premium, otherwise Volume).
    3.  **Homepage Email Scraper**: Automatically parses the scraped website homepages via custom Python regular expressions to extract hidden business emails, filtering out default templates and site builders.
    4.  **Tailored Pitch Builder**: Leverages Gemini AI capabilities to write highly specific pitches matching their profile (e.g. pitch non-reflective ACRYMATTE for minimalist designers, or high-volume 48hr delivery for furniture manufacturers).
    5.  **One-Click WhatsApp Connector**: Auto-generates direct, pre-encoded WhatsApp outreach links (`https://wa.me/...`) for instant sales follow-up.

### 4. Paperclip HR & Sales Intelligence platform (`paperclip`)
A comprehensive, AI-orchestrated monitoring system designed to crawl, identify, and nurture leads facing organizational pivots, culture transformations, and HR challenges.

*   **Key Agents**:
    *   **Scout Agent** (`fd6128f6-...`): Monitors Google News RSS and AmbitionBox company reports 24/7 to score company health, trigger points (layoffs, toxic ratings, scandals, new CHRO hires), and saves brief reports.
    *   **Hunter Agent** (`0c742342-...`): Maps buying committees (CEOs, CHROs, Chief People Officers) for triggered companies using Apollo.io, Hunter.io, and Gemini inference.
    *   **Thought Leader Agent** (`295cbcba-...`): Translates signals into customized long-form blog articles (Ian Kishander's *"The Leadership Mirror"* framework) and social media sequences.
    *   **SDR Agent** (`d2567a77-...`): Drafts hyper-personalized 3-touch follow-up emails and LinkedIn requests.
    *   **Approval & Review Center**: Hosts a premium single-page dashboard at `http://localhost:3100` allowing manual approval, contact exporting, and BDM execution pipelines.

---

## 🛠️ Installation & Setup

### Requirements
*   Node.js 18+ & npm/pnpm
*   Python 3.8+ (with `requests` library installed)
*   PHP 7.4+ (for custom CRM servers)

### Next.js Frontend Deployment
1.  Navigate to the directory:
    ```bash
    cd surajwood-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env.local` based on `.env.example`:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    SANITY_API_TOKEN=your_sanity_token
    PERFEX_API_URL=https://crm.surajwood.com/api/leads/create
    PERFEX_API_KEY=your_shared_32_char_token
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
    SITE_URL=https://www.surajwood.com
    ```
4.  Run locally:
    ```bash
    npm run dev
    ```
5.  Build static files:
    ```bash
    npm run build
    ```

### Perfex CRM Lead Endpoint Setup
1.  Copy `perfex_crm/application/controllers/api/Website_leads.php` to your hosted server's `[perfex-root]/application/controllers/api/` folder.
2.  Configure your private API token on line 47:
    ```php
    const API_KEY = 'your_shared_32_char_token';
    ```
3.  Register endpoints in `[perfex-root]/application/config/routes.php`:
    ```php
    $route['api/leads/create'] = 'api/website_leads/create';
    $route['api/leads/health'] = 'api/website_leads/health';
    ```

### Running the AI BDM Agents
Configure your keys in the terminal and execute the main BDM engine:
```bash
# On Windows PowerShell
$env:SEARCHAPI_KEY="your_search_api_key"
python suraj_engine.py "Bangalore" "Architect"
```
Check `crm_drafts.txt` or your GoDaddy CRM dashboard for synced leads and pre-configured WhatsApp pitching links.

### Running Paperclip / MetaHR
1.  Navigate to the directory:
    ```bash
    cd paperclip
    ```
2.  Start the entire backend server, database, and background scheduler:
    ```bash
    ./start.sh
    ```
3.  Access the admin workspace at `http://localhost:3100`.

---

## 📈 Lead Conversion Tiers

| Tier | Category | Rating Criteria | Product Focus | Outreach Channel |
|---|---|---|---|---|
| **ELITE** | Luxury | > 4.5 Rating & > 20 Reviews | ACRYMATTE & ACRYGLASS | Hyper-Personalized Email / LinkedIn |
| **PREMIUM** | Showroom | > 4.0 Rating \| "Design" in Name | ACRYLUX & ACRYSILK | Curated Dealership Catalog |
| **VOLUME** | Essential | General B2B Factories | Standard Zooper & Core Lines | One-Click BDM WhatsApp / Bulk Catalog |

---

## 🤝 Contact and Support
For pipeline queries, API key rotations, or platform enhancements, please contact:
*   **Engineering Lead**: iamvazu (GitHub)
*   **Project Sponsor**: Ian Kishander (ian.kishander@gmail.com)
*   **Company Headquarters**: Suraj Wood Products Pvt Ltd ([maps.app.goo.gl/iUHqrGrSFW4rcUgS9](https://maps.app.goo.gl/iUHqrGrSFW4rcUgS9))
