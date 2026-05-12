import Image from "next/image";
import Link from "next/link";
import type { SanityProduct, FinishType } from "@/types/sanity";

// ─── Helpers ────────────────────────────────────────────────────────────────

const PRODUCT_IMAGES: Record<string, string> = {
  acrylux: "/images/products/acrylux/acrylux-solid-1.png",
  acrysilk: "/images/products/acrysilk/acrysilk-1.png",
  acrymatte: "/images/products/acrymatte/acrymatte-1.png",
  acryglass: "/images/products/acryglass/acryglass1.png",
  "acryglass-matte": "/images/products/acryglass-matte/acryglass-matte-1.png",
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
    <section id="products" className="bg-cream py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — compact */}
        <div className="text-center mb-8">
          <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-2">
            Our Collections
          </p>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-tight">
            Five Distinct Finishes.{" "}
            <span className="text-copper">Endless Possibilities.</span>
          </h2>
        </div>

        {/* Product cards — compact grid, all visible in one viewport */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                className="group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image — Efficient Aspect Ratio */}
                <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={`${product.name} acrylic panel – ${finishLabel} finish`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
                </div>

                {/* Content — minimal */}
                <div className="p-3 text-center">
                  <span className="inline-block text-[10px] font-semibold text-copper bg-copper/10 px-2 py-0.5 rounded-full mb-1.5">
                    {finishLabel}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-navy leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                    {product.tagline}
                  </p>
                  <span className="inline-block mt-2 text-copper font-semibold text-xs group-hover:underline underline-offset-2">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all CTA — links to products hub */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 font-heading text-sm"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
