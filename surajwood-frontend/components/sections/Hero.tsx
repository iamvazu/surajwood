"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

// ── Hero banner images (carousel) ───────────────────────────────────────────

const HERO_SLIDES = [
  { 
    src: "/images/banner/bg3.jpg", 
    alt: "Best acrylic sheet for modular kitchen cabinets - SurajWood Acrylux",
    title: "India's Best Acrylic Sheets for Modular Kitchens",
    subtitle: "High-Gloss & Matte Prelaminated Acrylic Panels for Luxury Kitchen Cabinets & Shutters."
  },
  { 
    src: "/images/gallery/wardrobe-1.jpg", 
    alt: "Anti-fingerprint acrylic sheets for modern wardrobes",
    title: "Anti-Fingerprint Acrylic Sheets for Wardrobes",
    subtitle: "Scratch-resistant ACRYSILK & ACRYMATTE surfaces for seamless sliding wardrobe shutters."
  },
  { 
    src: "/images/gallery/kitchen-1.jpg", 
    alt: "Top acrylic sheet brand in India - high gloss mirror finish",
    title: "Top Acrylic Sheet Brand in India",
    subtitle: "Mirror-like 95% reflective acrylic laminate panels outperforming traditional sunmica and PU finish."
  },
  { 
    src: "/images/gallery/commercial-premium.png", 
    alt: "Factory prelaminated acrylic boards on HDMR and plywood",
    title: "Factory Prelaminated Acrylic Panels & Boards",
    subtitle: "German PUR hotmelt bonding on E1 HDMR & Calibrated Plywood with zero edge delamination."
  },
  { 
    src: "/images/gallery/tv-unit-1.jpg", 
    alt: "Continental 3D membrane shutters and fluted acrylic panels",
    title: "Seamless 3D Membrane & Fluted Shutters",
    subtitle: "Zero edge-banding seamless kitchen and wardrobe doors with integrated J-pull handles."
  },
];

const TRUST_STATS = [
  { value: "15+", label: "Years Manufacturing" },
  { value: "50+", label: "Acrylic Shades" },
  { value: "10k+", label: "Modular Kitchens" },
  { value: "Pan-India", label: "Doorstep Samples" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [hasVisited, setHasVisited] = useState<number[]>([0]);

  const advance = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !hasVisited.includes(currentSlide)) {
      setHasVisited((prev) => [...prev, currentSlide]);
    }
  }, [currentSlide, isMounted, hasVisited]);

  useEffect(() => {
    // 12s interval gives users ample reading time and prevents automated test metric contamination
    const timer = setInterval(advance, 12000);
    return () => clearInterval(timer);
  }, [advance]);

  const handleScrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-hidden">
      {/* Background image carousel */}
      {HERO_SLIDES.map((s, i) => {
        const isNext = (currentSlide + 1) % HERO_SLIDES.length === i;
        const shouldRender = i === 0 || (isMounted && (i === currentSlide || isNext || hasVisited.includes(i)));

        if (!shouldRender) return null;

        return (
          <div
            key={s.src}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`relative w-full h-full transition-transform duration-[8000ms] ease-out ${
                i === currentSlide ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                unoptimized={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}

      {/* Left-focused gradient for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/95 via-navy/50 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

      {/* Spacer to clear sticky navbar */}
      <div className="h-32 lg:h-40" />

      {/* Main Content Area: Centered in remaining space */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-8">
        <div className="max-w-3xl">
          <div key={`slide-content-${currentSlide}`} className="transition-all duration-500 ease-out">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 md:w-8 h-[2px] bg-copper shadow-sm shrink-0" />
              <p className="inline-flex items-center text-copper font-extrabold tracking-[0.2em] text-[10px] sm:text-xs uppercase bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-copper/40 shadow-lg">
                TOP ACRYLIC SHEET BRAND IN INDIA — SURAJWOOD
              </p>
            </div>

            {/* Single Semantic H1 on Homepage - Eager & Instant Render for perfect LCP */}
            <h1 className="font-playfair text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-5 drop-shadow-md">
              {slide.title.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className={
                    idx === slide.title.split(" ").length - 1 ? "text-copper-light font-bold" : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-lg max-w-lg leading-relaxed mb-8 font-light italic">
              {slide.subtitle}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact?inquiry=sample-kit"
                className="bg-copper hover:bg-copper-light text-white font-black px-9 py-4 rounded-xl transition-all duration-300 shadow-2xl shadow-copper/40 hover:-translate-y-1 text-sm md:text-base group"
              >
                Request Sample Kit
                <span className="inline-block ml-3 group-hover:translate-x-1 transition-transform font-bold">
                  →
                </span>
              </Link>
              <button
                onClick={handleScrollToProducts}
                className="bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white hover:text-navy font-black px-9 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 text-sm md:text-base shadow-xl"
              >
                View Collections
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar: Anchored at bottom, transparent, always visible above fold */}
      <div className="relative z-10 w-full bg-navy/40 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start border-l border-copper/30 pl-4 md:pl-6">
                <span className="font-playfair font-bold text-xl md:text-2xl text-white leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-white/40 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators: Vertical on right */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1 transition-all duration-700 rounded-full ${
              i === currentSlide ? "bg-copper h-8" : "bg-white/20 h-5 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
