import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import AluminumProfilesClient from "./AluminumProfilesClient";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "AL-PROFHAN by Suraj Wood | Premium Aluminum Profiles & 2D Technical Drawings",
  description:
    "Explore the AL-PROFHAN series of precision-engineered aluminum profiles by Suraj Wood. Ottimo Gola profiles, Aerolinea slim frames, Luminare LED channels, and Velaro glass shutter systems with authentic 2D engineering specs.",
  alternates: { canonical: "https://www.surajwood.com/products/aluminum-profiles" },
  openGraph: {
    title: "AL-PROFHAN Aluminum Profiles — SurajWood Manufacturing",
    description:
      "Precision-engineered aluminum profiles for modern kitchens and wardrobes. Ottimo, Aerolinea, Luminare & Velaro series with authentic 2D CAD cross-sections.",
    url: "https://www.surajwood.com/products/aluminum-profiles",
    images: [
      {
        url: "/images/products/aluminum/ottimo-kitchen.png",
        width: 1446,
        height: 1065,
        alt: "AL-PROFHAN Aluminum Profiles by Suraj Wood",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const AL_FAQS = [
  {
    question: "What is the standard length of AL-PROFHAN aluminum profiles?",
    answer:
      "Our standard profiles are manufactured in 3.0-meter (approx. 10 feet) lengths, which is the industry standard for modular kitchen and wardrobe applications in India.",
  },
  {
    question: "What alloy grade is used in AL-PROFHAN profiles?",
    answer:
      "We use high-grade 6063-T5 architectural aluminum alloy for superior structural integrity, precision edge tolerance, and anti-oxidation finish.",
  },
  {
    question: "Which finishes are available for Ottimo Series profiles?",
    answer:
      "Ottimo Series profiles (PAPS-5220, PAPS-5221, PAPS-5311, PAPS-5313) are available in 4 curated finishes: Black Brush, Bronze Brush, Coffee Painted, and Anthracite Painted, with matching metal end caps.",
  },
  {
    question: "Do you offer profiles compatible with LED lighting?",
    answer:
      "Yes, our Luminare Series (PAPS-3136A, PAPS-3062A) and Shelf/Hanging profiles (PAPS-5037A, PAPS-6413) are specifically designed for integrated LED strips with frosted diffusion channels.",
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
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <AluminumProfilesClient />
    </>
  );
}
