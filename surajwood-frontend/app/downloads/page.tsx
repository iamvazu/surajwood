"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText, CheckCircle2, Loader2, ArrowRight, Mail, MessageSquare, ExternalLink } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  type: string;
  image: string;
  fileUrl: string;
  fileName: string;
}

const DOWNLOADS: DownloadItem[] = [
  {
    id: "acrylux-shade-card",
    title: "ACRYLUX Shade Card & E-Book 2026",
    description: "Complete collection of 50+ satin finishes, metallics, high-gloss, and wood grains with PUR bonding specs.",
    fileSize: "4.8 MB",
    type: "PDF Catalog",
    image: "/images/products/acrylux/acrylux-solid-1.png",
    fileUrl: "/catalogs/acrylic_2025.pdf",
    fileName: "SurajWood_ACRYLUX_Catalog_2026.pdf",
  },
  {
    id: "al-profhan-catalog",
    title: "AL-PROFHAN Aluminum Profiles",
    description: "Technical specifications for Ottimo, Aerolinea, and Luminare series gola profiles and glass shutter frames.",
    fileSize: "2.2 MB",
    type: "Technical Guide",
    image: "/images/banner/bg2.jpg",
    fileUrl: "/catalogs/aluminium_2025.pdf",
    fileName: "SurajWood_Aluminum_Profiles_2026.pdf",
  },
  {
    id: "installation-guide",
    title: "Panel Installation & Tech Specs",
    description: "Step-by-step engineering instructions for factory-bonded panel application, PUR hot melt parameters, and cutting.",
    fileSize: "4.8 MB",
    type: "Technical Sheet",
    image: "/images/banner/bg1.jpg",
    fileUrl: "/downloads/ACRYLUX_Technical_Data_Sheet.pdf",
    fileName: "SurajWood_Technical_Data_Sheet.pdf",
  },
  {
    id: "corporate-brochure",
    title: "SurajWood Corporate E-Book",
    description: "Overview of manufacturing excellence, European flat-lamination technology, and ISO certifications.",
    fileSize: "4.8 MB",
    type: "Brochure",
    image: "/images/banner/bg3.jpg",
    fileUrl: "/catalogs/acrylic_2025.pdf",
    fileName: "SurajWood_Corporate_Brochure.pdf",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DownloadsPage() {
  const [isGated, setIsGated] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    user_type: "Architect",
  });

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    DOWNLOADS.forEach((item, index) => {
      setTimeout(() => {
        triggerDownload(item.fileUrl, item.fileName);
      }, index * 400);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const emailTarget = formData.email;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiry_type: "Resource Download",
          source_page: "Downloads Hub",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setSubmittedEmail(emailTarget);
        
        // Auto-download primary catalog
        setTimeout(() => {
          triggerDownload("/catalogs/acrylic_2025.pdf", "SurajWood_ACRYLUX_Catalog_2026.pdf");
          setIsGated(false);
        }, 1200);
      } else {
        // Still unlock resources even if backend had a transient error
        setIsSuccess(true);
        setSubmittedEmail(emailTarget);
        setTimeout(() => {
          triggerDownload("/catalogs/acrylic_2025.pdf", "SurajWood_ACRYLUX_Catalog_2026.pdf");
          setIsGated(false);
        }, 1200);
      }
    } catch (error) {
      console.error("Submission failed", error);
      // Fallback: unlock downloads for user
      setIsSuccess(true);
      setSubmittedEmail(emailTarget);
      setTimeout(() => {
        triggerDownload("/catalogs/acrylic_2025.pdf", "SurajWood_ACRYLUX_Catalog_2026.pdf");
        setIsGated(false);
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative text-white pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-800 mb-12">
        {/* Background Image with Ken Burns animation */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/banner/bg3.jpg"
              alt="SurajWood Technical Catalogs & Documentation"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Dual Gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/95 via-navy/85 to-navy/90" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/95 via-transparent to-navy/70" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Subtle Breadcrumb Navigation */}
          <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li className="text-white/80 font-medium" aria-current="page">
                Downloads
              </li>
            </ol>
          </nav>

          {/* Frosted Dark Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-4">
            <FileText className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] sm:text-xs uppercase font-bold">
              OFFICIAL TECHNICAL DOCUMENTATION
            </span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 drop-shadow-md">
            Design Resources &amp; <span className="text-copper-light font-extrabold">Technical Specs</span>
          </h1>

          <p className="text-gray-200 text-xs sm:text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            Download high-resolution 2026 shade cards, technical engineering folders, and PUR lamination manuals. 
            Everything you need to specify SurajWood in your residential and commercial projects.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">

        {isGated ? (
          /* Gated Form */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-5/12 bg-navy p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-copper/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="font-heading font-bold text-2xl mb-3">Unlock Instant Access</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Enter your details once to instantly download all PDFs and receive high-res copies directly to your inbox.
                </p>
                <div className="space-y-4">
                  {[
                    "Instant 1-Click PDF Downloads",
                    "Latest 2026 ACRYLUX Shade Card",
                    "AL-PROFHAN Aluminum Profiles Guide",
                    "Automated Copy Sent to Your Email",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-copper flex-shrink-0" />
                      <span className="text-sm text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 relative z-10">
                <p className="text-[11px] text-white/50 uppercase tracking-widest font-semibold">
                  SurajWood Architectural Support: <span className="text-copper">+91 9009171819</span>
                </p>
              </div>
            </div>

            <div className="md:w-7/12 p-8 sm:p-10">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50/50">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-navy mb-2">Access Granted!</h3>
                  <p className="text-gray-500 text-sm">
                    Starting your automatic download and unlocking all resources...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper focus:bg-white transition-all text-gray-800"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper focus:bg-white transition-all text-gray-800"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Work Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper focus:bg-white transition-all text-gray-800"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Company / Studio</label>
                      <input
                        type="text"
                        placeholder="e.g. RS Design Studio"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper focus:bg-white transition-all text-gray-800"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Professional Role *</label>
                      <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper focus:bg-white transition-all text-gray-800 cursor-pointer"
                        value={formData.user_type}
                        onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                      >
                        <option value="Architect">Architect</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="Homeowner">Homeowner</option>
                        <option value="Dealer">Dealer / Showroom</option>
                        <option value="OEM Manufacturer">OEM Manufacturer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-copper hover:bg-copper-dark text-white font-heading font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-copper/20 hover:shadow-xl hover:shadow-copper/30 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Verifying &amp; Unlocking...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock &amp; Download PDFs</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    We respect your privacy. Instant access with automated copy sent to your email.
                  </p>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* Unlocked Resource Hub */
          <div className="space-y-8 animate-fadeIn">
            {/* Confirmation Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Downloads Unlocked Successfully!
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {submittedEmail ? (
                      <>An automated email with all download links has also been dispatched to <strong className="text-navy">{submittedEmail}</strong> from <strong className="text-copper">bd@surajwood.com</strong>.</>
                    ) : (
                      <>Click below to download any catalog or technical specification PDF directly.</>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <button
                  onClick={handleDownloadAll}
                  className="px-5 py-3 bg-navy hover:bg-navy/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md"
                >
                  <Download size={16} />
                  Download All PDFs
                </button>
                <a
                  href="https://wa.me/919009171819?text=Hi%20SurajWood%2C%20I%20have%20downloaded%20the%20catalogs%20and%20would%20like%20to%20request%20physical%20samples."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare size={16} />
                  Request Physical Box
                </a>
              </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {DOWNLOADS.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row border border-gray-200 hover:border-copper/40"
                >
                  <a
                    href={item.fileUrl}
                    download={item.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-2/5 relative h-48 sm:h-auto overflow-hidden bg-gray-100 block group/img"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105 opacity-80 group-hover/img:opacity-100"
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover/img:bg-transparent transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-navy shadow-lg group-hover/img:bg-copper group-hover/img:text-white transition-all">
                        <FileText size={22} />
                      </div>
                    </div>
                  </a>

                  <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase text-copper tracking-widest bg-copper/10 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                          {item.fileSize}
                        </span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-lg text-navy mb-2 group-hover:text-copper transition-colors">
                        <a href={item.fileUrl} download={item.fileName} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h3>
                      
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-gray-100 flex items-center gap-3">
                      <a
                        href={item.fileUrl}
                        download={item.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-navy hover:bg-copper text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Download size={14} className="group-hover:animate-bounce" />
                        <span>Download PDF</span>
                      </a>
                      
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in new tab"
                        className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs transition-colors flex items-center justify-center"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Support Callout */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center max-w-2xl mx-auto shadow-sm">
              <Mail className="mx-auto text-copper mb-3" size={28} />
              <h4 className="font-heading font-bold text-lg text-navy mb-1">
                Need Custom Color Matching or OEM Bulk Specifications?
              </h4>
              <p className="text-gray-500 text-sm mb-4">
                Our technical team is available to help with project drawings, custom shade formulations, and testing certificates.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm font-semibold text-navy">
                <a href="mailto:bd@surajwood.com" className="text-copper hover:underline">
                  bd@surajwood.com
                </a>
                <span>•</span>
                <a href="tel:+919009171819" className="text-navy hover:text-copper">
                  +91 9009171819
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
