// ─── Data ────────────────────────────────────────────────────────────────────

interface Feature {
  stat: string;
  unit: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    stat: "0%",
    unit: "Delamination Guarantee",
    title: "German PUR Hotmelt Bonded",
    description:
      "Factory-pressed on moisture-resistant E1 HDMR, Calibrated Plywood, or Particle Board. Outlasts manually pasted sunmica and laminates.",
  },
  {
    stat: "3H",
    unit: "Scratch Hardness",
    title: "Optical-Grade PMMA Acrylic",
    description:
      "Pure PMMA acrylic sheets — never cheap PETG or PVC. 95% mirror reflection, 3H scratch resistance, and buff-repairable surface.",
  },
  {
    stat: "10+ Yrs",
    unit: "UV Stability",
    title: "Zero Yellowing & Fading",
    description:
      "Tested for 45°C+ Indian kitchen heat and high humidity. Anti-yellowing guarantee for pure white and metallic finishes.",
  },
  {
    stat: "10K+",
    unit: "Kitchens & Homes",
    title: "Architect & Contractor Preferred",
    description:
      "Top choice for architects, modular kitchen OEMs, and interior designers across Delhi NCR, Mumbai, Bangalore, and Pan-India.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — compact */}
        <div className="text-center mb-8">
          <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-2">
            Why SurajWood
          </p>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-tight">
            Engineered for Indian Interiors
          </h2>
        </div>

        {/* Feature cards — stat-focused grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group bg-cream/50 hover:bg-navy rounded-2xl p-5 transition-all duration-300 border border-cream-dark hover:border-navy"
            >
              {/* Stat callout */}
              <div className="mb-3">
                <span className="font-heading font-bold text-3xl text-copper group-hover:text-copper-light transition-colors leading-none">
                  {feature.stat}
                </span>
                <span className="block text-[10px] text-gray-500 group-hover:text-white/50 uppercase tracking-widest font-semibold mt-0.5 transition-colors">
                  {feature.unit}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-sm text-navy group-hover:text-white leading-snug transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 group-hover:text-white/70 mt-1.5 leading-relaxed transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
