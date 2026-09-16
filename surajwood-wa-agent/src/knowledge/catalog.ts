/**
 * SurajWood Comprehensive Product Catalog & Technical Knowledge Base
 * Official Specification & Data from www.surajwood.com
 */

export interface ProductInfo {
  id: string;
  name: string;
  category: string;
  thickness: string;
  surfaceFinish: string;
  scratchRating: string;
  keyFeatures: string[];
  bestFor: string[];
  substrateOptions: string[];
  edgebandType: string;
  hasMetallic: boolean;
  baseRateSqFt: {
    solid: { mdf: number; hdhmr: number; birch: number; bwp?: number };
    metallic?: { mdf: number; hdhmr: number; birch: number; bwp?: number };
  };
  bslAddon: number;
  melamineDiscount?: number;
}

export interface AluminumSeriesInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  products: { code: string; desc: string; size: string }[];
  finishes: string[];
}

export const SURAJWOOD_CATALOG: ProductInfo[] = [
  {
    id: "acrylux",
    name: "ACRYLUX",
    category: "1mm High Gloss Optical Acrylic",
    thickness: "1mm Optical Acrylic Face + 1mm HIPS Backer (on 18mm Substrate = 20mm Total)",
    surfaceFinish: "92+ GU Optical Mirror Polish with zero distortion / orange peel",
    scratchRating: "3H Hardcoat (anti-scratch coating)",
    keyFeatures: [
      "Pure European Optical Grade PMMA Sheet",
      "PUR Hot-Melt Lamination in Class-100 Cleanroom (zero air bubbles)",
      "Zero yellowing with UV-stabilized polymer matrix",
      "Seamless 1x23 ABS matching edge-banding",
      "Available in Solid Colors and Metallic / Glitter / Design series",
    ],
    bestFor: ["Luxury Kitchen Shutters", "Modern Wardrobe Facades", "High-End Vanity Doors", "Living Room Feature Units"],
    substrateOptions: ["HDHMR", "MDF", "Birch Plywood"],
    edgebandType: "1x23 ABS Matching Seamless Edgeband",
    hasMetallic: true,
    baseRateSqFt: {
      solid: { mdf: 340, hdhmr: 360, birch: 460 },
      metallic: { mdf: 370, hdhmr: 390, birch: 490 },
    },
    bslAddon: 120,
    melamineDiscount: 50,
  },
  {
    id: "acrymatte",
    name: "ACRYMATTE",
    category: "1mm Nano-Matte Anti-Fingerprint Acrylic",
    thickness: "1mm Nano-Matte Acrylic Face + 1mm HIPS Backer",
    surfaceFinish: "Zero-Reflectance Ultra-Deep Matte with Velvety Warm Touch",
    scratchRating: "3H Hardcoat with Anti-Fingerprint & Anti-Smudge Coating",
    keyFeatures: [
      "Super-matte finish with zero light glare or optical reflections",
      "Oleophobic coating rejects fingerprint oils and food grease",
      "Thermal self-healing of micro-abrasions under warm cloth buffing",
      "Moisture and heat resistant for heavy Indian cooking kitchens",
    ],
    bestFor: ["Contemporary Minimalist Kitchens", "Master Bedroom Wardrobes", "Executive Office Credenzas"],
    substrateOptions: ["HDHMR", "MDF", "Birch Plywood"],
    edgebandType: "1x23 ABS Matching Zero-Joint Edgeband",
    hasMetallic: true,
    baseRateSqFt: {
      solid: { mdf: 340, hdhmr: 360, birch: 460 },
      metallic: { mdf: 370, hdhmr: 390, birch: 490 },
    },
    bslAddon: 120,
    melamineDiscount: 50,
  },
  {
    id: "acrysilk",
    name: "ACRYSILK",
    category: "1mm Satin Silk Acrylic",
    thickness: "1mm Satin Acrylic Face + 1mm HIPS Backer",
    surfaceFinish: "Ultra-Fine Tactile Silk Texture (hybrid between gloss and matte)",
    scratchRating: "2.5H Silk Hardcoat",
    keyFeatures: [
      "Gentle satin sheen for muted, quiet luxury aesthetics",
      "Tactile silk feel without plastic friction",
      "Pairs beautifully with warm accent lighting and metallic profile handles",
    ],
    bestFor: ["Designer Wardrobe Systems", "Crockery Consoles", "Dining Room Paneling"],
    substrateOptions: ["HDHMR", "MDF", "Birch Plywood"],
    edgebandType: "1x23 ABS Matching Edgeband",
    hasMetallic: false,
    baseRateSqFt: {
      solid: { mdf: 370, hdhmr: 390, birch: 490 },
    },
    bslAddon: 120,
    melamineDiscount: 50,
  },
  {
    id: "acryglass-uno-15",
    name: "ACRYGLASS UNO 1.5mm",
    category: "1.5mm Crystal Glass Acrylic",
    thickness: "1.5mm High-Gloss PMMA + Frosty White HIPS Backer",
    surfaceFinish: "3D Crystal Glass Depth & Luster",
    scratchRating: "3.5H Hardcoat",
    keyFeatures: [
      "Simulates real lacquered glass without shatter risk or excessive weight",
      "1.5mm extra thickness gives 3D optical refraction",
      "50% lighter than back-painted glass; fits standard European 35mm soft-close hinges",
    ],
    bestFor: ["Contemporary Kitchen Shutters", "Bar Units", "Wall Paneling"],
    substrateOptions: ["HDHMR", "MDF", "Birch Plywood"],
    edgebandType: "1x23 PVC Matching Edgeband",
    hasMetallic: true,
    baseRateSqFt: {
      solid: { mdf: 380, hdhmr: 400, birch: 500 },
      metallic: { mdf: 410, hdhmr: 430, birch: 530 },
    },
    bslAddon: 150,
  },
  {
    id: "acryglass-uno-20",
    name: "ACRYGLASS UNO 2mm",
    category: "2mm Solid Crystal Glass Acrylic",
    thickness: "2mm Solid PMMA Crystal Face",
    surfaceFinish: "Real Glass Look & Feel with 99% Optical Transparency",
    scratchRating: "4H Crystal Hardcoat",
    keyFeatures: [
      "Solid 2mm thickness creates genuine 45-degree chamfered edge possibilities",
      "Shatter-proof alternative to 4mm lacquered float glass",
      "Finished with 1x25 PMMA 3D Crystal Dual-Tone Edgebanding",
    ],
    bestFor: ["Ultra-Luxury Kitchen Island Shutters", "Flagship Walk-In Closets", "Boutique Display Facades"],
    substrateOptions: ["HDHMR", "MDF", "Birch Plywood"],
    edgebandType: "1x25 PMMA 3D Crystal Edgeband",
    hasMetallic: false,
    baseRateSqFt: {
      solid: { mdf: 580, hdhmr: 600, birch: 700 },
    },
    bslAddon: 200,
  },
  {
    id: "acryglass-20",
    name: "ACRYGLASS 2mm (High Gloss & Matt)",
    category: "2mm Premium European Polymer Glass",
    thickness: "2mm European Polymer Glass Face + Precision Backer",
    surfaceFinish: "High Gloss & Frosted Matt Crystal Finishes with 45-Degree Chamfer",
    scratchRating: "4H Industrial Scratch Proofing",
    keyFeatures: [
      "True European polymer glass technology",
      "Can be chamfered / beveled on high-speed CNC with mirror polish",
      "100% waterproof and chemical/stain proof",
    ],
    bestFor: ["Architectural Villa Projects", "Luxury Hotel Suites", "Premium Modular Kitchens"],
    substrateOptions: ["HDHMR", "MDF", "Birch Plywood"],
    edgebandType: "1x25 PMMA 3D Crystal Edgeband",
    hasMetallic: false,
    baseRateSqFt: {
      solid: { mdf: 800, hdhmr: 820, birch: 920 },
    },
    bslAddon: 350,
  },
  {
    id: "uno-10",
    name: "UNO Economy 1mm",
    category: "1mm Economy Acrylic",
    thickness: "1mm Acrylic on MDF / HDHMR / BWP",
    surfaceFinish: "Gloss Finish for Budget-Conscious Commercial Projects",
    scratchRating: "2H Standard Gloss",
    keyFeatures: [
      "Cost-effective acrylic alternative to high-pressure laminates",
      "Vibrant solid and metallic color range",
    ],
    bestFor: ["Rental Apartment Kitchens", "Commercial Offices", "Retail Fitouts"],
    substrateOptions: ["HDHMR", "MDF", "BWP Plywood", "Birch Plywood"],
    edgebandType: "1x23 PVC Matching Edgeband",
    hasMetallic: true,
    baseRateSqFt: {
      solid: { mdf: 240, hdhmr: 260, bwp: 280, birch: 360 },
      metallic: { mdf: 260, hdhmr: 280, bwp: 300, birch: 380 },
    },
    bslAddon: 100,
  },
  {
    id: "membrane-shutters",
    name: "3D Membrane Shutters",
    category: "18mm 3D Thermoformed HDMR Shutters",
    thickness: "18mm HDMR core with 3D Vacuum Thermoformed Vinyl Foil",
    surfaceFinish: "Seamless Shaker 5-Piece Effect, J-Pull / Handleless Grooves, and 3D Fluted Reeded Profiles",
    scratchRating: "Seamless 3D Wrap (Zero edge-banding seams)",
    keyFeatures: [
      "German 3D Membrane Vacuum Press technology",
      "Zero edgeband lines — 100% moisture-sealed edges that cannot peel",
      "Available in 36 curated European colors across 4 distinct collections (Wood Grain, Porcelain Touch, Perfect Silk, Ceramic Satin)",
      "Pre-routed with handleless J-profiles, shaker border profiles, and fluted acoustic ridges",
    ],
    bestFor: ["Classic Shaker Kitchens", "Handleless J-Profile Wardrobes", "Acoustic Fluted Feature Walls"],
    substrateOptions: ["HDHMR", "MDF"],
    edgebandType: "Zero Edge-Banding Needed (Monolithic 3D Vacuum Wrap)",
    hasMetallic: false,
    baseRateSqFt: {
      solid: { mdf: 230, hdhmr: 240, birch: 320 },
    },
    bslAddon: 0,
  },
];

export const MEMBRANE_COLLECTIONS = {
  PS: {
    name: "Perfect Silk (PS)",
    description: "Soft-sheen tactile finishes with deep, vibrant saturation",
    shades: [
      { code: "001-PS", name: "Frost White" },
      { code: "002-PS", name: "Kaschmir" },
      { code: "003-PS", name: "Rusty Red" },
      { code: "004-PS", name: "Reed Green" },
      { code: "005-PS", name: "Estate Green" },
      { code: "006-PS", name: "Graphite" },
      { code: "007-PS", name: "Carbone Grey" },
    ],
  },
  PT: {
    name: "Porcelain Touch (PT)",
    description: "Smooth, velvety matte surfaces in sophisticated architectural hues",
    shades: [
      { code: "008-PT", name: "Alpin Weiß" },
      { code: "009-PT", name: "White Grey" },
      { code: "010-PT", name: "Magnolia" },
      { code: "011-PT", name: "Muschel" },
      { code: "012-PT", name: "Ash Grey" },
      { code: "013-PT", name: "Light Grey" },
      { code: "014-PT", name: "Stone Grey" },
      { code: "015-PT", name: "Onyx Grey" },
      { code: "016-PT", name: "Fjord" },
      { code: "017-PT", name: "Parisian Blue" },
      { code: "018-PT", name: "Denim" },
      { code: "019-PT", name: "Indigo" },
      { code: "020-PT", name: "Black" },
    ],
  },
  CS: {
    name: "Ceramic Satin (CS)",
    description: "Mineral-inspired textured satin finishes for modern spaces",
    shades: [
      { code: "021-CS", name: "Kaschmir" },
      { code: "022-CS", name: "Light Grey" },
      { code: "023-CS", name: "Dakar" },
      { code: "024-CS", name: "Stone Grey" },
      { code: "025-CS", name: "Reed Green" },
      { code: "026-CS", name: "Parisian Blue" },
      { code: "027-CS", name: "Black" },
    ],
  },
  WG: {
    name: "Wood Grain (WG)",
    description: "Ultra-realistic synchronized natural oak, walnut, and pine timber textures",
    shades: [
      { code: "028-WG", name: "Pino Aurelo White" },
      { code: "029-WG", name: "Casella Eiche Light" },
      { code: "030-WG", name: "Artisan Oak Nature" },
      { code: "031-WG", name: "Casella Eiche Nature" },
      { code: "032-WG", name: "Wotan Eiche Nature" },
      { code: "033-WG", name: "Casella Eiche Brown" },
      { code: "034-WG", name: "Viking Oak Volcano" },
      { code: "035-WG", name: "Nussbaum Columbia Brown" },
      { code: "036-WG", name: "Casella Eiche Marone" },
    ],
  },
};

export const ALUMINUM_SERIES: AluminumSeriesInfo[] = [
  {
    id: "ottimo",
    name: "AL-PROFHAN OTTIMO SERIES",
    tagline: "Integrated Gola & Profile Handles",
    description: "The gold standard for handleless kitchen design, offering seamless and ergonomic grip profiles.",
    imageUrl: "https://www.surajwood.com/images/products/aluminum/ottimo.png",
    products: [
      { code: "PAPS-5220", desc: "Aluminum Shutter L Profile Handle with Gasket", size: "3mtr (10 ft)" },
      { code: "PAPS-5221", desc: "Aluminum Shutter C Profile Handle", size: "3mtr (10 ft)" },
      { code: "PAPS-5311", desc: "Aluminum Wall Gola Profile Handle with Gasket", size: "3mtr (10 ft)" },
      { code: "PAPS-5313", desc: "Aluminum 3-Side Profile", size: "3mtr (10 ft)" },
    ],
    finishes: ["Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
  {
    id: "aerolinea",
    name: "AL-PROFHAN AEROLINEA SERIES",
    tagline: "Premium Shutter & Edge Profiles",
    description: "Slim-line architectural frames designed for minimalist glass shutters and clean cabinetry edges.",
    imageUrl: "https://www.surajwood.com/images/products/aluminum/aerolinea.png",
    products: [
      { code: "PAPS-6631", desc: "Aluminum Shutter L Profile Handle with Gasket", size: "3mtr (10 ft)" },
      { code: "PAPS-6632", desc: "Aluminum Shutter C Profile Handle", size: "3mtr (10 ft)" },
      { code: "PAPS-6634", desc: "Aluminum Edge Profile / T-Patti", size: "3mtr (10 ft)" },
    ],
    finishes: ["Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
  {
    id: "handle",
    name: "AL-PROFHAN HANDLE PROFILES",
    tagline: "Ergonomic Shutter Handle Solutions",
    description: "High-precision J and L profile handles engineered for effortless operation in high-end wardrobes & kitchens.",
    imageUrl: "https://www.surajwood.com/images/banner/pro5.jpg",
    products: [
      { code: "PAPS-1336", desc: "Aluminum Shutter L Profile Handle", size: "3mtr (10 ft)" },
      { code: "PAPS-5677", desc: "Aluminum Shutter J Profile Handle with Gasket", size: "3mtr (10 ft)" },
      { code: "PAPS-1335", desc: "Aluminum Shutter Profile Handle with Gasket", size: "3mtr (10 ft)" },
    ],
    finishes: ["Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
  {
    id: "shelf",
    name: "AL-PROFHAN SHELF PROFILES",
    tagline: "Architectural Glass Shelf Support",
    description: "Specialized aluminum profiles for glass shelves with integrated structural support & LED lighting readiness.",
    imageUrl: "https://www.surajwood.com/images/banner/pro6.jpg",
    products: [
      { code: "PAPS-5037", desc: "Aluminum Profile for Glass Shelf", size: "3mtr (10 ft)" },
      { code: "PAPS-5037A", desc: "Aluminum Profile for LED Glass Shelf", size: "3mtr (10 ft)" },
    ],
    finishes: ["Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
  {
    id: "luminare",
    name: "AL-PROFHAN LUMINARE SERIES",
    tagline: "LED Integrated Lighting Profiles",
    description: "Functional lighting profiles for optimal heat dissipation and spot-free diffusion in high-end cabinetry.",
    imageUrl: "https://www.surajwood.com/images/products/aluminum/luminare.png",
    products: [
      { code: "PAPS-3136A", desc: "Aluminum 45° LED Light Profile with Diffuser", size: "3mtr (10 ft)" },
      { code: "PAPS-3062A", desc: "Aluminum Flat LED Light Profile with Diffuser", size: "3mtr (10 ft)" },
    ],
    finishes: ["Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
  {
    id: "hanging",
    name: "AL-PROFHAN HANGING ROD",
    tagline: "Wardrobe Illumination & Rod Systems",
    description: "Premium aluminum wardrobe hanging rods with integrated LED capabilities.",
    imageUrl: "https://www.surajwood.com/images/gallery/wardrobe-3.jpg",
    products: [
      { code: "PAPS-6413", desc: "Aluminum LED Hanging Rod for Clothes", size: "3mtr (10 ft)" },
      { code: "PACP-6414", desc: "Aluminum Clothes Hanging Bracket (2pc set)", size: "Set" },
    ],
    finishes: ["Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
  {
    id: "velaro",
    name: "AL-PROFHAN VELARO SERIES",
    tagline: "Luxury Glass Shutter Systems",
    description: "High-precision sliding and fixed glass shutter profiles for luxury wardrobes and architectural partitions.",
    imageUrl: "https://www.surajwood.com/images/products/aluminum/velaro.png",
    products: [
      { code: "PAPS-1351A", desc: "Glass Shutter Profile with Gasket", size: "3mtr (10 ft)" },
      { code: "PAHD-1351C", desc: "Aluminum Handle (128mm)", size: "4pc pack" },
    ],
    finishes: ["Champagne Painted", "Black Brush", "Bronze Brush", "Coffee Painted", "Anthracite Painted"],
  },
];

export const CATALOG_IMAGES: Record<string, { title: string; url: string; caption: string }> = {
  // ── Official 2025 E-Book Shade Cards ──
  acrylux_solids_card: {
    title: "ACRYLUX Anti Scratch Solid Colors Shade Card",
    url: "https://www.surajwood.com/images/catalogs/page_2.png",
    caption: "💎 *ACRYLUX High-Gloss Solids (2025 Shade Card)* — 1302 White, 1305 Black, 1301 Red, 2304 Wine Red, 1318 Verde, 1315 Cappuccino, 1330 Designer White & 1327 Turquoise (92+ GU Polish).",
  },
  acrymatte_solids_card: {
    title: "ACRYMATTE Super Smooth Nano-Matte Shade Card",
    url: "https://www.surajwood.com/images/catalogs/page_6.png",
    caption: "✨ *ACRYMATTE Super Smooth Matte (2025 Shade Card)* — 3302 White, 3305 Black, 3318 Verde, 3319 Rosso, 3334 Royal Blue, 3325 Urban Grey, 3335 Light Grey (Velvety anti-fingerprint).",
  },
  acrylux_metallics_card: {
    title: "ACRYLUX Metallic Colors Shade Card",
    url: "https://www.surajwood.com/images/catalogs/page_4.png",
    caption: "🌟 *ACRYLUX Metallic Series (2025 Shade Card)* — 2307 White Metallic, 1306 Metallic Grey, 1314 Metallic Blue, 1322 Anthrasite, 1324 Metallic Black, 1338 Metallic Beige, 1340 Metallic Basalt.",
  },
  acrylux_wood_card: {
    title: "ACRYLUX Designs & Wood Grains Shade Card",
    url: "https://www.surajwood.com/images/catalogs/page_5.png",
    caption: "🌳 *ACRYLUX Wood & Design Series (2025 Shade Card)* — 2320 Light Zebrano, 2321 Dark Zebrano, 2328 ELM Black, 2309 Brushed Aluminium, 2311 Textile, 2313 Copper Textile.",
  },
  acrysilk_card: {
    title: "ACRYSILK 1mm Satin Matte Shade Card",
    url: "https://www.surajwood.com/images/catalogs/page_8.png",
    caption: "✨ *ACRYSILK 1mm Satin Matte (2025 Shade Card)* — 5001 Patina, 5002 Aurum, 5003 Argenti, 5004 Scandia, 5005 Griseo, 5006 Cuprous.",
  },
  acryglass_card: {
    title: "ACRYGLASS 2mm Polymer Glass Shade Card",
    url: "https://www.surajwood.com/images/catalogs/page_9.png",
    caption: "💎 *ACRYGLASS & ACRYGLASS MATTE 2mm (2025 Shade Card)* — 402/302 White, 403/303 Cream, 415/315 Beige, 418/318 Sea Green, 423/323 Dark Grey, 439/339 State Grey.",
  },

  // ── Specific Acrylic Finish Closeups ──
  acrylux: {
    title: "SurajWood Acrylux High-Gloss Optical Acrylic",
    url: "https://www.surajwood.com/images/catalogs/page_2.png",
    caption: "💎 *SurajWood Acrylux* — 92+ GU Optical Mirror Polish Acrylic with 3H Scratch Resistant Coating on HDHMR/MDF.",
  },
  acrymatte: {
    title: "SurajWood Acrymatte Ultra-Deep Matte",
    url: "https://www.surajwood.com/images/catalogs/page_6.png",
    caption: "✨ *SurajWood Acrymatte* — Zero-Reflectance Nano-Matte Anti-Fingerprint Acrylic with Velvety Warm Touch.",
  },
  acryglass: {
    title: "SurajWood Acryglass Solid Crystal Polymer Glass",
    url: "https://www.surajwood.com/images/catalogs/page_9.png",
    caption: "💎 *SurajWood Acryglass UNO (1.5mm & 2mm)* — 3D Optical Crystal Polymer Glass with 45° Chamfered Edges.",
  },
  acrysilk: {
    title: "SurajWood Acrysilk Tactile Satin Silk",
    url: "https://www.surajwood.com/images/catalogs/page_8.png",
    caption: "✨ *SurajWood Acrysilk* — Muted satin silk texture with tactile luxury feel.",
  },

  // ── Aluminum Profiles ──
  ottimo: {
    title: "AL-PROFHAN Ottimo Series Aluminum Gola & Profile Handles",
    url: "https://www.surajwood.com/images/products/aluminum/ottimo.png",
    caption: "🌟 *AL-PROFHAN Ottimo Series* — Integrated Gola & Profile Handles (L, C & Wall Profiles) in 3-meter lengths.",
  },
  aerolinea: {
    title: "AL-PROFHAN Aerolinea Series Slim Glass Shutter Profiles",
    url: "https://www.surajwood.com/images/products/aluminum/aerolinea.png",
    caption: "🌟 *AL-PROFHAN Aerolinea Series* — Slim-line architectural frames for minimalist glass shutters & T-patti.",
  },
  luminare: {
    title: "AL-PROFHAN Luminare LED Integrated Lighting Profiles",
    url: "https://www.surajwood.com/images/products/aluminum/luminare.png",
    caption: "💡 *AL-PROFHAN Luminare Series* — 45° & Flat LED Integrated Lighting Profiles with Frosted Diffusers.",
  },
  velaro: {
    title: "AL-PROFHAN Velaro Luxury Glass Shutter Systems",
    url: "https://www.surajwood.com/images/products/aluminum/velaro.png",
    caption: "🌟 *AL-PROFHAN Velaro Series* — Luxury sliding & fixed glass shutter frames in Champagne, Bronze, Black Brush.",
  },

  // ── Membrane Shutters & Swatches ──
  membrane: {
    title: "SurajWood 3D Membrane Shutters",
    url: "https://www.surajwood.com/images/products/membrane-shutters/closeups/closeup-shaker.jpg",
    caption: "🚪 *3D Membrane Shutters* — Seamless 5-Piece Shaker Profile with 100% moisture sealed edges.",
  },
  membrane_shaker: {
    title: "Seamless Shaker Profile",
    url: "https://www.surajwood.com/images/products/membrane-shutters/closeups/closeup-shaker.jpg",
    caption: "🚪 *Seamless Shaker Profile* — 5-piece classic look with zero edgeband joints.",
  },
  membrane_fluted: {
    title: "3D Fluted Reeded Profile",
    url: "https://www.surajwood.com/images/products/membrane-shutters/closeups/closeup-fluted.jpg",
    caption: "🌊 *3D Fluted Reeded Profile* — Precision CNC routed texture for feature walls & cabinetry.",
  },
  membrane_woodgrain: {
    title: "3D Membrane: Artisan Oak Nature (030-WG)",
    url: "https://www.surajwood.com/images/products/membrane-shutters/030-wg-artisan-oak-nature.jpg",
    caption: "🌳 *030-WG Artisan Oak Nature* — Natural timber grain Wood Grain collection.",
  },
  membrane_reed_green: {
    title: "3D Membrane: Reed Green (004-PS)",
    url: "https://www.surajwood.com/images/products/membrane-shutters/004-ps-reed-green.jpg",
    caption: "🌿 *004-PS Reed Green* — Perfect Silk collection soft-sheen botanical green.",
  },
  membrane_parisian_blue: {
    title: "3D Membrane: Parisian Blue (017-PT)",
    url: "https://www.surajwood.com/images/products/membrane-shutters/017-pt-parisian-blue.jpg",
    caption: "🔷 *017-PT Parisian Blue* — Porcelain Touch collection velvety matte.",
  },
  membrane_alpin_white: {
    title: "3D Membrane: Alpin Weiß (008-PT)",
    url: "https://www.surajwood.com/images/products/membrane-shutters/008-pt-alpin-weib.jpg",
    caption: "⚪ *008-PT Alpin Weiß* — Porcelain Touch pristine European matte white.",
  },
};

export const SUBSTRATES_INFO = {
  hdhmr: {
    name: "HDHMR (High Density High Moisture Resistance)",
    description: "Density 850+ kg/m3 with waterproof resin bonding. Recommended for Indian modular kitchens and humid bathroom vanities.",
  },
  mdf: {
    name: "MDF (Medium Density Fiberboard)",
    description: "High surface flatness and zero grain telegraphed through high-gloss acrylic. Ideal for dry wardrobe shutters and decorative wall paneling.",
  },
  birch: {
    name: "Birch Plywood (Calibrated European Grade)",
    description: "Multi-ply void-free calibrated Birch plywood core. Delivers maximum screw-holding capacity and structural rigidity for oversized doors.",
  },
};
