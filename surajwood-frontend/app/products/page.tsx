import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Acrylic Panels, Membrane Shutters & Aluminum Profiles | Product Index",
  description: "Browse the complete range of SurajWood products, including ACRYLUX acrylic panels, Continental 3D Membrane Shutters, and AL-PROFHAN aluminum hardware profiles.",
};

const categories = [
  {
    title: "PMMA Acrylic Panels",
    desc: "Factory-prelaminated acrylic panels using German PUR technology. Superior to PETG and standard laminates.",
    image: "/images/banner/bg3.jpg",
    link: "/products/acrylux",
    items: [
      { name: "ACRYLUX", href: "/products/acrylux", tag: "High Gloss / Wood" },
      { name: "ACRYSILK", href: "/products/acrysilk", tag: "Silk Touch" },
      { name: "ACRYMATTE", href: "/products/acrymatte", tag: "Anti-Fingerprint" },
      { name: "ACRYGLASS", href: "/products/acryglass", tag: "Mirror Finish" },
      { name: "ACRYGLASS MATTE", href: "/products/acryglass-matte", tag: "Matte Glass" },
    ],
  },
  {
    title: "Continental Membrane Shutters",
    desc: "3D vacuum thermoformed seamless shutters with zero edge-banding seams. 36 European shades across Wood Grain, Porcelain, Silk, and Ceramic finishes on moisture-resistant HDMR cores.",
    image: "/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg",
    link: "/products/membrane-shutters",
    items: [
      { name: "Wood Grain (WG)", href: "/products/membrane-shutters#shades-explorer", tag: "9 Natural Oak & Walnut Shades" },
      { name: "Porcelain Touch (PT)", href: "/products/membrane-shutters#shades-explorer", tag: "13 Matte Shades" },
      { name: "Perfect Silk (PS)", href: "/products/membrane-shutters#shades-explorer", tag: "7 Silk Shades" },
      { name: "Ceramic Satin (CS)", href: "/products/membrane-shutters#shades-explorer", tag: "7 Mineral Shades" },
    ],
  },
  {
    title: "Aluminum Profiles",
    desc: "AL-PROFHAN series: Precision-engineered hardware profiles for glass shutters, wardrobes, and modular kitchens.",
    image: "/images/banner/bg2.jpg",
    link: "/products/aluminum-profiles",
    items: [
      { name: "Ottimo Series", href: "/products/aluminum-profiles#ottimo", tag: "Gola Handles" },
      { name: "Aerolinea", href: "/products/aluminum-profiles#aerolinea", tag: "Shutter Profiles" },
      { name: "Luminare", href: "/products/aluminum-profiles#luminare", tag: "LED Integrated" },
      { name: "Velaro", href: "/products/aluminum-profiles#velaro", tag: "Sliding Systems" },
    ],
  },
];

export default function ProductsHubPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-copper tracking-[0.3em] text-xs uppercase font-bold mb-4">The Complete Index</p>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-navy leading-tight">
            Our Product <span className="text-copper">Ecosystem</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            From factory-bonded acrylic surfaces to precision-engineered aluminum hardware, 
            explore the components that define modern Indian interiors.
          </p>
        </div>

        <div className="space-y-20">
          {categories.map((cat, idx) => (
            <div key={cat.title} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/20" />
              </div>
              
              <div className="w-full lg:w-1/2">
                <h2 className="font-heading font-bold text-3xl text-navy mb-4">{cat.title}</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {cat.desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-copper transition-all"
                    >
                      <div>
                        <p className="font-bold text-navy group-hover:text-copper transition-colors">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{item.tag}</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-copper group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>

                <div className="mt-10">
                  <Link
                    href={cat.link}
                    className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-xl font-bold hover:bg-navy-light transition-all shadow-lg"
                  >
                    View All {cat.title} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
