import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import { MEMBRANE_FAQS } from "@/data/membrane-shutters";
import MembraneClient from "./MembraneClient";

export const metadata: Metadata = {
  title: "Continental Membrane Shutters | 36 European Shades & CNC Profiles | SurajWood",
  description:
    "Explore SurajWood Continental 3D Membrane Shutters. 36 European shades across Wood Grain, Porcelain Touch, Perfect Silk & Ceramic Satin finishes. 100% seamless wrap on HDMR moisture-resistant core with zero edge-banding seams.",
  keywords: [
    "Membrane shutters",
    "Continental membrane",
    "3D membrane kitchen shutters",
    "Shaker door shutters India",
    "Seamless wardrobe shutters",
    "Moisture resistant HDMR membrane",
    "Wood grain membrane shutters",
    "SurajWood membrane",
    "European PVC foil shutters",
    "J-pull membrane shutters"
  ],
  alternates: {
    canonical: "https://www.surajwood.com/products/membrane-shutters",
  },
  openGraph: {
    title: "Continental Membrane Shutters — 36 European Finishes | SurajWood",
    description:
      "Seamless 3D thermoformed membrane shutters with zero edge-banding seams. 36 shades across Wood Grain, Porcelain, Silk, and Ceramic finishes on moisture-resistant HDMR core.",
    url: "https://www.surajwood.com/products/membrane-shutters",
    type: "website",
    images: [
      {
        url: "/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Continental Membrane Shutters by SurajWood",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Continental Membrane Shutters — 36 European Finishes | SurajWood",
    description:
      "Seamless 3D thermoformed membrane shutters with zero edge-banding seams. 36 shades on moisture-resistant HDMR core.",
    images: ["/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg"],
  },
};

export default function MembraneShuttersPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
      {
        name: "Continental Membrane Shutters",
        url: "https://www.surajwood.com/products/membrane-shutters",
      },
    ]),
    generateFAQSchema(MEMBRANE_FAQS),
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "SurajWood Continental Membrane Shutters",
      image: "https://www.surajwood.com/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg",
      description:
        "High-performance 3D vacuum thermoformed membrane shutters on moisture-resistant HDMR core. 36 European shades across Wood Grain, Porcelain Touch, Perfect Silk, and Ceramic Satin finishes.",
      brand: {
        "@type": "Brand",
        name: "SurajWood",
      },
      manufacturer: {
        "@type": "Organization",
        name: "Suraj Wood Products Private Limited",
        url: "https://www.surajwood.com",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <MembraneClient />
    </>
  );
}
