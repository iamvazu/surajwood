import Link from "next/link";
import type { Metadata } from "next";
import shadesData from "@/data/shades.json";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shop Acrylic Panels By Shade & Swatch | SurajWood India",
  description:
    "Browse 15+ premium color swatches (Arctic White, Navy Blue, Sage Green, Rose Gold, Champagne, Teak, Walnut) for modular kitchens and wardrobes. Get free physical sample swatches.",
  openGraph: {
    title: "Shop Acrylic Panels By Shade & Swatch | SurajWood",
    description:
      "Explore 15 luxury color options across our PMMA high-gloss, soft-satin, and nano-matte panel ranges.",
    url: "https://www.surajwood.com/shades",
    images: [{ url: "/images/banner/bg3.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.surajwood.com/shades" },
};

export default function ShadesHubPage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Shop By Shade", url: "https://www.surajwood.com/shades" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] flex flex-col justify-between overflow-hidden bg-navy text-white">
        {/* Subtle background lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(184,115,51,0.15),rgba(255,255,255,0))]" />
        
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
                  Shop By Shade
                </li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Material Swatches
              </p>
            </div>

            {/* H1 */}
            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Shop PMMA Panels <br />
              <span className="text-copper italic">By Shade & Swatch</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed font-light italic">
              Explore 15 curated solid, metallic, and exotic wood swatches tailored for Indian interior design. Available in high-gloss, soft-satin, and nano-matte.
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full h-1 bg-gradient-to-r from-copper/50 to-transparent" />
      </section>

      {/* ── VISUAL SHADES LIST ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">
              Premium Palettes
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy">
              Select Your Color Swatch
            </h2>
            <div className="w-20 h-1 bg-copper mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {shadesData.map((shade) => (
              <Link
                key={shade.slug}
                href={`/shades/${shade.slug}`}
                className="group flex flex-col bg-cream/15 border border-cream-dark/60 rounded-3xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                {/* Large visual circular swatch with glass reflection effect */}
                <div className="relative w-24 h-24 rounded-full mx-auto mb-6 shadow-md border border-gray-100 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: shade.hex }}
                  />
                  {/* Gloss reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 rotate-45 scale-150 translate-x-1 translate-y-1" />
                </div>

                <h3 className="font-heading font-bold text-navy text-sm md:text-base group-hover:text-copper transition-colors">
                  {shade.name}
                </h3>
                
                <span className="inline-block text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">
                  {shade.products.join(" + ").toUpperCase()}
                </span>
                
                <p className="text-gray-500 text-xs mt-3 leading-relaxed font-light line-clamp-2">
                  {shade.tagline}
                </p>

                <span className="text-copper text-xs font-semibold mt-4 block opacity-0 group-hover:opacity-100 transition-opacity">
                  View Shade →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── SAMPLE KIT REQUEST CTA ────────────────────────────────────── */}
      <section className="bg-cream py-16 px-6 border-t border-cream-dark">
        <div className="max-w-4xl mx-auto text-center font-light">
          <h2 className="font-playfair text-navy text-3xl font-bold mb-4">
            Request a Free Swatch Sample Kit
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Designers and architects can order physical catalogs containing real 10cm x 10cm hand swatches of all 15 colors to verify thickness, scratch resistance, and sheen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-copper hover:bg-copper-light text-white font-bold px-8 py-3.5 rounded transition-all shadow-lg"
            >
              Order Sample Kit Swatches
            </Link>
            <a
              href="https://wa.me/919009171819?text=Hi%2c%20I%20want%20to%20request%20a%20physical%20acrylic%20shade%20card%20swatch%20kit."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold px-8 py-3.5 rounded transition-all"
            >
              Request via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
