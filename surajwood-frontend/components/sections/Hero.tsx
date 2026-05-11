"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, type Transition } from "framer-motion";

// ── Hero banner images (carousel) ───────────────────────────────────────────

const HERO_SLIDES = [
  { src: "/images/banner/bg3.jpg", alt: "Premium acrylic kitchen interior by SurajWood" },
  { src: "/images/gallery/wardrobe-1.jpg", alt: "Modern wardrobe with SurajWood ACRYLUX panels" },
  { src: "/images/gallery/kitchen-1.jpg", alt: "Modern kitchen with SurajWood ACRYLUX panels" },
  { src: "/images/gallery/commercial-1.jpg", alt: "Commercial interior featuring SurajWood acrylic surfaces" },
  { src: "/images/gallery/tv-unit-1.jpg", alt: "Luxury TV unit with SurajWood acrylic finishes" },
];

const TRUST_STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Premium Shades" },
  { value: "10k+", label: "Global Projects" },
  { value: "Pan-India", label: "Fast Delivery" },
];

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay: delay / 1000 } satisfies Transition,
});

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const advance = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance]);

  const handleScrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden pt-20">
      {/* Background image carousel with refined Ken Burns */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            animate={i === currentSlide ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="relative w-full h-full"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </div>
      ))}

      {/* Left-focused gradient for text readability without washing out the image */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

      {/* Main Content: Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 flex flex-col items-start gap-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            {...fadeUp(100)}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[2px] bg-copper" />
            <p className="text-copper tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold">
              EST. 2011 — Bahadurgarh, India
            </p>
          </motion.div>

          {/* H1: Ultra-Premium Typography */}
          <motion.h1
            {...fadeUp(200)}
            className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-8"
          >
            Premium Acrylic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper to-copper-light">Panels for Interiors</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            {...fadeUp(300)}
            className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-normal mb-10"
          >
            German PUR bonding technology meets Indian craftsmanship. 
            Delivering optical clarity and 3H scratch resistance for modern spaces.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(400)}
            className="flex flex-wrap gap-5"
          >
            <Link
              href="/contact?inquiry=sample-kit"
              className="bg-copper hover:bg-copper-light text-white font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-1 text-base group"
            >
              Request Free Sample Kit
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <button
              onClick={handleScrollToProducts}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-navy font-bold px-10 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 text-base"
            >
              Explore Collections
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trust bar: Anchored at bottom, transparent, always visible above fold */}
      <div className="relative z-10 w-full bg-navy/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-8">
          <motion.div
            {...fadeUp(500)}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start border-l border-copper/30 pl-4 md:pl-6">
                <span className="font-heading font-bold text-2xl md:text-3xl text-white leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest font-semibold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators: Vertical on right */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1 h-8 transition-all duration-500 rounded-full ${
              i === currentSlide ? "bg-copper scale-y-125" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
