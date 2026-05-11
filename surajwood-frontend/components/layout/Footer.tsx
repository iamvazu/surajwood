import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, ArrowRight } from "lucide-react";

const products = [
  { name: "ACRYLUX", href: "/products/acrylux" },
  { name: "ACRYSILK", href: "/products/acrysilk" },
  { name: "ACRYMATTE", href: "/products/acrymatte" },
  { name: "ACRYGLASS", href: "/products/acryglass" },
  { name: "ACRYGLASS MATTE", href: "/products/acryglass-matte" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Applications", href: "/applications/kitchens" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Request Sample", href: "/contact#sample" },
  { name: "Dealer Enquiry", href: "/contact#dealer" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] text-white">
      {/* Top accent border with fine gradient */}
      <div className="h-[3px] bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#EF4444]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1 — Brand (Luxury large span) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
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
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light max-w-sm">
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
                    <ArrowRight size={12} className="opacity-100 mr-2 group-hover:translate-x-1 transition-transform text-[#DC2626]" />
                    <span className="group-hover:translate-x-1 transition-transform">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Quick Links
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 text-sm hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <ArrowRight size={12} className="opacity-100 mr-2 group-hover:translate-x-1 transition-transform text-[#DC2626]" />
                    <span className="group-hover:translate-x-1 transition-transform">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Regional Presence (PSEO Gateway) */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Our Presence
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Delhi", slug: "delhi" },
                { name: "Mumbai", slug: "mumbai" },
                { name: "Bangalore", slug: "bangalore" },
                { name: "Hyderabad", slug: "hyderabad" },
                { name: "Chennai", slug: "chennai" },
                { name: "Ahmedabad", slug: "ahmedabad" },
                { name: "Pune", slug: "pune" },
              ].map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/acrylux/kitchens/${city.slug}`}
                    className="text-gray-400 text-xs hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">SurajWood in {city.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact info (Luxurious spacing) */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6 relative inline-block">
              Connect With Us
              <span className="block mt-1 w-5 h-0.5 bg-[#DC2626]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                <address className="not-italic text-gray-400 text-sm leading-relaxed font-light">
                  45 KM Stone, VPO Rohad,
                  <br />
                  Bahadurgarh, Haryana 124501
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#DC2626] flex-shrink-0" />
                <a
                  href="tel:+919999995553"
                  className="text-gray-400 text-sm hover:text-[#DC2626] transition-colors font-light"
                >
                  +91-9999995553
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#DC2626] flex-shrink-0" />
                <a
                  href="mailto:sales@surajwood.com"
                  className="text-gray-400 text-sm hover:text-[#DC2626] transition-colors font-light"
                >
                  sales@surajwood.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-[#DC2626] flex-shrink-0" />
                <span className="text-gray-400 text-sm font-light">
                  Mon–Sat: 9:00 AM – 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Extreme dark bottom credit strip */}
      <div className="border-t border-gray-900 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-light">
            &copy; {currentYear} Suraj Wood Products. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-gray-600 text-xs hover:text-[#DC2626] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-800">|</span>
            <Link
              href="/terms-of-service"
              className="text-gray-600 text-xs hover:text-[#DC2626] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
