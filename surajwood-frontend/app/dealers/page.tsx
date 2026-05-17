import type { Metadata } from "next";

import SchemaMarkup from "@/components/seo/SchemaMarkup";
import DealerForm from "@/components/forms/DealerForm";
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from "@/lib/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Become a SurajWood Dealer | Acrylic Panel Distributors India",
  description:
    "Join India's fastest-growing premium acrylic panel distribution network. Competitive margins, marketing support, and pan-India brand recognition. Apply to become a SurajWood dealer today.",
  alternates: {
    canonical: "https://www.surajwood.com/dealers",
  },
  openGraph: {
    title: "Become a SurajWood Dealer | Acrylic Panel Distributors India",
    description:
      "Partner with Suraj Wood Products to distribute ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, and ACRYGLASS MATTE panels. Apply for dealership today.",
    url: "https://www.surajwood.com/dealers",
    siteName: "Suraj Wood",
    images: [
      {
        url: "https://www.surajwood.com/images/og/dealers.jpg",
        width: 1200,
        height: 630,
        alt: "Become a SurajWood Dealer",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const DEALER_BENEFITS = [
  {
    icon: "🏆",
    title: "Premium Product Portfolio",
    description:
      "Represent India's most technically advanced acrylic panel range — ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, and ACRYGLASS MATTE. Five distinct finish types covering every segment of the market from affordable kitchens to luxury penthouses.",
  },
  {
    icon: "💰",
    title: "Competitive Margins & Terms",
    description:
      "Industry-leading margins for active dealers with consistent volume. Flexible credit terms, advance purchase discounts, and quarterly performance bonuses for our top-tier partners. Transparent, no-surprise pricing from our factory.",
  },
  {
    icon: "📦",
    title: "Marketing Support & Sample Kits",
    description:
      "Full marketing collateral: product brochures, swatch books, digital assets, and showroom display kits provided at subsidised cost. Dedicated account manager for your territory. Co-branded campaigns available for our Platinum dealer tier.",
  },
  {
    icon: "🌐",
    title: "Pan-India Brand Recognition",
    description:
      "Leverage Suraj Wood's 15+ years of brand equity with architects, interior designers, and modular kitchen manufacturers across India. Listed as an authorised dealer on our website and Google Business Profile for your territory.",
  },
];

const DEALER_FAQ = [
  {
    question: "What is the minimum order quantity to become a SurajWood dealer?",
    answer:
      "Our standard dealership requires a minimum monthly volume commitment of 50 sheets. However, we offer a trial period for new dealers at 20-30 sheets per month to allow you to establish your market before scaling. Contact our sales team to discuss the right tier for your business.",
  },
  {
    question: "Which territories are currently available for new dealerships?",
    answer:
      "We are actively recruiting dealers in Pune, Ahmedabad, Kolkata, Jaipur, Lucknow, Chandigarh, Surat, Kochi, and tier-2 cities across India. Delhi NCR, Mumbai, Bangalore, Hyderabad, and Chennai have established dealer networks — new enquiries in these cities will be assessed for capacity.",
  },
  {
    question: "What support does Suraj Wood provide to new dealers?",
    answer:
      "All new dealers receive: (1) a complimentary sample kit and swatch book worth ₹3,500, (2) product training from our technical sales team, (3) digital assets and brochures for your showroom, (4) listing on our website's dealer locator, and (5) dedicated WhatsApp support from your regional account manager. Platinum dealers (200+ sheets/month) also receive co-branded marketing campaigns and priority lead referrals.",
  },
  {
    question: "What is the lead time for orders from the factory?",
    answer:
      "Standard production and dispatch from our Bahadurgarh, Haryana facility is 3-5 working days for stocked colours and 7-10 working days for custom or special orders. Delhi NCR dealers can arrange same-day or next-day collection. We maintain buffer stock of our 20 most popular colours for immediate despatch.",
  },
];

const COVERAGE_REGIONS = [
  { city: "Delhi NCR", status: "Active", note: "Factory direct — 35km from manufacturing" },
  { city: "Mumbai", status: "Active", note: "Dealers in Bandra, Thane, Navi Mumbai" },
  { city: "Bangalore", status: "Active", note: "Dealers in Koramangala, Whitefield, Electronic City" },
  { city: "Hyderabad", status: "Active", note: "Dealers in Secunderabad, Kondapur, Jubilee Hills" },
  { city: "Chennai", status: "Active", note: "Dealers in Anna Nagar, T. Nagar, OMR" },
  { city: "Pune", status: "Recruiting", note: "Seeking authorised dealer partners" },
  { city: "Ahmedabad", status: "Recruiting", note: "Seeking authorised dealer partners" },
  { city: "Kolkata", status: "Recruiting", note: "Seeking authorised dealer partners" },
  { city: "Jaipur", status: "Recruiting", note: "Seeking authorised dealer partners" },
  { city: "Lucknow", status: "Recruiting", note: "Seeking authorised dealer partners" },
  { city: "Chandigarh", status: "Recruiting", note: "Seeking authorised dealer partners" },
  { city: "Surat", status: "Recruiting", note: "Seeking authorised dealer partners" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function DealersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.surajwood.com" },
    { name: "Become a Dealer", url: "https://www.surajwood.com/dealers" },
  ]);

  const faqSchema = generateFAQSchema(DEALER_FAQ);
  const orgSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema("delhi");

  return (
    <>
      <SchemaMarkup
        schemas={[breadcrumbSchema, faqSchema, orgSchema, localBusinessSchema]}
      />

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-cream border-b border-gray-200 py-3 px-6"
      >
        <ol className="max-w-7xl mx-auto flex items-center gap-x-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-navy transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li className="text-navy font-medium" aria-current="page">
            Become a Dealer
          </li>
        </ol>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-copper/20 text-copper text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Dealer Partnership Programme
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight">
              Partner With India&apos;s Premium Acrylic Panel Brand
            </h1>
            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-xl">
              Join a network of 80+ authorised dealers across India. Represent
              Suraj Wood&apos;s premium ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, and
              ACRYGLASS MATTE panel collections and build a profitable business
              in the growing interior surfaces market.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#dealer-form"
                className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-300"
              >
                Apply for Dealership
              </a>
              <a
                href="tel:+919009171819"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-7 py-3.5 rounded-lg transition-colors duration-300 border border-white/20"
              >
                Call: +91-9009171819
              </a>
            </div>
          </div>

          {/* Stats card */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "80+", label: "Active Dealer Partners" },
              { value: "15+", label: "Years in Business" },
              { value: "50+", label: "Premium Finishes" },
              { value: "10K+", label: "Projects Delivered" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/10 rounded-xl p-6 text-center border border-white/10"
              >
                <div className="font-heading font-bold text-3xl text-copper">
                  {value}
                </div>
                <div className="text-white/60 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-navy">
              Why Partner with Suraj Wood?
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We build long-term partnerships — not transactional vendor
              relationships. Here is what you get as a Suraj Wood authorised
              dealer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEALER_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-5 p-6 rounded-2xl bg-cream border border-gray-100"
              >
                <div
                  className="w-12 h-12 bg-copper/10 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  aria-hidden="true"
                >
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dealer Tiers ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-navy text-center mb-12">
            Dealer Programme Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Authorised Dealer",
                volume: "50–200 sheets/month",
                badge: "bg-gray-100 text-gray-700",
                perks: [
                  "Standard dealer margins",
                  "Sample kit & brochures",
                  "Website listing",
                  "WhatsApp support",
                  "30-day credit terms",
                ],
              },
              {
                tier: "Preferred Dealer",
                volume: "200–500 sheets/month",
                badge: "bg-copper/10 text-copper",
                highlight: true,
                perks: [
                  "Enhanced margins (+2%)",
                  "Priority stock allocation",
                  "Co-branded marketing",
                  "Dedicated account manager",
                  "45-day credit terms",
                  "Quarterly bonus scheme",
                ],
              },
              {
                tier: "Platinum Dealer",
                volume: "500+ sheets/month",
                badge: "bg-navy/10 text-navy",
                perks: [
                  "Best-in-market margins (+4%)",
                  "Exclusive territory rights",
                  "Custom sample room setup",
                  "Lead referral programme",
                  "60-day credit terms",
                  "Annual performance bonus",
                  "Factory visit & training",
                ],
              },
            ].map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-2xl p-7 border ${
                  tier.highlight
                    ? "bg-white border-copper shadow-lg shadow-copper/10"
                    : "bg-white border-gray-100"
                }`}
              >
                {tier.highlight && (
                  <div className="text-xs font-semibold text-copper uppercase tracking-wider mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading font-bold text-navy text-xl">
                  {tier.tier}
                </h3>
                <div
                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full mt-2 mb-5 ${tier.badge}`}
                >
                  {tier.volume}
                </div>
                <ul className="space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <span className="text-copper mt-0.5 shrink-0">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage Map (text-based) ─────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading font-bold text-3xl text-navy mb-3">
                Current Dealer Coverage
              </h2>
              <p className="text-gray-600 mb-8">
                Active dealer network across India&apos;s major metros, with ongoing
                expansion into tier-2 markets. Cities marked{" "}
                <span className="font-medium text-green-600">Active</span> have
                established dealer partners.{" "}
                <span className="font-medium text-amber-600">Recruiting</span>{" "}
                cities have open territory available.
              </p>
              <div className="space-y-3">
                {COVERAGE_REGIONS.map((region) => (
                  <div
                    key={region.city}
                    className="flex items-start gap-4 p-4 rounded-xl bg-cream border border-gray-100"
                  >
                    <div className="shrink-0 mt-0.5">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          region.status === "Active"
                            ? "bg-green-500"
                            : "bg-amber-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-navy text-sm">
                          {region.city}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            region.status === "Active"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {region.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {region.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA aside */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-navy rounded-2xl p-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-3">
                  Ready to Apply?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Our partnership team reviews all applications within 48 hours.
                  We look for dealers with an established interior materials or
                  hardware business and a genuine customer base of architects,
                  interior designers, or modular kitchen OEMs.
                </p>
                <div className="space-y-3 text-sm">
                  {[
                    "Active business in interior materials, hardware, or plywood trade",
                    "Showroom or trade counter (preferred, not mandatory)",
                    "Network of architects, designers, or kitchen OEM manufacturers",
                    "Ability to maintain buffer stock of 20-30 sheets",
                  ].map((req) => (
                    <div key={req} className="flex gap-2.5 items-start">
                      <span className="text-copper mt-0.5 shrink-0">→</span>
                      <span className="text-white/75">{req}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#dealer-form"
                  className="mt-7 block text-center bg-copper hover:bg-copper-light text-white font-semibold py-3.5 rounded-lg transition-colors duration-300"
                >
                  Apply Now
                </a>
                <a
                  href="tel:+919009171819"
                  className="mt-3 block text-center text-white/60 text-sm hover:text-white transition-colors"
                >
                  Or call +91-9009171819 to speak directly with our dealer team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dealer Application Form ─────────────────────────────────────── */}
      <section id="dealer-form" className="bg-cream py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl text-navy">
                Dealer Application Form
              </h2>
              <p className="text-gray-600 mt-3">
                Complete this form and our dealer partnership team will get back
                to you within 48 hours.
              </p>
            </div>
            <DealerForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-navy text-center mb-10">
            Dealer Programme FAQ
          </h2>
          <div className="space-y-4">
            {DEALER_FAQ.map((faq, i) => (
              <details
                key={i}
                className="group bg-cream rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex justify-between items-start gap-4 p-5 cursor-pointer list-none font-medium text-navy hover:text-copper transition-colors">
                  <span>{faq.question}</span>
                  <span
                    className="text-copper text-xl shrink-0 group-open:rotate-45 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-14 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #8B5522 0%, #1B2A4A 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-white mb-3">
            Questions About the Dealer Programme?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Our sales team is available Monday to Saturday, 9am–6pm.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+919009171819"
              className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-7 py-3.5 rounded-lg hover:bg-cream transition-colors"
            >
              Call +91-9009171819
            </a>
            <a
              href="https://wa.me/919009171819?text=Hi,%20I%27m%20interested%20in%20becoming%20a%20SurajWood%20dealer."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-7 py-3.5 rounded-lg transition-colors border border-white/20"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
