import { getHomepageData } from "@/lib/sanity";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import MembraneHomeSection from "@/components/sections/MembraneHomeSection";
import AluminumHomeSection from "@/components/sections/AluminumHomeSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HomeTechnicalComparison from "@/components/sections/HomeTechnicalComparison";
import ApplicationShowcase from "@/components/sections/ApplicationShowcase";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import EventsShowcase from "@/components/sections/EventsShowcase";
import CTABanner from "@/components/sections/CTABanner";
import SEOContent from "@/components/sections/SEOContent";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SurajWood — India's Best Acrylic Panel & Membrane Shutter Manufacturer | PMMA Panels",
  description:
    "Factory-direct PMMA acrylic panels pre-laminated with German PUR technology, Continental 3D Membrane Shutters, and AL-PROFHAN hardware. Precision-engineered for modern interiors.",
  alternates: { canonical: "https://surajwood.com" },
  openGraph: {
    title: "SurajWood — India's Best Acrylic Panel & Membrane Shutter Manufacturer",
    description:
      "India's leading manufacturer of prelaminated PMMA acrylic panels, 3D membrane shutters, and aluminum profiles. Superior durability and optical clarity for kitchens & wardrobes.",
    url: "https://surajwood.com",
    siteName: "SurajWood",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/banner/bg3.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood Premium Acrylic Panels & Membrane Shutters Manufacturing",
      },
    ],
  },
};

export default async function HomePage() {
  const data = await getHomepageData();

  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebSiteSchema(),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Hero />
      <ProductGrid products={data.featured_products} />
      <MembraneHomeSection />
      <AluminumHomeSection />
      <WhyChooseUs />
      <HomeTechnicalComparison />
      <ApplicationShowcase />
      <TestimonialCarousel testimonials={data.testimonials} />
      <EventsShowcase />
      <SEOContent />
      <CTABanner />
    </>
  );
}
