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
    finish_type: "high-gloss",
    tagline: "The Original High Gloss Finish",
    description:
      "ACRYLUX is our flagship acrylic panel line featuring a smooth high gloss finish that reflects light beautifully. Perfect for modern Indian kitchens and wardrobes where you want elegance without maintenance headaches.",
    hero_image: placeholderImage(101, 1440, 900, "ACRYLUX high gloss acrylic panel"),
    gallery: [
      placeholderImage(201, 800, 600, "ACRYLUX kitchen application"),
      placeholderImage(202, 800, 600, "ACRYLUX wardrobe application"),
      placeholderImage(203, 800, 600, "ACRYLUX colour palette"),
      placeholderImage(204, 800, 600, "ACRYLUX close-up texture"),
    ],
    ideal_for: ["kitchens", "wardrobes", "commercial", "offices"],
    thickness: "8mm, 18mm, 25mm",
    dimensions: "8ft x 4ft (2440mm x 1220mm) standard sheet",
    material_composition:
      "PMMA (Polymethyl Methacrylate) acrylic laminated to 18mm MDF substrate using German PUR hotmelt adhesive. The acrylic layer is co-extruded for uniform thickness and bonded under controlled pressure and temperature.",
    surface_properties:
      "Smooth, flawless mirror-like high-gloss finish with 3H pencil hardness scratch resistance. UV-stable coating guarantees no yellowing for 10 years. Anti-fingerprint treatment available on select colours.",
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
          "ACRYLUX is made from high-grade PMMA (Polymethyl Methacrylate) acrylic bonded to an MDF substrate using German PUR hotmelt adhesive. This combination gives you the premium surface quality of acrylic with the structural stability of engineered wood.",
      },
      {
        question: "How do I clean and maintain ACRYLUX panels?",
        answer:
          "ACRYLUX requires minimal maintenance. Wipe with a soft damp microfibre cloth for everyday cleaning. For grease or stubborn marks, use a mild dish soap solution. Avoid abrasive cleaners, scouring pads, or solvent-based products that can dull the high-gloss finish.",
      },
      {
        question: "Can ACRYLUX be used in humid areas like bathrooms?",
        answer:
          "Yes. ACRYLUX panels are moisture-resistant thanks to the non-porous acrylic surface. They perform well in kitchens and bathrooms with good ventilation. For areas with constant water exposure (e.g., behind sinks), ensure proper edge-sealing during installation.",
      },
      {
        question: "What thickness should I choose for my kitchen?",
        answer:
          "For kitchen cabinet shutters, 8mm, 18mm, or 25mm ACRYLUX is the standard choice depending on the structural and visual depth required for the design.",
      },
      {
        question: "How is ACRYLUX different from laminate?",
        answer:
          "Unlike laminates, ACRYLUX uses a solid PMMA acrylic layer that gives deeper colour saturation, a luxurious feel, and significantly higher scratch resistance. Laminates are printed paper under a thin resin layer; ACRYLUX is a true acrylic surface. The high-gloss finish also has a depth and clarity that printed laminates cannot replicate.",
      },
      {
        question: "What is the price range of ACRYLUX panels?",
        answer:
          "ACRYLUX is a premium architectural product. Pricing varies based on sheet thickness (8mm, 18mm, 25mm) and your total order volume. For an exact quote tailored to your project requirements, please contact our sales team using the 'Request Quote' form.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Standard solid and metallic colors are typically dispatched within 3-5 business days. Custom orders or large bulk shipments may require 7-10 business days for manufacturing and secure logistics delivery.",
      },
      {
        question: "Is there a minimum order quantity (MOQ)?",
        answer:
          "For standard stock shades, there is no minimum order quantity. You can order as little as one sheet. For custom colors or special sizes, a minimum order may apply. Contact us directly to discuss your specific needs.",
      },
    ],
    seo_title: "ACRYLUX High Gloss Acrylic Panels | Premium Kitchen & Wardrobe Finish | Suraj Wood",
    seo_description:
      "ACRYLUX by Suraj Wood — India's leading high gloss finish acrylic panel. PMMA acrylic on E1 MDF, 37+ colours, 5-year warranty. Ideal for modular kitchens and wardrobes across India.",
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
    thickness: "8mm, 18mm, 25mm",
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
    thickness: "8mm, 18mm, 25mm",
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
    thickness: "8mm, 20mm, 26mm",
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
    thickness: "8mm, 20mm, 26mm",
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
          "Our standard sheet size is 8ft x 4ft (2440mm x 1220mm). For commercial or large-format projects requiring custom sizes, please contact our sales team at sales@surajwood.com or call +91-9009171819.",
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
<p>Acrylic kitchen panels — like Suraj Wood&apos;s <a href="/products/acrylux">ACRYLUX</a>, <a href="/products/acrysilk">ACRYSILK</a>, <a href="/products/acrymatte">ACRYMATTE</a>, <a href="/products/acryglass">ACRYGLASS</a>, and <a href="/products/acryglass-matte">ACRYGLASS MATTE</a> ranges — are made from PMMA (Polymethyl Methacrylate), a high-performance polymer bonded to an MDF substrate. The surface is homogenous acrylic, not a printed film.</p>
<h2>What is Laminate?</h2>
<p>Laminates (HPL or LPL) are decorative paper layers saturated with resin and bonded to a core substrate. High-Pressure Laminates are more durable; Low-Pressure Laminates (membrane/foils) are more economical but less durable.</p>
<h2>Durability Comparison</h2>
<p>Acrylic panels consistently outperform laminates in scratch resistance (3H vs typically 2H), UV stability (10-year guarantee vs 2-5 years typical for laminate), and long-term colour retention. Our German <a href="/about">PUR hotmelt bonding</a> technology ensures zero delamination even in humid coastal climates like Mumbai or Chennai.</p>
<h2>Verdict</h2>
<p>For premium <a href="/applications/kitchens">modular kitchens in India</a>, acrylic is the superior choice for shutters and visible surfaces. Laminates remain a practical option for internal carcass work and budget-constrained projects.</p>`,
    featured_image: { ...placeholderImage(401), url: "/images/gallery/kitchen-1.jpg" },
    date: "2026-04-15",
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
    content: `<p>Indian kitchen design is evolving rapidly. The days of simple white-and-chrome kitchens are behind us; today&apos;s homeowners and designers are reaching for bold statements, thoughtful material combinations, and finishes that hold up to Indian family living.</p>
<h2>Trend 1: Japandi-Inspired Kitchens</h2>
<p>The Japandi aesthetic — a blend of Japanese wabi-sabi minimalism and Scandinavian functionality — is the dominant force in premium Indian interiors in 2026. Muted naturals, warm greys, and organic forms define this look. <a href="/products/acrymatte">ACRYMATTE</a> in Warm Taupe or Olive Matte is the ideal finish.</p>
<h2>Trend 2: Two-Tone Kitchens</h2>
<p>Upper cabinets in a light finish, lower in a darker tone — two-tone kitchens are everywhere. ACRYLUX Arctic White paired with ACRYMATTE Charcoal is a winning combination seen across <a href="/acrylux/kitchens/mumbai">Mumbai</a> and <a href="/acrylux/kitchens/bangalore">Bangalore</a> projects.</p>
<h2>Trend 3: Earthy & Botanical Palettes</h2>
<p>Forest greens, terracotta, and warm ochres reflect a broader move toward nature-inspired palettes. ACRYMATTE Forest Green and Terracotta Matte are among our fastest-growing colour choices in 2026.</p>`,
    featured_image: { ...placeholderImage(402), url: "/images/gallery/kitchen-2.jpg" },
    date: "2026-03-20",
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
    content: `<p>High-gloss acrylic panels like <a href="/products/acryglass">ACRYGLASS</a> are beautiful and durable, but they do require proper maintenance to keep that mirror-like brilliance. With the right technique, maintenance takes under two minutes a day.</p>
<h2>Daily Cleaning</h2>
<p>Use a clean, dry microfibre cloth to wipe down the panels after cooking. This removes grease vapour before it can deposit and harden. For light marks, dampen the cloth with plain water — no cleaning products needed.</p>
<h2>Weekly Deep Clean</h2>
<p>Mix a small amount of mild dish soap with warm water. Apply with a soft microfibre cloth using straight strokes. Rinse with a clean damp cloth, then dry immediately with a separate dry microfibre cloth to prevent water spots.</p>
<h2>Maintaining Matte Panels</h2>
<p>Matte panels like <a href="/products/acrymatte">ACRYMATTE</a> or <a href="/products/acryglass-matte">ACRYGLASS MATTE</a> are even easier to maintain. Their advanced anti-fingerprint nano-coating means you won&apos;t see smudge marks, and simple wiping is enough to keep them pristine.</p>`,
    featured_image: { ...placeholderImage(403), url: "/images/gallery/kitchen-3.jpg" },
    date: "2026-03-05",
    author: "Suraj Wood Editorial Team",
    reading_time: 5,
    categories: ["Maintenance", "How-To Guide"],
  },
  {
    id: 7,
    slug: "eco-friendly-kitchen-materials-india",
    title: "Sustainable Surfaces: Why Acrylic is the Eco-Friendly Choice for 2026",
    excerpt:
      "Explore the environmental benefits of choosing PMMA acrylic panels over traditional PVC foils. From recyclability to indoor air quality, we look at the green side of SurajWood.",
    content: `<p>Sustainability is no longer a luxury; it&apos;s a necessity in Indian interior design. As we move toward 2026, homeowners are looking for materials that are both durable and environmentally responsible.</p>
<h2>PMMA vs PVC</h2>
<p>Unlike standard PVC foils used in membrane kitchens, PMMA (Polymethyl Methacrylate) used in <a href="/products/acrylux">SurajWood panels</a> is a safer, more stable polymer. It does not release harmful VOCs into your home, ensuring better indoor air quality for your family.</p>
<h2>Zero-Waste Manufacturing</h2>
<p>At our <a href="/about">Bahadurgarh facility</a>, we employ precision cutting and lamination processes that minimize material waste. Our E1-grade MDF substrates meet strict international formaldehyde emission standards.</p>
<h2>Longevity as Sustainability</h2>
<p>The greenest material is the one you don&apos;t have to replace. With 3H scratch resistance and 10-year UV stability, our <a href="/products/acrymatte">matte and gloss surfaces</a> are built to last a lifetime, reducing landfill waste.</p>`,
    featured_image: { ...placeholderImage(407), url: "/images/blog/eco-kitchen.jpg" },
    date: "2026-02-15",
    author: "Suraj Wood Editorial Team",
    reading_time: 7,
    categories: ["Sustainability", "Material Guide"],
  },
  {
    id: 8,
    slug: "luxury-wardrobe-ideas-acrylic-finishes",
    title: "Master Bedroom Wardrobe Ideas: Choosing the Right Acrylic Finish",
    excerpt:
      "Transform your bedroom with statement wardrobes. Compare Acrysilk, Acrymatte, and Acryglass Matte to find the perfect finish for your walk-in closet or sliding wardrobe.",
    content: `<p>Your wardrobe is the second largest visual element in your bedroom after the bed. The finish you choose defines the mood of the entire space. For <a href="/applications/wardrobes">premium wardrobes in India</a>, acrylic is the gold standard.</p>
<h2>Acrysilk: The Touch of Elegance</h2>
<p><a href="/products/acrysilk">ACRYSILK</a> offers a unique micro-textured surface that feels like soft silk. It diffuses light beautifully, creating a calm, relaxing atmosphere perfect for master bedrooms.</p>
<h2>Acrymatte: The Modern Statement</h2>
<p>For a clean, minimalist look, <a href="/products/acrymatte">ACRYMATTE</a> in charcoal or navy is unbeatable. Its anti-fingerprint surface is especially useful for handle-less sliding wardrobes that see frequent touch.</p>
<h2>Acryglass Matte: The Depth of Glass</h2>
<p>If you want the depth and clarity of glass without the reflective glare, <a href="/products/acryglass-matte">ACRYGLASS MATTE</a> is the answer. It provides an ultra-premium aesthetic for luxury walk-in closets in high-end projects across <a href="/acrylux/kitchens/bangalore">Bangalore</a> and <a href="/acrylux/kitchens/delhi">Delhi</a>.</p>`,
    featured_image: { ...placeholderImage(408), url: "/images/gallery/wardrobe-1.jpg" },
    date: "2026-02-01",
    author: "Suraj Wood Design Team",
    reading_time: 6,
    categories: ["Bedroom Design", "Wardrobes"],
  },
  {
    id: 9,
    slug: "trending-kitchen-colors-navy-copper-2026",
    title: "Trending Kitchen Colors for 2026: Why Navy and Copper are Leading",
    excerpt:
      "Deep blues and metallic accents are taking over Indian kitchens. See how to pair SurajWood Midnight Navy with Copper Silk for a high-contrast, luxurious look.",
    content: `<p>Color trends in 2026 are moving away from safe neutrals toward high-contrast, soulful palettes. The combination of deep <a href="/products/acrylux">Midnight Navy</a> and metallic <a href="/products/acrylux">Copper Silk</a> has become the signature look for luxury Indian homes.</p>
<h2>Why Navy?</h2>
<p>Navy blue provides a sense of stability and luxury. In a high-gloss <a href="/products/acryglass">ACRYGLASS</a> finish, it adds incredible depth to lower cabinets, making them look like polished jewels.</p>
<h2>The Copper Accent</h2>
<p>Copper accents — whether in handles or as feature wall panels — bring warmth to the cool blue tones. Our <a href="/products/acrylux">Copper Silk satin finish</a> reflects light with a warm, inviting glow that counters the 'industrial' feel of modern kitchens.</p>
<h2>Design Tip</h2>
<p>Use Navy for the main cabinet runs and Copper for the kitchen island or open shelving. This creates a balanced, curated look that feels both trendy and timeless.</p>`,
    featured_image: { ...placeholderImage(409), url: "/images/gallery/kitchen-4.jpg" },
    date: "2026-01-10",
    author: "Suraj Wood Editorial Team",
    reading_time: 5,
    categories: ["Color Trends", "Kitchen Design"],
  },
  {
    id: 10,
    slug: "integrating-aluminum-profiles-with-acrylic-panels",
    title: "The AL-PROFHAN Advantage: Integrating Aluminum Profiles with Acrylic Panels",
    excerpt:
      "Hardware meets surface. Learn how to combine our architectural aluminum profiles with premium acrylic panels for the ultimate modular furniture solution.",
    content: `<p>True luxury lies in the details. While the acrylic panel provides the visual surface, it is the hardware that provides the structural soul. Our <a href="/products/aluminum-profiles">AL-PROFHAN series</a> is designed to integrate seamlessly with all SurajWood surfaces.</p>
<h2>Gola Handles & Acrylic</h2>
<p>The <a href="/products/aluminum-profiles">Ottimo Gola handle</a> system creates a sleek, handle-less look that lets the beauty of <a href="/products/acryglass-matte">ACRYGLASS MATTE</a> or <a href="/products/acrymatte">ACRYMATTE</a> shine without interruption. The anodized finish of the aluminum complements the depth of the acrylic.</p>
<h2>Glass Shutter Profiles</h2>
<p>Combine our <a href="/products/aluminum-profiles">Aerolinea slim-line profiles</a> with glass-grade acrylic for upper cabinets. This creates a light, airy feel in the kitchen while maintaining the durability of a metal frame.</p>
<h2>The Perfect Synergy</h2>
<p>By specifying both <a href="/products/acrylux">SurajWood panels</a> and AL-PROFHAN hardware, architects and designers ensure perfect compatibility in fit, finish, and longevity.</p>`,
    featured_image: { ...placeholderImage(410), url: "/images/products/aluminum/ottimo.png" },
    date: "2025-12-20",
    author: "Suraj Wood Technical Team",
    reading_time: 8,
    categories: ["Hardware", "Technical Guide"],
  },
  {
    id: 11,
    slug: "pur-bonding-vs-manual-lamination-science",
    title: "PUR Bonding vs Manual Lamination: Why SurajWood Never Peels",
    excerpt:
      "Discover the science behind our zero-delamination guarantee. We compare German PUR hotmelt technology with traditional contact adhesives used in India.",
    content: `<p>The most common failure in modular furniture is delamination — where the surface peels away from the board. This usually happens because of moisture, heat, or poor adhesive quality. At SurajWood, we have solved this through science.</p>
<h2>The German PUR Edge</h2>
<p>Unlike traditional 'white glue' or contact adhesives used in local workshops, we use <strong className="text-navy">German PUR (Polyurethane) Hotmelt</strong> at our <a href="/about">Bahadurgarh factory</a>. This is a moisture-curing adhesive that creates a permanent chemical bond between the acrylic and the MDF.</p>
<h2>Heat & Humidity Resistance</h2>
<p>Once cured, PUR adhesive does not re-melt. This means even if your kitchen reaches 45&deg;C+ in a North Indian summer, or faces 90% humidity in Mumbai, the bond remains absolute. This is why we can offer a <a href="/products/acrylux">5-year zero-delamination guarantee</a>.</p>
<h2>Flat-Lamination Precision</h2>
<p>Our automated lines apply pressure and temperature with micron-level accuracy, ensuring a mirror-smooth surface without the 'orange peel' effect common in manual lamination.</p>`,
    featured_image: { ...placeholderImage(411), url: "/images/about/palex.jpg" },
    date: "2025-12-05",
    author: "Suraj Wood Technical Team",
    reading_time: 9,
    categories: ["Manufacturing", "Technical Guide"],
  },
  {
    id: 12,
    slug: "anti-fingerprint-matte-acrylic-technology",
    title: "The Science of Clean: How Anti-Fingerprint Nano-Coating Works",
    excerpt:
      "Struggling with smudges on your matte kitchen? Learn how our ACRYMATTE nano-coating technology repels oils and keeps your surfaces looking pristine.",
    content: `<p>Matte finishes are beautiful, but they have historically been magnets for fingerprints. Our <a href="/products/acrymatte">ACRYMATTE</a> series changes that through advanced surface engineering.</p>
<h2>Hydrophobic & Oleophobic Properties</h2>
<p>The secret lies in a nano-thin layer applied during the manufacturing of our <a href="/products/acrylux">acrylic sheets</a>. This coating is both hydrophobic (water-repelling) and oleophobic (oil-repelling). When you touch the surface, the natural oils from your skin cannot 'wet' the acrylic, meaning no visible smudge is left behind.</p>
<h2>Low Light Reflectivity</h2>
<p>Because <a href="/products/acryglass-matte">ACRYGLASS MATTE</a> and ACRYMATTE have zero light reflection, the tiny amount of oil that might transfer is not highlighted by glare, further enhancing the 'clean' look.</p>
<h2>Practical Benefits</h2>
<p>In a busy Indian kitchen where turmeric, oil, and spices are frequently handled, this technology reduces cleaning time by up to 70%. A simple wipe with a dry microfibre cloth is usually all that is needed to maintain that pure matte perfection.</p>`,
    featured_image: { ...placeholderImage(412), url: "/images/gallery/kitchen-4.jpg" },
    date: "2025-11-20",
    author: "Suraj Wood Technical Team",
    reading_time: 6,
    categories: ["Technology", "Maintenance"],
  },
  {
    id: 13,
    slug: "acrylic-panels-for-commercial-offices",
    title: "Elevating Office Interiors: Why Acrylic is the Corporate Choice",
    excerpt:
      "From reception desks to wall cladding, discover how premium acrylic panels create a professional, high-impact environment for modern Indian offices.",
    content: `<p>First impressions matter in business. The reception area is where your brand's story begins. For <a href="/applications/offices">modern office interiors in India</a>, the material choice is critical.</p>
<h2>High-Impact Reception Desks</h2>
<p>A reception counter finished in <a href="/products/acryglass">ACRYGLASS Piano Black</a> or Royal Red creates instant drama and authority. The mirror-like finish reflects the professionalism of your company.</p>
<h2>Durable Wall Cladding</h2>
<p>In high-traffic hallways and lift lobbies, <a href="/products/acrylux">ACRYLUX panels</a> provide a durable alternative to paint or wallpaper. They are easy to clean, impact-resistant, and maintain their color depth for decades.</p>
<h2>Minimalist Conference Rooms</h2>
<p>For conference room storage and credenzas, <a href="/products/acrymatte">ACRYMATTE</a> provides a non-reflective, sophisticated backdrop that doesn't distract during presentations. It pairs beautifully with our <a href="/products/aluminum-profiles">aluminum profiles</a> for a truly architectural feel.</p>`,
    featured_image: { ...placeholderImage(413), url: "/images/gallery/office-1.jpg" },
    date: "2025-11-05",
    author: "Suraj Wood Design Team",
    reading_time: 7,
    categories: ["Commercial Design", "Offices"],
  },
  {
    id: 14,
    slug: "choosing-acrylic-panel-thickness-guide",
    title: "1mm, 1.5mm, or 3mm? Choosing the Right Acrylic Thickness",
    excerpt:
      "Not all acrylic panels are created equal. We guide you through the technical differences and ideal applications for various thicknesses in modular furniture.",
    content: `<p>A common question from architects and homeowners is: 'Which thickness do I need?' While the finish might look the same, the thickness of the <a href="/products/acrylux">acrylic layer</a> determines its structural performance.</p>
<h2>1mm: The Standard Choice</h2>
<p>For most residential kitchen cabinet shutters and wardrobes, 1mm acrylic laminated to 18mm MDF is the standard. It provides excellent color depth and sufficient scratch resistance for daily home use.</p>
<h2>1.5mm: The Professional Grade</h2>
<p>For larger shutters or high-use areas, 1.5mm offers better rigidity. It further reduces the 'telegraphing' effect (where the grain of the substrate might show through), resulting in a flatter, more premium surface.</p>
<h2>3mm: The High-Traffic Powerhouse</h2>
<p>In <a href="/applications/commercial">commercial applications</a>, retail counters, or wall cladding, 3mm acrylic is recommended. It is significantly more impact-resistant and provides a solid, 'built-to-last' feel that lighter sheets cannot match.</p>
<p>All SurajWood thicknesses feature the same <a href="/about">PUR-bonded technology</a> and UV stability guarantees.</p>`,
    featured_image: { ...placeholderImage(414), url: "/images/gallery/wardrobe-3.jpg" },
    date: "2025-10-15",
    author: "Suraj Wood Technical Team",
    reading_time: 5,
    categories: ["Technical Guide", "Material Science"],
  },
  {
    id: 15,
    slug: "living-room-feature-walls-acrylic-panels",
    title: "TV Units & Feature Walls: Design Ideas Using Acrylic Panels",
    excerpt:
      "The living room is the heart of the home. See how to use Acryglass and Acrymatte to create stunning, maintenance-free feature walls and entertainment units.",
    content: `<p>The TV unit has evolved from a simple stand to a full-height architectural feature. For <a href="/applications/wall-paneling">modern Indian living rooms</a>, acrylic panels offer a level of finish that paint or stone cannot match.</p>
<h2>Dramatic High-Gloss Backgrounds</h2>
<p>Using <a href="/products/acryglass">ACRYGLASS</a> as a backdrop for your TV creates a 'theatre' effect. The deep colors and mirror-finish reflect the ambient lighting, making the entertainment area the focal point of the room.</p>
<h2>Layering Textures</h2>
<p>Pair <a href="/products/acrymatte">ACRYMATTE</a> wall panels with stone or wood accents for a sophisticated, layered look. The matte surface provides a quiet elegance that allows other textures to pop.</p>
<h2>Maintenance-Free Luxury</h2>
<p>Unlike stone which may require sealing, or paint which stains easily, SurajWood panels are wipe-clean. This is especially important in living rooms where children and guests frequently interact with the furniture.</p>`,
    featured_image: { ...placeholderImage(415), url: "/images/gallery/tv-unit-1.jpg" },
    date: "2025-09-30",
    author: "Suraj Wood Design Team",
    reading_time: 6,
    categories: ["Living Room", "Design Ideas"],
  },
  {
    id: 16,
    slug: "surajwood-manufacturing-bahadurgarh-quality",
    title: "Behind the Brand: Our Bahadurgarh Manufacturing Excellence",
    excerpt:
      "Take a virtual tour of our state-of-the-art facility in Haryana. Learn how we maintain E1 emission standards and precision quality in every sheet.",
    content: `<p>Quality isn't accidental; it's engineered. At the heart of SurajWood is our <a href="/about">manufacturing facility in Bahadurgarh, Haryana</a>, where technology meets craftsmanship.</p>
<h2>E1-Grade MDF Standards</h2>
<p>We believe luxury should be healthy. We exclusively use E1-grade MDF substrates that meet strict international standards for low formaldehyde emissions, ensuring your home's air remains safe for children and seniors.</p>
<h2>Dust-Free Lamination Environment</h2>
<p>Even a single speck of dust can ruin a high-gloss <a href="/products/acryglass">ACRYGLASS</a> panel. Our lamination lines operate in positive-pressure, filtered environments to ensure a flawless finish every time.</p>
<h2>Zero-Tolerance Quality Control</h2>
<p>Every sheet of <a href="/products/acrylux">ACRYLUX</a> or <a href="/products/acrymatte">ACRYMATTE</a> undergoes an 8-point inspection before it leaves our factory. We check for color consistency, bond strength, and surface flatness to ensure you receive nothing but perfection.</p>`,
    featured_image: { ...placeholderImage(416), url: "/images/about/about-bg.jpg" },
    date: "2025-09-10",
    author: "Suraj Wood Manufacturing Team",
    reading_time: 8,
    categories: ["Manufacturing", "Brand Story"],
  },
  {
    id: 17,
    slug: "acrylic-vs-laminate-vs-pu-vs-glass-kitchen-guide",
    title: "Acrylic vs Laminate vs PU vs Glass: Ultimate Kitchen Material Guide",
    excerpt:
      "Planning a premium modular kitchen in India? We compare PMMA Acrylic, HPL Laminates, PU Painted shutters, and Glass profiles across durability, maintenance, and costs.",
    content: `<p>Choosing the right surfacing material for modular kitchen shutters is the most critical decision when planning a new home. In this comprehensive guide, we compare the four leading choices in the Indian market: prelaminated PMMA acrylic panels, standard laminates, PU painted shutters, and glass profiles.</p>
<h2>1. PMMA Acrylic (The Premium Standard)</h2>
<p>PMMA acrylic panels (like SurajWood <a href="/products/acrylux">ACRYLUX</a>) offer the ultimate combination of high reflectivity (95%), 3H scratch resistance, and waterproof edge lamination. With German PUR hotmelt adhesive, these boards are guaranteed against delamination or swelling caused by steam and humidity.</p>
<h2>2. High-Pressure Laminates (The Economy Choice)</h2>
<p>Laminates (often referred to as sunmica or mica sheets) are highly economical but lack the deep gloss or velvet matte depth of true acrylic. Manually-pasted laminates often bubble or peel around edges under intense cooking heat.</p>
<h2>3. PU Painted Shutters (The Seamless Finish)</h2>
<p>PU (Polyurethane) painted surfaces offer a seamless, handle-less profile look but are extremely fragile. They chip easily under utensils contact and require expensive full resprays when stained by oil or turmeric.</p>
<h2>4. Glass Shutters (The High-End Glass Vibe)</h2>
<p>Glass shutters are stunning but heavy and prone to shattering. SurajWood <a href="/products/acryglass-matte">ACRYGLASS MATTE</a> offers the sophisticated velvet depth of glass with a lightweight, highly durable polymer layer that never shatters.</p>`,
    featured_image: { ...placeholderImage(417), url: "/images/gallery/kitchen-1.jpg" },
    date: "2026-05-18",
    author: "Suraj Wood Design Desk",
    reading_time: 10,
    categories: ["Material Guide", "Kitchen Design"],
  },
  {
    id: 18,
    slug: "modular-kitchen-cost-breakdown-india-guide",
    title: "Modular Kitchen Cost Breakdown: Material-by-Material Guide for Indian Apartments",
    excerpt:
      "Struggling to budget your kitchen renovation? We analyze the square foot costs of cabinet carcasses, premium PMMA shutters, and Gola profiles to reveal actual modular costs.",
    content: `<p>Understanding modular kitchen pricing in India can be overwhelming. The final cost of your kitchen depends on two major factors: the internal carcass material (Plywood vs Particle Board) and the visible cabinet shutter finish (Acrylic vs Laminate vs PU paint).</p>
<h2>1. Shutter Material Cost Analysis (Per Sq Ft)</h2>
<ul>
  <li><strong>Premium PMMA Acrylic:</strong> INR 850 - INR 2,200 per sq ft. Highly durable, 100% factory edge-banded, and buff-repairable.</li>
  <li><strong>PU Painted Shutters:</strong> INR 1,200 - INR 2,500 per sq ft. Premium and seamless but easily chipped.</li>
  <li><strong>HPL Laminate Sheets:</strong> INR 450 - INR 950 per sq ft. Budget-friendly but prone to edge failure.</li>
</ul>
<h2>2. The True Carcass Investment</h2>
<p>Always specify Boiling Water Resistant (BWR) plywood or high-density calibrated MDF for internal cabinets. Never compromise on the carcass material to save costs, as it forms the structural backbone of your counters.</p>
<h2>3. Fabrication & Installation Cost Savings</h2>
<p>While local carpenter pasting seems cheaper upfront, factory prelaminated PMMA acrylic panels (like SurajWood ACRYMATTE) are carpenter-friendly, require no on-site manual pasting labor, and reduce assembly times by 60%.</p>`,
    featured_image: { ...placeholderImage(418), url: "/images/gallery/kitchen-2.jpg" },
    date: "2026-05-10",
    author: "Suraj Wood Finance Desk",
    reading_time: 8,
    categories: ["Finance", "Kitchen Design"],
  },
  {
    id: 19,
    slug: "petg-vs-pmma-acrylic-optical-grade-guide",
    title: "PETG vs PMMA Acrylic: Why Optical Grade Matters for Modern Surfaces",
    excerpt:
      "What is the difference between PETG boards and optical-grade PMMA panels? We break down the chemical differences, UV stability, and repair parameters.",
    content: `<p>In premium interior design, two polymer finishes dominate: PETG (Polyethylene Chronology Glycol) and PMMA (Polymethyl Methacrylate) acrylic. While both offer glossy and matte options, they are chemically and structurally very different.</p>
<h2>1. Chemical Composition & Optical Depth</h2>
<p>PMMA acrylic (used in SurajWood <a href="/products/acrylux">ACRYLUX</a>) is an optical-grade polymer with unmatched light transmission (92%). This gives high-gloss cabinets a deep, mirror-like clarity. PETG is a modified polyester plastic that has a slightly lower light reflectivity and can showcase a mild 'orange peel' waviness under close light.</p>
<h2>2. UV Resistance & Yellowing</h2>
<p>PMMA has inherently superior UV resistance. SurajWood offers a 10-year UV stability guarantee, ensuring that pristine white shutters stay perfectly white. PETG is more prone to organic degradation and will show mild yellowing or dullness within 3-5 years of high daylight exposure.</p>
<h2>3. Surface Hardness & Repairability</h2>
<p>All SurajWood PMMA sheets undergo a hardening process to reach <strong>3H pencil scratch hardness</strong>. Cheaper PETG sheets typically have a 2H hardness, making them more prone to daily scuffs. Crucially, PMMA is <strong>buff-repairable</strong>, allowing micro-scratches to be easily buffed out using standard polishing compounds.</p>`,
    featured_image: { ...placeholderImage(419), url: "/images/gallery/kitchen-3.jpg" },
    date: "2026-05-01",
    author: "Suraj Wood Chemical Desk",
    reading_time: 9,
    categories: ["Material Science", "Technology"],
  },
  {
    id: 20,
    slug: "royale-touche-vs-surajwood-acrylux-honest-comparison",
    title: "Royale Touche Acrylic vs SurajWood ACRYLUX: An Honest Comparison",
    excerpt:
      "Choosing a premium surface brand? We compare Royale Touche decorative laminates with SurajWood's specialized factory prelaminated PMMA acrylic panels.",
    content: `<p>Royale Touche is a well-established household name in the Indian decorative surfaces market, famous for their high-pressure paper laminates. However, when it comes to true PMMA acrylic panels pre-laminated at a factory level, SurajWood's specialized range offers significant advantages.</p>
<h2>1. Factory Prelamination vs Local Pasting</h2>
<p>Royale Touche primarily sells loose laminate and acrylic sheets that must be manually glued onto wood boards at the customer's site. This manual process is prone to bubbles, edge warping, and dust entrapment. SurajWood exclusively manufactures <strong>factory prelaminated panels</strong> under positive-pressure cleanroom conditions using German PUR hotmelt, ensuring a 100% flat surface.</p>
<h2>2. Product Focus & Specialization</h2>
<p>While Royale Touche has a massive catalog spanning hundreds of decorative papers, stone, and crystal textures, SurajWood specializes intensely in <strong>German PUR-bonded PMMA acrylic surfaces</strong> (ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS). This tight technological focus allows us to maintain strict ±0.1mm tolerances and deliver superior scratch performance.</p>
<h2>3. Cost-to-Value Ratio</h2>
<p>By purchasing factory-direct prelaminated panels from SurajWood's Bahadurgarh facility, architects and project managers eliminate local pasting labor costs, cut down assembly times, and receive a direct 5-year zero-delamination warranty.</p>`,
    featured_image: { ...placeholderImage(420), url: "/images/gallery/kitchen-4.jpg" },
    date: "2026-04-20",
    author: "Suraj Wood Commercial Desk",
    reading_time: 7,
    categories: ["Brand Comparison", "Material Guide"],
  },
  {
    id: 21,
    slug: "top-10-acrylic-panel-brands-india-2026",
    title: "Top 10 Acrylic Panel Brands in India (2026 Edition)",
    excerpt:
      "A curated review of India's leading prelaminated acrylic panel brands, evaluating substrate quality, scratch resistance, PUR adhesion, and swatch colors.",
    content: `<p>Surfacing quality determines the longevity of luxury homes. In this comprehensive review, we evaluate the top ten premium prelaminated acrylic panel brands in India in 2026, comparing technical features, substrate standards, and warranties.</p>
<h2>1. SurajWood (ACRYLUX & ACRYMATTE)</h2>
<p>SurajWood leads the specialized PMMA market, utilizing German PUR lamination, optical-grade PMMA polymers, and E1-grade low-emission MDF substrates. Backed by a 5-year delamination warranty and 10-year UV color fastness, it is the premier specification for leading architects across Delhi, Mumbai, and Bangalore.</p>
<h2>2. Nivesa & Opulux</h2>
<p>Well-regarded mid-range brands offering various PETG and standard gloss finishes. While highly cost-competitive, they utilize lower surface hardness layers compared to SurajWood's 3H PMMA acrylic.</p>
<h2>3. Euro Pratik & REHAU</h2>
<p>Strong global brands with premium pricing. They offer excellent technical quality but typically have longer delivery times for customized sizes and lower cost-to-value ratios for large scale projects.</p>
<h2>4. Action TESA & Greenlam</h2>
<p>Massive board conglomerates that cover standard particle and pre-laminated boards. While having a vast national presence, their specialized acrylic high-gloss sheens are less specialized than SurajWood's dedicated PMMA lines.</p>`,
    featured_image: { ...placeholderImage(421), url: "/images/gallery/wardrobe-1.jpg" },
    date: "2026-04-10",
    author: "Suraj Wood Architectural Panel Review",
    reading_time: 11,
    categories: ["Architectural Review", "Material Guide"],
  },
  {
    id: 22,
    slug: "50-modern-modular-kitchen-design-ideas",
    title: "50 Modern Modular Kitchen Design Ideas with Acrylic",
    excerpt: "Get inspired by 50 breathtaking modern kitchen designs utilizing ACRYLUX and ACRYGLASS sheens. From minimalist open concepts to palatial villa setups.",
    content: `<p>A modular kitchen is the centerpiece of the modern Indian home. In this comprehensive showcase, we compile 50 outstanding kitchen design concepts that utilize premium factory-laminated PMMA acrylic panels to deliver absolute visual clarity and lifetime durability.</p>
<h2>1. Minimalist Monochromes</h2>
<p>Clean lines and flat runs. Pairing pure high-gloss white upper cabinets with deep matte charcoal lower doors creates a timeless monochrome environment that is easy to clean daily.</p>
<h2>2. Bold Botanical Palettes</h2>
<p>Greens and sage tones are highly trending in 2026. ACRYMATTE Sage Green paired with warm oak wood structures brings a fresh, organic kitchen vibe.</p>
<h2>3. Metallic & Copper Accents</h2>
<p>Incorporate Gola profiles in anodized copper or gold to complement high-gloss Midnight Navy panel runs, adding a touch of palatial luxury.</p>`,
    featured_image: { ...placeholderImage(422), url: "/images/gallery/kitchen-1.jpg" },
    date: "2026-04-05",
    author: "Suraj Wood Design Desk",
    reading_time: 8,
    categories: ["Kitchen Design", "Inspiration"],
  },
  {
    id: 23,
    slug: "l-shape-kitchen-design-ideas-indian-apartments",
    title: "L-Shape Kitchen Design Ideas for Indian Apartments",
    excerpt: "Maximize corner space and workflow efficiency in rectangular apartment kitchens. Optimize corner pullouts and vertical pantry setups.",
    content: `<p>Indian apartments often feature rectangular layouts where the L-shape modular kitchen is the most efficient configuration. It utilizes two adjoining walls, leaving the third wall completely free for dining tables or refrigerator placement.</p>
<h2>1. The Work Triangle Principle</h2>
<p>Ergonomics is key. An L-shape layout naturally separates your sink, cooking hob, and refrigerator into a highly functional triangle, minimizing walking steps during intensive meal prep.</p>
<h2>2. Corner Storage Solutions</h2>
<p>Don't waste deep corner cabinets. Modern hardware like magic corners, LeMans corners, or carousel drawers slide out fully, making corner storage highly accessible.</p>
<h2>3. Brightening Narrow Corridors</h2>
<p>Narrow apartments can feel dark. Specifying high-gloss ACRYLUX Arctic White for all shutters reflects natural window light, making the entire apartment corridor feel wider.</p>`,
    featured_image: { ...placeholderImage(423), url: "/images/gallery/kitchen-2.jpg" },
    date: "2026-04-02",
    author: "Suraj Wood Design Desk",
    reading_time: 6,
    categories: ["Kitchen Design", "Apartment Living"],
  },
  {
    id: 24,
    slug: "white-kitchen-cabinets-high-gloss-acrylic",
    title: "White Kitchen Cabinets: Design Ideas with High Gloss Acrylic",
    excerpt: "Discover why pristine white kitchens stay perfectly white with SurajWood's 10-year UV anti-yellowing PMMA acrylic coating.",
    content: `<p>A high-gloss white modular kitchen is the ultimate design statement. It represents absolute cleanliness, spaciousness, and modern architectural elegance. However, Indian homeowners often worry about grease staining and discolouration over time.</p>
<h2>1. Why Cheap PVC and Laminates Turn Yellow</h2>
<p>Standard PVC foil or paper laminates contain organic structures that degrade rapidly under direct sunlight and UV exposure, turning yellowish-brown within 2-3 years. SurajWood uses inorganic PMMA polymer panels tested to EN standards, guaranteeing 10+ years of color fastness.</p>
<h2>2. Tackling Turmeric & Spill Stains</h2>
<p>Indian cooking involves heavy turmeric and oil vapours. Because PMMA acrylic is a non-porous material, spills cannot penetrate the surface and can be wiped clean with standard soapy water without leaving stains.</p>
<h2>3. Styling with Contrast</h2>
<p>Pair high-gloss white upper shutters with matte walnut or dark grey lower cabinets to anchor the design beautifully and add warm visual interest.</p>`,
    featured_image: { ...placeholderImage(424), url: "/images/gallery/kitchen-3.jpg" },
    date: "2026-03-28",
    author: "Suraj Wood Material Desk",
    reading_time: 7,
    categories: ["Kitchen Design", "Color Selection"],
  },
  {
    id: 25,
    slug: "small-kitchen-design-ideas-2bhk-apartments",
    title: "Small Kitchen Design Ideas for 2BHK Apartments",
    excerpt: "Smart space hacks, handle-less profile options, and bright reflective panels that make small kitchens look double their size.",
    content: `<p>A 2BHK apartment modular kitchen typically measures between 60 to 90 square feet. Designing for this compact footprint requires utilizing every vertical inch while maintaining an uncluttered, spacious aesthetic.</p>
<h2>1. Floor-to-Ceiling Loft Cabinets</h2>
<p>Maximize vertical storage by extending cabinets all the way to the ceiling. Use lofts to store seasonal items that are used less frequently, keeping the main counters clean.</p>
<h2>2. Handle-less Profile Rails</h2>
<p>Protruding cabinet handles reduce walking space and create visual clutter. Integrating Gola profile handle rails creates a sleek, continuous run that is highly comfortable in narrow spaces.</p>
<h2>3. High-Gloss daylight sharing</h2>
<p>Reflecting light is a powerful optical trick. Bouncing light from high-reflectivity ACRYGLASS shutters expands the visual boundary of the room, making a small compact kitchen feel double its actual size.</p>`,
    featured_image: { ...placeholderImage(425), url: "/images/gallery/kitchen-new-1.png" },
    date: "2026-03-24",
    author: "Suraj Wood Apartment Desk",
    reading_time: 6,
    categories: ["Apartment Living", "Kitchen Design"],
  },
  {
    id: 26,
    slug: "color-combinations-for-kitchen-cabinets-2026",
    title: "Color Combinations for Kitchen Cabinets 2026",
    excerpt: "Evaluate trending modular kitchen color duos for 2026, pairing rich solids, metallics, and organic wood textures.",
    content: `<p>Monochromatic kitchens are giving way to high-contrast, double-tone palettes that reflect the homeowner&apos;s personality. Curate cohesive modular combinations engineered for Indian lighting.</p>
<h2>1. Midnight Navy & Champagne Gold</h2>
<p>The definitive luxury combination of 2026. Deep high-gloss blue under-counter drawers anchored by soft golden-metallic upper cabinet shutters, highlighted by concealed warm lighting.</p>
<h2>2. Forest Green & Natural Oak</h2>
<p>A serene, organic Japandi-inspired palette. Matte Forest Green nano-matte panels paired with light oak textures create a highly soothing environment that feels close to nature.</p>
<h2>3. Charcoal Matte & Brushed Silver</h2>
<p>For a sleek, high-tech industrial aesthetic. Pair nano-coated ACRYMATTE Charcoal doors with brushed silver aluminum profile frames to create a highly functional, chef-like kitchen.</p>`,
    featured_image: { ...placeholderImage(426), url: "/images/gallery/kitchen-new-2.jpg" },
    date: "2026-03-20",
    author: "Suraj Wood Color Team",
    reading_time: 8,
    categories: ["Color Selection", "Inspiration"],
  },
  {
    id: 27,
    slug: "two-tone-kitchen-design-ideas-acrylic-panels",
    title: "Two-Tone Kitchen Design Ideas with Acrylic Panels",
    excerpt: "Learn how to pair dark lower counters with bright upper cupboards to keep your kitchen visually balanced and highly spacious.",
    content: `<p>A two-tone kitchen uses two contrasting colors or textures on different cabinet runs. This design technique is highly popular in modern homes, allowing you to anchor the base units while keeping the overhead space light and airy.</p>
<h2>1. Anchoring the Base Units</h2>
<p>Lower base cabinets are subject to high physical impact, spice spills, and floor cleaning scuffs. Using dark matte shades (like ACRYMATTE Charcoal or Midnight Navy) hides these scuffs perfectly, keeping the base visually grounded.</p>
<h2>2. Floating the Upper Cupboards</h2>
<p>Using light sheens (like ACRYLUX Snow White or Ivory) for the wall-mounted cupboards ensures that the overhead space remains bright, open, and spacious without visually crowding the room.</p>
<h2>3. Seamless Intermediate Backsplash</h2>
<p>Ensure the transition backsplash is kept minimal (white tiles or clear glass) to let the two contrasting acrylic finishes pop without clash.</p>`,
    featured_image: { ...placeholderImage(427), url: "/images/gallery/kitchen-new-3.jpg" },
    date: "2026-03-15",
    author: "Suraj Wood Design Desk",
    reading_time: 7,
    categories: ["Kitchen Design", "Color Selection"],
  },
  {
    id: 28,
    slug: "wardrobe-design-ideas-acrylic-shutters",
    title: "Wardrobe Design Ideas with Acrylic Shutters",
    excerpt: "Upgrade bedroom storage with premium PMMA wardrobe shutters. Compare high-gloss, soft-satin, and anti-fingerprint sheens.",
    content: `<p>Your wardrobe is the second largest visual element in your bedroom. Specifying premium prelaminated acrylic shutters gives bedroom wardrobes a flawless, flat boutique look that lasts three times longer than manual laminates.</p>
<h2>1. Height & Flatness Alignment</h2>
<p>Tall floor-to-ceiling sliding closet doors demand perfect substrate flatness to prevent bowing or warping. SurajWood factory-bonded E1 MDF core boards are calibrated under direct pressure to remain perfectly straight.</p>
<h2>2. Soft-Satin vs. High-Gloss</h2>
<p>For master bedrooms, ACRYLUX or ACRYSILK soft-satin finishes diffuse night lighting softly, creating a relaxing feel. For small guest bedrooms, high-gloss ACRYGLASS reflects daylight, making rooms feel larger.</p>
<h2>3. Integrated Loft Layouts</h2>
<p>Carry the acrylic finish all the way into the lofts. Using consistent profile handles across lofts keeps the closet run visually seamless and modern.</p>`,
    featured_image: { ...placeholderImage(428), url: "/images/gallery/wardrobe-2.jpg" },
    date: "2026-03-10",
    author: "Suraj Wood Closet Team",
    reading_time: 7,
    categories: ["Bedroom Design", "Wardrobes"],
  },
  {
    id: 29,
    slug: "walk-in-wardrobe-design-guide-indian-homes",
    title: "Walk-in Wardrobe Design Guide for Indian Homes",
    excerpt: "Plan a premium boutique dressing room experience with custom island drawers, LED strip lighting, and soft-satin finishes.",
    content: `<p>A walk-in closet is the ultimate boutique dressing experience. Designing a premium walk-in wardrobe in Indian homes requires balancing smart compartmentalization with luxurious, tactile material finishes.</p>
<h2>1. The Dressing Island Counter</h2>
<p>A central island dresser is the perfect visual anchor. Specifying ACRYGLASS MATTE for island drawers provides a beautiful glass-like depth that resists fingerprints during accessory handling.</p>
<h2>2. Concealed LED Strip Channels</h2>
<p>Integrate golden aluminum profiles into the cabinet carcass. This allows for concealed warm LED strip lights that highlight your clothing collection without direct eye glare.</p>
<h2>3. Dust Protection & Cleanliness</h2>
<p>Walk-in rooms must stay clean. SurajWood nano-coated ACRYMATTE doors have built-in anti-static properties that repel room dust, reducing cleaning efforts by 60%.</p>`,
    featured_image: { ...placeholderImage(429), url: "/images/gallery/wardrobe-3.jpg" },
    date: "2026-03-05",
    author: "Suraj Wood Design Desk",
    reading_time: 8,
    categories: ["Bedroom Design", "Wardrobes"],
  },
  {
    id: 30,
    slug: "tv-unit-design-ideas-acrylic-panels",
    title: "TV Unit Design Ideas with Acrylic Panels",
    excerpt: "Evaluate statement high-gloss TV backdrops and dust-repellent matte media consoles designed for modern drawing rooms.",
    content: `<p>Modern TV units have evolved from basic tables to full-height media walls. Creating a stunning entertainment zone requires selecting finishes that complement high-end screens and coordinate with your room lighting.</p>
<h2>1. The High-Contrast Media Wall Backdrop</h2>
<p>Using mirror-gloss ACRYGLASS Piano Black as a backdrop console creates a continuous glass frame. When the television screen is turned off, it blends in beautifully, eliminating the ugly &quot;black box&quot; effect.</p>
<h2>2. Floating Dust-Repellent Consoles</h2>
<p>Use floating lower storage drawers in ACRYMATTE Charcoal. This keeps the floor corridor clean, and the anti-static polymer skin repels electronic static dust, keeping the media area spotless.</p>
<h2>3. Grooved Profile Routing</h2>
<p>Carve precise geometric vertical lines into the wood backing panel on CNC machines. SurajWood core E1 MDF routes cleanly without chipping the front acrylic skin.</p>`,
    featured_image: { ...placeholderImage(430), url: "/images/gallery/tv-unit-1.jpg" },
    date: "2026-03-01",
    author: "Suraj Wood Design Desk",
    reading_time: 6,
    categories: ["Living Room", "Inspiration"],
  },
  {
    id: 31,
    slug: "bathroom-vanity-design-ideas-waterproof",
    title: "Bathroom Vanity Design Ideas: Waterproof Acrylic Panels",
    excerpt: "Design beautiful under-sink storage drawers and floating vanity units with German PUR waterproof edge-banding.",
    content: `<p>Bathroom cabinetry is often overlooked but faces the most aggressive environment: constant water splashes, direct steam, high humidity, and chemical cosmetic stains.</p>
<h2>1. Zero Swell Waterproof Edge Banding</h2>
<p>Manual carpenter adhesives disintegrate under moisture. SurajWood factory edge-banding uses moisture-curing Polyurethane (PUR) hotmelt, forming a waterproof seal that prevents the MDF core from swelling.</p>
<h2>2. Resisting Chemical Cosmetic Stains</h2>
<p>Toothpaste, soap scum, and cosmetics can leave permanent stains on standard paint or wood. PMMA acrylic is chemically inert and highly stain-resistant, allowing easy wipe-down cleanups.</p>
<h2>3. Bright Floating Vanities</h2>
<p>Mount cabinet units off the floor to make compact bathrooms feel wider. Specifying high-gloss ACRYLUX Ivory Cream keeps the utility zone feeling clean, bright, and hygienic.</p>`,
    featured_image: { ...placeholderImage(431), url: "/images/gallery/bathroom-1.jpg" },
    date: "2026-02-25",
    author: "Suraj Wood Technical Desk",
    reading_time: 6,
    categories: ["Bathroom Design", "Technology"],
  },
  {
    id: 32,
    slug: "pooja-room-design-ideas-acrylic-wood",
    title: "Pooja Room Design Ideas with Acrylic & Wood",
    excerpt: "Incorporate backlit panels, geometric CNC jaali screens, and warm gold metallic panels into sacred temple claddings.",
    content: `<p>Pooja rooms represent the spiritual heart of the Indian home. Designing these sacred spaces requires blending traditional religious elements with contemporary, easy-to-maintain surfaces.</p>
<h2>1. CNC Jaali Cut Backdrops</h2>
<p>Geometric jaali screens and illuminated backlit panels add beautiful spiritual light. SurajWood core boards route flawlessly on CNC machines, allowing clean geometric carving without splintering.</p>
<h2>2. Easy Ash & Soot Wipe-down</h2>
<p>Sacred incense and lamps produce oil and soot that discolours standard painted walls. Our non-porous PMMA acrylic skin prevents soot from binding, allowing oil drips and ash to be wiped off instantly with a damp cloth.</p>
<h2>3. Class B1 Flame Retardant Safety</h2>
<p>Safety is critical around open deepam flames. SurajWood panels carry Class B1 flame retardant certification, offering an extra layer of safety compared to standard wood panels.</p>`,
    featured_image: { ...placeholderImage(432), url: "/images/gallery/kids-1.jpg" },
    date: "2026-02-20",
    author: "Suraj Wood Design Desk",
    reading_time: 7,
    categories: ["Inspiration", "Living Room"],
  },
  {
    id: 33,
    slug: "kids-room-design-durable-non-toxic",
    title: "Kids Room Design: Durable & Non-Toxic Surfaces",
    excerpt: "Evaluate safe, lead-free bedroom options with crayon-resistant surfaces that withstand high child activity.",
    content: `<p>A child&apos;s bedroom needs to be both inspiring and highly robust. SurajWood prioritizes health and durability, engineering non-toxic surfaces that survive years of energetic play and creative &quot;drawings&quot;.</p>
<h2>1. Lead-Free and VOC-Free Certification</h2>
<p>Indoor air quality affects your child&apos;s health. Our PMMA polymer layers and E1-grade low-emission MDF cores release zero toxic fumes, meeting strict international safety standards for nurseries.</p>
<h2>2. Resisting Ink, Crayons, & Spill Stains</h2>
<p>Toddlers love to use closet shutters as sketchpads. Because PMMA is non-porous, crayon marks, pen ink, and paint can be cleaned effortlessly with lukewarm soapy water without permanent staining.</p>
<h2>3. Impact & Scratch Resistance</h2>
<p>SurajWood panels with 3H pencil hardness resist scuffs from toys, balls, and everyday child activity, ensuring the colorful bedroom stays stunning for years.</p>`,
    featured_image: { ...placeholderImage(433), url: "/images/gallery/kids-1.jpg" },
    date: "2026-02-15",
    author: "Suraj Wood Health Desk",
    reading_time: 6,
    categories: ["Kids Bedroom", "Technology"],
  },
  {
    id: 34,
    slug: "living-room-wall-panel-ideas-acryglass",
    title: "Living Room Wall Panel Ideas with ACRYGLASS",
    excerpt: "Transform empty walls into boutique hotel lobbies with large-format high-gloss seamless vertical claddings.",
    content: `<p>An empty vertical wall is a massive blank canvas. Cladding living room walls with large-format 8ft x 4ft ACRYGLASS panels creates a seamless, mirror-like presentation that matches boutique hotel lobbies.</p>
<h2>1. Absolute Flatness Alignment</h2>
<p>Unlike manual wood sheets that show bumps under lighting, SurajWood prelaminated panels ensure an absolute flat surface. The E1-grade core is perfectly calibrated to ±0.1mm tolerance.</p>
<h2>2. Seamless Large Format Spans</h2>
<p>Our standard 8ft x 4ft vertical sheets reduce the number of joins, creating a continuous running wall cladding. Highlight joins with brushed gold metallic profile channels for extra sophistication.</p>
<h2>3. Rapid Maintenance & Cleaning</h2>
<p>Wall cladding faces public hand contact and dust. ACRYGLASS is completely non-porous, requiring simple dry microfiber cloth wipes to maintain its mirror reflection.</p>`,
    featured_image: { ...placeholderImage(434), url: "/images/gallery/tv-1.jpg" },
    date: "2026-02-10",
    author: "Suraj Wood Design Desk",
    reading_time: 7,
    categories: ["Living Room", "Inspiration"],
  },
  {
    id: 35,
    slug: "office-interior-design-acrylic-panels",
    title: "Office Interior Design with Acrylic Panels",
    excerpt: "Build highly productive, scratch-resistant workspaces. Re-engineer corporate reception desks and conference tables.",
    content: `<p>Corporate office environments require building materials that balance premium brand presentation with high durability to handle high daily traffic.</p>
<h2>1. First-Impact Corporate Receptions</h2>
<p>Reception desks are a brand&apos;s physical signature. Finished in mirror-gloss ACRYGLASS Piano Black, checkout and lobby desks create an instant impression of institutional strength.</p>
<h2>2. Non-Glare Conference Tables</h2>
<p>Conference tables in ACRYMATTE Charcoal eliminate bright camera glare during video-conferencing, providing executive desks that resist pen scuffs and key scratches.</p>
<h2>3. Class B1 Building Code Compliance</h2>
<p>All SurajWood panels carry Class B1 flame retardant safety certificates, meeting commercial building codes across Indian IT and financial corridors.</p>`,
    featured_image: { ...placeholderImage(435), url: "/images/gallery/commercial-premium.png" },
    date: "2026-02-05",
    author: "Suraj Wood Commercial Desk",
    reading_time: 7,
    categories: ["Commercial Design", "Offices"],
  },
  {
    id: 36,
    slug: "retail-store-design-acrylic-surfaces",
    title: "Retail Store Design: First Impressions with Acrylic",
    excerpt: "Review high-impact retail display cabinets and product showcases designed to stand out in commercial malls.",
    content: `<p>Retail success depends on drawing customers inside showrooms. Product display cabinets require high-impact sheens, true color illumination, and absolute scratch resistance.</p>
<h2>1. Gem-Tone Jewelry Backdrops</h2>
<p>Illuminated display backdrops in ACRYGLASS reflect product spotlight beams beautifully, accentuating gold and crystal accessories with maximum luxury depth.</p>
<h2>2. Rubbing Alcohol Sanitizer Resistance</h2>
<p>Commercial public checkouts are frequently sanitised. Our PMMA polymer layers resist isopropyl alcohol and chemical cleaners without clouding or edge edge peeling.</p>
<h2>3. Durable Product Pillars</h2>
<p>Display columns face constant handbag scuffs and shopping cart impacts. SurajWood panels with flexible PMMA skin resist cracking, outlasting paint and standard laminate sheets.</p>`,
    featured_image: { ...placeholderImage(436), url: "/images/gallery/commercial-2.jpg" },
    date: "2026-02-01",
    author: "Suraj Wood Retail Desk",
    reading_time: 7,
    categories: ["Commercial Design", "Inspiration"],
  },
  {
    id: 37,
    slug: "how-to-clean-maintain-acrylic-kitchen-shutters",
    title: "How to Clean & Maintain Acrylic Kitchen Shutters",
    excerpt: "The comprehensive maintenance guide. Discover why microfiber cloths and mild soaps keep your sheens mirror-flat.",
    content: `<p>Maintaining a factory prelaminated modular kitchen takes under two minutes. Follow this technical care guide to keep your high-gloss and matte sheens mirror-flat for decades.</p>
<h2>1. The Microfiber Rule</h2>
<p>Always use clean, soft microfiber cloths. Standard cotton towels, paper towels, and kitchen sponges contain abrasive fibers that can leave micro-scratches on high-gloss sheens.</p>
<h2>2. Simple Soap Dilutions</h2>
<p>For kitchen grease vapor and oil drops, dilute a few drops of mild liquid dish soap in lukewarm water. Dampen your microfiber cloth, wipe the shutters in horizontal strokes, and dry immediately.</p>
<h2>3. What to Avoid Completely</h2>
<p>Never use glass cleaners, scouring powders, steel scrubs, paint thinners, or acid-based cleaners. These chemicals disintegrate the polymer finish, dulling the reflection.</p>`,
    featured_image: { ...placeholderImage(437), url: "/images/gallery/kitchen-4.jpg" },
    date: "2026-01-25",
    author: "Suraj Wood Maintenance Desk",
    reading_time: 6,
    categories: ["Maintenance", "How-To Guide"],
  },
  {
    id: 38,
    slug: "complete-guide-to-kitchen-renovation-india-2026",
    title: "Complete Guide to Kitchen Renovation in India 2026",
    excerpt: "Navigate budgeting, layout planning, carcass board selection, and countertop choices for a successful kitchen makeover.",
    content: `<p>A complete kitchen renovation is a major investment. Navigating budgeting, plumbing, cabinetry materials, and countertop selection requires careful technical planning to ensure long-term value.</p>
<h2>1. Layout & Plumbing First</h2>
<p>Never start cabinetry before mapping out gas supply lines, chimney exhausts, water inputs, and kitchen appliance power plugs.</p>
<h2>2. Choosing the Shutter Core</h2>
<p>Carcass and cabinet doors must resist high humidity. Factor Boiling Water Resistant (BWR) plywood or E1 MDF cores into your budget to ensure a warp-free setup.</p>
<h2>3. Factory Prelaminated Speed</h2>
<p>Avoid local carpentry lamination, which can drag renovations out for weeks. Factory-direct prelaminated panels arrive ready-calibrated, reducing installation times by 60%.</p>`,
    featured_image: { ...placeholderImage(438), url: "/images/gallery/kitchen-1.jpg" },
    date: "2026-01-20",
    author: "Suraj Wood Technical Desk",
    reading_time: 9,
    categories: ["Kitchen Design", "Material Guide"],
  },
  {
    id: 39,
    slug: "understanding-mdf-vs-plywood-vs-particle-board",
    title: "Understanding MDF vs Plywood vs Particle Board Substrates",
    excerpt: "Evaluate standard substrate cores across strength, flat calibration, and water swell factors in modular furniture.",
    content: `<p>Surfacing sheens are only as good as the board core underneath. We technical analyze the three leading board substrates used in Indian modular furniture: Plywood, Medium Density Fibreboard (MDF), and Particle Board (PB).</p>
<h2>1. Medium Density Fibreboard (MDF) - The Flatness King</h2>
<p>Calibrated E1-grade MDF offers a uniform density and a perfectly smooth surface calibrated to ±0.1mm tolerance. This eliminates the &quot;orange peel&quot; ripple effect, making it the only substrate suitable for high-gloss mirror reflections.</p>
<h2>2. Calibrated Plywood - The Load Warrior</h2>
<p>calibrated BWR Plywood offers superior screw-holding strength and load capacity, making it the preferred carcass substrate for heavy-load under-counter kitchen sinks.</p>
<h2>3. Particle Board - The Budget Alternative</h2>
<p>Particle Board is economical but highly porous. Under Indian monsoon humidity, manual edge-banded particle board absorbs moisture rapidly, causing cabinets to swell and crumble.</p>`,
    featured_image: { ...placeholderImage(439), url: "/images/gallery/wardrobe-1.jpg" },
    date: "2026-01-15",
    author: "Suraj Wood Substrate Desk",
    reading_time: 8,
    categories: ["Technical Guide", "Material Science"],
  },
  {
    id: 40,
    slug: "what-is-german-pur-bonding-factory-better",
    title: "What is German PUR Bonding? Why Factory-Bonded is Better",
    excerpt: "The science of Polyurethane Reactive hotmelts. Understand how moisture-cured lamination guarantees zero board peeling.",
    content: `<p>Board delamination — where the surface skin peels away from the edge — is the most common cabinet failure in India. At SurajWood, we have eliminated this issue completely through advanced lamination science.</p>
<h2>1. Polyurethane Reactive (PUR) Hotmelt Chemistry</h2>
<p>Unlike standard white glue or contact adhesives that dry by evaporation and remain water-soluble, PUR hotmelt is a chemical adhesive that cures via atmospheric moisture. It forms a permanent, irreversible cross-linked bond.</p>
<h2>2. Steam and Heat Tolerance</h2>
<p>Once cured, PUR adhesive does not re-melt, tolerating temperatures up to 120°C. This makes it completely steam-proof in modular kitchens near gas hobs and ovens.</p>
<h2>3. Flawless Factory Flatness</h2>
<p>Our positive-pressure cleanroom lamination lines apply PUR hotmelt at a highly consistent micron-thickness, ensuring a perfectly smooth lamination with zero bubbles or ripples.</p>`,
    featured_image: { ...placeholderImage(440), url: "/images/about/palex.jpg" },
    date: "2026-01-10",
    author: "Suraj Wood Lamination Desk",
    reading_time: 8,
    categories: ["Manufacturing", "Technology"],
  },
  {
    id: 41,
    slug: "acrylic-panel-price-guide-india",
    title: "Acrylic Panel Price Guide: What to Expect in India",
    excerpt: "Review realistic material costs, lamination fees, E1 board premiums, and custom size pricing per square foot.",
    content: `<p>Prelaminated acrylic panels are a premium architectural specification. Pricing depends on board thickness, core substrate selection, and factory lamination parameters.</p>
<h2>1. Square Foot Pricing Blueprint</h2>
<p>Standard factory prelaminated 1mm PMMA sheets on 18mm E1 MDF average between INR 850 to INR 1,500 per sq ft. Calibrated BWR Plywood cores command a premium of 20-30%.</p>
<h2>2. Double-Sided vs Single-Sided</h2>
<p>For modular kitchen shutters, specify double-sided color matching or a tension-balanced backer sheet to prevent door warpage, protecting your cabinet investment.</p>
<h2>3. Factory-Direct Project Savings</h2>
<p>By ordering factory-direct from SurajWood&apos;s Bahadurgarh facility, project managers eliminate middleman markups, receive direct warranties, and save 60% on on-site manual labor.</p>`,
    featured_image: { ...placeholderImage(441), url: "/images/gallery/kitchen-1.jpg" },
    date: "2026-01-05",
    author: "Suraj Wood Finance Team",
    reading_time: 7,
    categories: ["Finance", "Material Guide"],
  },
  {
    id: 42,
    slug: "top-10-kitchen-design-trends-india-2026",
    title: "Top 10 Kitchen Design Trends in India 2026",
    excerpt: "Evaluate trending modular layouts, color combinations, profile rail integrations, and smart storage trends for 2026.",
    content: `<p>Indian kitchen designs are evolving. Functional minimalism, nature-inspired colors, and smart integrated hardware are shaping premium renovations in 2026.</p>
<h2>1. Glare-Free Japandi Minimalism</h2>
<p>Soft matte finishes paired with warm light oak wood textures are highly specified, creating a peaceful, clutter-free environment.</p>
<h2>2. Sleek Gola Handle Profiles</h2>
<p>Sleek handle-less channels in brushed gold or navy metallic run continuous lines, completely replacing traditional protruding cabinet handles.</p>
<h2>3. Vertical pantry pull-outs</h2>
<p>Tall vertical larders with automatic slide-out drawers utilize maximum height, providing convenient, organized grocery storage.</p>`,
    featured_image: { ...placeholderImage(442), url: "/images/gallery/kitchen-2.jpg" },
    date: "2026-01-01",
    author: "Suraj Wood Design Desk",
    reading_time: 8,
    categories: ["Kitchen Design", "Inspiration"],
  },
  {
    id: 43,
    slug: "carpenters-installation-guide-acrylic-panels",
    title: "Carpenter's Installation Guide for Acrylic Panels",
    excerpt: "A technical manual for cutting, routing, drilling, and edge-banding SurajWood panels on-site without chipping.",
    content: `<p>All SurajWood prelaminated panels are carpenter-friendly. Follow this technical fabrication guide to achieve flawless on-site installation without surface chipping.</p>
<h2>1. Saw Blade Specifications</h2>
<p>Always use fine-tooth TCG (Triple Chip Grind) saw blades with at least 80-100 teeth on circular saws, running at high RPMs to ensure clean acrylic cuts.</p>
<h2>2. Drilling Hinge Holes</h2>
<p>Use sharp Forstner bits running at medium speeds. Clamp a wood backing board underneath the panel when drilling to prevent break-out on the reverse balanced sheet.</p>
<h2>3. Edge-Sealing for Wet Areas</h2>
<p>When installing cabinets near kitchen sinks or bathroom vanities, seal all cut edges with waterproof silicone to prevent substrate moisture absorption.</p>`,
    featured_image: { ...placeholderImage(443), url: "/images/about/about-bg.jpg" },
    date: "2025-12-28",
    author: "Suraj Wood Technical Desk",
    reading_time: 9,
    categories: ["Technical Guide", "Manufacturing"],
  },
  {
    id: 44,
    slug: "monsoon-proof-kitchen-materials-indian-homes",
    title: "Monsoon-Proof Kitchen Materials for Indian Homes",
    excerpt: "Protect modular cabinetry from 90% tropical monsoons, coastal salt-air, and fungal wood rot using PMMA barriers.",
    content: `<p>Monsoons in India subject modular kitchens to extreme humidity, averaging 85-95%. Under these aggressive conditions, manual carpenter adhesives fail rapidly, causing boards to warp.</p>
<h2>1. Non-Porous Fungal Protection</h2>
<p>Standard wood surfaces absorb ambient moisture, encouraging fungal rot. PMMA polymer layers are completely non-porous, acting as a hygienic barrier that prevents mold growth.</p>
<h2>2. Waterproof PUR Hotmelt Adhesion</h2>
<p>SurajWood factory edge-banding uses moisture-curing German PUR hotmelt, forming a waterproof seal that resists steam and high tropical monsoons.</p>
<h2>3. calibrated balanced backers</h2>
<p>Equal tension on both sides is critical. SurajWood factory-laminated balanced backing sheets ensure that tall kitchen and wardrobe doors stay perfectly straight across all wet seasons.</p>`,
    featured_image: { ...placeholderImage(444), url: "/images/gallery/kitchen-3.jpg" },
    date: "2025-12-20",
    author: "Suraj Wood Technical Team",
    reading_time: 7,
    categories: ["Material Science", "Apartment Living"],
  },
  {
    id: 45,
    slug: "wedding-season-home-renovation-ideas",
    title: "Wedding Season Home Renovation Ideas",
    excerpt: "Quick, high-impact interior upgrades including TV units, feature wall claddings, and bedroom wardrobes built in 7 days.",
    content: `<p>The wedding season is a time of massive celebration and home preparations. Upgrading your drawing room feature walls, TV units, and bedroom closets can be done rapidly using prelaminated panels.</p>
<h2>1. Statement TV Backdrops in 3 Days</h2>
<p>Create a stunning focal point in your drawing room. Install a high-gloss ACRYGLASS media backdrop over existing walls in under 72 hours.</p>
<h2>2. Quick Wardrobe Shutter Upgrades</h2>
<p>Replace old, dull cabinet doors. Fabricate factory prelaminated ACRYSILK soft-satin shutters to instantly elevate bedroom closets.</p>
<h2>3. Direct-from-Factory Speed</h2>
<p>By ordering factory-direct from SurajWood&apos;s Bahadurgarh facility, project managers receive custom calibrated sheets in under 5 business days, accelerating renovations.</p>`,
    featured_image: { ...placeholderImage(445), url: "/images/gallery/wardrobe-2.jpg" },
    date: "2025-12-15",
    author: "Suraj Wood Closet Team",
    reading_time: 6,
    categories: ["Inspiration", "Apartment Living"],
  },
  {
    id: 46,
    slug: "how-to-choose-between-matte-and-gloss-finishes",
    title: "How to Choose Between Matte and Gloss Kitchen Finishes",
    excerpt: "Evaluate gloss sheens and velvet matte surfaces across daylight reflection, fingerprint smudge factors, and room spacing.",
    content: `<p>Choosing cabinet sheens defines the visual mood of your kitchen. We compare high-gloss and matte sheens across light reflection, fingerprint smudges, and room spacing.</p>
<h2>1. High-Gloss (ACRYGLASS & ACRYLUX) - Space Amplifiers</h2>
<p>High-gloss sheens offer 95% light reflectivity, making compact rooms feel wider. However, gloss requires frequent daily microfiber wipes to remove fingerprint smudges.</p>
<h2>2. Nano-Matte (ACRYMATTE & ACRYSILK) - Calm Cleanliness</h2>
<p>Nano-matte sheens absorb light glare, providing a velvet-like corporate appearance. Advanced anti-fingerprint coatings keep matte shutters smudge-free with zero daily maintenance.</p>
<h2>3. Curating a Duo-Tone Setup</h2>
<p>Get the best of both sheens. Specify high-gloss white ACRYGLASS for upper wall cabinets to bounce daylight, and use ACRYMATTE Charcoal for base units to hide scuffs.</p>`,
    featured_image: { ...placeholderImage(460), url: "/images/gallery/kitchen-4.jpg" },
    date: "2025-12-10",
    author: "Suraj Wood Design Desk",
    reading_time: 8,
    categories: ["Color Selection", "Material Guide"],
  },
  {
    id: 47,
    slug: "diwali-kitchen-makeover-guide",
    title: "Diwali Kitchen Makeover Guide: Quick & Affordable",
    excerpt: "A step-by-step catalog guide to modernizing your cabinet shutters, hardware handles, and drawer profiles before the festive season.",
    content: `<p>Diwali is the most celebrated festive season in India, a time for deep home cleaning and aesthetic renewal. Modernizing your kitchen cabinet shutters and hardware can be done quickly without complete cabinet demolition.</p>
<h2>1. Replacing Cabinet Shutters Only</h2>
<p>If your internal cabinet carcasses are structurally sound, simply replace the front cabinet doors with prelaminated ACRYLUX shutters to save 60% on renovation budgets.</p>
<h2>2. Sleek Gola Handle Profile Retrofits</h2>
<p>Upgrade old handles. Integrate sleek, handle-less aluminum channels to completely revitalize the modular kitchen profile.</p>
<h2>3. Fast Factory Shipping</h2>
<p>Our Bahadurgarh manufacturing lines accelerate production during the pre-Diwali rush, ensuring project dispatches across Delhi, Mumbai, and Bangalore within 3-5 days.</p>`,
    featured_image: { ...placeholderImage(461), url: "/images/gallery/kitchen-new-1.png" },
    date: "2025-10-05",
    author: "Suraj Wood Design Desk",
    reading_time: 6,
    categories: ["Inspiration", "Apartment Living"],
  },
  {
    id: 48,
    slug: "island-kitchen-design-ideas-large-homes",
    title: "Island Kitchen Design Ideas for Large Indian Homes",
    excerpt: "Design beautiful social cooking centers with custom breakfast islands, integrated hobs, and luxury matte-glass panels.",
    content: `<p>A central island kitchen is the ultimate visual centerpiece for spacious, open-plan villas. It serves as a social prep station, secondary dining counter, and entertainment hub.</p>
<h2>1. Seamless Breakfast Bar Counters</h2>
<p>Design a cantilevered breakfast counter extending from the kitchen island, paired with sleek high stools to create an inviting social hub.</p>
<h2>2. Velvet Matte-Glass Panels</h2>
<p>Central island cabinets are highly visible from formal living areas. Specifying ACRYGLASS MATTE provides the velvet-like depth of frosted glass, resisting public scuffs and fingerprints.</p>
<h2>3. Calibrated Core Alignment</h2>
<p>Large island runs demand perfectly flat, ripple-free shutter alignments. SurajWood factory prelaminated E1 MDF core panels ensure perfect structural alignment across expansive kitchen islands.</p>`,
    featured_image: { ...placeholderImage(462), url: "/images/gallery/kitchen-new-2.jpg" },
    date: "2025-09-05",
    author: "Suraj Wood Design Desk",
    reading_time: 8,
    categories: ["Kitchen Design", "Inspiration"],
  }
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
      "Yes. We supply pan-India from our manufacturing facility in Bahadurgarh, Haryana. We have dealer networks in Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Ahmedabad, and other major cities. Contact us at +91-9009171819 to find your nearest dealer.",
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
      "Yes. We offer free sample kits containing swatches of all five product lines in selected colours. Request your sample kit via our website or call +91-9009171819. Sample kits are dispatched within 2-3 business days.",
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
