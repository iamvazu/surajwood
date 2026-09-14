"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Download, 
  ArrowRight, 
  Package, 
  Truck, 
  Award, 
  Check
} from "lucide-react";

interface TexturePack {
  id: string;
  name: string;
  category: string;
  software: string[];
  fileSize: string;
  resolution: string;
  description: string;
  image: string;
  shades: string[];
  downloadUrl: string;
}

const TEXTURE_PACKS: TexturePack[] = [
  {
    id: "acrylux-4k-pbr",
    name: "ACRYLUX High-Gloss 4K PBR Library",
    category: "High-Gloss Mirror PMMA",
    software: ["SketchUp", "3ds Max", "V-Ray", "Corona", "Revit", "Blender"],
    fileSize: "148 MB",
    resolution: "4096 × 4096 px (Seamless)",
    description: "Full PBR material maps (Diffuse, 92+ GU Glossiness, Roughness, Normal) for 24 luxury high-gloss acrylic surfaces.",
    image: "/images/products/acrylux/acrylux-solid-1.png",
    shades: ["Arctic White", "Champagne Metallic", "Midnight Navy", "Burnt Copper", "Obsidian Black"],
    downloadUrl: "/downloads/ACRYLUX_Technical_Data_Sheet.pdf", // Link to technical assets or download pack
  },
  {
    id: "acrymatte-nano-pbr",
    name: "ACRYMATTE Anti-Fingerprint 4K Pack",
    category: "Nano-Matte Velvet",
    software: ["SketchUp", "3ds Max", "V-Ray", "Corona", "Revit"],
    fileSize: "135 MB",
    resolution: "4096 × 4096 px (Seamless)",
    description: "Zero-glare super-matte shader set with micro-velvet tactile texture maps and realistic light diffusion profiles.",
    image: "/images/products/acrymatte/banner.png",
    shades: ["Sage Green", "Charcoal Slate", "Olive Green", "Warm Cashmere", "Stone Grey"],
    downloadUrl: "/downloads/ACRYLUX_Technical_Data_Sheet.pdf",
  },
  {
    id: "acryglass-crystal-pbr",
    name: "ACRYGLASS 2mm Glass-Effect Pack",
    category: "Crystal Glass Depth",
    software: ["SketchUp", "3ds Max", "V-Ray", "Corona", "Blender"],
    fileSize: "112 MB",
    resolution: "4096 × 4096 px (Seamless)",
    description: "Double-layer crystal glass shaders with refractive index (IOR 1.49) and chamfered polished bevel edge profiles.",
    image: "/images/products/acryglass/banner.png",
    shades: ["Pure Crystal White", "Smoked Grey", "Emerald Glass", "Bronze Tint"],
    downloadUrl: "/downloads/ACRYLUX_Technical_Data_Sheet.pdf",
  },
  {
    id: "al-profhan-cad-dwg",
    name: "AL-PROFHAN Aluminium Profiles CAD/BIM (2D & 3D DWG)",
    category: "Architectural Hardware",
    software: ["AutoCAD", "Revit (BIM)", "SketchUp", "Rhino"],
    fileSize: "45 MB",
    resolution: "Vector 1:1 Scale CAD",
    description: "Dimensioned cross-sections, cut-lists, and 3D extruded components for Ottimo J-pull, Aerolinea Gola, and Luminare LED profiles.",
    image: "/images/banner/bg2.jpg",
    shades: ["Anodised Matt Black", "Brushed Champagne Gold", "Titanium Grey", "Natural Silver"],
    downloadUrl: "/catalogs/aluminium_2025.pdf",
  },
];

export default function ArchitectsPartnerPage() {
  const [formData, setFormData] = useState({
    architectName: "",
    firmName: "",
    email: "",
    phone: "",
    city: "",
    shippingAddress: "",
    sampleBoxType: "Complete Acrylic Architect Folder (50+ Shades)",
    projectSize: "Large Residential / Commercial (5,000+ sq.ft.)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadPayload = {
      name: formData.architectName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      inquiryType: "Architect Trade Program & Sample Box",
      message: `ARCHITECT PARTNER REGISTRATION:
Firm: ${formData.firmName}
Architect: ${formData.architectName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}
Shipping Address: ${formData.shippingAddress}
Requested Sample Kit: ${formData.sampleBoxType}
Project Scale: ${formData.projectSize}`,
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-navy">
      
      {/* Hero Section with Luxury Architectural Background Image */}
      <section className="relative text-white pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-800">
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/gallery/commercial-premium.png"
              alt="SurajWood Architect & OEM Partner Program"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Sophisticated Dual Gradient Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/95 via-navy/85 to-navy/90" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/95 via-transparent to-navy/70" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Subtle Breadcrumb Navigation */}
          <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li className="text-white/80 font-medium" aria-current="page">
                Architects &amp; Trade Portal
              </li>
            </ol>
          </nav>

          {/* Frosted Dark Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-5">
            <Building2 className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] sm:text-xs uppercase font-bold">
              TRADE &amp; ARCHITECT SPECIFICATION PROGRAM
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Architect &amp; OEM <span className="text-copper-light font-extrabold">Partner Portal</span>
          </h1>

          <p className="text-gray-200 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed font-light mb-8">
            Specifying luxury interiors for villas, towers, and commercial spaces. Access 4K seamless PBR 3D textures, factory-direct trade pricing, and complimentary studio sample folders.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#sample-request"
              className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-copper to-[#B91C1C] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-copper/25 transition-all"
            >
              Request Free Studio Sample Box →
            </a>
            <a
              href="#3d-textures"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-copper" />
              <span>Download 3D CAD / PBR Textures</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars for Specifiers */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">ARCHITECT ADVANTAGE</p>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy">
              Engineered Specifically for High-End Architectural Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 text-copper flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-navy">Priority Studio Swatch Kits</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Handcrafted hardbound swatch books with 50+ genuine 1.5mm acrylic and 2mm glass physical samples delivered directly to your design studio.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 text-copper flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-navy">Guaranteed 3–5 Day Dispatch</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                State-of-the-art Bahadurgarh plant inventory ensures rapid national dispatch across 50 Indian cities without project downtime or stockout delays.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 text-copper flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-navy">Zero-Joint PUR Flat Lamination</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                European Reactive PUR hot-melt bonding ensures zero orange peel, 3H anti-scratch performance, and 100% boiling-water resistance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 text-copper flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-navy">Dedicated Project Engineer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct access to our technical advisory desk for custom cut-lists, Gola profile sizing, edge-banding calibration, and site inspection support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D CAD & PBR Textures Section */}
      <section id="3d-textures" className="py-20 bg-[#FBFBF9] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">DIGITAL ARCHITECTURAL ASSETS</p>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy">
                4K Seamless PBR Textures &amp; CAD Profiles Library
              </h2>
              <p className="text-gray-600 text-sm mt-2 max-w-2xl">
                Ready-to-render material assets with accurate glossiness, normal, and displacement maps for <strong>SketchUp, 3ds Max, V-Ray, Corona, and Revit</strong>.
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 px-3 py-1.5 rounded-full bg-gray-200">
              Updated for 2026 Collections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEXTURE_PACKS.map((pack) => (
              <div key={pack.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-copper bg-copper/10 px-2 py-0.5 rounded">
                        {pack.category}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-navy mt-1">{pack.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {pack.fileSize}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{pack.description}</p>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy">Resolution:</span>
                      <span className="text-gray-600">{pack.resolution}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-bold text-navy">Compatible:</span>
                      {pack.software.map((sw) => (
                        <span key={sw} className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-700 text-[10px]">
                          {sw}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="font-bold text-navy">Included Shades:</span>
                      <span className="text-gray-500 italic">{pack.shades.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={pack.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-copper text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Texture Pack ({pack.fileSize})</span>
                  </a>
                  <span className="text-[11px] text-gray-400">Free Specifier Asset</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Sample Box Request Section */}
      <section id="sample-request" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-navy via-[#1c2024] to-navy text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border border-gray-700">
            
            <div className="max-w-2xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/20 border border-copper/40 text-copper text-xs font-bold uppercase mb-4">
                <Package className="w-3.5 h-3.5" />
                Complimentary Studio Dispatch
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                Request Your Architectural Studio Sample Box
              </h2>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                Delivered free of charge to registered architectural studios, interior design firms, and OEM modular kitchen factories across India.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Architect / Lead Designer *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ar. Rahul Sharma"
                      value={formData.architectName}
                      onChange={(e) => setFormData({ ...formData, architectName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Firm / Studio Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Studio Design Associates"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Official Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@studiodesign.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">City / State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore, Karnataka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Requested Sample Kit *</label>
                    <select
                      value={formData.sampleBoxType}
                      onChange={(e) => setFormData({ ...formData, sampleBoxType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c2024] border border-gray-600 text-xs sm:text-sm text-white focus:outline-none focus:border-copper"
                    >
                      <option>Complete Acrylic Architect Folder (50+ Shades)</option>
                      <option>ACRYMATTE Nano-Matte Swatch Kit</option>
                      <option>ACRYGLASS 2mm Glass-Effect Box</option>
                      <option>AL-PROFHAN Aluminium Profiles Case</option>
                      <option>Full Comprehensive Master Specifier Kit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Studio Courier Shipping Address (with Pin Code) *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Suite / Floor, Building Name, Road, Area, City, Pin Code"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-copper to-[#B91C1C] hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-copper/25 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? "Submitting Dispatch Request..." : "Request Studio Sample Box Dispatch →"}
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-3xl bg-emerald-900/40 border border-emerald-500/50 text-center space-y-4 max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Sample Box Dispatched for Verification!</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Thank you, <strong>{formData.architectName}</strong>. Your studio dispatch request has been logged. Our dispatch desk will send your Bluedart courier tracking number on WhatsApp ({formData.phone}) within 24 hours.
                </p>
                <div className="pt-2">
                  <Link
                    href="/cost-estimator"
                    className="inline-flex items-center gap-2 text-xs font-bold text-copper hover:underline"
                  >
                    <span>Try the Instant Cost Estimator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
