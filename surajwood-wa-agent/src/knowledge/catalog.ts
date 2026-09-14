/**
 * SurajWood Comprehensive Product Catalog & Technical Knowledge Base
 * Official 2026 Specification & Verification Data
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

export const SURAJWOOD_CATALOG: ProductInfo[] = [
  {
    id: "acrylux",
    name: "ACRYLUX",
    category: "1mm High Gloss Acrylic",
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
    category: "1mm Satin Acrylic",
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
    category: "1.5mm Glass Acrylic",
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
    category: "2mm Solid Glass Acrylic",
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
    name: "Continental 3D Membrane Shutters",
    category: "18mm 3D Thermoformed HDMR Shutters",
    thickness: "18mm HDMR core with 3D Vacuum Thermoformed Vinyl Foil",
    surfaceFinish: "Seamless Shaker 5-Piece Effect, J-Pull / Handleless Grooves, and 3D Fluted Reeded Profiles",
    scratchRating: "Seamless 3D Wrap (Zero edge-banding seams)",
    keyFeatures: [
      "German 3D Membrane Vacuum Press technology",
      "Zero edgeband lines — 100% moisture-sealed edges that cannot peel",
      "Available in Matte, Woodgrain, Stone & Soft-Touch finishes",
      "Pre-routed with handleless J-profiles or shaker border profiles",
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

export const SURAJWOOD_FAQ = [
  {
    q: "What is the difference between SurajWood Acrylic and normal laminate?",
    a: "Standard laminate has a thin melamine resin face (0.8–1mm) that produces orange peel texture and black phenolic lines at the edges. SurajWood uses 1mm–2mm pure optical PMMA sheets with PUR hot-melt bonding, delivering a 92+ GU crystal mirror reflection, zero glue lines with matching ABS/PMMA edgebanding, and 3H/4H hardcoat scratch resistance.",
  },
  {
    q: "How fast can you dispatch orders?",
    a: "Standard orders for pre-finished cut-to-size shutters and 8x4 panels are manufactured and dispatched from our Indore facility within 48 to 72 hours across India via insured logistics.",
  },
  {
    q: "Can Architects & Interior Designers get free physical samples?",
    a: "Yes! We provide complimentary Sample Swatch Boxes containing 3 large 6x4 inch acrylic finishes with matching edge-banded profiles directly to your studio or site address within 48 hours.",
  },
  {
    q: "What warranty does SurajWood provide?",
    a: "SurajWood panels come with a 10-Year Warranty against delamination, UV color fading, and bubbling when fabricated with our recommended PUR edgeband protocols.",
  },
];
