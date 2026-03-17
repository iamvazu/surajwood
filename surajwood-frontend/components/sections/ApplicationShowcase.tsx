"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

interface TabData {
  value: string;
  label: string;
  slug: string;
  images: string[];
  title: string;
  description: string;
  bullets: string[];
  cta: string;
}

const TABS: TabData[] = [
  {
    value: "kitchens",
    label: "Kitchens",
    slug: "kitchens",
    images: [
      "/images/gallery/kitchen-1.jpg",
      "/images/gallery/kitchen-2.jpg",
      "/images/gallery/kitchen-3.jpg",
      "/images/gallery/kitchen-4.jpg",
    ],
    title: "Premium Acrylic Kitchen Panels",
    description:
      "Transform your kitchen into a showpiece. ACRYLUX and ACRYGLASS panels are heat-resistant, moisture-proof, and maintenance-free for the modern Indian kitchen. Engineered to handle daily cooking, humidity, and the extremes of the Indian climate without fading or warping.",
    bullets: [
      "Easy to clean — wipe with a damp cloth",
      "Heat resistant up to 80°C",
      "Moisture and humidity resistant",
      "UV-stable colour for lasting vibrancy",
    ],
    cta: "Explore Kitchen Solutions",
  },
  {
    value: "wardrobes",
    label: "Wardrobes",
    slug: "wardrobes",
    images: [
      "/images/gallery/wardrobe-1.jpg",
      "/images/gallery/wardrobe-2.jpg",
      "/images/gallery/wardrobe-3.jpg",
      "/images/gallery/wardrobe-4.jpg",
    ],
    title: "Elegant Wardrobe Finishes",
    description:
      "Create wardrobes that look stunning for years. Our matte and satin finishes are perfect for bedroom furniture with their anti-fingerprint surfaces. ACRYSILK and ACRYMATTE panels bring a refined, tactile quality to every wardrobe door.",
    bullets: [
      "Anti-fingerprint coating",
      "Soft-close compatible",
      "50+ colour options",
      "5-year warranty",
    ],
    cta: "Explore Wardrobe Solutions",
  },
  {
    value: "commercial",
    label: "Commercial Spaces",
    slug: "commercial",
    images: [
      "/images/gallery/commercial-1.jpg",
      "/images/gallery/commercial-2.jpg",
      "/images/gallery/commercial-3.jpg",
      "/images/gallery/commercial-4.jpg",
    ],
    title: "Commercial & Office Interiors",
    description:
      "From corporate offices to retail stores, our high-performance acrylic panels deliver premium aesthetics at scale. ACRYGLASS panels are especially popular for reception areas and retail fixtures where first impressions matter.",
    bullets: [
      "High-traffic durability",
      "Easy maintenance",
      "Fire-rated B1",
      "Custom sizing available",
    ],
    cta: "Explore Commercial Solutions",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ApplicationShowcase() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-copper tracking-widest text-sm uppercase font-medium mb-3">
            Applications
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy leading-tight">
            Beautiful in Every Room
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            From sleek kitchens to elegant wardrobes and professional commercial
            spaces — SurajWood panels elevate every environment.
          </p>
        </div>

        <Tabs.Root defaultValue="kitchens">
          {/* Tab list */}
          <Tabs.List className="flex gap-1 bg-white p-1 rounded-full max-w-sm mx-auto mb-10 shadow-sm">
            {TABS.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex-1 text-sm font-semibold py-2.5 px-4 rounded-full transition-all duration-250
                  text-gray-500 hover:text-navy
                  data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-navy"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Tab panels */}
          {TABS.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center outline-none"
            >
              {/* Image grid */}
              <div className="grid grid-cols-2 gap-3">
                {tab.images.map((src, i) => (
                  <div
                    key={src}
                    className={`relative rounded-xl overflow-hidden ${
                      i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${tab.title} – example ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-5">
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-snug">
                  {tab.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{tab.description}</p>

                {/* Bullet points */}
                <ul className="flex flex-col gap-2.5 mt-1">
                  {tab.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-copper/15 flex items-center justify-center text-copper font-bold text-xs">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/applications/${tab.slug}`}
                  className="inline-flex items-center gap-2 mt-2 text-copper font-semibold hover:underline underline-offset-2 transition-colors"
                >
                  {tab.cta} →
                </Link>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
