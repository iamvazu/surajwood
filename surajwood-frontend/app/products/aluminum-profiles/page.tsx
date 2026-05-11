import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Hammer, Lightbulb, Maximize, Settings } from "lucide-react";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "AL-PROFHAN Aluminum Profiles — Premium Furniture Hardware",
  description:
    "Explore the AL-PROFHAN series of premium aluminum profiles by SurajWood. Ottimo Gola handles, Aerolinea glass shutters, Luminare LED profiles, and Velaro sliding systems for modular furniture.",
  alternates: { canonical: "https://www.surajwood.com/products/aluminum-profiles" },
  openGraph: {
    title: "AL-PROFHAN Aluminum Profiles — SurajWood Manufacturing",
    description:
      "Precision-engineered aluminum profiles for modern kitchens and wardrobes. Ottimo, Aerolinea, Luminare & Velaro series.",
    url: "https://www.surajwood.com/products/aluminum-profiles",
    images: [
      {
        url: "/images/banner/bg2.jpg",
        width: 1200,
        height: 630,
        alt: "AL-PROFHAN Aluminum Profiles by SurajWood",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SERIES = [
  {
    id: "ottimo",
    name: "Ottimo Series",
    tagline: "Integrated Gola & Profile Handles",
    description:
      "Handleless kitchen solutions with a seamless, minimalistic aesthetic. Available in Rose Gold, Black Graphite, and Champagne finishes.",
    features: ["Hidden integrated design", "Ergonomic grip", "Scratch-resistant anodizing"],
    image: "/images/gallery/kitchen-1.jpg",
    icon: <Maximize className="text-copper" size={24} />,
  },
  {
    id: "aerolinea",
    name: "Aerolinea Series",
    tagline: "Premium Glass Shutter Profiles",
    description:
      "Slim-line aluminum frames for glass shutters. Perfect for display cabinets and premium wardrobe shutters with a contemporary look.",
    features: ["Ultra-slim profile", "Compatible with 4mm-6mm glass", "Concealed corner joints"],
    image: "/images/gallery/wardrobe-1.jpg",
    icon: <Settings className="text-copper" size={24} />,
  },
  {
    id: "luminare",
    name: "Luminare Series",
    tagline: "LED Integrated Profiles",
    description:
      "Functional lighting solutions integrated into cabinetry. Designed for heat dissipation and uniform light diffusion.",
    features: ["Optimized heat dissipation", "Spot-free diffusion", "Standard 12V/24V compatibility"],
    image: "/images/gallery/commercial-1.jpg",
    icon: <Lightbulb className="text-copper" size={24} />,
  },
  {
    id: "velaro",
    name: "Velaro Series",
    tagline: "Wardrobe Sliding Systems",
    description:
      "High-precision sliding tracks and profiles for smooth, silent wardrobe operations. Heavy-duty load bearing capacity.",
    features: ["Silent-glide technology", "Up to 80kg load capacity", "Anti-jump safety mechanism"],
    image: "/images/gallery/wardrobe-2.jpg",
    icon: <Hammer className="text-copper" size={24} />,
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AluminumProfilesPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Products", url: "https://www.surajwood.com/products" },
      { name: "Aluminum Profiles", url: "https://www.surajwood.com/products/aluminum-profiles" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="bg-navy pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-3">
                Hardware Excellence
              </p>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
                AL-PROFHAN <br />
                <span className="text-copper-light">Aluminum Profiles</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Precision-engineered aluminum solutions for the modern furniture industry. 
                Our profiles are designed for seamless integration with SurajWood acrylic panels, 
                offering a unified aesthetic for premium interiors.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/downloads"
                  className="bg-copper hover:bg-copper-dark text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 text-sm shadow-lg shadow-copper/20"
                >
                  Download Technical Catalog
                </Link>
                <Link
                  href="/contact"
                  className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-all duration-300 text-sm"
                >
                  Request Quotation
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/banner/bg2.jpg"
                alt="AL-PROFHAN Aluminum Profiles"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Grade", val: "6063 T5", desc: "Aircraft-grade aluminum" },
              { label: "Finishes", val: "12+", desc: "Anodized & Powder Coated" },
              { label: "Stock", val: "Ready", desc: "Pan-India Availability" },
              { label: "Standard", val: "European", desc: "Technical Tolerances" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{stat.label}</p>
                <p className="font-heading font-bold text-2xl text-navy">{stat.val}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Series Grid */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {SERIES.map((item, idx) => (
              <div 
                key={item.id} 
                id={item.id}
                className={`flex flex-col gap-8 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="lg:w-1/2 relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="mb-4">{item.icon}</div>
                  <h2 className="font-heading font-bold text-3xl text-navy mb-2">{item.name}</h2>
                  <p className="text-copper font-semibold text-sm mb-4 uppercase tracking-wider">{item.tagline}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-copper/10 flex items-center justify-center text-copper">
                          <CheckIcon size={12} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/downloads"
                    className="inline-flex items-center gap-2 text-navy font-bold hover:text-copper transition-colors"
                  >
                    View Specs →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl text-white mb-6">
            Partner with India\u0027s Premier <br />
            Aluminum Profile Manufacturer
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed">
            We offer customized OEM solutions and bulk supply for furniture manufacturers and retailers. 
            Connect with our technical team to discuss your project requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-copper hover:bg-copper-dark text-white font-bold px-10 py-4 rounded-full transition-all"
            >
              Get a Callback
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckIcon({ size = 16 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
