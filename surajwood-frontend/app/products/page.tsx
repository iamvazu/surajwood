import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "All Products — Premium Acrylic Panels & Aluminum Profiles",
  description:
    "Browse the complete SurajWood product range: ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS prelaminated PMMA acrylic panels, and AL-PROFHAN aluminum profiles for modular kitchens and wardrobes.",
  alternates: { canonical: "https://www.surajwood.com/products" },
  openGraph: {
    title: "SurajWood Products — PMMA Acrylic Panels & Aluminum Profiles",
    description:
      "Factory-direct prelaminated acrylic panels in 5 finishes plus premium aluminum profiles. German PUR technology. Pan-India delivery.",
    url: "https://www.surajwood.com/products",
    images: [
      {
        url: "/images/banner/bg3.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood Complete Product Range",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Product categories data
// ---------------------------------------------------------------------------

interface ProductCategory {
  slug: string;
  name: string;
  tagline: string;
  finish: string;
  image: string;
  shadeCount: string;
}

const ACRYLIC_PANELS: ProductCategory[] = [
  {
    slug: "acrylux",
    name: "ACRYLUX",
    tagline: "The best-selling satin finish panel for modern kitchens and wardrobes.",
    finish: "Satin Finish",
    image: "/images/products/acrylux/acrylux-solid-1.png",
    shadeCount: "30+ Shades",
  },
  {
    slug: "acrysilk",
    name: "ACRYSILK",
    tagline: "A softer, silk-like satin texture for understated elegance.",
    finish: "Soft Satin Finish",
    image: "/images/products/acrysilk/acrysilk-1.png",
    shadeCount: "6+ Shades",
  },
  {
    slug: "acrymatte",
    name: "ACRYMATTE",
    tagline: "True matte with anti-fingerprint technology for minimal interiors.",
    finish: "Matte Finish",
    image: "/images/products/acrymatte/acrymatte-1.png",
    shadeCount: "11+ Shades",
  },
  {
    slug: "acryglass",
    name: "ACRYGLASS",
    tagline: "Mirror-like high-gloss for maximum visual impact and reflectivity.",
    finish: "High Gloss Finish",
    image: "/images/products/acryglass/acryglass1.png",
    shadeCount: "6+ Shades",
  },
  {
    slug: "acryglass-matte",
    name: "ACRYGLASS MATTE",
    tagline: "The best of both worlds — glass-like depth with a matte touch.",
    finish: "Matte Glass Finish",
    image: "/images/products/acryglass-matte/acryglass-matte-1.png",
    shadeCount: "7+ Shades",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProductsHubPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="bg-navy py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-3">
            Our Product Range
          </p>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
            Premium Acrylic Panels &{" "}
            <span className="text-copper-light">Aluminum Profiles</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Factory-direct from our Bahadurgarh facility. European technology.
            50+ finishes across 5 collections. Pan-India delivery.
          </p>
        </div>
      </section>

      {/* PMMA Acrylic Panels */}
      <section className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-navy">
              Prelaminated Acrylic Panels (PMMA)
            </h2>
            <div className="flex-1 h-px bg-cream-dark" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {ACRYLIC_PANELS.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square bg-cream overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} — ${product.finish} acrylic panel`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute top-3 right-3 bg-navy/80 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {product.shadeCount}
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block text-[10px] font-semibold text-copper bg-copper/10 px-2 py-0.5 rounded-full mb-2">
                    {product.finish}
                  </span>
                  <h3 className="font-heading font-bold text-base text-navy">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                  <span className="inline-block mt-3 text-copper font-semibold text-xs group-hover:underline underline-offset-2">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon — Additional Categories */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-navy">
              Coming Soon
            </h2>
            <div className="flex-1 h-px bg-cream-dark" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "AL-PROFHAN Aluminum Profiles",
                desc: "Ottimo, Aerolinea, Luminare & more series for modular furniture.",
                badge: "New",
              },
              {
                name: "PetG Prelaminated Panels",
                desc: "Budget-friendly panels for cost-conscious projects.",
                badge: "Coming",
              },
              {
                name: "Acrylic Laminates",
                desc: "High-pressure laminates with acrylic surface finish.",
                badge: "Coming",
              },
              {
                name: "Membrane Shutters",
                desc: "Complete shutter solutions for modular kitchens.",
                badge: "Coming",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-cream/50 border border-cream-dark rounded-xl p-5 flex flex-col"
              >
                <span className="inline-block self-start text-[10px] font-bold text-white bg-copper px-2 py-0.5 rounded-full mb-3">
                  {item.badge}
                </span>
                <h3 className="font-heading font-bold text-sm text-navy mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Authority CTA */}
      <section className="bg-navy py-12 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Not Sure Which Panel is Right?
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Our team of material experts will help you select the perfect finish
            for your project. Get a free consultation and sample kit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?inquiry=sample-kit"
              className="bg-copper hover:bg-copper-dark text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 text-sm shadow-copper"
            >
              Request Free Sample Kit
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-full transition-all duration-300 text-sm"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
