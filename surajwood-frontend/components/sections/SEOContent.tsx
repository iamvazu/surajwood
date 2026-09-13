import Link from "next/link";

export default function SEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which are the top acrylic sheet brands in India in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The leading acrylic sheet and prelaminated panel brands in India include SurajWood (ACRYLUX & ACRYMATTE), Royale Touche, Advance Laminates, CenturyPly (Lucida), Greenlam, and Merino Laminates. SurajWood specializes in factory-pressed optical-grade PMMA panels bonded with German PUR hotmelt for 100% moisture resistance and zero delamination.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between acrylic sheets and sunmica (laminates) for modular kitchens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Acrylic sheets are made of pure optical-grade PMMA polymer offering a 95% mirror-like reflection, non-porous hygienic surface, 3H scratch resistance, and 10+ years UV non-yellowing stability. Sunmica (high-pressure laminate) consists of phenolic resin and kraft paper; it is cost-effective but has visible edge lines, lower gloss reflectivity, and cannot be buffed if scratched.",
        },
      },
      {
        "@type": "Question",
        name: "What is the average acrylic sheet price per sq ft in India in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard 1mm to 2mm acrylic laminate sheets range from ₹120 to ₹350 per square foot (approx. ₹3,500 to ₹10,000 per 8x4 ft sheet). Factory-bonded prelaminated acrylic panels (on HDMR or calibrated plywood with matching edge-banding) cost between ₹450 to ₹950 per sq ft, saving on-site carpenter pasting labor and preventing bubbling.",
        },
      },
      {
        "@type": "Question",
        name: "What is German PUR bonding technology and why is it essential for modular kitchens in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "German PUR (Polyurethane) hotmelt bonding is a moisture-curing adhesive technology. Unlike traditional contact adhesives or white glue used in local carpenter workshops, PUR hotmelt forms an irreversible cross-linked chemical bond that is 100% waterproof and heat-resistant up to 120°C. This prevents delamination, swelling, and edge peeling in humid Indian kitchens.",
        },
      },
      {
        "@type": "Question",
        name: "How does acrylic finish compare with PU paint for modular kitchen cabinet shutters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While PU (Polyurethane) paint offers a seamless painted finish, it is prone to chipping, yellowing, and chemical staining from turmeric or oil over time. Acrylic panels like SurajWood ACRYLUX offer higher impact resistance, 3H scratch resistance, and are completely buff-repairable for hairline scratches.",
        },
      },
    ],
  };

  const popularGuides = [
    { title: "Top 10 Acrylic Sheet Brands in India (2026)", slug: "top-10-acrylic-sheet-brands-in-india-2026", tag: "Brand Guide" },
    { title: "SurajWood vs Royale Touche Acrylic Sheets", slug: "surajwood-vs-royale-touche-acrylic-sheets-comparison", tag: "Comparison" },
    { title: "Advance Laminates vs SurajWood Panels", slug: "advance-laminates-vs-surajwood-acrylic-panels", tag: "Comparison" },
    { title: "Acrylic Sheet Price Per Sq Ft in India (2026)", slug: "acrylic-sheet-price-per-sq-ft-in-india-2026", tag: "Price Guide" },
    { title: "Acrylic vs Sunmica: Difference, Price & Pros/Cons", slug: "acrylic-vs-sunmica-difference-price-pros-cons", tag: "Material Guide" },
    { title: "Acrylic vs Laminate for Modular Kitchens", slug: "acrylic-vs-laminate-for-modular-kitchen-cabinets", tag: "Kitchen Guide" },
    { title: "1mm vs 1.5mm vs 2mm Acrylic Sheet Thickness", slug: "1mm-vs-1-5mm-vs-2mm-acrylic-sheet-thickness-guide", tag: "Technical" },
    { title: "Acrylic Wardrobe Designs & Sliding Door Shutters", slug: "acrylic-wardrobe-designs-sliding-door-shutters", tag: "Wardrobes" },
    { title: "Matte vs High-Gloss Acrylic Kitchen Cabinets", slug: "matte-acrylic-vs-high-gloss-acrylic-kitchen-cabinets", tag: "Design Guide" },
    { title: "Prelaminated Acrylic Boards vs Manual Sheet Pressing", slug: "prelaminated-acrylic-boards-vs-manual-sheet-pressing", tag: "Manufacturing" },
    { title: "Centuryply Lucida vs SurajWood Acrylux", slug: "centuryply-lucida-vs-surajwood-acrylux-review", tag: "Brand Review" },
    { title: "Merino Laminates vs SurajWood Acrylic", slug: "merino-laminates-vs-surajwood-acrylic-review", tag: "Brand Review" },
  ];

  return (
    <section className="bg-cream/40 py-20 px-6 border-t border-cream-dark">
      {/* JSON-LD FAQ Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-copper animate-pulse" />
            <span className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
              Surfacing Encyclopedia & Buyer Guide
            </span>
          </div>
          <h2 className="font-playfair text-navy text-3xl md:text-5xl leading-tight font-bold">
            Top Acrylic Sheet Brands in India: <br />
            <span className="text-copper italic">SurajWood, Royale Touche, Advance & Merino</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed font-light">
            Choosing the right surfacing material is the most critical decision when planning modern modular kitchens, premium bedroom wardrobes, and high-end commercial interiors. This technical guide explores how factory-bonded PMMA acrylic sheets compare against traditional sunmica laminates, PVC foils, and PU paint.
          </p>
        </div>

        {/* 3-Column Luxury Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Chemistry of PMMA */}
          <div className="bg-white rounded-3xl p-8 border border-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center text-copper text-2xl mb-6">
              ✨
            </div>
            <h3 className="font-heading font-bold text-lg text-navy mb-4">
              Optical-Grade PMMA Acrylic vs Sunmica
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Unlike cheap PVC foils or standard paper-based sunmica laminates that scratch and discolor, SurajWood uses **optical-grade Polymethyl Methacrylate (PMMA)**. PMMA delivers a genuine mirror-like depth of color with 95% light reflectivity.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              It is 100% UV-stable, ensuring your white kitchen shutters and wardrobe panels never turn yellow under sunlight or Indian cooking vapours over a 10-year lifespan.
            </p>
          </div>

          {/* Card 2: Lamination Science */}
          <div className="bg-white rounded-3xl p-8 border border-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center text-copper text-2xl mb-6">
              ⚙️
            </div>
            <h3 className="font-heading font-bold text-lg text-navy mb-4">
              German PUR Hotmelt Lamination
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              A premium acrylic surface requires industrial-grade bonding. Standard carpenter workshop pasting relies on manual rubber adhesives or PVAc glue, leading to unsightly air bubbles, delamination, and wavy &ldquo;orange peel&rdquo; defects.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              At our Bahadurgarh facility, SurajWood factory-presses acrylic sheets onto moisture-resistant E1 HDMR and calibrated plywood using **German Polyurethane Reactive (PUR) Hotmelt**, guaranteeing **zero delamination** and heat resistance up to 120°C.
            </p>
          </div>

          {/* Card 3: Anti-Scratch & Repair */}
          <div className="bg-white rounded-3xl p-8 border border-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center text-copper text-2xl mb-6">
              💎
            </div>
            <h3 className="font-heading font-bold text-lg text-navy mb-4">
              3H Scratch Resistance & Buff-Repairability
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Indian modular kitchens endure heavy daily use, stainless steel cookware friction, and frequent cleaning. While standard laminates and PU paints chip irreversibly, SurajWood acrylic panels feature **3H pencil scratch hardness**.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Superficial hairline scratches can be easily buffed out using standard acrylic rubbing compound and a microfibre cloth, restoring the original high-gloss mirror finish effortlessly.
            </p>
          </div>

        </div>

        {/* Two-Column Deep-Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-cream-dark/60 mb-16">
          
          {/* Column 1: Application Guide */}
          <div className="space-y-6">
            <h3 className="font-playfair text-navy text-2xl md:text-3xl font-bold">
              Applications: Acrylic Sheets for Kitchens & Wardrobes
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Surfacing choices define the longevity of home furniture. In modular kitchens, PMMA acrylic sheets are the industry benchmark for cabinet shutters and drawer fronts. Given steam from cooking and dishwashers, factory PUR-bonded boards prevent substrate wood from swelling or warping.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              For bedroom wardrobes and sliding door shutters, large vertical panels require absolute flatness. SurajWood precision-calibrated balancer backing sheets ensure that doors remain 100% warp-free. Our **ACRYMATTE** and **ACRYSILK** collections feature **nano anti-fingerprint coatings** that keep handle-less cabinets smudge-free.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/products/acrylux" className="text-copper hover:text-navy text-sm font-semibold transition-colors">
                Explore ACRYLUX High-Gloss →
              </Link>
              <Link href="/products/acrymatte" className="text-copper hover:text-navy text-sm font-semibold transition-colors">
                Explore ACRYMATTE Nano-Matte →
              </Link>
            </div>
          </div>

          {/* Column 2: Material Comparison Table */}
          <div>
            <h3 className="font-playfair text-navy text-2xl md:text-3xl font-bold mb-6">
              Surface Comparison: Acrylic vs. Sunmica vs. PU Paint
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-cream-dark">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="p-4 border-r border-white/10 font-bold">Feature</th>
                    <th className="p-4 border-r border-white/10 font-bold">SurajWood Acrylic</th>
                    <th className="p-4 border-r border-white/10 font-bold">Sunmica / Laminate</th>
                    <th className="p-4 font-bold">PU Painted Finish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-cream-dark">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">Scratch Resistance</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">3H Hardness (Buffable)</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">1H - 2H (Not repairable)</td>
                    <td className="p-4 text-gray-600">Low (Prone to chipping)</td>
                  </tr>
                  <tr className="bg-cream/20 border-b border-cream-dark">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">UV & Yellowing Stability</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">10 Years Guarantee</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">Moderate (Fades)</td>
                    <td className="p-4 text-gray-600">Moderate (Dulls in sun)</td>
                  </tr>
                  <tr className="bg-white border-b border-cream-dark">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">Delamination Risk</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">Zero (German PUR Bonded)</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">High (Local carpenter glue)</td>
                    <td className="p-4 text-gray-600">None (Full coating)</td>
                  </tr>
                  <tr className="bg-cream/20">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">Mirror Reflection</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">95% High Optical Gloss</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">50% - 65% Semi-Gloss</td>
                    <td className="p-4 text-gray-600">85% High Gloss</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Brand Comparison & Popular Articles Grid */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 border border-cream-dark shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-copper">
                Trending Industry Guides & Comparisons
              </p>
              <h3 className="font-playfair font-bold text-2xl md:text-3xl text-navy">
                Explore Acrylic Sheets, Prices & Brand Guides
              </h3>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-copper hover:text-navy flex items-center gap-1 transition-colors self-start md:self-auto"
            >
              <span>View All 65+ Articles</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className="group p-4 rounded-2xl bg-cream/20 hover:bg-navy border border-cream-dark hover:border-navy transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-copper group-hover:text-copper-light block mb-2">
                    {guide.tag}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-navy group-hover:text-white transition-colors line-clamp-2">
                    {guide.title}
                  </h4>
                </div>
                <div className="mt-4 text-xs font-semibold text-gray-400 group-hover:text-copper transition-colors flex items-center gap-1">
                  <span>Read Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Section */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-cream-dark shadow-sm">
          <div className="text-center mb-10">
            <h3 className="font-playfair text-navy text-2xl md:text-3xl font-bold">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Everything you need to know about acrylic sheets, top brands in India, pricing, and installation.
            </p>
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqSchema.mainEntity.map((faq, index) => (
              <details
                key={index}
                className="group bg-cream/10 rounded-2xl border border-cream-dark/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer list-none font-bold text-navy hover:text-copper transition-colors">
                  <span className="text-sm md:text-base">{faq.name}</span>
                  <span
                    className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-copper text-lg group-open:rotate-45 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-cream-dark/30 pt-4">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

