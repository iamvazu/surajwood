// ---------------------------------------------------------------------------
// Sanity CMS types for SurajWood
// Mirrors types/wordpress.ts but uses Sanity-idiomatic naming.
// Re-exports the WP* aliases so existing imports from @/types/wordpress still work.
// ---------------------------------------------------------------------------

export type FinishType =
  | "satin"
  | "soft-satin"
  | "matte"
  | "high-gloss"
  | "matte-glass";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string };
  alt: string;
  // Resolved fields (present when resolved via GROQ projections or mock data)
  id?: number;
  url?: string;
  width?: number;
  height?: number;
}

export interface SanityColour {
  colour_name: string;
  hex_value: string;
  swatch_image: SanityImage;
}

export interface SanityTechnicalSpecs {
  scratch_resistance: string;
  uv_stability: string;
  anti_fingerprint: boolean;
  fire_rating: string;
  warranty: string;
}

export interface SanityFAQ {
  id: number;
  question: string;
  answer: string;
  category: "product" | "general" | "maintenance" | "technical";
  linked_product?: string;
}

export interface SanityProduct {
  id: number;
  slug: string;
  name: string;
  finish_type: FinishType;
  tagline: string;
  description: string;
  hero_image: SanityImage;
  gallery: SanityImage[];
  ideal_for: string[];
  thickness: string;
  dimensions: string;
  material_composition: string;
  surface_properties: string;
  colour_range: SanityColour[];
  technical_specs: SanityTechnicalSpecs;
  faq: Array<{ question: string; answer: string }>;
  seo_title: string;
  seo_description: string;
}

export interface SanityApplication {
  id: number;
  slug: string;
  name: string;
  hero_image: SanityImage;
  description: string;
  gallery: SanityImage[];
  suitable_products: string[];
  room_type: string;
  design_tips: string;
  faq: Array<{ question: string; answer: string }>;
}

export interface SanityTestimonial {
  id: number;
  client_name: string;
  designation: string;
  company: string;
  quote: string;
  rating: number;
  project_type: string;
}

export interface SanityPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: SanityImage;
  date: string;
  author: string;
  reading_time: number;
  categories: string[];
}

export interface HomepageData {
  featured_products: SanityProduct[];
  latest_posts: SanityPost[];
  testimonials: SanityTestimonial[];
  stats: {
    years: number;
    shades: number;
    projects: number;
    cities: number;
  };
}

// ---------------------------------------------------------------------------
// Re-export aliases so that `import { WPProduct } from "@/types/wordpress"`
// continues to work without changes across the entire codebase.
// ---------------------------------------------------------------------------
export type {
  SanityProduct as WPProduct,
  SanityApplication as WPApplication,
  SanityTestimonial as WPTestimonial,
  SanityFAQ as WPFAQ,
  SanityPost as WPPost,
  SanityImage as WPMedia,
  HomepageData as WPHomepageData,
};
