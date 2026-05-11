import Image from "next/image";
import { Calendar, MapPin, Award } from "lucide-react";

interface Event {
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
  highlight?: string;
}

const EVENTS: Event[] = [
  {
    title: "IndiaWood 2024",
    location: "BIEC, Bengaluru",
    date: "March 2024",
    description: "Showcasing our latest German PUR hotmelt bonding line and 20+ new ACRYLUX shades.",
    image: "/images/banner/bg1.jpg",
    highlight: "Most Innovative Surface Award",
  },
  {
    title: "Architect's Choice",
    location: "Pragati Maidan, Delhi",
    date: "Dec 2023",
    description: "Launch of the AL-PROFHAN aluminum profile series and premium matte-glass panels.",
    image: "/images/banner/bg2.jpg",
  },
  {
    title: "Index Plus Mumbai",
    location: "Jio World Convention Centre",
    date: "June 2023",
    description: "Connecting with India's top architects to showcase optical-grade PMMA clarity.",
    image: "/images/banner/bg3.jpg",
  },
];

export default function EventsShowcase() {
  return (
    <section id="events" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <p className="text-copper tracking-widest text-xs uppercase font-semibold mb-2">Manufacturing Authority</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-tight">
              Exhibitions & <span className="text-copper">Industry Events</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              SurajWood regularly participates in India&apos;s premier architecture and furniture exhibitions, 
              showcasing technical excellence to the design community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div 
              key={event.title}
              className="group bg-cream/30 rounded-2xl overflow-hidden border border-cream-dark/50 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {event.highlight && (
                  <div className="absolute top-4 left-4 bg-copper text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Award size={12} />
                    {event.highlight}
                  </div>
                )}
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors duration-500" />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <Calendar size={12} className="text-copper" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <MapPin size={12} className="text-copper" />
                    {event.location}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-navy mb-2 group-hover:text-copper transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
