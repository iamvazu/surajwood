import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Hammer, Lightbulb, Maximize, Settings, Zap, Layers, Package, Palette, Download, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "AL-PROFHAN by Suraj Wood | Premium Aluminum Profiles & Hardware",
  description:
    "Explore the AL-PROFHAN series of premium aluminum profiles. Ottimo, Aerolinea, Luminare, and Velaro series — precision-engineered for modular kitchens and wardrobes.",
  alternates: { canonical: "https://www.surajwood.com/products/aluminum-profiles" },
  openGraph: {
    title: "AL-PROFHAN Aluminum Profiles — SurajWood Manufacturing",
    description:
      "Precision-engineered aluminum profiles for modern kitchens and wardrobes. Ottimo, Aerolinea, Luminare & Velaro series.",
    url: "https://www.surajwood.com/products/aluminum-profiles",
    images: [
      {
        url: "/images/products/aluminum/ottimo.png",
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
    name: "OTTIMO SERIES",
    tagline: "Integrated Gola & Profile Handles",
    description: "The gold standard for handleless kitchen design, offering a seamless and ergonomic grip system for the modern home.",
    image: "/images/products/aluminum/ottimo.png",
    icon: <Maximize className="text-copper" size={24} />,
    products: [
      { code: "PAPS-5220", desc: "Aluminum Shutter L Profile Handle with Gasket", size: "3mtr" },
      { code: "PAPS-5221", desc: "Aluminum Shutter C Profile Handle", size: "3mtr" },
      { code: "PAPS-5311", desc: "Aluminum Wall Gola Profile Handle with Gasket", size: "3mtr" },
      { code: "PAPS-5313", desc: "Aluminum 3 Side Profile", size: "3mtr" },
    ]
  },
  {
    id: "aerolinea",
    name: "AEROLINEA SERIES",
    tagline: "Premium Shutter & Edge Profiles",
    description: "Slim-line architectural frames designed for minimalist glass shutters and clean cabinetry edges with a contemporary aesthetic.",
    image: "/images/products/aluminum/aerolinea.png",
    icon: <Settings className="text-copper" size={24} />,
    products: [
      { code: "PAPS-6631", desc: "Aluminum Shutter L Profile Handle with Gasket", size: "3mtr" },
      { code: "PAPS-6632", desc: "Aluminum Shutter C Profile Handle", size: "3mtr" },
      { code: "PAPS-6634", desc: "Aluminum Edge Profile / T Patti", size: "3mtr" },
    ]
  },
  {
    id: "handle",
    name: "HANDLE PROFILES",
    tagline: "Ergonomic Shutter Solutions",
    description: "High-precision J and L profile handles engineered for effortless operation in high-end wardrobes and modular kitchens.",
    image: "/images/banner/pro5.jpg",
    icon: <Hammer className="text-copper" size={24} />,
    products: [
      { code: "PAPS-1336", desc: "Aluminum Shutter L Profile Handle", size: "3mtr" },
      { code: "PAPS-5677", desc: "Aluminum Shutter J Profile Handle with Gasket", size: "3mtr" },
      { code: "PAPS-1335", desc: "Aluminum Shutter Profile Handle with Gasket", size: "3mtr" },
    ]
  },
  {
    id: "shelf",
    name: "SHELF PROFILES",
    tagline: "Architectural Glass Support",
    description: "Specialized aluminum profiles for glass shelves with integrated structural support and lighting readiness for retail and luxury interiors.",
    image: "/images/banner/pro6.jpg",
    icon: <Layers className="text-copper" size={24} />,
    products: [
      { code: "PAPS-5037", desc: "Aluminum Profile for Glass Shelf", size: "3mtr" },
      { code: "PAPS-5037A", desc: "Aluminum Profile for LED Glass Shelf", size: "3mtr" },
    ]
  },
  {
    id: "luminare",
    name: "LUMINARE SERIES",
    tagline: "LED Integrated Lighting Profiles",
    description: "Functional lighting ecosystems designed for optimal heat dissipation and spot-free diffusion in high-end cabinetry.",
    image: "/images/products/aluminum/luminare.png",
    icon: <Lightbulb className="text-copper" size={24} />,
    products: [
      { code: "PAPS-3136A", desc: "Aluminum 45° Degree LED Light Profile", size: "3mtr" },
      { code: "PAPS-3062A", desc: "Aluminum LED Light Profile", size: "3mtr" },
    ]
  },
  {
    id: "hanging",
    name: "HANGING ROD",
    tagline: "Wardrobe Illumination Systems",
    description: "Premium aluminum wardrobe rods with integrated LED capabilities, creating a boutique walk-in closet experience.",
    image: "/images/gallery/wardrobe-3.jpg",
    icon: <Zap className="text-copper" size={24} />,
    products: [
      { code: "PAPS-6413", desc: "Aluminum LED Hanging Rod for Clothes", size: "3mtr" },
      { code: "PACP-6414", desc: "Aluminum Clothes Hanging Bracket", size: "2pc" },
    ]
  },
  {
    id: "velaro",
    name: "VELARO SERIES",
    tagline: "Luxury Glass Shutter Systems",
    description: "High-precision sliding and fixed glass shutter profiles for sophisticated furniture design and architectural partitioning.",
    image: "/images/banner/pro4.jpg",
    icon: <Package className="text-copper" size={24} />,
    products: [
      { code: "PAPS-1351A", desc: "Glass Shutter Profile with Gasket", size: "3mtr" },
      { code: "PAHD-1351C", desc: "Aluminum Handle (128mm)", size: "4pc" },
    ]
  },
];

const FINISHES = [
  { name: "Black Brush", color: "#1A1A1A" },
  { name: "Bronze Brush", color: "#8C6A3E" },
  { name: "Coffee Painted", color: "#4B3621" },
  { name: "Anthracite Painted", color: "#36454F" },
  { name: "Champagne Painted", color: "#F7E7CE", note: "(Velaro series only)" },
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

      {/* Hero (Perfect Alignment with Home) */}
      <section className="relative h-[80vh] min-h-[580px] max-h-[850px] flex flex-col justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/products/aluminum/ottimo.png"
              alt="AL-PROFHAN Aluminum Profiles"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/40 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        <div className="h-32 lg:h-40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Hardware Excellence
              </p>
            </div>

            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              AL-PROFHAN <br />
              <span className="text-copper">Aluminum Profiles</span>
            </h1>

            <p className="text-white/80 text-sm md:text-lg max-w-lg leading-relaxed mb-10 font-light italic">
              European-standard aluminum sourcing for modern kitchens, wardrobes, and commercial furniture. 
              A complete hardware ecosystem by Suraj Wood.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact?inquiry=hardware-catalog"
                className="bg-copper hover:bg-copper-light text-white font-bold px-7 py-3 rounded transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-0.5 text-xs md:text-sm group"
              >
                Download Catalog
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-navy font-bold px-7 py-3 rounded transition-all duration-300 hover:-translate-y-0.5 text-xs md:text-sm"
              >
                Get Pricing Info
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 italic max-w-2xl mx-auto">
            Explore the complete AL-PROFHAN hardware ecosystem. Each series is designed for seamless 
            integration with our premium acrylic panels.
          </p>
        </div>
      </section>

      {/* Series Overhaul: Alternating Layout */}
      <section className="bg-cream">
        {SERIES.map((item, idx) => (
          <div 
            key={item.id} 
            className={`py-20 border-b border-gray-100 ${idx % 2 === 1 ? 'bg-white' : 'bg-cream'}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Block */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                {/* Content Block */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="font-playfair text-3xl md:text-4xl text-navy">{item.name}</h2>
                      <p className="text-copper font-bold text-[10px] uppercase tracking-widest">{item.tagline}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                    {item.description}
                  </p>

                  <div className="mb-10 space-y-4">
                    <p className="text-xs font-bold text-navy uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Product Breakdown</p>
                    {item.products.map((p) => (
                      <div key={p.code} className="flex justify-between items-start border-b border-gray-50 pb-3">
                        <div>
                          <p className="text-sm font-bold text-navy">{p.code}</p>
                          <p className="text-xs text-gray-500">{p.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">{p.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/contact?inquiry=${item.id}-pricing`}
                      className="bg-navy text-white font-bold px-8 py-3.5 rounded-xl hover:bg-copper transition-all duration-300 shadow-lg text-sm flex items-center gap-2"
                    >
                      Request Pricing Details
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/downloads"
                      className="border-2 border-navy/10 text-navy font-bold px-8 py-3.5 rounded-xl hover:border-navy transition-all duration-300 text-sm flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download Specs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Finishes Section (Full Width Hero Style) */}
      <section className="relative py-32 overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/banner/pro6.jpg"
            alt="Finishes Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] uppercase font-bold">Aesthetic Variety</p>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">Available Finishes</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-12 italic">
              Our profiles are available in a curated selection of premium finishes, 
              meticulously crafted to complement high-end cabinetry and architectural surfaces.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {FINISHES.map((f) => (
                <div key={f.name} className="group">
                  <div 
                    className="w-16 h-16 rounded-2xl mb-4 shadow-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500" 
                    style={{ backgroundColor: f.color }}
                  />
                  <p className="text-sm font-bold text-white mb-1">{f.name}</p>
                  {f.note && <p className="text-[10px] text-white/40">{f.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Footer */}
      <section className="bg-cream py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl mb-8">
            <Palette className="text-copper" size={32} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-navy mb-8">
            Elevate Your <br /> Designs Today
          </h2>
          <p className="text-gray-500 text-lg mb-12 italic">
            Join the community of leading architects and furniture manufacturers who 
            trust AL-PROFHAN for their hardware requirements.
          </p>
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100">
            <h3 className="font-bold text-xl mb-6">Receive Technical Catalog & Pricing</h3>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Your Name" className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-copper/50" />
              <input type="email" placeholder="Email Address" className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-copper/50" />
              <button className="bg-copper text-white font-bold rounded-xl px-6 py-4 hover:bg-copper-dark transition-all shadow-lg shadow-copper/20">
                Get Catalog
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest">Immediate delivery to your inbox</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/products/acrylux" className="text-white/50 hover:text-white font-bold transition-all flex items-center gap-2">
              <ArrowRight size={16} /> Explore ACRYLUX
            </Link>
            <Link href="/products/acrymatte" className="text-white/50 hover:text-white font-bold transition-all flex items-center gap-2">
              <ArrowRight size={16} /> Explore ACRYMATTE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

      {/* Finishes Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="w-8 h-[2px] bg-copper" />
                <p className="text-copper tracking-[0.3em] text-[10px] uppercase font-bold">Aesthetic Variety</p>
              </div>
              <h2 className="font-playfair text-4xl text-navy mb-6">Available Finishes</h2>
              <p className="text-gray-600 leading-relaxed mb-10 italic">
                Our profiles are available in a curated selection of premium finishes, 
                from deep architectural brush textures to contemporary painted tones.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {FINISHES.map((f) => (
                  <div key={f.name} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full shadow-inner border border-gray-100" 
                      style={{ backgroundColor: f.color }}
                    />
                    <div>
                      <p className="text-xs font-bold text-navy">{f.name}</p>
                      {f.note && <p className="text-[9px] text-gray-400">{f.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/banner/pro6.jpg"
                alt="Aluminum Profile Finishes"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-8">
            <Palette className="text-copper" size={24} />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-6">
            The Perfect Synergy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            AL-PROFHAN hardware is designed to integrate seamlessly with Suraj Wood acrylic panels. 
            Specify both for your next project to ensure 100% compatibility in fit, finish, and longevity.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/products/acrylux" className="text-copper font-bold border-b border-copper hover:text-navy hover:border-navy transition-all">Explore ACRYLUX →</Link>
            <Link href="/products/acrymatte" className="text-copper font-bold border-b border-copper hover:text-navy hover:border-navy transition-all">Explore ACRYMATTE →</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">
            Custom Hardware Solutions
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed italic">
            We provide customized OEM solutions and bulk supply for furniture manufacturers. 
            Connect with our technical team to discuss technical drawings and sampling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-copper hover:bg-copper-dark text-white font-bold px-10 py-4 rounded transition-all shadow-[0_0_20px_rgba(184,115,51,0.3)]"
            >
              Request Quote
            </Link>
            <Link
              href="/downloads"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded transition-all border border-white/20"
            >
              Technical Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
