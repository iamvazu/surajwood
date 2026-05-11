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
  title: "SurajWood — Premium Acrylic Panels Manufacturer India",
  description:
    "India's leading manufacturer of prelaminated PMMA acrylic panels. SurajWood outperforms PETG and laminates with German PUR technology, 3H scratch resistance, and optical clarity. Shop ACRYLUX, ACRYSILK, and more.",
  alternates: { canonical: "https://www.surajwood.com" },
  openGraph: {
    title: "SurajWood — Premium Acrylic Panels Manufacturer India",
    description:
      "Factory-direct PMMA acrylic panels on MDF, Plywood, and PB substrates. Superior to PETG and laminates. German PUR bonding. Pan-India delivery.",
    url: "https://www.surajwood.com",
    siteName: "SurajWood",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/banner/bg3.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood Premium Acrylic Panels — Factory-Direct Manufacturer",
      },
    ],
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
