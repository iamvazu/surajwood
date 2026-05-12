"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Download, FileText, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  type: string;
  image: string;
}

const DOWNLOADS: DownloadItem[] = [
  {
    id: "acrylux-shade-card",
    title: "ACRYLUX Shade Card 2026",
    description: "Complete collection of 50+ satin finishes, metallics, and wood grains.",
    fileSize: "4.2 MB",
    type: "PDF Catalog",
    image: "/images/products/acrylux/acrylux-solid-1.png",
  },
  {
    id: "al-profhan-catalog",
    title: "AL-PROFHAN Aluminum Profiles",
    description: "Technical specifications for Ottimo, Aerolinea, and Luminare series.",
    fileSize: "8.5 MB",
    type: "Technical Guide",
    image: "/images/banner/bg2.jpg",
  },
  {
    id: "installation-guide",
    title: "Panel Installation Guide",
    description: "Step-by-step instructions for factory-bonded panel application and cutting.",
    fileSize: "2.1 MB",
    type: "Manual",
    image: "/images/banner/bg1.jpg",
  },
  {
    id: "corporate-brochure",
    title: "SurajWood Corporate Brochure",
    description: "Overview of our manufacturing excellence and PUR bonding technology.",
    fileSize: "5.7 MB",
    type: "Brochure",
    image: "/images/banner/bg3.jpg",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DownloadsPage() {
  const [isGated, setIsGated] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    user_type: "Architect",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        setTimeout(() => {
          setIsGated(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-navy leading-tight">
            Design Resources & <span className="text-copper">Technical Specs</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Download our latest shade cards, technical catalogs, and installation guides. 
            Get all the technical data you need for your next premium project.
          </p>
        </div>

        {isGated ? (
          /* Gated Form */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-cream-dark">
            <div className="md:w-5/12 bg-navy p-10 text-white flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-bold text-2xl mb-4">Unlock Access</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Please provide your details to access our high-resolution catalogs and technical data sheets.
                </p>
                <div className="space-y-4">
                  {[
                    "Instant access to all PDFs",
                    "Latest 2026 Shade Cards",
                    "Technical CAD drawings",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-copper" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                  SurajWood Professional Network
                </p>
              </div>
            </div>

            <div className="md:w-7/12 p-10">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-navy mb-2">Access Granted</h3>
                  <p className="text-gray-500">Unlocking resources for you now...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="rahul@architect.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Company/Firm</label>
                    <input
                      type="text"
                      placeholder="e.g. RS Design Studio"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Professional Role</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors appearance-none cursor-pointer"
                      value={formData.user_type}
                      onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                    >
                      <option>Architect</option>
                      <option>Interior Designer</option>
                      <option>Homeowner</option>
                      <option>Dealer</option>
                      <option>OEM Manufacturer</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-copper hover:bg-copper-dark text-white font-heading font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-copper/20"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Unlock Downloads <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-4">
                    By clicking, you agree to receive technical updates from SurajWood.
                  </p>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* Resource List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {DOWNLOADS.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex border border-gray-100"
              >
                <div className="w-1/3 relative overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-navy shadow-lg">
                      <FileText size={24} />
                    </div>
                  </div>
                </div>
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase text-copper tracking-widest">{item.type}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{item.fileSize}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-navy mb-2 group-hover:text-copper transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <button className="mt-6 flex items-center gap-2 text-navy font-bold text-sm hover:text-copper transition-colors">
                    <Download size={18} className="animate-bounce" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
