"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, type Transition } from "framer-motion";

// ── Hero banner images (carousel) ───────────────────────────────────────────

const HERO_SLIDES = [
  { src: "/images/banner/bg3.jpg", alt: "Premium acrylic kitchen interior by SurajWood" },
  { src: "/images/banner/bg1.jpg", alt: "Modern wardrobe with SurajWood ACRYLUX panels" },
  { src: "/images/banner/bg2.jpg", alt: "Commercial interior featuring SurajWood acrylic surfaces" },
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
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance]);

  const handleScrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[75vh] min-h-[520px] max-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image carousel */}
      {HERO_SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className={`object-cover object-center transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 0 }}
          sizes="100vw"
        />
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-4">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0)}
          className="text-copper tracking-widest text-xs uppercase font-semibold"
        >
          India&apos;s Premium Acrylic Panel Manufacturer
        </motion.p>

        {/* H1 */}
        <motion.h1
          {...fadeUp(100)}
          className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
        >
          Premium Acrylic Panels for{" "}
          <span className="text-copper-light">Indian Interiors</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(200)}
          className="text-lg text-white/85 max-w-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        >
          European Technology. Indian Manufacturing. Pan-India Delivery.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(300)}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link
            href="/contact?inquiry=sample-kit"
            className="bg-copper hover:bg-copper-dark text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-copper hover:shadow-lg hover:-translate-y-0.5 text-sm"
          >
            Request Free Sample Kit
          </Link>
          <button
            onClick={handleScrollToProducts}
            className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 text-sm"
          >
            Explore Collections
          </button>
        </motion.div>

        {/* Trust stats bar — always visible */}
        <motion.div
          {...fadeUp(400)}
          className="flex flex-wrap items-center justify-center gap-0 mt-4"
        >
          {TRUST_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center px-4 py-1.5">
                <span className="font-heading font-bold text-xl text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-white/70 text-xs mt-0.5">{stat.label}</span>
              </div>
              {i < TRUST_STATS.length - 1 && (
                <span className="text-copper/50 text-xl font-light select-none">|</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-copper w-6" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
