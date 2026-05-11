import { getProductBySlug, getProducts } from "@/lib/sanity";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SanityProduct } from "@/types/sanity";

// ---------------------------------------------------------------------------
// Static params — pre-build all 5 product pages at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return [
    { slug: "acrylux" },
    { slug: "acrysilk" },
    { slug: "acrymatte" },
    { slug: "acryglass" },
    { slug: "acryglass-matte" },
  ];
}

// ---------------------------------------------------------------------------
// Per-product hero images (local assets)
// ---------------------------------------------------------------------------

const PRODUCT_HERO_IMAGES: Record<string, string> = {
  acrylux: "/images/products/acrylux/acrylux-solid-1.png",
  acrysilk: "/images/products/acrysilk/acrysilk-1.png",
  acrymatte: "/images/products/acrymatte/acrymatte-1.png",
  acryglass: "/images/products/acryglass/acryglass1.png",
  "acryglass-matte": "/images/products/acryglass-matte/acryglass-matte-1.png",
};

// ---------------------------------------------------------------------------
// Colour swatch config per product
// ---------------------------------------------------------------------------

type SwatchGroup = { label: string; swatches: { src: string; caption: string }[] };

function buildAcryluxSwatches(): SwatchGroup[] {
  const solid: { src: string; caption: string }[] = Array.from(
    { length: 19 },
    (_, i) => ({
      src: `/images/products/acrylux/acrylux-solid-${i + 1}.png`,
      caption: `Solid ${i + 1}`,
    })
  );
  const metallic: { src: string; caption: string }[] = Array.from(
    { length: 5 },
    (_, i) => ({
      src: `/images/products/acrylux/acrylux-metallic-${i + 1}.png`,
      caption: `Metallic ${i + 1}`,
    })
  );
  const wood: { src: string; caption: string }[] = Array.from(
    { length: 6 },
    (_, i) => ({
      src: `/images/products/acrylux/acrylux-wood-${i + 1}.png`,
      caption: `Wood Grain ${i + 1}`,
    })
  );
  return [
    { label: "Solid Colours", swatches: solid },
    { label: "Metallic Finishes", swatches: metallic },
    { label: "Wood Grain", swatches: wood },
  ];
}

function buildSingleGroupSwatches(slug: string, count: number): SwatchGroup[] {
  const swatches = Array.from({ length: count }, (_, i) => ({
    src: `/images/products/${slug}/${slug}-${i + 1}.png`,
    caption: `Colour ${i + 1}`,
  }));
  return [{ label: "Available Colours", swatches }];
}

function buildAcrymatteSwatches(): SwatchGroup[] {
  const nums = [1, 2, 3, 4, 8, 12, 13, 14, 15, 16, 17];
  const swatches = nums.map((n) => ({
    src: `/images/products/acrymatte/acrymatte-${n}.png`,
    caption: `Acrymatte ${n}`,
  }));
  return [{ label: "Available Matte Shades", swatches }];
}

const SWATCH_CONFIGS: Record<string, () => SwatchGroup[]> = {
  acrylux: buildAcryluxSwatches,
  acrysilk: () => buildSingleGroupSwatches("acrysilk", 6),
  acrymatte: buildAcrymatteSwatches,
  acryglass: () => buildSingleGroupSwatches("acryglass", 6),
  "acryglass-matte": () => buildSingleGroupSwatches("acryglass-matte", 7),
};

const SWATCH_COUNTS: Record<string, string> = {
  acrylux: "30 Colours Available",
  acrysilk: "6 Colours Available",
  acrymatte: "11 Colours Available",
  acryglass: "6 Colours Available",
  "acryglass-matte": "7 Colours Available",
};

// ---------------------------------------------------------------------------
// Gallery images (local fallbacks to placehold.co for now)
// ---------------------------------------------------------------------------

const GALLERY_OFFSETS: Record<string, number> = {
  acrylux: 1,
  acrysilk: 7,
  acrymatte: 13,
  acryglass: 19,
  "acryglass-matte": 25,
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found | SurajWood" };
  }

  const finishLabel = finishTypeLabel(product.finish_type);

  return {
    title: `${product.name} Acrylic Panels | ${finishLabel} Finish | SurajWood`,
    description: product.seo_description,
    openGraph: {
      title: `${product.name} — ${finishLabel} Acrylic Panels | SurajWood`,
      description: product.seo_description,
      images: [{ url: product.hero_image?.url ?? "", width: 1440, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${finishLabel} Acrylic Panels`,
      description: product.seo_description,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function finishTypeLabel(finish: SanityProduct["finish_type"]): string {
  const map: Record<SanityProduct["finish_type"], string> = {
    satin: "Satin",
    "soft-satin": "Soft-Satin",
    matte: "Matte",
    "high-gloss": "High-Gloss",
    "matte-glass": "Matte-Glass",
  };
  return map[finish] ?? finish;
}

function finishBadgeColor(finish: SanityProduct["finish_type"]): string {
  const map: Record<SanityProduct["finish_type"], string> = {
    satin: "bg-copper/20 text-copper border border-copper/40",
    "soft-satin": "bg-copper/15 text-copper border border-copper/30",
    matte: "bg-gray-200 text-gray-700 border border-gray-300",
    "high-gloss": "bg-amber-100 text-amber-800 border border-amber-300",
    "matte-glass": "bg-teal-100 text-teal-800 border border-teal-300",
  };
  return map[finish] ?? "bg-gray-100 text-gray-600";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// Breadcrumb
function Breadcrumb({
  productName,
}: {
  productName: string;
  slug?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-white/70">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        <li className="text-white/40">›</li>
        <li>
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
        </li>
        <li className="text-white/40">›</li>
        <li className="text-white font-medium" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

// Accordion item (no external dependency needed — pure CSS + details/summary)
function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-gray-200 last:border-b-0">
      <summary className="flex items-center justify-between cursor-pointer py-4 px-0 text-left font-semibold text-navy font-heading text-sm select-none list-none">
        <span>{title}</span>
        <span className="ml-4 text-copper transition-transform group-open:rotate-180 shrink-0">
          ▾
        </span>
      </summary>
      <div className="pb-4 text-gray-600 text-sm leading-relaxed">{children}</div>
    </details>
  );
}

// Spec row
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 sm:w-48 shrink-0">
        {label}
      </dt>
      <dd className="text-sm text-navy font-medium">{value}</dd>
    </div>
  );
}

// Swatch image tile
function SwatchTile({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
      <div className="w-20 h-20 rounded-lg overflow-hidden ring-2 ring-transparent group-hover:ring-copper transition-all duration-200 shadow-sm">
        <Image
          src={src}
          alt={caption}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs text-gray-500 text-center leading-tight">{caption}</span>
    </div>
  );
}

// Product card for related products
function RelatedProductCard({ product }: { product: SanityProduct }) {
  const heroSrc =
    PRODUCT_HERO_IMAGES[product.slug] ?? product.hero_image?.url ?? "";
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 shrink-0 w-64"
    >
      <div className="relative h-40 bg-cream overflow-hidden">
        <Image
          src={heroSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="256px"
        />
      </div>
      <div className="p-4">
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${finishBadgeColor(product.finish_type)}`}
        >
          {finishTypeLabel(product.finish_type)}
        </span>
        <h3 className="font-heading font-bold text-navy text-sm">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.tagline}</p>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) notFound();

  const relatedProducts = allProducts.filter((p) => p.slug !== slug);
  const heroImageSrc = PRODUCT_HERO_IMAGES[slug] ?? product.hero_image?.url ?? "";
  const swatchGroups = SWATCH_CONFIGS[slug]?.() ?? [];
  const swatchCountLabel = SWATCH_COUNTS[slug] ?? "";

  const schemas = [
    generateProductSchema(product),
    generateFAQSchema(product.faq),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
      {
        name: product.name,
        url: `https://www.surajwood.com/products/${slug}`,
      },
    ]),
  ];

  const finishLabel = finishTypeLabel(product.finish_type);

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ------------------------------------------------------------------ */}
      {/* 1. PRODUCT HERO                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb productName={product.name} slug={slug} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <div>
              {/* Finish badge */}
              <span className="inline-block bg-copper/20 text-copper border border-copper/40 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                {finishLabel} Finish
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-tight mb-4">
                {product.name} Prelaminated Acrylic
              </h1>

              <p className="text-white/70 text-lg font-body italic mb-4">
                The premium PMMA alternative to PETG and local laminates.
              </p>

              <p className="text-white/80 font-body text-base leading-relaxed mb-8 max-w-lg">
                SurajWood&apos;s {product.name} series features factory-bonded optical-grade PMMA acrylic on multiple substrate options. Engineered with German PUR technology for a zero-void, mirror-like finish that outperforms PETG in durability, clarity, and UV stability.
              </p>

              {/* Key stats row */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="text-center">
                  <div className="text-copper font-bold text-xl">{product.thickness}</div>
                  <div className="text-white/50 text-xs mt-0.5">Thickness (Inc. Substrate)</div>
                </div>
                <div className="text-center">
                  <div className="text-copper font-bold text-xl">3H</div>
                  <div className="text-white/50 text-xs mt-0.5">Scratch Hardness</div>
                </div>
                <div className="text-center">
                  <div className="text-copper font-bold text-xl">German PUR</div>
                  <div className="text-white/50 text-xs mt-0.5">Bonding Tech</div>
                </div>
                <div className="text-center">
                  <div className="text-copper font-bold text-xl">Class B1</div>
                  <div className="text-white/50 text-xs mt-0.5">Fire Rating</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-copper hover:bg-copper-light text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
                >
                  Request Quote
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
                >
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Right: Product image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src={heroImageSrc}
                  alt={`${product.name} ${finishLabel} acrylic panel`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-navy rounded-xl px-4 py-3 shadow-xl">
                <div className="text-xs text-gray-500 font-medium">Dimensions</div>
                <div className="text-sm font-bold">{product.dimensions}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. COLOUR SWATCHES                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
                Colour Range
              </p>
              <h2 className="font-heading text-3xl font-bold text-navy">
                Available Colour Range
              </h2>
            </div>
            {swatchCountLabel && (
              <span className="inline-block bg-navy text-white text-sm font-semibold px-4 py-2 rounded-full">
                {swatchCountLabel}
              </span>
            )}
          </div>

          {swatchGroups.map((group) => (
            <div key={group.label} className="mb-10 last:mb-0">
              {swatchGroups.length > 1 && (
                <h3 className="font-heading font-semibold text-navy text-base mb-5 pb-2 border-b border-gray-200">
                  {group.label}
                </h3>
              )}
              <div className="flex flex-wrap gap-4">
                {group.swatches.map((swatch) => (
                  <SwatchTile
                    key={swatch.src}
                    src={swatch.src}
                    caption={swatch.caption}
                  />
                ))}
                {/* If no local images yet, fall back to colour range from mock data */}
                {group.swatches.length === 0 &&
                  product.colour_range.map((c) => (
                    <div
                      key={c.colour_name}
                      className="flex flex-col items-center gap-1.5 group cursor-pointer"
                    >
                      <div
                        className="w-20 h-20 rounded-lg ring-2 ring-transparent group-hover:ring-copper transition-all duration-200 shadow-sm"
                        style={{ backgroundColor: c.hex_value }}
                        title={c.colour_name}
                      />
                      <span className="text-xs text-gray-500 text-center leading-tight max-w-[80px]">
                        {c.colour_name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Fallback: render hex swatches from mock data if swatch files don't exist */}
          {swatchGroups.length === 0 && (
            <div className="flex flex-wrap gap-4">
              {product.colour_range.map((c) => (
                <div
                  key={c.colour_name}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div
                    className="w-20 h-20 rounded-lg ring-2 ring-transparent group-hover:ring-copper transition-all duration-200 shadow-sm border border-gray-200"
                    style={{ backgroundColor: c.hex_value }}
                    title={c.colour_name}
                  />
                  <span className="text-xs text-gray-500 text-center leading-tight max-w-[80px]">
                    {c.colour_name}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-sm text-gray-500">
            Screen colours are indicative only. Request a physical sample kit for accurate colour
            matching.{" "}
            <Link href="/contact" className="text-copper hover:underline font-medium">
              Order free samples →
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. TECHNICAL SPECS                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
                Specifications
              </p>
              <h2 className="font-heading text-3xl font-bold text-navy">
                Technical Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Spec table */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-navy text-base mb-4">
                  Physical Properties
                </h3>
                <dl>
                  <SpecRow label="Material" value="Optical-Grade PMMA Acrylic (Not PETG)" />
                  <SpecRow label="Lamination" value="Factory Prelaminated (German PUR)" />
                  <SpecRow label="Standard Size" value={product.dimensions} />
                  <SpecRow label="Substrate Options" value="18mm E1 MDF, Premium Plywood, or Particle Board (PB)" />
                  <SpecRow label="Balancing Layer" value="Matching Backer Included for 100% Stability" />
                  <SpecRow label="Surface Hardness" value="3H Pencil Hardness (EN ISO 15184)" />
                </dl>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-navy text-base mb-4">
                  Performance Blueprint
                </h3>
                <dl>
                  <SpecRow
                    label="Reflectivity"
                    value="95% (Highest Optical Clarity)"
                  />
                  <SpecRow label="UV Stability" value={product.technical_specs.uv_stability} />
                  <SpecRow
                    label="Anti-Fingerprint"
                    value={product.technical_specs.anti_fingerprint ? "Yes — Advanced Nano-coating" : "No"}
                  />
                  <SpecRow label="Processing" value="Carpenter Friendly: On-site cutting & drilling" />
                  <SpecRow label="Fire Rating" value={product.technical_specs.fire_rating} />
                  <SpecRow label="Warranty" value={product.technical_specs.warranty} />
                </dl>
              </div>
            </div>

            {/* Expandable extra specs */}
            <div className="mt-8 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-navy text-base mb-4">
                Detailed Composition & Properties
              </h3>
              <AccordionItem title="Material Composition">
                <p>{product.material_composition}</p>
              </AccordionItem>
              <AccordionItem title="Surface Properties">
                <p>{product.surface_properties}</p>
              </AccordionItem>
              <AccordionItem title="Ideal Applications">
                <ul className="list-disc list-inside space-y-1">
                  {product.ideal_for.map((use) => (
                    <li key={use} className="capitalize">
                      {use}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem title="Installation Notes">
                <p>
                  Panels must be acclimatised to site conditions (minimum 24 hours) before
                  fabrication. Store flat — never upright. Minimum ambient temperature during
                  installation: 10°C. Maintain minimum 50mm clearance from direct heat sources
                  such as gas hobs. All cut edges must be banded or sealed.
                </p>
              </AccordionItem>
              <AccordionItem title="Cleaning & Maintenance">
                <p>
                  Wipe with a soft, damp microfibre cloth for daily cleaning. For grease or marks,
                  use mild dish soap diluted in water applied with a cloth — never spray directly.
                  Dry immediately. Do not use abrasive cleaners, scouring pads, acetone, bleach, or
                  solvent-based products. Do not use paper towels on high-gloss surfaces.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. APPLICATION GALLERY                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Gallery
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy">
              See It in Your Space
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Real interiors featuring {product.name} panels across kitchens, wardrobes, and
              commercial spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => {
              // Try to find application specific images first, fallback to general gallery
              const galleryImg = `/images/gallery/kitchen-${i}.jpg`; 
              return (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={galleryImg}
                    alt={`${product.name} application ${i}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-navy hover:bg-navy-light text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
            >
              Request Sample Kit →
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FAQ ACCORDION                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-bold text-navy">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {product.faq.map((item, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex items-start justify-between cursor-pointer text-left list-none gap-4">
                    <span className="font-heading font-semibold text-navy text-base leading-snug">
                      {item.question}
                    </span>
                    <span className="text-copper text-lg mt-0.5 shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 bg-cream rounded-2xl p-6 text-center">
              <p className="text-navy font-semibold font-heading text-base mb-2">
                Have a technical question not answered here?
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Our product specialists are available Mon–Sat, 9am–6pm IST.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+919999995553"
                  className="inline-flex items-center justify-center bg-navy text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
                >
                  Call +91-9999995553
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-navy text-navy font-semibold text-sm px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  Send an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. RELATED PRODUCTS                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Collections
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy">
              Explore More Collections
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {relatedProducts.map((rp) => (
              <RelatedProductCard key={rp.slug} product={rp} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. STICKY MOBILE CTA                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="flex divide-x divide-gray-200">
          <Link
            href="/contact"
            className="flex-1 flex flex-col items-center justify-center py-3 text-navy hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 mb-1 text-copper"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs font-semibold">Get Quote</span>
          </Link>
          <a
            href="tel:+919999995553"
            className="flex-1 flex flex-col items-center justify-center py-3 text-navy hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 mb-1 text-copper"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-xs font-semibold">Call Now</span>
          </a>
          <a
            href="https://wa.me/919999995553?text=Hi%2C%20I%20am%20interested%20in%20your%20acrylic%20panels"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-3 text-navy hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 mb-1 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-xs font-semibold">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Spacer so sticky CTA doesn't overlap content on mobile */}
      <div className="h-16 md:hidden" />
    </>
  );
}
