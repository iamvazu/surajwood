import { getPosts } from "@/lib/sanity";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Interior Design Blog | Acrylic Panels Guide | SurajWood",
  description:
    "Expert insights on premium acrylic panels, kitchen design trends, material comparisons, and surface solutions for Indian homes and businesses — from Suraj Wood's editorial team.",
  openGraph: {
    title: "The SurajWood Journal | Interior Design & Acrylic Panel Guides",
    description:
      "Expert insights on acrylic panels, kitchen design trends, material comparisons, and surface solutions for Indian homes and businesses.",
    images: [{ url: "/images/og/blog-og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The SurajWood Journal | Interior Design Blog",
    description: "Expert insights on acrylic panels, kitchen design trends, and surface solutions.",
  },
};

// ---------------------------------------------------------------------------
// Gallery images assigned to posts (cycle through /images/gallery/)
// ---------------------------------------------------------------------------

const GALLERY_IMAGES = [
  "/images/gallery/1.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/9.jpg",
  "/images/gallery/13.jpg",
  "/images/gallery/17.jpg",
  "/images/gallery/21.jpg",
  "/images/gallery/25.jpg",
  "/images/gallery/29.jpg",
];

function getGalleryImage(index: number): string {
  return GALLERY_IMAGES[index % GALLERY_IMAGES.length];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block bg-copper/15 text-copper border border-copper/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
      {category}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPage() {
  const { posts } = await getPosts(1, 20);

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Blog", url: "https://www.surajwood.com/blog" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO (Luxury Alignment)                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[750px] flex flex-col justify-center overflow-hidden bg-navy">
        {/* Background Image with Ken Burns */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/gallery/wardrobe-3.jpg"
              alt="Luxury Interior Background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Sophisticated Gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/40 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/40">›</li>
              <li className="text-white font-medium" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                Insights & Trends
              </p>
            </div>

            {/* H1: Playfair Display Serif */}
            <h1 className="font-playfair text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              The SurajWood <br />
              <span className="text-copper">Journal</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 text-sm md:text-lg lg:text-xl max-w-2xl leading-relaxed font-light italic">
              Expert insights on premium acrylic panels, interior design trends, and technical
              surface solutions for modern Indian homes.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURED POST (first post, full-width)                              */}
      {/* ------------------------------------------------------------------ */}
      {posts.length > 0 && (
        <section className="bg-cream py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-copper text-xs font-semibold uppercase tracking-widest mb-6">
              Featured Article
            </p>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 lg:h-auto min-h-[320px] overflow-hidden">
                <Image
                  src={posts[0].featured_image?.url || getGalleryImage(0)}
                  alt={posts[0].title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {posts[0].categories.slice(0, 2).map((cat) => (
                    <CategoryBadge key={cat} category={cat} />
                  ))}
                </div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-navy leading-tight mb-4 group-hover:text-copper transition-colors duration-200">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{formatDate(posts[0].date)}</span>
                  <span>·</span>
                  <span>{posts[0].reading_time} min read</span>
                  <span>·</span>
                  <span>{posts[0].author}</span>
                </div>
                <span className="mt-6 text-copper font-semibold text-sm group-hover:underline">
                  Read Article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* POST GRID                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-10">
            All Articles
            <span className="ml-3 text-sm font-normal text-gray-400">
              ({posts.length} articles)
            </span>
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No articles yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Featured image */}
                  <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-cream">
                    <Image
                      src={post.featured_image?.url || getGalleryImage(index)}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Category overlay badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {post.categories.slice(0, 1).map((cat) => (
                        <CategoryBadge key={cat} category={cat} />
                      ))}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-heading font-bold text-navy text-lg leading-snug mb-3 group-hover:text-copper transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.reading_time} min read</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-copper text-xs font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* NEWSLETTER / CTA                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">
              Get the SurajWood Newsletter
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              Design trends, material guides, and exclusive offers — delivered monthly.
              No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper"
              />
              <button
                type="button"
                className="bg-copper hover:bg-copper-light text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RELATED APPLICATIONS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-navy">
              Explore Our Applications
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              See how Suraj Wood panels are used across different spaces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: "kitchens", label: "Kitchens", img: "/images/gallery/2.jpg" },
              { slug: "wardrobes", label: "Wardrobes", img: "/images/gallery/11.jpg" },
              { slug: "commercial", label: "Commercial", img: "/images/gallery/21.jpg" },
            ].map((app) => (
              <Link
                key={app.slug}
                href={`/applications/${app.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
              >
                <Image
                  src={app.img}
                  alt={`${app.label} acrylic panels`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-heading font-bold text-white text-lg">{app.label}</span>
                  <p className="text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
                    Explore {app.label} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
