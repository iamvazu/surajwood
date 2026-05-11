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
    unit: "Delamination",
    title: "Factory Prelaminated",
    description:
      "German PUR hotmelt bonding on E1-Grade MDF, Plywood, or Particle Board. Zero delamination — guaranteed.",
  },
  {
    stat: "3H",
    unit: "Hardness",
    title: "Optical-Grade PMMA",
    description:
      "Pure PMMA acrylic — not PETG. Mirror-like clarity, 3H scratch resistance, 10+ years UV stability.",
  },
  {
    stat: "B1",
    unit: "Fire Rating",
    title: "Climate Engineered",
    description:
      "Tested for 45°C+ heat and coastal humidity. Class B1 fire rating. 95% light reflectivity.",
  },
  {
    stat: "10K+",
    unit: "Projects",
    title: "Architect's Choice",
    description:
      "Trusted by 10,000+ projects. Carpenter-friendly — precise cutting without chipping.",
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
