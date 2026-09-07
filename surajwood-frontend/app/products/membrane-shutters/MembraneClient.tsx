"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Droplets,
  Layers,
  Sun,
  Search,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  X,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import {
  MEMBRANE_CATEGORIES,
  MEMBRANE_SHADES,
  MEMBRANE_FEATURES,
  MEMBRANE_PROFILES,
  MEMBRANE_FAQS,
  MembraneShade,
} from "@/data/membrane-shutters";

export default function MembraneClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalShade, setActiveModalShade] = useState<MembraneShade | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", city: "", shadePreference: "" });

  // Filter shades based on category and search query
  const filteredShades = useMemo(() => {
    return MEMBRANE_SHADES.filter((shade) => {
      const matchesCat = selectedCategory === "all" || shade.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        shade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shade.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shade.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shade.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: "", email: "", phone: "", city: "", shadePreference: "" });
    }, 5000);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1F1F1F] min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#111827] pt-28 pb-16">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
          <Image
            src="/images/products/membrane-shutters/030-wg-artisan-oak-nature.jpg"
            alt="Continental Membrane Shutters by SurajWood"
            fill
            priority
            className="object-cover scale-105 animate-pulse duration-10000"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/40" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center">
          <div className="max-w-3xl">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C0392B]/15 border border-[#C0392B]/30 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C0392B] animate-ping" />
              <span className="text-[#E06A55] text-xs font-black uppercase tracking-[0.25em]">
                New 2026 Collection
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6">
              Continental <br />
              <span className="bg-gradient-to-r from-[#E06A55] via-[#D4A373] to-amber-200 bg-clip-text text-transparent">
                Membrane Shutters
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
              Precision 3D vacuum thermoforming over moisture-resistant HDMR cores. Seamless continuous edges, 
              intricate CNC Shaker profiles, and 36 curated European foils designed for high-performance Indian kitchens and wardrobes.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#shades-explorer"
                className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-[#C0392B]/25 hover:-translate-y-0.5 text-sm flex items-center gap-2.5 group"
              >
                <span>Explore 36 Colors</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#inquire-form"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-md text-sm flex items-center gap-2"
              >
                <span>Request Shade Card</span>
              </a>
              <a
                href="tel:+919009171819"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white px-4 py-3 text-sm font-semibold transition-colors"
              >
                <PhoneCall size={16} className="text-[#E06A55]" />
                <span>+91-9009171819</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">36</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5 font-medium">European Shades</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">0%</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5 font-medium">Edge Glue Seams</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">3D</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5 font-medium">Vacuum Press</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">5 Yrs</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5 font-medium">Warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom edge gradient highlight */}
        <div className="relative z-10 w-full h-1.5 bg-gradient-to-r from-[#C0392B] via-[#D4A373] to-[#C0392B]" />
      </section>

      {/* ─── Highlights / Value Pillars ─── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#C0392B] text-xs uppercase font-black tracking-[0.25em] mb-3">
              Next-Generation Manufacturing
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight">
              Why Continental Membrane Shutters <br className="hidden sm:inline" />
              Surpass Traditional Cabinetry
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              Engineered with positive-negative vacuum thermoforming, each shutter wraps seamlessly 
              over top, bottom, and side bevels, eliminating water intrusion points entirely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMBRANE_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-[#FAF9F6] border border-gray-100 hover:border-[#C0392B]/30 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C0392B]/10 text-[#C0392B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon === "ShieldCheck" && <ShieldCheck size={28} />}
                  {feature.icon === "Sparkles" && <Sparkles size={28} />}
                  {feature.icon === "Droplets" && <Droplets size={28} />}
                  {feature.icon === "Layers" && <Layers size={28} />}
                  {feature.icon === "Sparkle" && <Sparkles size={28} />}
                  {feature.icon === "Sun" && <Sun size={28} />}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#C0392B] mb-1">
                  {feature.subtitle}
                </p>
                <h3 className="font-heading font-bold text-xl text-[#0F172A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 Finish Categories Overview ─── */}
      <section className="py-20 bg-[#F4F2EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-[#C0392B] text-xs uppercase font-black tracking-[0.25em] mb-2">
                Curated European Textures
              </p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
                Four Distinct Surface Series
              </h2>
            </div>
            <p className="text-gray-600 max-w-md text-sm sm:text-base">
              From synchronised natural wood pores to ultra-smooth porcelain mattes, select the exact touch and feel for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => { setSelectedCategory("WG"); document.getElementById("shades-explorer")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cursor-pointer group bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#C0392B] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src="/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg"
                  alt="Wood Grain Series"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                  9 Shades
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A] group-hover:text-[#C0392B] transition-colors">
                Wood Grain (WG)
              </h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Authentic tactile oak, walnut, and pine reproductions with realistic synchronised grain.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#C0392B]">
                View Wood Series <ChevronRight size={14} />
              </div>
            </div>

            <div
              onClick={() => { setSelectedCategory("PT"); document.getElementById("shades-explorer")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cursor-pointer group bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#C0392B] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src="/images/products/membrane-shutters/017-pt-parisian-blue.jpg"
                  alt="Porcelain Touch Series"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                  13 Shades
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A] group-hover:text-[#C0392B] transition-colors">
                Porcelain Touch (PT)
              </h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Silky, anti-fingerprint matte surfaces inspired by fine ceramic glazes and Parisian architecture.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#C0392B]">
                View Porcelain Series <ChevronRight size={14} />
              </div>
            </div>

            <div
              onClick={() => { setSelectedCategory("PS"); document.getElementById("shades-explorer")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cursor-pointer group bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#C0392B] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src="/images/products/membrane-shutters/004-ps-reed-green.jpg"
                  alt="Perfect Silk Series"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                  7 Shades
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A] group-hover:text-[#C0392B] transition-colors">
                Perfect Silk (PS)
              </h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Soft-sheen tactile finishes with vibrant, rich saturation from Reed Green to Rusty Red.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#C0392B]">
                View Silk Series <ChevronRight size={14} />
              </div>
            </div>

            <div
              onClick={() => { setSelectedCategory("CS"); document.getElementById("shades-explorer")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cursor-pointer group bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#C0392B] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src="/images/products/membrane-shutters/023-cs-dakar.jpg"
                  alt="Ceramic Satin Series"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                  7 Shades
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A] group-hover:text-[#C0392B] transition-colors">
                Ceramic Satin (CS)
              </h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Mineral-inspired textures that pair effortlessly with concrete, natural stone, and brass.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#C0392B]">
                View Ceramic Series <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Color Swatch Explorer ─── */}
      <section id="shades-explorer" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-[#C0392B] bg-[#C0392B]/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            Continental Color Catalog
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] mb-4">
            Browse All 36 European Membrane Shades
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Filter by finish series or search by shade name. Click any swatch for high-resolution 3D inspection and design specifications.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-200/80 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {MEMBRANE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? "bg-[#0F172A] text-white shadow-md shadow-[#0F172A]/20 scale-105"
                      : "bg-[#FAF9F6] text-gray-700 hover:bg-gray-100 border border-gray-200/60"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                      active ? "bg-[#C0392B] text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search shade, code, color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Swatch Count Indicator */}
        <div className="flex items-center justify-between mb-6 px-2 text-xs font-semibold text-gray-500">
          <p>Showing <span className="text-[#0F172A] font-bold">{filteredShades.length}</span> of 36 Continental Shades</p>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-[#C0392B] hover:underline"
            >
              Reset to All Finishes
            </button>
          )}
        </div>

        {/* ─── Shade Cards Grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredShades.map((shade) => (
            <div
              key={shade.code}
              onClick={() => setActiveModalShade(shade)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-[#C0392B] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Swatch Image Frame */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                  src={shade.image}
                  alt={`${shade.code} ${shade.name} Membrane Shutter Shade`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-[#0F172A]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <Maximize2 size={12} /> Inspect Shade
                  </span>
                </div>

                {/* Category Pill */}
                <span className="absolute top-2.5 left-2.5 bg-[#0F172A]/85 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                  {shade.category}
                </span>

                {/* Accent Color Dot */}
                <span
                  className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full border border-white/60 shadow-sm"
                  style={{ backgroundColor: shade.accentColor }}
                />
              </div>

              {/* Swatch Details */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase text-[#C0392B] tracking-wider">
                      {shade.code}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {shade.categoryLabel}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#0F172A] group-hover:text-[#C0392B] transition-colors line-clamp-1">
                    {shade.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {shade.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-600 group-hover:text-[#C0392B]">
                  <span>Specs & Pairings</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredShades.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg font-medium">No shades match your current search query.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="mt-4 px-6 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm font-bold hover:bg-[#C0392B] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* ─── CNC Grooving & Shutter Profiles ─── */}
      <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <p className="text-[#E06A55] text-xs font-black uppercase tracking-[0.25em] mb-3">
              Architectural Freedom
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Precision CNC Grooving <br />
              Without Edge Joints
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Unlike flat laminates that require separate edge banding, our German 3D membrane thermoforming 
              allows deep CNC-routed designs, recessed center panels, and integrated handles with a 100% continuous polymer skin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEMBRANE_PROFILES.map((profile, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#E06A55]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-[#C0392B] text-white px-3 py-1 rounded-full">
                      {profile.badge}
                    </span>
                    <span className="text-gray-400 font-mono text-xs">0{i + 1}</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">
                    {profile.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {profile.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E06A55] font-bold">
                  <span>Standard 18mm / 25mm HDMR</span>
                  <CheckCircle2 size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technical Specifications Table ─── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#C0392B] text-xs font-black uppercase tracking-[0.25em] mb-3">
              Engineering Excellence
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
              Technical Specifications
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Engineered to meet the highest European furniture standards for durability, moisture tolerance, and safety.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#FAF9F6] rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-200">
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center bg-white">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Substrate Core</span>
                <span className="text-gray-700 text-sm sm:col-span-2">High-Density Moisture Resistant (HDMR) / E1 Grade Calibrated MDF</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Thermoforming Tech</span>
                <span className="text-gray-700 text-sm sm:col-span-2">Positive & Negative 3D Vacuum Thermoforming Press</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center bg-white">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Polymer Foil Gauge</span>
                <span className="text-gray-700 text-sm sm:col-span-2">0.35mm to 0.50mm High-Grade European PVC/PET Polymeric Foil</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Edge Seal Profile</span>
                <span className="text-gray-700 text-sm sm:col-span-2">Continuous Monolithic Wrap on Front + 4 Edges (Zero Glue Seam)</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center bg-white">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Available Thicknesses</span>
                <span className="text-gray-700 text-sm sm:col-span-2">18mm (Standard Shutter), 25mm (Statement Door / J-Profile)</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Backer Surface</span>
                <span className="text-gray-700 text-sm sm:col-span-2">Matching Balanced Melamine White / Off-White Core</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center bg-white">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Moisture & Steam</span>
                <span className="text-gray-700 text-sm sm:col-span-2">Tested against 100°C steam vapour and humidity cycle without bubbling</span>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <span className="font-bold text-[#0F172A] text-sm sm:text-base">Warranty Coverage</span>
                <span className="text-gray-700 text-sm sm:col-span-2 font-semibold text-[#C0392B]">5-Year Manufacturing & Delamination Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison Matrix ─── */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#C0392B] text-xs font-black uppercase tracking-[0.25em] mb-3">
              Material Comparison
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
              Membrane vs Acrylic vs Standard Laminate
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Choose the exact right surface technology based on your project requirements.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden text-left border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white text-sm">
                  <th className="p-5 sm:p-6 font-bold">Feature</th>
                  <th className="p-5 sm:p-6 font-bold bg-[#C0392B] text-white">SurajWood Membrane</th>
                  <th className="p-5 sm:p-6 font-bold">SurajWood Acrylic</th>
                  <th className="p-5 sm:p-6 font-bold">Standard HPL Laminate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-700">
                <tr>
                  <td className="p-5 font-bold text-[#0F172A]">3D CNC Grooves & Shaker Routing</td>
                  <td className="p-5 bg-[#C0392B]/5 font-bold text-[#C0392B]">Yes (Seamless 3D Wrap)</td>
                  <td className="p-5">Flat Surfaces Only</td>
                  <td className="p-5">Flat Only (Cannot bend in grooves)</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#0F172A]">Edge Banding Seams</td>
                  <td className="p-5 bg-[#C0392B]/5 font-bold text-[#C0392B]">Zero (Molded Continuous)</td>
                  <td className="p-5">Requires Edge Banding</td>
                  <td className="p-5">Visible Glue Joint / Tape</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#0F172A]">Steam & Vapour Resistance</td>
                  <td className="p-5 bg-[#C0392B]/5 font-bold text-[#C0392B]">Superior (No seam for vapour)</td>
                  <td className="p-5">Excellent (PUR Bonded)</td>
                  <td className="p-5">Moderate (Edges can swell)</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#0F172A]">Surface Aesthetic</td>
                  <td className="p-5 bg-[#C0392B]/5 font-bold text-[#C0392B]">Silk, Porcelain, Ceramic, Wood</td>
                  <td className="p-5">Ultra High Gloss & Nano Matte</td>
                  <td className="p-5">Printed Paper Texture</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-[#0F172A]">Integrated J-Pull Handle</td>
                  <td className="p-5 bg-[#C0392B]/5 font-bold text-[#C0392B]">Yes (Direct CNC Routing)</td>
                  <td className="p-5">Requires Aluminum Profile</td>
                  <td className="p-5">Requires Post-Forming</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Interactive Swatch Modal (Zoom & Specs) ─── */}
      {activeModalShade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalShade(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Image View */}
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
              <Image
                src={activeModalShade.image}
                alt={`${activeModalShade.code} ${activeModalShade.name}`}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-md">
                {activeModalShade.code}
              </span>
            </div>

            {/* Modal Info View */}
            <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black text-[#C0392B] uppercase tracking-wider">
                    {activeModalShade.categoryLabel} ({activeModalShade.category})
                  </span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0F172A] mb-3">
                  {activeModalShade.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {activeModalShade.description}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Recommended Applications:
                  </p>
                  <ul className="space-y-1.5">
                    {activeModalShade.recommendedFor.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 size={14} className="text-[#C0392B]" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setFormState((prev) => ({
                      ...prev,
                      shadePreference: `${activeModalShade.code} ${activeModalShade.name}`,
                    }));
                    setActiveModalShade(null);
                    document.getElementById("inquire-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C0392B]/20"
                >
                  <span>Request Quote for {activeModalShade.code}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Instant Quote & Shade Card Request Form ─── */}
      <section id="inquire-form" className="py-24 bg-[#0F172A] text-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#E06A55] bg-[#E06A55]/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              Direct Factory Dispatch
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-3">
              Request Physical Shade Card & Pricing
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
              Architects, interior designers, and modular furniture manufacturers: Receive our complete 
              36-shade Continental Membrane Box with calibrated swatches.
            </p>
          </div>

          <div className="bg-white text-[#0F172A] p-8 sm:p-12 rounded-[36px] shadow-2xl border border-white/10">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-2">
                  Thank You for Your Inquiry!
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Our Bahadurgarh technical sales team will dispatch your requested sample catalog and project quotation within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF9F6] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF9F6] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@interiors.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF9F6] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi NCR, Bangalore, Mumbai"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF9F6] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Shade or Profile Preference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 031 Casella Oak Nature Shaker Shutters"
                    value={formState.shadePreference}
                    onChange={(e) => setFormState({ ...formState, shadePreference: e.target.value })}
                    className="w-full px-5 py-3.5 bg-[#FAF9F6] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-[#C0392B]/25 text-base flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry & Request Shade Card</span>
                  <ArrowRight size={18} />
                </button>
                <p className="text-[11px] text-gray-400 text-center">
                  Direct supply from SurajWood Manufacturing, Bahadurgarh (Haryana). Confidential & No Spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions ─── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C0392B] text-xs font-black uppercase tracking-[0.25em] mb-3">
              Clear Answers
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Everything you need to know about specifying Continental Membrane Shutters.
            </p>
          </div>

          <div className="space-y-6">
            {MEMBRANE_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm"
              >
                <h3 className="font-heading font-bold text-lg text-[#0F172A] mb-3 flex items-start gap-3">
                  <HelpCircle size={20} className="text-[#C0392B] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Products & Ecosystem Navigation ─── */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#E06A55] text-xs font-black uppercase tracking-widest mb-1">
                Explore More Surfaces
              </p>
              <h3 className="font-heading font-bold text-2xl text-white">
                Complete Architectural Surfacing Ecosystem
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products/acrylux"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-xs uppercase tracking-wider"
              >
                ACRYLUX Panels
              </Link>
              <Link
                href="/products/acrymatte"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-xs uppercase tracking-wider"
              >
                ACRYMATTE
              </Link>
              <Link
                href="/products/aluminum-profiles"
                className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold px-6 py-3 rounded-xl transition-colors text-xs uppercase tracking-wider"
              >
                AL-PROFHAN Hardware
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
