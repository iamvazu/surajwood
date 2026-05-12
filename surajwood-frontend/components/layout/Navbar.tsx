"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Download,
  Users,
  Building2,
  FileText
} from "lucide-react";

// ─── Data Configurations ──────────────────────────────────────────────────

const acrylicProducts = [
  { name: "ACRYLUX", href: "/products/acrylux", desc: "Satin finish", color: "#C0392B" },
  { name: "ACRYSILK", href: "/products/acrysilk", desc: "Soft satin", color: "#D4A373" },
  { name: "ACRYMATTE", href: "/products/acrymatte", desc: "Matte finish", color: "#7F8C8D" },
  { name: "ACRYGLASS", href: "/products/acryglass", desc: "High gloss", color: "#3498DB" },
  { name: "ACRYGLASS MATTE", href: "/products/acryglass-matte", desc: "Matte glass", color: "#95A5A6" },
];

const hardwareProducts = [
  { name: "Aluminum profiles", sub: "AL-PROFHAN", href: "/products/aluminum-profiles", active: true },
  { name: "PetG panels", href: "#", active: false },
  { name: "Acrylic laminates", href: "#", active: false },
  { name: "PetG laminates", href: "#", active: false },
  { name: "Membrane shutters", href: "#", active: false },
];

const resourceLinks = [
  { name: "Downloads", href: "/downloads", icon: Download },
  { name: "Dealer enquiry", href: "/dealers", icon: Users },
  { name: "Factory tour", href: "/about#factory", icon: Building2 },
  { name: "Technical specs", href: "/products/acrylux#specs", icon: FileText },
];

const applications = [
  { name: "Kitchens", href: "/applications/kitchens" },
  { name: "Wardrobes", href: "/applications/wardrobes" },
  { name: "Commercial", href: "/applications/commercial" },
  { name: "Office Spaces", href: "/applications/offices" },
  { name: "Children's Rooms", href: "/applications/kids-rooms" },
  { name: "Wall Paneling", href: "/applications/wall-paneling" },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();

  // Scroll logic: hide top bar after 100px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setApplicationsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClasses = (href: string) => `
    flex items-center gap-1 text-[14px] transition-all duration-200
    ${isActive(href) ? "text-[#C0392B] font-medium" : "text-[#1F1F1F] font-normal hover:text-[#C0392B]"}
  `;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* ─── Top Utility Bar (Zone 0) ─── */}
      <div
        className={`bg-[#1F1F1F] text-white overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "h-0 opacity-0" : "h-10 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-[11px] tracking-wider uppercase font-medium">
          <div className="flex items-center gap-5">
            <a href="https://facebook.com/surajwoodproducts" className="hover:text-[#C0392B] transition-colors"><Facebook size={14} /></a>
            <a href="https://instagram.com/surajwood_" className="hover:text-[#C0392B] transition-colors"><Instagram size={14} /></a>
            <a href="https://linkedin.com/company/surajwood" className="hover:text-[#C0392B] transition-colors"><Linkedin size={14} /></a>
            <a href="https://youtube.com/@surajwoodproducts" className="hover:text-[#C0392B] transition-colors"><Youtube size={14} /></a>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+919999995553" className="flex items-center gap-2 hover:text-[#C0392B] transition-colors">
              <Phone size={13} /> +91-9999995553
            </a>
            <span className="opacity-20">|</span>
            <a href="mailto:sales@surajwood.com" className="hover:text-[#C0392B] transition-colors italic lowercase">
              sales@surajwood.com
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Bar ─── */}
      <header className="bg-white border-b border-gray-100 shadow-sm relative z-50">
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          
          {/* Zone 1: Logo (Left) */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="relative w-[180px] h-[48px]">
              <Image
                src="/images/logo/suraj-logo.png"
                alt="SurajWood Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Zone 2: Navigation Links (Center) */}
          <div className="hidden lg:flex flex-[2] justify-center">
            <ul className="flex items-center gap-8">
              <li><Link href="/" className={navLinkClasses("/")}>Home</Link></li>
              
              {/* Products Mega Menu Trigger */}
              <li 
                className="static"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className={navLinkClasses("/products")}>
                  Products ▾
                </button>

                {/* Mega Menu Content */}
                <div 
                  className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-200 ease-out ${
                    productsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 p-10">
                    {/* Column 1: Acrylic Panels */}
                    <div className="col-span-4">
                      <h3 className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-6">Acrylic Panels</h3>
                      <div className="space-y-4">
                        {acrylicProducts.map((p) => (
                          <Link key={p.name} href={p.href} className="group flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: p.color }} />
                            <div>
                              <p className="text-[14px] font-medium text-[#1F1F1F] group-hover:text-[#C0392B] transition-colors">{p.name}</p>
                              <p className="text-[11px] text-gray-400 group-hover:text-gray-500 transition-colors">{p.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Hardware & Coming Soon */}
                    <div className="col-span-4 pl-8 border-l border-gray-50">
                      <h3 className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-6">Hardware</h3>
                      <div className="space-y-6">
                        {/* Active Hardware */}
                        <Link href="/products/aluminum-profiles" className="group block">
                          <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1F1F1F]" />
                            <p className="text-[14px] font-medium text-[#1F1F1F] group-hover:text-[#C0392B] transition-colors">Aluminum profiles</p>
                            <span className="text-[11px] text-gray-400 uppercase tracking-tighter">AL-PROFHAN</span>
                          </div>
                        </Link>
                        
                        {/* Coming Soon */}
                        <div className="pt-4 border-t border-gray-50">
                          <h4 className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-4">Coming Soon</h4>
                          <div className="space-y-3 opacity-50 cursor-not-allowed">
                            {hardwareProducts.filter(h => !h.active).map(h => (
                              <div key={h.name} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                <p className="text-[13px] text-gray-400">{h.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="col-span-4 pl-12 border-l-[0.5px] border-gray-300">
                      <h3 className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-6">Resources</h3>
                      <div className="space-y-5">
                        {resourceLinks.map((r) => (
                          <Link key={r.name} href={r.href} className="group flex items-center gap-4 text-gray-600 hover:text-[#C0392B] transition-colors">
                            <r.icon size={18} className="text-gray-300 group-hover:text-[#C0392B] transition-colors" />
                            <span className="text-[14px] font-medium">{r.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Applications Dropdown */}
              <li 
                className="relative"
                onMouseEnter={() => setApplicationsOpen(true)}
                onMouseLeave={() => setApplicationsOpen(false)}
              >
                <button className={navLinkClasses("/applications")}>
                  Applications ▾
                </button>
                <div className={`absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl py-3 rounded-xl transition-all duration-200 ${
                  applicationsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}>
                  {applications.map((app) => (
                    <Link 
                      key={app.name} 
                      href={app.href} 
                      className="block px-6 py-2 text-[14px] text-gray-600 hover:text-[#C0392B] hover:bg-gray-50 transition-all"
                    >
                      {app.name}
                    </Link>
                  ))}
                </div>
              </li>

              <li><Link href="/about" className={navLinkClasses("/about")}>About</Link></li>
              <li><Link href="/blog" className={navLinkClasses("/blog")}>Blog</Link></li>
              <li><Link href="/contact" className={navLinkClasses("/contact")}>Contact</Link></li>
            </ul>
          </div>

          {/* Zone 3: CTA Button (Right) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <Link
              href="/contact#sample"
              className="inline-flex items-center justify-center bg-[#C0392B] text-white text-[13px] font-medium px-5 py-2.5 rounded-[8px] hover:bg-[#A93226] transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              Request Sample
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C0392B] transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Slide-in Drawer (Right) ─── */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-[300px] h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <p className="font-bold text-[#1F1F1F] uppercase tracking-widest text-xs">Menu</p>
            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-[#C0392B]"><X size={24} /></button>
          </div>

          <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-160px)]">
            <Link href="/" className="block py-3 text-[16px] font-medium border-b border-gray-50 text-[#1F1F1F]">Home</Link>
            
            {/* Mobile Products Accordion */}
            <div className="border-b border-gray-50">
              <button 
                className="flex items-center justify-between w-full py-3 text-[16px] font-medium text-[#1F1F1F]"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                Products <ChevronDown size={18} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="pl-4 pb-4 space-y-6 mt-2">
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Acrylic Panels</p>
                    {acrylicProducts.map(p => (
                      <Link key={p.name} href={p.href} className="flex items-center gap-3 py-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-[14px] text-gray-600">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Hardware</p>
                    <Link href="/products/aluminum-profiles" className="block text-[14px] text-gray-600">Aluminum profiles</Link>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Resources</p>
                    {resourceLinks.map(r => (
                      <Link key={r.name} href={r.href} className="flex items-center gap-3 text-[14px] text-gray-600">
                        <r.icon size={16} /> {r.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/applications" className="block py-3 text-[16px] font-medium border-b border-gray-50 text-[#1F1F1F]">Applications</Link>
            <Link href="/about" className="block py-3 text-[16px] font-medium border-b border-gray-50 text-[#1F1F1F]">About</Link>
            <Link href="/blog" className="block py-3 text-[16px] font-medium border-b border-gray-50 text-[#1F1F1F]">Blog</Link>
            <Link href="/contact" className="block py-3 text-[16px] font-medium border-b border-gray-50 text-[#1F1F1F]">Contact</Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-100 bg-gray-50">
            <Link href="/contact#sample" className="flex items-center justify-center w-full py-4 bg-[#C0392B] text-white font-bold rounded-xl shadow-lg">
              Request Sample Kit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
