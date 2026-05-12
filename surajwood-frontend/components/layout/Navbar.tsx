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
    flex items-center gap-1 text-[18px] transition-all duration-200
    ${isActive(href) ? "text-[#C0392B] font-black" : "text-[#1F1F1F] font-bold hover:text-[#C0392B]"}
  `;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* ─── Top Utility Bar (Zone 0) ─── */}
      <div
        className={`bg-[#1F1F1F] text-white overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "h-0 opacity-0" : "h-11 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-[13px] tracking-wider uppercase font-medium">
          <div className="flex items-center gap-7">
            <a href="https://facebook.com/surajwoodproducts" className="hover:text-[#C0392B] transition-colors"><Facebook size={16} /></a>
            <a href="https://instagram.com/surajwood_" className="hover:text-[#C0392B] transition-colors"><Instagram size={16} /></a>
            <a href="https://linkedin.com/company/surajwood" className="hover:text-[#C0392B] transition-colors"><Linkedin size={16} /></a>
            <a href="https://youtube.com/@surajwoodproducts" className="hover:text-[#C0392B] transition-colors"><Youtube size={16} /></a>
          </div>
          <div className="flex items-center gap-9">
            <a href="tel:+919999995553" className="flex items-center gap-2 hover:text-[#C0392B] transition-colors">
              <Phone size={15} /> +91-9999995553
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
        <nav className="max-w-7xl mx-auto px-6 h-[88px] flex items-center justify-between">
          
          {/* Zone 1: Logo (Left) */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="relative w-[220px] h-[60px]">
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
          <div className="hidden lg:flex flex-[3] justify-center">
            <ul className="flex items-center gap-14">
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
                  className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 ease-out ${
                    productsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-6"
                  }`}
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 p-16">
                    {/* Column 1: Acrylic Panels */}
                    <div className="col-span-4 pr-14">
                      <h3 className="text-[15px] uppercase tracking-[0.25em] text-[#1a365d] font-black mb-10 border-b-2 border-[#C0392B]/20 pb-4">Acrylic Panels</h3>
                      <div className="space-y-8">
                        {acrylicProducts.map((p) => (
                          <Link key={p.name} href={p.href} className="group flex items-center gap-5 transition-all duration-300">
                            <span className="w-2.5 h-2.5 rounded-full transition-all group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(192,57,43,0.4)]" style={{ backgroundColor: p.color }} />
                            <div>
                              <p className="text-[19px] font-black text-[#1a365d] group-hover:text-[#C0392B] transition-colors">{p.name}</p>
                              <p className="text-[14px] text-gray-500 font-bold tracking-tight">{p.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Hardware & Coming Soon */}
                    <div className="col-span-4 px-14 border-l border-gray-100">
                      <h3 className="text-[15px] uppercase tracking-[0.25em] text-[#1a365d] font-black mb-10 border-b-2 border-[#C0392B]/20 pb-4">Hardware</h3>
                      <div className="space-y-10">
                        {/* Active Hardware */}
                        <Link href="/products/aluminum-profiles" className="group block p-6 rounded-3xl hover:bg-gray-50 transition-all border-2 border-transparent hover:border-gray-100 shadow-sm hover:shadow-md">
                          <div className="flex items-center gap-5">
                            <span className="w-3 h-3 rounded-full bg-[#1a365d] group-hover:bg-[#C0392B] transition-colors" />
                            <div>
                              <p className="text-[20px] font-black text-[#1a365d] group-hover:text-[#C0392B] transition-colors">Aluminum profiles</p>
                              <span className="text-[13px] text-[#C0392B] font-black uppercase tracking-widest mt-1 block">AL-PROFHAN Series</span>
                            </div>
                          </div>
                        </Link>
                        
                        {/* Coming Soon */}
                        <div className="pt-2">
                          <h4 className="text-[14px] uppercase tracking-[0.2em] text-gray-400 font-black mb-8 pl-2">Coming Soon</h4>
                          <div className="grid grid-cols-1 gap-5 opacity-40 cursor-not-allowed">
                            {hardwareProducts.filter(h => !h.active).map(h => (
                              <div key={h.name} className="flex items-center gap-4 pl-6">
                                <span className="w-2 h-2 rounded-full bg-gray-300" />
                                <p className="text-[17px] text-gray-500 font-bold">{h.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="col-span-4 pl-14 border-l-2 border-gray-100">
                      <h3 className="text-[15px] uppercase tracking-[0.25em] text-[#1a365d] font-black mb-10 border-b-2 border-[#C0392B]/20 pb-4">Resources</h3>
                      <div className="space-y-8">
                        {resourceLinks.map((r) => (
                          <Link key={r.name} href={r.href} className="group flex items-center gap-6 p-5 rounded-3xl hover:bg-[#C0392B]/5 transition-all border-2 border-transparent hover:border-[#C0392B]/10">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#C0392B]/10 transition-colors shadow-sm">
                              <r.icon size={24} className="text-gray-400 group-hover:text-[#C0392B] transition-colors" />
                            </div>
                            <span className="text-[18px] font-black text-[#1a365d] group-hover:text-[#C0392B] transition-colors">{r.name}</span>
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
                <div className={`absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl py-6 rounded-3xl transition-all duration-300 ${
                  applicationsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-6"
                }`}>
                  {applications.map((app) => (
                    <Link 
                      key={app.name} 
                      href={app.href} 
                      className="block px-10 py-4 text-[18px] font-bold text-gray-700 hover:text-[#C0392B] hover:bg-gray-50 transition-all"
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
          <div className="flex-1 flex justify-end items-center gap-8">
            <Link
              href="/contact#sample"
              className="hidden sm:inline-flex items-center justify-center bg-[#C0392B] text-white text-[16px] font-black px-8 py-4 rounded-[12px] hover:bg-[#A93226] transition-all duration-300 shadow-2xl shadow-red-900/30 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              Request Sample
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C0392B] transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={32} />
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Slide-in Drawer (Right) ─── */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[100] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-[340px] h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-10 border-b border-gray-100">
            <p className="font-black text-[#1F1F1F] uppercase tracking-[0.25em] text-sm">Main Menu</p>
            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-[#C0392B]"><X size={32} /></button>
          </div>

          <div className="p-10 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <Link href="/" className="block py-4 text-[20px] font-black border-b border-gray-50 text-[#1F1F1F]">Home</Link>
            
            {/* Mobile Products Accordion */}
            <div className="border-b border-gray-50">
              <button 
                className="flex items-center justify-between w-full py-4 text-[20px] font-black text-[#1F1F1F]"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                Products <ChevronDown size={24} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="pl-6 pb-8 space-y-10 mt-6">
                  <div className="space-y-5">
                    <p className="text-[12px] uppercase font-black text-gray-400 tracking-[0.2em]">Acrylic Panels</p>
                    {acrylicProducts.map(p => (
                      <Link key={p.name} href={p.href} className="flex items-center gap-5 py-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-[18px] font-bold text-gray-700">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-5">
                    <p className="text-[12px] uppercase font-black text-gray-400 tracking-[0.2em]">Hardware</p>
                    <Link href="/products/aluminum-profiles" className="block text-[18px] font-bold text-gray-700">Aluminum profiles</Link>
                  </div>
                  <div className="space-y-5">
                    <p className="text-[12px] uppercase font-black text-gray-400 tracking-[0.2em]">Resources</p>
                    {resourceLinks.map(r => (
                      <Link key={r.name} href={r.href} className="flex items-center gap-5 text-[18px] font-bold text-gray-700">
                        <r.icon size={22} className="text-gray-400" /> {r.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/applications" className="block py-4 text-[20px] font-black border-b border-gray-50 text-[#1F1F1F]">Applications</Link>
            <Link href="/about" className="block py-4 text-[20px] font-black border-b border-gray-50 text-[#1F1F1F]">About</Link>
            <Link href="/blog" className="block py-4 text-[20px] font-black border-b border-gray-50 text-[#1F1F1F]">Blog</Link>
            <Link href="/contact" className="block py-4 text-[20px] font-black border-b border-gray-50 text-[#1F1F1F]">Contact</Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-10 border-t border-gray-100 bg-gray-50">
            <Link href="/contact#sample" className="flex items-center justify-center w-full py-6 bg-[#C0392B] text-white font-black rounded-2xl shadow-2xl shadow-red-900/30">
              Request Sample Kit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
