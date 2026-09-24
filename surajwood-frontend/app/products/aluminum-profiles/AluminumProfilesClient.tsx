"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize,
  Settings,
  Hammer,
  Layers,
  Zap,
  Lightbulb,
  Package,
  Download,
  ArrowRight,
  X,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { ALUMINUM_SERIES, AluminumSeries, AluminumProduct } from "@/data/aluminum-profiles";

const SERIES_ICONS: Record<string, typeof Maximize> = {
  ottimo: Maximize,
  aerolinea: Settings,
  handle: Hammer,
  shelf: Layers,
  hanging: Zap,
  luminare: Lightbulb,
  velaro: Package,
};

const FINISHES_PALETTE = [
  { name: "Black Brush", color: "#1A1A1A", desc: "Anodized Matte Black" },
  { name: "Bronze Brush", color: "#8C6A3E", desc: "Rich Anodized Bronze" },
  { name: "Coffee Painted", color: "#4B3621", desc: "Powder Coated Deep Umber" },
  { name: "Anthracite Painted", color: "#36454F", desc: "Industrial Metallic Grey" },
  { name: "Champagne Painted", color: "#D4AF37", desc: "Soft Gold (Velaro exclusive)" },
];

export default function AluminumProfilesClient() {
  const [activeSeriesId, setActiveSeriesId] = useState<string>("ottimo");
  const [selectedProductMap, setSelectedProductMap] = useState<Record<string, string>>({
    ottimo: "PAPS-5220",
    aerolinea: "PAPS-6631",
    handle: "PAPS-1336",
    shelf: "PAPS-5037",
    hanging: "PAPS-6413",
    luminare: "PAPS-3136A",
    velaro: "PAPS-1351A",
  });
  const [selectedPhotoIndexMap, setSelectedPhotoIndexMap] = useState<Record<string, number>>({
    ottimo: 0,
    aerolinea: 0,
    handle: 0,
    shelf: 0,
    hanging: 0,
    luminare: 0,
    velaro: 0,
  });

  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc?: string } | null>(null);

  const handleSelectProduct = (seriesId: string, productCode: string) => {
    setSelectedProductMap((prev) => ({
      ...prev,
      [seriesId]: productCode,
    }));
  };

  const handleSelectPhoto = (seriesId: string, index: number) => {
    setSelectedPhotoIndexMap((prev) => ({
      ...prev,
      [seriesId]: index,
    }));
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1F1F1F]">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-copper bg-copper/10 px-2.5 py-0.5 rounded-full">
                  Official Catalog Asset &middot; SURAJ WOOD 2025
                </span>
                <h3 className="font-heading text-xl font-bold text-navy mt-1">
                  {lightboxImage.title}
                </h3>
                {lightboxImage.desc && (
                  <p className="text-xs text-gray-500 mt-0.5">{lightboxImage.desc}</p>
                )}
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-navy hover:text-white flex items-center justify-center transition-colors text-gray-700"
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex-grow min-h-[350px] md:min-h-[500px] w-full mt-4 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden p-4">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
              <span>Extracted directly from SURAJ WOOD ALUMINIUM FOLDER 2025</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="text-copper font-bold hover:underline"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-navy pt-36 sm:pt-40 md:pt-44 pb-8">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/products/aluminum/ottimo-kitchen.png"
              alt="AL-PROFHAN Aluminum Profiles"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy via-transparent to-navy/60" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center my-auto">
          <div className="max-w-3xl">
            {/* Clean Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-copper/20 border border-copper/40 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-copper animate-ping" />
              <span className="text-copper-light text-xs font-black uppercase tracking-[0.25em]">
                Hardware Excellence &middot; 2025 Sourcing
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-5 drop-shadow-md">
              AL-PROFHAN <br />
              <span className="bg-gradient-to-r from-copper-light via-amber-200 to-copper bg-clip-text text-transparent">
                Aluminum Profiles
              </span>
            </h1>

            <p className="text-white/85 text-sm md:text-lg max-w-xl leading-relaxed mb-8 font-light">
              European-grade 6063-T5 architectural aluminum profiles and handleless Gola systems.
              Engineered for seamless integration with Suraj Wood acrylic surfaces and luxury cabinetry.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#series-explorer"
                className="bg-copper hover:bg-copper-light text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-0.5 text-xs md:text-sm flex items-center gap-2"
              >
                Explore All 7 Series
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact?inquiry=hardware-catalog"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-navy font-bold px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-xs md:text-sm flex items-center gap-2"
              >
                <Download size={16} />
                Download Catalog (PDF)
              </Link>
            </div>
          </div>
        </div>

        {/* Series Quick-Jump Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-8">
          <div className="bg-navy-dark/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3 md:p-4 shadow-2xl">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] font-bold text-copper uppercase tracking-widest shrink-0 mr-2">
                Quick Select:
              </span>
              {ALUMINUM_SERIES.map((s) => {
                const Icon = SERIES_ICONS[s.id] || Maximize;
                const isActive = activeSeriesId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSeriesId(s.id);
                      const el = document.getElementById(s.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-copper text-white shadow-md shadow-copper/30 scale-105"
                        : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Series Explorer Section */}
      <section id="series-explorer" className="bg-[#FAF9F6] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-copper tracking-[0.25em] text-[11px] uppercase font-bold mb-2">
              AL-PROFHAN Catalog 2025
            </p>
            <h2 className="font-playfair text-3xl md:text-5xl text-navy">
              Engineered Profile Series
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 italic">
              Authentic CAD 2D cross-sections, real modular kitchen installations, and detailed
              dimensional specifications directly from our official catalog.
            </p>
          </div>

          {/* Series Cards */}
          <div className="space-y-20">
            {ALUMINUM_SERIES.map((series: AluminumSeries, idx: number) => {
              const Icon = SERIES_ICONS[series.id] || Maximize;
              const currentProductCode =
                selectedProductMap[series.id] || series.products[0].code;
              const currentProduct: AluminumProduct =
                series.products.find((p) => p.code === currentProductCode) ||
                series.products[0];

              const currentPhotoIndex = selectedPhotoIndexMap[series.id] || 0;
              const activeShowcaseImage =
                series.showcaseImages[currentPhotoIndex] || series.showcaseImages[0];

              return (
                <div
                  key={series.id}
                  id={series.id}
                  className="bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-xl overflow-hidden scroll-mt-28"
                >
                  {/* Series Header */}
                  <div className="bg-navy p-6 md:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-copper/20 border border-copper/30 flex items-center justify-center text-copper shrink-0 shadow-inner">
                        <Icon size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-extrabold tracking-widest text-copper">
                            Series {idx + 1} of {ALUMINUM_SERIES.length}
                          </span>
                        </div>
                        <h3 className="font-playfair text-2xl md:text-4xl font-bold">
                          {series.name}
                        </h3>
                        <p className="text-copper-light text-xs md:text-sm font-medium">
                          {series.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/contact?inquiry=${series.id}-catalog`}
                        className="bg-copper hover:bg-copper-light text-white font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-colors flex items-center gap-2 shadow-md shadow-copper/20"
                      >
                        Request Series Price List
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Main Series Body */}
                  <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                      
                      {/* Left Column: Real Individual Photos & Gallery Showcase */}
                      <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-extrabold uppercase tracking-widest text-navy">
                              Installation Showcase &middot; Real Sourcing
                            </p>
                            <span className="text-[10px] text-copper font-bold uppercase tracking-wider bg-copper/10 px-2.5 py-0.5 rounded-full">
                              Photo {currentPhotoIndex + 1} of {series.showcaseImages.length}
                            </span>
                          </div>

                          {/* Main Active Application Photo */}
                          <div
                            className="relative aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer bg-gray-50"
                            onClick={() =>
                              setLightboxImage({
                                src: activeShowcaseImage.src,
                                title: `${series.name} &mdash; ${activeShowcaseImage.title}`,
                                desc: activeShowcaseImage.desc || series.description,
                              })
                            }
                          >
                            <Image
                              src={activeShowcaseImage.src}
                              alt={activeShowcaseImage.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white/90 backdrop-blur text-navy text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                                <ZoomIn size={14} /> Click to Enlarge Full Photo
                              </span>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                              <p className="text-xs font-bold leading-snug">{activeShowcaseImage.title}</p>
                              {activeShowcaseImage.desc && (
                                <p className="text-[10px] text-white/80 mt-0.5">{activeShowcaseImage.desc}</p>
                              )}
                            </div>
                          </div>

                          {/* Multiple Individual Photos Thumbnails (e.g. 3 Handle Photos, 5 Ottimo Photos, etc.) */}
                          {series.showcaseImages.length > 1 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                All {series.showcaseImages.length} Installation Perspectives from Catalog:
                              </p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {series.showcaseImages.map((imgItem, pIdx) => {
                                  const isSelectedPhoto = currentPhotoIndex === pIdx;
                                  return (
                                    <button
                                      key={pIdx}
                                      onClick={() => handleSelectPhoto(series.id, pIdx)}
                                      className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all group ${
                                        isSelectedPhoto
                                          ? "border-copper shadow-md scale-102"
                                          : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                                      }`}
                                    >
                                      <Image
                                        src={imgItem.src}
                                        alt={imgItem.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 768px) 33vw, 15vw"
                                      />
                                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
                                      <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1 text-[8px] font-bold text-white">
                                        #{pIdx + 1}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed italic bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          &ldquo;{series.description}&rdquo;
                        </p>
                      </div>

                      {/* Right Column: 3D Profile Sample, 2D CAD Cross-Section & Specs */}
                      <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-extrabold uppercase tracking-widest text-navy">
                              Profile Specification &amp; CAD Specs
                            </p>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                              Select Profile:
                            </span>
                          </div>

                          {/* Profile Selection Tabs with Sample Thumbnails */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                            {series.products.map((p: AluminumProduct) => {
                              const isSelected = p.code === currentProductCode;
                              return (
                                <button
                                  key={p.code}
                                  onClick={() => handleSelectProduct(series.id, p.code)}
                                  className={`p-2.5 rounded-2xl text-left border transition-all duration-200 flex items-center gap-3 ${
                                    isSelected
                                      ? "bg-navy text-white border-navy shadow-lg shadow-navy/20 scale-102"
                                      : "bg-white text-gray-700 border-gray-200 hover:border-copper/50 hover:bg-gray-50"
                                  }`}
                                >
                                  {p.sampleImage && (
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200/40">
                                      <Image
                                        src={p.sampleImage}
                                        alt={p.code}
                                        fill
                                        className="object-contain p-0.5"
                                      />
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold truncate">{p.code}</p>
                                    <p className={`text-[9px] truncate ${isSelected ? "text-white/70" : "text-gray-400"}`}>
                                      {p.size}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Selected Profile Detailed Specs Box */}
                          <div className="bg-[#F6F4EE] rounded-3xl p-5 md:p-6 border border-gray-200/80 shadow-inner space-y-5">
                            
                            {/* Product Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-gray-200/80 pb-3">
                              <div>
                                <span className="text-[10px] font-extrabold text-copper uppercase tracking-wider">
                                  Profile Gauge &amp; Length: {currentProduct.size}
                                </span>
                                <h4 className="font-heading text-lg md:text-xl font-bold text-navy">
                                  {currentProduct.code}
                                </h4>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  {currentProduct.desc}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  setLightboxImage({
                                    src: currentProduct.cardImage || currentProduct.drawing2d,
                                    title: `${currentProduct.code} Official Catalog Card`,
                                    desc: currentProduct.desc,
                                  })
                                }
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-copper hover:text-copper-dark transition-colors self-start bg-white px-3 py-1.5 rounded-lg border border-copper/30 shadow-sm"
                              >
                                <ZoomIn size={12} /> View Full PDF Card
                              </button>
                            </div>

                            {/* Dual Display: 3D Product Sample + 2D CAD Cross-Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              
                              {/* 3D Sample Photo Box (or End Cap) */}
                              {currentProduct.sampleImage ? (
                                <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm flex flex-col items-center justify-between">
                                  <div className="w-full flex items-center justify-between mb-1.5">
                                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-navy bg-gray-100 px-2 py-0.5 rounded">
                                      Actual Sample Photo
                                    </span>
                                    <span className="text-[8px] text-copper font-bold">3D Profile</span>
                                  </div>
                                  <div
                                    className="relative w-full aspect-[4/3] cursor-pointer group"
                                    onClick={() =>
                                      setLightboxImage({
                                        src: currentProduct.sampleImage!,
                                        title: `${currentProduct.code} &mdash; 3D Profile Sample with End Caps`,
                                        desc: currentProduct.desc,
                                      })
                                    }
                                  >
                                    <Image
                                      src={currentProduct.sampleImage}
                                      alt={`${currentProduct.code} 3D sample`}
                                      fill
                                      className="object-contain p-1 group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                      <span className="bg-white/90 text-navy text-[10px] font-bold px-2 py-1 rounded shadow">
                                        Zoom Sample
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-[9px] text-gray-500 font-bold mt-1 text-center truncate w-full">
                                    Actual profile &amp; matching cap
                                  </p>
                                </div>
                              ) : (
                                /* Fallback End Cap Box if sample photo already in gallery */
                                currentProduct.endCap && (
                                  <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm flex flex-col items-center justify-between">
                                    <div className="w-full flex items-center justify-between mb-1.5">
                                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-copper bg-copper/10 px-2 py-0.5 rounded">
                                        {currentProduct.endCap.code}
                                      </span>
                                      <span className="text-[8px] text-gray-400 font-bold">
                                        {currentProduct.endCap.priceUnit || "Accessory"}
                                      </span>
                                    </div>
                                    <div
                                      className="relative w-full aspect-[4/3] cursor-pointer group"
                                      onClick={() => {
                                        if (currentProduct.endCap?.image) {
                                          setLightboxImage({
                                            src: currentProduct.endCap.image,
                                            title: `${currentProduct.endCap.code} &mdash; ${currentProduct.endCap.desc}`,
                                            desc: `Matching hardware accessory for ${currentProduct.code}`,
                                          });
                                        }
                                      }}
                                    >
                                      {currentProduct.endCap.image ? (
                                        <Image
                                          src={currentProduct.endCap.image}
                                          alt={`${currentProduct.endCap.code} end cap`}
                                          fill
                                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
                                          End Cap &amp; Fasteners
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-[9px] text-navy font-bold mt-1 text-center">
                                      {currentProduct.endCap.desc}
                                    </p>
                                  </div>
                                )
                              )}

                              {/* 2D Technical Drawing Box */}
                              <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm flex flex-col items-center justify-between">
                                <div className="w-full flex items-center justify-between mb-1.5">
                                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-navy bg-gray-100 px-2 py-0.5 rounded">
                                    2D CAD Cross-Section
                                  </span>
                                  <span className="text-[8px] text-gray-400 font-bold">Exact mm</span>
                                </div>
                                <div
                                  className="relative w-full aspect-[4/3] cursor-pointer group"
                                  onClick={() =>
                                    setLightboxImage({
                                      src: currentProduct.drawing2d,
                                      title: `${currentProduct.code} &mdash; 2D Cross-Section Dimensions`,
                                      desc: currentProduct.desc,
                                    })
                                  }
                                >
                                  <Image
                                    src={currentProduct.drawing2d}
                                    alt={`${currentProduct.code} 2D drawing`}
                                    fill
                                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                    <span className="bg-white/90 text-navy text-[10px] font-bold px-2 py-1 rounded shadow">
                                      Zoom 2D
                                    </span>
                                  </div>
                                </div>
                                <p className="text-[8px] text-gray-400 uppercase tracking-tight mt-1 text-center font-bold">
                                  Architectural 6063-T5 Gauge
                                </p>
                              </div>

                            </div>

                            {/* Matching End Cap / Connector Strip (if sampleImage is shown above) */}
                            {currentProduct.sampleImage && currentProduct.endCap && (
                              <div className="bg-white rounded-2xl p-3 border border-gray-200 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  {currentProduct.endCap.image && (
                                    <div
                                      className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer shrink-0"
                                      onClick={() =>
                                        setLightboxImage({
                                          src: currentProduct.endCap!.image!,
                                          title: `${currentProduct.endCap!.code} &mdash; ${currentProduct.endCap!.desc}`,
                                          desc: `Matching hardware accessory for ${currentProduct.code}`,
                                        })
                                      }
                                    >
                                      <Image
                                        src={currentProduct.endCap.image}
                                        alt={currentProduct.endCap.code}
                                        fill
                                        className="object-contain p-1"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-xs font-bold text-navy">{currentProduct.endCap.code}</p>
                                    <p className="text-[10px] text-gray-500">{currentProduct.endCap.desc}</p>
                                  </div>
                                </div>
                                {currentProduct.endCap.priceUnit && (
                                  <span className="text-xs font-black text-copper bg-copper/10 px-2.5 py-1 rounded-lg">
                                    {currentProduct.endCap.priceUnit}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Finishes & Pricing Breakdown */}
                            {currentProduct.finishes && currentProduct.finishes.length > 0 && (
                              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-navy mb-3">
                                  Available Finishes &amp; Pricing (3.0 Mtr Length):
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {currentProduct.finishes.map((f) => (
                                    <div
                                      key={f.name}
                                      className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex flex-col justify-between"
                                    >
                                      <p className="text-[11px] font-bold text-navy leading-tight">
                                        {f.name}
                                      </p>
                                      <p className="text-xs font-extrabold text-copper mt-1">
                                        {f.price}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Series Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/contact?inquiry=aluminum-${series.id}`}
                            className="bg-navy hover:bg-copper text-white font-bold px-6 py-3 rounded-xl transition-all text-xs flex items-center gap-2 shadow-md"
                          >
                            Inquire for {series.name}
                            <ArrowRight size={14} />
                          </Link>
                          <Link
                            href="/downloads"
                            className="border border-navy/20 hover:border-navy text-navy font-bold px-5 py-3 rounded-xl transition-all text-xs flex items-center gap-1.5"
                          >
                            <Download size={14} />
                            Download Catalog
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Finishes Hero */}
      <section className="relative py-28 overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/products/aluminum/ottimo-kitchen.png"
            alt="Finishes Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] uppercase font-bold">
                Aesthetic Variety
              </p>
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6">
              Surface Finishes &amp; Coatings
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-10 font-light">
              Every AL-PROFHAN aluminum profile undergoes rigorous anodization or architectural-grade
              powder coating to ensure superior scratch resistance, zero oxidation, and deep tactile elegance.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {FINISHES_PALETTE.map((f) => (
                <div key={f.name} className="group">
                  <div
                    className="w-14 h-14 rounded-2xl mb-3 shadow-xl border border-white/20 group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: f.color }}
                  />
                  <p className="text-sm font-bold text-white mb-0.5">{f.name}</p>
                  <p className="text-[10px] text-white/50">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Specifications & Technical Authority */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 text-copper text-xs font-black uppercase tracking-widest mb-3">
              Engineering Excellence
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-navy">
              Architectural Grade 6063-T5 Specifications
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3">
              SurajWood AL-PROFHAN aluminium profiles are manufactured in accordance with strict international metallurgical standards for luxury interior fit-outs and modular furniture systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-copper/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-copper/10 text-copper flex items-center justify-center mb-4 font-bold">
                6063
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">
                6063-T5 Architectural Alloy
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                High-strength magnesium-silicon aluminum alloy treated with artificial aging (T5 temper). Provides superior mechanical strength, zero distortion under heavy door loads, and unmatched surface smoothness.
              </p>
              <ul className="text-[11px] text-gray-500 space-y-1">
                <li>&bull; <strong>Tensile Strength:</strong> &ge; 215 MPa</li>
                <li>&bull; <strong>Yield Strength:</strong> &ge; 170 MPa</li>
                <li>&bull; <strong>Hardness:</strong> 8 &ndash; 12 Webster</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-copper/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-copper/10 text-copper flex items-center justify-center mb-4 font-bold">
                1.5
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">
                Heavy Gauge 1.2mm &ndash; 1.5mm Wall
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Unlike local market profiles that reduce wall thickness to 0.7mm to cut costs, AL-PROFHAN maintains a calibrated 1.2mm&ndash;1.5mm gauge to ensure zero flex and rock-solid screw retention.
              </p>
              <ul className="text-[11px] text-gray-500 space-y-1">
                <li>&bull; <strong>Standard Continuous Length:</strong> 3.0 Meters (approx. 10 ft)</li>
                <li>&bull; <strong>Tolerance:</strong> &plusmn; 0.15mm CNC mitre accuracy</li>
                <li>&bull; <strong>Sagging Resistance:</strong> Span tested up to 2800mm</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-copper/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-copper/10 text-copper flex items-center justify-center mb-4 font-bold">
                18&mu;
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">
                15&ndash;20&mu; Anodizing &amp; Coating
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Double-sealed electrolytic anodization (Black Brush, Bronze Brush) and thermosetting polyester powder coating (Coffee, Anthracite, Champagne) for long-term corrosion immunity.
              </p>
              <ul className="text-[11px] text-gray-500 space-y-1">
                <li>&bull; <strong>Corrosion Class:</strong> C3/C4 High Humid Resistance</li>
                <li>&bull; <strong>Surface Hardness:</strong> Anti-Scratch &amp; Fingerprint Resistant</li>
                <li>&bull; <strong>UV Stability:</strong> 10+ Years Zero Color Fading</li>
              </ul>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-navy text-white rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden relative">
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-copper">
                Quality Comparison
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mt-1 text-white">
                SurajWood AL-PROFHAN vs. Generic Local Extrusions
              </h3>
              <p className="text-white/70 text-xs md:text-sm mt-1">
                Why architects, interior contractors, and modular furniture OEM factories specify AL-PROFHAN.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-white/60 uppercase tracking-wider text-[10px]">
                    <th className="pb-4 font-bold">Feature / Specification</th>
                    <th className="pb-4 font-bold text-copper-light">SurajWood AL-PROFHAN</th>
                    <th className="pb-4 font-bold text-white/50">Generic Commercial Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/90">
                  <tr>
                    <td className="py-3.5 font-medium">Alloy Composition</td>
                    <td className="py-3.5 font-bold text-amber-300">Certified 6063-T5 Virgin Ingot</td>
                    <td className="py-3.5 text-white/50">Recycled scrap aluminum (brittle)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium">Wall Thickness Gauge</td>
                    <td className="py-3.5 font-bold text-amber-300">1.2mm &ndash; 1.5mm calibrated</td>
                    <td className="py-3.5 text-white/50">0.7mm &ndash; 0.9mm (causes hinge strip-out)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium">Standard Extrusion Length</td>
                    <td className="py-3.5 font-bold text-amber-300">3.00 Meters Continuous (9.84 ft)</td>
                    <td className="py-3.5 text-white/50">2.44m (8 ft) &mdash; leaves joint lines</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium">Gasket &amp; Damper Channel</td>
                    <td className="py-3.5 font-bold text-amber-300">Integrated rubber seal groove for silent closure</td>
                    <td className="py-3.5 text-white/50">None (metal-on-wood rattling)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium">End Caps &amp; Accessories</td>
                    <td className="py-3.5 font-bold text-amber-300">Color-matched precision metal/ABS end caps</td>
                    <td className="py-3.5 text-white/50">Mismatched plastic or open raw cut edges</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium">LED Diffuser Integration</td>
                    <td className="py-3.5 font-bold text-amber-300">High-transmission opal polycarbonate diffusers</td>
                    <td className="py-3.5 text-white/50">Yellowing PVC diffusers with visible hotspots</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium">Surface Warranty &amp; Longevity</td>
                    <td className="py-3.5 font-bold text-amber-300">10-Year Warranty against peeling &amp; oxidation</td>
                    <td className="py-3.5 text-white/50">No warranty; oxidizes in humid kitchens</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Interactive Accordion */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-black uppercase tracking-widest text-copper bg-copper/10 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-navy mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-2 italic">
              Everything you need to know about AL-PROFHAN aluminium profiles, gola handles, finishes, and order dispatch.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Who is the best aluminium profile manufacturer in India for modular kitchens?",
                a: "Suraj Wood (AL-PROFHAN) is a leading Indian manufacturer and supplier of architectural 6063-T5 aluminium profiles. We manufacture integrated Gola handleless profiles, J-pull shutter handles, LED light diffusion channels, and luxury glass shutter systems with German-standard tolerances and pan-India factory direct supply.",
              },
              {
                q: "What is the standard length and wall thickness of AL-PROFHAN aluminum profiles?",
                a: "Our standard architectural profiles are manufactured in 3.0-meter (approx. 10 feet) continuous lengths with an engineered gauge thickness of 1.2mm to 1.5mm for superior structural rigidity, zero sagging, and long-term durability.",
              },
              {
                q: "What aluminum alloy grade is used in SurajWood profiles?",
                a: "We exclusively use high-grade 6063-T5 architectural aluminum alloy. This alloy provides optimal tensile strength, high corrosion resistance, zero oxidation, and a flawless surface for anodizing and powder-coated finishes.",
              },
              {
                q: "What are the available finishes for AL-PROFHAN aluminum profiles?",
                a: "Profiles are available in 5 curated architectural finishes: Black Brush (Anodized), Bronze Brush (Anodized), Coffee Painted (Powder Coated), Anthracite Painted (Metallic Grey), and Champagne Painted (exclusive to Velaro glass shutter series), complete with color-matched metal end caps.",
              },
              {
                q: "What is a Gola profile handle and why is it used in modular kitchens?",
                a: "A Gola profile is a recessed continuous aluminum extrusion mounted directly to the cabinet carcass or door top. It creates a completely handleless, minimalist aesthetic while offering an ergonomic finger-grip channel and integrated rubber gasket for soft, silent shutter closure.",
              },
              {
                q: "Which aluminum profiles are suitable for integrated LED lighting?",
                a: "Our Luminare Series (PAPS-3136A 45° corner profile & PAPS-3062A recessed profile) and Shelf Profiles (PAPS-5037A) feature built-in aluminum heat-sink channels and frosted polycarbonate diffusers for spot-free under-cabinet and wardrobe illumination.",
              },
              {
                q: "How do I order aluminum profile samples or get wholesale dealer pricing?",
                a: "You can request architectural sample swatches and the complete AL-PROFHAN 2026 Price List directly through our website contact form or by calling our national sales team at +91-9009171819. We provide same-day dispatch to major hubs including Bangalore, Mumbai, Delhi NCR, Hyderabad, Chennai, and Ahmedabad.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 transition-all duration-200 open:shadow-lg open:border-copper/40"
              >
                <summary className="font-heading font-bold text-navy text-base md:text-lg cursor-pointer flex items-center justify-between list-none select-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 w-7 h-7 rounded-full bg-gray-100 group-open:bg-copper group-open:text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-90">
                    <ChevronRight size={16} />
                  </span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-4 pt-3 border-t border-gray-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="bg-[#FAF9F6] py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-playfair text-3xl md:text-5xl text-navy mb-4">
            Request Architectural Samples &amp; Quotes
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-10 italic">
            Get physical aluminum profile swatches, full CAD files, and distributor bulk pricing for your projects.
          </p>
          <div className="bg-white p-6 md:p-10 rounded-[32px] shadow-2xl border border-gray-100">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-copper/50"
              />
              <input
                type="email"
                placeholder="Email or Phone"
                className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-copper/50"
              />
              <Link
                href="/contact?inquiry=aluminum-catalog"
                className="bg-copper text-white font-bold rounded-xl px-5 py-3.5 hover:bg-copper-light transition-all shadow-lg shadow-copper/20 flex items-center justify-center gap-2 text-sm"
              >
                Get Sourcing Info
                <ArrowRight size={16} />
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
