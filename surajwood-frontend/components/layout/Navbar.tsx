"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const products = [
  { name: "ACRYLUX", href: "/products/acrylux", desc: "Satin Finish" },
  { name: "ACRYSILK", href: "/products/acrysilk", desc: "Soft Satin Finish" },
  { name: "ACRYMATTE", href: "/products/acrymatte", desc: "Matte Finish" },
  { name: "ACRYGLASS", href: "/products/acryglass", desc: "High Gloss Finish" },
  { name: "ACRYGLASS MATTE", href: "/products/acryglass-matte", desc: "Matte Glass Finish" },
];

const applications = [
  { name: "Kitchens", href: "/applications/kitchens" },
  { name: "Wardrobes", href: "/applications/wardrobes" },
  { name: "Commercial", href: "/applications/commercial" },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [mobilProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileApplicationsOpen, setMobileApplicationsOpen] = useState(false);
  const pathname = usePathname();
  const productsRef = useRef<HTMLLIElement>(null);
  const applicationsRef = useRef<HTMLLIElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
      if (applicationsRef.current && !applicationsRef.current.contains(e.target as Node)) {
        setApplicationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navbarBg = "bg-white shadow-sm border-b border-gray-100";
  const linkColor = "text-[#1F1F1F]";
  const logoSrc = "/images/logo/suraj-logo.png";

  return (
    <>
      {/* Top bar */}
      <div
        className="hidden md:flex items-center justify-between px-6 lg:px-12 py-3 text-sm bg-[#1F1F1F] text-white"
      >
        {/* Social Icons Left */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DC2626] transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={15} />
          </a>
          <a
            href="https://www.instagram.com/surajwood_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DC2626] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={15} />
          </a>
          <a
            href="https://www.linkedin.com/company/surajwood"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DC2626] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DC2626] transition-colors"
            aria-label="Youtube"
          >
            <Youtube size={15} />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DC2626] transition-colors flex items-center"
            aria-label="X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.6,2 L14,2 L10,6.5 L14.7,13 L11,13 L8.2,9 L4.8,13 L3.5,13 L7.8,8.2 L3.2,2 L7,2 L9.5,5.6 L12.6,2 Z M12,12 L13.3,12 L5.5,3 L4,3 L12,12 Z" />
            </svg>
          </a>
        </div>

        {/* Contact info Right */}
        <div className="flex items-center">
          <a
            href="tel:+919999995553"
            className="flex items-center gap-1.5 hover:text-[#DC2626] transition-colors"
          >
            <Phone size={15} />
            +91-9999995553
          </a>
          <span className="mx-3 opacity-30">|</span>
          <a
            href="mailto:sales@surajwood.com"
            className="hover:text-[#DC2626] transition-colors"
          >
            sales@surajwood.com
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${navbarBg}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src={logoSrc}
              alt="SurajWood Logo"
              width={210}
              height={60}
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <li>
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${linkColor} hover:text-[#DC2626] ${
                  isActive("/") ? "text-[#DC2626]" : ""
                }`}
              >
                Home
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${linkColor} hover:text-[#DC2626] ${
                  isActive("/about") ? "text-[#DC2626]" : ""
                }`}
              >
                About
              </Link>
            </li>

            {/* Products dropdown */}
            <li ref={productsRef} className="relative">
              <button
                onClick={() => {
                  setProductsOpen((v) => !v);
                  setApplicationsOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${linkColor} hover:text-[#DC2626] ${
                  pathname.startsWith("/products") ? "text-[#DC2626]" : ""
                }`}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {products.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setProductsOpen(false)}
                      className="flex flex-col px-4 py-2.5 hover:bg-[#F5F1EB] group transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#1F1F1F] group-hover:text-[#DC2626] transition-colors">
                        {p.name}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5">{p.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Applications dropdown */}
            <li ref={applicationsRef} className="relative">
              <button
                onClick={() => {
                  setApplicationsOpen((v) => !v);
                  setProductsOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${linkColor} hover:text-[#DC2626] ${
                  pathname.startsWith("/applications") ? "text-[#DC2626]" : ""
                }`}
                aria-expanded={applicationsOpen}
                aria-haspopup="true"
              >
                Applications
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${applicationsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {applicationsOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {applications.map((a) => (
                    <Link
                      key={a.href}
                      href={a.href}
                      onClick={() => setApplicationsOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-[#1F1F1F] hover:bg-[#F5F1EB] hover:text-[#DC2626] transition-colors"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Blog */}
            <li>
              <Link
                href="/blog"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${linkColor} hover:text-[#DC2626] ${
                  isActive("/blog") ? "text-[#DC2626]" : ""
                }`}
              >
                Blog
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${linkColor} hover:text-[#DC2626] ${
                  isActive("/contact") ? "text-[#DC2626]" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact#sample"
              className="inline-flex items-center px-5 py-2 rounded-lg bg-[#DC2626] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors duration-200 shadow-sm"
            >
              Request Sample
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${linkColor} hover:text-[#DC2626]`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#1F1F1F] flex flex-col transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Link href="/" className="text-xl font-bold text-white font-[family-name:var(--font-inter)]">
            SurajWood
          </Link>
          <button
            className="p-2 text-white hover:text-[#DC2626] transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          <Link
            href="/"
            className={`block py-3 text-lg font-medium border-b border-white/10 transition-colors ${
              isActive("/") ? "text-[#DC2626]" : "text-white hover:text-[#DC2626]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block py-3 text-lg font-medium border-b border-white/10 transition-colors ${
              isActive("/about") ? "text-[#DC2626]" : "text-white hover:text-[#DC2626]"
            }`}
          >
            About
          </Link>

          {/* Mobile Products accordion */}
          <div className="border-b border-white/10">
            <button
              onClick={() => setMobileProductsOpen((v) => !v)}
              className="flex items-center justify-between w-full py-3 text-lg font-medium text-white hover:text-[#DC2626] transition-colors"
            >
              Products
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${mobilProductsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobilProductsOpen && (
              <div className="pb-2 pl-4 space-y-1">
                {products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="flex items-center gap-2 py-2 text-white/80 hover:text-[#DC2626] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" />
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className="text-xs text-white/50">— {p.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Applications accordion */}
          <div className="border-b border-white/10">
            <button
              onClick={() => setMobileApplicationsOpen((v) => !v)}
              className="flex items-center justify-between w-full py-3 text-lg font-medium text-white hover:text-[#DC2626] transition-colors"
            >
              Applications
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${mobileApplicationsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileApplicationsOpen && (
              <div className="pb-2 pl-4 space-y-1">
                {applications.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="flex items-center gap-2 py-2 text-white/80 hover:text-[#DC2626] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" />
                    <span className="text-sm font-medium">{a.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`block py-3 text-lg font-medium border-b border-white/10 transition-colors ${
              isActive("/blog") ? "text-[#DC2626]" : "text-white hover:text-[#DC2626]"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`block py-3 text-lg font-medium border-b border-white/10 transition-colors ${
              isActive("/contact") ? "text-[#DC2626]" : "text-white hover:text-[#DC2626]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile footer */}
        <div className="px-6 py-6 border-t border-white/10 space-y-4">
          <Link
            href="/contact#sample"
            className="block w-full text-center py-3 rounded-lg bg-[#DC2626] text-white font-semibold hover:bg-[#B91C1C] transition-colors"
          >
            Request Sample Kit
          </Link>
          <a
            href="tel:+919999995553"
            className="flex items-center justify-center gap-2 text-white/80 hover:text-[#DC2626] transition-colors text-sm"
          >
            <Phone size={16} />
            +91-9999995553
          </a>
        </div>
      </div>
    </>
  );
}
