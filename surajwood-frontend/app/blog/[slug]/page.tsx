import { getPostBySlug, getPosts } from "@/lib/sanity";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static params — pre-build all blog post pages at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const { posts } = await getPosts(1, 100);
  return posts.map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Gallery images pool (used for featured image if no CMS image)
// ---------------------------------------------------------------------------

const GALLERY_IMAGES = [
  "/images/gallery/3.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/12.jpg",
  "/images/gallery/16.jpg",
  "/images/gallery/20.jpg",
  "/images/gallery/24.jpg",
  "/images/gallery/28.jpg",
  "/images/gallery/32.jpg",
];

const POST_GALLERY_MAP: Record<string, string> = {
  "acrylic-vs-laminate-kitchen-panels-india": "/images/gallery/3.jpg",
  "kitchen-design-trends-india-2026": "/images/gallery/7.jpg",
  "how-to-clean-acrylic-kitchen-panels": "/images/gallery/12.jpg",
  "acrylic-panel-thickness-guide": "/images/gallery/16.jpg",
  "modular-kitchen-material-comparison": "/images/gallery/20.jpg",
  "architects-guide-specifying-acrylic-panels": "/images/gallery/24.jpg",
};

function getPostImage(slug: string, fallbackUrl: string | undefined, index = 0): string {
  if (POST_GALLERY_MAP[slug]) return POST_GALLERY_MAP[slug];
  if (fallbackUrl && !fallbackUrl.includes("placehold.co")) return fallbackUrl;
  return GALLERY_IMAGES[index % GALLERY_IMAGES.length];
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found | SurajWood" };

  const imgSrc = getPostImage(post.slug, post.featured_image.url);

  return {
    title: `${post.title} | SurajWood Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: imgSrc, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
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

function AuthorCard({ author, date }: { author: string; date: string }) {
  return (
    <div className="flex items-center gap-4 py-6 border-t border-b border-gray-100 my-8">
      <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
        <span className="text-white font-bold font-heading text-base">
          {author.charAt(0).toUpperCase()}
        </span>
      </div>
      <div>
        <p className="font-semibold text-navy text-sm">{author}</p>
        <p className="text-gray-400 text-xs mt-0.5">Published {formatDate(date)}</p>
      </div>
    </div>
  );
}

function SidebarSampleCTA() {
  return (
    <div className="bg-navy rounded-2xl p-6 text-white sticky top-24">
      <div className="text-copper text-xs font-semibold uppercase tracking-widest mb-3">
        Free Sample Kit
      </div>
      <h3 className="font-heading font-bold text-lg mb-3 leading-snug">
        Experience the Quality in Your Hands
      </h3>
      <p className="text-white/70 text-sm leading-relaxed mb-5">
        Request a free sample kit with swatches of all five Suraj Wood acrylic panel
        collections. Dispatched within 2–3 business days, pan-India.
      </p>
      <Link
        href="/contact"
        className="block text-center bg-copper hover:bg-copper-light text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors duration-200"
      >
        Request Free Samples
      </Link>
      <div className="mt-4 pt-4 border-t border-white/20">
        <a
          href="tel:+919999995553"
          className="flex items-center gap-2 text-white/70 hover:text-white text-xs transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          +91-9999995553
        </a>
      </div>
    </div>
  );
}

function SidebarRelated({
  posts,
  currentSlug,
}: {
  posts: Array<{ slug: string; title: string; date: string; reading_time: number }>;
  currentSlug: string;
}) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-heading font-bold text-navy text-base mb-4">
        Related Articles
      </h3>
      <div className="space-y-4">
        {related.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-3 items-start"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-cream">
              <Image
                src={getPostImage(post.slug, "", i + 1)}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-navy text-sm font-semibold leading-snug group-hover:text-copper transition-colors line-clamp-2">
                {post.title}
              </p>
              <p className="text-gray-400 text-xs mt-1">{post.reading_time} min read</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prose styles injected via a wrapper (Tailwind prose-like styles without the plugin)
// ---------------------------------------------------------------------------

function ArticleContent({ html }: { html: string }) {
  return (
    <div
      className="
        article-body
        text-gray-700 text-base leading-relaxed
        [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-navy [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4
        [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3
        [&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
        [&_li]:leading-relaxed [&_li]:text-gray-700
        [&_strong]:font-semibold [&_strong]:text-navy
        [&_em]:italic [&_em]:text-gray-600
        [&_a]:text-copper [&_a]:underline [&_a]:hover:text-copper-light
        [&_blockquote]:border-l-4 [&_blockquote]:border-copper [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6
        [&_hr]:border-gray-200 [&_hr]:my-8
        [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:mb-6
        [&_th]:bg-navy [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
        [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, postsResult] = await Promise.all([
    getPostBySlug(slug),
    getPosts(1, 20),
  ]);
  const allPosts = postsResult.posts;

  if (!post) notFound();

  const featuredImageSrc = getPostImage(post.slug, post.featured_image.url);

  const schemas = [
    generateArticleSchema(post),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Blog", url: "https://www.surajwood.com/blog" },
      { name: post.title, url: `https://www.surajwood.com/blog/${post.slug}` },
    ]),
    generateOrganizationSchema(),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO — full-width featured image                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-[420px] sm:h-[520px] overflow-hidden bg-navy">
        <Image
          src={featuredImageSrc}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Breadcrumb */}
            <nav className="mb-5" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">›</li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li className="text-white/40">›</li>
                <li className="text-white/80 line-clamp-1 max-w-xs" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <CategoryBadge key={cat} category={cat} />
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white max-w-3xl leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ARTICLE BODY + SIDEBAR                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Article (8/12) */}
            <main className="lg:col-span-8">
              {/* Excerpt lead */}
              <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-copper pl-5 mb-8 italic">
                {post.excerpt}
              </p>

              {/* Article body */}
              <ArticleContent html={post.content} />

              {/* Author card */}
              <AuthorCard author={post.author} date={post.date} />

              {/* Tags / categories */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-xs text-gray-400 font-medium mr-1 py-0.5">Topics:</span>
                {post.categories.map((cat) => (
                  <CategoryBadge key={cat} category={cat} />
                ))}
              </div>

              {/* Share row */}
              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Share
                </span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " — " + "https://www.surajwood.com/blog/" + post.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent("https://www.surajwood.com/blog/" + post.slug)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </main>

            {/* Sidebar (4/12) */}
            <aside className="lg:col-span-4">
              <SidebarSampleCTA />
              <SidebarRelated posts={allPosts} currentSlug={slug} />
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER CTA BANNER                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-r from-navy to-navy-light py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="text-copper text-xs font-semibold uppercase tracking-widest mb-3">
              Ready to Upgrade Your Space?
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 leading-snug">
              Interested in premium acrylic panels?
              <br />
              Get a free sample kit delivered to your door.
            </h2>
            <p className="text-white/70 text-sm mb-8">
              5 product lines, 50+ colours, dispatched within 2–3 business days anywhere in
              India. No obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-copper hover:bg-copper-light text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Request Free Sample Kit
              </Link>
              <Link
                href="/products/acrylux"
                className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MORE ARTICLES                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-navy">More Articles</h2>
            <Link
              href="/blog"
              className="text-copper text-sm font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {allPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((relPost, i) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-40 overflow-hidden bg-cream">
                    <Image
                      src={getPostImage(relPost.slug, relPost.featured_image.url, i + 2)}
                      alt={relPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {relPost.categories.slice(0, 1).map((cat) => (
                        <CategoryBadge key={cat} category={cat} />
                      ))}
                    </div>
                    <h3 className="font-heading font-semibold text-navy text-sm leading-snug group-hover:text-copper transition-colors line-clamp-2 flex-1">
                      {relPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                      <span>{formatDate(relPost.date)}</span>
                      <span>·</span>
                      <span>{relPost.reading_time} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
