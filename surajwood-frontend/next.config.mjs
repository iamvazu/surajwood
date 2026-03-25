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
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about-us.php", destination: "/about", permanent: true },
      { source: "/products.php", destination: "/products/acrylux", permanent: true },
      { source: "/contact-us.php", destination: "/contact", permanent: true },
      {
        source: "/design-your-own-interior.php",
        destination: "/applications/kitchens",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/crm/:path*",
        destination: "https://crm.surajwood.com/crm/:path*",
      },
    ];
  },
};

export default nextConfig;
