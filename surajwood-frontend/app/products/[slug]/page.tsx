import { getProductBySlug, getProducts } from "@/lib/sanity";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SanityProduct } from "@/types/sanity";
import ProductDetailClient from "./ProductDetailClient";

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
  acrylux: "/images/products/acrylux.png",
  acrysilk: "/images/products/acrysilk.jpg",
  acrymatte: "/images/products/acrymatte.png",
  acryglass: "/images/products/acryglass.png",
  "acryglass-matte": "/images/products/acryglass-matte.png",
};

// ---------------------------------------------------------------------------
// Colour swatch config per product
// ---------------------------------------------------------------------------

type SwatchGroup = { label: string; swatches: { src: string; caption: string }[] };

// ── ACRYLUX colour names (from shade card) ──────────────────────────────────

const ACRYLUX_SOLID_NAMES: Record<number, string> = {
  1: "1301 Signal Red", 2: "1302 Snow White", 3: "1303 Ivory Cream",
  4: "1304 Charcoal Grey", 5: "1305 Jet Black", 6: "1306 Champagne Gold",
  7: "1307 Coral Blush", 8: "1308 Ocean Teal", 9: "1309 Mocha Brown",
  10: "1310 Sage Green", 11: "1311 Dusty Rose", 12: "1312 Arctic Blue",
  13: "1313 Lemon Yellow", 14: "1314 Pearl White", 15: "1315 Slate Grey",
  16: "1316 Burgundy Wine", 17: "1317 Forest Green", 18: "1318 Lavender Mist",
  19: "1319 Tangerine Orange", 20: "1320 Deep Navy",
};

const ACRYLUX_METALLIC_NAMES: Record<number, string> = {
  1: "M01 Brushed Silver", 2: "M02 Brushed Gold", 3: "M03 Brushed Copper",
  4: "M04 Titanium Grey", 5: "M05 Bronze Shimmer",
};

const ACRYLUX_WOOD_NAMES: Record<number, string> = {
  1: "W01 Natural Oak", 2: "W02 Walnut Classic", 3: "W03 Teak Heritage",
  4: "W04 Dark Wenge", 5: "W05 Maple Light", 6: "W06 Rosewood Rich",
};

function buildAcryluxSwatches(): SwatchGroup[] {
  const solid = Array.from({ length: 19 }, (_, i) => ({
    src: `/images/products/acrylux/acrylux-solid-${i + 1}.png`,
    caption: ACRYLUX_SOLID_NAMES[i + 1] ?? `Solid ${i + 1}`,
  }));
  const metallic = Array.from({ length: 5 }, (_, i) => ({
    src: `/images/products/acrylux/acrylux-metallic-${i + 1}.png`,
    caption: ACRYLUX_METALLIC_NAMES[i + 1] ?? `Metallic ${i + 1}`,
  }));
  const wood = Array.from({ length: 6 }, (_, i) => ({
    src: `/images/products/acrylux/acrylux-wood-${i + 1}.png`,
    caption: ACRYLUX_WOOD_NAMES[i + 1] ?? `Wood Grain ${i + 1}`,
  }));
  return [
    { label: "Solid Colours", swatches: solid },
    { label: "Metallic Finishes", swatches: metallic },
    { label: "Wood Grain", swatches: wood },
  ];
}

// ── ACRYSILK colour names ───────────────────────────────────────────────────

const ACRYSILK_NAMES: Record<number, string> = {
  1: "S01 Silk White", 2: "S02 Silk Ivory", 3: "S03 Silk Grey",
  4: "S04 Silk Charcoal", 5: "S05 Silk Champagne", 6: "S06 Silk Black",
};

// ── ACRYGLASS colour names ──────────────────────────────────────────────────

const ACRYGLASS_NAMES: Record<number, string> = {
  1: "G01 Crystal White", 2: "G02 Mirror Black", 3: "G03 Ruby Red",
  4: "G04 Sapphire Blue", 5: "G05 Emerald Green", 6: "G06 Amber Gold",
};

// ── ACRYGLASS MATTE colour names ────────────────────────────────────────────

const ACRYGLASS_MATTE_NAMES: Record<number, string> = {
  1: "GM01 Frost White", 2: "GM02 Storm Grey", 3: "GM03 Onyx Black",
  4: "GM04 Sand Beige", 5: "GM05 Olive Drab", 6: "GM06 Dusty Blue",
  7: "GM07 Terracotta",
};

function buildSingleGroupSwatches(slug: string, count: number): SwatchGroup[] {
  const nameMap: Record<string, Record<number, string>> = {
    acrysilk: ACRYSILK_NAMES,
    acryglass: ACRYGLASS_NAMES,
    "acryglass-matte": ACRYGLASS_MATTE_NAMES,
  };
  const names = nameMap[slug] ?? {};
  const swatches = Array.from({ length: count }, (_, i) => ({
    src: `/images/products/${slug}/${slug}-${i + 1}.png`,
    caption: names[i + 1] ?? `Colour ${i + 1}`,
  }));
  return [{ label: "Available Colours", swatches }];
}

// ── ACRYMATTE colour names ──────────────────────────────────────────────────

const ACRYMATTE_NAMES: Record<number, string> = {
  1: "AM01 Matte White", 2: "AM02 Matte Ivory", 3: "AM03 Matte Grey",
  4: "AM04 Matte Black", 8: "AM08 Matte Sage", 12: "AM12 Matte Charcoal",
  13: "AM13 Matte Blush", 14: "AM14 Matte Taupe", 15: "AM15 Matte Olive",
  16: "AM16 Matte Navy", 17: "AM17 Matte Burgundy",
};

function buildAcrymatteSwatches(): SwatchGroup[] {
  const nums = [1, 2, 3, 4, 8, 12, 13, 14, 15, 16, 17];
  const swatches = nums.map((n) => ({
    src: `/images/products/acrymatte/acrymatte-${n}.png`,
    caption: ACRYMATTE_NAMES[n] ?? `Acrymatte ${n}`,
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
// Helpers
// ---------------------------------------------------------------------------

function finishTypeLabel(finish: SanityProduct["finish_type"]): string {
  const map: Record<SanityProduct["finish_type"], string> = {
    satin: "Satin",
    "soft-satin": "Soft-Satin",
    matte: "Premium Matte",
    "high-gloss": "High-Gloss",
    "matte-glass": "Matte-Glass",
  };
  return map[finish] ?? finish;
}

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
  const heroImg = product.hero_image?.url ?? PRODUCT_HERO_IMAGES[slug] ?? "/images/banner/bg3.jpg";

  // Premium, clean metadata titles (No double brand-names or overstuffing)
  return {
    title: `${product.name} ${finishLabel} Acrylic Panels | SurajWood`,
    description: product.seo_description,
    openGraph: {
      title: `${product.name} — Premium ${finishLabel} Acrylic Panels`,
      description: product.seo_description,
      images: [{ url: heroImg, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Premium ${finishLabel} Acrylic Panels`,
      description: product.seo_description,
      images: [heroImg],
    },
  };
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

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        swatchGroups={swatchGroups}
        swatchCountLabel={swatchCountLabel}
        defaultHeroSrc={heroImageSrc}
      />
    </>
  );
}
