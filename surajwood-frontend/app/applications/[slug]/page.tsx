import { getApplicationBySlug } from "@/lib/sanity";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static config per application slug
// ---------------------------------------------------------------------------

type ApplicationConfig = {
  name: string;
  heroTagline: string;
  heroBg: string;
  intro: string;
  whySection: { title: string; body: string };
  recommendedProducts: {
    slug: string;
    name: string;
    reason: string;
    finishLabel: string;
  }[];
  benefits: { icon: string; title: string; desc: string }[];
  faqExtra: { question: string; answer: string }[];
  galleryImages: string[];
};

const APPLICATION_CONFIG: Record<string, ApplicationConfig> = {
  kitchens: {
    name: "Kitchens",
    heroTagline: "India's Premium Kitchen Surface",
    heroBg: "from-navy via-navy to-navy/80",
    intro:
      "Transform your kitchen with India's premium acrylic panels. Moisture-resistant, heat-tolerant, and available in 50+ finishes — ACRYLUX and ACRYGLASS panels are the preferred choice of India's top kitchen designers. Engineered to handle the demands of Indian cooking environments: high heat, oil vapour, humidity, and daily intensive cleaning — without compromising on aesthetics.",
    whySection: {
      title: "Why Acrylic for Indian Kitchens?",
      body: "Indian kitchens face unique challenges: high-temperature cooking, oil splatter, humidity fluctuations between 20% and 90%, and the need for frequent, intensive cleaning. Standard laminates and painted surfaces fail under these conditions within 3–5 years. Suraj Wood acrylic panels — with their PMMA surface, 3H scratch resistance, Class B1 fire rating, and superior moisture resistance — are the only finish that delivers premium aesthetics for 10+ years in real Indian kitchen conditions.",
    },
    recommendedProducts: [
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "Best for main kitchen shutters — satin finish hides minor marks, easy to clean daily.",
        finishLabel: "Satin",
      },
      {
        slug: "acrymatte",
        name: "ACRYMATTE",
        reason: "Ideal for a contemporary matte kitchen — anti-fingerprint coating is a lifesaver.",
        finishLabel: "Matte",
      },
      {
        slug: "acryglass",
        name: "ACRYGLASS",
        reason: "Statement upper cabinets and islands — mirror-like gloss makes spaces feel larger.",
        finishLabel: "High-Gloss",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "Luxury kitchen specification — glass-grade clarity with a sophisticated matte touch.",
        finishLabel: "Matte-Glass",
      },
    ],
    benefits: [
      {
        icon: "💧",
        title: "Moisture-Resistant",
        desc: "Non-porous PMMA surface repels moisture — no swelling, warping, or delamination in humid kitchens.",
      },
      {
        icon: "🔥",
        title: "Heat Tolerant",
        desc: "Class B1 fire rating. Safe for use near cooking areas when installed to manufacturer guidelines.",
      },
      {
        icon: "✨",
        title: "Easy Maintenance",
        desc: "Wipe clean with a damp cloth. Anti-fingerprint options available. No polishing or sealing required.",
      },
      {
        icon: "🎨",
        title: "50+ Colours",
        desc: "Solid, metallic, wood-grain, matte, and gloss options to match any kitchen design direction.",
      },
    ],
    faqExtra: [
      {
        question: "Which acrylic panel finish is best for Indian cooking kitchens?",
        answer:
          "For kitchens with heavy Indian cooking (high heat, oil splatter), ACRYMATTE or ACRYLUX satin are the practical top choices. Their finishes are easier to clean and show fewer marks than high-gloss. For kitchens with lighter cooking or where aesthetics are paramount, ACRYGLASS creates a stunning statement.",
      },
      {
        question: "How close to a gas hob can acrylic panels be installed?",
        answer:
          "Maintain a minimum 600mm horizontal distance from gas hob burners for panel shutters. For wall cladding behind hobs, use a glass or tiled backsplash as heat protection — acrylic panels are not recommended directly behind hob cooking surfaces.",
      },
      {
        question: "Can I mix different Suraj Wood products in the same kitchen?",
        answer:
          "Yes. Mixing finishes — for example, ACRYLUX satin for lower cabinets and ACRYGLASS high-gloss for upper cabinets — is a popular design technique that creates visual interest. Our sales team can help you select complementary colour combinations.",
      },
    ],
    galleryImages: [
      "/images/gallery/kitchen-new-1.png",
      "/images/gallery/kitchen-new-2.jpg",
      "/images/gallery/kitchen-new-3.jpg",
      "/images/gallery/kitchen-new-4.png",
      "/images/gallery/kitchen-new-5.png",
      "/images/gallery/kitchen-new-6.jpg",
    ],
  },

  wardrobes: {
    name: "Wardrobes",
    heroTagline: "Premium Wardrobe Surfaces",
    heroBg: "from-navy via-navy to-navy/80",
    intro:
      "Create wardrobes and storage solutions that age beautifully. ACRYSILK and ACRYMATTE panels offer anti-fingerprint surfaces and a premium feel that complements bedroom furniture perfectly. Unlike painted wood or laminates that chip and peel with daily use, Suraj Wood acrylic panels maintain their pristine surface quality through years of door handling — making them the preferred choice for luxury modular wardrobes and walk-in closets.",
    whySection: {
      title: "Why Acrylic for Wardrobes?",
      body: "Wardrobe shutters see daily handling — dozens of open-close cycles that wear out laminates and painted surfaces within 3–5 years. Suraj Wood panels with 3H pencil hardness (harder than most smartphone screens) resist scratches from rings, keys, and daily wear. The PMMA surface doesn't chip at edges, doesn't fade in bedroom lighting, and requires no maintenance beyond a quick wipe. For luxury wardrobes, ACRYSILK and ACRYGLASS MATTE deliver a boutique-hotel aesthetic that holds its quality for a decade.",
    },
    recommendedProducts: [
      {
        slug: "acrysilk",
        name: "ACRYSILK",
        reason: "Most popular for bedroom wardrobes — soft-satin micro-texture conceals daily handling marks.",
        finishLabel: "Soft-Satin",
      },
      {
        slug: "acrymatte",
        name: "ACRYMATTE",
        reason: "Contemporary matte wardrobes with excellent anti-fingerprint nano-coating.",
        finishLabel: "Matte",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "Luxury walk-in wardrobes — glass-grade depth with sophisticated matte finish.",
        finishLabel: "Matte-Glass",
      },
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "Classic satin finish wardrobes with 30+ colour options for any bedroom palette.",
        finishLabel: "Satin",
      },
    ],
    benefits: [
      {
        icon: "🖐️",
        title: "Anti-Fingerprint",
        desc: "ACRYSILK and ACRYMATTE feature nano anti-fingerprint coating — doors stay clean despite daily handling.",
      },
      {
        icon: "💪",
        title: "3H Hardness",
        desc: "Resists scratches from rings, keys, and general wear. Tougher than most smartphone screens.",
      },
      {
        icon: "🌈",
        title: "Bedroom Aesthetics",
        desc: "Soft satin and matte finishes complement bedroom furniture with a calm, sophisticated look.",
      },
      {
        icon: "🔒",
        title: "No Peeling Edges",
        desc: "PMMA acrylic bonded with PUR adhesive — no edge peeling or delamination over time.",
      },
    ],
    faqExtra: [
      {
        question: "Which Suraj Wood product is most popular for bedroom wardrobes?",
        answer:
          "ACRYSILK and ACRYMATTE are the most specified products for bedroom wardrobes. Their soft finishes create a calm, sophisticated bedroom aesthetic and their excellent anti-fingerprint properties keep the doors looking clean despite daily handling.",
      },
      {
        question: "Can acrylic panels be used for sliding wardrobe doors?",
        answer:
          "Yes. Suraj Wood panels can be fabricated into sliding wardrobe door shutters. The shutter is typically made from the panel bonded to an aluminium or MDF frame, then fitted into standard aluminium sliding wardrobe systems. Our panels are lightweight and dimensionally stable, making them ideal for sliding applications.",
      },
      {
        question: "What thickness should I specify for wardrobe shutters?",
        answer:
          "1mm or 1.5mm acrylic on 18mm MDF is standard for wardrobe shutters. The 1.5mm specification gives a noticeably more premium feel when handling the door — it is recommended for high-end residential projects. 3mm is not typically required for wardrobes unless specifying for a very heavy-duty commercial application.",
      },
    ],
    galleryImages: [
      "/images/gallery/wardrobe-1.jpg",
      "/images/gallery/wardrobe-2.jpg",
      "/images/gallery/wardrobe-3.jpg",
      "/images/gallery/wardrobe-4.jpg",
      "/images/gallery/10.jpg",
      "/images/gallery/11.jpg",
    ],
  },

  commercial: {
    name: "Commercial Spaces",
    heroTagline: "High-Performance Commercial Surfaces",
    heroBg: "from-navy via-navy to-navy/80",
    intro:
      "From corporate offices to retail showrooms, SurajWood's high-performance panels deliver premium aesthetics built for high-traffic commercial environments. Fire-rated, durable, and stunning. ACRYGLASS and ACRYLUX panels are trusted by India's leading commercial interior contractors for reception counters, office furniture, retail display units, and hospitality wall cladding — where both appearance and performance standards are non-negotiable.",
    whySection: {
      title: "Why Acrylic for Commercial Spaces?",
      body: "Commercial interiors face extreme demands: high foot traffic, frequent cleaning with commercial-grade products, public contact, and the need to look premium for years without refurbishment. Suraj Wood panels with Class B1 fire rating, 3H scratch resistance, and E1-grade MDF substrate meet the specification requirements of most commercial building codes in India. Our panels have been used in corporate offices, luxury retail, five-star hotel interiors, and healthcare facilities — delivering consistent quality at commercial scale.",
    },
    recommendedProducts: [
      {
        slug: "acryglass",
        name: "ACRYGLASS",
        reason: "Reception counters and feature walls — high-gloss mirror finish creates maximum visual impact.",
        finishLabel: "High-Gloss",
      },
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "Office furniture and wall cladding — premium satin finish for a corporate-grade aesthetic.",
        finishLabel: "Satin",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "Luxury retail and hospitality — glass-grade quality with sophisticated matte specification.",
        finishLabel: "Matte-Glass",
      },
      {
        slug: "acrymatte",
        name: "ACRYMATTE",
        reason: "High-traffic surfaces — anti-fingerprint nano-coating reduces maintenance burden.",
        finishLabel: "Matte",
      },
    ],
    benefits: [
      {
        icon: "🏢",
        title: "Class B1 Fire Rated",
        desc: "Meets fire safety specifications for commercial buildings across India.",
      },
      {
        icon: "⚙️",
        title: "Commercial Grade",
        desc: "3H scratch resistance handles high-traffic environments — reception counters, retail fixtures.",
      },
      {
        icon: "🧹",
        title: "Low Maintenance",
        desc: "Withstands commercial cleaning products. Non-porous surface is hygienic and easy to sanitise.",
      },
      {
        icon: "📐",
        title: "Large Format",
        desc: "8ft x 4ft standard sheets reduce joins for seamless commercial installations.",
      },
    ],
    faqExtra: [
      {
        question: "Are Suraj Wood panels fire-rated for commercial use?",
        answer:
          "Yes. All Suraj Wood acrylic panels carry Class B1 fire rating per DIN 4102. This is the standard required for most commercial interior applications in India.",
      },
    ],
    galleryImages: [
      "/images/gallery/commercial-premium.png",
      "/images/gallery/commercial-2.jpg",
      "/images/gallery/commercial-3.jpg",
      "/images/gallery/commercial-4.jpg",
      "/images/gallery/20.jpg",
      "/images/gallery/21.jpg",
    ],
  },
  offices: {
    name: "Office Spaces",
    heroTagline: "Professional Office Surfaces",
    heroBg: "from-slate-900 via-slate-800 to-slate-900",
    intro: "Modern office environments demand surfaces that are both durable and professional. SurajWood acrylic panels provide the perfect finish for executive desks, meeting room tables, and acoustic wall cladding.",
    whySection: {
      title: "The Professional Edge",
      body: "Our panels are designed to withstand the daily rigors of a busy office while maintaining a sleek, corporate appearance. Anti-fingerprint coatings ensure that surfaces look pristine even after heavy use in conference rooms and shared workspaces.",
    },
    recommendedProducts: [
      { slug: "acrymatte", name: "ACRYMATTE", reason: "Anti-fingerprint matte surfaces for distraction-free work.", finishLabel: "Matte" },
      { slug: "acrysilk", name: "ACRYSILK", reason: "Soft-touch texture for a premium executive feel.", finishLabel: "Soft-Satin" },
    ],
    benefits: [
      { icon: "💼", title: "Corporate Aesthetic", desc: "Clean lines and sophisticated finishes for modern workspaces." },
      { icon: "🔇", title: "Acoustic Friendly", desc: "Ideal for wall paneling in quiet zones and meeting rooms." },
    ],
    faqExtra: [
      { question: "Can these be used for conference tables?", answer: "Absolutely. Our 1.5mm and 3mm acrylic sheets are excellent for high-durability table surfaces." },
    ],
    galleryImages: ["/images/gallery/office-1.jpg", "/images/gallery/commercial-premium.png", "/images/gallery/commercial-2.jpg"],
  },
  "kids-rooms": {
    name: "Children's Rooms",
    heroTagline: "Safe & Vibrant Spaces",
    heroBg: "from-blue-600 via-purple-500 to-pink-500",
    intro: "Create a playful yet premium environment for your children. SurajWood panels are non-toxic, easy to clean, and come in a variety of vibrant colors that kids love.",
    whySection: {
      title: "Safety Meets Style",
      body: "We prioritize safety without compromising on design. Our panels are scratch-resistant and can handle the energetic play of children, while the smooth surfaces make cleaning up spills and artistic 'experiments' a breeze.",
    },
    recommendedProducts: [
      { slug: "acrylux", name: "ACRYLUX", reason: "Vibrant solid colors to bring the room to life.", finishLabel: "Satin" },
      { slug: "acryglass", name: "ACRYGLASS", reason: "High-gloss mirror finish for a fun, reflective look.", finishLabel: "High-Gloss" },
    ],
    benefits: [
      { icon: "👶", title: "Non-Toxic", desc: "Safe materials for a healthy indoor environment." },
      { icon: "🧼", title: "Stain Resistant", desc: "Wipe away crayons and spills with ease." },
    ],
    faqExtra: [
      { question: "Are the colors safe for children?", answer: "Yes, our PMMA acrylic is an inert material and the panels are manufactured using eco-friendly processes." },
    ],
    galleryImages: ["/images/gallery/kids-1.jpg", "/images/gallery/15.jpg", "/images/gallery/16.jpg"],
  },
  "wall-paneling": {
    name: "Wall Paneling",
    heroTagline: "Architectural Statement Walls",
    heroBg: "from-stone-900 via-stone-800 to-stone-900",
    intro: "Transform plain walls into architectural statements. SurajWood large-format panels offer a seamless, mirror-like finish that adds depth and luxury to any interior space.",
    whySection: {
      title: "Luxury at Scale",
      body: "Wall paneling requires precision and consistency. Our factory-bonded panels ensure a perfectly flat surface over large areas, something that is difficult to achieve with on-site painting or laminating.",
    },
    recommendedProducts: [
      { slug: "acryglass", name: "ACRYGLASS", reason: "Maximum reflection to make rooms feel twice as large.", finishLabel: "High-Gloss" },
      { slug: "acryglass-matte", name: "ACRYGLASS MATTE", reason: "Sophisticated matte-glass for a subtle luxury vibe.", finishLabel: "Matte-Glass" },
    ],
    benefits: [
      { icon: "📏", title: "Seamless Look", desc: "Large format sheets minimize joins for a continuous aesthetic." },
      { icon: "💎", title: "Premium Depth", desc: "Optical-grade acrylic provides unparalleled visual depth." },
    ],
    faqExtra: [
      { question: "Can these be installed over existing walls?", answer: "Yes, they can be installed over plywood or MDF framing for a perfectly level finish." },
    ],
    galleryImages: ["/images/gallery/wall-1.jpg", "/images/gallery/22.jpg", "/images/gallery/23.jpg"],
  },
};

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return [
    { slug: "kitchens" },
    { slug: "wardrobes" },
    { slug: "commercial" },
    { slug: "offices" },
    { slug: "kids-rooms" },
    { slug: "wall-paneling" },
  ];
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
  const config = APPLICATION_CONFIG[slug];
  if (!config) return { title: "Application Not Found | SurajWood" };

  const desc = `Premium Suraj Wood acrylic panels for ${config.name.toLowerCase()}. ${config.intro.slice(0, 140)}...`;

  return {
    title: `Acrylic Panels for ${config.name} | Premium Surface Solutions | SurajWood`,
    description: desc,
    openGraph: {
      title: `Acrylic Panels for ${config.name} | SurajWood`,
      description: desc,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Validate slug
  if (!APPLICATION_CONFIG[slug]) notFound();

  // Try to get from API (falls back gracefully)
  const application = await getApplicationBySlug(slug);
  const config = APPLICATION_CONFIG[slug];

  const allFaqs = [
    ...(application?.faq ?? []),
    ...config.faqExtra,
  ];

  const schemas = [
    generateFAQSchema(allFaqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Applications", url: "https://www.surajwood.com/applications" },
      {
        name: config.name,
        url: `https://www.surajwood.com/applications/${slug}`,
      },
    ]),
    generateOrganizationSchema(),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO (Luxury Alignment with Homepage)                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Image with Ken Burns */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src={config.galleryImages[0]}
              alt={`${config.name} with Suraj Wood acrylic panels`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Sophisticated Gradients (Matching Home) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        {/* Spacer to clear sticky navbar */}
        <div className="h-32 lg:h-40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-8">
          {/* Subtle Breadcrumb Overlay */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li>
                <Link href="/#applications" className="hover:text-copper transition-colors">
                  Applications
                </Link>
              </li>
              <li>›</li>
              <li className="text-white/60" aria-current="page">
                {config.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-copper" />
              <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
                {config.heroTagline}
              </p>
            </div>

            {/* H1: Playfair Display Serif */}
            <h1 className="font-playfair text-white text-3xl md:text-5xl lg:text-7xl leading-[1.1] mb-6">
              Premium Acrylic Panels <br />
              for <span className="text-copper">{config.name}</span>
            </h1>

            {/* Sub-headline / Intro */}
            <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed mb-10 font-light italic">
              {config.intro.split('.')[0]}. {config.intro.split('.')[1]}.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-copper hover:bg-copper-light text-white font-bold px-8 py-3.5 rounded transition-all duration-300 shadow-xl shadow-copper/20 hover:-translate-y-0.5 text-xs md:text-sm"
              >
                Request Free Sample Kit
              </Link>
              <a
                href="tel:+919009171819"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-navy font-bold px-8 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5 text-xs md:text-sm"
              >
                Call +91-9009171819
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Accent (Matching Home/About fold feel) */}
        <div className="relative z-10 w-full h-1 bg-gradient-to-r from-copper/50 to-transparent" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BENEFITS                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Why Choose Suraj Wood
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy">
              Built for {config.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.benefits.map((b) => (
              <div
                key={b.title}
                className="bg-cream rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-heading font-bold text-navy text-base mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHY SECTION                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-4">
              The Case for Acrylic
            </p>
            <h2 className="font-heading text-3xl font-bold mb-6">
              {config.whySection.title}
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              {config.whySection.body}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GALLERY                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Gallery
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy">
              {config.name} Inspiration
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={img}
                  alt={`${config.name} acrylic panel application ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RECOMMENDED PRODUCTS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Our Recommendation
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy">
              Best Products for {config.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.recommendedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col bg-cream rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-white">
                  <Image
                    src={
                      p.slug === "acrylux" ? "/images/products/acrylux.png" :
                      p.slug === "acryglass" ? "/images/products/acryglass.png" :
                      p.slug === "acrymatte" ? "/images/products/acrymatte.png" :
                      p.slug === "acryglass-matte" ? "/images/products/acryglass-matte.png" :
                      p.slug === "acrysilk" ? "/images/products/acrysilk.jpg" :
                      `/images/products/${p.slug}/${p.slug}-1.png`
                    }
                    alt={p.name}
                    fill
                    className="object-contain mix-blend-multiply p-4 transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block bg-copper/15 text-copper border border-copper/30 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 w-fit">
                    {p.finishLabel}
                  </span>
                  <h3 className="font-heading font-bold text-navy text-sm mb-2">{p.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{p.reason}</p>
                  <span className="mt-4 text-copper text-xs font-semibold group-hover:underline">
                    Explore {p.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-bold text-navy">
                {config.name} Acrylic Panel FAQs
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {allFaqs.map((faq, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex items-start justify-between cursor-pointer text-left list-none gap-4">
                    <span className="font-heading font-semibold text-navy text-base leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-copper text-lg mt-0.5 shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA BANNER                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Transform Your {config.name}?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Request a free sample kit and speak with a Suraj Wood product specialist.
            Samples dispatched within 2–3 business days across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-copper hover:bg-copper-light text-white font-semibold px-10 py-4 rounded-lg transition-colors duration-200"
            >
              Request Free Sample Kit
            </Link>
            <a
              href="https://wa.me/919009171819?text=Hi%2C%20I%20am%20interested%20in%20acrylic%20panels%20for%20my%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-10 py-4 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
