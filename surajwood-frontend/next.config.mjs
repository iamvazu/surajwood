/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.surajwood.com",
      },
    ],
  },
  async redirects() {
    return [
      // ── Old PHP site ──────────────────────────────────────────────────
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about-us.php", destination: "/about", permanent: true },
      { source: "/products.php", destination: "/products/acrylux", permanent: true },
      { source: "/contact-us.php", destination: "/contact", permanent: true },
      { source: "/design-your-own-interior.php", destination: "/applications/kitchens", permanent: true },

      // ── Old index.html patterns ───────────────────────────────────────
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/index.html", destination: "/", permanent: true },

      // ── Old product paths (WordPress-style) ───────────────────────────
      { source: "/product/acry-glo", destination: "/products/acrylux", permanent: true },
      { source: "/product/acry-glo/", destination: "/products/acrylux", permanent: true },
      { source: "/product/acrymatte", destination: "/products/acrymatte", permanent: true },
      { source: "/product/acrymatte/", destination: "/products/acrymatte", permanent: true },
      { source: "/product/:slug", destination: "/products/:slug", permanent: true },

      // ── Discontinued / renamed product slugs ──────────────────────────
      { source: "/products/lamilux", destination: "/products", permanent: true },
      { source: "/products/polylux", destination: "/products", permanent: true },
      { source: "/products/acryglo", destination: "/products/acrylux", permanent: true },

      // ── Old content pages ─────────────────────────────────────────────
      { source: "/what-are-acrylic-panels", destination: "/products", permanent: true },
      { source: "/what-are-acrylic-panels/", destination: "/products", permanent: true },
      { source: "/modular-kitchen-designs", destination: "/applications/kitchens", permanent: true },
      { source: "/modular-kitchen-designs/", destination: "/applications/kitchens", permanent: true },
      { source: "/design-your-own-interior", destination: "/applications/kitchens", permanent: true },
      { source: "/service-architecture.html", destination: "/about", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },

      // ── Old privacy/terms (trailing slash) ────────────────────────────
      { source: "/privacy-policy/", destination: "/privacy-policy", permanent: true },
      { source: "/terms-of-service", destination: "/privacy-policy", permanent: true },

      // ── Old blog paths ────────────────────────────────────────────────
      { source: "/blog/", destination: "/blog", permanent: true },
      { source: "/blog/index.html", destination: "/blog", permanent: true },
      { source: "/blog/1", destination: "/blog", permanent: true },
      { source: "/blog/2", destination: "/blog", permanent: true },
      { source: "/blog/3", destination: "/blog", permanent: true },
      { source: "/blog/4", destination: "/blog", permanent: true },
      { source: "/blog/20210211_blog", destination: "/blog", permanent: true },
      { source: "/blog/20210211_blog/", destination: "/blog", permanent: true },
      { source: "/blog/checkout-dark.html", destination: "/blog", permanent: true },
      { source: "/blog/checkout-delivery-dark.html", destination: "/blog", permanent: true },

      // ── Old application paths ─────────────────────────────────────────
      { source: "/applications/bathrooms", destination: "/applications/bathroom-vanities", permanent: true },
      { source: "/applications/retail", destination: "/applications/commercial", permanent: true },

      // ── Old file downloads ────────────────────────────────────────────
      { source: "/surajwood/img/e-book.pdf", destination: "/downloads", permanent: true },
    ];
  },
};

export default nextConfig;

