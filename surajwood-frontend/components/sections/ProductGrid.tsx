import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SanityProduct, FinishType } from "@/types/sanity";

// ─── Helpers ────────────────────────────────────────────────────────────────

const PRODUCT_IMAGES: Record<string, string> = {
  acrylux: "/images/products/acrylux.png",
  acrysilk: "/images/products/acrysilk.jpg",
  acrymatte: "/images/products/acrymatte.png",
  acryglass: "/images/products/acryglass.png",
  "acryglass-matte": "/images/products/acryglass-matte.png",
};

const FINISH_LABELS: Record<FinishType, string> = {
  satin: "Satin",
  "soft-satin": "Soft Satin",
  matte: "Matte",
  "high-gloss": "High Gloss",
  "matte-glass": "Matte Glass",
};

// ─── Props ───────────────────────────────────────────────────────────────────

interface ProductGridProps {
  products: SanityProduct[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="products" className="bg-[#F9F9F7] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-copper tracking-[0.2em] text-xs uppercase font-black mb-3">
            The Acrylic Collections
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
            Five Distinct <span className="text-copper underline decoration-copper/20 underline-offset-8">Acrylic Panel</span> Finishes.{" "}
            <br className="hidden md:block" />
            Endless Possibilities.
          </h2>
        </div>

        {/* Product cards — vertical slabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => {
            const imageSrc =
              PRODUCT_IMAGES[product.slug] ??
              `/images/products/${product.slug}/${product.slug}-1.png`;
            const finishLabel =
              FINISH_LABELS[product.finish_type] ?? product.finish_type;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-[#E5E5E0] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image — Vertical Aspect Ratio for Panels */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={`${product.name} acrylic panel – ${finishLabel} finish`}
                    fill
                    className="object-contain mix-blend-multiply p-4 transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center border-t border-[#F5F5F0]">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-copper bg-copper/5 px-3 py-1 rounded-full mb-3">
                    {finishLabel}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy mb-1 group-hover:text-copper transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[12px] text-gray-500 font-medium line-clamp-2 min-h-[2rem]">
                    {product.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-1 text-gray-400 font-black text-xs uppercase tracking-wider group-hover:text-copper transition-colors">
                    Explore Details <span>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-navy text-white hover:bg-copper font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-navy/10 active:scale-95"
          >
            View Entire Range <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
