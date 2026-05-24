import Link from "next/link";
import type { Metadata } from "next";
import citiesData from "@/data/cities.json";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pan-India Presence & Dealer Directory | SurajWood Acrylic Panels",
  description:
    "Locate authorized SurajWood prelaminated acrylic panel dealers and direct supply project corridors across 50+ Indian cities, including Delhi, Mumbai, Bangalore, and Hyderabad.",
  openGraph: {
    title: "Pan-India Presence & Dealer Directory | SurajWood",
    description:
      "Direct project supply and dealer coordination channels across 50 major cities in India.",
    url: "https://www.surajwood.com/presence",
    images: [{ url: "/images/banner/bg3.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.surajwood.com/presence" },
};
// Group cities by region
const NORTH_NCR = ["delhi", "chandigarh", "lucknow", "kanpur", "ludhiana", "agra", "amritsar", "dehradun", "gorakhpur", "bareilly", "aligarh", "moradabad"];
const WEST_CENTRAL = ["mumbai", "pune", "ahmedabad", "surat", "indore", "nagpur", "bhopal", "vadodara", "nashik", "raipur", "jodhpur", "jaipur", "solapur", "gwalior", "belgaum"];
const SOUTH = ["bangalore", "hyderabad", "chennai", "coimbatore", "kochi", "vishakhapatnam", "mangalore", "mysore", "warangal", "guntur", "vijayawada", "madurai", "tiruchirappalli", "salem", "shivamogga"];
const EAST_NE = ["kolkata", "patna", "guwahati", "bhubaneswar", "ranchi", "jamshedpur"];

const REGIONS = [
  { name: "North India & NCR", slugs: NORTH_NCR },
  { name: "West & Central India", slugs: WEST_CENTRAL },
  { name: "South India", slugs: SOUTH },
  { name: "East & Northeast India", slugs: EAST_NE },
];

export default function PresencePage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Our Presence", url: "https://www.surajwood.com/presence" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] flex flex-col justify-between overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(255,255,255,0))]" />
        
        {/* Spacer to clear sticky navbar */}
        <div className="h-32 lg:h-40" />

        {/* Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50">
                <li>
                  <Link href="/" className="hover:text-copper transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">›</li>
                <li className="text-white font-medium text-white/70" aria-current="page">
                  Our Presence
                </li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Dealer Matrix
              </p>
            </div>

            {/* H1 */}
            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Pan-India Supply & <br />
              <span className="text-copper italic">Regional Dealer Matrix</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed font-light italic">
              Direct factory shipping and dealer corridors across 50 tier-1, tier-2, and tier-3 cities. Reaching every major design hub in India.
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full h-1 bg-gradient-to-r from-copper/50 to-transparent" />
      </section>

      {/* ── REGIONAL ACCORDION DIRECTORY ─────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">
              National Network
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy">
              50 Cities Programmatic Directory
            </h2>
            <div className="w-20 h-1 bg-copper mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 text-sm max-w-xl mx-auto mt-6 font-light">
              Expand a region to reveal authorized dealer supply and direct order links customized for local climates and architectural requirements.
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {REGIONS.map((region, rIdx) => {
              const regionCities = citiesData.cities.filter((c) => region.slugs.includes(c.slug));

              return (
                <details
                  key={rIdx}
                  className="group bg-cream/15 rounded-3xl border border-cream-dark/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  open={rIdx === 0} // Open the first region by default
                >
                  <summary className="flex justify-between items-center gap-4 p-8 cursor-pointer list-none font-playfair font-bold text-navy hover:text-copper transition-colors text-xl md:text-2xl">
                    <span>{region.name}</span>
                    <span
                      className="w-10 h-10 rounded-full bg-white border border-cream-dark flex items-center justify-center text-copper text-2xl group-open:rotate-45 transition-transform duration-300 shadow-sm"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  
                  <div className="px-8 pb-8 pt-4 border-t border-cream-dark/30 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
                    {regionCities.map((city) => (
                      <div
                        key={city.slug}
                        className="bg-cream/20 border border-cream-dark/50 rounded-2xl p-6"
                      >
                        <div className="flex justify-between items-baseline mb-3">
                          <h4 className="font-heading font-bold text-navy text-base">
                            {city.name}
                          </h4>
                          <span className="text-[9px] bg-copper/10 text-copper border border-copper/30 px-2 py-0.5 rounded-full font-bold uppercase">
                            State: {city.state}
                          </span>
                        </div>
                        
                        <p className="text-gray-500 text-xs italic font-light leading-relaxed mb-4">
                          <strong>Climate Note:</strong> {city.climateNote}
                        </p>

                        {/* Programmatic combination links */}
                        <div className="space-y-2 border-t border-cream-dark/40 pt-4">
                          <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                            Core Specifications:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                            <Link
                              href={`/acrylux/kitchens/${city.slug}`}
                              className="text-copper hover:text-navy transition-colors flex items-center gap-1"
                            >
                              <span>ACRYLUX Kitchens in {city.name}</span>
                            </Link>
                            <Link
                              href={`/acrymatte/kitchens/${city.slug}`}
                              className="text-copper hover:text-navy transition-colors flex items-center gap-1"
                            >
                              <span>ACRYMATTE Kitchens in {city.name}</span>
                            </Link>
                            <Link
                              href={`/acrysilk/wardrobes/${city.slug}`}
                              className="text-copper hover:text-navy transition-colors flex items-center gap-1"
                            >
                              <span>ACRYSILK Wardrobes in {city.name}</span>
                            </Link>
                            <Link
                              href={`/acryglass/tv-units/${city.slug}`}
                              className="text-copper hover:text-navy transition-colors flex items-center gap-1"
                            >
                              <span>ACRYGLASS TV Units in {city.name}</span>
                            </Link>
                            <Link
                              href={`/acryglass-matte/wall-paneling/${city.slug}`}
                              className="text-copper hover:text-navy transition-colors flex items-center gap-1 col-span-1 sm:col-span-2"
                            >
                              <span>ACRYGLASS MATTE Wall Panels in {city.name}</span>
                            </Link>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CENTRAL INQUIRY ───────────────────────────────────────────── */}
      <section className="bg-cream py-16 px-6 border-t border-cream-dark">
        <div className="max-w-4xl mx-auto text-center font-light">
          <h2 className="font-playfair text-navy text-3xl font-bold mb-4">
            Become a Registered SurajWood Dealer
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            We are expanding our retail and distribution networks across tier-2 and tier-3 cities. Fill out our dealer enquiry form, and our national retail manager will contact you within 48 hours. Mapped to our central desk.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/dealers"
              className="bg-copper hover:bg-copper-light text-white font-bold px-8 py-3.5 rounded transition-all shadow-lg"
            >
              Dealer Registration Form
            </Link>
            <a
              href="mailto:sales@surajwood.com?subject=Dealer%20Partnership%20Enquiry"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold px-8 py-3.5 rounded transition-all"
            >
              Email sales@surajwood.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
