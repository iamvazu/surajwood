"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SanityTestimonial } from "@/types/sanity";

// ─── Props ───────────────────────────────────────────────────────────────────

interface TestimonialCarouselProps {
  testimonials: SanityTestimonial[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-white/20"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  // How many cards are visible at once (3 on lg, 1 otherwise — handled via CSS,
  // but we control the "lead" index here for dot navigation)
  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total === 0) return;
    intervalRef.current = setInterval(advance, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advance, isPaused, total]);

  if (total === 0) return null;

  // Build a window of 3 testimonials starting at activeIndex (wrapping)
  const visibleIndices = [0, 1, 2].map((offset) => (activeIndex + offset) % total);

  return (
    <section
      className="bg-navy py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8">
          <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-2">
            Testimonials
          </p>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight">
            What Our Clients Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleIndices.map((idx, position) => {
            const t = testimonials[idx];
            return (
              <article
                key={`${t.id}-${position}`}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-4 transition-all duration-500"
              >
                {/* Stars */}
                <StarRating rating={t.rating} />

                {/* Quote */}
                <blockquote className="text-white/90 italic text-base leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div>
                  <p className="text-white font-bold font-heading">{t.client_name}</p>
                  <p className="text-copper text-sm mt-0.5">
                    {t.designation}
                    {t.company ? `, ${t.company}` : ""}
                  </p>
                  {t.project_type && (
                    <p className="text-white/40 text-xs mt-1">{t.project_type}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-copper w-6"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
