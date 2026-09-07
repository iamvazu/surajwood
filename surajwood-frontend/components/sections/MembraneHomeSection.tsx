import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Droplets, Layers } from "lucide-react";

const closeups = [
  {
    title: "Seamless Shaker Profiles",
    tag: "Zero Edge-Banding Lines",
    desc: "3D vacuum thermoformed continuous wrap with crisp recessed borders and zero visible glue seams.",
    image: "/images/products/membrane-shutters/closeups/closeup-shaker.jpg",
    accent: "bg-[#C0392B]",
  },
  {
    title: "Integrated J-Pull Handles",
    tag: "Handleless Ergonomics",
    desc: "Deep CNC finger-pull groove with natural Casella Oak foil flowing effortlessly into the recess.",
    image: "/images/products/membrane-shutters/closeups/closeup-jpull.jpg",
    accent: "bg-[#D4A373]",
  },
  {
    title: "Fluted 3D Textures",
    tag: "Architectural Dimension",
    desc: "Precision vertical fluted ribs in rich Parisian Blue and Forest Green for statement islands and wardrobes.",
    image: "/images/products/membrane-shutters/closeups/closeup-fluted.jpg",
    accent: "bg-[#2F5233]",
  },
];

const featuredSwatches = [
  { code: "031-WG", name: "Casella Oak Nature", category: "Wood Grain", img: "/images/products/membrane-shutters/031-wg-casella-eiche-nature.jpg" },
  { code: "035-WG", name: "Columbia Walnut", category: "Wood Grain", img: "/images/products/membrane-shutters/035-wg-nussbaum-columbia-brown.jpg" },
  { code: "004-PS", name: "Reed Green", category: "Perfect Silk", img: "/images/products/membrane-shutters/004-ps-reed-green.jpg" },
  { code: "017-PT", name: "Parisian Blue", category: "Porcelain Touch", img: "/images/products/membrane-shutters/017-pt-parisian-blue.jpg" },
  { code: "002-PS", name: "Kaschmir Greige", category: "Perfect Silk", img: "/images/products/membrane-shutters/002-ps-kaschmir.jpg" },
  { code: "008-PT", name: "Alpin Weiß", category: "Porcelain Touch", img: "/images/products/membrane-shutters/008-pt-alpin-weib.jpg" },
  { code: "023-CS", name: "Dakar Ceramic", category: "Ceramic Satin", img: "/images/products/membrane-shutters/023-cs-dakar.jpg" },
  { code: "020-PT", name: "Porcelain Black", category: "Porcelain Touch", img: "/images/products/membrane-shutters/020-pt-black.jpg" },
];

export default function MembraneHomeSection() {
  return (
    <section className="bg-[#FAF9F6] py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C0392B]/10 border border-[#C0392B]/20 mb-3">
              <Sparkles size={13} className="text-[#C0392B]" />
              <p className="text-[#C0392B] tracking-[0.25em] text-[10px] md:text-xs uppercase font-black">
                Continental 3D Thermoforming
              </p>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-[#0F172A] leading-tight">
              Continental <br />
              <span className="text-[#C0392B]">Membrane Shutters</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
              Monolithic 3D vacuum thermoforming over moisture-resistant HDMR core. Experience seamless continuous edges, 
              deep CNC Shaker grooving, and 36 European foils with zero edge-banding seams.
            </p>
          </div>

          <Link
            href="/products/membrane-shutters"
            className="inline-flex items-center gap-2 bg-[#0F172A] text-white hover:bg-[#C0392B] font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg group self-start md:self-end text-sm"
          >
            <span>Explore Membrane Collection</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ─── Detailed Close-Up Cards Grid (Showing Shutters Closely) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {closeups.map((item) => (
            <Link
              key={item.title}
              href="/products/membrane-shutters"
              className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Tag on Image */}
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#0F172A] px-3 py-1 rounded-full shadow-md">
                  {item.tag}
                </span>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading font-bold text-xl text-white drop-shadow-sm group-hover:text-[#E06A55] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C0392B] group-hover:translate-x-1 transition-transform">
                  <span>View Technical Details</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Curated Color Swatches Preview Strip ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#C0392B]">
                Curated 36 European Foils
              </p>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0F172A]">
                Popular Continental Membrane Shades
              </h3>
            </div>
            <Link
              href="/products/membrane-shutters#shades-explorer"
              className="text-xs font-bold text-[#0F172A] hover:text-[#C0392B] flex items-center gap-1 transition-colors"
            >
              <span>View All 36 Colors</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Swatches Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {featuredSwatches.map((swatch) => (
              <Link
                key={swatch.code}
                href="/products/membrane-shutters#shades-explorer"
                className="group block text-center"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-lg group-hover:border-[#C0392B] transition-all duration-300 group-hover:scale-105 mb-2">
                  <Image
                    src={swatch.img}
                    alt={`${swatch.code} ${swatch.name}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                    {swatch.code}
                  </span>
                </div>
                <p className="font-bold text-xs text-[#0F172A] truncate group-hover:text-[#C0392B] transition-colors">
                  {swatch.name}
                </p>
                <p className="text-[10px] text-gray-400 font-medium truncate">
                  {swatch.category}
                </p>
              </Link>
            ))}
          </div>

          {/* CTA Bottom Banner */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-gray-500 font-semibold">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#C0392B]" /> 5-Yr Warranty</span>
              <span className="flex items-center gap-1.5"><Droplets size={16} className="text-[#C0392B]" /> 100% Steam Proof</span>
              <span className="flex items-center gap-1.5"><Layers size={16} className="text-[#C0392B]" /> HDMR E1 Core</span>
            </div>
            <Link
              href="/products/membrane-shutters#inquire-form"
              className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md shadow-[#C0392B]/20"
            >
              Request Free Shade Card
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
