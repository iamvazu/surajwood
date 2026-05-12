import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
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

const CONTACT_FAQS = [
  {
    question: "How can I request free sample swatches?",
    answer: "You can request a free sample kit by filling out the form on our contact page or by messaging us on WhatsApp. We provide swatches of all our acrylic panel collections including ACRYLUX and ACRYSILK."
  },
  {
    question: "Does SurajWood deliver products pan-India?",
    answer: "Yes, we have a robust logistics network that ensures safe and timely delivery of our acrylic panels and aluminum profiles to all major cities and states across India."
  },
  {
    question: "Where is the SurajWood factory located?",
    answer: "Our state-of-the-art manufacturing facility is located at 45 KM Stone, VPO Rohad, Bahadurgarh, Haryana – 124501."
  },
  {
    question: "What are your customer support timings?",
    answer: "Our team is available Monday through Saturday, from 9:00 AM to 6:00 PM IST, to assist with quotes, technical specs, and dealer inquiries."
  }
];

export default function ContactPage() {
  const schemas = [
    generateLocalBusinessSchema("delhi"),
    generateLocalBusinessSchema("bangalore"),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Contact Us", url: "https://www.surajwood.com/contact" },
    ]),
    generateFAQSchema(CONTACT_FAQS),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <ContactPageClient />
    </>
  );
}
