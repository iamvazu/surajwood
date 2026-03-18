import os
import json
import requests # Ensure 'pip install requests'

# CONFIGURATION
CRM_API_ENDPOINT = "http://localhost:8080/api/leads" # Your internal CRM
SEARCH_API_KEY = "3iTWJkoKbz3DoyPVwca1WB31"

def scout_local_partners(location="Bangalore", business_type="Interior Designer"):
    """
    Scouts Google Maps via SearchAPI.io for specific B2B partners for Suraj Wood.
    Target niches: Architects, Interior Designers, Furniture Showrooms, 
    Premium Modular Kitchen Stores, and Luxury Villa Developers.
    """
    params = {
        "engine": "google_maps",
        "q": f"{business_type} in {location}",
        "api_key": SEARCH_API_KEY
    }

    try:
        response = requests.get("https://www.searchapi.io/api/v1/search", params=params)
        results = response.json()
    except Exception as e:
        print(f"🔴 Network/JSON Error: {e}")
        return []
    
    if "error" in results:
        print(f"🔴 SearchAPI Error: {results['error']}")
        return []

    leads = []
    for place in results.get("local_results", []):
        leads.append({
            "name": place.get("title"),
            "rating": place.get("rating"),
            "reviews": place.get("reviews"),
            "address": place.get("address"),
            "website": place.get("website"),
            "phone": place.get("phone"),
            "category": business_type
        })
    
    return leads

def scout_volume_partners(location="Bangalore"):
    """
    Specifically targets mid-tier 'Volume' partners like local factories 
    and hardware hubs who handle mass-market wardrobes.
    """
    targets = [
        "Modular Furniture Manufacturer",
        "Plywood Merchant",
        "Timber Yard",
        "Kitchen Hardware Store"
    ]
    
    all_leads = []
    print(f"🚀 [Scout Volume]: Researching {len(targets)} supply niches in {location}...")
    for niche in targets:
        results = scout_local_partners(location, niche) 
        all_leads.extend(results)
        
    return all_leads

def process_leads(leads):
    """
    Shared pipeline for Syncing and Profiling leads to the CRM.
    """
    for place in leads:
        # 2. PROFILING (The Genius Part)
        rating = place.get("rating")
        rating = float(rating) if rating is not None else 0.0
        
        reviews = place.get("reviews")
        reviews = int(reviews) if reviews is not None else 0
        
        category = "MID-TIER" # Default
        
        if rating > 4.5 and reviews > 20:
            category = "LUXURY"
        elif "Design" in place.get("name", ""):
            category = "PREMIUM"

        lead_data = {
            "name": place.get("name"),
            "category": category,
            "address": place.get("address"),
            "website": place.get("website") or "N/A",
            "phone": place.get("phone") or "N/A",
            "rating": rating,
            "status": "New",
            "source": place.get("category") or "NemoClaw_Maps"
        }

        print(f"✅ Syncing {lead_data['name']} as [{category}] to Suraj Wood CRM...")
        pitch = generate_pitch(lead_data)
        save_draft_to_crm(lead_data, pitch)

def agent_logic_flow(city="Bangalore", niche="Architect"):
    """
    The main autonomous loop for Suraj Wood's Business Development.
    """
    print(f"🚀 [Suraj Wood Agent]: Starting Scouting flow for {niche}s in {city}...")
    
    results = scout_local_partners(city, niche)
    print(f"Found {len(results)} results")
    process_leads(results)

def generate_pitch(lead):
    """
    Generates a pitch based on the Suraj Wood Tiering Logic.
    """
    if lead['category'] == "LUXURY":
        return f"Hi {lead['name']}, your luxury portfolio deserves the anti-fingerprint tech of our Opulux Satin..."
    elif lead['category'] == "PREMIUM":
        return f"Hi {lead['name']}, looking to upgrade your wardrobe finish? Our Zooper line offers premium gloss..."
    else:
        return f"Hi {lead['name']}, we specialize in high-volume, 48hr delivery for mid-tier projects. Check our price list..."

def save_draft_to_crm(lead_data, pitch):
    # This would be a POST request to your internal CRM
    with open("crm_drafts.txt", "a", encoding="utf-8") as f:
        f.write(f"LEAD: {lead_data['name']}\n")
        f.write(f"CATEGORY: {lead_data['category']}\n")
        f.write(f"RATING: {lead_data.get('rating', 'N/A')}\n")
        f.write(f"PHONE: {lead_data.get('phone', 'N/A')}\n")
        f.write(f"WEBSITE: {lead_data.get('website', 'N/A')}\n")
        f.write(f"ADDRESS: {lead_data.get('address', 'N/A')}\n")
        f.write(f"PITCH: {pitch}\n")
        f.write("---\n")

if __name__ == "__main__":
    CITY = "Bangalore"
    
    print("--- 🌟 [Suraj Wood Agent] starting Daily Scouting directive 🌟 ---")
    
    # 1. Premium Lead Pipeline
    print(f"\n--- 💎 Step 1: Scouting Premium Niches in {CITY} ---")
    premium_niches = ["Interior Designer", "Architect", "Modular Kitchen Store"]
    for niche in premium_niches:
        agent_logic_flow(CITY, niche)
        
    # 2. Volume Lead Pipeline (The New integration)
    print(f"\n--- 📦 Step 2: Scouting High-Volume Supply Niches in {CITY} ---")
    volume_leads = scout_volume_partners(CITY)
    print(f"Total Volume Leads found: {len(volume_leads)}")
    process_leads(volume_leads)
    
    print("\n✅ Daily Directive Complete. Check crm_drafts.txt for outputs.")