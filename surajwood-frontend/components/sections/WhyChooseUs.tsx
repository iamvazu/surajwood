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
    title: "European Technology",
    description:
      "German PUR hotmelt adhesive and European flat lamination technology ensures panels that never delaminate or warp — even in India's extreme climate conditions.",
  },
  {
    icon: Sparkles,
    title: "50+ Premium Finishes",
    description:
      "From mirror-gloss to matte, satin to silk — our range covers every modern interior design aesthetic. Over 50 hand-selected shades across five collections.",
  },
  {
    icon: Clock,
    title: "15+ Years of Excellence",
    description:
      "Trusted by 10,000+ projects across India. Architects, designers, and homeowners rely on Suraj Wood quality for kitchens, wardrobes, and commercial spaces.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description:
      "Direct factory dispatch to Delhi, Mumbai, Bangalore, Hyderabad, Chennai and all major cities. Secure packaging, on-time delivery, every single order.",
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
