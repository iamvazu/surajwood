import { getHomepageData } from "@/lib/sanity";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ApplicationShowcase from "@/components/sections/ApplicationShowcase";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SurajWood | Premium Acrylic Panels for Indian Interiors",
  description:
    "India's leading acrylic panel manufacturer. Shop ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS panels for kitchens, wardrobes & commercial spaces. Factory at Bahadurgarh, Haryana. Pan-India delivery.",
  alternates: { canonical: "https://www.surajwood.com" },
  openGraph: {
    title: "SurajWood | Premium Acrylic Panels for Indian Interiors",
    description:
      "India's leading acrylic panel manufacturer. European technology, Indian manufacturing, pan-India delivery.",
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
      <ApplicationShowcase />
      <TestimonialCarousel testimonials={data.testimonials} />
      <CTABanner />
    </>
  );
}
