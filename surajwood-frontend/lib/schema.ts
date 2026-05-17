import type { SanityProduct, SanityPost, SanityFAQ } from "@/types/sanity";

// ---------------------------------------------------------------------------
// Organisation / site-wide schema
// ---------------------------------------------------------------------------

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Suraj Wood Products Pvt. Ltd.",
    alternateName: "SurajWood",
    url: "https://www.surajwood.com",
    logo: "https://www.surajwood.com/images/logo/suraj-logo.png",
    description:
      "India's premium acrylic panel manufacturer. European technology, precision manufacturing, pan-India delivery of ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS and ACRYGLASS MATTE panels.",
    telephone: "+91-9009171819",
    email: "sales@surajwood.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 KM Stone, VPO Rohad",
      addressLocality: "Bahadurgarh",
      addressRegion: "Haryana",
      postalCode: "124501",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/surajwood_",
      "https://www.linkedin.com/company/surajwood",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Suraj Wood",
    url: "https://www.surajwood.com",
    description:
      "India's premium acrylic panel manufacturer — ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS and ACRYGLASS MATTE panels for kitchens, wardrobes, and commercial interiors.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.surajwood.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------------------------------------------------------------------------
// Product schema
// ---------------------------------------------------------------------------

export function generateProductSchema(product: SanityProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Suraj Wood",
    },
    image: product.hero_image.url,
    url: `https://www.surajwood.com/products/${product.slug}`,
    material: product.material_composition,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Suraj Wood Products Pvt. Ltd.",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Finish Type",
        value: product.finish_type,
      },
      {
        "@type": "PropertyValue",
        name: "Thickness",
        value: product.thickness,
      },
      {
        "@type": "PropertyValue",
        name: "Dimensions",
        value: product.dimensions,
      },
      {
        "@type": "PropertyValue",
        name: "Scratch Resistance",
        value: product.technical_specs.scratch_resistance,
      },
      {
        "@type": "PropertyValue",
        name: "Fire Rating",
        value: product.technical_specs.fire_rating,
      },
      {
        "@type": "PropertyValue",
        name: "Warranty",
        value: product.technical_specs.warranty,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Local Business schema (supports optional city context)
// ---------------------------------------------------------------------------

interface LocalBusinessCity {
  name: string;
  state: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
  telephone?: string;
}

const LOCATIONS: Record<string, LocalBusinessCity> = {
  delhi: {
    name: "Delhi NCR",
    state: "Delhi",
    addressLocality: "Bahadurgarh",
    addressRegion: "Haryana",
    postalCode: "124501",
    streetAddress: "45 KM Stone, VPO Rohad",
    telephone: "+91-9009171819",
  },
  bangalore: {
    name: "Bangalore",
    state: "Karnataka",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    streetAddress: "Bangalore Dealer Network",
    telephone: "+91-9009171819",
  },
};

export function generateLocalBusinessSchema(city?: string) {
  const location =
    city && LOCATIONS[city.toLowerCase()]
      ? LOCATIONS[city.toLowerCase()]
      : LOCATIONS.delhi;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Suraj Wood Products Pvt. Ltd. — ${location.name}`,
    url: "https://www.surajwood.com",
    logo: "https://www.surajwood.com/images/logo/suraj-logo.png",
    image: "https://www.surajwood.com/images/factory/surajwood-factory.jpg",
    telephone: location.telephone ?? "+91-9009171819",
    email: "sales@surajwood.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹₹",
    description:
      "Premium acrylic panel manufacturer supplying ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, and ACRYGLASS MATTE panels for modular kitchens, wardrobes, and commercial interiors across India.",
  };
}

// ---------------------------------------------------------------------------
// FAQ schema
// ---------------------------------------------------------------------------

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// FAQs from the SanityFAQ type
export function generateFAQSchemaFromSanityFAQ(faqs: SanityFAQ[]) {
  return generateFAQSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));
}

// ---------------------------------------------------------------------------
// Breadcrumb schema
// ---------------------------------------------------------------------------

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Article schema
// ---------------------------------------------------------------------------

export function generateArticleSchema(post: SanityPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image.url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://www.surajwood.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Suraj Wood Products Pvt. Ltd.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.surajwood.com/images/logo/suraj-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.surajwood.com/blog/${post.slug}`,
    },
  };
}
