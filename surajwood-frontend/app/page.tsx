import { getHomepageData } from "@/lib/sanity";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import MembraneHomeSection from "@/components/sections/MembraneHomeSection";
import AluminumHomeSection from "@/components/sections/AluminumHomeSection";
import ClientLogos from "@/components/sections/ClientLogos";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HomeTechnicalComparison from "@/components/sections/HomeTechnicalComparison";
import ApplicationShowcase from "@/components/sections/ApplicationShowcase";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import EventsShowcase from "@/components/sections/EventsShowcase";
import CTABanner from "@/components/sections/CTABanner";
import SEOContent from "@/components/sections/SEOContent";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema, generateTopAcrylicBrandsItemListSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SurajWood — India's Best Acrylic Sheet Brand & Panel Manufacturer",
  description:
    "SurajWood is India's leading manufacturer of high-gloss acrylic sheets, prelaminated PMMA panels, 3D Membrane Shutters, and AL-PROFHAN hardware for modular kitchens and wardrobes.",
  alternates: { canonical: "https://surajwood.com" },
  openGraph: {
    title: "SurajWood — India's Best Acrylic Sheet Brand & Membrane Shutter Manufacturer",
    description:
      "India's leading manufacturer of prelaminated PMMA acrylic sheets, high-gloss kitchen panels, 3D membrane shutters, and aluminum profiles. 95% mirror reflection with 10-year UV stability.",
    url: "https://surajwood.com",
    siteName: "SurajWood",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/banner/bg3.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood India Best Acrylic Sheet Brand and Panel Manufacturer",
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
    generateTopAcrylicBrandsItemListSchema(),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Hero />
      <ProductGrid products={data.featured_products} />
      <MembraneHomeSection />
      <AluminumHomeSection />
      <ClientLogos />
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
