import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateMembraneShuttersSchema,
  generateLocalBusinessSchema,
  generateAggregateRatingSchema,
} from "@/lib/schema";
import { MEMBRANE_FAQS } from "@/data/membrane-shutters";
import MembraneClient from "./MembraneClient";

// ---------------------------------------------------------------------------
// High-Impact SEO Metadata targeting #1 Rank for Membrane Shutters in India
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Membrane Shutters Manufacturer India | 3D PVC Shaker & J-Pull Kitchen Shutters — SurajWood",
  description:
    "India's leading manufacturer of seamless 3D vacuum thermoformed membrane shutters. 100% monolithic edge wrap on moisture-resistant Green HDHMR core. 36 European shades across Wood Grain, Porcelain Touch & Silk finishes with custom CNC Shaker & J-Pull profiles.",
  keywords: [
    "membrane shutters",
    "membrane shutter",
    "membrane shutters for kitchen",
    "membrane shutter manufacturer india",
    "membrane shutter price per sq ft",
    "pvc membrane kitchen shutters",
    "3d membrane shutters",
    "shaker door membrane shutters",
    "membrane shutters in bangalore",
    "membrane shutters manufacturers in mumbai",
    "membrane shutter vs acrylic",
    "membrane shutter vs laminate",
    "thermofoil kitchen cabinet doors",
    "hdhmr membrane wardrobe shutters",
    "j-pull handleless membrane shutters",
    "suraj wood membrane shutters",
    "seamless 3d cabinet shutters india",
  ],
  alternates: {
    canonical: "https://www.surajwood.com/products/membrane-shutters",
  },
  openGraph: {
    title: "SurajWood 3D Seamless Membrane Shutters & Doors — Manufacturer India",
    description:
      "Seamless 3D thermoformed membrane shutters with zero edge-banding seams. 36 European shades on moisture-resistant HDHMR core with CNC Shaker & J-Pull profiles.",
    url: "https://www.surajwood.com/products/membrane-shutters",
    siteName: "Suraj Wood Products Pvt. Ltd.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood 3D Seamless Membrane Shutters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SurajWood 3D Seamless Membrane Shutters & Doors",
    description:
      "Seamless 3D thermoformed membrane shutters with zero edge-banding seams. 36 shades on moisture-resistant HDHMR core.",
    images: ["/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg"],
  },
};

export default function MembraneShuttersPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
      {
        name: "Membrane Shutters",
        url: "https://www.surajwood.com/products/membrane-shutters",
      },
    ]),
    generateFAQSchema(MEMBRANE_FAQS),
    generateMembraneShuttersSchema(),
    generateLocalBusinessSchema("bangalore"),
    generateAggregateRatingSchema("SurajWood 3D Seamless Membrane Shutters & Doors", 4.9, 890),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <MembraneClient />
    </>
  );
}

