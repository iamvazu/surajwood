"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { SanityProduct, FinishType } from "@/types/sanity";

interface ProductColor {
  name: string;
  code: string;
  image: string;
  hex: string;
}

const PRODUCT_ROTATING_SHADES: Record<string, ProductColor[]> = {
  acrylux: [
    { name: "Signal Red", code: "1301", image: "/images/Newphotos/Acrylux/1301%20RED.jpg", hex: "#C8102E" },
    { name: "Snow White", code: "1302", image: "/images/Newphotos/Acrylux/1302%20White.jpg", hex: "#F5F5F5" },
    { name: "Jet Black", code: "1305", image: "/images/Newphotos/Acrylux/1305%20Black.jpg", hex: "#1A1A1A" },
    { name: "Feather Blue", code: "1331", image: "/images/Newphotos/Acrylux/1331%20Feather%20Blue.jpg", hex: "#4A90E2" },
    { name: "Sea Green", code: "1333", image: "/images/Newphotos/Acrylux/1333%20Sea%20Green.jpg", hex: "#2E8B57" },
    { name: "Cashmere", code: "1337", image: "/images/Newphotos/Acrylux/1337%20Cashmere.jpg", hex: "#D4C4B5" },
  ],
  acrysilk: [
    { name: "Cuprous Silk", code: "5006", image: "/images/Newphotos/Acrysilk/5006%20CUPROUS.jpg", hex: "#8A5A36" },
    { name: "Patina Gold", code: "5001", image: "/images/Newphotos/Acrysilk/5001%20Patina.jpg", hex: "#C5A059" },
    { name: "Aurum Bronze", code: "5002", image: "/images/Newphotos/Acrysilk/5002%20Aurum.jpg", hex: "#B8860B" },
    { name: "Scandia Silver", code: "5004", image: "/images/Newphotos/Acrysilk/5004%20Scandia.jpg", hex: "#A8A9AD" },
    { name: "Griseo Grey", code: "5005", image: "/images/Newphotos/Acrysilk/5005%20Griseo.jpg", hex: "#6E7074" },
    { name: "Bronzo Silk", code: "5007", image: "/images/Newphotos/Acrysilk/5007%20BRONZO.jpg", hex: "#614028" },
  ],
  acrymatte: [
    { name: "Anthracite", code: "3322", image: "/images/Newphotos/Acrymatte/3322%20Anthracite.jpg", hex: "#292A2D" },
    { name: "Pure White", code: "3302", image: "/images/Newphotos/Acrymatte/3302%20White.jpg", hex: "#FAFAFA" },
    { name: "Royal Blue", code: "3334", image: "/images/Newphotos/Acrymatte/3334%20Royal%20Blue.jpg", hex: "#1C39BB" },
    { name: "Sea Green", code: "3333", image: "/images/Newphotos/Acrymatte/3333%20Sea%20Green.jpg", hex: "#3B6E5B" },
    { name: "Cashmere Matte", code: "3337", image: "/images/Newphotos/Acrymatte/3337%20Cashmere.jpg", hex: "#CFC3B8" },
    { name: "Cappuccino", code: "3315", image: "/images/Newphotos/Acrymatte/3315%20Cappuccino.jpg", hex: "#9E7B66" },
  ],
  acryglass: [
    { name: "Mirror Black", code: "405", image: "/images/Newphotos/Acryglass%20Gloss/405%20Black.jpg", hex: "#0D0D0D" },
    { name: "Crystal White", code: "402", image: "/images/Newphotos/Acryglass%20Gloss/402%20White.jpg", hex: "#FFFFFF" },
    { name: "Sea Green", code: "418", image: "/images/Newphotos/Acryglass%20Gloss/418%20Sea%20Green.jpg", hex: "#205848" },
    { name: "Dark Grey", code: "423", image: "/images/Newphotos/Acryglass%20Gloss/423%20Dark%20Grey.jpg", hex: "#43464B" },
    { name: "Beige Cream", code: "415", image: "/images/Newphotos/Acryglass%20Gloss/415%20Beige.jpg", hex: "#E3DAC9" },
    { name: "Slate Grey", code: "439", image: "/images/Newphotos/Acryglass%20Gloss/439%20Slate%20Grey.jpg", hex: "#5C6770" },
  ],
  "acryglass-matte": [
    { name: "Sea Green Matte", code: "318", image: "/images/Newphotos/Acryglass%20MAtte/318%20Sea%20Green.jpg", hex: "#4B7C6E" },
    { name: "Frost White", code: "302", image: "/images/Newphotos/Acryglass%20MAtte/302%20White.jpg", hex: "#F0F3F4" },
    { name: "Titanio", code: "341", image: "/images/Newphotos/Acryglass%20MAtte/341%20Titanio.jpg", hex: "#878E99" },
    { name: "Sand Beige", code: "315", image: "/images/Newphotos/Acryglass%20MAtte/315%20Beige.jpg", hex: "#D8C7B5" },
    { name: "Dark Grey Matte", code: "323", image: "/images/Newphotos/Acryglass%20MAtte/323%20Dark%20Grey.jpg", hex: "#3A3D40" },
    { name: "Slate Grey Matte", code: "339", image: "/images/Newphotos/Acryglass%20MAtte/339%20Slate%20Grey.jpg", hex: "#636B73" },
  ],
};

const FINISH_LABELS: Record<FinishType, string> = {
  satin: "High Gloss",
  "soft-satin": "Soft Satin",
  matte: "Matte",
  "high-gloss": "High Gloss",
  "matte-glass": "Matte Glass",
};

interface ProductGridProps {
  products: SanityProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  // Global 30-second color rotation index across product cards
  const [globalShadeIndex, setGlobalShadeIndex] = useState(0);
  // Allow per-card manual hover/click overrides
  const [activeIndices, setActiveIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalShadeIndex((prev) => (prev + 1) % 6);
      // Reset manual overrides on auto-tick to keep rotating in sync
      setActiveIndices({});
    }, 30000); // Rotates every 30 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="products" className="bg-[#F9F9F7] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/10 border border-copper/20 mb-3">
            <Sparkles size={13} className="text-copper" />
            <p className="text-copper tracking-[0.2em] text-[10px] md:text-xs uppercase font-black">
              Dynamic Color Showcase • 50+ Ready Shades
            </p>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
            High-Gloss &amp; Matte <span className="text-copper underline decoration-copper/20 underline-offset-8">Acrylic Sheets &amp; Panels</span>{" "}
            <br className="hidden md:block" />
            for Kitchen Cabinets &amp; Wardrobes
          </h2>
          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Engineered with optical-grade PMMA polymer and German PUR hotmelt bonding. Auto-rotating through popular curated shades every 30 seconds.
          </p>
        </div>

        {/* Product cards — vertical slabs with rotating swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => {
            const shades = PRODUCT_ROTATING_SHADES[product.slug] ?? [];
            const currentIdx =
              activeIndices[product.slug] !== undefined
                ? activeIndices[product.slug]
                : (globalShadeIndex % (shades.length || 1));
            
            const activeShade = shades[currentIdx] ?? {
              name: product.name,
              code: "STD",
              image: `/images/products/${product.slug}/${product.slug}-1.png`,
              hex: "#888888",
            };

            const finishLabel =
              FINISH_LABELS[product.finish_type] ?? product.finish_type;

            return (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden bg-white border border-[#E5E5E0] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="block relative aspect-[3/4] bg-gray-100 overflow-hidden"
                >
                  {/* Rotating Swatch Image */}
                  <Image
                    key={activeShade.image}
                    src={activeShade.image}
                    alt={`${product.name} acrylic sheet in ${activeShade.name} (${activeShade.code})`}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-108 animate-fade-in"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />

                  {/* Active Shade Overlay Tag */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-md">
                      {activeShade.code} {activeShade.name}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow" title="Auto-rotating every 30s" />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 text-center border-t border-[#F5F5F0]">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-copper bg-copper/5 px-3 py-1 rounded-full mb-2">
                    {finishLabel}
                  </span>
                  
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-heading font-bold text-lg text-navy mb-1 group-hover:text-copper transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[12px] text-gray-500 font-medium line-clamp-2 min-h-[2rem]">
                    {product.tagline}
                  </p>

                  {/* Interactive Mini Swatch Dots */}
                  {shades.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5">
                      {shades.map((shade, sIdx) => {
                        const isSelected = sIdx === currentIdx;
                        return (
                          <button
                            key={shade.code}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveIndices((prev) => ({ ...prev, [product.slug]: sIdx }));
                            }}
                            onMouseEnter={() => {
                              setActiveIndices((prev) => ({ ...prev, [product.slug]: sIdx }));
                            }}
                            title={`${shade.code} - ${shade.name}`}
                            className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                              isSelected
                                ? "ring-2 ring-copper ring-offset-1 scale-125 border-white"
                                : "border-gray-300 opacity-60 hover:opacity-100 hover:scale-110"
                            }`}
                            style={{ backgroundColor: shade.hex }}
                            aria-label={`Preview ${shade.name}`}
                          />
                        );
                      })}
                    </div>
                  )}

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-4 flex items-center justify-center gap-1 text-gray-400 font-black text-xs uppercase tracking-wider group-hover:text-copper transition-colors"
                  >
                    <span>View All {shades.length}+ Shades</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-navy text-white hover:bg-copper font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-navy/10 active:scale-95"
          >
            Explore Complete Shade Range <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
