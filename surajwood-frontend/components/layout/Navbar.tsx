"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X as CloseIcon, 
  ChevronDown, 
  Phone, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Download,
  Users,
  Building2,
  FileText,
  Twitter
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
  { name: "Membrane shutters", sub: "Continental 3D", href: "/products/membrane-shutters", active: true },
  { name: "PetG panels", href: "#", active: false },
  { name: "Acrylic laminates", href: "#", active: false },
  { name: "PetG laminates", href: "#", active: false },
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
    flex items-center gap-1 text-[16px] transition-all duration-200
    ${isActive(href) ? "text-[#C0392B] font-bold" : "text-[#1F1F1F] font-semibold hover:text-[#C0392B]"}
  `;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* ─── Top Utility Bar (Zone 0) ─── */}
      <div
        className={`bg-[#1F1F1F] text-white overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "h-0 opacity-0" : "h-11 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-[12px] tracking-wider uppercase font-medium">
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/surajwood" className="hover:text-[#C0392B] transition-colors"><Facebook size={15} /></a>
            <a href="https://instagram.com/surajwood_" className="hover:text-[#C0392B] transition-colors"><Instagram size={15} /></a>
            <a href="https://linkedin.com/company/surajwood" className="hover:text-[#C0392B] transition-colors"><Linkedin size={15} /></a>
            <a href="https://youtube.com/@surajwoodproducts" className="hover:text-[#C0392B] transition-colors"><Youtube size={15} /></a>
            <a href="https://x.com/surajwood_" className="hover:text-[#C0392B] transition-colors"><Twitter size={15} /></a>
          </div>
          <div className="flex items-center gap-8">
            <a href="tel:+919009171819" className="flex items-center gap-2 hover:text-[#C0392B] transition-colors">
              <Phone size={14} /> +91-9009171819
            </a>
            <span className="opacity-20">|</span>
            <a href="mailto:sales@surajwood.com" className="hover:text-[#C0392B] transition-colors not-italic lowercase">
              sales@surajwood.com
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Bar ─── */}
      <header className="bg-white border-b border-gray-100 shadow-sm relative z-50">
        <nav className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          
          {/* Zone 1: Logo (Left) */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="relative w-[190px] h-[52px]">
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
            <ul className="flex items-center gap-10">
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
                    productsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                  }`}
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 p-12">
                    {/* Column 1: Acrylic Panels */}
                    <div className="col-span-4 pr-12">
                      <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#1a365d] font-black mb-8 border-b border-gray-100 pb-3">Acrylic Panels</h3>
                      <div className="space-y-6">
                        {acrylicProducts.map((p) => (
                          <Link key={p.name} href={p.href} className="group flex items-center gap-4 transition-all duration-300">
                            <span className="w-2 h-2 rounded-full transition-all group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(192,57,43,0.3)]" style={{ backgroundColor: p.color }} />
                            <div>
                              <p className="text-[16px] font-bold text-[#1a365d] group-hover:text-[#C0392B] transition-colors">{p.name}</p>
                              <p className="text-[12px] text-gray-500 font-semibold">{p.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Hardware & Shutters */}
                    <div className="col-span-4 px-12 border-l border-gray-100">
                      <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#1a365d] font-black mb-8 border-b border-gray-100 pb-3">Hardware & Shutters</h3>
                      <div className="space-y-4">
                        {/* Active Products */}
                        {hardwareProducts.filter(h => h.active).map(h => (
                          <Link key={h.name} href={h.href} className="group block p-3.5 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#1a365d] group-hover:bg-[#C0392B] transition-colors" />
                              <div>
                                <p className="text-[16px] font-bold text-[#1a365d] group-hover:text-[#C0392B] transition-colors">{h.name}</p>
                                <span className="text-[11px] text-[#C0392B] font-black uppercase tracking-widest mt-0.5 block">{h.sub}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                        
                        {/* Coming Soon */}
                        <div className="pt-2">
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black mb-4">Coming Soon</h4>
                          <div className="grid grid-cols-1 gap-2.5 opacity-50 cursor-not-allowed">
                            {hardwareProducts.filter(h => !h.active).map(h => (
                              <div key={h.name} className="flex items-center gap-3 pl-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                <p className="text-[14px] text-gray-500 font-semibold">{h.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="col-span-4 pl-12 border-l border-gray-100">
                      <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#1a365d] font-black mb-8 border-b border-gray-100 pb-3">Resources</h3>
                      <div className="space-y-6">
                        {resourceLinks.map((r) => (
                          <Link key={r.name} href={r.href} className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-[#C0392B]/5 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#C0392B]/10 transition-colors shadow-sm">
                              <r.icon size={20} className="text-gray-400 group-hover:text-[#C0392B] transition-colors" />
                            </div>
                            <span className="text-[16px] font-bold text-[#1a365d] group-hover:text-[#C0392B] transition-colors">{r.name}</span>
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
                <div className={`absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-2xl py-4 rounded-2xl transition-all duration-300 ${
                  applicationsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                }`}>
                  {applications.map((app) => (
                    <Link 
                      key={app.name} 
                      href={app.href} 
                      className="block px-8 py-3 text-[16px] font-medium text-gray-700 hover:text-[#C0392B] hover:bg-gray-50 transition-all"
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
          <div className="flex-1 flex justify-end items-center gap-6">
            <Link
              href="/contact#sample"
              className="hidden sm:inline-flex items-center justify-center bg-[#C0392B] text-white text-[14px] font-bold px-6 py-3 rounded-[10px] hover:bg-[#A93226] transition-all duration-300 shadow-xl shadow-red-900/20 active:scale-95 whitespace-nowrap"
            >
              Request Sample
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C0392B] transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Slide-in Drawer (Right) ─── */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${
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
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <p className="font-black text-[#1F1F1F] uppercase tracking-[0.2em] text-sm">Main Menu</p>
            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-[#C0392B]"><CloseIcon size={28} /></button>
          </div>

          <div className="p-8 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
            <Link href="/" className="block py-4 text-[18px] font-bold border-b border-gray-50 text-[#1F1F1F]">Home</Link>
            
            {/* Mobile Products Accordion */}
            <div className="border-b border-gray-50">
              <button 
                className="flex items-center justify-between w-full py-4 text-[18px] font-bold text-[#1F1F1F]"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                Products <ChevronDown size={20} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="pl-4 pb-6 space-y-8 mt-4">
                  <div className="space-y-4">
                    <p className="text-[11px] uppercase font-black text-gray-400 tracking-[0.2em]">Acrylic Panels</p>
                    {acrylicProducts.map(p => (
                      <Link key={p.name} href={p.href} className="flex items-center gap-4 py-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-[16px] font-bold text-gray-700">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <p className="text-[11px] uppercase font-black text-gray-400 tracking-[0.2em]">Hardware & Shutters</p>
                    <Link href="/products/membrane-shutters" className="block text-[16px] font-bold text-gray-700">Membrane shutters (Continental 3D)</Link>
                    <Link href="/products/aluminum-profiles" className="block text-[16px] font-bold text-gray-700">Aluminum profiles (AL-PROFHAN)</Link>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[11px] uppercase font-black text-gray-400 tracking-[0.2em]">Resources</p>
                    {resourceLinks.map(r => (
                      <Link key={r.name} href={r.href} className="flex items-center gap-4 text-[16px] font-bold text-gray-700">
                        <r.icon size={18} className="text-gray-400" /> {r.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/applications" className="block py-4 text-[18px] font-bold border-b border-gray-50 text-[#1F1F1F]">Applications</Link>
            <Link href="/about" className="block py-4 text-[18px] font-bold border-b border-gray-50 text-[#1F1F1F]">About</Link>
            <Link href="/blog" className="block py-4 text-[18px] font-bold border-b border-gray-50 text-[#1F1F1F]">Blog</Link>
            <Link href="/contact" className="block py-4 text-[18px] font-bold border-b border-gray-50 text-[#1F1F1F]">Contact</Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 border-t border-gray-100 bg-gray-50">
            <Link href="/contact#sample" className="flex items-center justify-center w-full py-5 bg-[#C0392B] text-white font-black rounded-2xl shadow-xl shadow-red-900/20">
              Request Sample Kit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
