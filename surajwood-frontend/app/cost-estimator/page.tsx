"use client";

import { useState, useMemo, type FormEvent } from "react";
import Link from "next/link";
import { 
  Calculator, 
  TrendingDown,
  Send,
  Check
} from "lucide-react";

// --- Types & Data ---

type ApplicationType = "kitchen" | "wardrobe" | "wall-panel";

interface KitchenLayout {
  id: string;
  name: string;
  description: string;
  defaultLength: number; // in running feet
  multiplier: number; // surface area multiplier
  icon: string;
}

const KITCHEN_LAYOUTS: KitchenLayout[] = [
  { id: "l-shape", name: "L-Shaped Kitchen", description: "Corner layout with 2 adjoining countertop runs", defaultLength: 18, multiplier: 2.2, icon: "📐" },
  { id: "parallel", name: "Parallel / Galley", description: "Two parallel working counter runs facing each other", defaultLength: 20, multiplier: 2.3, icon: "🪜" },
  { id: "u-shape", name: "U-Shaped Kitchen", description: "3 continuous walls maximizing storage & prep space", defaultLength: 26, multiplier: 2.4, icon: "🔲" },
  { id: "straight", name: "Straight / Single-Wall", description: "Linear kitchen ideal for compact modern apartments", defaultLength: 12, multiplier: 2.0, icon: "📏" },
  { id: "island", name: "Kitchen with Island", description: "Main cooking counters + freestanding luxury island", defaultLength: 28, multiplier: 2.6, icon: "🏝️" },
];

interface WardrobeLayout {
  id: string;
  name: string;
  description: string;
  defaultWidth: number; // in feet
  defaultHeight: number; // in feet
  multiplier: number;
  icon: string;
}

const WARDROBE_LAYOUTS: WardrobeLayout[] = [
  { id: "3-door", name: "3-Door Hinged Wardrobe", description: "Classic 6 ft wide wardrobe with overhead lofts", defaultWidth: 6, defaultHeight: 8, multiplier: 1.0, icon: "🚪" },
  { id: "4-door", name: "4-Door Master Wardrobe", description: "Spacious 8 ft wide bedroom wardrobe with lofts", defaultWidth: 8, defaultHeight: 8, multiplier: 1.0, icon: "🚪🚪" },
  { id: "sliding", name: "2-Track Sliding Wardrobe", description: "Contemporary space-saving sliding shutter system", defaultWidth: 7, defaultHeight: 8, multiplier: 1.05, icon: "↔️" },
  { id: "walk-in", name: "Luxury Walk-In Closet", description: "Expansive multi-bay wardrobe with glass/acrylic doors", defaultWidth: 14, defaultHeight: 9, multiplier: 1.15, icon: "✨" },
];

interface FinishOption {
  id: string;
  name: string;
  tagline: string;
  ratePerSqFt: number; // Indicative manufactured panel rate in INR
  sheetRate: number; // 8x4 ft sheet indicative rate
  scratchRating: string;
  luster: string;
  color: string;
}

const FINISH_OPTIONS: FinishOption[] = [
  { id: "acrylux", name: "ACRYLUX High-Gloss", tagline: "92+ GU Optical Mirror Polish (1.5mm PMMA)", ratePerSqFt: 295, sheetRate: 9440, scratchRating: "3H Hardcoat", luster: "High Gloss", color: "from-amber-500 to-red-600" },
  { id: "acrymatte", name: "ACRYMATTE Nano-Matte", tagline: "Anti-Fingerprint Thermal Healing Soft-Touch", ratePerSqFt: 315, sheetRate: 10080, scratchRating: "3H Anti-Scratch", luster: "Super Matte", color: "from-emerald-600 to-teal-800" },
  { id: "acryglass", name: "ACRYGLASS 2mm Glass", tagline: "European Crystal Glass Look with Chamfered Edges", ratePerSqFt: 385, sheetRate: 12320, scratchRating: "4H Crystal", luster: "Glass Effect", color: "from-blue-600 to-indigo-900" },
  { id: "acrysilk", name: "ACRYSILK Satin-Matte", tagline: "Zero-Glare Silk Satin Texture for Premium Interiors", ratePerSqFt: 285, sheetRate: 9120, scratchRating: "2.5H Satin", luster: "Satin Matte", color: "from-rose-500 to-amber-700" },
  { id: "membrane", name: "SurajWood Membrane", tagline: "3D Seamless Wrapped Thermo-Foil Shutters", ratePerSqFt: 240, sheetRate: 7680, scratchRating: "Seamless 3D", luster: "Embossed", color: "from-purple-600 to-navy" },
];

export default function CostEstimatorPage() {
  // --- States ---
  const [appType, setAppType] = useState<ApplicationType>("kitchen");
  const [selectedKitchenLayout, setSelectedKitchenLayout] = useState(KITCHEN_LAYOUTS[0]);
  const [selectedWardrobeLayout, setSelectedWardrobeLayout] = useState(WARDROBE_LAYOUTS[0]);
  
  // Kitchen inputs
  const [runningFeet, setRunningFeet] = useState(18);
  const [hasLoft, setHasLoft] = useState(true);
  
  // Wardrobe inputs
  const [wardrobeWidth, setWardrobeWidth] = useState(8);
  const [wardrobeHeight, setWardrobeHeight] = useState(8);

  // Wall panel inputs
  const [panelWidth, setPanelWidth] = useState(12);
  const [panelHeight, setPanelHeight] = useState(9);

  // Selected Finish
  const [selectedFinish, setSelectedFinish] = useState(FINISH_OPTIONS[0]);
  const [substrate, setSubstrate] = useState<"hdmr" | "plywood">("hdmr");

  // Lead Form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    userType: "Architect / Interior Designer",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Calculations ---
  const calculation = useMemo(() => {
    let totalSqFt = 0;

    if (appType === "kitchen") {
      // Base calculation: running feet * height factor + loft
      const baseArea = runningFeet * selectedKitchenLayout.multiplier;
      const loftArea = hasLoft ? runningFeet * 1.2 : 0;
      totalSqFt = Math.round(baseArea + loftArea);
    } else if (appType === "wardrobe") {
      totalSqFt = Math.round(wardrobeWidth * wardrobeHeight * selectedWardrobeLayout.multiplier);
    } else {
      totalSqFt = Math.round(panelWidth * panelHeight);
    }

    // Standard sheet is 8x4 ft = 32 sq.ft.
    // Adding 10% wastage/cutting allowance
    const effectiveSqFt = totalSqFt * 1.1;
    const sheetsNeeded = Math.ceil(effectiveSqFt / 32);

    // Costs
    const substrateAddonPerSqFt = substrate === "hdmr" ? 65 : 85;
    const surajWoodMaterialCost = Math.round(totalSqFt * (selectedFinish.ratePerSqFt + substrateAddonPerSqFt));
    const surajWoodFabricatedCost = Math.round(surajWoodMaterialCost * 1.35); // with factory PUR edge banding & hardware prep

    // Benchmark Comparisons
    const standardLaminateCost = Math.round(totalSqFt * (165 + substrateAddonPerSqFt) * 1.35);
    const puPaintCost = Math.round(totalSqFt * (420 + substrateAddonPerSqFt) * 1.35);

    // Edge banding length (meters)
    const edgeBandingMeters = Math.round(totalSqFt * 1.4);

    return {
      totalSqFt,
      sheetsNeeded,
      edgeBandingMeters,
      surajWoodMaterialCost,
      surajWoodFabricatedCost,
      standardLaminateCost,
      puPaintCost,
      savingsVsPUPaint: puPaintCost - surajWoodFabricatedCost,
    };
  }, [appType, selectedKitchenLayout, selectedWardrobeLayout, runningFeet, hasLoft, wardrobeWidth, wardrobeHeight, panelWidth, panelHeight, selectedFinish, substrate]);

  // Handle Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadPayload = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      inquiryType: "Cost Estimator Cut-List",
      message: `ESTIMATE SUMMARY:
Application: ${appType.toUpperCase()}
Total Sq Ft: ${calculation.totalSqFt} sq.ft.
Sheets Required: ${calculation.sheetsNeeded} Sheets (8x4 ft)
Finish: ${selectedFinish.name}
Substrate: ${substrate.toUpperCase()}
Estimated Cost: ₹${calculation.surajWoodFabricatedCost.toLocaleString("en-IN")}
User Type: ${formData.userType}`,
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
      setIsSubmitted(true);
    } catch {
      // Fallback success state
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi SurajWood Team, I just calculated an estimate on your website:
• Project: ${appType.toUpperCase()} (${calculation.totalSqFt} sq.ft.)
• Sheets: ${calculation.sheetsNeeded} sheets of ${selectedFinish.name}
• Substrate: ${substrate.toUpperCase()}
• Estimated Cost: ₹${calculation.surajWoodFabricatedCost.toLocaleString("en-IN")}
Please share the official trade price list and sample box for ${formData.city || "my city"}.`
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-navy">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#111315] via-[#1a1c1e] to-[#111315] text-white pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* Frosted Dark Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-6">
            <Calculator className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold">
              INSTANT MATERIAL &amp; COST ESTIMATOR 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
            Acrylic Sheet &amp; Shutter <span className="text-copper">Cost Calculator</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Calculate exact 8x4 ft sheet requirements, square footage, and compare factory-direct SurajWood acrylic costs against standard 1mm laminates &amp; PU paint in real time.
          </p>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN — Configurator (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Application Selector */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-copper text-white font-bold text-xs">1</span>
                  <h2 className="font-heading font-bold text-lg text-navy">Select Application Type</h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setAppType("kitchen")}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      appType === "kitchen"
                        ? "border-copper bg-copper/5 shadow-md shadow-copper/10 font-bold text-copper"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                    }`}
                  >
                    <span className="text-2xl block mb-1">🍳</span>
                    <span className="text-xs sm:text-sm">Modular Kitchen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppType("wardrobe")}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      appType === "wardrobe"
                        ? "border-copper bg-copper/5 shadow-md shadow-copper/10 font-bold text-copper"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                    }`}
                  >
                    <span className="text-2xl block mb-1">🚪</span>
                    <span className="text-xs sm:text-sm">Wardrobe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppType("wall-panel")}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      appType === "wall-panel"
                        ? "border-copper bg-copper/5 shadow-md shadow-copper/10 font-bold text-copper"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                    }`}
                  >
                    <span className="text-2xl block mb-1">🏛️</span>
                    <span className="text-xs sm:text-sm">Wall Paneling</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Dimensions & Layout */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-copper text-white font-bold text-xs">2</span>
                  <h2 className="font-heading font-bold text-lg text-navy">Layout &amp; Dimensions</h2>
                </div>

                {appType === "kitchen" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Kitchen Layout Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {KITCHEN_LAYOUTS.map((layout) => (
                          <button
                            key={layout.id}
                            type="button"
                            onClick={() => {
                              setSelectedKitchenLayout(layout);
                              setRunningFeet(layout.defaultLength);
                            }}
                            className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                              selectedKitchenLayout.id === layout.id
                                ? "border-copper bg-copper/5 text-navy font-semibold"
                                : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                            }`}
                          >
                            <span className="text-xl">{layout.icon}</span>
                            <div>
                              <p className="text-xs font-bold text-navy">{layout.name}</p>
                              <p className="text-[11px] text-gray-500 leading-tight">{layout.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Running Feet Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Total Counter Length (Running Feet)
                        </label>
                        <span className="px-2.5 py-0.5 rounded-lg bg-navy text-white text-xs font-bold">
                          {runningFeet} Feet
                        </span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="45"
                        value={runningFeet}
                        onChange={(e) => setRunningFeet(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-copper"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                        <span>8 ft (Compact)</span>
                        <span>25 ft (Standard)</span>
                        <span>45 ft (Villa / Large)</span>
                      </div>
                    </div>

                    {/* Loft Checkbox */}
                    <label className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasLoft}
                        onChange={(e) => setHasLoft(e.target.checked)}
                        className="w-4 h-4 rounded text-copper focus:ring-copper"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-navy">Include Overhead Lofts (Ceiling Height Storage)</span>
                        <p className="text-gray-500 text-[11px]">Adds ~25% surface area for full-height shutter cladding</p>
                      </div>
                    </label>
                  </div>
                )}

                {appType === "wardrobe" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Wardrobe Shutter Style
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {WARDROBE_LAYOUTS.map((layout) => (
                          <button
                            key={layout.id}
                            type="button"
                            onClick={() => {
                              setSelectedWardrobeLayout(layout);
                              setWardrobeWidth(layout.defaultWidth);
                              setWardrobeHeight(layout.defaultHeight);
                            }}
                            className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                              selectedWardrobeLayout.id === layout.id
                                ? "border-copper bg-copper/5 text-navy font-semibold"
                                : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                            }`}
                          >
                            <span className="text-lg">{layout.icon}</span>
                            <div>
                              <p className="text-xs font-bold text-navy">{layout.name}</p>
                              <p className="text-[11px] text-gray-500 leading-tight">{layout.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Width (Feet)</label>
                        <input
                          type="number"
                          min="4"
                          max="24"
                          value={wardrobeWidth}
                          onChange={(e) => setWardrobeWidth(Math.max(4, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Height (Feet)</label>
                        <input
                          type="number"
                          min="6"
                          max="11"
                          value={wardrobeHeight}
                          onChange={(e) => setWardrobeHeight(Math.max(6, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {appType === "wall-panel" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Wall Width (Feet)</label>
                        <input
                          type="number"
                          min="4"
                          max="50"
                          value={panelWidth}
                          onChange={(e) => setPanelWidth(Math.max(4, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Wall Height (Feet)</label>
                        <input
                          type="number"
                          min="6"
                          max="20"
                          value={panelHeight}
                          onChange={(e) => setPanelHeight(Math.max(6, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Finish & Substrate */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-copper text-white font-bold text-xs">3</span>
                  <h2 className="font-heading font-bold text-lg text-navy">SurajWood Finish &amp; Substrate</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Select Surface Collection
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FINISH_OPTIONS.map((finish) => (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          selectedFinish.id === finish.id
                            ? "border-copper bg-copper/5 ring-1 ring-copper shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-navy">{finish.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {finish.scratchRating}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-tight mb-2">{finish.tagline}</p>
                        <p className="text-xs font-bold text-copper">₹{finish.ratePerSqFt}/sq.ft. panel</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Core Substrate Pairing (European Reactive PUR Lamination)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSubstrate("hdmr")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        substrate === "hdmr"
                          ? "border-copper bg-copper/5 font-bold text-navy"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">Action TESA E1 HDMR</p>
                      <p className="text-[10px] text-gray-500">High Density Moisture Resistant (Recommended)</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubstrate("plywood")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        substrate === "plywood"
                          ? "border-copper bg-copper/5 font-bold text-navy"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">Calibrated BWP Plywood</p>
                      <p className="text-[10px] text-gray-500">Boiling Waterproof Marine Grade Core</p>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN — Live Estimate Output & Lead Gate (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              
              {/* Live Calculation Card */}
              <div className="bg-gradient-to-b from-navy via-[#1f2328] to-navy text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-copper/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-gray-700/80 mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-copper">ESTIMATE BREAKDOWN</span>
                    <h3 className="font-heading font-bold text-xl text-white">Project Calculation</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-copper font-bold">
                    8x4 ft Sheets
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-gray-400 block mb-0.5">Total Surface Area</span>
                    <span className="text-2xl font-heading font-bold text-white">{calculation.totalSqFt}</span>
                    <span className="text-xs text-gray-400 ml-1">sq.ft.</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-gray-400 block mb-0.5">Standard Sheets Needed</span>
                    <span className="text-2xl font-heading font-bold text-copper">{calculation.sheetsNeeded}</span>
                    <span className="text-xs text-gray-400 ml-1">Sheets (8x4)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Zero-Joint PUR Edge Banding:</span>
                    <span className="font-bold text-white">~{calculation.edgeBandingMeters} Running Meters</span>
                  </div>
                </div>

                {/* Price Output */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-copper/20 to-red-900/30 border border-copper/40 mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-semibold text-gray-300">Estimated Project Range:</span>
                    <span className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                      ₹{calculation.surajWoodFabricatedCost.toLocaleString("en-IN")}*
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    *Indicative fabricated shutter budget including {selectedFinish.name} + {substrate.toUpperCase()} substrate with European PUR zero-joint edge banding.
                  </p>
                </div>

                {/* Material Comparison Benchmark */}
                <div className="space-y-2 mb-6 text-xs border-t border-gray-700/80 pt-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Market Cost Comparison Benchmark
                  </span>
                  
                  <div className="flex justify-between items-center text-gray-300">
                    <span>1mm Standard Laminate (Merino/Royale Touche):</span>
                    <span className="font-mono text-gray-400">₹{calculation.standardLaminateCost.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-white font-bold bg-white/5 p-2 rounded-lg border border-copper/30">
                    <span className="text-copper">SurajWood {selectedFinish.name}:</span>
                    <span className="font-mono text-copper">₹{calculation.surajWoodFabricatedCost.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span>PU / Duco Paint (Multi-Coat):</span>
                    <span className="font-mono text-gray-400">₹{calculation.puPaintCost.toLocaleString("en-IN")}</span>
                  </div>

                  {calculation.savingsVsPUPaint > 0 && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>Saves ~₹{calculation.savingsVsPUPaint.toLocaleString("en-IN")} vs. PU paint with 3H scratch resistance &amp; zero waviness!</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp & Instant Delivery Gate */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-white mb-2">
                      Get Official Cut-List &amp; Trade Discount on WhatsApp:
                    </p>

                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name / Firm"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-gray-600 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-gray-600 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                        />
                        <input
                          type="text"
                          required
                          placeholder="City (e.g. Mumbai)"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-gray-600 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-copper"
                        />
                      </div>
                      <select
                        value={formData.userType}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c2024] border border-gray-600 text-xs text-white focus:outline-none focus:border-copper"
                      >
                        <option>Architect / Interior Designer</option>
                        <option>OEM Modular Kitchen Manufacturer</option>
                        <option>Contractor / Carpenter</option>
                        <option>Homeowner</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-copper to-[#B91C1C] hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-copper/25 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Generating Cut-List..." : "Send Instant Cut-List & Quote →"}
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/50 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Estimate Sent to Our Sales Team!</h4>
                      <p className="text-xs text-gray-300 mt-1">
                        Our regional engineer will connect on WhatsApp within 2 hours with the official PDF cut-list and dealer discounts for {formData.city}.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/919009171819?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Sample Box Callout */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-xl flex-shrink-0">
                  📦
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-navy text-xs sm:text-sm">Need to Inspect Physical Swatches?</h4>
                  <p className="text-gray-500 text-[11px]">Request 3 free acrylic swatch samples delivered to your studio in 48h.</p>
                </div>
                <Link
                  href="/contact?inquiry=Sample+Box"
                  className="text-xs font-bold text-copper hover:underline flex-shrink-0"
                >
                  Order Swatches →
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
