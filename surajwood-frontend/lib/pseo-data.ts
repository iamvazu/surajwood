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
    finishType: "high-gloss",
    finishLabel: "High Gloss",
    description:
      "Our flagship high gloss finish acrylic panel, combining smooth light reflection with exceptional durability and a 37+ colour palette.",
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
  "aluminum-profiles": {
    slug: "aluminum-profiles",
    name: "AL-PROFHAN Aluminum Profiles",
    finishType: "architectural-anodized",
    finishLabel: "Architectural 6063-T5 Gola & Shutter Profiles",
    description:
      "Precision-engineered 6063-T5 architectural aluminum profiles, handleless Gola profiles, J-pull shutter handles, LED channels, and glass door frames.",
  },
  "membrane-shutters": {
    slug: "membrane-shutters",
    name: "3D Seamless Membrane Shutters",
    finishType: "3d-thermoformed",
    finishLabel: "3D Seamless Vacuum Thermoformed Shutters",
    description:
      "Seamless 3D vacuum thermoformed PVC membrane shutters over moisture-resistant Green HDHMR/MDF core with 36 European finishes and CNC Shaker & J-Pull profiles.",
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

  const isAluminum = product.slug === "aluminum-profiles";
  const isMembrane = product.slug === "membrane-shutters";

  const seoTitle = isMembrane
    ? `3D Membrane Shutters for ${application.namePlural} in ${city.name} | SurajWood`
    : isAluminum
    ? `Aluminum Profiles for ${application.namePlural} in ${city.name} | AL-PROFHAN`
    : `${product.name} Acrylic ${application.namePlural} in ${city.name}`;
  
  const seoDescription = isMembrane
    ? `Seamless 3D thermoformed membrane shutters for ${application.namePlural.toLowerCase()} in ${city.name}. Zero edge-banding lines, 36 European shades, moisture-resistant HDHMR.`
    : isAluminum
    ? `Architectural 6063-T5 aluminum profiles for ${application.namePlural.toLowerCase()} in ${city.name}. Gola handleless channels & slim shutter frames from SurajWood.`
    : `Premium ${product.name} ${product.finishLabel.toLowerCase()} acrylic panels for ${application.namePlural.toLowerCase()} in ${city.name}. 3H scratch resistance, PUR bonding, 5-yr warranty. Order samples.`;
  
  const h1 = isMembrane
    ? `Seamless 3D Membrane Shutters for ${application.namePlural} in ${city.name}`
    : isAluminum
    ? `AL-PROFHAN Aluminum Profiles for ${application.namePlural} in ${city.name}`
    : `Premium ${product.name} Acrylic Panels for ${application.namePlural} in ${city.name}`;

  const introductionParagraphs = isMembrane
    ? [
        `Looking for seamless 3D membrane shutters for your ${application.name.toLowerCase()} in ${city.name}? SurajWood manufactures precision vacuum-thermoformed cabinet doors with continuous edge wrapping and zero edge-banding seams. ${product.description}`,
        `${application.roomContext} In ${city.name}, where ${city.climateNote.toLowerCase()}, our moisture-sealed Green HDHMR core and European PVC foils eliminate peeling and water ingress around high-traffic kitchen sink, hob, and wardrobe areas.`,
        `Available in 36 curated shades (Wood Grain, Porcelain Touch matte, Perfect Silk, and Ceramic Satin) with precision CNC-routed Shaker, Fluted, and integrated J-pull profiles. Delivered factory-direct to ${city.name} from our state-of-the-art facility.`,
      ]
    : isAluminum
    ? [
        `Looking for architectural aluminum profiles for your ${application.name.toLowerCase()} in ${city.name}? SurajWood's AL-PROFHAN series delivers European-grade 6063-T5 extrusions in standard 3.0-meter lengths. ${product.description}`,
        `${application.roomContext} In ${city.name}, where ${city.climateNote.toLowerCase()}, our heavy-gauge (1.2mm–1.5mm) profiles and dual-sealed anodized finishes provide zero flex, corrosion immunity, and silent shutter closure.`,
        `From handleless Ottimo Gola profiles to Aerolinea slim glass shutter systems and Luminare LED channels, we provide factory-direct supply across ${city.name} for architectural contractors and OEMs.`,
      ]
    : [
        `If you are looking for premium ${product.finishLabel.toLowerCase()} prelaminated acrylic panels for your ${application.name.toLowerCase()} in ${city.name}, Suraj Wood's ${product.name} is the technically superior alternative to standard PETG and local laminates. ${product.description}`,
        `${application.roomContext} In ${city.name}, where ${city.climateNote.toLowerCase()}, our factory-bonded prelaminated boards offer a flawless surface that won't warp or delaminate. Unlike Nivesa or Opulux PETG boards, our PMMA acrylic provides deeper optical clarity and 3H scratch resistance.`,
        `${product.name} ${application.namePlural.toLowerCase()} are available on E1-grade MDF, premium Plywood, and Particle Board (PB) substrates. Each panel comes with a matching balancing backer to ensure 100% stability. Delivered direct to ${city.name} from our manufacturing facility in Bahadurgarh, Haryana.`,
      ];

  const aeoSummary = isMembrane
    ? `SurajWood 3D membrane shutters are the premier seamless alternative to edge-banded laminates for ${application.namePlural.toLowerCase()} in ${city.name}. Featuring 100% monolithic edge wrapping, moisture-resistant Green HDHMR core, and 36 European shades, they prevent edge-delamination in ${city.name}'s climate. Choose from classic CNC Shaker, fluted, or J-pull handleless profiles with factory-direct dispatch.`
    : isAluminum
    ? `AL-PROFHAN 6063-T5 architectural aluminum profiles provide high-strength handleless Gola channels, J-pull handles, and slim glass frames for ${application.namePlural.toLowerCase()} in ${city.name}. Engineered with 1.2mm–1.5mm wall gauge and integrated rubber dampers for silent, long-lasting performance in ${city.name}.`
    : `${product.name} prelaminated acrylic panels are the premium alternative to PETG boards for ${application.namePlural.toLowerCase()} in ${city.name}. Offering 3H scratch resistance, 10-year UV stability, and German PUR bonding, SurajWood outperforms competitors like Praveedh OpuLux or Nivesa in ${city.name}'s climate. Our panels are carpenter-friendly and can be cut or drilled on-site for modular kitchen and wardrobe projects.`;

  const localContextHeading = isMembrane
    ? `Why 3D Membrane Shutters Outperform Edge-Banded Panels in ${city.name}`
    : isAluminum
    ? `AL-PROFHAN Aluminum Profile Hardware Solutions in ${city.name}`
    : `${product.name} vs. PETG & Laminates in ${city.name}`;

  const localContextBody = isMembrane
    ? `${city.designTrend} In ${city.name}, traditional edge-banded shutters often suffer from glue failure due to steam and humidity. SurajWood 3D Membrane Shutters wrap seamlessly around all 4 edges without glue joints, ensuring maximum longevity for ${city.name}'s luxury ${application.namePlural.toLowerCase()}.`
    : isAluminum
    ? `${city.designTrend} For architects and modular furniture manufacturers in ${city.name}, AL-PROFHAN provides standard 3.0m continuous extrusions with color-matched metal end caps, eliminating unsightly cuts and non-standard gaps.`
    : `${city.designTrend} While many in ${city.name} consider PETG boards, Suraj Wood's ${product.name} ${product.finishLabel.toLowerCase()} acrylic offers a more durable, repairable, and premium finish. Our substrate versatility (MDF, Ply, PB) and 3H scratch resistance make it the ideal specification for ${city.name}'s ${application.namePlural.toLowerCase()} across luxury residential and commercial projects.`;

  const comparisonData = isMembrane
    ? [
        {
          feature: "Edge Construction",
          surajWood: "100% Seamless 3D Monolithic Wrap",
          laminate: "Separately Edge-Banded Glue Joints",
          puPaint: "Painted Edge (Prone to Chipping)",
          petg: "Edge-Banded Strip"
        },
        {
          feature: "Moisture / Steam Sealing",
          surajWood: "5-Sided Continuous Polymer Seal",
          laminate: "Glue lines allow water seepage",
          puPaint: "Moderate moisture seal",
          petg: "Glue line vulnerable to steam"
        },
        {
          feature: "CNC 3D Grooving (Shaker / J-Pull)",
          surajWood: "Full CNC Routing & Vacuum Foil Wrap",
          laminate: "Flat only (Cannot do Shaker/J-Pull)",
          puPaint: "Yes, but expensive & fragile",
          petg: "Flat only"
        },
        {
          feature: "Core Substrate Quality",
          surajWood: "High-Density Green HDHMR (850 kg/m³)",
          laminate: "Standard Commercial MDF/PB",
          puPaint: "MDF / Wood",
          petg: "Standard MDF"
        },
      ]
    : [
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
