import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import designData from "@/data/design-ideas.json";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Premium Acrylic Design Ideas & Layouts | SurajWood India",
  description:
    "Explore 35+ professional modular kitchen, wardrobe, TV unit, and bathroom cabinet layout designs using ACRYLUX and ACRYMATTE panels. Get inspired for your luxury home renovation.",
  openGraph: {
    title: "Premium Acrylic Design Ideas & Layouts | SurajWood",
    description:
      "Get modular kitchen, wardrobe, and media wall layout designs using high-gloss and matte PMMA panels.",
    url: "https://www.surajwood.com/design-ideas",
    images: [{ url: "/images/gallery/kitchen-1.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.surajwood.com/design-ideas" },
};

const CATEGORY_IMAGES: Record<string, string> = {
  kitchen: "/images/gallery/kitchen-1.jpg",
  bedroom: "/images/gallery/wardrobe-3.jpg",
  wardrobe: "/images/gallery/wardrobe-1.jpg",
  "living-room": "/images/gallery/tv-1.jpg",
  bathroom: "/images/gallery/bathroom-1.jpg",
  office: "/images/gallery/commercial-premium.png",
  retail: "/images/gallery/commercial-2.jpg",
  "other-rooms": "/images/gallery/kids-1.jpg",
};

export default function DesignIdeasHub() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Design Ideas", url: "https://www.surajwood.com/design-ideas" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image with Ken Burns */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/gallery/kitchen-new-3.jpg"
              alt="Luxury Interior Design Ideas Backdrop"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Sophisticated Gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

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
                  Design Ideas
                </li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Interior Inspiration
              </p>
            </div>

            {/* H1 */}
            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Premium Surfacing <br />
              <span className="text-copper italic">Design Ideas Hub</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed font-light italic">
              Browse 35+ premium room-by-room modular kitchen, sliding wardrobe, TV unit, and office surface design layouts utilizing E1-Grade PMMA boards.
            </p>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="relative z-10 w-full h-1 bg-gradient-to-r from-copper/50 to-transparent" />
      </section>

      {/* ── GRID OF CATEGORIES ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">
              Browse Room Layouts
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy">
              Architectural Design Categories
            </h2>
            <div className="w-20 h-1 bg-copper mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designData.categories.map((cat) => {
              const image = CATEGORY_IMAGES[cat.slug] || "/images/gallery/1.jpg";
              const ideasCount = designData.ideas.filter((i) => i.category === cat.slug).length;

              return (
                <Link
                  key={cat.slug}
                  href={`/design-ideas/${cat.slug}`}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] block bg-navy shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Image
                    src={image}
                    alt={`${cat.name} interior layouts`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Luxury black overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-copper text-[10px] font-bold uppercase tracking-widest mb-1.5">
                      {ideasCount} Design Layouts
                    </span>
                    <h3 className="font-heading font-bold text-white text-xl group-hover:text-copper transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-white/60 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                      {cat.description}
                    </p>
                    <span className="text-copper text-xs font-semibold mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse Designs →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 px-6 border-t border-cream-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-navy text-3xl font-bold mb-4">
            Need Custom Fabrication Advice?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our architectural consulting desk helps architects and homeowners specify substrate thicknesses, PUR bonding requirements, and color combinations for custom layouts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-copper hover:bg-copper-light text-white font-bold px-8 py-3.5 rounded transition-all shadow-lg shadow-copper/10"
            >
              Get Professional Consultation
            </Link>
            <a
              href="tel:+919009171819"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold px-8 py-3.5 rounded transition-all"
            >
              Call +91-9009171819
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
