import { getHomepageData } from "@/lib/sanity";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HomeTechnicalComparison from "@/components/sections/HomeTechnicalComparison";
import ApplicationShowcase from "@/components/sections/ApplicationShowcase";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SurajWood | Premium Factory Prelaminated Acrylic Panels",
  description:
    "India's leading manufacturer of prelaminated PMMA acrylic panels. SurajWood outperforms PETG and laminates with German PUR technology, 3H scratch resistance, and optical clarity. Shop ACRYLUX, ACRYSILK, and more.",
  alternates: { canonical: "https://www.surajwood.com" },
  openGraph: {
    title: "SurajWood | Technical Authority in Acrylic Panels",
    description:
      "Superior to PETG and laminates. Factory prelaminated PMMA acrylic panels on MDF, Plywood, and PB substrates.",
    url: "https://www.surajwood.com",
    siteName: "SurajWood",
    locale: "en_IN",
    type: "website",
  },
};

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <>
      <Hero />
      <ProductGrid products={data.featured_products} />
      <WhyChooseUs />
      <HomeTechnicalComparison />
      <ApplicationShowcase />
      <TestimonialCarousel testimonials={data.testimonials} />
      <CTABanner />
    </>
  );
}
