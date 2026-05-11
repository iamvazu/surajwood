"""
maps_scout.py
Scouts Google Maps via SearchAPI.io for Interior Designers in a given locality.
Usage:
    python maps_scout.py                          # defaults: Indiranagar, Bangalore
    python maps_scout.py --location "Koramangala, Bangalore" --type "Architect"
"""

import argparse
import json
import os
import sys
import requests

SEARCH_API_KEY = os.environ.get("SEARCHAPI_KEY", "3iTWJkoKbz3DoyPVwca1WB31")
SEARCH_API_URL = "https://www.searchapi.io/api/v1/search"

TIER_RULES = [
    # (min_rating, min_reviews, tier)
    (4.5, 30, "LUXURY"),
    (4.2, 10, "PREMIUM"),
]


def scout(location: str, business_type: str) -> list[dict]:
    """Fetch local results from Google Maps via SearchAPI."""
    params = {
        "engine": "google_maps",
        "q": f"{business_type} in {location}",
        "api_key": SEARCH_API_KEY,
    }
    try:
        resp = requests.get(SEARCH_API_URL, params=params, timeout=30)
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as exc:
        print(f"[ERROR] Network error: {exc}", file=sys.stderr)
        return []
    except json.JSONDecodeError as exc:
        print(f"[ERROR] JSON parse error: {exc}", file=sys.stderr)
        return []

    if "error" in data:
        print(f"[ERROR] SearchAPI returned error: {data['error']}", file=sys.stderr)
        return []

    raw = data.get("local_results", [])
    leads = []
    for place in raw:
        rating = float(place.get("rating") or 0)
        reviews = int(place.get("reviews") or 0)
        tier = _classify(rating, reviews, place.get("title", ""))
        leads.append(
            {
                "name": place.get("title", "Unknown"),
                "rating": rating,
                "reviews": reviews,
                "address": place.get("address", ""),
                "phone": place.get("phone", "N/A"),
                "website": place.get("website", "N/A"),
                "business_type": business_type,
                "tier": tier,
                "score": _score(rating, reviews),
            }
        )
    return leads


def _classify(rating: float, reviews: int, name: str) -> str:
    for min_r, min_rev, tier in TIER_RULES:
        if rating >= min_r and reviews >= min_rev:
            return tier
    if any(kw in name for kw in ("Design", "Studio", "Atelier", "Associates")):
        return "PREMIUM"
    return "MID-TIER"


def _score(rating: float, reviews: int) -> float:
    """Composite score: 70% rating (normalised to 5) + 30% review volume (log-scaled)."""
    import math
    review_score = math.log1p(reviews) / math.log1p(200)  # 200 reviews ≈ 1.0
    return round(0.7 * (rating / 5.0) + 0.3 * review_score, 4)


def rank(leads: list[dict]) -> list[dict]:
    """Sort by tier priority then composite score."""
    tier_order = {"LUXURY": 0, "PREMIUM": 1, "MID-TIER": 2}
    return sorted(leads, key=lambda l: (tier_order.get(l["tier"], 9), -l["score"]))


def main():
    parser = argparse.ArgumentParser(description="Scout local business leads via Google Maps.")
    parser.add_argument("--location", default="Indiranagar, Bangalore")
    parser.add_argument("--type", dest="btype", default="Interior Designer")
    parser.add_argument("--top", type=int, default=10, help="How many results to print")
    parser.add_argument("--out", default=None, help="Optional JSON output file")
    args = parser.parse_args()

    print(f"[maps_scout] Searching for '{args.btype}' in '{args.location}' ...")
    leads = scout(args.location, args.btype)

    if not leads:
        print("[maps_scout] No leads found or API error. Exiting.")
        sys.exit(1)

    ranked = rank(leads)
    top = ranked[: args.top]

    print(f"\n{'Rank':<5} {'Tier':<10} {'Score':<7} {'Rating':<8} {'Reviews':<9} Name")
    print("-" * 80)
    for i, lead in enumerate(top, 1):
        print(
            f"{i:<5} {lead['tier']:<10} {lead['score']:<7} "
            f"{lead['rating']:<8} {lead['reviews']:<9} {lead['name']}"
        )

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(top, f, indent=2, ensure_ascii=False)
        print(f"\n[maps_scout] Saved top {len(top)} leads → {args.out}")

    # Always write ranked_leads.json for downstream consumption
    out_path = os.path.join(os.path.dirname(__file__), "ranked_leads.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(top, f, indent=2, ensure_ascii=False)
    print(f"[maps_scout] Leads written to {out_path}")


if __name__ == "__main__":
    main()
