import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateAluminumProfilesSchema,
  generateLocalBusinessSchema,
  generateAggregateRatingSchema,
} from "@/lib/schema";
import AluminumProfilesClient from "./AluminumProfilesClient";

// ---------------------------------------------------------------------------
// High-Impact SEO Metadata targeting #1 Rank for Aluminium Profiles in India
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Aluminum Profiles Manufacturer India | AL-PROFHAN Kitchen & Wardrobe Gola Profiles — SurajWood",
  description:
    "India's leading manufacturer & supplier of 6063-T5 architectural aluminium profiles. AL-PROFHAN Ottimo Gola handles, Aerolinea slim frames, Luminare LED channels & Velaro glass shutter systems. 3.0-meter lengths with authentic 2D CAD engineering specs & wholesale prices.",
  keywords: [
    "aluminum profiles",
    "aluminium profiles",
    "aluminium profile manufacturer india",
    "aluminum profiles for modular kitchen",
    "aluminium profile supplier bangalore",
    "gola profile handles",
    "j profile handle",
    "c profile handle",
    "handleless kitchen gola profile",
    "aluminum shutter profile 3mtr",
    "aluminium edge profile t patti",
    "aluminum led light profile",
    "glass shutter aluminum profile",
    "6063-t5 architectural aluminum",
    "al-profhan aluminum profiles",
    "suraj wood aluminum profiles",
    "aluminium profile price list 2026",
  ],
  alternates: { canonical: "https://www.surajwood.com/products/aluminum-profiles" },
  openGraph: {
    title: "AL-PROFHAN Aluminum Profiles — Architectural Hardware Manufacturer | SurajWood",
    description:
      "Precision-engineered 6063-T5 aluminum profiles for modular kitchens, wardrobes & commercial cabinetry. Ottimo, Aerolinea, Luminare & Velaro series with authentic 2D CAD cross-sections.",
    url: "https://www.surajwood.com/products/aluminum-profiles",
    siteName: "Suraj Wood Products Pvt. Ltd.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/products/aluminum/ottimo-kitchen.png",
        width: 1446,
        height: 1065,
        alt: "AL-PROFHAN Architectural Aluminum Profiles by SurajWood",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL-PROFHAN Aluminum Profiles Manufacturer India | SurajWood",
    description:
      "Precision-engineered aluminum profiles for modern kitchens and wardrobes. Ottimo, Aerolinea, Luminare & Velaro series.",
    images: ["/images/products/aluminum/ottimo-kitchen.png"],
  },
};

// ---------------------------------------------------------------------------
// Comprehensive High-Intent FAQs for Google Rich Snippets & Voice Search
// ---------------------------------------------------------------------------

const AL_FAQS = [
  {
    question: "Who is the best aluminium profile manufacturer in India for modular kitchens?",
    answer:
      "Suraj Wood (AL-PROFHAN) is a leading Indian manufacturer of architectural 6063-T5 aluminium profiles. We manufacture integrated Gola handleless profiles, J-pull shutter handles, LED light diffusion channels, and luxury glass shutter systems with German-standard tolerances and pan-India factory direct supply.",
  },
  {
    question: "What is the standard length and wall thickness of AL-PROFHAN aluminum profiles?",
    answer:
      "Our standard architectural profiles are manufactured in 3.0-meter (approx. 10 feet) continuous lengths with an engineered gauge thickness of 1.2mm to 1.5mm for superior structural rigidity, zero sagging, and long-term durability.",
  },
  {
    question: "What aluminum alloy grade is used in SurajWood profiles?",
    answer:
      "We exclusively use high-grade 6063-T5 architectural aluminum alloy. This alloy provides optimal tensile strength, high corrosion resistance, zero oxidation, and a flawless surface for anodizing and powder-coated finishes.",
  },
  {
    question: "What are the available finishes for AL-PROFHAN aluminum profiles?",
    answer:
      "Profiles are available in 5 curated architectural finishes: Black Brush (Anodized), Bronze Brush (Anodized), Coffee Painted (Powder Coated), Anthracite Painted (Metallic Grey), and Champagne Painted (exclusive to Velaro glass shutter series), complete with color-matched metal end caps.",
  },
  {
    question: "What is a Gola profile handle and why is it used in modular kitchens?",
    answer:
      "A Gola profile is a recessed continuous aluminum extrusion mounted directly to the cabinet carcass or door top. It creates a completely handleless, minimalist aesthetic while offering an ergonomic finger-grip channel and integrated rubber gasket for soft, silent shutter closure.",
  },
  {
    question: "Which aluminum profiles are suitable for integrated LED lighting?",
    answer:
      "Our Luminare Series (PAPS-3136A 45° corner profile & PAPS-3062A recessed profile) and Shelf Profiles (PAPS-5037A) feature built-in aluminum heat-sink channels and frosted polycarbonate diffusers for spot-free under-cabinet and wardrobe illumination.",
  },
  {
    question: "How do I order aluminum profile samples or get wholesale dealer pricing?",
    answer:
      "You can request architectural sample swatches and the complete AL-PROFHAN 2026 Price List directly through our website contact form or by calling our national sales team at +91-9009171819. We provide same-day dispatch to major hubs including Bangalore, Mumbai, Delhi NCR, Hyderabad, Chennai, and Ahmedabad.",
  },
];

export default function AluminumProfilesPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
      { name: "Aluminum Profiles", url: "https://www.surajwood.com/products/aluminum-profiles" },
    ]),
    generateFAQSchema(AL_FAQS),
    generateAluminumProfilesSchema(),
    generateLocalBusinessSchema("bangalore"),
    generateAggregateRatingSchema("AL-PROFHAN Architectural Aluminum Profiles by SurajWood", 4.9, 940),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <AluminumProfilesClient />
    </>
  );
}
