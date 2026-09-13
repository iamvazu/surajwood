import { getApplicationBySlug } from "@/lib/sanity";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateAggregateRatingSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import ApplicationGalleryClient from "@/components/gallery/ApplicationGalleryClient";
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
  heroBgImage?: string;
};

const APPLICATION_CONFIG: Record<string, ApplicationConfig> = {
  kitchens: {
    name: "Kitchens",
    heroTagline: "India's Premium Kitchen Surface",
    heroBgImage: "/images/gallery/kitchen-1.jpg",
    heroBg: "from-navy via-navy to-navy/80",
    intro:
      "Transform your modular kitchen with India's most durable prelaminated PMMA acrylic panels. Engineered specifically for high-temperature Indian cooking environments, SurajWood panels provide 100% moisture resistance, 3H scratch protection, and Class B1 fire resistance — outperforming traditional sunmica laminates, PVC foils, and painted PU finishes in gloss retention and edge durability.",
    whySection: {
      title: "Why SurajWood Acrylic Beats Traditional Sunmica & PU Paint in Indian Kitchens",
      body: "Indian cooking environments demand unprecedented resilience against high heat, oil vapour, turmeric staining, humidity swings between 20% and 90%, and daily intensive scrubbing. Standard high-pressure laminates (HPL) from brands like Merino, Royale Touche, and Advance Laminates are pressed on-site with solvent adhesives that bubble, peel, and delaminate at the edges within 3 to 5 years. Spray-painted PU and Duco finishes chip easily and require weeks of messy site work.\n\nSurajWood factory-prelaminated acrylic kitchen shutters are bonded using reactive German PUR hotmelt adhesive under continuous cleanroom roller pressure. The non-porous PMMA surface is completely impervious to steam, hot oil splatter, and household acids. With pencil hardness rated at 3H and UV-stabilized optical clarity, SurajWood panels retain their mirror-like 95% gloss and deep color vibrancy for 10+ years without fading or yellowing.",
    },
    recommendedProducts: [
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "The gold standard for main kitchen cabinet shutters — silky mirror gloss that wipes clean effortlessly.",
        finishLabel: "High-Gloss Satin",
      },
      {
        slug: "acrymatte",
        name: "ACRYMATTE",
        reason: "Anti-fingerprint nano-technology for contemporary matte kitchen lower cabinets and island counters.",
        finishLabel: "Super Matte",
      },
      {
        slug: "acryglass",
        name: "ACRYGLASS",
        reason: "2mm solid acrylic glass for overhead statement cabinets and breakfast counters with true glass depth.",
        finishLabel: "High-Gloss Glass",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "Ultra-luxurious frosted glass appearance immune to grease marks and micro-scratches.",
        finishLabel: "Matte-Glass",
      },
    ],
    benefits: [
      {
        icon: "💧",
        title: "100% Moisture & Steam Proof",
        desc: "Non-porous PMMA acrylic surface repels boiling water, steam, and humidity — zero swelling or core rot.",
      },
      {
        icon: "🔥",
        title: "Class B1 Fire Tolerant",
        desc: "Certified Class B1 fire rating per DIN 4102. Safe for installation near induction and gas cooking hobs.",
      },
      {
        icon: "✨",
        title: "Stain & Turmeric Proof",
        desc: "Resists stubborn curry, oil, and spice stains. Simply wipe clean with water and a soft microfibre cloth.",
      },
      {
        icon: "🎨",
        title: "50+ Curated Shades",
        desc: "Solid, metallic, sparkling, and natural tones engineered to match high-end modular kitchen layouts.",
      },
    ],
    faqExtra: [
      {
        question: "How do SurajWood acrylic kitchen shutters compare to regular laminates (Sunmica)?",
        answer:
          "Unlike standard laminates that have a thin 0.8mm–1mm paper core with visible black seam lines, SurajWood uses 100% pure PMMA optical acrylic factory-fused with German PUR adhesive. This creates a 95% mirror-reflective surface with zero orange peel, 3H scratch resistance, seamless edge banding, and complete immunity to moisture delamination.",
      },
      {
        question: "Which acrylic panel finish is best for heavy Indian cooking kitchens?",
        answer:
          "For high-heat Indian kitchens with daily oil frying, ACRYMATTE or ACRYLUX satin finishes are highly recommended for lower base cabinets because they conceal minor cooking marks and fingerprints. ACRYGLASS high-gloss is ideal for upper wall cabinets to maximize light reflection and visual space.",
      },
      {
        question: "What is the recommended substrate for acrylic kitchen shutters?",
        answer:
          "We recommend factory lamination on 18mm E1-Grade Action TESA HDMR (High Density Moisture Resistant) board or calibrated BWP marine-grade plywood. This guarantees complete dimensional stability and termite resistance in wet kitchen zones.",
      },
      {
        question: "How should acrylic modular kitchen shutters be cleaned and maintained?",
        answer:
          "Clean routinely with a soft microfibre cloth dampened with mild soapy water. Avoid abrasive scouring pads, bleach, or dry wiping with dusty cloths. For high-gloss surfaces, automotive acrylic cleaners or Novus polish restore factory shine.",
      },
      {
        question: "What is the warranty on SurajWood acrylic kitchen panels?",
        answer:
          "SurajWood offers a 5-year manufacturer warranty covering delamination, bubbling, and UV color fading under standard interior kitchen conditions.",
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
    name: "Wardrobes & Dressing Rooms",
    heroTagline: "Premium Wardrobe Surfaces",
    heroBgImage: "/images/gallery/wardrobe-1.jpg",
    heroBg: "from-navy via-navy to-navy/80",
    intro:
      "Design luxury sliding wardrobes, walk-in closets, and hinged bedroom shutters that maintain flawless beauty through hundreds of daily open-close cycles. SurajWood ACRYSILK and ACRYMATTE acrylic panels feature advanced anti-fingerprint nano-coatings and 3H scratch hardness, eliminating the chipping, edge peeling, and finger smudges common with traditional painted wood and standard laminates.",
    whySection: {
      title: "Why Modern Bedroom Wardrobes Demand Prelaminated PMMA Acrylic",
      body: "Bedroom wardrobe shutters represent the largest vertical visual plane in master bedrooms and dressing suites. Standard laminates and melamine boards scratch easily from jewelry, fingernails, and rings, while on-site hand-pressed laminates develop ugly wavy reflections under bedroom accent lights.\n\nSurajWood engineered acrylic wardrobe boards are manufactured under cleanroom conditions with calibrated German PUR bonding. Our anti-fingerprint ACRYSILK and ACRYMATTE series feature micro-textured PMMA surfaces that diffuse ambient light softly, creating a calm, five-star hotel boutique aesthetic. With 3H surface hardness (harder than smartphone glass) and zero edge delamination, SurajWood wardrobe shutters deliver enduring luxury for 10+ years.",
    },
    recommendedProducts: [
      {
        slug: "acrysilk",
        name: "ACRYSILK",
        reason: "Most specified for luxury bedroom wardrobes — velvety soft-satin texture conceals handling marks.",
        finishLabel: "Soft-Satin",
      },
      {
        slug: "acrymatte",
        name: "ACRYMATTE",
        reason: "Ultra-contemporary matte finish with hydrophobic and oleophobic nano anti-fingerprint coating.",
        finishLabel: "Super Matte",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "Walk-in closets and bespoke dressing rooms — glass-grade depth with a refined matte touch.",
        finishLabel: "Matte-Glass",
      },
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "Classic high-gloss wardrobe shutters with 50+ colors for glamorous bedroom storage.",
        finishLabel: "High-Gloss",
      },
    ],
    benefits: [
      {
        icon: "🖐️",
        title: "Nano Anti-Fingerprint",
        desc: "Advanced oleophobic surface coating keeps wardrobe doors immaculate despite continuous daily handling.",
      },
      {
        icon: "💪",
        title: "3H Pencil Hardness",
        desc: "Resists scratches from rings, keys, belt buckles, and daily bedroom wear and tear.",
      },
      {
        icon: "🌈",
        title: "Zero Color Fading",
        desc: "100% UV-stable PMMA prevents yellowing, discoloration, and fading under artificial and natural bedroom light.",
      },
      {
        icon: "🔒",
        title: "Seamless PUR Edge Seal",
        desc: "Moisture-curing reactive PUR hotmelt eliminates peeling edge-bands and sharp rough seams.",
      },
    ],
    faqExtra: [
      {
        question: "Can SurajWood acrylic panels be used for sliding wardrobe doors?",
        answer:
          "Yes. SurajWood panels are lightweight and dimensionally balanced (using balancing backers on the reverse), making them ideal for full-height sliding wardrobe systems (up to 9ft/10ft) with zero door bowing or track jamming.",
      },
      {
        question: "What thickness is recommended for modular wardrobe shutters?",
        answer:
          "1.0mm or 1.5mm optical PMMA acrylic bonded on 18mm E1-grade MDF, HDMR, or calibrated plywood is the industry standard for bedroom wardrobe shutters. 1.5mm provides noticeable tactile luxury and structural rigidity.",
      },
      {
        question: "Which finish is best for master bedroom wardrobes: High-Gloss or Matte?",
        answer:
          "For master bedrooms, ACRYSILK soft-satin and ACRYMATTE anti-fingerprint finishes are the top choice among interior designers because they create a serene, glare-free aesthetic and hide fingerprints. For smaller rooms or walk-in closets, ACRYGLASS high-gloss bounces light to make rooms appear larger.",
      },
      {
        question: "How do acrylic wardrobe doors compare to PU painted doors?",
        answer:
          "PU painted shutters take 15–20 days to spray and dry on-site, emit toxic fumes, and chip at the corners when bumped. SurajWood prelaminated acrylic boards arrive ready to fabricate with factory-perfect edge banding, 3H scratch resistance, and immediate turnaround.",
      },
    ],
    galleryImages: [
      "/images/gallery/wardrobe-1.jpg",
      "/images/gallery/wardrobe-2.jpg",
      "/images/gallery/wardrobe-3.jpg",
      "/images/gallery/wardrobe-4.jpg",
      "/images/gallery/wardrobe-new-sliding.png",
      "/images/gallery/wardrobe-new-luxury.jpg",
    ],
  },

  "wall-paneling": {
    name: "Wall Paneling & Architectural Cladding",
    heroTagline: "Optical-Grade PMMA Wall Paneling & Cladding",
    heroBgImage: "/images/gallery/wall-panel-living-luxury.jpg",
    heroBg: "from-stone-900 via-stone-800 to-stone-900",
    intro:
      "Transform living rooms, master bedrooms, executive boardrooms, and commercial lobbies with India's most advanced prelaminated acrylic wall panels. SurajWood optical-grade PMMA panels deliver flawless 95% mirror reflection, 3H scratch resistance, and Class B1 fire rating. Factory-bonded with German PUR hotmelt onto E1-grade HDMR and calibrated plywood, our large-format 8ft x 4ft sheets eliminate the surface waviness, orange peel, and toxic off-gassing associated with on-site pressed laminates, charcoal louvers, and PVC wall panels.",
    whySection: {
      title: "Why SurajWood PMMA Acrylic Beats Laminates, Charcoal Panels & PVC Louvers",
      body: "Traditional interior wall cladding in India has long suffered from significant compromises: standard 1mm laminates (from brands like Merino, Royale Touche, and Advance) suffer from surface waviness ('orange peel' effect) when pasted on site with contact adhesive. Charcoal sheets and PVC fluted panels contain heavy plasticizers that emit VOCs, become brittle, and lose color in Indian sunlight. On-site PU paint or Duco finishes are notoriously labor-intensive, take weeks to cure, and scratch easily.\n\nSurajWood engineered acrylic wall panels solve all of these architectural bottlenecks. Utilizing pure European-grade PMMA acrylic sheets factory-fused with German reactive PUR hotmelt in a continuous dust-free lamination line, our panels deliver absolute mirror flatness with zero surface distortion. With 3H pencil scratch hardness, UV color stability guaranteed for 10+ years without yellowing, and Class B1 fire resistance, SurajWood provides architects, interior designers, and luxury homeowners the definitive wall cladding solution for TV feature walls, bed headboards, elevator lobbies, and double-height living rooms.",
    },
    recommendedProducts: [
      {
        slug: "acryglass",
        name: "ACRYGLASS",
        reason: "Flagship 2mm glass-grade PMMA acrylic for ultra-reflective luxury living room and lobby feature walls.",
        finishLabel: "High-Gloss Glass",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "Subtle anti-glare frosted glass texture for modern master bedroom headboards and acoustic panels.",
        finishLabel: "Matte-Glass",
      },
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "Vibrant solid and metallic color panels for contemporary TV consoles and commercial accent walls.",
        finishLabel: "High-Gloss Satin",
      },
      {
        slug: "acrysilk",
        name: "ACRYSILK",
        reason: "Micro-textured velvety satin finish with nano anti-fingerprint coating for high-touch interior walls.",
        finishLabel: "Soft-Satin Touch",
      },
    ],
    benefits: [
      {
        icon: "🪞",
        title: "95% Optical Mirror Depth",
        desc: "Optical-grade PMMA acrylic delivers true mirror-like reflection with zero distortion, making rooms feel twice as spacious.",
      },
      {
        icon: "⚙️",
        title: "German PUR Zero-Void Flatness",
        desc: "Factory automated hotmelt bonding guarantees perfectly flat panels with zero waviness, bubbles, or orange peel.",
      },
      {
        icon: "🛡️",
        title: "3H Scratch & Flame Resistant",
        desc: "High surface hardness resists daily impact and scratches. Certified Class B1 fire rating per DIN 4102 for safety.",
      },
      {
        icon: "📐",
        title: "Large Format 8ft x 4ft Sheets",
        desc: "Factory-sized panels minimize wall joints and seam lines, compatible with T-profile brass inlays and shadow reveals.",
      },
    ],
    faqExtra: [
      {
        question: "How do SurajWood acrylic wall panels compare to PVC fluted louvers, WPC, and charcoal sheets?",
        answer:
          "PVC and charcoal wall panels are made from recycled plastics and plasticizers that warp under temperature fluctuations, attract static dust, and emit toxic VOCs. SurajWood uses 100% pure optical PMMA acrylic bonded to E1-grade HDMR boards. Our panels deliver 95% mirror reflection or ultra-matte textures with 3H scratch resistance, Class B1 fire safety, and 10+ years of UV color stability.",
      },
      {
        question: "What is the standard sheet size and thickness for wall cladding?",
        answer:
          "SurajWood acrylic wall panels come in standard 8ft x 4ft (2440mm x 1220mm) sheets, with custom thickness options from 6mm, 12mm, 18mm up to 25mm on Action TESA HDMR or calibrated BWP plywood substrates. Acrylic surface thickness is available in 1.0mm, 1.5mm, and 2.0mm PMMA.",
      },
      {
        question: "How are acrylic wall panels installed on interior walls?",
        answer:
          "Panels are typically mounted over an aligned wooden batten framework or direct plywood grid using structural polyurethane adhesive and concealed Z-clips or French cleats. Seams can be detailed with 5mm shadow grooves, flush acrylic color-matched edge bands, or metallic brass/black T-profiles.",
      },
      {
        question: "What is the price range of acrylic wall panel sheets per sq ft in India?",
        answer:
          "Factory-prelaminated PMMA acrylic wall panels typically range from ₹180 to ₹350 per sq ft depending on the acrylic grade (ACRYLUX vs 2mm ACRYGLASS) and core substrate (E1 HDMR vs Calibrated Marine Plywood). Compared to stone cladding or multi-coat PU paint (₹400–₹800/sq ft), acrylic provides superior luxury at a competitive installed cost.",
      },
      {
        question: "Can acrylic wall panels be installed in bedrooms behind headboards and TV walls?",
        answer:
          "Yes. Acrylic wall paneling is one of the most popular interior trends for bedroom feature walls and living room TV entertainment backdrops. Backlit LED strip lighting can be routed seamlessly into shadow grooves to create dramatic ambient illumination.",
      },
      {
        question: "How do you clean and maintain high-gloss acrylic wall panels?",
        answer:
          "Because PMMA acrylic is non-porous and anti-static, routine cleaning requires only a dry microfibre duster or a soft cloth dampened with mild soap solution. Avoid solvent-based glass cleaners with ammonia or abrasive powders.",
      },
    ],
    galleryImages: [
      "/images/gallery/wall-panel-living-luxury.jpg",
      "/images/gallery/wall-panel-fluted-acoustic.jpg",
      "/images/gallery/wall-panel-lobby-luxury.jpg",
      "/images/gallery/wall-panel-dining-feature.jpg",
      "/images/gallery/wall-1.jpg",
      "/images/gallery/tv-unit-1.jpg",
    ],
  },

  commercial: {
    name: "Commercial & Retail Spaces",
    heroTagline: "High-Performance Commercial Surfaces",
    heroBgImage: "/images/gallery/commercial-premium.png",
    heroBg: "from-navy via-navy to-navy/80",
    intro:
      "From luxury retail showrooms and corporate headquarters to five-star hotels and healthcare clinics, SurajWood high-performance commercial panels deliver striking aesthetics built for high foot-traffic environments. Certified Class B1 fire-rated, non-porous, and scratch-resistant.",
    whySection: {
      title: "Why India's Top Commercial Fit-Out Contractors Choose SurajWood",
      body: "Commercial interiors face intense continuous use: heavy footfall, frequent chemical sanitization, public handling, and stringent municipal fire safety codes. Standard high-pressure laminates look flat and show ugly black seams over time, while painted drywall scuffs within weeks of handover.\n\nSurajWood commercial PMMA acrylic panels meet strict DIN 4102 Class B1 fire resistance specifications and are bonded with moisture-curing German PUR hotmelt to E1-grade low-emission substrates. Non-porous and bacteria-resistant, our panels withstand medical-grade sanitizers and daily commercial cleaning without degradation — delivering pristine brand presentation for corporate reception desks, airport retail fixtures, jewelry displays, and restaurant wall paneling.",
    },
    recommendedProducts: [
      {
        slug: "acryglass",
        name: "ACRYGLASS",
        reason: "Grand reception counters and showroom statement walls — mirror-like gloss creates maximum brand impact.",
        finishLabel: "High-Gloss",
      },
      {
        slug: "acrylux",
        name: "ACRYLUX",
        reason: "Office furniture, conference tables, and wall cladding — robust satin finish for corporate standards.",
        finishLabel: "Satin",
      },
      {
        slug: "acryglass-matte",
        name: "ACRYGLASS MATTE",
        reason: "High-end retail boutiques and hospitality suites — glass-grade depth with sophisticated glare-free touch.",
        finishLabel: "Matte-Glass",
      },
      {
        slug: "acrymatte",
        name: "ACRYMATTE",
        reason: "High-traffic public surfaces — nano anti-fingerprint coating minimizes routine maintenance.",
        finishLabel: "Matte",
      },
    ],
    benefits: [
      {
        icon: "🏢",
        title: "Class B1 Fire Certified",
        desc: "Meets commercial building code fire safety standards across all Indian metropolitan cities.",
      },
      {
        icon: "⚙️",
        title: "Commercial 3H Hardness",
        desc: "Tough PMMA surface handles high-traffic public contact without scuffing or dulling.",
      },
      {
        icon: "🧹",
        title: "Hygienic & Sanitizer Proof",
        desc: "Non-porous surface withstands commercial disinfectants, making it ideal for clinics, salons, and food service.",
      },
      {
        icon: "📐",
        title: "Large Format 8ft x 4ft",
        desc: "Standard 2440 x 1220 mm sheets reduce visible seams for grand architectural installations.",
      },
    ],
    faqExtra: [
      {
        question: "Are SurajWood acrylic panels certified for commercial fire safety?",
        answer:
          "Yes. All SurajWood PMMA acrylic panels carry Class B1 fire resistance certification per DIN 4102, making them compliant with commercial building regulations in India.",
      },
      {
        question: "Can commercial logos and signage be mounted on acrylic wall panels?",
        answer:
          "Yes. 3D acrylic letters, backlit brass signage, and LED channel letters can be flush-mounted or standoff-mounted securely through the panel into the backing substrate.",
      },
      {
        question: "What is the lead time for large commercial fit-out projects?",
        answer:
          "Standard stocked colors ship within 3–5 business days from our automated Bahadurgarh manufacturing plant. For large commercial runs (over 500 sheets), custom color-matching and substrate specs are dispatched within 7–10 days.",
      },
    ],
    galleryImages: [
      "/images/gallery/commercial-premium.png",
      "/images/gallery/commercial-2.jpg",
      "/images/gallery/commercial-3.jpg",
      "/images/gallery/commercial-4.jpg",
      "/images/gallery/commercial-new-showroom.png",
      "/images/gallery/commercial-new-lobby.jpg",
    ],
  },

  offices: {
    name: "Office Spaces & Executive Cabins",
    heroTagline: "Professional Office Surfaces",
    heroBgImage: "/images/gallery/office-new-executive.png",
    heroBg: "from-slate-900 via-slate-800 to-slate-900",
    intro:
      "Modern corporate environments demand surfaces that project executive sophistication while enduring intense daily workflow. SurajWood acrylic panels provide the ultimate finish for CEO desks, boardroom conference tables, acoustic wall paneling, and office pantry cabinetry.",
    whySection: {
      title: "The Executive Standard: Durable, Glare-Free & Anti-Fingerprint",
      body: "High-stress corporate offices require surfaces that remain immaculate despite constant laptop friction, coffee spills, and heavy team meetings. Standard laminates reflect harsh office fluorescent lights causing eye strain, while traditional veneer polish scratches easily from files and equipment.\n\nSurajWood ACRYMATTE and ACRYSILK panels feature anti-glare nano-coatings that diffuse overhead LED lighting while completely resisting fingerprints and hand oils. Factory PUR lamination ensures zero edge peeling on desk chamfers and conference table edges, delivering a lasting executive presence.",
    },
    recommendedProducts: [
      { slug: "acrymatte", name: "ACRYMATTE", reason: "Anti-glare, anti-fingerprint matte surfaces for distraction-free executive workspaces.", finishLabel: "Super Matte" },
      { slug: "acrysilk", name: "ACRYSILK", reason: "Soft-touch micro-texture for a premium tactile feel on executive director desks.", finishLabel: "Soft-Satin" },
      { slug: "acryglass", name: "ACRYGLASS", reason: "High-gloss mirror panels for striking corporate reception and elevator lobbies.", finishLabel: "High-Gloss" },
      { slug: "acrylux", name: "ACRYLUX", reason: "Rich solid tones for modern office pantry and storage cabinetry.", finishLabel: "High-Gloss Satin" },
    ],
    benefits: [
      { icon: "💼", title: "Executive Aesthetic", desc: "Sleek lines and boutique finishes tailored for modern corporate boardrooms." },
      { icon: "🖐️", title: "Anti-Fingerprint Tech", desc: "Nano-coating eliminates smudges on conference tables and executive desks." },
      { icon: "🔇", title: "Acoustic Friendly", desc: "Ideal for wall paneling in conference rooms and private video-call booths." },
      { icon: "🛡️", title: "3H Scratch Hardness", desc: "Resists daily friction from laptops, briefcases, and office equipment." },
    ],
    faqExtra: [
      { question: "Can SurajWood acrylic panels be used for large conference tables?", answer: "Yes. Our 1.5mm and 2mm PMMA acrylic sheets bonded on 25mm E1 HDMR create exceptionally durable, luxury conference table surfaces." },
      { question: "How does the anti-glare finish help in office environments?", answer: "ACRYMATTE diffuses overhead LED lighting, eliminating reflection on computer monitors and preventing eye fatigue during long work hours." },
      { question: "Are the panels resistant to hot coffee and tea spills?", answer: "Yes. The non-porous PMMA acrylic surface is completely stain-resistant to coffee, tea, ink, and cleaning disinfectants." },
    ],
    galleryImages: [
      "/images/gallery/office-new-executive.png",
      "/images/gallery/office-new-pantry.png",
      "/images/gallery/office-new-boardroom.png",
      "/images/gallery/office-1.jpg",
      "/images/gallery/commercial-premium.png",
      "/images/gallery/commercial-2.jpg",
    ],
  },

  "kids-rooms": {
    name: "Children's Rooms & Study Zones",
    heroTagline: "Safe & Vibrant Spaces",
    heroBgImage: "/images/gallery/kids-new-bunkbed.png",
    heroBg: "from-blue-600 via-purple-500 to-pink-500",
    intro:
      "Create a playful, healthy, and ultra-durable environment for your children. SurajWood panels are certified 100% non-toxic, zero-VOC, and stain-proof — allowing crayons, paints, and food spills to wipe away with ease without damaging the vibrant color finish.",
    whySection: {
      title: "Safety Meets Style: Certified Non-Toxic & Zero Formaldehyde",
      body: "Children's bedrooms and study zones demand the highest indoor air quality and ultimate durability against rough play, toy impacts, and artistic crayon experiments. Low-cost laminates often off-gas formaldehyde and toxic VOCs into bedroom air.\n\nSurajWood panels utilize food-safe, inert PMMA acrylic factory-bonded to E1-grade low-formaldehyde core boards. With 3H scratch resistance, rounded edge-banding safety profiles, and stain-repellent non-porous surfaces, SurajWood gives parents peace of mind and children a vibrant, inspiring room to grow.",
    },
    recommendedProducts: [
      { slug: "acrylux", name: "ACRYLUX", reason: "50+ bright, joyful solid colors to bring creative energy into kids' bedrooms.", finishLabel: "Vibrant Satin" },
      { slug: "acrymatte", name: "ACRYMATTE", reason: "Velvety matte study table surfaces that resist pencil scratches and glare.", finishLabel: "Super Matte" },
      { slug: "acrysilk", name: "ACRYSILK", reason: "Soft-touch pastel colors for gentle, calming nursery wardrobes.", finishLabel: "Soft-Satin" },
      { slug: "acryglass", name: "ACRYGLASS", reason: "High-gloss whiteboard-like surfaces where dry-erase markers wipe away cleanly.", finishLabel: "High-Gloss" },
    ],
    benefits: [
      { icon: "👶", title: "100% Non-Toxic & VOC Free", desc: "Food-safe PMMA acrylic creates a pure, healthy indoor air environment for children." },
      { icon: "🧼", title: "Crayon & Stain Proof", desc: "Marker pens, crayons, watercolors, and juice spills wipe clean with just water." },
      { icon: "🛡️", title: "Impact & Toy Resistant", desc: "3H pencil hardness withstands rough toy play, banging, and daily activity." },
      { icon: "🎨", title: "50+ Fade-Free Colors", desc: "UV-stable colors never fade or yellow, keeping rooms bright for years." },
    ],
    faqExtra: [
      { question: "Are SurajWood acrylic panels safe for toddlers and infants?", answer: "Yes. PMMA acrylic is chemically inert, non-toxic, and free from phthalates, BPA, and heavy metals. Bonded to E1 low-emission boards, they are completely safe for nursery furniture." },
      { question: "Can kids draw on high-gloss acrylic panels with whiteboard markers?", answer: "Yes! High-gloss ACRYGLASS and ACRYLUX can be used as dry-erase whiteboard panels where marker drawings wipe off cleanly without staining." },
      { question: "How do you clean crayon marks off acrylic wardrobe doors?", answer: "Simply use a microfibre cloth with a dab of mild liquid dish soap and warm water. The stain lifts off effortlessly without scrubbing." },
    ],
    galleryImages: [
      "/images/gallery/kids-new-bunkbed.png",
      "/images/gallery/kids-new-nursery.png",
      "/images/gallery/kids-new-playroom.png",
      "/images/gallery/kids-new-teen-purple.jpg",
      "/images/gallery/kids-new-pink-nook.png",
      "/images/gallery/kids-new-blue-study.png",
    ],
  },

  "tv-units": {
    name: "TV Units & Media Consoles",
    heroTagline: "Glossy Living Room Statement Surfaces",
    heroBgImage: "/images/gallery/tv-unit-1.jpg",
    heroBg: "from-zinc-900 via-zinc-800 to-zinc-900",
    intro:
      "Transform your living room media wall into a cinematic luxury showcase with optical-grade acrylic panels. ACRYGLASS and ACRYLUX panels deliver 95% mirror reflection, deep color saturation, and anti-static dust repulsion — creating the ultimate entertainment backdrop for modern LED and OLED TVs.",
    whySection: {
      title: "Why Acrylic is the #1 Choice for Living Room TV Feature Walls",
      body: "The living room media console is the architectural focal point of modern Indian homes. Traditional sunmica laminates look dull and show seams under downlights, while natural marble slabs are extremely heavy and cost ₹800–₹1,500/sq ft.\n\nSurajWood PMMA acrylic panels provide the opulent glass-like reflection of marble at a fraction of the weight and cost. With Class B1 fire resistance safe around home theater wiring, anti-static dust resistance, and 3H scratch hardness, SurajWood media panels keep your entertainment wall pristine.",
    },
    recommendedProducts: [
      { slug: "acryglass", name: "ACRYGLASS", reason: "Mirror-like 95% gloss provides dramatic reflection and spacious luxury.", finishLabel: "High-Gloss Glass" },
      { slug: "acrylux", name: "ACRYLUX", reason: "Rich metallic and solid colors for floating TV consoles and soundbar ledges.", finishLabel: "High-Gloss" },
      { slug: "acrymatte", name: "ACRYMATTE", reason: "Anti-glare matte backdrop for distraction-free movie and gaming experiences.", finishLabel: "Super Matte" },
      { slug: "acryglass-matte", name: "ACRYGLASS MATTE", reason: "Frosted glass depth with integrated LED backlight channel reveals.", finishLabel: "Matte-Glass" },
    ],
    benefits: [
      { icon: "✨", title: "95% Light Reflectivity", desc: "Mirror-like brilliance creates visual depth and elegance in living spaces." },
      { icon: "🛡️", title: "3H Scratch Resistance", desc: "Resists hairline scratches from remotes, set-top boxes, and consoles." },
      { icon: "🧹", title: "Anti-Static Dust Repellent", desc: "PMMA surface prevents dust clinging, making routine dusting effortless." },
      { icon: "🔥", title: "Class B1 Fire Rated", desc: "Tested safe around electronic wiring and TV entertainment power supplies." },
    ],
    faqExtra: [
      { question: "Can heavy 65-inch to 85-inch TVs be mounted directly on acrylic panels?", answer: "Yes. The acrylic panel is factory-fused to an 18mm E1 HDMR or plywood core. Heavy TV wall brackets are anchored securely through the panel into the wooden frame or wall studs." },
      { question: "Which finish is best behind an OLED TV: High-Gloss or Matte?", answer: "If your TV is positioned opposite a bright sunny window, ACRYMATTE anti-glare is recommended to eliminate ambient reflections. For dramatic evening ambient lighting, ACRYGLASS with warm LED perimeter glow is the most stunning." },
      { question: "Can LED strip channels be embedded inside the TV paneling?", answer: "Yes. Fabricators can easily mill 10mm–15mm shadow grooves or aluminum profile channels into the panel edges to house warm backlit LED strips." },
    ],
    galleryImages: [
      "/images/gallery/tv-unit-1.jpg",
      "/images/gallery/wall-panel-living-luxury.jpg",
      "/images/gallery/wall-panel-dining-feature.jpg",
      "/images/gallery/wall-1.jpg",
      "/images/gallery/commercial-premium.png",
      "/images/gallery/office-new-executive.png",
    ],
  },

  "bathroom-vanities": {
    name: "Bathroom Vanities & Spa Cladding",
    heroTagline: "100% Water-Resistant Luxury Vanities",
    heroBgImage: "/images/gallery/bathroom-1.jpg",
    heroBg: "from-cyan-950 via-teal-900 to-slate-900",
    intro:
      "Engineered specifically for steam-heavy, high-humidity bathroom environments. SurajWood prelaminated acrylic panels use German PUR reactive hotmelt to achieve a 100% waterproof bond that completely prevents swelling, warping, core rot, and mold growth in luxury bathroom vanities.",
    whySection: {
      title: "Why Standard Laminates Fail in Indian Bathrooms & Why PUR Acrylic Wins",
      body: "Standard bathroom vanity laminates fail within 2–3 years because water splashes and hot shower steam penetrate the edges, breaking down water-based adhesives and causing the MDF/plywood core to swell and rot.\n\nSurajWood acrylic panels are manufactured with moisture-curing German PUR hotmelt that forms a permanent waterproof chemical bond immune to steam up to 120°C. Combined with non-porous PMMA acrylic surfaces that harbor zero mold, mildew, or bacteria, SurajWood is the ultimate surface specification for luxury vanity cabinets and powder room accents.",
    },
    recommendedProducts: [
      { slug: "acryglass", name: "ACRYGLASS", reason: "Glass-like mirror gloss reflects vanity lighting and is 100% waterproof.", finishLabel: "High-Gloss Glass" },
      { slug: "acrylux", name: "ACRYLUX", reason: "Vibrant solid tones with waterproof PUR bonding for modern basin counters.", finishLabel: "High-Gloss" },
      { slug: "acryglass-matte", name: "ACRYGLASS MATTE", reason: "Spa-like luxury matte-glass texture completely resistant to water droplet marks.", finishLabel: "Matte-Glass" },
      { slug: "acrysilk", name: "ACRYSILK", reason: "Soft-satin waterproof finish that conceals soap splashes and steam marks.", finishLabel: "Soft-Satin" },
    ],
    benefits: [
      { icon: "💧", title: "100% Waterproof Bond", desc: "German PUR hotmelt prevents steam and water splash from penetrating core edges." },
      { icon: "🧼", title: "Anti-Bacterial & Anti-Mold", desc: "Non-porous PMMA acrylic prevents mold, mildew, and bacterial accumulation." },
      { icon: "🧴", title: "Soap & Chemical Proof", desc: "Withstands toothpastes, shampoos, bathroom cleaners, and cosmetic spills." },
      { icon: "✨", title: "Water Spots Wipe Clean", desc: "Hard water spots wipe away cleanly with a dry microfibre towel." },
    ],
    faqExtra: [
      { question: "Will acrylic vanity doors swell or warp in steamy master bathrooms?", answer: "No. SurajWood panels use German PUR reactive hotmelt adhesive that is chemically cured by moisture and remains stable up to 120°C." },
      { question: "Can acrylic panels be used for under-sink pull-out drawers?", answer: "Yes. They are ideal for high-moisture under-sink storage units, vanity drawer fronts, and laundry room cabinets." },
      { question: "How do you clean hard water spots off acrylic vanity surfaces?", answer: "Wipe with a 50/50 mixture of white vinegar and water using a soft microfibre cloth, then dry. Avoid abrasive scouring pads." },
    ],
    galleryImages: [
      "/images/gallery/bathroom-1.jpg",
      "/images/gallery/wall-panel-fluted-acoustic.jpg",
      "/images/gallery/kitchen-new-4.png",
      "/images/gallery/wall-1.jpg",
      "/images/gallery/wardrobe-new-luxury.jpg",
      "/images/gallery/commercial-new-jewelry.jpg",
    ],
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
    { slug: "tv-units" },
    { slug: "bathroom-vanities" },
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
    generateAggregateRatingSchema(`SurajWood Acrylic Panels for ${config.name}`, 4.9, 1150),
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
              src={config.heroBgImage || config.galleryImages[0]}
              alt={`${config.name} with Suraj Wood acrylic panels`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Sophisticated Gradients for crystal clear text contrast on all backgrounds */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/95 via-navy/50 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

        {/* Spacer to clear sticky navbar */}
        <div className="h-32 lg:h-40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-8">
          {/* Subtle Breadcrumb Overlay */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li>
                <Link href="/applications" className="hover:text-copper transition-colors">
                  Applications
                </Link>
              </li>
              <li>›</li>
              <li className="text-white/80 font-medium" aria-current="page">
                {config.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {/* Eyebrow badge matching Home Hero */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 md:w-8 h-[2px] bg-copper shadow-sm shrink-0" />
              <p className="inline-flex items-center text-copper font-extrabold tracking-[0.2em] text-[10px] sm:text-xs uppercase bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-copper/40 shadow-lg">
                {config.heroTagline}
              </p>
            </div>

            {/* H1: Playfair Display Serif - Reduced by one size for perfect balance */}
            <h1 className="font-playfair text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-5 drop-shadow-md">
              Premium Acrylic Panels <br />
              for <span className="text-copper-light font-bold">{config.name}</span>
            </h1>

            {/* Sub-headline / Intro */}
            <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed mb-8 font-light italic">
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
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-4">
              The Case for Acrylic
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              {config.whySection.title}
            </h2>
            <div className="text-white/80 text-base md:text-lg leading-relaxed space-y-4 text-left sm:text-center">
              {config.whySection.body.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MATERIAL COMPARISON TABLE (SEO & Competitive Differentiation)       */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-slate-50 py-16 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Performance Benchmark
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy mb-4">
              SurajWood PMMA Acrylic vs. Alternative Materials
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              See why leading Indian architects and interior contractors choose factory-bonded PMMA acrylic panels over traditional laminates, PVC louvers, and painted finishes.
            </p>
          </div>

          <div className="overflow-x-auto shadow-md rounded-2xl bg-white border border-gray-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="p-4 sm:p-5 font-heading font-bold text-xs uppercase tracking-wider">Feature / Parameter</th>
                  <th className="p-4 sm:p-5 font-heading font-bold text-xs uppercase tracking-wider bg-copper text-white">
                    SurajWood PMMA Acrylic
                  </th>
                  <th className="p-4 sm:p-5 font-heading font-bold text-xs uppercase tracking-wider">
                    Standard Laminates (Merino/Royale Touche)
                  </th>
                  <th className="p-4 sm:p-5 font-heading font-bold text-xs uppercase tracking-wider">
                    PVC / Charcoal / WPC Louvers
                  </th>
                  <th className="p-4 sm:p-5 font-heading font-bold text-xs uppercase tracking-wider">
                    PU Paint / Duco Finish
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr className="hover:bg-cream/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-navy">Optical Surface Flatness</td>
                  <td className="p-4 sm:p-5 font-bold text-copper bg-copper/5">95% Mirror Clarity (Zero Orange Peel)</td>
                  <td className="p-4 sm:p-5">Wavy orange peel reflections under downlights</td>
                  <td className="p-4 sm:p-5">Matte or artificial plastic sheen</td>
                  <td className="p-4 sm:p-5">High initial gloss; dulls over time</td>
                </tr>
                <tr className="hover:bg-cream/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-navy">Scratch & Impact Hardness</td>
                  <td className="p-4 sm:p-5 font-bold text-copper bg-copper/5">3H Pencil Hardness (Scratch Resistant)</td>
                  <td className="p-4 sm:p-5">1H–2H (Easily scratched by keys/rings)</td>
                  <td className="p-4 sm:p-5">Soft plastic; dents upon light impact</td>
                  <td className="p-4 sm:p-5">Prone to chipping and flaking at corners</td>
                </tr>
                <tr className="hover:bg-cream/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-navy">Moisture & Steam Tolerance</td>
                  <td className="p-4 sm:p-5 font-bold text-copper bg-copper/5">100% Waterproof (German PUR Hotmelt)</td>
                  <td className="p-4 sm:p-5">Solvent adhesives fail in steam (bubbling)</td>
                  <td className="p-4 sm:p-5">Waterproof but warps under heat</td>
                  <td className="p-4 sm:p-5">Paints bubble in high humidity</td>
                </tr>
                <tr className="hover:bg-cream/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-navy">Fire Safety Rating</td>
                  <td className="p-4 sm:p-5 font-bold text-copper bg-copper/5">Class B1 Flame Retardant (DIN 4102)</td>
                  <td className="p-4 sm:p-5">Standard paper-core combustible</td>
                  <td className="p-4 sm:p-5">Highly flammable; emits heavy black smoke</td>
                  <td className="p-4 sm:p-5">Solvent-based paints catch fire easily</td>
                </tr>
                <tr className="hover:bg-cream/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-navy">Indoor Air Quality (VOCs)</td>
                  <td className="p-4 sm:p-5 font-bold text-copper bg-copper/5">100% Non-Toxic, Zero VOC & E1 Core</td>
                  <td className="p-4 sm:p-5">Site contact adhesive off-gasses for months</td>
                  <td className="p-4 sm:p-5">Contains heavy plasticizers and chemical odors</td>
                  <td className="p-4 sm:p-5">Severe solvent fumes during 15-day drying</td>
                </tr>
                <tr className="hover:bg-cream/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-navy">Lifespan & Color Stability</td>
                  <td className="p-4 sm:p-5 font-bold text-copper bg-copper/5">10+ Years (Zero UV Yellowing)</td>
                  <td className="p-4 sm:p-5">3–5 years before edge peeling begins</td>
                  <td className="p-4 sm:p-5">Fades and yellows in sunlight within 2 years</td>
                  <td className="p-4 sm:p-5">Requires expensive repainting every 3 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ARCHITECTURAL SPECIFICATION MATRIX                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
              Architectural Specifications
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy mb-4">
              Technical Guidelines for Specifiers & Contractors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-cream rounded-2xl p-6 border border-cream-dark">
              <span className="text-2xl mb-3 block">📐</span>
              <h3 className="font-heading font-bold text-navy text-base mb-2">Standard Dimensions</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Standard 8ft x 4ft (2440 x 1220 mm) sheet format. Available in custom thickness options from 6mm to 25mm for seamless installation.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-6 border border-cream-dark">
              <span className="text-2xl mb-3 block">🪵</span>
              <h3 className="font-heading font-bold text-navy text-base mb-2">Core Substrates</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Factory-pressed onto E1-Grade Action TESA HDMR or calibrated BWP marine-grade plywood with calibrated balancing reverse sheets.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-6 border border-cream-dark">
              <span className="text-2xl mb-3 block">🛡️</span>
              <h3 className="font-heading font-bold text-navy text-base mb-2">Edge Trimming & Seams</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Compatible with color-matched 1.2mm acrylic edge-bands, 45° seamless mitre joints, T-profile metal inlays, and 5mm shadow reveals.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-6 border border-cream-dark">
              <span className="text-2xl mb-3 block">🚚</span>
              <h3 className="font-heading font-bold text-navy text-base mb-2">Pan-India Dispatch</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Manufactured in our automated Bahadurgarh plant. Dispatched within 3–5 business days to Delhi NCR, Mumbai, Bangalore, Hyderabad, and all major cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GALLERY                                                             */}
      {/* ------------------------------------------------------------------ */}
      <ApplicationGalleryClient 
        slug={slug} 
        appName={config.name} 
        fallbackImages={config.galleryImages} 
      />

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
              rel="nofollow noopener noreferrer"
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
