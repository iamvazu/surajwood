import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "About Us – Premium Acrylic Panel Manufacturer | SurajWood",
  description:
    "Suraj Wood Products Pvt. Ltd. manufactures India's finest acrylic panels at our facility in Bahadurgarh, Haryana. Discover our story, European technology, and 15+ years of manufacturing excellence.",
  openGraph: {
    title: "About Suraj Wood – Acrylic Panel Manufacturer, Bahadurgarh",
    description:
      "Learn how Suraj Wood Products Pvt. Ltd. brings European PMMA acrylic technology to Indian interiors. 15+ years. 50+ finishes. Pan-India delivery.",
    url: "https://www.surajwood.com/about",
    images: [
      {
        url: "/images/about/about-bg.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood Manufacturing Facility",
      },
    ],
  },
  alternates: { canonical: "https://www.surajwood.com/about" },
};

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const manufacturingSteps = [
  {
    step: 1,
    title: "Raw Material Selection",
    description:
      "We source only premium-grade PMMA acrylic sheets and high-density MDF/HDF substrates. Every batch is tested for consistency in thickness, density, and colour before entering production.",
  },
  {
    step: 2,
    title: "German PUR Bonding",
    description:
      "Using German-engineered PUR (Polyurethane Reactive) hotmelt adhesive, the acrylic surface is bonded to the substrate under precise temperature and pressure. This creates a permanent bond that never delaminates — even under Indian climatic conditions.",
  },
  {
    step: 3,
    title: "Quality Control Testing",
    description:
      "Each panel undergoes scratch resistance testing (3H pencil hardness), UV stability tests, moisture exposure tests, and rigorous visual inspection before packaging. Our reject rate is under 0.3%.",
  },
  {
    step: 4,
    title: "Precision Cutting & Finishing",
    description:
      "Panels are precision-cut to 8 ft × 4 ft standard sheets, edge-finished, and individually wrapped in protective film for damage-free delivery to every corner of India.",
  },
];

const stats = [
  { value: "15+", label: "Years of Manufacturing Excellence" },
  { value: "50+", label: "Premium Finishes Available" },
  { value: "10,000+", label: "Projects Completed" },
  { value: "2", label: "Delivery Centres (Delhi & Bangalore)" },
];

const leadership = [
  {
    initials: "MS",
    name: "Mayank Singhal",
    role: "Director",
    bio: "Leads manufacturing operations and quality standards with a focus on continuous improvement and technological advancement.",
  },
  {
    initials: "DH",
    name: "Dhruv",
    role: "Director",
    bio: "Drives business development, dealer partnerships, and customer relationships across India's growing interior design market.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "About Us", url: "https://www.surajwood.com/about" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Hero Banner                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background image with navy fallback */}
        <div className="absolute inset-0 bg-navy">
          <Image
            src="/images/about/about-bg.jpg"
            alt="SurajWood manufacturing facility in Bahadurgarh, Haryana"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-copper">›</li>
              <li className="text-white font-medium">About Us</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Crafting India&apos;s Premium Acrylic Surfaces
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            European technology. Indian manufacturing. Pan-India delivery.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Our Story                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: image */}
            <div className="relative rounded-xl overflow-hidden shadow-product aspect-[4/3]">
              <Image
                src="/images/about/palex.jpg"
                alt="SurajWood acrylic panel manufacturing — flat lamination line"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right: text */}
            <div>
              <p className="text-copper font-medium text-sm uppercase tracking-widest mb-2">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                Two Decades of Surface Excellence
              </h2>
              <div className="space-y-4 text-navy/75 leading-relaxed">
                <p>
                  Founded with a vision to bring European-quality acrylic surface technology to
                  Indian interiors, Suraj Wood Products Pvt. Ltd. has grown to become one of
                  India&apos;s most trusted acrylic panel manufacturers.
                </p>
                <p>
                  Our journey began with a simple belief: that Indian homes and commercial spaces
                  deserved the same quality surfaces available in Europe and the Middle East.
                  Today, from our state-of-the-art manufacturing facility at{" "}
                  <strong className="text-navy">
                    45 KM Stone, VPO Rohad, Bahadurgarh, Haryana
                  </strong>
                  , we serve architects, interior designers, contractors, and homeowners across
                  the country.
                </p>
                <p>
                  What sets us apart is our commitment to manufacturing excellence. We use{" "}
                  <strong className="text-navy">
                    PMMA (Polymethyl Methacrylate) acrylic bonded to premium MDF and HDF
                    substrates
                  </strong>{" "}
                  using{" "}
                  <strong className="text-navy">
                    German PUR hotmelt adhesive technology
                  </strong>{" "}
                  — the same process used by the world&apos;s leading panel manufacturers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Manufacturing Process                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-copper font-medium text-sm uppercase tracking-widest mb-2">
              How We Make It
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
              Our Manufacturing Process
            </h2>
            <p className="mt-3 text-navy/60 max-w-xl mx-auto">
              Every Suraj Wood panel goes through a rigorous 4-stage process before it reaches
              your project.
            </p>
          </div>

          {/* Timeline — horizontal on md+, vertical on mobile */}
          <div className="relative">
            {/* Horizontal connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-cream-dark z-0" />

            <div className="grid md:grid-cols-4 gap-8">
              {manufacturingSteps.map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  {/* Step number bubble */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-copper flex items-center justify-center shadow-copper mb-5 shrink-0">
                    <span className="text-2xl font-heading font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-heading font-semibold text-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-navy/65 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — Stats Banner                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-4xl md:text-5xl font-heading font-bold text-copper mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-white/75 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 5 — Mission & Vision                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-cream rounded-2xl p-8 border border-cream-dark">
              <div className="w-12 h-12 rounded-xl bg-copper/15 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-copper"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">Our Mission</h3>
              <p className="text-navy/70 leading-relaxed">
                To manufacture premium acrylic panels that enhance interior spaces through
                superior quality, innovative design, and reliable performance — making
                European-quality surfaces accessible to every Indian interior.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-navy rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-copper/25 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-copper-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To become India&apos;s most trusted acrylic surface brand, setting new benchmarks
                in quality, design, and manufacturing excellence while supporting the growth of
                India&apos;s interior design industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 6 — Leadership Team                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-copper font-medium text-sm uppercase tracking-widest mb-2">
            Our Leadership
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-12">
            The People Behind SurajWood
          </h2>

          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-2xl p-8 shadow-product flex flex-col items-center text-center"
              >
                {/* Avatar initials */}
                <div
                  className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mb-4 shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-xl font-heading font-bold text-copper">
                    {person.initials}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-semibold text-navy">{person.name}</h3>
                <p className="text-copper text-sm font-medium mb-3">{person.role}</p>
                <p className="text-navy/65 text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 7 — CTA                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-copper">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Experience Suraj Wood Quality
          </h2>
          <p className="text-white/85 text-lg mb-8">
            Request a free sample kit and see the difference in person.
          </p>
          <Link
            href="/contact#sample"
            className="inline-flex items-center gap-2 bg-white text-copper font-semibold px-8 py-3 rounded-lg hover:bg-cream transition-colors shadow-lg"
          >
            Request Free Sample
          </Link>
        </div>
      </section>
    </>
  );
}
