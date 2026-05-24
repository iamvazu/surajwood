/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.surajwood.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/"] },
    ],
    additionalSitemaps: [
      "https://www.surajwood.com/sitemap.xml",
    ],
  },
  exclude: ["/api/*", "/test-logos"],
  changefreq: "weekly",
  priority: 0.7,
  // Page-specific priority overrides
  transform: async (config, path) => {
    // Homepage — highest priority, daily crawl
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Product pages — high priority, weekly crawl
    if (path.startsWith("/products/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Application pages
    if (path.startsWith("/applications/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Blog index — weekly
    if (path === "/blog") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Individual blog posts — weekly
    if (path.startsWith("/blog/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    // Core pages
    if (["/about", "/contact", "/dealers", "/faq"].includes(path)) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  // Include all 50 PSEO pages
  additionalPaths: async (config) => {
    const citiesData = require("./data/cities.json");
    const appsData = require("./data/applications.json");
    const shadesData = require("./data/shades.json");
    const designsData = require("./data/design-ideas.json");

    const products = [
      "acrylux",
      "acrysilk",
      "acrymatte",
      "acryglass",
      "acryglass-matte",
    ];
    const applications = appsData.applications.map((a) => a.slug);
    const cities = citiesData.cities.map((c) => c.slug);

    // 1,250 PSEO pages
    const pseoPages = products.flatMap((product) =>
      applications.flatMap((application) =>
        cities.map((city) => ({
          loc: `/${product}/${application}/${city}`,
          changefreq: "monthly",
          priority: 0.5,
          lastmod: new Date().toISOString(),
        }))
      )
    );

    // 15 Shades pages
    const shadePages = shadesData.map((shade) => ({
      loc: `/shades/${shade.slug}`,
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    }));

    // 35+ Design Ideas pages
    const designPages = designsData.ideas.map((idea) => ({
      loc: `/design-ideas/${idea.category}/${idea.slug}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    // Design category pages
    const designCatPages = designsData.categories.map((cat) => ({
      loc: `/design-ideas/${cat.slug}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    return [...pseoPages, ...shadePages, ...designPages, ...designCatPages];
  },
};
