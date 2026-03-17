import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/schema";
import ContactPageClient from "./ContactPageClient";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Contact Us | Get Acrylic Panel Samples & Quotes | SurajWood",
  description:
    "Contact Suraj Wood Products Pvt. Ltd. for acrylic panel samples, quotes, dealer enquiries, and technical support. Call +91-9999995553 or email sales@surajwood.com.",
  openGraph: {
    title: "Contact SurajWood — Request Samples & Quotes",
    description:
      "Get in touch for free sample kits, pricing, dealer enquiries, or technical support. Factory in Bahadurgarh, Haryana. Pan-India delivery.",
    url: "https://www.surajwood.com/contact",
  },
  alternates: { canonical: "https://www.surajwood.com/contact" },
};

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------

export default function ContactPage() {
  const schemas = [
    generateLocalBusinessSchema("delhi"),
    generateLocalBusinessSchema("bangalore"),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Contact Us", url: "https://www.surajwood.com/contact" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <ContactPageClient />
    </>
  );
}
