"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Package, X, Check } from "lucide-react";

interface ShadeSample {
  id: string;
  name: string;
  finish: string;
  colorClass: string;
}

const POPULAR_SHADES: ShadeSample[] = [
  { id: "arctic-white", name: "Arctic White", finish: "ACRYLUX High-Gloss", colorClass: "bg-white border border-gray-300" },
  { id: "sage-green", name: "Sage Green", finish: "ACRYMATTE Nano-Matte", colorClass: "bg-[#7A8B7B]" },
  { id: "champagne", name: "Champagne Gold", finish: "ACRYLUX Metallic", colorClass: "bg-[#D4AF37]" },
  { id: "midnight-navy", name: "Midnight Navy", finish: "ACRYLUX High-Gloss", colorClass: "bg-[#1B2A4A]" },
  { id: "charcoal-matte", name: "Charcoal Slate", finish: "ACRYMATTE Nano-Matte", colorClass: "bg-[#2C302E]" },
  { id: "rose-gold", name: "Rose Gold", finish: "ACRYLUX Metallic", colorClass: "bg-[#B76E79]" },
];

const DISMISSAL_KEY = "surajwood_sample_drawer_dismissed_v1";

export default function SampleDrawer() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedShades, setSelectedShades] = useState<string[]>([
    "arctic-white",
    "sage-green",
    "champagne",
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if dismissed within last 7 days
    try {
      const dismissedUntil = localStorage.getItem(DISMISSAL_KEY);
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
        return; // Suppressed
      }
    } catch {
      // Storage unavailable
    }

    let hasTriggered = false;

    const triggerDrawer = () => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
      }
    };

    // 1. Desktop Exit-Intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        triggerDrawer();
      }
    };

    // 2. Mobile Scroll-Depth Trigger (at 60% scroll)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = window.scrollY / scrollHeight;
        if (scrolled >= 0.6) {
          triggerDrawer();
        }
      }
    };

    // Delay listeners slightly so it doesn't trigger on immediate initial page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      // Suppress for 7 days
      const sevenDays = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISSAL_KEY, sevenDays.toString());
    } catch {
      // Storage unavailable
    }
  };

  const toggleShade = (id: string) => {
    if (selectedShades.includes(id)) {
      if (selectedShades.length > 1) {
        setSelectedShades(selectedShades.filter((s) => s !== id));
      }
    } else {
      if (selectedShades.length < 3) {
        setSelectedShades([...selectedShades, id]);
      } else {
        // Replace oldest
        setSelectedShades([...selectedShades.slice(1), id]);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const shadeNames = selectedShades
      .map((id) => POPULAR_SHADES.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const leadPayload = {
      name,
      phone,
      city,
      inquiryType: "Smart Sample Drawer Dispatch",
      message: `FREE 3-SWATCH DISPATCH REQUEST:
Recipient: ${name}
Phone: ${phone}
City: ${city}
Selected Swatches: ${shadeNames}`,
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
      setIsSubmitted(true);
      // Suppress for 30 days after successful submission
      localStorage.setItem(DISMISSAL_KEY, (Date.now() + 30 * 24 * 60 * 60 * 1000).toString());
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-full animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-[#141618]/95 backdrop-blur-2xl border border-copper/40 rounded-3xl shadow-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-copper/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close Sample Box Drawer"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3 pr-6">
              <div className="w-10 h-10 rounded-xl bg-copper/10 border border-copper/30 text-copper flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-copper uppercase tracking-wider block mb-0.5">
                  EXCLUSIVE ARCHITECT &amp; OWNER OFFER
                </span>
                <h3 className="font-heading font-bold text-base text-white leading-tight">
                  Get 3 Free Acrylic Swatches Delivered in 48 Hours
                </h3>
              </div>
            </div>

            {/* Step 1: Pick 3 Shades */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Select up to 3 shades to touch &amp; feel:</span>
                <span className="text-copper font-bold">{selectedShades.length}/3 Selected</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {POPULAR_SHADES.map((shade) => {
                  const isSelected = selectedShades.includes(shade.id);
                  return (
                    <button
                      key={shade.id}
                      type="button"
                      onClick={() => toggleShade(shade.id)}
                      className={`p-2 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "border-copper bg-copper/10 ring-1 ring-copper"
                          : "border-gray-800 bg-gray-900/60 hover:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-3 h-3 rounded-full ${shade.colorClass} shrink-0`} />
                        <span className="text-[11px] font-bold text-white truncate">{shade.name}</span>
                      </div>
                      <span className="text-[9px] text-gray-400 block truncate">{shade.finish}</span>
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-copper text-white flex items-center justify-center text-[9px] font-bold shadow-sm">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
              <input
                type="text"
                required
                placeholder="Your Name / Studio Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-gray-700 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-copper"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-gray-700 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                />
                <input
                  type="text"
                  required
                  placeholder="City (e.g. Delhi NCR)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-gray-700 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-copper to-[#B91C1C] hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-copper/20 transition-all flex items-center justify-center gap-1.5 mt-1"
              >
                {isSubmitting ? "Queueing Dispatch..." : "Dispatch Free Sample Swatches →"}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 pt-1">
                <span>🚚 Pan-India Bluedart Courier</span>
                <span>•</span>
                <span>100% Free / No Obligation</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">Sample Kit Dispatch Confirmed!</h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Thank you, <strong>{name}</strong>! Your 3 selected acrylic swatches are queued for express dispatch to <strong>{city}</strong>. We will WhatsApp the courier tracking link to <strong>{phone}</strong>.
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
