import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import designData from "@/data/design-ideas.json";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/schema";

// ── Static Params — pre-build all 8 category pages ────────────────────────
export async function generateStaticParams() {
  return designData.categories.map((cat) => ({
    category: cat.slug,
  }));
}

interface PageProps {
  params: { category: string };
}

// ── Metadata Generator ────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = designData.categories.find((c) => c.slug === params.category);
  if (!cat) return { title: "Category Not Found | SurajWood" };

  return {
    title: `Acrylic ${cat.name} Design Ideas & Layouts | SurajWood`,
    description: `Browse professional modular ${cat.name.toLowerCase()} design ideas utilizing high-gloss and matte PMMA acrylic boards. ${cat.description}`,
    alternates: { canonical: `https://www.surajwood.com/design-ideas/${params.category}` },
  };
}

const CATEGORY_IMAGES: Record<string, string> = {
  kitchen: "/images/gallery/kitchen-1.jpg",
  bedroom: "/images/gallery/wardrobe-3.jpg",
  wardrobe: "/images/gallery/wardrobe-1.jpg",
  "living-room": "/images/gallery/tv-1.jpg",
  bathroom: "/images/gallery/bathroom-1.jpg",
  office: "/images/gallery/commercial-premium.png",
  retail: "/images/gallery/commercial-2.jpg",
  "other-rooms": "/images/gallery/kids-1.jpg",
};

export default function DesignCategoryPage({ params }: PageProps) {
  const cat = designData.categories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const ideas = designData.ideas.filter((i) => i.category === params.category);
  const image = CATEGORY_IMAGES[params.category] || "/images/gallery/1.jpg";

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Design Ideas", url: "https://www.surajwood.com/design-ideas" },
      { name: cat.name, url: `https://www.surajwood.com/design-ideas/${params.category}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={`${cat.name} interior layouts backdrop`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Sophisticated Gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        {/* Spacer to clear sticky navbar */}
        <div className="h-32 lg:h-40" />

        {/* Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50">
                <li>
                  <Link href="/" className="hover:text-copper transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">›</li>
                <li>
                  <Link href="/design-ideas" className="hover:text-copper transition-colors">
                    Design Ideas
                  </Link>
                </li>
                <li className="text-white/40">›</li>
                <li className="text-white font-medium text-white/70" aria-current="page">
                  {cat.name}
                </li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Room Layouts
              </p>
            </div>

            {/* H1 */}
            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Acrylic <span className="text-copper italic">{cat.name} Designs</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed font-light italic">
              {cat.description} Explore our curated list of {ideas.length} layout options.
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full h-1 bg-gradient-to-r from-copper/50 to-transparent" />
      </section>

      {/* ── IDEAS GRID ────────────────────────────────────────────────── */}
      <section className="bg-cream/20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea, index) => {
              // Cycle through gallery/kitchen or similar for layouts
              const visualIndex = (index % 4) + 1;
              const visualSuffix = cat.slug === "kitchen" ? "kitchen" : cat.slug === "wardrobe" ? "wardrobe" : "commercial";
              const ideaImg = `/images/gallery/${visualSuffix}-${visualIndex}.jpg`;

              return (
                <div
                  key={idea.slug}
                  className="group flex flex-col bg-white border border-cream-dark/60 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden bg-cream">
                    <Image
                      src={ideaImg}
                      alt={idea.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-navy text-xl group-hover:text-copper transition-colors duration-200 mb-3">
                      {idea.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {idea.intro}
                    </p>

                    <div className="mt-auto pt-6 border-t border-cream-dark flex justify-between items-center">
                      <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
                        {idea.products.join(" + ").toUpperCase()}
                      </span>
                      <Link
                        href={`/design-ideas/${params.category}/${idea.slug}`}
                        className="text-copper hover:text-navy text-sm font-bold flex items-center gap-1 group-hover:underline"
                      >
                        Explore Design →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
