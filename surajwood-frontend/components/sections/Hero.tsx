"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";

const TRUST_STATS = [
  { value: "15+", label: "Years" },
  { value: "50+", label: "Shades" },
  { value: "10,000+", label: "Projects" },
  { value: "Pan-India", label: "Delivery" },
];

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1]; // cubic-bezier easeOut

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay: delay / 1000 } satisfies Transition,
});

export default function Hero() {
  const handleScrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/banner/bg3.jpg"
        alt="Premium acrylic kitchen interior by SurajWood"
        fill
        priority
        style={{ zIndex: 0, objectFit: "cover", objectPosition: "center" }}
        sizes="100vw"
      />

      {/* Dark gradient overlay — makes text readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }} className="w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6 py-32">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0)}
          className="text-copper tracking-widest text-sm uppercase font-medium"
        >
          India&apos;s Premium Acrylic Panel Manufacturer
        </motion.p>

        {/* H1 */}
        <motion.h1
          {...fadeUp(100)}
          className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
        >
          Elevate Every Interior With{" "}
          <span className="text-copper-light">Premium Acrylic Surfaces</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(200)}
          className="text-xl text-white max-w-2xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        >
          European Technology. Indian Manufacturing. Pan-India Delivery.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(300)}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <Link
            href="/contact?inquiry=sample-kit"
            className="bg-copper hover:bg-copper-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-copper hover:shadow-lg hover:-translate-y-0.5"
          >
            Request Free Sample Kit
          </Link>
          <button
            onClick={handleScrollToProducts}
            className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Collections
          </button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          {...fadeUp(400)}
          className="flex flex-wrap items-center justify-center gap-0 mt-6"
        >
          {TRUST_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center px-5 py-2">
                <span className="font-heading font-bold text-2xl text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-white text-sm mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{stat.label}</span>
              </div>
              {i < TRUST_STATS.length - 1 && (
                <span className="text-copper/70 text-2xl font-light select-none">
                  |
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
