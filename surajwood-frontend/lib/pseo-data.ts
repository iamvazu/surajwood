import citiesData from "@/data/cities.json";
import appsData from "@/data/applications.json";

/**
 * PSEO (Programmatic SEO) data matrix for SurajWood.
 * 5 products × 5 applications × 50 cities = 1,250 pages.
 */

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

export interface PSEOProduct {
  slug: string;
  name: string;
  finishType: string;
  finishLabel: string;
  description: string;
}

export interface PSEOApplication {
  slug: string;
  name: string;
  namePlural: string;
  benefits: string[];
  roomContext: string;
}

export interface PSEOCity {
  slug: string;
  name: string;
  state: string;
  tier: number;
  climateNote: string;
  designTrend: string;
  dealerAvailability: string;
}

export interface PSEOSEOMeta {
  title: string;
  description: string;
  h1: string;
}

export interface PSEOPageData {
  product: PSEOProduct;
  application: PSEOApplication;
  city: PSEOCity;
  seo: PSEOSEOMeta;
  introductionParagraphs: string[];
  aeoSummary: string;
  localContextHeading: string;
  localContextBody: string;
  comparisonData: {
    feature: string;
    surajWood: string;
    laminate: string;
    puPaint: string;
    petg: string;
  }[];
}

export interface PSEOParams {
  product: string;
  application: string;
  city: string;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

const PSEO_PRODUCTS: Record<string, PSEOProduct> = {
  acrylux: {
    slug: "acrylux",
    name: "ACRYLUX",
    finishType: "satin",
    finishLabel: "Satin",
    description:
      "Our flagship satin-finish acrylic panel, combining smooth light reflection with exceptional durability and a 37+ colour palette.",
  },
  acrysilk: {
    slug: "acrysilk",
    name: "ACRYSILK",
    finishType: "soft-satin",
    finishLabel: "Soft Satin",
    description:
      "A uniquely soft, micro-textured acrylic surface that diffuses light evenly, conceals minor marks, and delivers outstanding anti-fingerprint performance.",
  },
  acrymatte: {
    slug: "acrymatte",
    name: "ACRYMATTE",
    finishType: "matte",
    finishLabel: "Matte",
    description:
      "Full matte acrylic panels with deep colour saturation and advanced nano anti-fingerprint coating — perfect for contemporary minimalist interiors.",
  },
  acryglass: {
    slug: "acryglass",
    name: "ACRYGLASS",
    finishType: "high-gloss",
    finishLabel: "High Gloss",
    description:
      "Mirror-like high-gloss acrylic panels with 95% light reflectivity — for kitchens and interiors that demand maximum visual impact.",
  },
  "acryglass-matte": {
    slug: "acryglass-matte",
    name: "ACRYGLASS MATTE",
    finishType: "matte-glass",
    finishLabel: "Matte Glass",
    description:
      "Optical-grade glass clarity with a sophisticated matte surface — the pinnacle of Suraj Wood's panel range for discerning luxury interiors.",
  },
};

// ---------------------------------------------------------------------------
// Load from JSON
// ---------------------------------------------------------------------------

const PSEO_CITIES: Record<string, PSEOCity> = Object.fromEntries(
  citiesData.cities.map((c) => [c.slug, c as PSEOCity])
);

const PSEO_APPLICATIONS: Record<string, PSEOApplication> = Object.fromEntries(
  appsData.applications.map((a) => [a.slug, a as PSEOApplication])
);

// ---------------------------------------------------------------------------
// Page data generator
// ---------------------------------------------------------------------------

export function getPSEOData(
  productSlug: string,
  applicationSlug: string,
  citySlug: string
): PSEOPageData | null {
  const product = PSEO_PRODUCTS[productSlug];
  const application = PSEO_APPLICATIONS[applicationSlug];
  const city = PSEO_CITIES[citySlug];

  if (!product || !application || !city) return null;

  const seoTitle = `${product.name} ${product.finishLabel} Acrylic ${application.namePlural} in ${city.name} | Suraj Wood`;
  
  // Tightened to ~155 characters for SEO best practices
  const seoDescription = `Premium ${product.name} acrylic panels for ${application.namePlural.toLowerCase()} in ${city.name}. ${product.finishLabel} finish, 5-year warranty, and technical superiority. Order samples today.`;
  
  const h1 = `Premium ${product.name} Acrylic Panels for ${application.namePlural} in ${city.name}`;

  const introductionParagraphs = [
    `If you are looking for premium ${product.finishLabel.toLowerCase()} prelaminated acrylic panels for your ${application.name.toLowerCase()} in ${city.name}, Suraj Wood's ${product.name} is the technically superior alternative to standard PETG and local laminates. ${product.description}`,
    `${application.roomContext} In ${city.name}, where ${city.climateNote.toLowerCase()}, our factory-bonded prelaminated boards offer a flawless surface that won't warp or delaminate. Unlike Nivesa or Opulux PETG boards, our PMMA acrylic provides deeper optical clarity and 3H scratch resistance.`,
    `${product.name} ${application.namePlural.toLowerCase()} are available on E1-grade MDF, premium Plywood, and Particle Board (PB) substrates. Each panel comes with a matching balancing backer to ensure 100% stability. Delivered direct to ${city.name} from our manufacturing facility in Bahadurgarh, Haryana.`,
  ];

  const aeoSummary = `${product.name} prelaminated acrylic panels are the premium alternative to PETG boards for ${application.namePlural.toLowerCase()} in ${city.name}. Offering 3H scratch resistance, 10-year UV stability, and German PUR bonding, SurajWood outperforms competitors like Praveedh OpuLux or Nivesa in ${city.name}'s climate. Our panels are carpenter-friendly and can be cut or drilled on-site for modular kitchen and wardrobe projects.`;

  const localContextHeading = `${product.name} vs. PETG & Laminates in ${city.name}`;
  const localContextBody = `${city.designTrend} While many in ${city.name} consider PETG boards, Suraj Wood's ${product.name} ${product.finishLabel.toLowerCase()} acrylic offers a more durable, repairable, and premium finish. Our substrate versatility (MDF, Ply, PB) and 3H scratch resistance make it the ideal specification for ${city.name}'s ${application.namePlural.toLowerCase()} across luxury residential and commercial projects.`;

  const comparisonData = [
    {
      feature: "Material Type",
      surajWood: "PMMA Acrylic (High-End)",
      laminate: "Paper/Resin (Economy)",
      puPaint: "Coating (Fragile)",
      petg: "PETG Plastic (Mid-Range)"
    },
    {
      feature: "Scratch Resistance",
      surajWood: "3H Pencil Hardness",
      laminate: "1H - 2H (Standard)",
      puPaint: "Low - Prone to chipping",
      petg: "2H (Standard)"
    },
    {
      feature: "Optical Depth",
      surajWood: "High (Mirror-like)",
      laminate: "Low (Flat)",
      puPaint: "Medium",
      petg: "Moderate"
    },
    {
      feature: "Repairability",
      surajWood: "Yes (Can be buffed)",
      laminate: "No",
      puPaint: "Requires Repaint",
      petg: "Limited"
    },
  ];

  return {
    product,
    application,
    city,
    seo: {
      title: seoTitle,
      description: seoDescription,
      h1,
    },
    introductionParagraphs,
    aeoSummary,
    localContextHeading,
    localContextBody,
    comparisonData,
  };
}

// ---------------------------------------------------------------------------
// Static params generator — all 1,250 combinations
// ---------------------------------------------------------------------------

export function getAllPSEOParams(): PSEOParams[] {
  const products = Object.keys(PSEO_PRODUCTS);
  const applications = Object.keys(PSEO_APPLICATIONS);
  const cities = Object.keys(PSEO_CITIES);

  const params: PSEOParams[] = [];
  for (const product of products) {
    for (const application of applications) {
      for (const city of cities) {
        params.push({ product, application, city });
      }
    }
  }
  return params;
}

// ---------------------------------------------------------------------------
// Individual lookup helpers (exported for convenience)
// ---------------------------------------------------------------------------

export function getPSEOProduct(slug: string): PSEOProduct | null {
  return PSEO_PRODUCTS[slug] ?? null;
}

export function getPSEOApplication(slug: string): PSEOApplication | null {
  return PSEO_APPLICATIONS[slug] ?? null;
}

export function getPSEOCity(slug: string): PSEOCity | null {
  return PSEO_CITIES[slug] ?? null;
}
