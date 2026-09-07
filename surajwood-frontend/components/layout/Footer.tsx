import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Facebook, Youtube, ArrowRight } from "lucide-react";

const products = [
  { name: "ACRYLUX High-Gloss", href: "/products/acrylux" },
  { name: "ACRYSILK Soft-Satin", href: "/products/acrysilk" },
  { name: "ACRYMATTE Nano-Matte", href: "/products/acrymatte" },
  { name: "ACRYGLASS High-Gloss", href: "/products/acryglass" },
  { name: "ACRYGLASS MATTE", href: "/products/acryglass-matte" },
  { name: "Membrane Shutters", href: "/products/membrane-shutters" },
  { name: "Aluminum Profiles", href: "/products/aluminum-profiles" },
];

const designIdeas = [
  { name: "L-Shape Kitchens", href: "/design-ideas/kitchen/l-shape-kitchen" },
  { name: "Parallel Kitchens", href: "/design-ideas/kitchen/parallel-kitchen" },
  { name: "Modular Wardrobes", href: "/design-ideas/wardrobe/wardrobe-design-for-bedroom" },
  { name: "Walk-in Closets", href: "/design-ideas/wardrobe/walk-in-wardrobe" },
  { name: "Premium TV Units", href: "/design-ideas/living-room/tv-unit-design" },
  { name: "Corporate Offices", href: "/design-ideas/office/office-design" },
  { name: "Luxury Bathrooms", href: "/design-ideas/bathroom/bathroom-vanity" },
  { name: "Pooja Room Designs", href: "/design-ideas/other-rooms/pooja-room" },
];

const shades = [
  { name: "Arctic White", href: "/shades/white" },
  { name: "Midnight Navy", href: "/shades/navy-blue" },
  { name: "Sage Green", href: "/shades/sage-green" },
  { name: "Jet Black Matte", href: "/shades/black" },
  { name: "Champagne Beige", href: "/shades/champagne" },
  { name: "Rose Gold", href: "/shades/rose-gold" },
  { name: "Copper Silk", href: "/shades/copper" },
  { name: "Walnut Wood", href: "/shades/walnut" },
];

const presence = [
  { name: "Delhi NCR", slug: "delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Chennai", slug: "chennai" },
  { name: "Pune", slug: "pune" },
  { name: "Ahmedabad", slug: "ahmedabad" },
  { name: "Kolkata", slug: "kolkata" },
  { name: "Lucknow", slug: "lucknow" },
  { name: "Chandigarh", slug: "chandigarh" },
];

const quickLinks = [
  { name: "Manufacturing Hub", href: "/about" },
  { name: "Technical Resources", href: "/downloads" },
  { name: "Industry Exhibitions", href: "/#events" },
  { name: "Design Blog", href: "/blog" },
  { name: "Dealer Enquiry", href: "/dealers" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Sitemap Hub", href: "/presence" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#2a2d31] via-[#1a1c1e] to-[#0d0f11] text-white">
      {/* Top accent border with fine gradient */}
      <div className="h-[3px] bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#EF4444]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        
        {/* DECK 1 — Primary Keyword Link Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-gray-800 pb-16">
          
          {/* Column 1 — Brand (Luxury large span) */}
          <div className="lg:col-span-3 flex flex-col items-start pr-0 lg:pr-6">
            <div className="relative h-11 w-44 mb-6">
              <Image
                src="/images/logo/suraj-logo-white.png"
                alt="SurajWood logo"
                fill
                className="object-contain object-left"
                priority
                sizes="176px"
              />
            </div>
            
            <p className="text-[#DC2626] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Premium Acrylic Surfaces Since 2010
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              Manufacturing ACRYLUX, ACRYSILK, and ACRYGLASS panels
              with European flat-lamination technology. Precision-engineered for modern Indian spaces.
            </p>

            {/* Premium Minimal Social Links */}
            <div className="flex items-center gap-4 mt-auto">
              <a
                href="https://www.instagram.com/surajwood_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300"
              >
                <Instagram size={14} className="text-gray-400 group-hover:text-[#DC2626] transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/company/surajwood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300"
              >
                <Linkedin size={14} className="text-gray-400 group-hover:text-[#DC2626] transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/surajwood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300"
              >
                <Facebook size={14} className="text-gray-400 group-hover:text-[#DC2626] transition-colors" />
              </a>
              <a
                href="https://youtube.com/@surajwoodproducts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300"
              >
                <Youtube size={14} className="text-gray-400 group-hover:text-[#DC2626] transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2 — Collections */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Collections
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-gray-400 text-sm hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 mr-1 transition-all text-[#DC2626]" />
                    <span className="group-hover:translate-x-1 transition-transform">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Design Ideas */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Design Ideas
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="space-y-3">
              {designIdeas.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="text-gray-400 text-sm hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 mr-1 transition-all text-[#DC2626]" />
                    <span className="group-hover:translate-x-1 transition-transform">{d.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Shop By Shade */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Shop By Shade
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="space-y-3">
              {shades.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-gray-400 text-sm hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 mr-1 transition-all text-[#DC2626]" />
                    <span className="group-hover:translate-x-1 transition-transform">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Regional Presence */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Regional Presence
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
              {presence.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/acrylux/kitchens/${city.slug}`}
                    className="text-gray-400 text-xs hover:text-[#DC2626] transition-all duration-200 group block"
                  >
                    <span className="group-hover:translate-x-1 transition-transform block">SurajWood in {city.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <Link
                href="/presence"
                className="text-copper hover:text-[#DC2626] text-xs font-semibold inline-flex items-center gap-1 group"
              >
                <span>View All 50 Cities</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* DECK 2 — Quick Links & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Quick Links Column */}
          <div className="lg:col-span-5">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Quick Links
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 text-sm hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Address */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
                Our Hub
                <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
              </h3>
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#DC2626] flex-shrink-0 mt-1" />
                <address className="not-italic text-gray-400 text-sm leading-relaxed font-light">
                  <a href="https://maps.app.goo.gl/iUHqrGrSFW4rcUgS9" target="_blank" rel="noopener noreferrer" className="hover:text-[#DC2626] transition-colors">
                    <strong>Bahadurgarh Hub:</strong><br />
                    45 KM Stone, VPO Rohad,<br />
                    Bahadurgarh, Distt. Jhajjar,<br />
                    Haryana - 124501.
                  </a>
                </address>
              </div>
            </div>

            {/* Direct Connect */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
                Contact Info
                <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#DC2626] flex-shrink-0" />
                  <a href="tel:+919009171819" className="text-gray-400 hover:text-[#DC2626] transition-colors font-light">
                    +91-9009171819
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#DC2626] flex-shrink-0" />
                  <a href="mailto:sales@surajwood.com" className="text-gray-400 hover:text-[#DC2626] transition-colors font-light">
                    sales@surajwood.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#DC2626] flex-shrink-0" />
                  <span className="text-gray-400 font-light">
                    Mon–Sat: 9:00 AM – 6:00 PM
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Extreme dark bottom credit strip */}
      <div className="border-t border-gray-900 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-light">
            &copy; {currentYear} Suraj Wood Products Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-800 text-xs">ISO 9001:2015 Certified Manufacturing Facility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
