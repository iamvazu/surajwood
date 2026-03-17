/**
 * Sanity CMS client for SurajWood.
 * Exports typed async functions backed by mock data until Sanity is configured.
 * When NEXT_PUBLIC_SANITY_PROJECT_ID is set, functions query Sanity via GROQ.
 * Otherwise the exact same mock data from the original wordpress.ts is returned.
 */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type {
  SanityProduct,
  SanityApplication,
  SanityTestimonial,
  SanityFAQ,
  SanityPost,
  HomepageData,
  SanityImage,
} from "@/types/sanity";

// ---------------------------------------------------------------------------
// Sanity client setup (only when project ID is present)
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

const builder =
  projectId && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: unknown) {
  return builder
    ? builder.image(source as Parameters<typeof builder.image>[0])
    : null;
}

// ---------------------------------------------------------------------------
// GROQ field projections
// ---------------------------------------------------------------------------

const imageProjection = `{
  _type,
  asset,
  "alt": coalesce(alt, "SurajWood acrylic panel"),
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const colourProjection = `{
  colour_name,
  hex_value,
  swatch_image ${imageProjection}
}`;

const technicalSpecsProjection = `{
  scratch_resistance,
  uv_stability,
  anti_fingerprint,
  fire_rating,
  warranty
}`;

const productFields = `
  "id": _id,
  "slug": slug.current,
  "name": title,
  "finish_type": finishType,
  tagline,
  "description": shortDescription,
  "hero_image": heroImage ${imageProjection},
  "gallery": gallery[] ${imageProjection},
  "ideal_for": idealFor,
  thickness,
  dimensions,
  "material_composition": materialComposition,
  "surface_properties": surfaceProperties,
  "colour_range": colourRange[] ${colourProjection},
  "technical_specs": technicalSpecs ${technicalSpecsProjection},
  faq[] { question, answer },
  "seo_title": seoTitle,
  "seo_description": seoDescription,
  order
`;

const applicationFields = `
  "id": _id,
  "slug": slug.current,
  "name": title,
  "hero_image": heroImage ${imageProjection},
  description,
  "gallery": gallery[] ${imageProjection},
  "suitable_products": suitableProducts[]->slug.current,
  "room_type": roomType,
  "design_tips": designTips,
  faq[] { question, answer }
`;

const testimonialFields = `
  "id": _id,
  "client_name": clientName,
  designation,
  company,
  quote,
  rating,
  "project_type": projectType
`;

const faqFields = `
  "id": _id,
  question,
  answer,
  category,
  "linked_product": linkedProduct->slug.current
`;

const postFields = `
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  "content": pt::text(content),
  "featured_image": featuredImage ${imageProjection},
  "date": publishedAt,
  "author": author->name,
  "reading_time": readingTime,
  "categories": categories[]->title
`;

// ---------------------------------------------------------------------------
// Shared placeholder media helpers (mock data only)
// ---------------------------------------------------------------------------

function placeholderImage(
  id: number,
  width = 1200,
  height = 800,
  alt = "SurajWood acrylic panel"
): SanityImage {
  return {
    _type: "image",
    asset: { _ref: `image-placeholder-${id}` },
    alt,
    id,
    url: `https://placehold.co/${width}x${height}/1B2A4A/F5F1EB?text=SurajWood`,
    width,
    height,
  };
}

// ---------------------------------------------------------------------------
// Mock product data
// ---------------------------------------------------------------------------

const MOCK_PRODUCTS: SanityProduct[] = [
  {
    id: 1,
    slug: "acrylux",
    name: "ACRYLUX",
    finish_type: "satin",
    tagline: "The Original Premium Satin",
    description:
      "ACRYLUX is our flagship acrylic panel line featuring a smooth satin finish that reflects light beautifully without harsh glare. Perfect for modern Indian kitchens and wardrobes where you want elegance without maintenance headaches.",
    hero_image: placeholderImage(101, 1440, 900, "ACRYLUX satin acrylic panel"),
    gallery: [
      placeholderImage(201, 800, 600, "ACRYLUX kitchen application"),
      placeholderImage(202, 800, 600, "ACRYLUX wardrobe application"),
      placeholderImage(203, 800, 600, "ACRYLUX colour palette"),
      placeholderImage(204, 800, 600, "ACRYLUX close-up texture"),
    ],
    ideal_for: ["kitchens", "wardrobes", "commercial", "offices"],
    thickness: "1mm, 1.5mm, 3mm",
    dimensions: "8ft x 4ft (2440mm x 1220mm) standard sheet",
    material_composition:
      "PMMA (Polymethyl Methacrylate) acrylic laminated to 18mm MDF substrate using German PUR hotmelt adhesive. The acrylic layer is co-extruded for uniform thickness and bonded under controlled pressure and temperature.",
    surface_properties:
      "Smooth satin finish with 3H pencil hardness scratch resistance. UV-stable coating guarantees no yellowing for 10 years. Anti-fingerprint treatment available on select colours.",
    colour_range: [
      {
        colour_name: "Arctic White",
        hex_value: "#F8F8F8",
        swatch_image: placeholderImage(301, 100, 100, "Arctic White swatch"),
      },
      {
        colour_name: "Midnight Navy",
        hex_value: "#1B2A4A",
        swatch_image: placeholderImage(302, 100, 100, "Midnight Navy swatch"),
      },
      {
        colour_name: "Copper Silk",
        hex_value: "#B87333",
        swatch_image: placeholderImage(303, 100, 100, "Copper Silk swatch"),
      },
      {
        colour_name: "Champagne Beige",
        hex_value: "#E8DCC8",
        swatch_image: placeholderImage(304, 100, 100, "Champagne Beige swatch"),
      },
      {
        colour_name: "Graphite Storm",
        hex_value: "#4A4A4A",
        swatch_image: placeholderImage(305, 100, 100, "Graphite Storm swatch"),
      },
    ],
    technical_specs: {
      scratch_resistance: "3H pencil hardness (EN ISO 15184)",
      uv_stability: "10-year UV stability guarantee, Delta E < 2 after 1000h UV exposure",
      anti_fingerprint: true,
      fire_rating: "Class B1 (DIN 4102)",
      warranty: "5 years manufacturing defect warranty",
    },
    faq: [
      {
        question: "What is ACRYLUX made of?",
        answer:
          "ACRYLUX is made from high-grade PMMA (Polymethyl Methacrylate) acrylic bonded to an 18mm MDF substrate using German PUR hotmelt adhesive. This combination gives you the premium surface quality of acrylic with the structural stability of engineered wood.",
      },
      {
        question: "How do I clean and maintain ACRYLUX panels?",
        answer:
          "ACRYLUX requires minimal maintenance. Wipe with a soft damp microfibre cloth for everyday cleaning. For grease or stubborn marks, use a mild dish soap solution. Avoid abrasive cleaners, scouring pads, or solvent-based products that can dull the satin finish.",
      },
      {
        question: "Can ACRYLUX be used in humid areas like bathrooms?",
        answer:
          "Yes. ACRYLUX panels are moisture-resistant thanks to the non-porous acrylic surface. They perform well in kitchens and bathrooms with good ventilation. For areas with constant water exposure (e.g., behind sinks), ensure proper edge-sealing during installation.",
      },
      {
        question: "What thickness should I choose for my kitchen?",
        answer:
          "For kitchen cabinet shutters, 1mm or 1.5mm ACRYLUX on 18mm MDF is the standard choice. For high-traffic areas or commercial projects requiring extra durability, the 3mm option provides additional rigidity and impact resistance.",
      },
      {
        question: "How is ACRYLUX different from laminate?",
        answer:
          "Unlike laminates, ACRYLUX uses a solid PMMA acrylic layer that gives deeper colour saturation, a luxurious feel, and significantly higher scratch resistance. Laminates are printed paper under a thin resin layer; ACRYLUX is a true acrylic surface. The satin finish also has a warmth that printed laminates cannot replicate.",
      },
    ],
    seo_title: "ACRYLUX Satin Acrylic Panels | Premium Kitchen & Wardrobe Finish | Suraj Wood",
    seo_description:
      "ACRYLUX by Suraj Wood — India's leading satin-finish acrylic panel. PMMA acrylic on 18mm MDF, 37+ colours, 5-year warranty. Ideal for modular kitchens and wardrobes across India.",
  },
  {
    id: 2,
    slug: "acrysilk",
    name: "ACRYSILK",
    finish_type: "soft-satin",
    tagline: "Silk-Touch Luxury",
    description:
      "ACRYSILK delivers a uniquely soft, silk-like touch to acrylic surfaces. The micro-textured finish diffuses light evenly, hiding minor scratches while maintaining a premium feel under your fingertips.",
    hero_image: placeholderImage(102, 1440, 900, "ACRYSILK soft-satin acrylic panel"),
    gallery: [
      placeholderImage(211, 800, 600, "ACRYSILK kitchen application"),
      placeholderImage(212, 800, 600, "ACRYSILK wardrobe application"),
      placeholderImage(213, 800, 600, "ACRYSILK colour palette"),
    ],
    ideal_for: ["kitchens", "wardrobes", "bedrooms"],
    thickness: "1mm, 1.5mm, 3mm",
    dimensions: "8ft x 4ft (2440mm x 1220mm) standard sheet",
    material_composition:
      "PMMA acrylic with micro-textured surface treatment laminated to 18mm MDF using German PUR hotmelt adhesive.",
    surface_properties:
      "Soft satin micro-textured finish that diffuses light and conceals minor surface imperfections. Excellent anti-fingerprint performance. 3H pencil hardness.",
    colour_range: [
      {
        colour_name: "Pearl White",
        hex_value: "#F5F0E8",
        swatch_image: placeholderImage(311, 100, 100, "Pearl White swatch"),
      },
      {
        colour_name: "Warm Grey",
        hex_value: "#B0A8A0",
        swatch_image: placeholderImage(312, 100, 100, "Warm Grey swatch"),
      },
      {
        colour_name: "Dusk Mauve",
        hex_value: "#9E7B8B",
        swatch_image: placeholderImage(313, 100, 100, "Dusk Mauve swatch"),
      },
      {
        colour_name: "Sage Green",
        hex_value: "#8A9E88",
        swatch_image: placeholderImage(314, 100, 100, "Sage Green swatch"),
      },
      {
        colour_name: "Sand Dune",
        hex_value: "#C8B89A",
        swatch_image: placeholderImage(315, 100, 100, "Sand Dune swatch"),
      },
      {
        colour_name: "Slate Blue",
        hex_value: "#6A7E9E",
        swatch_image: placeholderImage(316, 100, 100, "Slate Blue swatch"),
      },
    ],
    technical_specs: {
      scratch_resistance: "3H pencil hardness (EN ISO 15184)",
      uv_stability: "10-year UV stability guarantee, Delta E < 2 after 1000h UV exposure",
      anti_fingerprint: true,
      fire_rating: "Class B1 (DIN 4102)",
      warranty: "5 years manufacturing defect warranty",
    },
    faq: [
      {
        question: "What is ACRYSILK made of?",
        answer:
          "ACRYSILK is a micro-textured PMMA acrylic panel bonded to 18mm MDF using German PUR hotmelt adhesive. The micro-texture is applied during the acrylic extrusion process, giving a consistent silk-like feel across the entire surface.",
      },
      {
        question: "How does ACRYSILK differ from ACRYLUX?",
        answer:
          "While ACRYLUX has a smooth satin finish, ACRYSILK features a fine micro-texture that creates a softer, silk-like tactile experience. The micro-texture also does a better job hiding minor surface scratches from everyday use.",
      },
      {
        question: "How do I maintain ACRYSILK panels?",
        answer:
          "Use a soft damp cloth for routine cleaning. The micro-textured surface is easy to clean — just wipe in straight strokes. Avoid circular scrubbing which can catch in the texture. Mild soap and water works for cooking grease.",
      },
      {
        question: "Is ACRYSILK suitable for high-traffic commercial spaces?",
        answer:
          "Yes. ACRYSILK's 3H scratch resistance and excellent anti-fingerprint properties make it an excellent choice for reception counters, commercial wall cladding, and premium retail interiors.",
      },
    ],
    seo_title: "ACRYSILK Soft-Satin Acrylic Panels | Silk-Touch Kitchen & Wardrobe Finish | Suraj Wood",
    seo_description:
      "ACRYSILK by Suraj Wood — micro-textured soft-satin acrylic panels with superior anti-fingerprint properties. 6 premium colours. Ideal for kitchens, wardrobes, and commercial interiors.",
  },
  {
    id: 3,
    slug: "acrymatte",
    name: "ACRYMATTE",
    finish_type: "matte",
    tagline: "Pure Matte Perfection",
    description:
      "ACRYMATTE is for those who love the clean, contemporary look of matte surfaces. Anti-fingerprint coating keeps it spotless in the busiest kitchens while maintaining depth of colour.",
    hero_image: placeholderImage(103, 1440, 900, "ACRYMATTE matte acrylic panel"),
    gallery: [
      placeholderImage(221, 800, 600, "ACRYMATTE kitchen application"),
      placeholderImage(222, 800, 600, "ACRYMATTE wardrobe application"),
      placeholderImage(223, 800, 600, "ACRYMATTE colour palette"),
    ],
    ideal_for: ["kitchens", "wardrobes", "offices", "commercial"],
    thickness: "1mm, 1.5mm, 3mm",
    dimensions: "8ft x 4ft (2440mm x 1220mm) standard sheet",
    material_composition:
      "PMMA acrylic with full-matte surface coating laminated to 18mm MDF using German PUR hotmelt adhesive.",
    surface_properties:
      "True matte finish with deep colour saturation. Advanced anti-fingerprint nano-coating. 3H pencil hardness. Zero light reflection for modern, understated interiors.",
    colour_range: [
      {
        colour_name: "Jet Black Matte",
        hex_value: "#1A1A1A",
        swatch_image: placeholderImage(321, 100, 100, "Jet Black Matte swatch"),
      },
      {
        colour_name: "Cloud White Matte",
        hex_value: "#EDEDED",
        swatch_image: placeholderImage(322, 100, 100, "Cloud White Matte swatch"),
      },
      {
        colour_name: "Charcoal Matte",
        hex_value: "#3C3C3C",
        swatch_image: placeholderImage(323, 100, 100, "Charcoal Matte swatch"),
      },
      {
        colour_name: "Forest Green Matte",
        hex_value: "#2D5A3D",
        swatch_image: placeholderImage(324, 100, 100, "Forest Green Matte swatch"),
      },
      {
        colour_name: "Dusty Rose Matte",
        hex_value: "#C49A8A",
        swatch_image: placeholderImage(325, 100, 100, "Dusty Rose Matte swatch"),
      },
      {
        colour_name: "Navy Matte",
        hex_value: "#1B2A4A",
        swatch_image: placeholderImage(326, 100, 100, "Navy Matte swatch"),
      },
      {
        colour_name: "Terracotta Matte",
        hex_value: "#C26B4A",
        swatch_image: placeholderImage(327, 100, 100, "Terracotta Matte swatch"),
      },
      {
        colour_name: "Warm Taupe",
        hex_value: "#9E8E7E",
        swatch_image: placeholderImage(328, 100, 100, "Warm Taupe swatch"),
      },
      {
        colour_name: "Blush Beige",
        hex_value: "#E0C8B8",
        swatch_image: placeholderImage(329, 100, 100, "Blush Beige swatch"),
      },
      {
        colour_name: "Slate Grey",
        hex_value: "#6E7E8E",
        swatch_image: placeholderImage(330, 100, 100, "Slate Grey swatch"),
      },
      {
        colour_name: "Olive Matte",
        hex_value: "#6B6B3A",
        swatch_image: placeholderImage(331, 100, 100, "Olive Matte swatch"),
      },
    ],
    technical_specs: {
      scratch_resistance: "3H pencil hardness (EN ISO 15184)",
      uv_stability: "10-year UV stability guarantee, Delta E < 2 after 1000h UV exposure",
      anti_fingerprint: true,
      fire_rating: "Class B1 (DIN 4102)",
      warranty: "5 years manufacturing defect warranty",
    },
    faq: [
      {
        question: "What is ACRYMATTE made of?",
        answer:
          "ACRYMATTE uses a full-matte PMMA acrylic surface with an advanced nano anti-fingerprint coating, bonded to 18mm MDF with German PUR hotmelt adhesive. The matte finish is achieved through precise surface treatment during the acrylic manufacturing process — not a separate coating.",
      },
      {
        question: "Does matte acrylic show fingerprints?",
        answer:
          "ACRYMATTE is treated with an advanced nano anti-fingerprint coating that significantly reduces fingerprint visibility. It is one of the easiest surfaces to keep clean in a busy kitchen environment.",
      },
      {
        question: "Is matte acrylic durable?",
        answer:
          "Yes. Despite its understated appearance, ACRYMATTE shares the same 3H scratch resistance and Class B1 fire rating as all Suraj Wood products. The matte finish also has a practical advantage: minor surface marks are less visible on matte than on gloss finishes.",
      },
      {
        question: "Can I use ACRYMATTE for a full kitchen including wall panels?",
        answer:
          "Absolutely. ACRYMATTE is suitable for cabinet shutters, drawer fronts, and wall cladding panels. For backsplash areas near cooking hobs, ensure the installation leaves a proper heat buffer gap as per standard kitchen fitting guidelines.",
      },
      {
        question: "How is ACRYMATTE different from a matte laminate?",
        answer:
          "Matte laminates are printed paper sealed under a thin resin. ACRYMATTE is solid PMMA acrylic that gives richer colour depth, better durability, and a more premium touch. The matte surface on ACRYMATTE also holds up better over time without the surface wearing thin like laminate.",
      },
    ],
    seo_title: "ACRYMATTE Matte Acrylic Panels | Anti-Fingerprint Kitchen Finish | Suraj Wood",
    seo_description:
      "ACRYMATTE by Suraj Wood — premium matte-finish acrylic panels with advanced anti-fingerprint nano-coating. 11 contemporary colours. Perfect for modern Indian kitchens and wardrobes.",
  },
  {
    id: 4,
    slug: "acryglass",
    name: "ACRYGLASS",
    finish_type: "high-gloss",
    tagline: "Mirror-Like Brilliance",
    description:
      "ACRYGLASS delivers maximum light reflection with its mirror-like high gloss surface. Creates the illusion of larger spaces and adds dramatic visual impact to any interior.",
    hero_image: placeholderImage(104, 1440, 900, "ACRYGLASS high-gloss acrylic panel"),
    gallery: [
      placeholderImage(231, 800, 600, "ACRYGLASS kitchen application"),
      placeholderImage(232, 800, 600, "ACRYGLASS living room application"),
      placeholderImage(233, 800, 600, "ACRYGLASS colour palette"),
    ],
    ideal_for: ["kitchens", "wardrobes", "commercial", "feature walls"],
    thickness: "1mm, 1.5mm, 3mm",
    dimensions: "8ft x 4ft (2440mm x 1220mm) standard sheet",
    material_composition:
      "Optical-grade PMMA acrylic with high-gloss mirror polish laminated to 18mm MDF using German PUR hotmelt adhesive.",
    surface_properties:
      "Mirror-like high-gloss surface with 95% light reflectivity. 3H pencil hardness. Suitable for feature walls and statement kitchen shutters.",
    colour_range: [
      {
        colour_name: "Piano Black",
        hex_value: "#0A0A0A",
        swatch_image: placeholderImage(341, 100, 100, "Piano Black swatch"),
      },
      {
        colour_name: "Pure White Gloss",
        hex_value: "#FFFFFF",
        swatch_image: placeholderImage(342, 100, 100, "Pure White Gloss swatch"),
      },
      {
        colour_name: "Champagne Gold",
        hex_value: "#D4AF37",
        swatch_image: placeholderImage(343, 100, 100, "Champagne Gold swatch"),
      },
      {
        colour_name: "Royal Red",
        hex_value: "#8B0000",
        swatch_image: placeholderImage(344, 100, 100, "Royal Red swatch"),
      },
      {
        colour_name: "Electric Blue",
        hex_value: "#0047AB",
        swatch_image: placeholderImage(345, 100, 100, "Electric Blue swatch"),
      },
      {
        colour_name: "Rose Gold",
        hex_value: "#B76E79",
        swatch_image: placeholderImage(346, 100, 100, "Rose Gold swatch"),
      },
    ],
    technical_specs: {
      scratch_resistance: "3H pencil hardness (EN ISO 15184)",
      uv_stability: "10-year UV stability guarantee, Delta E < 2 after 1000h UV exposure",
      anti_fingerprint: false,
      fire_rating: "Class B1 (DIN 4102)",
      warranty: "5 years manufacturing defect warranty",
    },
    faq: [
      {
        question: "What is ACRYGLASS made of?",
        answer:
          "ACRYGLASS uses optical-grade PMMA acrylic polished to a mirror-like finish, laminated to 18mm MDF with German PUR hotmelt adhesive. The gloss surface is created through a precision polishing process that achieves 95% light reflectivity.",
      },
      {
        question: "Does high-gloss acrylic show fingerprints easily?",
        answer:
          "High-gloss surfaces do show fingerprints more readily than matte or satin finishes. A quick wipe with a microfibre cloth removes marks instantly. For kitchens where fingerprints are a concern, consider ACRYLUX (satin) or ACRYMATTE for a similar premium look with less maintenance.",
      },
      {
        question: "How do I clean ACRYGLASS without scratching it?",
        answer:
          "Always use a clean, soft microfibre cloth dampened with water. For stubborn marks, a drop of mild dish soap works well. Never use paper towels, kitchen sponges, or abrasive cleaners. Dry immediately after cleaning to avoid water spots.",
      },
      {
        question: "Can ACRYGLASS be used as a feature wall panel?",
        answer:
          "Yes, ACRYGLASS is excellent for feature walls, TV panels, and statement reception counters. Its mirror-like surface creates dramatic visual impact and makes spaces appear larger. Ensure proper adhesive application and support when used for large wall panels.",
      },
    ],
    seo_title: "ACRYGLASS High-Gloss Acrylic Panels | Mirror-Finish Kitchen & Interior Panels | Suraj Wood",
    seo_description:
      "ACRYGLASS by Suraj Wood — premium high-gloss acrylic panels with mirror-like reflectivity. 6 bold colours. Transform kitchens, wardrobes, and feature walls across India.",
  },
  {
    id: 5,
    slug: "acryglass-matte",
    name: "ACRYGLASS MATTE",
    finish_type: "matte-glass",
    tagline: "Glass Clarity, Matte Touch",
    description:
      "ACRYGLASS MATTE combines the crystal clarity of glass with a sophisticated matte finish. The best of both worlds: depth of glass without reflective glare.",
    hero_image: placeholderImage(105, 1440, 900, "ACRYGLASS MATTE matte-glass acrylic panel"),
    gallery: [
      placeholderImage(241, 800, 600, "ACRYGLASS MATTE kitchen application"),
      placeholderImage(242, 800, 600, "ACRYGLASS MATTE wardrobe application"),
      placeholderImage(243, 800, 600, "ACRYGLASS MATTE colour palette"),
    ],
    ideal_for: ["kitchens", "wardrobes", "offices", "luxury residential"],
    thickness: "1mm, 1.5mm, 3mm",
    dimensions: "8ft x 4ft (2440mm x 1220mm) standard sheet",
    material_composition:
      "Optical-grade PMMA acrylic with precision matte surface treatment (matte-glass finish) laminated to 18mm MDF using German PUR hotmelt adhesive.",
    surface_properties:
      "Matte-glass finish combines deep colour saturation of glass-grade acrylic with a non-reflective matte surface. Anti-fingerprint nano-coating. 3H pencil hardness.",
    colour_range: [
      {
        colour_name: "Frosted White",
        hex_value: "#F2F0EE",
        swatch_image: placeholderImage(351, 100, 100, "Frosted White swatch"),
      },
      {
        colour_name: "Smoked Charcoal",
        hex_value: "#2E2E2E",
        swatch_image: placeholderImage(352, 100, 100, "Smoked Charcoal swatch"),
      },
      {
        colour_name: "Teal Mist",
        hex_value: "#4A8E8E",
        swatch_image: placeholderImage(353, 100, 100, "Teal Mist swatch"),
      },
      {
        colour_name: "Dusty Plum",
        hex_value: "#6B4A6B",
        swatch_image: placeholderImage(354, 100, 100, "Dusty Plum swatch"),
      },
      {
        colour_name: "Warm Bronze",
        hex_value: "#8C6A3E",
        swatch_image: placeholderImage(355, 100, 100, "Warm Bronze swatch"),
      },
      {
        colour_name: "Muted Sage",
        hex_value: "#7A8E7A",
        swatch_image: placeholderImage(356, 100, 100, "Muted Sage swatch"),
      },
      {
        colour_name: "Blush Nude",
        hex_value: "#D4B8A8",
        swatch_image: placeholderImage(357, 100, 100, "Blush Nude swatch"),
      },
    ],
    technical_specs: {
      scratch_resistance: "3H pencil hardness (EN ISO 15184)",
      uv_stability: "10-year UV stability guarantee, Delta E < 2 after 1000h UV exposure",
      anti_fingerprint: true,
      fire_rating: "Class B1 (DIN 4102)",
      warranty: "5 years manufacturing defect warranty",
    },
    faq: [
      {
        question: "What is ACRYGLASS MATTE made of?",
        answer:
          "ACRYGLASS MATTE uses optical-grade PMMA acrylic — the same base material as ACRYGLASS — but with a precision matte surface treatment applied post-extrusion. This gives you the colour depth and clarity of glass-grade acrylic with a contemporary non-reflective finish.",
      },
      {
        question: "What is the difference between ACRYMATTE and ACRYGLASS MATTE?",
        answer:
          "Both are matte-finish acrylic panels, but ACRYGLASS MATTE uses higher-grade optical PMMA acrylic, giving greater colour depth and a more luxurious feel. ACRYMATTE is the excellent everyday matte; ACRYGLASS MATTE is for projects where you want a truly premium matte specification.",
      },
      {
        question: "Does ACRYGLASS MATTE resist fingerprints?",
        answer:
          "Yes. ACRYGLASS MATTE is treated with an anti-fingerprint nano-coating as standard, making it one of the most practical premium panel options for busy kitchen environments.",
      },
      {
        question: "Is ACRYGLASS MATTE available in custom sizes?",
        answer:
          "Our standard sheet size is 8ft x 4ft (2440mm x 1220mm). For commercial or large-format projects requiring custom sizes, please contact our sales team at sales@surajwood.com or call +91-9999995553.",
      },
      {
        question: "What applications is ACRYGLASS MATTE best suited for?",
        answer:
          "ACRYGLASS MATTE excels in luxury kitchen shutters, premium wardrobe finishes, office reception cladding, and hospitality interiors. Its sophisticated glass-matte aesthetic is especially popular in high-end Bangalore and Mumbai residential projects.",
      },
    ],
    seo_title: "ACRYGLASS MATTE Acrylic Panels | Glass Clarity, Matte Finish | Suraj Wood",
    seo_description:
      "ACRYGLASS MATTE by Suraj Wood — premium matte-glass acrylic panels combining optical-grade clarity with sophisticated matte finish. 7 curated colours. India's finest matte-glass surface.",
  },
];

// ---------------------------------------------------------------------------
// Mock blog post data
// ---------------------------------------------------------------------------

const MOCK_POSTS: SanityPost[] = [
  {
    id: 1,
    slug: "acrylic-vs-laminate-kitchen-panels-india",
    title: "Acrylic vs Laminate Kitchen Panels: The Complete Indian Guide 2026",
    excerpt:
      "Choosing between acrylic and laminate for your kitchen? We break down durability, cost, maintenance, and aesthetics to help Indian homeowners and designers make the right call.",
    content: `<p>When it comes to modular kitchen finishes in India, two materials dominate the conversation: acrylic panels and laminates. Both have their advocates, both have their place, but they are fundamentally different products with different performance profiles.</p>
<h2>What is Acrylic?</h2>
<p>Acrylic kitchen panels — like Suraj Wood's ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, and ACRYGLASS MATTE ranges — are made from PMMA (Polymethyl Methacrylate), a high-performance polymer bonded to an MDF substrate. The surface is homogenous acrylic, not a printed film.</p>
<h2>What is Laminate?</h2>
<p>Laminates (HPL or LPL) are decorative paper layers saturated with resin and bonded to a core substrate. High-Pressure Laminates are more durable; Low-Pressure Laminates (membrane/foils) are more economical but less durable.</p>
<h2>Durability Comparison</h2>
<p>Acrylic panels consistently outperform laminates in scratch resistance (3H vs typically 2H), UV stability (10-year guarantee vs 2-5 years typical for laminate), and long-term colour retention.</p>
<h2>Cost Comparison</h2>
<p>Acrylic panels are priced higher than standard laminates — approximately 1.5x to 2x the cost per square foot. However, the extended life cycle and lower maintenance costs make acrylic the better long-term investment for premium kitchens.</p>
<h2>Verdict</h2>
<p>For premium modular kitchens in India, acrylic is the superior choice for shutters and visible surfaces. Laminates remain a practical option for internal carcass work and budget-constrained projects.</p>`,
    featured_image: placeholderImage(401, 1200, 630, "Acrylic vs Laminate kitchen panels"),
    date: "2026-02-15",
    author: "Suraj Wood Editorial Team",
    reading_time: 8,
    categories: ["Material Guide", "Kitchen Design"],
  },
  {
    id: 2,
    slug: "kitchen-design-trends-india-2026",
    title: "2026 Kitchen Interior Design Trends in India",
    excerpt:
      "From japandi minimalism to bold jewel tones, we explore the kitchen design trends shaping Indian interiors in 2026 — and which Suraj Wood finishes bring them to life.",
    content: `<p>Indian kitchen design is evolving rapidly. The days of simple white-and-chrome kitchens are behind us; today's homeowners and designers are reaching for bold statements, thoughtful material combinations, and finishes that hold up to Indian family living.</p>
<h2>Trend 1: Japandi-Inspired Kitchens</h2>
<p>The Japandi aesthetic — a blend of Japanese wabi-sabi minimalism and Scandinavian functionality — is the dominant force in premium Indian interiors in 2026. Muted naturals, warm greys, and organic forms define this look. ACRYMATTE in Warm Taupe or Olive Matte is the ideal finish.</p>
<h2>Trend 2: Two-Tone Kitchens</h2>
<p>Upper cabinets in a light finish, lower in a darker tone — two-tone kitchens are everywhere. ACRYLUX Arctic White paired with ACRYMATTE Charcoal is a winning combination seen across Mumbai and Bangalore projects.</p>
<h2>Trend 3: Statement Islands</h2>
<p>Kitchen islands are becoming the centrepiece of Indian open-plan homes. ACRYGLASS in Piano Black or Champagne Gold makes a dramatic island statement that anchors the entire kitchen design.</p>
<h2>Trend 4: Earthy & Botanical Palettes</h2>
<p>Forest greens, terracotta, and warm ochres reflect a broader move toward nature-inspired palettes. ACRYMATTE Forest Green and Terracotta Matte are among our fastest-growing colour choices in 2026.</p>`,
    featured_image: placeholderImage(402, 1200, 630, "2026 kitchen design trends India"),
    date: "2026-01-20",
    author: "Suraj Wood Editorial Team",
    reading_time: 6,
    categories: ["Design Trends", "Kitchen Design"],
  },
  {
    id: 3,
    slug: "how-to-clean-acrylic-kitchen-panels",
    title: "How to Clean and Maintain High-Gloss Acrylic Kitchen Panels",
    excerpt:
      "Your complete maintenance guide for ACRYGLASS high-gloss panels — from daily cleaning to removing stubborn grease, stains, and water marks without damaging the finish.",
    content: `<p>High-gloss acrylic panels like ACRYGLASS are beautiful and durable, but they do require proper maintenance to keep that mirror-like brilliance. With the right technique, maintenance takes under two minutes a day.</p>
<h2>Daily Cleaning</h2>
<p>Use a clean, dry microfibre cloth to wipe down the panels after cooking. This removes grease vapour before it can deposit and harden. For light marks, dampen the cloth with plain water — no cleaning products needed.</p>
<h2>Weekly Deep Clean</h2>
<p>Mix a small amount of mild dish soap with warm water. Apply with a soft microfibre cloth using straight strokes (not circular, which can create micro-scratches on gloss finishes). Rinse with a clean damp cloth, then dry immediately with a separate dry microfibre cloth to prevent water spots.</p>
<h2>Removing Stubborn Grease</h2>
<p>For baked-on grease near the hob, apply a small amount of white vinegar on the cloth and wipe the area. Vinegar is safe for acrylic surfaces and effective against grease without harsh chemicals.</p>
<h2>What to Avoid</h2>
<ul>
<li>Never use abrasive cleaners, scouring pads, or steel wool</li>
<li>Avoid solvent-based cleaners (acetone, bleach, thinners)</li>
<li>Do not use paper towels — the fibres can scratch gloss surfaces</li>
<li>Never spray water directly onto panels — apply to cloth first</li>
</ul>
<h2>Maintaining Matte Panels (ACRYMATTE, ACRYGLASS MATTE)</h2>
<p>Matte panels are even easier to maintain. The same soft cloth and mild soap routine applies, but you don't need to worry about water spots or polish streaks. Simply wipe and dry.</p>`,
    featured_image: placeholderImage(403, 1200, 630, "Cleaning acrylic kitchen panels"),
    date: "2026-01-05",
    author: "Suraj Wood Editorial Team",
    reading_time: 5,
    categories: ["Maintenance", "How-To Guide"],
  },
  {
    id: 4,
    slug: "acrylic-panel-thickness-guide",
    title: "Acrylic Panel Thickness Guide: Which to Choose for Your Kitchen",
    excerpt:
      "1mm, 1.5mm, or 3mm — does acrylic panel thickness matter? We explain the practical differences and help you choose the right specification for your project.",
    content: `<p>All Suraj Wood acrylic panels are available in three thicknesses: 1mm, 1.5mm, and 3mm. The right choice depends on your application, substrate, and project requirements.</p>
<h2>1mm Acrylic Panels</h2>
<p>1mm is the most common specification for residential kitchen shutters and wardrobes. Applied over 18mm MDF, it provides excellent surface quality at the most economical price point. Ideal for projects where cost-efficiency is important without compromising on finish quality.</p>
<h2>1.5mm Acrylic Panels</h2>
<p>The 1.5mm specification is our most popular choice for premium residential and commercial projects. The additional thickness provides a noticeable improvement in surface rigidity and a more luxurious feel when touching or opening cabinet doors. Recommended for high-end modular kitchen projects.</p>
<h2>3mm Acrylic Panels</h2>
<p>3mm panels are specified for demanding commercial applications, high-traffic hospitality interiors, and projects requiring maximum impact resistance. The 3mm acrylic layer is also used for decorative wall cladding and feature panels where structural integrity matters. At this thickness, the panel can be edge-polished for a premium exposed-edge detail.</p>
<h2>Choosing Your Substrate</h2>
<p>All three thicknesses are available on 18mm MDF (standard) or 12mm HDF (for applications requiring lighter weight or higher density). For commercial wall cladding, panels can also be supplied on 6mm or 9mm substrates — please enquire with our sales team.</p>`,
    featured_image: placeholderImage(404, 1200, 630, "Acrylic panel thickness comparison"),
    date: "2025-12-10",
    author: "Suraj Wood Technical Team",
    reading_time: 5,
    categories: ["Technical Guide", "Material Guide"],
  },
  {
    id: 5,
    slug: "modular-kitchen-material-comparison",
    title: "Modular Kitchen Material Comparison: Acrylic vs PU vs Membrane vs Laminate",
    excerpt:
      "A comprehensive comparison of the four dominant modular kitchen finish materials in India — acrylic, PU paint, membrane, and laminate — across durability, cost, aesthetics, and maintenance.",
    content: `<p>Choosing a kitchen finish material in India can feel overwhelming. Each option — acrylic, PU paint, membrane, and laminate — has its advocates and its limitations. This guide gives you the full picture.</p>
<h2>Acrylic Panels (e.g., Suraj Wood ACRYLUX)</h2>
<p><strong>Pros:</strong> Premium surface quality, excellent durability (3H scratch resistance), wide colour range, easy maintenance, UV stable.<br/><strong>Cons:</strong> Higher upfront cost than laminates, fingerprints visible on high-gloss variants.<br/><strong>Best for:</strong> Premium modular kitchens where longevity and aesthetics are top priorities.</p>
<h2>PU (Polyurethane) Paint</h2>
<p><strong>Pros:</strong> Can be colour-matched to any RAL/NCS shade, seamless finish, no visible joins.<br/><strong>Cons:</strong> Expensive, highly skilled application required, difficult to repair if chipped, long curing times.<br/><strong>Best for:</strong> Luxury bespoke kitchens with very specific colour requirements and high budgets.</p>
<h2>Membrane (Foil/PVC)</h2>
<p><strong>Pros:</strong> Budget-friendly, can wrap curves and routed profiles, good colour range.<br/><strong>Cons:</strong> Surface is a thin PVC film that can peel in humid or high-temperature environments, limited durability (typically 3-5 years before showing wear).<br/><strong>Best for:</strong> Budget kitchens or short-term rental properties.</p>
<h2>Laminate (HPL/LPL)</h2>
<p><strong>Pros:</strong> Large pattern and texture range including wood, stone, fabric effects; competitive pricing.<br/><strong>Cons:</strong> Less durable than acrylic, seams and edges visible, printed surface shows wear over time.<br/><strong>Best for:</strong> Mid-range projects, mixed material kitchens, or where specific patterns/textures unavailable in acrylic.</p>
<h2>Verdict</h2>
<p>For premium modular kitchens with a budget above Rs 2 lakh, acrylic panels deliver the best combination of aesthetics, durability, and long-term value. For luxury bespoke work, PU paint offers ultimate customisation. For value projects, laminate remains the practical choice.</p>`,
    featured_image: placeholderImage(405, 1200, 630, "Kitchen material comparison chart"),
    date: "2025-11-22",
    author: "Suraj Wood Editorial Team",
    reading_time: 9,
    categories: ["Material Guide", "Comparison"],
  },
  {
    id: 6,
    slug: "architects-guide-specifying-acrylic-panels",
    title: "Architect's Complete Guide to Specifying Acrylic Panels",
    excerpt:
      "A technical reference for architects and interior designers specifying Suraj Wood acrylic panels — covering material standards, installation details, edge treatments, and sustainability.",
    content: `<p>For architects and interior designers, specifying acrylic panels correctly is critical to project success. This guide covers everything you need to know to write accurate specifications and achieve the best results with Suraj Wood panels.</p>
<h2>Material Specification</h2>
<p>When writing specifications for acrylic panels, use this standard clause:<br/><em>"Acrylic decorative panels: PMMA (Polymethyl Methacrylate) acrylic, minimum 1.5mm thickness, bonded to 18mm E1-grade MDF substrate using PUR hotmelt adhesive. Surface shall achieve minimum 3H pencil hardness per EN ISO 15184. UV stability: Delta E &lt; 2 after 1000 hours UV exposure per EN ISO 4892-2. Fire performance: Class B1 per DIN 4102. Manufacturer's warranty: 5 years against manufacturing defects."</em></p>
<h2>Standard Dimensions</h2>
<p>Standard sheet: 2440mm x 1220mm (8ft x 4ft). Non-standard sizes available on request with minimum order quantities. Allow 10mm tolerance on all cuts.</p>
<h2>Edge Treatment Options</h2>
<p>Three standard edge options: (1) PVC edge band — most common for kitchen shutters; (2) Acrylic edge band — premium seamless look; (3) Polished acrylic edge — for 3mm panels as a design feature. Specify edge band colour to match or contrast panel face.</p>
<h2>Installation Notes</h2>
<p>Panels must be acclimatised to site conditions (minimum 24 hours) before fabrication. Do not store upright — panels must be stored flat. Minimum room temperature during installation: 10°C. Do not expose to direct heat sources; maintain minimum 50mm clearance from cooking hobs.</p>
<h2>Sustainability</h2>
<p>All Suraj Wood panels use E1-grade MDF substrate meeting EN 622 formaldehyde emission standards. PMMA acrylic is fully recyclable. Our manufacturing facility at Bahadurgarh, Haryana operates under ISO 9001 quality management standards.</p>`,
    featured_image: placeholderImage(406, 1200, 630, "Architect specifying acrylic panels"),
    date: "2025-10-30",
    author: "Suraj Wood Technical Team",
    reading_time: 10,
    categories: ["Technical Guide", "For Architects"],
  },
];

// ---------------------------------------------------------------------------
// Mock testimonial data
// ---------------------------------------------------------------------------

const MOCK_TESTIMONIALS: SanityTestimonial[] = [
  {
    id: 1,
    client_name: "Priya Sharma",
    designation: "Principal Interior Designer",
    company: "Studio Priya, Delhi",
    quote:
      "Suraj Wood's ACRYLUX panels are my go-to for premium kitchen projects. The finish quality is unmatched and clients are always impressed. I've been using them exclusively for the past two years and have never had a single complaint.",
    rating: 5,
    project_type: "Luxury Residential Kitchen",
  },
  {
    id: 2,
    client_name: "Rajesh Mehta",
    designation: "Principal Architect",
    company: "RM Associates, Mumbai",
    quote:
      "I've been specifying Suraj Wood panels for three years across residential and commercial projects. Consistent quality, excellent range of colours, and the technical support team is always helpful when I have unusual specification requirements.",
    rating: 5,
    project_type: "Commercial & Residential",
  },
  {
    id: 3,
    client_name: "Anita Patel",
    designation: "Homeowner",
    company: "Bangalore",
    quote:
      "We renovated our entire kitchen with ACRYMATTE panels two years ago and they still look brand new. The anti-fingerprint coating is a genuine lifesaver with two young children in the house. Worth every rupee.",
    rating: 5,
    project_type: "Residential Kitchen Renovation",
  },
  {
    id: 4,
    client_name: "Vikram Singh",
    designation: "Director",
    company: "Singh Interiors, Hyderabad",
    quote:
      "The best acrylic panels made in India, hands down. My high-end clients love the ACRYGLASS finish for statement kitchens. Delivery is on time, quality is consistent sheet to sheet, and the support team is responsive.",
    rating: 5,
    project_type: "High-End Residential",
  },
  {
    id: 5,
    client_name: "Deepa Nair",
    designation: "Senior Interior Designer",
    company: "Nair Design Studio, Chennai",
    quote:
      "What I love about Suraj Wood is the consistency — every sheet is perfect, every time. No warping, no colour variation between batches, no surprises on site. That reliability is everything when you are managing multiple projects simultaneously.",
    rating: 5,
    project_type: "Residential & Commercial",
  },
];

// ---------------------------------------------------------------------------
// Mock FAQ data
// ---------------------------------------------------------------------------

const MOCK_FAQS: SanityFAQ[] = [
  {
    id: 1,
    question: "What are acrylic panels made of?",
    answer:
      "Suraj Wood acrylic panels use PMMA (Polymethyl Methacrylate) acrylic bonded to an MDF or HDF substrate using German PUR hotmelt adhesive. PMMA is the same optical-grade polymer used in high-end automotive tail lights and luxury display cases.",
    category: "general",
  },
  {
    id: 2,
    question: "How do acrylic panels compare to regular laminates?",
    answer:
      "Acrylic panels offer superior scratch resistance (3H vs typical 2H for laminates), deeper colour saturation (solid acrylic vs printed paper), better UV stability, and a more premium tactile quality. Laminates are more budget-friendly but show wear faster.",
    category: "general",
  },
  {
    id: 3,
    question: "Are Suraj Wood panels available across India?",
    answer:
      "Yes. We supply pan-India from our manufacturing facility in Bahadurgarh, Haryana. We have dealer networks in Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Ahmedabad, and other major cities. Contact us at +91-9999995553 to find your nearest dealer.",
    category: "general",
  },
  {
    id: 4,
    question: "What is the warranty on Suraj Wood acrylic panels?",
    answer:
      "All Suraj Wood acrylic panels carry a 5-year manufacturing defect warranty and a 10-year UV stability guarantee. The UV guarantee covers colour stability — Delta E less than 2 after 1000 hours of UV exposure testing per EN ISO 4892-2.",
    category: "general",
  },
  {
    id: 5,
    question: "Do you offer samples?",
    answer:
      "Yes. We offer free sample kits containing swatches of all five product lines in selected colours. Request your sample kit via our website or call +91-9999995553. Sample kits are dispatched within 2-3 business days.",
    category: "general",
  },
  {
    id: 6,
    question: "How do I clean acrylic panels?",
    answer:
      "Wipe with a soft, damp microfibre cloth for daily cleaning. For grease or marks, use mild dish soap diluted in water. Dry immediately after cleaning. Never use abrasive cleaners, scouring pads, acetone, bleach, or solvent-based products.",
    category: "maintenance",
  },
  {
    id: 7,
    question: "Can acrylic panels be used in bathrooms?",
    answer:
      "Yes. Our panels are moisture-resistant thanks to the non-porous PMMA acrylic surface. They perform well in bathrooms with good ventilation. Ensure all cut edges are sealed with appropriate silicone sealant during installation.",
    category: "technical",
  },
  {
    id: 8,
    question: "What is the fire rating of Suraj Wood panels?",
    answer:
      "All Suraj Wood acrylic panels are tested to Class B1 fire rating per DIN 4102. This makes them suitable for use in commercial interiors, hospitality, and any application requiring fire-rated surface materials.",
    category: "technical",
  },
];

// ---------------------------------------------------------------------------
// Mock application data
// ---------------------------------------------------------------------------

const MOCK_APPLICATIONS: SanityApplication[] = [
  {
    id: 1,
    slug: "kitchens",
    name: "Kitchens",
    hero_image: placeholderImage(501, 1440, 900, "Acrylic panel kitchen application"),
    description:
      "Transform your kitchen with premium acrylic panels that combine beauty with everyday practicality. Suraj Wood's kitchen-grade acrylic panels are engineered for India's demanding cooking environments — handling heat, humidity, oil vapour, and daily cleaning without losing their finish.",
    gallery: [
      placeholderImage(601, 800, 600, "Modern acrylic kitchen with ACRYLUX"),
      placeholderImage(602, 800, 600, "High-gloss kitchen with ACRYGLASS"),
      placeholderImage(603, 800, 600, "Matte kitchen with ACRYMATTE"),
      placeholderImage(604, 800, 600, "Two-tone kitchen design"),
    ],
    suitable_products: ["acrylux", "acrysilk", "acrymatte", "acryglass", "acryglass-matte"],
    room_type: "Kitchen",
    design_tips:
      "For Indian kitchens, choose matte or satin finishes for high-use areas near the hob — they hide minor marks better than high-gloss. Use ACRYGLASS for island panels or upper cabinets that see less direct cooking exposure. Two-tone combinations (light upper, dark lower) are the dominant trend in 2026.",
    faq: [
      {
        question: "Which acrylic panel finish is best for Indian cooking kitchens?",
        answer:
          "For kitchens with heavy Indian cooking (high heat, oil splatter), ACRYMATTE or ACRYLUX satin are the practical top choices. Their finishes are easier to clean and show fewer marks than high-gloss. For kitchens with lighter cooking or where aesthetics are paramount, ACRYGLASS creates a stunning statement.",
      },
      {
        question: "How close to a gas hob can acrylic panels be installed?",
        answer:
          "Maintain a minimum 600mm horizontal distance from gas hob burners, and 300mm from electric hobs, for panel shutters. For wall cladding behind hobs, use a glass or tiled backsplash as heat protection — acrylic panels are not recommended directly behind hob cooking surfaces.",
      },
    ],
  },
  {
    id: 2,
    slug: "wardrobes",
    name: "Wardrobes",
    hero_image: placeholderImage(502, 1440, 900, "Acrylic panel wardrobe application"),
    description:
      "Elevate your bedroom storage with acrylic panel wardrobes that maintain their pristine finish for years. Unlike painted wood or laminates that chip and peel, Suraj Wood acrylic panels keep their colour and surface quality through years of daily use.",
    gallery: [
      placeholderImage(611, 800, 600, "Walk-in wardrobe with ACRYLUX"),
      placeholderImage(612, 800, 600, "Sliding wardrobe with ACRYGLASS MATTE"),
      placeholderImage(613, 800, 600, "Wardrobe with ACRYSILK soft-satin"),
      placeholderImage(614, 800, 600, "Built-in wardrobe with ACRYMATTE"),
    ],
    suitable_products: ["acrylux", "acrysilk", "acrymatte", "acryglass", "acryglass-matte"],
    room_type: "Bedroom",
    design_tips:
      "For wardrobe shutters, ACRYSILK soft-satin is an excellent choice — its micro-texture conceals minor marks from everyday door handling while maintaining a premium look. For luxury walk-in wardrobes, ACRYGLASS MATTE delivers a high-end glass aesthetic without the reflective glare of full gloss.",
    faq: [
      {
        question: "Which Suraj Wood product is most popular for bedroom wardrobes?",
        answer:
          "ACRYSILK and ACRYMATTE are the most specified products for bedroom wardrobes. Their soft finishes create a calm, sophisticated bedroom aesthetic and their excellent anti-fingerprint properties keep the doors looking clean despite daily handling.",
      },
      {
        question: "Are acrylic panel wardrobes durable?",
        answer:
          "Extremely durable. The PMMA acrylic surface on all Suraj Wood panels has 3H pencil hardness — harder than the surface of most smartphones. Regular daily use of wardrobe doors will not scratch or dull the surface under normal conditions.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Exported API functions — try Sanity first, fall back to mock data
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<SanityProduct[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<SanityProduct[]>(
        `*[_type == "product"] | order(order asc) { ${productFields} }`
      );
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("[Sanity] getProducts failed, using mock data:", err);
    }
  }
  return MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<SanityProduct | null>(
        `*[_type == "product" && slug.current == $slug][0] { ${productFields} }`,
        { slug }
      );
      if (data) return data;
    } catch (err) {
      console.warn("[Sanity] getProductBySlug failed, using mock data:", err);
    }
  }
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getApplications(): Promise<SanityApplication[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<SanityApplication[]>(
        `*[_type == "application"] | order(_createdAt asc) { ${applicationFields} }`
      );
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("[Sanity] getApplications failed, using mock data:", err);
    }
  }
  return MOCK_APPLICATIONS;
}

export async function getApplicationBySlug(slug: string): Promise<SanityApplication | null> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<SanityApplication | null>(
        `*[_type == "application" && slug.current == $slug][0] { ${applicationFields} }`,
        { slug }
      );
      if (data) return data;
    } catch (err) {
      console.warn("[Sanity] getApplicationBySlug failed, using mock data:", err);
    }
  }
  return MOCK_APPLICATIONS.find((a) => a.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<SanityTestimonial[]>(
        `*[_type == "testimonial"] | order(_createdAt desc) { ${testimonialFields} }`
      );
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("[Sanity] getTestimonials failed, using mock data:", err);
    }
  }
  return MOCK_TESTIMONIALS;
}

export async function getFAQs(productSlug?: string): Promise<SanityFAQ[]> {
  if (sanityClient) {
    try {
      const query = productSlug
        ? `*[_type == "faq" && (linkedProduct->slug.current == $productSlug || !defined(linkedProduct))] | order(_createdAt asc) { ${faqFields} }`
        : `*[_type == "faq"] | order(_createdAt asc) { ${faqFields} }`;
      const data = await sanityClient.fetch<SanityFAQ[]>(query, { productSlug });
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("[Sanity] getFAQs failed, using mock data:", err);
    }
  }

  if (!productSlug) return MOCK_FAQS;
  const product = MOCK_PRODUCTS.find((p) => p.slug === productSlug);
  if (!product) return MOCK_FAQS;
  const productFaqs: SanityFAQ[] = product.faq.map((f, idx) => ({
    id: 1000 + idx,
    question: f.question,
    answer: f.answer,
    category: "product" as const,
    linked_product: productSlug,
  }));
  return [...productFaqs, ...MOCK_FAQS];
}

export async function getPosts(
  page = 1,
  perPage = 6
): Promise<{ posts: SanityPost[]; total: number }> {
  if (sanityClient) {
    try {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const [posts, total] = await Promise.all([
        sanityClient.fetch<SanityPost[]>(
          `*[_type == "blogPost"] | order(publishedAt desc) [$start...$end] { ${postFields} }`,
          { start, end }
        ),
        sanityClient.fetch<number>(`count(*[_type == "blogPost"])`),
      ]);
      if (posts && posts.length > 0) return { posts, total };
    } catch (err) {
      console.warn("[Sanity] getPosts failed, using mock data:", err);
    }
  }
  const start = (page - 1) * perPage;
  return {
    posts: MOCK_POSTS.slice(start, start + perPage),
    total: MOCK_POSTS.length,
  };
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<SanityPost | null>(
        `*[_type == "blogPost" && slug.current == $slug][0] { ${postFields} }`,
        { slug }
      );
      if (data) return data;
    } catch (err) {
      console.warn("[Sanity] getPostBySlug failed, using mock data:", err);
    }
  }
  return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getHomepageData(): Promise<HomepageData> {
  if (sanityClient) {
    try {
      const [products, posts, testimonials] = await Promise.all([
        getProducts(),
        getPosts(1, 3),
        getTestimonials(),
      ]);
      return {
        featured_products: products,
        latest_posts: posts.posts,
        testimonials,
        stats: { years: 15, shades: 50, projects: 10000, cities: 2 },
      };
    } catch (err) {
      console.warn("[Sanity] getHomepageData failed, using mock data:", err);
    }
  }
  return {
    featured_products: MOCK_PRODUCTS,
    latest_posts: MOCK_POSTS.slice(0, 3),
    testimonials: MOCK_TESTIMONIALS,
    stats: { years: 15, shades: 50, projects: 10000, cities: 2 },
  };
}

/** Helper: returns the first 5 products (featured on homepage) */
export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  const products = await getProducts();
  return products.slice(0, 5);
}

// Re-export type aliases for convenience
export type {
  SanityProduct,
  SanityApplication,
  SanityTestimonial,
  SanityFAQ,
  SanityPost,
  HomepageData,
  SanityImage,
};
