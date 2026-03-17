# SurajWood Setup Instructions

## 1. Generate a Shared API Key

Run this in any terminal to generate a secure 32-char key:
```
openssl rand -hex 16
```
Example output: `a3f9b2e1c4d7f0a8b5c2e9d6f3a0b7c4`

You will use this key in **two places**.

---

## 2. Perfex CRM — Install the Lead API

### A. Upload the controller
Copy the file:
```
perfex_crm/application/controllers/api/Website_leads.php
```
to your GoDaddy cPanel server at:
```
[perfex-root]/application/controllers/api/Website_leads.php
```
(Create the `api/` folder if it doesn't exist)

### B. Set your API key in the controller
Edit line 47 of `Website_leads.php`:
```php
const API_KEY = 'PASTE_YOUR_GENERATED_KEY_HERE';
```

### C. Add routes to Perfex
Open `[perfex-root]/application/config/routes.php` and add before `$route['404_override']`:
```php
$route['api/leads/create'] = 'api/website_leads/create';
$route['api/leads/health'] = 'api/website_leads/health';
```
(Already done in `perfex_crm/application/config/routes.php` if you're using the folder version)

### D. Create custom fields in Perfex Admin
Go to **Setup > Custom Fields > Leads** and create:
- `user_type` — Select field (Architect, Interior Designer, Homeowner, Dealer, OEM Manufacturer, Other)
- `product_interest` — Multi-checkbox (ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, ACRYGLASS MATTE)
- `source_page` — Text input
- `inquiry_type` — Select (Request Quote, Sample Kit, Dealer Enquiry, Technical Query, Other)

### E. Create a Lead Source
Go to **Leads > Sources** → Add "Website"
Then update `LEAD_SOURCE_WEBSITE` constant in the controller with the correct ID.

### F. Test the API
```
curl -X GET https://crm.surajwood.com/api/leads/health
```
Should return: `{"status":"ok","service":"SurajWood Lead API",...}`

---

## 3. Next.js Frontend — Set Environment Variables

Edit `surajwood-frontend/.env.local`:

```env
# Sanity CMS — get from sanity.io dashboard > project settings
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-read-token

# Perfex CRM — must match API_KEY in Website_leads.php exactly
PERFEX_API_URL=https://crm.surajwood.com/api/leads/create
PERFEX_API_KEY=PASTE_YOUR_GENERATED_KEY_HERE

# Google Analytics (get from analytics.google.com)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL
SITE_URL=https://www.surajwood.com
```

---

## 4. Sanity CMS Setup

1. Go to [sanity.io](https://sanity.io) → your project
2. Copy the **Project ID** from project settings
3. Paste it into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. To get a read token: Project Settings > API > Tokens → Add API token (Viewer role)
5. Paste the token as `SANITY_API_TOKEN`
6. Deploy the Sanity Studio:
   ```
   cd surajwood-frontend/sanity
   npx sanity deploy
   ```
   This gives you a live Studio at `surajwood.sanity.studio`
7. Add your 5 products, blog posts, testimonials etc. in the Studio

---

## 5. Deploy Frontend to Vercel

```bash
cd surajwood-frontend
npx vercel --prod
```
Add all the `.env.local` variables in Vercel dashboard → Project → Settings → Environment Variables.

---

## 6. Cloudflare DNS

| Record | Name | Value |
|--------|------|-------|
| CNAME | www | cname.vercel-dns.com |
| A | crm | your-godaddy-server-ip |

Enable: Full (Strict) SSL, Always HTTPS, HSTS.
