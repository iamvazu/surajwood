import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import SchemaMarkup from "@/components/seo/SchemaMarkup";
import PSEOLeadForm from "@/components/forms/PSEOLeadForm";
import {
  getAllPSEOParams,
  getPSEOData,
  type PSEOPageData,
} from "@/lib/pseo-data";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from "@/lib/schema";

// ---------------------------------------------------------------------------
// Static params — all 1,250 combinations
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return getAllPSEOParams();
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: { product: string; application: string; city: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = getPSEOData(params.product, params.application, params.city);
  if (!data) return { title: "Not Found" };

  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: {
      canonical: `https://www.surajwood.com/${params.product}/${params.application}/${params.city}`,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      url: `https://www.surajwood.com/${params.product}/${params.application}/${params.city}`,
      siteName: "Suraj Wood",
      images: [
        {
          url: `https://www.surajwood.com/images/og/${params.product}-${params.application}.jpg`,
          width: 1200,
          height: 630,
          alt: data.seo.h1,
        },
      ],
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: [`https://www.surajwood.com/images/og/${params.product}-${params.application}.jpg`],
    }
  };
}

// ---------------------------------------------------------------------------
// FAQ generator — specific to each combination
// ---------------------------------------------------------------------------

function buildFAQs(data: PSEOPageData) {
  const { product, application, city } = data;
  return [
    {
      question: `What is the best acrylic panel for ${application.namePlural.toLowerCase()} in ${city.name}?`,
      answer: `${product.name} ${product.finishLabel} acrylic panels are the gold standard for ${application.namePlural.toLowerCase()} in ${city.name}. Unlike standard laminates, our panels feature German PUR hotmelt bonding and a 1.0mm - 1.5mm PMMA layer. Given ${city.name}'s ${city.tier === 1 ? "high-end design expectations" : "need for durable furniture"}, these panels offer the perfect mix of aesthetics and 10-year UV stability.`,
    },
    {
      question: `How does ${city.name}'s climate affect ${product.name} acrylic panels?`,
      answer: `${city.climateNote} Suraj Wood panels are engineered to be non-porous and moisture-proof. The PMMA acrylic surface prevents fungal growth and swelling, which is a common issue in ${city.name} during monsoons. The Class B1 fire rating also adds a layer of safety for ${application.name.toLowerCase()} use.`,
    },
    {
      question: `Why choose SurajWood over local laminates in ${city.name}?`,
      answer: `SurajWood offers 3H scratch resistance and anti-fingerprint technology that traditional laminates lack. In ${city.name}, where dust and usage can be high, our panels stay cleaner for longer and never delaminate thanks to the PUR bonding process. We provide direct supply to ${city.name} to ensure the most competitive pricing for premium quality.`,
    },
  ];
}

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Product spec data
// ---------------------------------------------------------------------------

const PRODUCT_SPECS: Record<
  string,
  { thickness: string; dimensions: string; colours: string; material: string }
> = {
  acrylux: {
    thickness: "8mm, 18mm, 25mm",
    dimensions: "8ft × 4ft (2440mm × 1220mm)",
    colours: "37+ shades (Solids, Pearls, Metallics)",
    material: "PMMA polymer + PUR adhesive + E1 MDF",
  },
  acrysilk: {
    thickness: "8mm, 18mm, 25mm",
    dimensions: "8ft × 4ft (2440mm × 1220mm)",
    colours: "30+ soft-satin shades (Anti-fingerprint)",
    material: "Micro-textured PMMA + PUR adhesive + E1 MDF",
  },
  acrymatte: {
    thickness: "8mm, 18mm, 25mm",
    dimensions: "8ft × 4ft (2440mm × 1220mm)",
    colours: "40+ deep matte shades",
    material: "Nano PMMA + PUR adhesive + E1 MDF",
  },
  acryglass: {
    thickness: "1.5mm optical-grade acrylic on 18mm MDF",
    dimensions: "8ft × 4ft (2440mm × 1220mm)",
    colours: "50+ high-gloss shades",
    material: "High-clarity PMMA + PUR adhesive + E1 MDF",
  },
  "acryglass-matte": {
    thickness: "1.5mm matte-finish glass acrylic on 18mm MDF",
    dimensions: "8ft × 4ft (2440mm × 1220mm)",
    colours: "25+ luxury matte-glass shades",
    material: "Optical matte PMMA + PUR adhesive + E1 MDF",
  },
};

// ---------------------------------------------------------------------------
// Product hero mapping
// ---------------------------------------------------------------------------

const PRODUCT_HERO_IMAGES: Record<string, string> = {
  acrylux: "/images/products/acrylux/acrylux-solid-1.png",
  acrysilk: "/images/products/acrysilk/acrysilk-1.png",
  acrymatte: "/images/products/acrymatte/acrymatte-1.png",
  acryglass: "/images/products/acryglass/acryglass1.png",
  "acryglass-matte": "/images/products/acryglass-matte/acryglass-matte-1.png",
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function PSEOPage({ params }: PageProps) {
  const data = getPSEOData(params.product, params.application, params.city);
  if (!data) notFound();

  const { product, application, city, seo, introductionParagraphs, aeoSummary, localContextHeading, localContextBody, comparisonData } = data;
  const faqs = buildFAQs(data);
  const specs = PRODUCT_SPECS[product.slug] ?? PRODUCT_SPECS.acrylux;
  const heroImage = PRODUCT_HERO_IMAGES[product.slug] ?? PRODUCT_HERO_IMAGES.acrylux;

  // Image gallery prefix based on application slug
  const galleryPrefix = application.slug === "kitchens" ? "kitchen" :
                        application.slug === "wardrobes" ? "wardrobe" :
                        "commercial";

  // Schema markup
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.surajwood.com" },
    { name: "Products", url: "https://www.surajwood.com/products/acrylux" },
    { name: product.name, url: `https://www.surajwood.com/products/${product.slug}` },
    {
      name: application.namePlural,
      url: `https://www.surajwood.com/applications/${application.slug}`,
    },
    {
      name: city.name,
      url: `https://www.surajwood.com/${product.slug}/${application.slug}/${city.slug}`,
    },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const localBusinessSchema = generateLocalBusinessSchema(city.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} Acrylic ${application.namePlural} Panels`,
    description: product.description,
    brand: { "@type": "Brand", name: "Suraj Wood" },
    url: `https://www.surajwood.com/${product.slug}/${application.slug}/${city.slug}`,
    material: specs.material,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Suraj Wood Products Pvt. Ltd.",
      },
      areaServed: city.name,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Finish Type", value: product.finishLabel },
      { "@type": "PropertyValue", name: "Thickness", value: specs.thickness },
      { "@type": "PropertyValue", name: "Dimensions", value: specs.dimensions },
      { "@type": "PropertyValue", name: "Scratch Resistance", value: "3H pencil hardness" },
      { "@type": "PropertyValue", name: "UV Stability", value: "10+ years, no yellowing" },
      { "@type": "PropertyValue", name: "Fire Rating", value: "Class B1" },
      { "@type": "PropertyValue", name: "Warranty", value: "5 years manufacturer warranty" },
    ],
  };

  return (
    <>
      <SchemaMarkup
        schemas={[breadcrumbSchema, faqSchema, localBusinessSchema, productSchema]}
      />

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-cream border-b border-gray-200 py-3 px-6"
      >
        <ol className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <Link
              href={`/products/${product.slug}`}
              className="hover:text-navy transition-colors"
            >
              {product.name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <Link
              href={`/applications/${application.slug}`}
              className="hover:text-navy transition-colors"
            >
              {application.namePlural}
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li className="text-navy font-medium" aria-current="page">
            {city.name}
          </li>
        </ol>
      </nav>

      {/* ── Hero / H1 ───────────────────────────────────────────────────── */}
      <section className="bg-navy py-14 px-6 overflow-hidden relative">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-copper/5 -skew-x-12 transform translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block bg-copper text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {product.finishLabel} Series
              </span>
              {city.tier === 1 && (
                <span className="inline-block bg-white/10 text-copper-light text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-copper/30">
                  Premium Market Selection
                </span>
              )}
              <span className="inline-block bg-white/5 text-white/50 text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                {city.name}, {city.state}
              </span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              {seo.h1}
            </h1>
            <p className="mt-6 text-white/80 text-xl max-w-2xl leading-relaxed font-light italic">
              Transforming {city.name} interiors with German-engineered acrylic excellence.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#get-quote"
                className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-copper/20 hover:-translate-y-1"
              >
                Get Price Quote
              </a>
              <a
                href="#technical"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                Technical Specs
              </a>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-copper/20 blur-3xl rounded-full -z-10 scale-75" />
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image 
                  src={heroImage}
                  alt={`${product.name} in ${city.name}`}
                  fill
                  className="object-cover"
                  priority
                />
             </div>
          </div>
        </div>
      </section>

      {/* ── AEO Quick Answer (Answer Engine Optimization) ────────────────── */}
      <section className="bg-cream-dark py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border-l-8 border-copper shadow-sm">
            <h2 className="text-navy font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-copper rounded-full animate-pulse" />
              Quick Summary for Architects & Homeowners
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed font-medium italic">
              &quot;{aeoSummary}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ── Introduction & Specs ────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-heading font-bold text-3xl text-navy">
              Elevating {application.namePlural} in {city.name} with {product.name}
            </h2>
            {introductionParagraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg">
                {para}
              </p>
            ))}
            
            {/* Comparison Table Section (GEO Optimization) */}
            <div className="mt-12 pt-12 border-t border-gray-100">
              <h3 className="font-heading font-bold text-2xl text-navy mb-6">
                Material Comparison: Acrylic vs. Alternatives
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="p-4 text-sm font-semibold border-r border-white/10">Feature</th>
                      <th className="p-4 text-sm font-semibold border-r border-white/10">SurajWood Acrylic</th>
                      <th className="p-4 text-sm font-semibold border-r border-white/10">PETG Board</th>
                      <th className="p-4 text-sm font-semibold border-r border-white/10">Laminate</th>
                      <th className="p-4 text-sm font-semibold">PU Paint</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {comparisonData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream/30"}>
                        <td className="p-4 font-bold text-navy border-r border-gray-200">{row.feature}</td>
                        <td className="p-4 text-gray-800 font-semibold bg-copper/5 border-r border-gray-200">{row.surajWood}</td>
                        <td className="p-4 text-gray-600 border-r border-gray-200">{row.petg}</td>
                        <td className="p-4 text-gray-600 border-r border-gray-200">{row.laminate}</td>
                        <td className="p-4 text-gray-600">{row.puPaint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-gray-500 italic">
                *Data based on standard laboratory tests for chemical resistance and surface hardness.
              </p>
            </div>
          </div>

          {/* Technical Spec Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-navy rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="font-heading font-bold text-xl mb-6 border-b border-white/10 pb-4">
                Technical Blueprint
              </h3>
              <dl className="space-y-4">
                {[
                  { label: "Surface Layer", value: "1.0mm - 1.5mm PMMA Polymer" },
                  { label: "Core", value: "18mm E1 Grade MDF" },
                  { label: "Bonding", value: "German PUR Hotmelt" },
                  { label: "Finish", value: product.finishLabel },
                  { label: "Hardness", value: "3H (Anti-scratch)" },
                  { label: "UV Stability", value: "Xenon Arc Tested" },
                  { label: "Fire Safety", value: "Class B1 Rated" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 border-b border-white/5 pb-2">
                    <dt className="text-white/50 text-xs uppercase tracking-widest">{label}</dt>
                    <dd className="text-white font-medium text-right text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#get-quote"
                className="mt-8 block w-full text-center bg-white text-navy font-bold py-3 rounded-xl hover:bg-copper hover:text-white transition-all duration-300"
              >
                Get Sample Kit
              </a>
            </div>
            
            <div className="mt-6 p-6 bg-cream border border-gray-100 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                🚚
              </div>
              <div>
                <p className="text-navy font-bold text-sm">Direct Supply in {city.name}</p>
                <p className="text-gray-500 text-xs">Project delivery within 3-5 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Benefits ─────────────────────────────────────────── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy">
              Engineered for the {application.name} Environment
            </h2>
            <div className="w-20 h-1.5 bg-copper mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              {application.roomContext}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-2 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image 
                    src={`/images/gallery/${galleryPrefix}-${i}.jpg`}
                    alt={`${application.name} Example ${i}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 pt-0">
                  <p className="text-gray-800 text-lg leading-snug font-medium">
                    {application.benefits[i-1] || application.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local Insights Section ───────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-cream rounded-full -z-10" />
            <span className="text-copper font-bold text-sm uppercase tracking-widest">
              Regional Expertise: {city.name} Market
            </span>
            <h2 className="font-heading font-bold text-4xl text-navy mt-4 mb-8 leading-tight">
              {localContextHeading}
            </h2>
            <div className="prose prose-lg text-gray-700 max-w-none">
              <p className="leading-relaxed">
                {localContextBody}
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-cream rounded-2xl border-l-4 border-copper">
                <h4 className="font-bold text-navy text-sm mb-2 uppercase tracking-wide">Climate Resilience</h4>
                <p className="text-gray-600 text-sm leading-relaxed italic">{city.climateNote}</p>
              </div>
              <div className="p-6 bg-navy text-white rounded-2xl">
                <h4 className="font-bold text-copper-light text-sm mb-2 uppercase tracking-wide">Supply Logistics</h4>
                <p className="text-white/80 text-sm leading-relaxed">{city.dealerAvailability}</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px] bg-navy flex items-center justify-center p-12 text-center">
             <div className="space-y-8">
                <div className="text-6xl">🇮🇳</div>
                <h3 className="text-3xl font-bold text-white font-heading">Pan-India Support, <br/>Local {city.name} Expertise</h3>
                <div className="space-y-4 text-white/70">
                  <p>✓ 15+ Years Manufacturing Experience</p>
                  <p>✓ 10,000+ Premium Projects Completed</p>
                  <p>✓ Direct Factory-to-Site Supply</p>
                  <p>✓ 5-Year Comprehensive Warranty</p>
                </div>
                <a href="#get-quote" className="inline-block bg-copper text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-navy transition-all">
                  Contact Local Expert
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* ── Technical Deep-Dive (Entity Rich) ─────────────────────────────── */}
      <section id="technical" className="bg-navy-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-white">
              The Chemistry of Excellence
            </h2>
            <p className="text-white/50 mt-2">Deep technical breakdown of {product.name} construction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "PMMA Surface Layer",
                detail: "We use optical-grade Polymethyl Methacrylate (PMMA), an inorganic polymer known for its extreme transparency and UV stability. Unlike cheaper PVC panels, PMMA does not yellow, crack, or release VOCs over time.",
                icon: "🔬"
              },
              {
                title: "German PUR Bonding",
                detail: "Our panels are bonded using Polyurethane Reactive (PUR) hotmelt. This chemical reaction creates an irreversible cross-linked bond that is 100% moisture-proof and heat-resistant up to 120°C.",
                icon: "⚙️"
              },
              {
                title: "E1-Grade MDF Core",
                detail: "We utilize E1 standard Medium Density Fibreboard with low formaldehyde emission. The core is perfectly calibrated to ±0.1mm to ensure a ripple-free, mirror-like reflection on the acrylic face.",
                icon: "🪵"
              }
            ].map((item) => (
              <div key={item.title} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture Form ─────────────────────────────────────────────── */}
      <section id="get-quote" className="bg-white py-24 px-6 relative">
        <div className="absolute inset-0 bg-cream/30 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-gray-100">
            <div className="text-center mb-12">
              <span className="text-copper font-bold text-sm uppercase tracking-widest">Inquiry Desk</span>
              <h2 className="font-heading font-bold text-4xl text-navy mt-4">
                Partner with SurajWood in {city.name}
              </h2>
              <p className="text-gray-600 mt-4 text-lg">
                Request project-specific pricing and physical samples. Our {city.name} consulting team responds within 4 hours.
              </p>
            </div>
            <PSEOLeadForm
              city={city.name}
              productInterest={product.name}
              sourcePage={`/${product.slug}/${application.slug}/${city.slug}`}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ Section (AEO) ───────────────────────────────────────────── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-navy mb-10 text-center">
            Common Inquiries for {city.name} Projects
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer list-none font-bold text-navy hover:text-copper transition-colors">
                  <span className="text-lg">{faq.question}</span>
                  <span
                    className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-copper text-xl group-open:rotate-45 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700 text-lg leading-relaxed border-t border-gray-50 pt-6">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Link Network ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/products/${product.slug}`}
              className="px-8 py-4 bg-navy text-white font-bold rounded-full hover:bg-copper transition-all"
            >
              Explore Full {product.name} Collection →
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-navy text-navy font-bold rounded-full hover:bg-navy hover:text-white transition-all"
            >
              Contact Our {city.name} Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
