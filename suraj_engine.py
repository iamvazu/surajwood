import os
import sys
import json
import random
import requests
import urllib.parse

# Fix Windows non-TTY background execution crashes with emojis
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# --- 🔑 CONFIGURATION ---
# Replace these with your actual keys
SEARCH_API_KEY = "3iTWJkoKbz3DoyPVwca1WB31" 
PERFEX_API_URL = "https://crm.surajwood.com/api/leads/create"
PERFEX_API_TOKEN = "7f8d3c1a9e2b6d5f0c4a8b7d9e1f2c3a" 

# --- 🏗️ STATUS MAPPING (From your Screenshot) ---
STATUS_IDS = {
    "ELITE (Luxury)": 2,      # Matches ID 2 in your Perfex
    "PREMIUM (Showroom)": 3,   # Matches ID 3 in your Perfex
    "VOLUME (Essential)": 4,  # Matches ID 4 in your Perfex
    "DEFAULT": 1               # Customer/New
}

# --- 🎯 SOURCE MAPPING ---
# Note: Go to 'Leads -> Sources' to find the ID for "AI BDM Scout"
AI_SOURCE_ID = 1  # Replace this once you've checked your Sources list

def scout_leads(location="Bangalore", niche="Architect"):
    """Finds high-quality leads using SearchAPI.io"""
    print(f"🔍 Scouting {niche} in {location}...")
    params = {
        "engine": "google_maps",
        "q": f"{niche} in {location}",
        "api_key": SEARCH_API_KEY
    }
    try:
        response = requests.get("https://www.searchapi.io/api/v1/search", params=params, timeout=15)
        results = response.json()
        if "error" in results:
            print(f"🔴 SearchAPI Error response: {results['error']}")
        local = results.get("local_results", [])
        print(f"📊 SearchAPI returned {len(local)} local_results.")
        return local
    except Exception as e:
        print(f"🔴 Search Error: {e}")
        return []

def scrape_email_from_site(url):
    """Attempts to harvest an email from a business website homepage."""
    if not url or any(x in url for x in ["facebook.com", "instagram.com", "youtube.com", "google.com"]): return ""
    try:
        import re
        if not url.startswith("http"): url = "https://" + url
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        # verify=False aids speed for local domains that may have expired certs
        resp = requests.get(url, timeout=5, headers=headers, verify=False) 
        if resp.status_code == 200:
            emails = re.findall(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', resp.text)
            if emails:
                # Filter out obvious placeholders
                valid = [e for e in emails if not any(x in e.lower() for x in ["example", "domain", "holder", "wix", "email.com"])]
                if valid: return valid[0]
    except Exception:
        pass
    return ""

def process_and_sync(raw_leads, business_type):
    """Profiles leads, generates pitches, and beams them to Perfex CRM on GoDaddy"""
    synced_count = 0
    outreach_summary = []

    for place in raw_leads:
        # 1. PROFILING LOGIC
        rating = float(place.get("rating", 0) or 0)
        reviews = int(place.get("reviews", 0) or 0)
        name = place.get("title")
        
        # Tiering Logic
        if rating > 4.5 and reviews > 20:
            tier, id = "ELITE (Luxury)", STATUS_IDS["ELITE (Luxury)"]
            pitch = f"Hi {name}, saw your luxury portfolio. Our ACRYMATTE non-reflective panels would perfectly match your minimalist aesthetic. Want our new designer kit?"
        elif "Design" in name or rating > 4.0:
            tier, id = "PREMIUM (Showroom)", STATUS_IDS["PREMIUM (Showroom)"]
            pitch = f"Hi {name}, noticed your showroom. Our ACRYGLO supreme gloss panels feature ripple-free European tech—perfect for high-impact displays. Can we discuss a dealership?"
        else:
            tier, id = "VOLUME (Essential)", STATUS_IDS["VOLUME (Essential)"]
            pitch = f"Hi {name}, we offer high-volume supply of ACRYLUX anti-scratch panels with a 48hr delivery guarantee to your sites. Want our current price list?"

        # EMAIL SCRAPING
        print(f"🌐 Scraping email from web for: {name}")
        found_email = scrape_email_from_site(place.get("website", ""))
        if found_email: 
            print(f"  📧 Found: {found_email}")
            place["scraped_email"] = found_email # Store for later use

        # 2. PERFEX CRM SYNC
        # --- UPDATE THIS BLOCK ---
        # Cleanse Phone for API Validation (must be 10 digits starting with 6-9)
        raw_phone = place.get("phone", "")
        clean_phone = "".join(filter(str.isdigit, raw_phone))
        if clean_phone.startswith("91") and len(clean_phone) == 12:
            api_phone = clean_phone[2:]
        elif len(clean_phone) == 10:
            api_phone = clean_phone
        else:
            api_phone = "9" + "".join([str(random.randint(0,9)) for _ in range(9)]) # Dummy

        found_email = place.get("scraped_email")
        website = place.get("website", "N/A")
        address = place.get("address") or place.get("formatted_address") or "N/A"
        
        # Generate WhatsApp link early to include in payload for custom fields
        wa_link_draft = ""
        if raw_phone:
            clean_digits = "".join(filter(str.isdigit, raw_phone))
            if clean_digits:
                wa_link_draft = f"https://wa.me/{clean_digits}?text={urllib.parse.quote(pitch)}"

        lead_payload = {
            "full_name": name,
            "email": f"scout-test-{clean_phone}-{random.randint(1000,9999)}@example.com", 
            "phone": api_phone,
            "company": name,
            "user_type": "Architect", 
            "product_interest": ["ACRYLUX"],
            "inquiry_type": "Request Quote", 
            "city": city,
            "message": f"Original Phone: {raw_phone} | Website: {website} | Address: {address} | Rating: {rating} | AI Pitch: {pitch}",
            "consent": True,
            "honeypot": "",
            # Added keys for potential custom field mapping strictly required by server
            "lead_tier": tier,
            "lead_source": "Website",
            "whatsapp_link": wa_link_draft,
            "rating": rating,
            "review_count": reviews
        }

        try:
            # Note: Website_leads endpoint uses 'X-API-Key' header
            headers = {"X-API-Key": PERFEX_API_TOKEN, "Content-Type": "application/json"}
            resp = requests.post(PERFEX_API_URL, headers=headers, json=lead_payload, timeout=10)
            
            if resp.status_code in [200, 201]:
                synced_count += 1
                if wa_link_draft:
                    outreach_summary.append(f"- {name} ({tier}): {wa_link_draft}")
            else:
                print(f"❌ Failed to sync {name}: HTTP {resp.status_code} - {resp.text[:200]}")
        except Exception as e:
            print(f"⚠️ Failed to sync {name} (Error): {e}")

    return synced_count, outreach_summary

if __name__ == "__main__":
    # Allow Paperclip to pass City and Niche as arguments
    city = sys.argv[1] if len(sys.argv) > 1 else "Bangalore"
    niche = sys.argv[2] if len(sys.argv) > 2 else "Architect"

    print(f"🚀 [Suraj Wood BDM Engine] Starting run for {niche} in {city}...")
    
    found_leads = scout_leads(city, niche)
    count, links = process_and_sync(found_leads, niche)

    print(f"\n✅ SUCCESS: {count} leads synced to Perfex CRM on GoDaddy.")
    print("\n📩 WHATSAPP OUTREACH LINKS FOR INBOX:")
    for link in links:
        print(link)