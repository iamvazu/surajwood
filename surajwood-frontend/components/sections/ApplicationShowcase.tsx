"use client";

import Image from "next/image";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

interface ApplicationCategory {
  slug: string;
  label: string;
  image: string;
  tagline: string;
}

const APPLICATIONS: ApplicationCategory[] = [
  {
    slug: "kitchens",
    label: "Kitchens",
    image: "/images/gallery/kitchen-1.jpg",
    tagline: "Heat-resistant, moisture-proof panels",
  },
  {
    slug: "wardrobes",
    label: "Wardrobes",
    image: "/images/gallery/wardrobe-1.jpg",
    tagline: "Anti-fingerprint matte & satin finishes",
  },
  {
    slug: "commercial",
    label: "Commercial Spaces",
    image: "/images/gallery/commercial-premium.png",
    tagline: "High-traffic durability, Class B1 rated",
  },
  {
    slug: "retail",
    label: "Retail Display",
    image: "/images/gallery/retail-1.jpg",
    tagline: "First impressions that last",
  },
  {
    slug: "bathrooms",
    label: "Bathroom Vanities",
    image: "/images/gallery/bathroom-1.jpg",
    tagline: "Water-resistant, easy-clean luxury",
  },
  {
    slug: "tv-units",
    label: "TV Units",
    image: "/images/gallery/tv-unit-1.jpg",
    tagline: "Glossy finishes for modern media centers",
  },
  {
    slug: "offices",
    label: "Office Spaces",
    image: "/images/gallery/office-1.jpg",
    tagline: "Professional surfaces for focused work",
  },
  {
    slug: "kids-rooms",
    label: "Children's Rooms",
    image: "/images/gallery/kids-1.jpg",
    tagline: "Non-toxic, vibrant, and durable",
  },
  {
    slug: "wall-paneling",
    label: "Wall Paneling",
    image: "/images/gallery/wall-1.jpg",
    tagline: "Statement walls with mirror-like clarity",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ApplicationShowcase() {
  return (
    <section className="bg-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — compact */}
        <div className="text-center mb-8">
          <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-2">
            Applications
          </p>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-tight">
            Beautiful in Every Room
          </h2>
        </div>

        {/* 6-category image grid — all visible in one viewport */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {APPLICATIONS.map((app, i) => (
            <Link
              key={`${app.slug}-${i}`}
              href={`/applications/${app.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] block"
            >
              <Image
                src={app.image}
                alt={`${app.label} — SurajWood acrylic panels`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-heading font-bold text-white text-base leading-snug">
                  {app.label}
                </h3>
                <p className="text-white/70 text-xs mt-0.5">
                  {app.tagline}
                </p>
                <span className="inline-block mt-2 text-copper text-xs font-semibold group-hover:underline underline-offset-2 transition-all">
                  View Projects →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
