import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Hammer, Lightbulb, Maximize, Settings, Zap, Layers, Package, Palette } from "lucide-react";

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
    pages: "01-02",
    description: "The gold standard for handleless kitchen design, offering a seamless and ergonomic grip system.",
    icon: <Maximize className="text-copper" size={24} />,
    products: [
      { code: "PAPS-5220", desc: "Aluminum Shutter L Profile Handle with Gasket", size: "3mtr", price: "₹3,100 - 3,350" },
      { code: "PAPS-5221", desc: "Aluminum Shutter C Profile Handle", size: "3mtr", price: "₹2,400 - 2,600" },
      { code: "PAPS-5311", desc: "Aluminum Wall Gola Profile Handle with Gasket", size: "3mtr", price: "₹2,600 - 2,850" },
      { code: "PAPS-5313", desc: "Aluminum 3 Side Profile", size: "3mtr", price: "₹3,050 - 3,350" },
      { code: "E/CAPS", desc: "End Caps: PACP-5220, PACP-5221, PACP-5311", size: "2pc", price: "₹130 - 150" },
      { code: "CONN", desc: "Connectors: PACP-5313A (Steel) / 5313B (Alu)", size: "2pc", price: "₹320" },
    ]
  },
  {
    id: "aerolinea",
    name: "AEROLINEA SERIES",
    tagline: "Premium Shutter & Edge Profiles",
    pages: "03-04",
    description: "Slim-line architectural frames designed for minimalist glass shutters and clean cabinetry edges.",
    icon: <Settings className="text-copper" size={24} />,
    products: [
      { code: "PAPS-6631", desc: "Aluminum Shutter L Profile Handle with Gasket", size: "3mtr", price: "₹3,300 - 3,600" },
      { code: "PAPS-6632", desc: "Aluminum Shutter C Profile Handle", size: "3mtr", price: "₹2,200 - 2,400" },
      { code: "PAPS-6634", desc: "Aluminum Edge Profile / T Patti", size: "3mtr", price: "₹800 - 900" },
      { code: "E/CAPS", desc: "End Caps: PACP-6631, PACP-6632", size: "2pc", price: "₹130 - 150" },
      { code: "C/CAPS", desc: "Corner Caps: PACP-6634", size: "2pc", price: "₹60" },
    ]
  },
  {
    id: "handle",
    name: "HANDLE PROFILES",
    tagline: "Ergonomic Shutter Solutions",
    pages: "05-06",
    description: "High-precision J and L profile handles for modern wardrobe and kitchen shutter operations.",
    icon: <Hammer className="text-copper" size={24} />,
    products: [
      { code: "PAPS-1336", desc: "Aluminum Shutter L Profile Handle", size: "3mtr", price: "₹2,700 - 3,000" },
      { code: "PAPS-5677", desc: "Aluminum Shutter J Profile Handle with Gasket", size: "3mtr", price: "₹2,900 - 3,150" },
      { code: "PAPS-1335", desc: "Aluminum Shutter Profile Handle with Gasket", size: "3mtr", price: "₹3,200 - 3,500" },
      { code: "METAL", desc: "Metal End Caps (PACP-1336)", size: "2pc", price: "₹180" },
      { code: "PVC", desc: "PVC End Caps (PACP-1335)", size: "2pc", price: "₹80" },
    ]
  },
  {
    id: "shelf",
    name: "SHELF PROFILES",
    tagline: "Architectural Glass Support",
    pages: "07-08",
    description: "Specialized aluminum profiles for glass shelves with integrated structural support and lighting readiness.",
    icon: <Layers className="text-copper" size={24} />,
    products: [
      { code: "PAPS-5037", desc: "Aluminum Profile for Glass Shelf", size: "3mtr", price: "₹3,900 - 4,300" },
      { code: "PAPS-5037A", desc: "Aluminum Profile for LED Glass Shelf", size: "3mtr", price: "₹3,850 - 4,200" },
      { code: "PAHL-5037", desc: "Aluminum Glass Shelf Profile Holder", size: "4pc", price: "₹470" },
      { code: "CONN", desc: "Shelf Connectors: PACN-5037 / 5037A", size: "4pc", price: "₹470" },
    ]
  },
  {
    id: "luminare",
    name: "LUMINARE SERIES",
    tagline: "LED Integrated Lighting Profiles",
    pages: "09-10",
    description: "Functional lighting ecosystems designed for optimal heat dissipation and spot-free diffusion.",
    icon: <Lightbulb className="text-copper" size={24} />,
    products: [
      { code: "PAPS-3136A", desc: "Aluminum 45° Degree LED Light Profile", size: "3mtr", price: "₹1,950 - 2,100" },
      { code: "PAPS-3062A", desc: "Aluminum LED Light Profile", size: "3mtr", price: "₹1,350 - 1,450" },
    ]
  },
  {
    id: "hanging",
    name: "HANGING ROD",
    tagline: "Wardrobe Illumination Systems",
    pages: "09",
    description: "Premium aluminum wardrobe rods with integrated LED capabilities for luxury walk-in closets.",
    icon: <Zap className="text-copper" size={24} />,
    products: [
      { code: "PAPS-6413", desc: "Aluminum LED Hanging Rod for Clothes", size: "3mtr", price: "₹2,920 - 3,120" },
      { code: "PACP-6414", desc: "Aluminum Clothes Hanging Bracket", size: "2pc", price: "₹890" },
    ]
  },
  {
    id: "velaro",
    name: "VELARO SERIES",
    tagline: "Luxury Glass Shutter Systems",
    pages: "11-12",
    description: "High-precision sliding and fixed glass shutter profiles for sophisticated furniture design.",
    icon: <Package className="text-copper" size={24} />,
    products: [
      { code: "PAPS-1351A", desc: "Glass Shutter Profile with Gasket", size: "3mtr", price: "₹3,000 - 3,160" },
      { code: "PAHD-1351C", desc: "Aluminum Handle (128mm)", size: "4pc", price: "₹1,675" },
      { code: "PACN-1351A", desc: "Steel Connector", size: "4pc", price: "₹520" },
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

      {/* Hero (Luxury Alignment) */}
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

            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-7xl leading-[1.1] mb-6">
              AL-PROFHAN <br />
              <span className="text-copper">Aluminum Profiles</span>
            </h1>

            <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed mb-10 font-light italic">
              European-standard aluminum sourcing for modern kitchens, wardrobes, and commercial furniture. 
              A complete hardware ecosystem by Suraj Wood.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/downloads"
                className="bg-copper hover:bg-copper-light text-white font-bold px-8 py-3.5 rounded transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-0.5 text-xs md:text-sm"
              >
                Technical Catalog
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-navy font-bold px-8 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5 text-xs md:text-sm"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Standard Length", val: "3 Meters", desc: "Precision Cut" },
              { label: "Sourcing", val: "European", desc: "Grade 6063 T5 Aluminum" },
              { label: "Applications", val: "Modular", desc: "Kitchens & Wardrobes" },
              { label: "Integration", val: "Acrylic", desc: "100% Compatible" },
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
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="font-playfair text-4xl md:text-5xl text-navy mb-4">Product Series</h2>
            <p className="text-gray-500 max-w-2xl italic">Explore the complete AL-PROFHAN hardware ecosystem, from handleless gola systems to illuminated hanging rods.</p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {SERIES.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col lg:flex-row"
              >
                <div className="lg:w-1/3 bg-navy/5 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100">
                  <div>
                    <div className="mb-6">{item.icon}</div>
                    <h3 className="font-heading font-bold text-2xl text-navy mb-1">{item.name}</h3>
                    <p className="text-copper font-semibold text-xs mb-4 uppercase tracking-wider">{item.tagline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">{item.description}</p>
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Catalog Pages: {item.pages}
                  </div>
                </div>
                
                <div className="lg:w-2/3 p-6 md:p-10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400">Code</th>
                          <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400">Description</th>
                          <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400 text-right">Length</th>
                          <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400 text-right">Est. Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {item.products.map((p) => (
                          <tr key={p.code} className="group">
                            <td className="py-4 text-xs font-bold text-navy group-hover:text-copper transition-colors">{p.code}</td>
                            <td className="py-4 text-xs text-gray-600">{p.desc}</td>
                            <td className="py-4 text-xs text-gray-500 text-right">{p.size}</td>
                            <td className="py-4 text-xs font-semibold text-navy text-right whitespace-nowrap">{p.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
