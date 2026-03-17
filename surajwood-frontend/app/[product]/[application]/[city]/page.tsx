import type { Metadata } from "next";
import Link from "next/link";
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
// Static params — all 50 combinations
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
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// FAQ generator — three questions specific to each combination
// ---------------------------------------------------------------------------

function buildFAQs(data: PSEOPageData) {
  const { product, application, city } = data;
  return [
    {
      question: `What is the best acrylic panel for ${application.namePlural.toLowerCase()} in ${city.name}?`,
      answer: `${product.name} ${product.finishLabel} acrylic panels are an outstanding choice for ${application.namePlural.toLowerCase()} in ${city.name}. ${product.description} Given ${city.climateNote.toLowerCase()}, the product's moisture-resistant, non-porous PMMA surface and 10-year UV stability guarantee performance over the long term. Contact our ${city.name} team for a project-specific recommendation.`,
    },
    {
      question: `How does ${city.name}'s climate affect ${product.name} acrylic panels?`,
      answer: `${product.name} is specifically engineered to handle varied Indian climatic conditions. ${city.climateNote} The PMMA acrylic layer is bonded to an 18mm MDF substrate using German PUR hotmelt adhesive, which prevents delamination across temperature and humidity cycles. The surface carries a Class B1 fire rating and 3H scratch-resistance rating, ensuring consistent performance in ${city.name}'s environment.`,
    },
    {
      question: `What is the price of ${product.name} acrylic panels in ${city.name}?`,
      answer: `${product.name} acrylic panel pricing in ${city.name} varies depending on the sheet dimensions (standard 8ft × 4ft), colour selection, core material (18mm MDF or plywood substrate), and order quantity. We supply direct from our manufacturing facility in Bahadurgarh, Haryana, keeping costs competitive. ${city.dealerAvailability} Contact our sales team at +91-9999995553 or sales@surajwood.com for a project quotation.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Related page helpers
// ---------------------------------------------------------------------------

const ALL_PRODUCTS = ["acrylux", "acrysilk", "acrymatte", "acryglass", "acryglass-matte"];
const ALL_CITIES = ["delhi", "mumbai", "bangalore", "hyderabad", "chennai"];
const PRODUCT_DISPLAY: Record<string, string> = {
  acrylux: "ACRYLUX",
  acrysilk: "ACRYSILK",
  acrymatte: "ACRYMATTE",
  acryglass: "ACRYGLASS",
  "acryglass-matte": "ACRYGLASS MATTE",
};
const CITY_DISPLAY: Record<string, string> = {
  delhi: "Delhi",
  mumbai: "Mumbai",
  bangalore: "Bangalore",
  hyderabad: "Hyderabad",
  chennai: "Chennai",
};

// ---------------------------------------------------------------------------
// Application benefits icon map
// ---------------------------------------------------------------------------

const BENEFIT_ICONS: Record<number, string> = {
  0: "🌊",
  1: "💪",
  2: "✨",
  3: "☀️",
  4: "🔥",
};

// ---------------------------------------------------------------------------
// Product spec data (static, mirrors PSEO product data)
// ---------------------------------------------------------------------------

const PRODUCT_SPECS: Record<
  string,
  { thickness: string; dimensions: string; colours: string; material: string }
> = {
  acrylux: {
    thickness: "1mm acrylic on 18mm MDF (total 19mm)",
    dimensions: "8ft × 4ft (2440mm × 1220mm) standard sheet",
    colours: "37+ satin shades including solids, pearls, and metallics",
    material: "PMMA acrylic + German PUR hotmelt adhesive + 18mm MDF substrate",
  },
  acrysilk: {
    thickness: "1mm micro-textured acrylic on 18mm MDF (total 19mm)",
    dimensions: "8ft × 4ft (2440mm × 1220mm) standard sheet",
    colours: "30+ soft-satin shades with superior anti-fingerprint coating",
    material: "Micro-textured PMMA acrylic + PUR adhesive + 18mm MDF",
  },
  acrymatte: {
    thickness: "1mm nano-coated acrylic on 18mm MDF (total 19mm)",
    dimensions: "8ft × 4ft (2440mm × 1220mm) standard sheet",
    colours: "40+ deep matte shades including dark tones and warm naturals",
    material: "Nano anti-fingerprint PMMA acrylic + PUR adhesive + 18mm MDF",
  },
  acryglass: {
    thickness: "1.5mm high-gloss acrylic on 18mm MDF (total 19.5mm)",
    dimensions: "8ft × 4ft (2440mm × 1220mm) standard sheet",
    colours: "50+ high-gloss shades with 95% light reflectivity",
    material: "Optical-grade PMMA acrylic + German PUR adhesive + 18mm MDF",
  },
  "acryglass-matte": {
    thickness: "1.5mm glass-clarity matte acrylic on 18mm MDF (total 19.5mm)",
    dimensions: "8ft × 4ft (2440mm × 1220mm) standard sheet",
    colours: "25+ luxury matte-glass shades for premium interiors",
    material: "Optical-grade matte PMMA + PUR adhesive + 18mm MDF substrate",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function PSEOPage({ params }: PageProps) {
  const data = getPSEOData(params.product, params.application, params.city);
  if (!data) notFound();

  const { product, application, city, seo, introductionParagraphs, localContextHeading, localContextBody } = data;
  const faqs = buildFAQs(data);
  const specs = PRODUCT_SPECS[product.slug] ?? PRODUCT_SPECS.acrylux;

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

  const otherCities = ALL_CITIES.filter((c) => c !== city.slug);
  const otherProducts = ALL_PRODUCTS.filter((p) => p !== product.slug);

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
      <section className="bg-navy py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block bg-copper/20 text-copper text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.finishLabel} Finish
            </span>
            <span className="inline-block bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full">
              {city.name}, {city.state}
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
            {seo.h1}
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl leading-relaxed">
            {seo.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#get-quote"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-300"
            >
              Request Quote
            </a>
            <a
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-7 py-3.5 rounded-lg transition-colors duration-300 border border-white/20"
            >
              View Full Specs
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust bar ───────────────────────────────────────────────────── */}
      <div className="bg-navy-light border-t border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 justify-center md:justify-start text-sm text-white/60">
          {[
            "15+ Years Manufacturing",
            "50+ Premium Shades",
            "10,000+ Projects Delivered",
            "5-Year Warranty",
            "Pan-India Delivery",
          ].map((stat) => (
            <span key={stat} className="flex items-center gap-1.5">
              <span className="text-copper">✓</span> {stat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Introduction ────────────────────────────────────────────────── */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-heading font-bold text-2xl text-navy">
              {product.name} Acrylic Panels for {application.namePlural} in{" "}
              {city.name}
            </h2>
            {introductionParagraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>

          {/* Quick spec card */}
          <div className="bg-cream rounded-2xl p-6 border border-gray-100 sticky top-24">
            <h3 className="font-heading font-semibold text-navy text-lg mb-4">
              {product.name} At a Glance
            </h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: "Finish", value: product.finishLabel },
                { label: "Thickness", value: specs.thickness },
                { label: "Sheet Size", value: specs.dimensions },
                { label: "Colours", value: specs.colours },
                { label: "Scratch Resistance", value: "3H pencil hardness" },
                { label: "UV Stability", value: "10+ years, no yellowing" },
                { label: "Fire Rating", value: "Class B1" },
                { label: "Warranty", value: "5 years" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">{label}</dt>
                  <dd className="text-gray-800 font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={`/products/${product.slug}`}
              className="mt-5 block text-center text-copper font-medium text-sm hover:text-copper-light transition-colors"
            >
              Full technical specification →
            </a>
          </div>
        </div>
      </section>

      {/* ── Application Benefits ─────────────────────────────────────────── */}
      <section className="bg-cream py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy mb-2">
            Why {product.name} for {application.namePlural}?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {application.roomContext}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {application.benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-gray-100 flex gap-4 items-start"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {BENEFIT_ICONS[i] ?? "✓"}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local Context ────────────────────────────────────────────────── */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-copper text-sm font-semibold uppercase tracking-wider">
              Local Market Insight
            </span>
            <h2 className="font-heading font-bold text-2xl text-navy mt-2 mb-4">
              {localContextHeading}
            </h2>
            <p className="text-gray-700 leading-relaxed">{localContextBody}</p>
            <div className="mt-6 p-4 bg-cream rounded-xl border-l-4 border-copper">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-navy">Climate note: </span>
                {city.climateNote}
              </p>
            </div>
          </div>
          <div className="bg-navy rounded-2xl p-8 text-white">
            <h3 className="font-heading font-semibold text-xl mb-4">
              Supply & Availability in {city.name}
            </h3>
            <p className="text-white/75 leading-relaxed text-sm">
              {city.dealerAvailability}
            </p>
            <div className="mt-6 space-y-3">
              {[
                `Supplying ${city.name} projects since 2010`,
                "Sheet-to-sheet colour consistency guaranteed",
                "Custom colour matching available on request",
                "Express delivery for urgent project requirements",
              ].map((point) => (
                <div key={point} className="flex gap-2 items-start">
                  <span className="text-copper mt-0.5 shrink-0">✓</span>
                  <span className="text-white/80 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Material composition detail ──────────────────────────────────── */}
      <section className="bg-cream-dark py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-xl text-navy mb-6">
            {product.name} Technical Composition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Surface Layer",
                detail:
                  "PMMA (Polymethyl Methacrylate) acrylic — optical-grade polymer with " +
                  product.finishLabel.toLowerCase() +
                  " surface treatment",
              },
              {
                title: "Bonding Technology",
                detail:
                  "German PUR (Polyurethane Reactive) hotmelt adhesive for zero-void lamination across 100% of the panel surface",
              },
              {
                title: "Core Substrate",
                detail:
                  "18mm E1-grade MDF (Medium Density Fibreboard) — flat, stable, machinable. Plywood substrate available on request.",
              },
              {
                title: "Quality Assurance",
                detail:
                  "100% inspection at three production stages: incoming material, post-lamination, and pre-despatch. Sheet-to-sheet colour tolerance Delta E < 0.5.",
              },
            ].map(({ title, detail }) => (
              <div key={title} className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-navy text-sm mb-2">{title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture Form ─────────────────────────────────────────────── */}
      <section id="get-quote" className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-2xl text-navy">
                Get a Quote for {city.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Tell us about your project and our {city.name} team will respond
                within 4 business hours.
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

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-14 px-6">
        <div className="max-w-7xl mx-auto max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex justify-between items-start gap-4 p-5 cursor-pointer list-none font-medium text-navy hover:text-copper transition-colors">
                  <span>{faq.question}</span>
                  <span
                    className="text-copper text-xl shrink-0 group-open:rotate-45 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related pages ─────────────────────────────────────────────────── */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Same product, other cities */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-navy mb-4">
                {product.name} in Other Cities
              </h2>
              <ul className="space-y-2">
                {otherCities.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/${product.slug}/${application.slug}/${c}`}
                      className="flex items-center gap-2 text-gray-700 hover:text-copper transition-colors text-sm"
                    >
                      <span className="text-copper text-xs">→</span>
                      {product.name} {product.finishLabel} Acrylic{" "}
                      {application.namePlural} in {CITY_DISPLAY[c] ?? c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Same city, other products */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-navy mb-4">
                Other Acrylic Panels in {city.name}
              </h2>
              <ul className="space-y-2">
                {otherProducts.map((p) => (
                  <li key={p}>
                    <Link
                      href={`/${p}/${application.slug}/${city.slug}`}
                      className="flex items-center gap-2 text-gray-700 hover:text-copper transition-colors text-sm"
                    >
                      <span className="text-copper text-xs">→</span>
                      {PRODUCT_DISPLAY[p] ?? p} Acrylic {application.namePlural}{" "}
                      in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Internal links to parent pages */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:text-copper transition-colors border border-navy/20 rounded-lg px-4 py-2.5 hover:border-copper"
            >
              Full {product.name} Product Page →
            </Link>
            <Link
              href={`/applications/${application.slug}`}
              className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:text-copper transition-colors border border-navy/20 rounded-lg px-4 py-2.5 hover:border-copper"
            >
              {application.namePlural} Application Guide →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:text-copper transition-colors border border-navy/20 rounded-lg px-4 py-2.5 hover:border-copper"
            >
              Contact Our {city.name} Team →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
