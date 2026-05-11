import { Shield, Sparkles, Clock, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Factory Prelaminated",
    description:
      "Every SurajWood panel is factory-bonded using German PUR hotmelt technology on E1-Grade MDF, Plywood, or Particle Board substrates for zero delamination.",
  },
  {
    icon: Sparkles,
    title: "Optical-Grade PMMA",
    description:
      "We use pure PMMA (Acrylic) polymer — not PETG — ensuring mirror-like optical clarity, 3H scratch resistance, and 10+ years of UV stability without yellowing.",
  },
  {
    icon: Clock,
    title: "Technical Excellence",
    description:
      "Tested for India's extreme 45°C+ heat and coastal humidity. Our panels carry a Class B1 fire rating and 95% light reflectivity for maximum visual impact.",
  },
  {
    icon: Truck,
    title: "Architect's Choice",
    description:
      "Trusted by 10,000+ projects. Carpenter-friendly design allows for precise on-site cutting and drilling without the chipping common in cheaper alternatives.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-copper tracking-widest text-sm uppercase font-medium mb-3">
            Why SurajWood
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy leading-tight">
            Engineered for Indian Interiors
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            We combine European manufacturing precision with deep knowledge of
            the Indian climate and design sensibility.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-start group"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-copper/10 text-copper transition-colors duration-300 group-hover:bg-copper group-hover:text-white">
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-navy mt-4 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-cream-dark" />
      </div>
    </section>
  );
}
