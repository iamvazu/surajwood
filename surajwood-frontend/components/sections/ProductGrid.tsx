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
    <section id="products" className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-copper tracking-widest text-sm uppercase font-medium mb-3">
            Our Collections
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy leading-tight">
            Five Distinct Finishes.{" "}
            <span className="text-copper">Endless Possibilities.</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            Each collection is engineered for a specific aesthetic — find the
            perfect surface for every room in your home.
          </p>
        </div>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const imageSrc =
              PRODUCT_IMAGES[product.slug] ??
              `/images/products/${product.slug}/${product.slug}-1.png`;
            const finishLabel =
              FINISH_LABELS[product.finish_type] ?? product.finish_type;

            return (
              <article
                key={product.id}
                className="rounded-2xl overflow-hidden shadow-product bg-white group transition-all duration-300 hover:-translate-y-2 hover:shadow-navy"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={`${product.name} acrylic panel – ${finishLabel} finish`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Finish badge */}
                  <span className="inline-block text-xs font-semibold text-copper bg-copper/10 px-3 py-1 rounded-full mb-3">
                    {finishLabel}
                  </span>

                  {/* Product name */}
                  <h3 className="font-heading font-bold text-xl text-navy leading-snug">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-gray-600 mt-1">{product.tagline}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* CTA link */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-block mt-4 text-copper font-medium text-sm hover:underline underline-offset-2 transition-colors"
                  >
                    Explore Collection →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products/acrylux"
            className="inline-block border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 font-heading"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
