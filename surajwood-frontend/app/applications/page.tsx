import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";
import { ArrowRight, Sparkles, Shield, Droplets, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Acrylic Panel Applications | Kitchens, Wardrobes & Interiors",
  description:
    "Explore SurajWood acrylic panel applications for modular kitchens, bedroom wardrobes, bathroom vanities, TV units, commercial interiors, and architectural wall paneling.",
  alternates: { canonical: "https://www.surajwood.com/applications" },
  openGraph: {
    title: "Acrylic Panel Applications | SurajWood",
    description:
      "Engineered PMMA acrylic panels pre-laminated with German PUR technology for kitchens, wardrobes, vanities, and commercial projects across India.",
    url: "https://www.surajwood.com/applications",
    images: [{ url: "/images/banner/bg3.jpg", width: 1200, height: 630 }],
  },
};

const APPLICATION_LIST = [
  {
    slug: "kitchens",
    name: "Modular Kitchens",
    tagline: "India's #1 Kitchen Surface for Heavy Cooking",
    desc: "Heat-tolerant, moisture-proof PMMA acrylic panels designed to withstand high cooking temperatures, oil vapors, and frequent cleaning.",
    image: "/images/gallery/kitchen-1.jpg",
    benefits: ["Class B1 Fire Rated", "Moisture Proof", "3H Scratch Resistance", "Easy Oil-Wipe"],
    popularProducts: ["ACRYLUX", "ACRYMATTE", "ACRYGLASS"],
  },
  {
    slug: "wardrobes",
    name: "Luxury Wardrobes & Closets",
    tagline: "Anti-Fingerprint Bedroom Surfaces",
    desc: "Bespoke soft-satin and matte panels with nano anti-fingerprint coatings that resist scratches from rings, keys, and daily door handling.",
    image: "/images/gallery/wardrobe-1.jpg",
    benefits: ["Nano Anti-Fingerprint", "3H Hardness", "Zero Edge Peeling", "Satin Texture"],
    popularProducts: ["ACRYSILK", "ACRYMATTE", "ACRYGLASS MATTE"],
  },
  {
    slug: "bathroom-vanities",
    name: "Bathroom Vanities",
    tagline: "100% Water-Resistant Luxury Vanities",
    desc: "Non-porous PMMA acrylic surfaces bonded with German PUR hotmelt for zero substrate swelling or delamination in steamy, high-humidity bathrooms.",
    image: "/images/gallery/bathroom-1.jpg",
    benefits: ["100% Waterproof Bond", "Anti-Bacterial", "Stain Resistant", "High Optical Gloss"],
    popularProducts: ["ACRYGLASS", "ACRYLUX", "ACRYGLASS MATTE"],
  },
  {
    slug: "tv-units",
    name: "TV Units & Media Consoles",
    tagline: "Glossy Living Room Statement Pieces",
    desc: "High-gloss mirror surfaces with 95% light reflectivity and rich colour depth, turning living room media walls into architectural highlights.",
    image: "/images/gallery/tv-unit-1.jpg",
    benefits: ["95% Reflectivity", "Deep Visual Depth", "Seamless Look", "Dust Repellent"],
    popularProducts: ["ACRYGLASS", "ACRYLUX", "ACRYMATTE"],
  },
  {
    slug: "commercial",
    name: "Commercial & Retail Spaces",
    tagline: "High-Traffic Durability for Public Environments",
    desc: "Class B1 fire-rated and 3H scratch-resistant surfaces built for corporate reception desks, retail showrooms, luxury boutique cladding, and hospitality.",
    image: "/images/gallery/commercial-premium.png",
    benefits: ["Class B1 Fire Rating", "Heavy-Traffic Ready", "Commercial Clean Safe", "Large Format"],
    popularProducts: ["ACRYGLASS", "ACRYLUX", "ACRYGLASS MATTE"],
  },
  {
    slug: "offices",
    name: "Executive Office Spaces",
    tagline: "Professional Surfaces for High-End Workspaces",
    desc: "Distraction-free anti-fingerprint matte surfaces for boardroom conference tables, executive cabins, and acoustic wall paneling.",
    image: "/images/gallery/office-1.jpg",
    benefits: ["Anti-Glare Matte", "Executive Touch", "Acoustic Friendly", "Durable Work Surface"],
    popularProducts: ["ACRYMATTE", "ACRYSILK"],
  },
  {
    slug: "kids-rooms",
    name: "Children's Rooms",
    tagline: "Non-Toxic, Vibrant & Easy to Clean",
    desc: "Eco-friendly, non-toxic PMMA panels that easily wipe clean from crayon and juice spills, built to survive active energetic play.",
    image: "/images/gallery/kids-1.jpg",
    benefits: ["Non-Toxic & Safe", "Stain Resistant", "Vibrant Colors", "High Impact"],
    popularProducts: ["ACRYLUX", "ACRYGLASS"],
  },
  {
    slug: "wall-paneling",
    name: "Architectural Wall Paneling",
    tagline: "Large-Format Seamless Cladding",
    desc: "Transform plain drywall and masonry into mirror-like or matte-glass luxury feature walls with large 8ft x 4ft seamless acrylic sheets.",
    image: "/images/gallery/wall-1.jpg",
    benefits: ["8ft x 4ft Format", "Mirror Clarity", "Architectural Depth", "Quick Installation"],
    popularProducts: ["ACRYGLASS", "ACRYGLASS MATTE"],
  },
];

export default function ApplicationsHubPage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Applications", url: "https://www.surajwood.com/applications" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] flex flex-col justify-between overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.18),rgba(255,255,255,0))]" />
        
        {/* Spacer for navbar */}
        <div className="h-32 lg:h-40" />

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
                  Applications
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Application Directory
              </p>
            </div>

            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Engineered Surfaces for <br />
              <span className="text-copper italic">Every Room & Space</span>
            </h1>

            <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed font-light italic">
              From moisture-heavy modular kitchens to high-traffic commercial showrooms, discover how SurajWood German PUR-bonded acrylic panels elevate modern Indian interiors.
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full h-1 bg-gradient-to-r from-copper/50 to-transparent" />
      </section>

      {/* ── Application Grid ────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">
              Performance by Room
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy">
              Explore Our Application Solutions
            </h2>
            <div className="w-20 h-1 bg-copper mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 mt-4 text-sm md:text-base">
              Each interior space has unique physical demands. Select an application to view recommended PMMA finishes, installation guidelines, and technical comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {APPLICATION_LIST.map((app) => (
              <Link
                key={app.slug}
                href={`/applications/${app.slug}`}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={app.image}
                    alt={app.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    View Specifications <ArrowRight size={12} />
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-navy text-xl group-hover:text-copper transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-copper text-xs font-semibold mt-1 mb-3">
                    {app.tagline}
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {app.desc}
                  </p>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {app.benefits.slice(0, 2).map((b) => (
                        <span
                          key={b}
                          className="bg-cream text-navy text-[10px] font-medium px-2 py-0.5 rounded-full"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-copper group-hover:translate-x-1 transition-transform">
                      <span>Explore Application</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Technology Highlights ───────────────────────────────────── */}
      <section className="bg-cream py-20 px-6 border-t border-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-cream-dark/60">
              <Droplets className="text-copper w-10 h-10 mb-4" />
              <h4 className="font-heading font-bold text-navy text-lg mb-2">100% Waterproof Bond</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                German PUR hotmelt prevents moisture ingress and delamination across all humid environments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-cream-dark/60">
              <Flame className="text-copper w-10 h-10 mb-4" />
              <h4 className="font-heading font-bold text-navy text-lg mb-2">Class B1 Fire Rating</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Meets strict commercial and residential building fire safety codes across India.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-cream-dark/60">
              <Shield className="text-copper w-10 h-10 mb-4" />
              <h4 className="font-heading font-bold text-navy text-lg mb-2">3H Scratch Hardness</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Tougher than traditional laminates and PU paint, resisting daily abrasion and wear.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-cream-dark/60">
              <Sparkles className="text-copper w-10 h-10 mb-4" />
              <h4 className="font-heading font-bold text-navy text-lg mb-2">10-Year UV Stability</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Zero yellowing or fading under intense Indian sunlight with xenon arc certified PMMA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="bg-navy py-20 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold">
            Need Expert Material Advice for Your Project?
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our architectural surface consultants can help specify the right acrylic panel thickness, substrate core, and finish for your exact room requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/contact#sample"
              className="bg-copper hover:bg-copper-light text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-copper/20"
            >
              Order Sample Swatch Kit
            </Link>
            <Link
              href="/dealers"
              className="border border-white/30 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all"
            >
              Find Local Dealers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
