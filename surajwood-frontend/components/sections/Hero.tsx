"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, type Transition } from "framer-motion";

// ── Hero banner images (carousel) ───────────────────────────────────────────

const HERO_SLIDES = [
  { 
    src: "/images/banner/bg3.jpg", 
    alt: "Premium acrylic kitchen interior",
    title: "Curated Culinary Spaces",
    subtitle: "European-grade ACRYLUX panels for the heart of your home."
  },
  { 
    src: "/images/gallery/wardrobe-1.jpg", 
    alt: "Modern wardrobe with SurajWood panels",
    title: "The Art of Organization",
    subtitle: "Bespoke wardrobes crafted with anti-fingerprint ACRYSILK surfaces."
  },
  { 
    src: "/images/gallery/kitchen-1.jpg", 
    alt: "Modern kitchen with SurajWood panels",
    title: "Mirror-Like Brilliance",
    subtitle: "ACRYGLASS high-gloss finishes that redefine modern Indian kitchens."
  },
  { 
    src: "/images/gallery/commercial-1.jpg", 
    alt: "Commercial interior with SurajWood surfaces",
    title: "Architectural Authority",
    subtitle: "Durable, high-traffic surfaces for premium commercial environments."
  },
  { 
    src: "/images/gallery/tv-unit-1.jpg", 
    alt: "Luxury TV unit with SurajWood finishes",
    title: "Sophisticated Living",
    subtitle: "Integrating AL-PROFHAN hardware with master-crafted acrylic panels."
  },
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/30 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

      {/* Main Content: Left Aligned, Slide-Specific Text */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-4xl h-full flex flex-col justify-center items-start">
          {HERO_SLIDES.map((slide, i) => (
            <div 
              key={`text-${i}`} 
              className={i === currentSlide ? "block" : "hidden"}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={i === currentSlide ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-[2px] bg-copper" />
                <p className="text-copper tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold">
                  SURAJ WOOD — PREMIUM SURFACES
                </p>
              </motion.div>

              {/* H1: Playfair Display Serif */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={i === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-playfair text-white text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8"
              >
                {slide.title.split(' ').map((word, idx) => (
                  <span key={idx} className={idx === slide.title.split(' ').length - 1 ? "text-copper" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={i === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-white/80 text-lg md:text-2xl max-w-2xl leading-relaxed mb-12 font-light italic"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={i === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-5"
              >
                <Link
                  href="/contact?inquiry=sample-kit"
                  className="bg-copper hover:bg-copper-light text-white font-bold px-10 py-5 rounded-lg transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-1 text-base group"
                >
                  Request Sample Kit
                  <span className="inline-block ml-3 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <button
                  onClick={handleScrollToProducts}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-navy font-bold px-10 py-5 rounded-lg transition-all duration-300 hover:-translate-y-1 text-base"
                >
                  View Collections
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar: Anchored at bottom, transparent, always visible above fold */}
      <div className="relative z-10 w-full bg-navy/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
          <motion.div
            {...fadeUp(500)}
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start border-l border-copper/30 pl-6">
                <span className="font-playfair font-bold text-3xl md:text-4xl text-white leading-none mb-2">
                  {stat.value}
                </span>
                <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators: Vertical on right */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1 transition-all duration-700 rounded-full ${
              i === currentSlide ? "bg-copper h-12" : "bg-white/20 h-8 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
