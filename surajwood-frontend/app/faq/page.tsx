import type { Metadata } from "next";
import Link from "next/link";
import { getFAQs } from "@/lib/sanity";
import type { SanityFAQ } from "@/types/sanity";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateFAQSchemaFromSanityFAQ,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import FAQAccordion from "./FAQAccordion";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Acrylic Panels | SurajWood",
  description:
    "Answers to common questions about Suraj Wood acrylic panels — product specs, installation, maintenance, ordering, and dealer enquiries. Everything you need to know before buying.",
  openGraph: {
    title: "FAQ — Suraj Wood Acrylic Panels",
    description:
      "Find answers about ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS & ACRYGLASS MATTE panels: specs, cleaning, warranty, delivery, and more.",
    url: "https://www.surajwood.com/faq",
  },
  alternates: { canonical: "https://www.surajwood.com/faq" },
};

// ---------------------------------------------------------------------------
// Category labels
// ---------------------------------------------------------------------------

const CATEGORY_META: Record<
  SanityFAQ["category"],
  { label: string; description: string }
> = {
  general: {
    label: "General",
    description: "Common questions about Suraj Wood and our products.",
  },
  product: {
    label: "Product",
    description:
      "Technical specifications, finishes, and product range questions.",
  },
  maintenance: {
    label: "Maintenance & Care",
    description:
      "How to clean, maintain, and protect your acrylic panel surfaces.",
  },
  technical: {
    label: "Technical & Installation",
    description:
      "Installation guidelines, substrate compatibility, and fabrication advice.",
  },
};

const CATEGORY_ORDER: SanityFAQ["category"][] = [
  "general",
  "product",
  "maintenance",
  "technical",
];

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------

export default async function FAQPage() {
  const allFaqs = await getFAQs();

  // Group by category
  const grouped = CATEGORY_ORDER.reduce<Record<SanityFAQ["category"], SanityFAQ[]>>(
    (acc, cat) => {
      acc[cat] = allFaqs.filter((f) => f.category === cat);
      return acc;
    },
    { general: [], product: [], maintenance: [], technical: [] }
  );

  const schemas = [
    generateFAQSchemaFromSanityFAQ(allFaqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "FAQ", url: "https://www.surajwood.com/faq" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-copper">›</li>
              <li className="text-white/90">FAQ</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg text-white/70 max-w-xl">
            Everything you need to know about Suraj Wood acrylic panels — from material specs
            to installation and maintenance.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ sections                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {CATEGORY_ORDER.map((category) => {
            const faqs = grouped[category];
            if (faqs.length === 0) return null;
            const meta = CATEGORY_META[category];

            return (
              <div key={category} id={category}>
                {/* Category heading */}
                <div className="mb-6">
                  <h2 className="text-2xl font-heading font-bold text-navy">
                    {meta.label}
                  </h2>
                  <p className="mt-1 text-navy/55 text-sm">{meta.description}</p>
                  <div className="mt-3 h-0.5 w-12 bg-copper rounded-full" />
                </div>

                {/* Accordion — client component */}
                <FAQAccordion faqs={faqs} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Still have questions CTA                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-navy mb-3">
            Still Have Questions?
          </h2>
          <p className="text-navy/65 mb-6">
            Our technical team is happy to help. Call, WhatsApp, or email us — we respond within
            a few hours on business days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+919009171819"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Us
            </a>
            <a
              href="https://wa.me/919009171819?text=Hi%2C%20I%20have%20a%20question%20about%20Suraj%20Wood%20panels."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-copper text-copper font-semibold px-6 py-3 rounded-lg hover:bg-copper hover:text-white transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
