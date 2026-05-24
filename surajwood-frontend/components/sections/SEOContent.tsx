import Link from "next/link";

export default function SEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is PMMA acrylic and how does it differ from standard PVC or PETG laminate sheets?",
        "answer": "PMMA (Polymethyl Methacrylate) acrylic is an optical-grade, highly stable polymer that provides a mirror-like high-gloss or deep matte finish. Unlike standard PVC or PETG laminate sheets (often called sunmica or mica sheets in India), PMMA does not yellow under UV light, scratch easily, or release volatile organic compounds (VOCs). It is co-extruded for uniform color depth and offers a 3H pencil hardness scratch resistance, making it the most durable and luxurious surfacing choice for modern homes."
      },
      {
        "@type": "Question",
        "name": "What is German PUR bonding technology and why is it essential for modular kitchens in India?",
        "answer": "German PUR (Polyurethane) hotmelt bonding is a moisture-curing adhesive technology. Unlike traditional contact adhesives or white glue used in local carpenter workshops, PUR hotmelt forms an irreversible cross-linked chemical bond that is 100% waterproof and heat-resistant up to 120°C. This prevents delamination, swelling, and edge peeling, which are very common in high-humidity areas like Indian kitchens during extreme monsoons or intense cooking cycles."
      },
      {
        "@type": "Question",
        "name": "How does acrylic finish compare with PU paint for modular kitchen cabinet shutters?",
        "answer": "While PU (Polyurethane) paint offers a seamless painted finish, it is highly prone to chipping, scratching, and chemical staining from turmeric or oil over time. Acrylic panels like SurajWood ACRYLUX offer much higher impact resistance, 3H scratch resistance, and are completely repairable. Minor hairline scratches on PMMA acrylic can be easily buffed and polished back to their original mirror finish, which is impossible with PU paint without a full, expensive respray."
      },
      {
        "@type": "Question",
        "name": "What is the standard price of premium acrylic panels per sq ft in India?",
        "answer": "The price of premium prelaminated acrylic panels in India typically ranges from INR 850 to INR 2,500 per square foot, depending on the thickness (8mm, 18mm, 25mm), the backing balanced sheet, substrate core quality (E1-grade MDF or Plywood), and finish type (satin, high-gloss, nano-matte, or matte-glass). While manually pasted local mica sheets are cheaper upfront, factory-laminated PMMA panels save on-site labor costs, reduce installation time, and last three times longer."
      },
      {
        "@type": "Question",
        "name": "How should I clean and maintain high-gloss acrylic wardrobe and kitchen shutters?",
        "answer": "Acrylic surfaces require minimal maintenance. For daily dust, wipe with a clean, dry microfibre cloth. For kitchen grease or cooking vapor, use a soft cloth dampened with a mild solution of dish soap and lukewarm water. Never use paper towels, wire scrubbers, or abrasive acid/alkali cleaners. For matte panels like ACRYMATTE or ACRYSILK, the built-in anti-fingerprint nano-coating repels smudges, requiring simple wipe-down maintenance."
      }
    ]
  };

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
              Surfacing Encyclopedia
            </span>
          </div>
          <h2 className="font-playfair text-navy text-3xl md:text-5xl leading-tight font-bold">
            The Ultimate Guide to Premium Surfaces: <br />
            <span className="text-copper italic">PMMA Acrylic vs. Traditional Laminates</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed font-light">
            Choosing the right surfacing material is the most critical decision when planning modern modular kitchens, premium bedroom wardrobes, and high-end commercial interiors. This technical breakdown explores why architects and interior designers are transitioning away from local manually-applied laminates (sunmica) to German-bonded prelaminated PMMA acrylic panels.
          </p>
        </div>

        {/* 3-Column Luxury Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Chemistry of PMMA */}
          <div className="bg-white rounded-3xl p-8 border border-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center text-copper text-2xl mb-6">
              🧪
            </div>
            <h3 className="font-heading font-bold text-lg text-navy mb-4">
              Optical-Grade PMMA Polymer Chemistry
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Unlike cheap PVC foils or thin PETG plastics that fade and yellow in bright Indian sunlight, SurajWood uses **optical-grade Polymethyl Methacrylate (PMMA)** polymer sheets. PMMA is an organic compound that is 100% UV-stable, meaning white shutters stay perfectly white for over 10 years without yellowing.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              With an organic molecular structure, PMMA delivers a depth of color and mirror-like 95% light reflectivity that printed laminates (commonly known as mica or sunmica) cannot replicate. Its non-porous surface is highly hygienic, preventing bacterial or fungal growth in humid areas.
            </p>
          </div>

          {/* Card 2: Lamination Science */}
          <div className="bg-white rounded-3xl p-8 border border-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center text-copper text-2xl mb-6">
              ⚙️
            </div>
            <h3 className="font-heading font-bold text-lg text-navy mb-4">
              The German PUR Hotmelt Lamination Edge
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              A premium surface is only as good as its bonding agent. Standard local workshop carpentry relies on manual contact adhesives (rubber-based) or PVAc glue (white glue) pasted by hand. Under India&apos;s heavy monsoons and high kitchen heat, these local adhesives break down, causing the laminate to bubble, warp, or peel.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              At our fully automated facility in Bahadurgarh, Haryana, SurajWood laminates PMMA sheets onto premium E1-grade MDF and calibrated plywood using **German Polyurethane Reactive (PUR) Hotmelt**. PUR hotmelt cures via atmospheric moisture, creating an irreversible cross-linked bond. It guarantees **zero delamination** and heat resistance up to 120°C.
            </p>
          </div>

          {/* Card 3: Anti-Scratch & Repair */}
          <div className="bg-white rounded-3xl p-8 border border-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center text-copper text-2xl mb-6">
              💎
            </div>
            <h3 className="font-heading font-bold text-lg text-navy mb-4">
              3H Scratch Hardness & Buff-Repairability
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Indian modular kitchens are highly active spaces, subject to constant friction from stainless steel pots, heavy spices, and frequent cooking prep. Traditional laminates scratch easily and, once scratched, must be completely replaced. 
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              SurajWood panels feature a hardened surface tested to **3H pencil scratch hardness** (compliant with EN ISO 15184). In the rare event of a superficial scratch, our PMMA acrylic has a unique advantage: it is **buff-repairable**. Using a standard acrylic polishing compound and soft microfiber cloth, homeowners can easily buff out micro-scratches, restoring the mirror shine in minutes.
            </p>
          </div>

        </div>

        {/* Two-Column Deep-Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-cream-dark/60 mb-20">
          
          {/* Column 1: Application Guide */}
          <div className="space-y-6">
            <h3 className="font-playfair text-navy text-2xl md:text-3xl font-bold">
              Premium Applications: Kitchens, Wardrobes, & Wall Panels
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Surfacing choices define the physical longevity of your home furniture. When designing modular kitchens, PMMA acrylic sheets are the ideal specification for shutters and drawer fronts. Given the high-heat exposure from gas hobs and steam from dishwashers, our waterproof, PUR-bonded boards prevent the core wood from swelling or warping. 
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              For bedroom wardrobes and walk-in closets, large vertical surfaces demand absolute flatness. Cheaper laminates often showcase a wavy &quot;orange peel&quot; texture when viewed under direct light. SurajWood&apos;s precision-calibrated backing balancer sheets ensure that all high-gloss and matte wardrobe doors stay 100% straight and flat over decades of daily door-handling.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our advanced **ACRYMATTE** and **ACRYSILK** series feature **nano anti-fingerprint coatings** that scatter light reflections. This keeps handle-less sliding wardrobes and drawers completely smudge-free even in active households with young children.
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
              Direct Surface Comparison: Acrylic vs. PVC vs. PU Paint
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-cream-dark">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="p-4 border-r border-white/10 font-bold">Performance Metric</th>
                    <th className="p-4 border-r border-white/10 font-bold">SurajWood PMMA Acrylic</th>
                    <th className="p-4 border-r border-white/10 font-bold">PETG / PVC Sheets</th>
                    <th className="p-4 font-bold">PU Painted Finish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-cream-dark">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">Scratch Resistance</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">3H Hardness (Excellent)</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">1H - 2H (Moderate)</td>
                    <td className="p-4 text-gray-600">Low (Prone to chipping)</td>
                  </tr>
                  <tr className="bg-cream/20 border-b border-cream-dark">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">UV & Yellowing Stability</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">10 Years Guarantee</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">2 - 3 Years (Discolors)</td>
                    <td className="p-4 text-gray-600">Moderate (Dulls in sun)</td>
                  </tr>
                  <tr className="bg-white border-b border-cream-dark">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">Delamination & Edge-failure</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">Zero (German PUR Bonded)</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">High (Local carpenter PVAc)</td>
                    <td className="p-4 text-gray-600">None (Full coating)</td>
                  </tr>
                  <tr className="bg-cream/20">
                    <td className="p-4 font-semibold text-navy border-r border-cream-dark">Buff-Repairability</td>
                    <td className="p-4 text-gray-800 font-bold bg-copper/5 border-r border-cream-dark">Yes (Micro-scratches buff out)</td>
                    <td className="p-4 text-gray-600 border-r border-cream-dark">No</td>
                    <td className="p-4 text-gray-600">No (Requires full respray)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Accordion FAQ Section */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-cream-dark shadow-sm">
          <div className="text-center mb-10">
            <h3 className="font-playfair text-navy text-2xl md:text-3xl font-bold">
              Surfaces & Lamination FAQ
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Everything you need to know about PMMA acrylic sheets, pricing, and installation.
            </p>
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "What is PMMA acrylic and how does it differ from standard PVC or PETG laminate sheets?",
                a: "PMMA (Polymethyl Methacrylate) acrylic is an optical-grade, highly stable polymer that provides a mirror-like high-gloss or deep matte finish. Unlike standard PVC or PETG laminate sheets (often called sunmica or mica sheets in India), PMMA does not yellow under UV light, scratch easily, or release volatile organic compounds (VOCs). It is co-extruded for uniform color depth and offers a 3H pencil hardness scratch resistance, making it the most durable and luxurious surfacing choice for modern homes."
              },
              {
                q: "What is German PUR bonding technology and why is it essential for modular kitchens in India?",
                a: "German PUR (Polyurethane) hotmelt bonding is a moisture-curing adhesive technology. Unlike traditional contact adhesives or white glue used in local carpenter workshops, PUR hotmelt forms an irreversible cross-linked chemical bond that is 100% waterproof and heat-resistant up to 120°C. This prevents delamination, swelling, and edge peeling, which are very common in high-humidity areas like Indian kitchens during extreme monsoons or intense cooking cycles."
              },
              {
                q: "How does acrylic finish compare with PU paint for modular kitchen cabinet shutters?",
                a: "While PU (Polyurethane) paint offers a seamless painted finish, it is highly prone to chipping, scratching, and chemical staining from turmeric or oil over time. Acrylic panels like SurajWood ACRYLUX offer much higher impact resistance, 3H scratch resistance, and are completely repairable. Minor hairline scratches on PMMA acrylic can be easily buffed and polished back to their original mirror finish, which is impossible with PU paint without a full, expensive respray."
              },
              {
                q: "What is the standard price of premium acrylic panels per sq ft in India?",
                a: "The price of premium prelaminated acrylic panels in India typically ranges from INR 850 to INR 2,500 per square foot, depending on the thickness (8mm, 18mm, 25mm), the backing balanced sheet, substrate core quality (E1-grade MDF or Plywood), and finish type (satin, high-gloss, nano-matte, or matte-glass). While manually pasted local mica sheets are cheaper upfront, factory-laminated PMMA panels save on-site labor costs, reduce installation time, and last three times longer."
              },
              {
                q: "How should I clean and maintain high-gloss acrylic wardrobe and kitchen shutters?",
                a: "Acrylic surfaces require minimal maintenance. For daily dust, wipe with a clean, dry microfibre cloth. For kitchen grease or cooking vapor, use a soft cloth dampened with a mild solution of dish soap and lukewarm water. Never use paper towels, wire scrubbers, or abrasive acid/alkali cleaners. For matte panels like ACRYMATTE or ACRYSILK, the built-in anti-fingerprint nano-coating repels smudges, requiring simple wipe-down maintenance."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-cream/10 rounded-2xl border border-cream-dark/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer list-none font-bold text-navy hover:text-copper transition-colors">
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <span
                    className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-copper text-lg group-open:rotate-45 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-cream-dark/30 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
