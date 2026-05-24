import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import designData from "@/data/design-ideas.json";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateOrganizationSchema, generateFAQSchema } from "@/lib/schema";
import PSEOLeadForm from "@/components/forms/PSEOLeadForm";

// ── Static Params — pre-build all 35 design layouts at build time ─────────
export async function generateStaticParams() {
  return designData.ideas.map((idea) => ({
    category: idea.category,
    slug: idea.slug,
  }));
}

interface PageProps {
  params: { category: string; slug: string };
}

// ── Metadata Generator ────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const idea = designData.ideas.find((i) => i.slug === params.slug && i.category === params.category);
  if (!idea) return { title: "Design Idea Not Found | SurajWood" };

  return {
    title: `${idea.title} | Premium Acrylic Interior Layouts | SurajWood`,
    description: `${idea.intro.slice(0, 150)}... Browse structural specifications, recommended PMMA panels, and technical comparisons.`,
    alternates: { canonical: `https://www.surajwood.com/design-ideas/${params.category}/${params.slug}` },
  };
}

export default function DesignDetailPage({ params }: PageProps) {
  const idea = designData.ideas.find((i) => i.slug === params.slug && i.category === params.category);
  const cat = designData.categories.find((c) => c.slug === params.category);
  if (!idea || !cat) notFound();

  // Create local gallery images prefix
  const gallerySuffix = params.category === "kitchen" ? "kitchen" : params.category === "wardrobe" ? "wardrobe" : "commercial";
  const galleryImages = [
    `/images/gallery/${gallerySuffix}-1.jpg`,
    `/images/gallery/${gallerySuffix}-2.jpg`,
    `/images/gallery/${gallerySuffix}-3.jpg`,
    `/images/gallery/${gallerySuffix}-4.jpg`,
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateFAQSchema(idea.faq.map(f => ({ question: f.q, answer: f.a }))),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Design Ideas", url: "https://www.surajwood.com/design-ideas" },
      { name: cat.name, url: `https://www.surajwood.com/design-ideas/${params.category}` },
      { name: idea.title, url: `https://www.surajwood.com/design-ideas/${params.category}/${params.slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ── BREADCRUMB HEADER ──────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-cream border-b border-cream-dark/60 py-3 px-6">
        <ol className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#DC2626] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li>
            <Link href="/design-ideas" className="hover:text-[#DC2626] transition-colors">
              Design Ideas
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li>
            <Link href={`/design-ideas/${params.category}`} className="hover:text-[#DC2626] transition-colors">
              {cat.name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="text-navy font-semibold" aria-current="page">
            {idea.title}
          </li>
        </ol>
      </nav>

      {/* ── HERO H1 ───────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-copper/5 -skew-x-12 transform translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block bg-copper text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {cat.name} Showcase
              </span>
              <span className="inline-block bg-white/5 text-white/60 text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                35+ Layout Series
              </span>
            </div>
            <h1 className="font-playfair font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              {idea.title} <span className="text-copper italic">with PMMA Acrylic</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed font-light italic">
              {idea.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#get-quote"
                className="inline-flex items-center bg-copper hover:bg-copper-light text-white font-bold px-8 py-4 rounded transition-all duration-300 shadow-lg shadow-copper/20"
              >
                Inquire & Route Lead
              </a>
              <a
                href="#blueprint"
                className="inline-flex items-center bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded border border-white/20 backdrop-blur-sm transition-all"
              >
                View Blueprint Spec
              </a>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-copper/20 blur-3xl rounded-full -z-10 scale-75" />
             <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image 
                  src={galleryImages[0]}
                  alt={idea.title}
                  fill
                  className="object-cover"
                  priority
                />
             </div>
          </div>
        </div>
      </section>

      {/* ── CORE DETAILS & COMPARISON ─────────────────────────────────── */}
      <section id="blueprint" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-playfair font-bold text-2xl md:text-4xl text-navy">
              Designing {idea.title} For Lifetime Durability
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg font-light">
              Indian households demand space layouts that combine ergonomic efficiency with high material resistance. Traditional manually-applied sunmica or painted finishes fail quickly under active friction, heavy moisture cycles, and daily cleaning routine. Specifying factory-laminated PMMA acrylic panels ensures your modular design stands up to these everyday challenges while maintaining its mirror-flat aesthetic.
            </p>

            <h3 className="font-heading font-bold text-xl text-navy pt-6">Key Design Benefits</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {idea.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-cream/40 p-4 rounded-2xl border border-cream-dark">
                  <span className="text-copper font-bold text-lg leading-none mt-0.5">✓</span>
                  <span className="text-gray-700 text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>

            {/* Programmatic Comparison Table */}
            <div className="pt-12">
              <h3 className="font-playfair font-bold text-2xl text-navy mb-6">
                Material Assessment for this Application
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-cream-dark">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-xs">
                      <th className="p-4 border-r border-white/10 font-bold">Design Parameters</th>
                      <th className="p-4 border-r border-white/10 font-bold">SurajWood Acrylic</th>
                      <th className="p-4 border-r border-white/10 font-bold">Standard Laminate (Mica)</th>
                      <th className="p-4 font-bold">PU Painted Finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-cream-dark">
                      <td className="p-4 font-bold text-navy border-r border-cream-dark">{idea.comparison.feature}</td>
                      <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">{idea.comparison.surajwood}</td>
                      <td className="p-4 text-gray-600 border-r border-cream-dark">{idea.comparison.laminate}</td>
                      <td className="p-4 text-gray-600">{idea.comparison.paint}</td>
                    </tr>
                    <tr className="bg-cream/20">
                      <td className="p-4 font-bold text-navy border-r border-cream-dark">Edge Durability</td>
                      <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">German PUR Hotmelt (Waterproof)</td>
                      <td className="p-4 text-gray-600 border-r border-cream-dark">Local contact adhesive (Peels)</td>
                      <td className="p-4 text-gray-600">Seamless (Fragile, chips)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="pt-12">
              <h3 className="font-playfair font-bold text-2xl text-navy mb-6">
                Recommended Collections for this Layout
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {idea.products.map((prodSlug) => (
                  <Link
                    key={prodSlug}
                    href={`/products/${prodSlug}`}
                    className="group bg-cream/40 border border-cream-dark rounded-3xl p-6 hover:shadow-md transition-shadow block"
                  >
                    <span className="text-copper text-[10px] font-bold uppercase tracking-widest block mb-2">
                      Matching Collection
                    </span>
                    <h4 className="font-heading font-bold text-navy text-lg group-hover:text-copper transition-colors">
                      {prodSlug.toUpperCase()} Series
                    </h4>
                    <p className="text-gray-600 text-xs mt-2 font-light">
                      Explore detailed physical swatches, thickness blueprints, and test parameters.
                    </p>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Technical Blueprint */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            
            <div className="bg-navy rounded-[30px] p-8 text-white shadow-2xl">
              <h3 className="font-heading font-bold text-xl mb-6 border-b border-white/10 pb-4">
                Layout Blueprint
              </h3>
              <dl className="space-y-4 text-xs md:text-sm">
                {[
                  { label: "Core Board Core", value: "E1 MDF / Calibrated Plywood" },
                  { label: "Surface Thickness", value: "1.0mm - 1.5mm PMMA Layer" },
                  { label: "Edge Banding Adhesion", value: "German Hotmelt PUR" },
                  { label: "Hardness Index", value: "3H Pencil Hardness" },
                  { label: "Stain Compliance", value: "Turmeric & Acid Resistant" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 border-b border-white/5 pb-2">
                    <dt className="text-white/50 text-[10px] uppercase tracking-widest">{label}</dt>
                    <dd className="text-white font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#get-quote"
                className="mt-8 block w-full text-center bg-white text-navy font-bold py-3.5 rounded hover:bg-copper hover:text-white transition-all text-xs md:text-sm"
              >
                Inquire & Order Samples
              </a>
            </div>

            <div className="p-6 bg-cream border border-cream-dark rounded-[24px] flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                🚚
              </div>
              <div>
                <p className="text-navy font-bold text-sm">Direct Project Supply</p>
                <p className="text-gray-500 text-xs font-light">Lead routed to Bahadurgarh Sales Office</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────────────────────────────── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-navy">
              Design Layout Galleries
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Browse actual high-resolution interior layout captures.
            </p>
            <div className="w-20 h-1 bg-copper mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-[4/3] bg-navy"
              >
                <Image
                  src={img}
                  alt={`${idea.title} capture ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (AEO) ─────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6 border-t border-cream-dark">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair font-bold text-3xl text-navy mb-10 text-center">
            Common Inquiries for {idea.title} Layouts
          </h2>
          <div className="space-y-6">
            {idea.faq.map((f, i) => (
              <details
                key={i}
                className="group bg-cream/10 rounded-2xl border border-cream-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer list-none font-bold text-navy hover:text-copper transition-colors">
                  <span className="text-sm md:text-base">{f.q}</span>
                  <span
                    className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-copper text-lg group-open:rotate-45 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-cream-dark/30 pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM (ROUTED TO CENTRAL DESK) ────────────────── */}
      <section id="get-quote" className="bg-cream/40 py-24 px-6 relative border-t border-cream-dark">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-cream-dark">
            <div className="text-center mb-12">
              <span className="text-copper font-bold text-sm uppercase tracking-widest">Inquiry Desk</span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-navy mt-4">
                Partner with SurajWood on this Design
              </h2>
              <p className="text-gray-600 mt-4 text-base md:text-lg font-light">
                Request physical samples and layout consultation. Our central sales desk coordinates direct-from-factory pricing and dispatches catalogs within 24 hours.
              </p>
            </div>
            {/* Form mapped to contact form / central sales team routing as requested */}
            <PSEOLeadForm
              city="Central Sales Office"
              productInterest={idea.products.join(" & ").toUpperCase()}
              sourcePage={`/design-ideas/${params.category}/${params.slug}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
