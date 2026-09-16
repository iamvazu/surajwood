/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@sanity/client",
      "@sanity/image-url",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.surajwood.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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

      // ── Application paths ─────────────────────────────────────────────
      { source: "/applications/bathrooms", destination: "/applications/bathroom-vanities", permanent: true },
      { source: "/applications/retail", destination: "/applications/commercial", permanent: true },

      // ── Design ideas aliases ──────────────────────────────────────────
      {
        source: "/design-ideas/wardrobe/wardrobe-design-for-bedroom",
        destination: "/design-ideas/wardrobe/wardrobe-design",
        permanent: true,
      },
      {
        source: "/design-ideas/bedroom/:slug*",
        destination: "/design-ideas/wardrobe",
        permanent: true,
      },
      {
        source: "/design-ideas/retail/:slug*",
        destination: "/design-ideas/office",
        permanent: true,
      },

      // ── Old file downloads ────────────────────────────────────────────
      { source: "/surajwood/img/e-book.pdf", destination: "/downloads", permanent: true },
    ];
  },
};

export default nextConfig;

