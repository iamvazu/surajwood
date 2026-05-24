import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import shadesData from "@/data/shades.json";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";
import PSEOLeadForm from "@/components/forms/PSEOLeadForm";

// ── Static Params — pre-build all 15 shade pages ──────────────────────────
export async function generateStaticParams() {
  return shadesData.map((shade) => ({
    slug: shade.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

// ── Metadata Generator ────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const shade = shadesData.find((s) => s.slug === params.slug);
  if (!shade) return { title: "Shade Not Found | SurajWood" };

  return {
    title: `Premium ${shade.name} Acrylic Panels | Kitchen & Wardrobe | SurajWood`,
    description: `${shade.tagline}. ${shade.psychology.slice(0, 140)}... Browse highlights and recommended products.`,
    alternates: { canonical: `https://www.surajwood.com/shades/${params.slug}` },
  };
}

export default function ShadeDetailPage({ params }: PageProps) {
  const shade = shadesData.find((s) => s.slug === params.slug);
  if (!shade) notFound();

  // Mapped mock galleries
  const gallerySuffix = params.slug === "white" || params.slug === "navy-blue" || params.slug === "sage-green" || params.slug === "ivory" ? "kitchen" : "wardrobe";
  const galleryImages = [
    `/images/gallery/${gallerySuffix}-1.jpg`,
    `/images/gallery/${gallerySuffix}-2.jpg`,
    `/images/gallery/${gallerySuffix}-3.jpg`,
    `/images/gallery/${gallerySuffix}-4.jpg`,
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Shop By Shade", url: "https://www.surajwood.com/shades" },
      { name: shade.name, url: `https://www.surajwood.com/shades/${params.slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── BREADCRUMB HEADER ──────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-cream border-b border-cream-dark/60 py-3 px-6">
        <ol className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#DC2626] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li>
            <Link href="/shades" className="hover:text-[#DC2626] transition-colors">
              Shop By Shade
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="text-navy font-semibold" aria-current="page">
            {shade.name}
          </li>
        </ol>
      </nav>

      {/* ── HERO H1 ───────────────────────────────────────────────────── */}
      <section className="bg-navy py-20 px-6 overflow-hidden relative text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 transform translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block bg-copper text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Color Spotlight
              </span>
              <span
                className="w-4 h-4 rounded-full border border-white/20 inline-block shadow-sm"
                style={{ backgroundColor: shade.hex }}
              />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Hex Swatch: {shade.hex}
              </span>
            </div>
            
            <h1 className="font-playfair font-bold text-3xl md:text-5xl lg:text-7xl text-white leading-[1.1] mb-6">
              Premium <span className="text-copper italic">{shade.name}</span> <br /> Acrylic Panels
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed font-light italic">
              &quot;{shade.tagline}&quot; — Engineered with 10-year UV stability and E1 E-grade board lamination.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#order-swatch"
                className="inline-flex items-center bg-copper hover:bg-copper-light text-white font-bold px-8 py-4 rounded transition-all duration-300 shadow-lg shadow-copper/20"
              >
                Inquire & Order Swatch
              </a>
              <a
                href="#specifications"
                className="inline-flex items-center bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded border border-white/20 backdrop-blur-sm transition-all"
              >
                Technical Spec
              </a>
            </div>
          </div>

          {/* Luxury Large Swatch Display */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-2 bg-white/5 backdrop-blur-md">
              <div
                className="w-full h-full rounded-2xl"
                style={{ backgroundColor: shade.hex }}
              />
              {/* Gloss shine card effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 rotate-45 scale-150 translate-x-2 translate-y-2 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ── DESIGN PSYCHOLOGY & PRODUCTS ──────────────────────────────── */}
      <section id="specifications" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Psychology & Highlights */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-playfair font-bold text-2xl md:text-4xl text-navy">
              Design Psychology: Decorating with {shade.name}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg font-light">
              {shade.psychology} Selecting factory prelaminated panels ensures that this rich pigment remains pristine. Our optical-grade PMMA polymer has absolute chemical homogeneity, providing zero color drift or fading under daily sunlight.
            </p>

            <h3 className="font-heading font-bold text-xl text-navy pt-6">Product Highlights</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shade.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-cream/40 p-4 rounded-2xl border border-cream-dark">
                  <span className="text-copper font-bold text-lg leading-none mt-0.5">✓</span>
                  <span className="text-gray-700 text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>

            {/* Recommended Products Supporting this Shade */}
            <div className="pt-12">
              <h3 className="font-playfair font-bold text-2xl text-navy mb-6">
                Available Product Ranges in {shade.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shade.products.map((prodSlug) => (
                  <Link
                    key={prodSlug}
                    href={`/products/${prodSlug}`}
                    className="group bg-cream/40 border border-cream-dark rounded-3xl p-6 hover:shadow-md transition-shadow block"
                  >
                    <span className="text-copper text-[10px] font-bold uppercase tracking-widest block mb-2">
                      Range Availability
                    </span>
                    <h4 className="font-heading font-bold text-navy text-lg group-hover:text-copper transition-colors">
                      {prodSlug.toUpperCase()} Collection
                    </h4>
                    <p className="text-gray-600 text-xs mt-2 font-light">
                      Available in E1 MDF, calibrated plywood, and PB substrate cores. Click to browse sheens and physical test blueprints.
                    </p>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Blueprint */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            
            <div className="bg-navy rounded-[30px] p-8 text-white shadow-2xl">
              <h3 className="font-heading font-bold text-xl mb-6 border-b border-white/10 pb-4">
                Color Specifications
              </h3>
              <dl className="space-y-4 text-xs md:text-sm">
                {[
                  { label: "Color Name", value: shade.name },
                  { label: "Hexadecimal Swatch", value: shade.hex },
                  { label: "UV Xenon Test", value: "Delta E < 2 after 1000h (Fading-free)" },
                  { label: "Fire Code", value: "Class B1 Flame Retardant" },
                  { label: "Eco Standard", value: "Lead & VOC Formaldehyde Free" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 border-b border-white/5 pb-2">
                    <dt className="text-white/50 text-[10px] uppercase tracking-widest">{label}</dt>
                    <dd className="text-white font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#order-swatch"
                className="mt-8 block w-full text-center bg-white text-navy font-bold py-3.5 rounded hover:bg-copper hover:text-white transition-all text-xs md:text-sm"
              >
                Inquire & Order Sample
              </a>
            </div>

            <div className="p-6 bg-cream border border-cream-dark rounded-[24px] flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                🚚
              </div>
              <div>
                <p className="text-navy font-bold text-sm">Direct Project Supply</p>
                <p className="text-gray-500 text-xs font-light">Catalogs dispatched within 24 hours</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── INTERIOR GALLERIES ────────────────────────────────────────── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-navy">
              Decorated {shade.name} Galleries
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Browse actual high-resolution interior layouts styled in this color palette.
            </p>
            <div className="w-20 h-1 bg-copper mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-[4/3] bg-navy"
              >
                <Image
                  src={img}
                  alt={`${shade.name} capture ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM (ROUTED TO CENTRAL DESK) ────────────────── */}
      <section id="order-swatch" className="bg-white py-24 px-6 relative border-t border-cream-dark">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-cream-dark">
            <div className="text-center mb-12">
              <span className="text-copper font-bold text-sm uppercase tracking-widest">Inquiry Desk</span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-navy mt-4">
                Request a {shade.name} Swatch Sample
              </h2>
              <p className="text-gray-600 mt-4 text-base md:text-lg font-light">
                Order a physical hand swatch to feel the sheen and verify color authenticity under your home&apos;s specific lighting conditions. Mapped directly to our central sales desk.
              </p>
            </div>
            {/* Form mapped to contact form / central sales team routing as requested */}
            <PSEOLeadForm
              city="Central Sales Office"
              productInterest={`SHADE INQUIRY: ${shade.name}`}
              sourcePage={`/shades/${shade.slug}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
