/**
 * PSEO (Programmatic SEO) data matrix for SurajWood.
 * 5 products × 2 applications × 5 cities = 50 pages.
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
  localContextHeading: string;
  localContextBody: string;
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
// Applications
// ---------------------------------------------------------------------------

const PSEO_APPLICATIONS: Record<string, PSEOApplication> = {
  kitchens: {
    slug: "kitchens",
    name: "Kitchen",
    namePlural: "Kitchens",
    benefits: [
      "Moisture-resistant non-porous surface resists cooking humidity",
      "3H scratch resistance handles daily kitchen use",
      "Easy-clean surface wipes down in seconds after cooking",
      "UV-stable finish maintains colour under kitchen lighting for 10+ years",
      "Class B1 fire-rated for kitchen safety compliance",
    ],
    roomContext:
      "The kitchen is the most demanding environment for interior surfaces — combining heat, moisture, oil vapour, and daily cleaning cycles. Suraj Wood acrylic panels are engineered specifically to handle these conditions.",
  },
  wardrobes: {
    slug: "wardrobes",
    name: "Wardrobe",
    namePlural: "Wardrobes",
    benefits: [
      "Premium surface maintains finish through years of daily door handling",
      "Anti-fingerprint coating keeps shutter faces clean",
      "Available in 50+ colours including subtle wood textures and metallics",
      "Lightweight construction reduces load on wardrobe frames",
      "UV stable — no colour fading even near windows",
    ],
    roomContext:
      "Bedroom wardrobes demand a finish that looks premium year after year while handling the gentle but constant use of daily door opening and closing. Suraj Wood acrylic panels are the preferred choice for luxury bedroom storage.",
  },
};

// ---------------------------------------------------------------------------
// Cities
// ---------------------------------------------------------------------------

const PSEO_CITIES: Record<string, PSEOCity> = {
  delhi: {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    climateNote:
      "Engineered for North India's extreme temperature variations, from 45°C summers to near-freezing winters. Our panels are tested to withstand these thermal cycles without warping or delamination.",
    designTrend:
      "Delhi's premium residential market favours bold statements — large format kitchens with dramatic colour contrasts, high-gloss surfaces for luxury apartments in South Delhi and Gurugram, and robust matte finishes for family homes in the NCR suburbs.",
    dealerAvailability:
      "Stocked and supplied direct from our factory at Bahadurgarh, Haryana — just 35km from central Delhi. Same-day despatch available for Delhi NCR orders.",
  },
  mumbai: {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    climateNote:
      "Built for Mumbai's high-humidity coastal environment. Our moisture-resistant acrylic surface prevents swelling and warping common with wood-based alternatives in tropical climates.",
    designTrend:
      "Mumbai's premium apartment market, from Bandra to Worli to Lower Parel, demands surfaces that handle monsoon humidity without compromise. Compact, efficient kitchen designs and wardrobe solutions that maximise space in Mumbai's premium but space-constrained apartments are the dominant brief.",
    dealerAvailability:
      "Authorised dealers across Mumbai, Thane, and Navi Mumbai with stock held in Mumbai warehouses for quick project turnaround.",
  },
  bangalore: {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    climateNote:
      "Ideal for Bangalore's moderate, design-forward residential market. Clean lines, sophisticated finishes, and consistent quality that matches the city's tech-hub aesthetic and appreciation for premium materials.",
    designTrend:
      "Bangalore's design community — architects and interior designers serving the city's tech sector and startup founders — strongly favours understated luxury: matte finishes, Japandi-inspired neutrals, and premium material specifications that prioritise quality over ostentation.",
    dealerAvailability:
      "Dealer network across Koramangala, Indiranagar, Whitefield, and Electronic City areas with rapid delivery to project sites across Greater Bangalore.",
  },
  hyderabad: {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    climateNote:
      "Perfect for Hyderabad's rapidly growing luxury residential and commercial interiors market. Our panels' UV stability and moisture resistance handle the Deccan Plateau's hot, semi-arid summers and monsoon-season humidity.",
    designTrend:
      "Hyderabad's luxury residential market — particularly Jubilee Hills, Banjara Hills, and the emerging Financial District corridor — is embracing bold, statement-making interiors. Rich jewel tones, high-gloss surfaces, and premium materials are in demand across both residential and commercial hospitality projects.",
    dealerAvailability:
      "Authorised Hyderabad dealers in Secunderabad and Kondapur with stock available for immediate project supply across the twin cities.",
  },
  chennai: {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    climateNote:
      "Salt-air resistant properties make our acrylic panels ideal for Chennai's coastal environment. UV-stable finishes that won't yellow or fade under South India's intense year-round sunlight, and moisture-resistant surfaces built for the city's humid tropical climate.",
    designTrend:
      "Chennai's interior design market combines traditional South Indian spatial sensibilities with increasingly contemporary material choices. Clean whites, warm naturals, and subtle textures like ACRYSILK are particularly popular. The city's design community values durability and easy maintenance given the climate challenges.",
    dealerAvailability:
      "Dealer partnerships across Anna Nagar, T. Nagar, and OMR tech corridor areas with regular delivery from our pan-India logistics network.",
  },
};

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
  const seoDescription = `Premium ${product.name} acrylic panels for ${application.namePlural.toLowerCase()} in ${city.name}. ${product.finishLabel} finish, 5-year warranty, pan-India delivery. Contact our team for samples and project quotes.`;
  const h1 = `Premium ${product.name} Acrylic Panels for ${application.namePlural} in ${city.name}`;

  const introductionParagraphs = [
    `If you are looking for premium ${product.finishLabel.toLowerCase()} acrylic panels for your ${application.name.toLowerCase()} in ${city.name}, Suraj Wood's ${product.name} is designed precisely for projects like yours. ${product.description}`,
    `${application.roomContext} In ${city.name}, where ${city.climateNote.toLowerCase()}, the right panel specification makes a significant difference to long-term performance and aesthetics.`,
    `${product.name} ${application.namePlural.toLowerCase()} across ${city.name} are delivered direct from our manufacturing facility in Bahadurgarh, Haryana, with consistent quality guaranteed sheet to sheet. Our ${city.dealerAvailability.toLowerCase()}`,
  ];

  const localContextHeading = `${product.name} for ${application.namePlural} in ${city.name}: What to Know`;
  const localContextBody = `${city.designTrend} ${product.name}'s ${product.finishLabel.toLowerCase()} finish fits naturally into this aesthetic. The product's 3H scratch resistance, 10-year UV stability, and Class B1 fire rating make it an appropriate specification for ${city.name}'s ${application.namePlural.toLowerCase()} across both residential and commercial project types.`;

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
    localContextHeading,
    localContextBody,
  };
}

// ---------------------------------------------------------------------------
// Static params generator — all 50 combinations
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
