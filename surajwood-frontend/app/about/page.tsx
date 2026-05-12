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
  title: "Manufacturing Excellence | Factory-Direct Acrylic Panels | SurajWood",
  description:
    "SurajWood is a leading factory-direct manufacturer of PMMA acrylic panels in Bahadurgarh, Haryana. Utilizing German PUR technology for zero-delamination and 3H scratch resistance.",
  openGraph: {
    title: "SurajWood Manufacturing Authority | 15+ Years Excellence",
    description:
      "Direct from our Bahadurgarh facility: European-grade acrylic surfaces precision-bonded for the Indian climate.",
    url: "https://www.surajwood.com/about",
    images: [{ url: "/images/about/about-bg.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.surajwood.com/about" },
};



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
      {/* Section 1 — Hero Banner (Luxury Alignment)                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-[80vh] min-h-[580px] max-h-[850px] flex flex-col justify-center overflow-hidden">
        {/* Background Image with Ken Burns (Matching Home) */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/about/about-bg.jpg"
              alt="SurajWood Bahadurgarh Manufacturing Facility"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Sophisticated Gradients (Matching Home) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        {/* Spacer to clear sticky navbar */}
        <div className="h-32 lg:h-40" />

        {/* Content Area (Left Aligned) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                MANUFACTURING EXCELLENCE SINCE 2011
              </p>
            </div>

            {/* H1: Playfair Display Serif */}
            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-7xl leading-[1.1] mb-6">
              India&apos;s Technical Authority in <br />
              <span className="text-copper">Acrylic Manufacturing</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-xl max-w-2xl leading-relaxed mb-8 font-light italic">
              From our state-of-the-art Bahadurgarh facility, we engineer surfaces that outperform PETG and standard laminates through German PUR technology.
            </p>

            {/* Optional CTA or Scroll Indicator link could go here, but kept clean for About */}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — The Factory Edge                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cream -z-10 rounded-full" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-cream">
                <Image
                  src="/images/about/palex.jpg"
                  alt="Precision Lamination Line"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-navy text-white p-8 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-copper">100%</div>
                <div className="text-xs uppercase tracking-widest font-semibold mt-1">Zero Delamination</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mb-8 leading-tight">
                Behind the Surface: <br/>The Bahadurgarh Advantage
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  At Suraj Wood Products, we don&apos;t just sell panels; we engineer them. Located at <strong className="text-navy">45 KM Stone, Bahadurgarh</strong>, our facility is designed around a single goal: absolute surface perfection.
                </p>
                <p>
                  Unlike local manual lamination, our **Factory-Direct** process uses automated flat-lamination lines. We utilize <strong className="text-navy">German PUR (Polyurethane) Hotmelt</strong>, which creates a chemical bond that is impervious to the humidity and heat of the Indian climate.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="bg-cream/50 p-4 rounded-xl border border-cream">
                      <div className="font-bold text-navy">Optical-Grade</div>
                      <div className="text-sm">PMMA Polymer</div>
                   </div>
                   <div className="bg-cream/50 p-4 rounded-xl border border-cream">
                      <div className="font-bold text-navy">3H Hardness</div>
                      <div className="text-sm">Scratch Resistance</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Visual Tour (m1, m2, m3)                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-heading font-bold text-navy mb-16 uppercase tracking-widest">Manufacturing Blueprint</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: "m1.jpg", title: "PUR Lamination Line", desc: "Automated German line for void-free bonding." },
              { img: "m2.jpg", title: "Precision Calibration", desc: "Digital sensors ensure micron-level thickness accuracy." },
              { img: "m3.jpg", title: "Dust-Free Environment", desc: "Controlled atmosphere for mirror-like optical clarity." }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <Image 
                    src={`/images/about/${item.img}`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ... Rest of stats, mission, vision, leadership ... */}
      {/* Leadership stays but refined */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mb-16">The Directors</h2>
          <div className="grid md:grid-cols-2 gap-12">
             {leadership.map((person) => (
               <div key={person.name} className="flex flex-col items-center bg-cream/30 p-10 rounded-[40px] border border-cream group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-copper mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <Image
                      src={`/images/about/director-${person.initials.toLowerCase()}.jpg`}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">{person.name}</h3>
                  <div className="text-copper font-semibold text-sm uppercase tracking-widest mt-2 mb-4">{person.role}</div>
                  <p className="text-gray-600 leading-relaxed text-sm">{person.bio}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Image src="/images/about/m1.jpg" alt="bg" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">Ready for a Factory Tour?</h2>
           <p className="text-white/70 text-lg mb-12">Visit our Bahadurgarh facility to see the ACRYLUX production line in action.</p>
           <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="bg-copper text-white px-10 py-4 rounded-full font-bold hover:bg-copper-light transition-all shadow-xl shadow-copper/20">Schedule a Visit</Link>
              <Link href="/contact#sample" className="border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">Request Samples</Link>
           </div>
        </div>
      </section>
    </>
  );
}
