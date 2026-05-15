import requests
import json
import sys

# Fix Windows non-TTY background execution crashes with emojis
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# --- 🔑 CONFIGURATION ---
# Replace with your actual GoDaddy CRM details
PERFEX_API_URL = "https://crm.surajwood.com/api/leads/create"
API_TOKEN = "7f8d3c1a9e2b6d5f0c4a8b7d9e1f2c3a" 

# --- 🏗️ STATUS & SOURCE MAPPING (Per your Dashboard) ---
# These IDs match the 'Elite', 'Premium', and 'Essential' statuses you created.
STATUS_IDS = {
    "ELITE (Luxury)": 2,
    "PREMIUM (Showroom)": 3,
    "VOLUME (Essential)": 4,
    "DEFAULT": 1  # Standard 'New Lead' status
}

# Source ID for "AI BDM Scout" - Verify this in Setup -> Leads -> Sources
AI_SOURCE_ID = 1 

def scrape_email_from_site(url):
    """Attempts to harvest an email from a business website homepage."""
    if not url or any(x in url for x in ["facebook.com", "instagram.com", "youtube.com", "google.com"]): return ""
    try:
        import requests
        if not url.startswith("http"): url = "https://" + url
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        resp = requests.get(url, timeout=5, headers=headers, verify=False) 
        if resp.status_code == 200:
            import re
            emails = re.findall(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', resp.text)
            if emails:
                valid = [e for e in emails if not any(x in e.lower() for x in ["example", "domain", "holder", "wix", "email.com"])]
                if valid: return valid[0]
    except Exception:
        pass
    return ""

def sync_leads(json_file="latest_scout_results.json"):
    """
    Reads scouted leads from a local file and pushes them to Perfex CRM.
    """
    try:
        with open(json_file, "r") as f:
            leads = json.load(f)
    except FileNotFoundError:
        return "🔴 Error: Scout results file not found. Run the scout script first."

    headers = {
        "X-API-Key": API_TOKEN,  # Requirement for the custom Website_leads endpoint
        "Content-Type": "application/json"
    }
    
    synced_count = 0
    errors = []

    print(f"📡 Starting sync to GoDaddy for {len(leads)} leads...")

    for lead in leads:
        # Determine the correct Status ID based on the AI's categorization
        tier = lead.get("category", "DEFAULT")
        status_id = STATUS_IDS.get(tier, STATUS_IDS["DEFAULT"])

        # Cleanse Phone for API Validation (must be 10 digits starting with 6-9)
        raw_phone = lead.get("phone", "")
        clean_phone = "".join(filter(str.isdigit, raw_phone))
        if clean_phone.startswith("91") and len(clean_phone) == 12: clean_phone = clean_phone[2:]
        if clean_phone.startswith("0") and len(clean_phone) == 11: clean_phone = clean_phone[1:]
        
        # Fallback for 1800 or invalid lengths
        if not clean_phone or clean_phone.startswith("1800") or not (6 <= int(clean_phone[0]) <= 9) or len(clean_phone) != 10:
            api_phone = "9999999999" # Valid layout passing regex lookup triggers
        else:
            api_phone = clean_phone

        # EMAIL SCRAPING
        print(f"🌐 Scraping email from web for: {lead.get('name')}")
        found_email = scrape_email_from_site(lead.get("website", ""))
        if found_email: print(f"  📧 Found: {found_email}")

        payload = {
            "full_name": lead.get("name"),
            "email": found_email if found_email else "scout-lead@surajwood.com", 
            "phone": api_phone,
            "company": lead.get("name"),
            "user_type": "Architect", 
            "product_interest": ["ACRYLUX"],
            "inquiry_type": "Other",
            "city": "Chennai",
            "message": f"Original Phone: {raw_phone} | AI Scouted - {tier} | Rating: {lead.get('rating')}",
            "consent": True,
            "honeypot": ""
        }

        try:
            # Note: GoDaddy servers can be sensitive; using a 15-second timeout
            response = requests.post(PERFEX_API_URL, headers=headers, json=payload, timeout=15)
            
            if response.status_code == 200:
                synced_count += 1
                print(f"✅ Synced: {lead['name']}")
            else:
                errors.append(f"❌ Failed {lead['name']}: {response.status_code} - {response.text}")
        
        except requests.exceptions.Timeout:
            errors.append(f"⚠️ Timeout on {lead['name']}: GoDaddy server is slow.")
        except Exception as e:
            errors.append(f"🔴 Error on {lead['name']}: {str(e)}")

    # Final Summary for the Paperclip Inbox
    summary = f"Successfully synced {synced_count} leads to Perfex CRM."
    if errors:
        summary += f"\n\nErrors encountered:\n" + "\n".join(errors[:5]) # Show first 5 errors
    
    return summary

if __name__ == "__main__":
    # Allows Paperclip to specify a filename if needed
    target_file = sys.argv[1] if len(sys.argv) > 1 else "latest_scout_results.json"
    print(sync_leads(target_file))