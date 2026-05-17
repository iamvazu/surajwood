"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText,
  RotateCcw,
  Sparkles
} from "lucide-react";
import type { SanityProduct } from "@/types/sanity";

// ---------------------------------------------------------------------------
// Per-product Tech Specs PDF Links
// ---------------------------------------------------------------------------
const SPEC_PDF_LINKS: Record<string, string> = {
  acrylux: "/downloads/ACRYLUX_Technical_Data_Sheet.pdf",
  acrysilk: "/downloads/ACRYSILK_Technical_Data_Sheet.pdf",
  acrymatte: "/downloads/ACRYMATTE_Technical_Data_Sheet.pdf",
  acryglass: "/downloads/ACRYGLASS_Technical_Data_Sheet.pdf",
  "acryglass-matte": "/downloads/ACRYGLASS_MATTE_Technical_Data_Sheet.pdf",
};

// ---------------------------------------------------------------------------
// High-Fidelity 3x3 Gallery Grid Configurations
// ---------------------------------------------------------------------------
const PRODUCT_GALLERY_IMAGES: Record<string, { src: string; caption: string; tag: string }[]> = {
  acrylux: [
    { src: "/images/gallery/kitchen-1.jpg", caption: "Modern Kitchen — Arctic White ACRYLUX [Client Project]", tag: "Modern Kitchen" },
    { src: "/images/gallery/kitchen-2.jpg", caption: "Dark Luxury Kitchen — Midnight Navy ACRYLUX [Client Project]", tag: "Luxury Kitchen" },
    { src: "/images/gallery/kitchen-3.jpg", caption: "Contemporary L-Shape Kitchen — Signal Red ACRYLUX", tag: "Contemporary Kitchen" },
    { src: "/images/gallery/wardrobe-1.jpg", caption: "Floor-to-Ceiling Wardrobe — Snow White ACRYLUX", tag: "Master Wardrobe" },
    { src: "/images/gallery/wardrobe-2.jpg", caption: "Sleek Walk-In Wardrobe — Champagne Gold ACRYLUX", tag: "Dressing Room" },
    { src: "/images/gallery/bathroom-1.jpg", caption: "Bespoke Waterproof Vanity — Ocean Teal ACRYLUX [Client Project]", tag: "Vanity" },
    { src: "/images/gallery/office-1.jpg", caption: "Corporate Boardroom Console — Jet Black ACRYLUX", tag: "Commercial" },
    { src: "/images/gallery/tv-unit-1.jpg", caption: "Minimal TV Console — Charcoal Grey ACRYLUX", tag: "TV Console" },
    { src: "/images/gallery/wall-1.jpg", caption: "Geometric Wall Paneling — Graphite Storm ACRYLUX", tag: "Wall Paneling" },
  ],
  acrysilk: [
    { src: "/images/gallery/kitchen-4.jpg", caption: "Soft-Satin Silk Ivory Kitchen [Client Project]", tag: "Kitchen" },
    { src: "/images/gallery/wardrobe-3.jpg", caption: "Micro-Textured Wardrobe Shutters — Silk Champagne", tag: "Wardrobe" },
    { src: "/images/gallery/wardrobe-4.jpg", caption: "Satin Finish Bedroom Wardrobe — Silk Grey", tag: "Wardrobe" },
    { src: "/images/gallery/kitchen-1.jpg", caption: "Minimalist Satin White Kitchen", tag: "Kitchen" },
    { src: "/images/gallery/bathroom-1.jpg", caption: "Luxury Soft-Satin Vanity", tag: "Vanity" },
    { src: "/images/gallery/tv-unit-1.jpg", caption: "Contemporary Living Room Cladding", tag: "TV Panel" },
    { src: "/images/gallery/office-1.jpg", caption: "Premium Executive Cabinets", tag: "Commercial" },
    { src: "/images/gallery/wall-1.jpg", caption: "Matte-Satin Textured Wall Panels", tag: "Wall Paneling" },
    { src: "/images/gallery/kitchen-2.jpg", caption: "Satin Dark Charcoal Kitchen Layout", tag: "Kitchen" },
  ],
  acrymatte: [
    { src: "/images/gallery/kitchen-2.jpg", caption: "Full Matte Anti-Fingerprint Kitchen — Matte Black [Client Project]", tag: "Kitchen" },
    { src: "/images/gallery/wardrobe-1.jpg", caption: "Minimalist Master Bedroom Wardrobe — Matte Grey", tag: "Wardrobe" },
    { src: "/images/gallery/office-1.jpg", caption: "Executive Desk Cabinets — Matte Charcoal", tag: "Office" },
    { src: "/images/gallery/kitchen-4.jpg", caption: "Nano-Coated Kitchen Island — Matte White", tag: "Kitchen" },
    { src: "/images/gallery/wardrobe-3.jpg", caption: "Modern Slider Wardrobe — Matte Sage [Client Project]", tag: "Wardrobe" },
    { src: "/images/gallery/bathroom-1.jpg", caption: "Premium Anti-Fingerprint Bathroom Vanity", tag: "Vanity" },
    { src: "/images/gallery/tv-unit-1.jpg", caption: "Contemporary Floating Console — Matte Taupe", tag: "TV Console" },
    { src: "/images/gallery/wall-1.jpg", caption: "Bespoke Fluted Cladding — Matte Navy", tag: "Wall Panel" },
    { src: "/images/gallery/kitchen-3.jpg", caption: "L-Shaped Handleless Kitchen — Matte Ivory", tag: "Kitchen" },
  ],
  acryglass: [
    { src: "/images/gallery/kitchen-3.jpg", caption: "Mirror-Gloss Kitchen Cabinets — Ruby Red", tag: "Kitchen" },
    { src: "/images/gallery/kitchen-1.jpg", caption: "High-Reflectivity Island Panel — Crystal White", tag: "Kitchen" },
    { src: "/images/gallery/tv-unit-1.jpg", caption: "Gloss TV Console — Mirror Black", tag: "TV Unit" },
    { src: "/images/gallery/wardrobe-2.jpg", caption: "Premium Gloss Wardrobe Shutters", tag: "Wardrobe" },
    { src: "/images/gallery/bathroom-1.jpg", caption: "High-Gloss Optical Glass Vanity", tag: "Vanity" },
    { src: "/images/gallery/office-1.jpg", caption: "Lobby Reception Cladding — Sapphire Blue", tag: "Commercial" },
    { src: "/images/gallery/wall-1.jpg", caption: "Dramatic Feature Wall Cladding", tag: "Feature Wall" },
    { src: "/images/gallery/kitchen-2.jpg", caption: "Two-Tone Premium Kitchen Grid Layout", tag: "Kitchen" },
    { src: "/images/gallery/wardrobe-4.jpg", caption: "Glass-Gloss Minimal Bedroom Wardrobe", tag: "Wardrobe" },
  ],
  "acryglass-matte": [
    { src: "/images/gallery/kitchen-2.jpg", caption: "Sophisticated Matte-Glass Kitchen — Storm Grey [Client Project]", tag: "Kitchen" },
    { src: "/images/gallery/wardrobe-1.jpg", caption: "Bespoke Glass Clarity Wardrobe — Frost White", tag: "Wardrobe" },
    { src: "/images/gallery/tv-unit-1.jpg", caption: "Sleek Non-Reflective Glass Console", tag: "TV Unit" },
    { src: "/images/gallery/wardrobe-3.jpg", caption: "Premium Dressing Area Slider — Sand Beige", tag: "Wardrobe" },
    { src: "/images/gallery/bathroom-1.jpg", caption: "Anti-Glare Frosted Glass Bathroom Vanity", tag: "Vanity" },
    { src: "/images/gallery/office-1.jpg", caption: "Luxury Corporate Workspace Partitions", tag: "Commercial" },
    { src: "/images/gallery/wall-1.jpg", caption: "Architectural Cladding — Olive Drab [Client Project]", tag: "Wall Panel" },
    { src: "/images/gallery/kitchen-4.jpg", caption: "Matte Glass L-Shaped Kitchen Layout", tag: "Kitchen" },
    { src: "/images/gallery/wardrobe-2.jpg", caption: "Contemporary Master Wardrobe Shutters", tag: "Wardrobe" },
  ]
};

// ---------------------------------------------------------------------------
// Swatch Config Types
// ---------------------------------------------------------------------------
type SwatchGroup = { label: string; swatches: { src: string; caption: string }[] };

interface ProductDetailClientProps {
  product: SanityProduct;
  relatedProducts: SanityProduct[];
  swatchGroups: SwatchGroup[];
  swatchCountLabel: string;
  defaultHeroSrc: string;
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  swatchGroups,
  swatchCountLabel,
  defaultHeroSrc,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string>(defaultHeroSrc);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);
  
  // Set default category filter tab if swatch configs exist
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (swatchGroups.length > 0) {
      setActiveCategory(swatchGroups[0].label);
    }
  }, [swatchGroups]);

  // Gallery items for this specific product, or fall back to general
  const galleryItems = PRODUCT_GALLERY_IMAGES[product.slug] ?? PRODUCT_GALLERY_IMAGES["acrylux"];

  const handleReset = () => {
    setSelectedImage(defaultHeroSrc);
    setSelectedCaption(null);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

  const finishLabel = product.finish_type === "high-gloss" ? "High-Gloss" : 
                      product.finish_type === "soft-satin" ? "Soft-Satin" : 
                      product.finish_type === "matte" ? "Matte" : 
                      product.finish_type === "matte-glass" ? "Matte-Glass" : "Premium";

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* 1. PRODUCT HERO                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/35 via-navy to-navy pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* High Contrast Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-xs md:text-sm text-white/90 font-medium">
              <li>
                <Link href="/" className="hover:text-copper transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="text-white/40">›</li>
              <li>
                <Link href="/products" className="hover:text-copper transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li className="text-white/40">›</li>
              <li className="text-copper font-semibold" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
            {/* Left: Info */}
            <div className="flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-copper" />
                <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-extrabold">
                  {finishLabel} Collection
                </p>
              </div>

              <h1 className="font-playfair text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                {product.name} <br />
                <span className="text-copper">Prelaminated Acrylic</span>
              </h1>

              <p className="text-white/80 text-lg font-body italic mb-5 leading-relaxed">
                {product.slug === "acrylux" 
                  ? "The original flawless mirror-gloss alternative to PETG and local laminates." 
                  : product.tagline}
              </p>

              <p className="text-white/70 font-body text-base leading-relaxed mb-8 max-w-lg">
                {product.slug === "acrylux"
                  ? "SurajWood's ACRYLUX series features factory-bonded optical-grade PMMA acrylic on multiple substrate options. Engineered with German PUR technology for a zero-void, mirror-like finish that outperforms PETG in durability, clarity, and UV stability."
                  : product.description}
              </p>

              {/* Redesigned Premium Specs Row (Card Format) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="text-copper font-bold text-base md:text-lg lg:text-xl line-clamp-1">{product.thickness}</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mt-1.5 font-semibold">Thickness</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="text-copper font-bold text-base md:text-lg lg:text-xl">3H</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mt-1.5 font-semibold">Hardness</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="text-copper font-bold text-base md:text-lg lg:text-xl">German PUR</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mt-1.5 font-semibold">Bonding</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="text-copper font-bold text-base md:text-lg lg:text-xl">Class B1</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mt-1.5 font-semibold">Fire Rating</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?inquiry=quote"
                  className="inline-flex items-center justify-center bg-copper hover:bg-copper-light text-white font-bold text-sm px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg shadow-copper/20"
                >
                  Request Quote
                </Link>
                <Link
                  href="/downloads"
                  className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-bold text-sm px-8 py-4 rounded-lg transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Link>
              </div>
            </div>

            {/* Right: Interactive Product Image Container */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-2xl flex items-center justify-center p-0 border border-white/10">
                
                {/* 85% Panel Filling Optimization */}
                <div className="relative w-[85%] h-[85%]">
                  <Image
                    src={selectedImage}
                    alt={`${product.name} Premium Panel Preview`}
                    fill
                    className="object-contain mix-blend-multiply transition-all duration-300"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Subtly indicate selected color on preview */}
                {selectedCaption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-navy/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-center text-xs font-bold shadow-lg border border-white/10 animate-fade-in flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-copper" />
                    Previewing: <span className="text-copper">{selectedCaption}</span>
                  </div>
                )}
              </div>

              {/* Reset to standard view option */}
              {selectedCaption && (
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs font-semibold text-white/60 hover:text-white flex items-center gap-1.5 transition-colors border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Standard View
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. COLOUR RANGE SECTION                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-20" id="colours">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Header Area */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between border-b border-navy/10 pb-8 mb-10">
            <div>
              <p className="text-copper text-xs font-extrabold uppercase tracking-widest mb-2">
                Premium Palette
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="font-heading text-3xl font-extrabold text-navy">
                  Available Shades
                </h2>
                {swatchCountLabel && (
                  <span className="bg-copper/10 text-copper text-xs font-extrabold px-3 py-1.5 rounded-full border border-copper/20">
                    {swatchCountLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Premium Tab Filters for Multiple Categories */}
            {swatchGroups.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-6 lg:mt-0 bg-navy/5 p-1.5 rounded-xl border border-navy/5">
                {swatchGroups.map((group) => (
                  <button
                    key={group.label}
                    onClick={() => setActiveCategory(group.label)}
                    className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all duration-300 ${
                      activeCategory === group.label
                        ? "bg-navy text-white shadow-lg"
                        : "text-navy/60 hover:text-navy hover:bg-navy/5"
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color swatches display grid */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-navy/5">
            {swatchGroups.map((group) => {
              const isGroupActive = swatchGroups.length <= 1 || activeCategory === group.label;
              if (!isGroupActive) return null;

              return (
                <div key={group.label} className="space-y-6">
                  {swatchGroups.length > 1 && (
                    <h3 className="text-sm font-extrabold text-navy/40 uppercase tracking-widest">
                      {group.label}
                    </h3>
                  )}
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                    {group.swatches.map((swatch) => {
                      const isTileActive = selectedImage === swatch.src;
                      return (
                        <div
                          key={swatch.src}
                          onClick={() => {
                            setSelectedImage(swatch.src);
                            setSelectedCaption(swatch.caption);
                            // Scroll back to hero on click to see it immediately
                            const hero = document.getElementById("colours");
                            if (hero) {
                              hero.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                          <div className={`relative w-20 h-20 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                            isTileActive 
                              ? "ring-4 ring-copper ring-offset-2 scale-105" 
                              : "border border-gray-100 ring-2 ring-transparent group-hover:ring-copper/40 group-hover:scale-105"
                          }`}>
                            <Image
                              src={swatch.src}
                              alt={`${product.name} ${swatch.caption}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <span className="text-[11px] font-bold text-navy/70 text-center leading-tight max-w-[90px] group-hover:text-copper transition-colors">
                            {swatch.caption}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Swatch indicator disclaimer */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-gray-500 font-medium italic">
                * Screen colours are indicative only. Request a physical sample kit for 100% accurate colour matching.
              </p>
              <Link 
                href="/contact?inquiry=samples" 
                className="inline-flex items-center text-xs font-bold text-copper hover:text-copper-light transition-colors"
              >
                Order Free Physical Swatches <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. TECHNICAL SPECS                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header with Technical Spec Sheet Link */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-gray-100 pb-8 mb-10">
              <div>
                <p className="text-copper text-xs font-extrabold uppercase tracking-widest mb-2">
                  Specifications
                </p>
                <h2 className="font-heading text-3xl font-extrabold text-navy">
                  Technical Blueprint
                </h2>
              </div>
              
              {/* Premium PDF Tech Spec Sheet Link */}
              <a
                href={SPEC_PDF_LINKS[product.slug] ?? "/downloads"}
                className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-extrabold text-copper hover:text-copper-light transition-colors border border-copper/20 hover:border-copper/40 bg-copper/5 px-4 py-2.5 rounded-xl"
              >
                <FileText className="w-4 h-4" />
                Download Tech Specs (PDF)
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="font-heading font-extrabold text-navy text-sm uppercase tracking-wider border-b border-gray-200 pb-3 mb-4">
                  Physical Properties
                </h3>
                <dl className="space-y-4">
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Material</dt>
                    <dd className="text-xs font-bold text-navy text-right">Optical-Grade PMMA Acrylic</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Lamination</dt>
                    <dd className="text-xs font-bold text-navy text-right">German PUR Hotmelt Laminated</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Standard Size</dt>
                    <dd className="text-xs font-bold text-navy text-right">{product.dimensions}</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Substrate Options</dt>
                    <dd className="text-xs font-bold text-navy text-right">8mm, 18mm, 25mm E1 MDF / Plywood</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Balancing Layer</dt>
                    <dd className="text-xs font-bold text-navy text-right">Matching Backer for 100% Stability</dd>
                  </div>
                </dl>
              </div>

              {/* Right Column */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="font-heading font-extrabold text-navy text-sm uppercase tracking-wider border-b border-gray-200 pb-3 mb-4">
                  Performance Blueprint
                </h3>
                <dl className="space-y-4">
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Reflectivity</dt>
                    <dd className="text-xs font-bold text-navy text-right">
                      {product.finish_type === "high-gloss" ? "95% mirror reflectance" : "Non-reflective soft diffusion"}
                    </dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Scratch Resistance</dt>
                    <dd className="text-xs font-bold text-navy text-right">{product.technical_specs.scratch_resistance}</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">UV Stability</dt>
                    <dd className="text-xs font-bold text-navy text-right">{product.technical_specs.uv_stability}</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Fire Rating</dt>
                    <dd className="text-xs font-bold text-navy text-right">{product.technical_specs.fire_rating}</dd>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-navy/55 pt-0.5">Warranty</dt>
                    <dd className="text-xs font-bold text-navy text-right">{product.technical_specs.warranty}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Expandable details with openByDefault for Ideal Applications */}
            <div className="mt-10 bg-white rounded-3xl p-8 border border-gray-100 shadow-md space-y-2">
              <h3 className="font-heading font-extrabold text-navy text-base mb-6">
                Detailed Composition & Guidelines
              </h3>
              
              {/* Ideal Applications - OPEN BY DEFAULT */}
              <details open className="group border-b border-gray-100 last:border-b-0 pb-4">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-left font-extrabold text-navy text-sm select-none list-none">
                  <span>Ideal Applications</span>
                  <span className="text-copper group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="pt-2 pl-2 text-gray-600 text-sm leading-relaxed">
                  <ul className="grid grid-cols-2 gap-2 list-none">
                    {product.ideal_for.map((use) => (
                      <li key={use} className="flex items-center gap-2 capitalize font-semibold text-xs text-navy/70">
                        <Check className="w-3.5 h-3.5 text-copper" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="group border-b border-gray-100 last:border-b-0 pb-4">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-left font-extrabold text-navy text-sm select-none list-none">
                  <span>Material Composition</span>
                  <span className="text-copper group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="pt-2 pl-2 text-gray-600 text-xs font-medium leading-relaxed">
                  {product.material_composition}
                </div>
              </details>

              <details className="group border-b border-gray-100 last:border-b-0 pb-4">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-left font-extrabold text-navy text-sm select-none list-none">
                  <span>Surface Properties</span>
                  <span className="text-copper group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="pt-2 pl-2 text-gray-600 text-xs font-medium leading-relaxed">
                  {product.surface_properties}
                </div>
              </details>

              <details className="group border-b border-gray-100 last:border-b-0 pb-4">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-left font-extrabold text-navy text-sm select-none list-none">
                  <span>Installation Notes</span>
                  <span className="text-copper group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="pt-2 pl-2 text-gray-600 text-xs font-medium leading-relaxed">
                  Panels must be acclimatised to site conditions (minimum 24 hours) before fabrication. Store flat — never upright. Minimum ambient temperature during installation: 10°C. Maintain minimum 50mm clearance from direct heat sources such as gas hobs. All cut edges must be banded or sealed with high-quality edge band tape.
                </div>
              </details>

              <details className="group border-b border-gray-100 last:border-b-0 pb-4">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-left font-extrabold text-navy text-sm select-none list-none">
                  <span>Cleaning & Maintenance</span>
                  <span className="text-copper group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="pt-2 pl-2 text-gray-600 text-xs font-medium leading-relaxed">
                  Wipe with a soft, damp microfibre cloth for daily cleaning. For grease or marks, use mild dish soap diluted in water applied with a cloth — never spray directly. Dry immediately. Do not use abrasive cleaners, scouring pads, acetone, bleach, or solvent-based products. Do not use paper towels on high-gloss surfaces.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. PREMIUM 3X3 APPLICATION GALLERY                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center">
            <p className="text-copper text-xs font-extrabold uppercase tracking-widest mb-2">
              Gallery
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-navy">
              See It in Your Space
            </h2>
            <p className="text-navy/60 mt-3 max-w-xl mx-auto text-sm font-semibold">
              Real high-fidelity interior projects featuring {product.name} panels across premium modular systems.
            </p>
          </div>

          {/* High Fidelity 3x3 Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Visual Accent Pill & Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="self-start bg-copper text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md mb-2">
                    {item.tag}
                  </span>
                  <p className="text-white text-xs font-bold leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                
                {/* Default display tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-navy text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm group-hover:opacity-0 transition-opacity">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact?inquiry=samples"
              className="inline-flex items-center justify-center bg-navy hover:bg-copper text-white font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-lg transition-colors duration-300 shadow-md"
            >
              Request Free Sample Kit →
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FAQ ACCORDION                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-copper text-xs font-extrabold uppercase tracking-widest mb-2">
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-extrabold text-navy">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {product.faq.map((item, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-start justify-between cursor-pointer text-left list-none gap-4">
                    <span className="font-heading font-extrabold text-navy text-sm md:text-base leading-snug group-hover:text-copper transition-colors">
                      {item.question}
                    </span>
                    <span className="text-copper text-xl font-bold mt-0.5 shrink-0 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-gray-600 text-xs md:text-sm font-medium leading-relaxed pl-1 border-l-2 border-copper/20 mt-1">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>

            {/* Technical support card */}
            <div className="mt-12 bg-cream rounded-3xl p-8 text-center border border-navy/5 shadow-inner">
              <p className="text-navy font-extrabold font-heading text-base mb-2">
                Have a technical question not answered here?
              </p>
              <p className="text-navy/60 text-xs font-semibold mb-6">
                Our product specialists are available Mon–Sat, 9am–6pm IST.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+919009171819"
                  className="inline-flex items-center justify-center bg-navy text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-copper transition-colors duration-300"
                >
                  Call +91-9009171819
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-navy text-navy font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-navy hover:text-white transition-colors duration-300"
                >
                  Send an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. RELATED PRODUCTS                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-copper text-xs font-extrabold uppercase tracking-widest mb-2">
              Collections
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-navy">
              Explore More Collections
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {relatedProducts.map((rp) => {
              const relatedHeroSrc = rp.slug === "acrylux" ? "/images/products/acrylux.png" :
                                     rp.slug === "acrysilk" ? "/images/products/acrysilk.jpg" :
                                     rp.slug === "acrymatte" ? "/images/products/acrymatte.png" :
                                     rp.slug === "acryglass" ? "/images/products/acryglass.png" :
                                     rp.slug === "acryglass-matte" ? "/images/products/acryglass-matte.png" : "";

              return (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 shrink-0 w-64 shadow-md"
                >
                  {/* Identical Image Cropping Optimization */}
                  <div className="relative h-44 bg-white flex items-center justify-center p-3 border-b border-gray-50">
                    <div className="relative w-[85%] h-[85%]">
                      <Image
                        src={relatedHeroSrc}
                        alt={rp.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        sizes="256px"
                      />
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md mb-3 bg-copper/10 text-copper border border-copper/10">
                        {rp.finish_type === "high-gloss" ? "High Gloss" : 
                         rp.finish_type === "soft-satin" ? "Soft Satin" : 
                         rp.finish_type === "matte" ? "Premium Matte" : 
                         rp.finish_type === "matte-glass" ? "Matte Glass" : "Premium"}
                      </span>
                      <h3 className="font-heading font-extrabold text-navy text-sm group-hover:text-copper transition-colors">{rp.name}</h3>
                      <p className="text-[11px] font-semibold text-navy/55 mt-1.5 line-clamp-2 leading-relaxed">{rp.tagline}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. FULLSCREEN LIGHTBOX MODAL                                       */}
      {/* ------------------------------------------------------------------ */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          
          {/* Lightbox Header */}
          <div className="flex justify-between items-center text-white relative z-10">
            <span className="bg-copper text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {galleryItems[lightboxIndex].tag}
            </span>
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-white/50">
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Slider */}
          <div className="flex-grow flex items-center justify-between relative max-w-6xl mx-auto w-full">
            {/* Left navigation arrow */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1))}
              className="absolute left-0 md:-left-16 z-20 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full transition-all text-white hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Image with height bounds */}
            <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center p-4">
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].caption}
                fill
                className="object-contain rounded-xl select-none"
                sizes="(max-width: 1024px) 100vw, 85vw"
                priority
              />
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0))}
              className="absolute right-0 md:-right-16 z-20 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full transition-all text-white hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Caption Footer */}
          <div className="text-center p-4 relative z-10 max-w-xl mx-auto">
            <p className="text-white text-sm font-semibold leading-relaxed">
              {galleryItems[lightboxIndex].caption}
            </p>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-extrabold">
              Press Escape to exit • Use keyboard arrows to navigate
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 8. STICKY MOBILE CTA                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg animate-slide-up">
        <div className="flex divide-x divide-gray-100">
          <Link
            href="/contact?inquiry=quote"
            className="flex-1 flex flex-col items-center justify-center py-3.5 text-navy hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 mb-1 text-copper"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-[10px] uppercase tracking-wider font-extrabold">Get Quote</span>
          </Link>
          <a
            href="tel:+919009171819"
            className="flex-1 flex flex-col items-center justify-center py-3.5 text-navy hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 mb-1 text-copper"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-[10px] uppercase tracking-wider font-extrabold">Call Now</span>
          </a>
          <a
            href="https://wa.me/919009171819?text=Hi%2C%20I%20am%20interested%20in%20your%20acrylic%20panels"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-3.5 text-navy hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 mb-1 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-green-600">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Spacer so sticky CTA doesn't overlap content on mobile */}
      <div className="h-20 md:hidden" />
    </>
  );
}
