import Image from "next/image";

const CLIENTS = [
  {
    name: "Reliance Industries Limited",
    logo: "/images/clients/reliance.png",
  },
  {
    name: "Urban Ladder Home Interiors",
    logo: "/images/clients/urban-ladder.png",
  },
  {
    name: "Prestige Group",
    logo: "/images/clients/prestige.png",
  },
  {
    name: "Sobha Realty",
    logo: "/images/clients/sobha.png",
  },
];

export default function ClientLogos() {
  // Duplicate list multiple times for continuous, seamless infinite loop
  const marqueeList = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-14 bg-gradient-to-b from-white via-[#FBFBF9] to-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-copper tracking-[0.25em] text-[11px] md:text-xs uppercase font-bold mb-2">
          TRUSTED BY INDUSTRY LEADERS
        </p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-navy">
          Specified by India&apos;s Foremost Developers &amp; Interior Brands
        </h2>
      </div>

      {/* Marquee Container with Left & Right Gradient Shadows */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track (Left to Right) */}
        <div className="flex animate-marquee-ltr items-center py-4">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex-shrink-0 mx-4 sm:mx-8 group"
            >
              <div className="h-20 sm:h-24 w-44 sm:w-56 px-6 py-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm group-hover:shadow-md group-hover:border-copper/30 transition-all duration-300 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center filter grayscale group-hover:grayscale-0 opacity-75 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={`${client.name} - SurajWood Client`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 160px, 220px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
