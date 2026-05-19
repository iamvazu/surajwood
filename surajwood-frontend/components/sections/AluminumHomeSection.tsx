import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, ShieldCheck, Zap } from "lucide-react";

const series = [
  {
    name: "Ottimo Series",
    desc: "Premium Gola & Profile Handles with seamless PUR bonding.",
    image: "/images/banner/bg2.jpg",
    link: "/products/aluminum-profiles#ottimo",
    icon: <Box size={20} />,
  },
  {
    name: "Aerolinea",
    desc: "Ultra-slim glass shutter profiles for contemporary kitchens.",
    image: "/images/banner/bg1.jpg",
    link: "/products/aluminum-profiles#aerolinea",
    icon: <Zap size={20} />,
  },
];

export default function AluminumHomeSection() {
  return (
    <section className="bg-white py-20 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-copper tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold mb-3">
              Hardware Excellence
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-navy leading-tight">
              AL-PROFHAN <br />
              <span className="text-copper">Aluminum Handle Profiles</span>
            </h2>
          </div>
          <Link
            href="/products/aluminum-profiles"
            className="inline-flex items-center gap-2 text-navy font-bold hover:text-copper transition-colors group"
          >
            Explore Hardware Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {series.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="group relative h-[400px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="w-10 h-10 bg-copper/90 backdrop-blur rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-white/70 text-sm max-w-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Feature strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Anti-Oxidation", desc: "6063-T5 Grade Alloy", icon: <ShieldCheck size={16} /> },
            { label: "Bespoke Lengths", desc: "Custom 3mtr & 4mtr Cuts", icon: <Box size={16} /> },
            { label: "PUR Bonded", desc: "Zero-Void Edge Finishing", icon: <Zap size={16} /> },
          ].map((feat) => (
            <div key={feat.label} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="text-copper">{feat.icon}</div>
              <div>
                <p className="text-[10px] font-bold text-navy uppercase tracking-widest leading-none mb-1">{feat.label}</p>
                <p className="text-xs text-gray-500 font-medium">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
