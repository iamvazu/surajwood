"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, type Transition } from "framer-motion";

// ── Hero banner images (carousel) ───────────────────────────────────────────

const HERO_SLIDES = [
  { src: "/images/gallery/kitchen-1.jpg", alt: "Premium acrylic kitchen interior by SurajWood" },
  { src: "/images/gallery/wardrobe-1.jpg", alt: "Modern wardrobe with SurajWood ACRYLUX panels" },
  { src: "/images/gallery/commercial-1.jpg", alt: "Commercial interior featuring SurajWood acrylic surfaces" },
  { src: "/images/gallery/tv-unit-1.jpg", alt: "Luxury TV unit with SurajWood acrylic finishes" },
  { src: "/images/gallery/bathroom-1.jpg", alt: "Premium bathroom vanity with SurajWood panels" },
  { src: "/images/gallery/retail-1.jpg", alt: "High-end retail display using SurajWood surfaces" },
];

const TRUST_STATS = [
  { value: "15+", label: "Years" },
  { value: "50+", label: "Shades" },
  { value: "10,000+", label: "Projects" },
  { value: "Pan-India", label: "Delivery" },
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
    <section className="relative h-[85vh] min-h-[600px] max-h-[900px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image carousel with Ken Burns effect */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 z-0 transition-opacity duration-1500 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            animate={i === currentSlide ? { scale: 1.1, x: 0, y: 0 } : { scale: 1, x: 0, y: 0 }}
            transition={{ duration: 10, ease: "linear" }}
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

      {/* Subtle bottom vignette to ensure trust bar readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />

      {/* Glassmorphism Content Card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="bg-navy/30 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-16 text-center shadow-2xl flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(100)}
            className="text-copper tracking-[0.3em] text-xs uppercase font-bold"
          >
            India&apos;s Premium Acrylic Panel Manufacturer
          </motion.p>

          {/* H1 */}
          <motion.h1
            {...fadeUp(200)}
            className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
          >
            Premium Acrylic Panels for{" "}
            <span className="text-copper">Indian Interiors</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            {...fadeUp(300)}
            className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
          >
            European Technology. Indian Manufacturing. Pan-India Delivery.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(400)}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              href="/contact?inquiry=sample-kit"
              className="bg-copper hover:bg-copper-light text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-1 text-sm md:text-base"
            >
              Request Free Sample Kit
            </Link>
            <button
              onClick={handleScrollToProducts}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-navy font-bold px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 text-sm md:text-base"
            >
              Explore Collections
            </button>
          </motion.div>

          {/* Trust stats bar inside the card */}
          <motion.div
            {...fadeUp(500)}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-8 border-t border-white/10 w-full"
          >
            {TRUST_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-4 md:px-8">
                  <span className="font-heading font-bold text-2xl text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-white/60 text-[10px] uppercase tracking-widest mt-2 font-bold">{stat.label}</span>
                </div>
                {i < TRUST_STATS.length - 1 && (
                  <div className="h-8 w-[1px] bg-white/20 hidden md:block" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentSlide ? "bg-copper w-10" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
