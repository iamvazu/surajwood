"use client";

import { useState, useMemo, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calculator, 
  TrendingDown,
  Send,
  Check,
  Download,
  FileSpreadsheet,
  Info
} from "lucide-react";

// ─── Data Configurations from Official 2026 Ver 2.0 Price List ─────────────────

type ApplicationType = "kitchen" | "wardrobe" | "wall-panel";
type SubstrateType = "mdf" | "hdhmr" | "birch" | "bwp";
type BackerType = "hips" | "bsl" | "melamine";
type ColorSeries = "solid" | "metallic";

interface KitchenLayout {
  id: string;
  name: string;
  description: string;
  defaultLength: number; // running feet
  multiplier: number; // surface area multiplier
  icon: string;
}

const KITCHEN_LAYOUTS: KitchenLayout[] = [
  { id: "l-shape", name: "L-Shaped Kitchen", description: "Corner layout with 2 adjoining counter runs", defaultLength: 18, multiplier: 2.2, icon: "📐" },
  { id: "parallel", name: "Parallel / Galley", description: "Two parallel working counter runs facing each other", defaultLength: 20, multiplier: 2.3, icon: "🪜" },
  { id: "u-shape", name: "U-Shaped Kitchen", description: "3 continuous walls maximizing prep space & lofts", defaultLength: 26, multiplier: 2.4, icon: "🔲" },
  { id: "straight", name: "Straight / Single-Wall", description: "Linear kitchen ideal for compact modern apartments", defaultLength: 12, multiplier: 2.0, icon: "📏" },
  { id: "island", name: "Kitchen with Island", description: "Main cooking counters + freestanding luxury island", defaultLength: 28, multiplier: 2.6, icon: "🏝️" },
];

interface WardrobeLayout {
  id: string;
  name: string;
  description: string;
  defaultWidth: number; // feet
  defaultHeight: number; // feet
  multiplier: number;
  icon: string;
}

const WARDROBE_LAYOUTS: WardrobeLayout[] = [
  { id: "3-door", name: "3-Door Hinged Wardrobe", description: "Classic 6 ft wide wardrobe with overhead lofts", defaultWidth: 6, defaultHeight: 8, multiplier: 1.0, icon: "🚪" },
  { id: "4-door", name: "4-Door Master Wardrobe", description: "Spacious 8 ft wide bedroom wardrobe with lofts", defaultWidth: 8, defaultHeight: 8, multiplier: 1.0, icon: "🚪🚪" },
  { id: "sliding", name: "2-Track Sliding Wardrobe", description: "Contemporary space-saving sliding shutter system", defaultWidth: 7, defaultHeight: 8, multiplier: 1.05, icon: "↔️" },
  { id: "walk-in", name: "Luxury Walk-In Closet", description: "Expansive multi-bay wardrobe with glass/acrylic doors", defaultWidth: 14, defaultHeight: 9, multiplier: 1.15, icon: "✨" },
];

interface ProductPricing {
  id: string;
  name: string;
  thickness: string;
  category: string;
  tagline: string;
  scratchRating: string;
  hasMetallic: boolean;
  rates: {
    solid: { mdf: number; hdhmr: number; birch: number; bwp?: number };
    metallic?: { mdf: number; hdhmr: number; birch: number; bwp?: number };
  };
  bslAddon: number;
  melamineDiscount?: number;
  sheetAsIs: { solid: number; metallic?: number };
  edgebandType: string;
  edgebandRatePerMtr: number;
  popular?: boolean;
}

const PRODUCTS_PRICING: ProductPricing[] = [
  {
    id: "acrylux",
    name: "ACRYLUX",
    thickness: "1mm High Gloss",
    category: "High Gloss PMMA Acrylic",
    tagline: "92+ GU Optical Mirror Polish with 1mm HIPS Backer",
    scratchRating: "3H Hardcoat",
    hasMetallic: true,
    rates: {
      solid: { mdf: 340, hdhmr: 360, birch: 460 },
      metallic: { mdf: 370, hdhmr: 390, birch: 490 },
    },
    bslAddon: 120,
    melamineDiscount: 50,
    sheetAsIs: { solid: 7500, metallic: 8500 },
    edgebandType: "1x23 ABS Matching",
    edgebandRatePerMtr: 44,
    popular: true,
  },
  {
    id: "acrymatte",
    name: "ACRYMATTE",
    thickness: "1mm Matte Finish",
    category: "Nano Anti-Fingerprint Matte",
    tagline: "Zero-Reflectance Anti-Fingerprint Silky Touch",
    scratchRating: "3H Anti-Scratch",
    hasMetallic: true,
    rates: {
      solid: { mdf: 340, hdhmr: 360, birch: 460 },
      metallic: { mdf: 370, hdhmr: 390, birch: 490 },
    },
    bslAddon: 120,
    melamineDiscount: 50,
    sheetAsIs: { solid: 7500, metallic: 8500 },
    edgebandType: "1x23 ABS Matching",
    edgebandRatePerMtr: 44,
    popular: true,
  },
  {
    id: "acrysilk",
    name: "ACRYSILK",
    thickness: "1mm Satin Finish",
    category: "Premium Soft Satin Acrylic",
    tagline: "Ultra-Fine Tactile Silk Texture for Muted Luxury",
    scratchRating: "2.5H Silk",
    hasMetallic: false,
    rates: {
      solid: { mdf: 370, hdhmr: 390, birch: 490 },
    },
    bslAddon: 120,
    melamineDiscount: 50,
    sheetAsIs: { solid: 8500 },
    edgebandType: "1x23 ABS Matching",
    edgebandRatePerMtr: 55,
  },
  {
    id: "acryglass-uno-15",
    name: "ACRYGLASS UNO 1.5mm",
    thickness: "1.5mm High Gloss",
    category: "1.5mm Glass Finish",
    tagline: "Enhanced 1.5mm Crystal Depth with Frosty White HIPS",
    scratchRating: "3.5H Hardcoat",
    hasMetallic: true,
    rates: {
      solid: { mdf: 380, hdhmr: 400, birch: 500 },
      metallic: { mdf: 410, hdhmr: 430, birch: 530 },
    },
    bslAddon: 150,
    sheetAsIs: { solid: 8000, metallic: 9000 },
    edgebandType: "1x23 PVC Matching",
    edgebandRatePerMtr: 30,
  },
  {
    id: "acryglass-uno-20",
    name: "ACRYGLASS UNO 2mm",
    thickness: "2mm Glass Finish",
    category: "2mm High Gloss Glass",
    tagline: "Solid 2mm PMMA with Pure High-Gloss Crystal Luster",
    scratchRating: "4H Crystal",
    hasMetallic: false,
    rates: {
      solid: { mdf: 580, hdhmr: 600, birch: 700 },
    },
    bslAddon: 200,
    sheetAsIs: { solid: 10000 },
    edgebandType: "1x25 PMMA Crystal 3D",
    edgebandRatePerMtr: 100,
  },
  {
    id: "acryglass-20",
    name: "ACRYGLASS 2mm (High Gloss & Matt)",
    thickness: "2mm Premium Glass",
    category: "2mm Solid Polymer Glass",
    tagline: "Flagship 2mm Chamferable European Crystal Glass Panel",
    scratchRating: "4H Hardcoat",
    hasMetallic: false,
    rates: {
      solid: { mdf: 800, hdhmr: 820, birch: 920 },
    },
    bslAddon: 350,
    sheetAsIs: { solid: 15000 },
    edgebandType: "1x25 PMMA Crystal 3D",
    edgebandRatePerMtr: 100,
  },
  {
    id: "uno-10",
    name: "UNO Economy 1mm",
    thickness: "1mm High Gloss",
    category: "Economy Acrylic Line",
    tagline: "High-Gloss Pre-Lam Acrylic on MDF, HDHMR or BWP Plywood",
    scratchRating: "2H Standard",
    hasMetallic: true,
    rates: {
      solid: { mdf: 240, hdhmr: 260, bwp: 280, birch: 360 },
      metallic: { mdf: 260, hdhmr: 280, bwp: 300, birch: 380 },
    },
    bslAddon: 100,
    sheetAsIs: { solid: 6500, metallic: 7200 },
    edgebandType: "1x23 PVC Matching",
    edgebandRatePerMtr: 30,
  },
  {
    id: "membrane-shutter",
    name: "Continental Membrane Shutter",
    thickness: "18mm 3D Thermoformed",
    category: "Seamless 3D Wrapped HDMR",
    tagline: "3D Monolithic Thermoformed Shaker, J-Pull & Fluted Shutters",
    scratchRating: "Seamless 3D",
    hasMetallic: false,
    rates: {
      solid: { mdf: 230, hdhmr: 240, birch: 320 },
    },
    bslAddon: 0,
    sheetAsIs: { solid: 5500 },
    edgebandType: "Zero Edge-Banding Needed (Seamless Wrap)",
    edgebandRatePerMtr: 0,
  },
];

export default function CostEstimatorPage() {
  // ─── States ─────────────────────────────────────────────────────────────
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

  // Product Selection & Configuration
  const [selectedProduct, setSelectedProduct] = useState<ProductPricing>(PRODUCTS_PRICING[0]);
  const [colorSeries, setColorSeries] = useState<ColorSeries>("solid");
  const [substrate, setSubstrate] = useState<SubstrateType>("hdhmr");
  const [backer, setBacker] = useState<BackerType>("hips");
  const [includeGST, setIncludeGST] = useState(true);

  // Lead Form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    userType: "Architect / Interior Designer",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── Calculations based on 2026 Price List ──────────────────────────────
  const calculation = useMemo(() => {
    let totalSqFt = 0;

    if (appType === "kitchen") {
      const baseArea = runningFeet * selectedKitchenLayout.multiplier;
      const loftArea = hasLoft ? runningFeet * 1.2 : 0;
      totalSqFt = Math.round(baseArea + loftArea);
    } else if (appType === "wardrobe") {
      totalSqFt = Math.round(wardrobeWidth * wardrobeHeight * selectedWardrobeLayout.multiplier);
    } else {
      totalSqFt = Math.round(panelWidth * panelHeight);
    }

    // Standard sheet 8x4 = 32 sq ft (add 10% cutting wastage)
    const effectiveSqFt = totalSqFt * 1.1;
    const sheetsNeeded = Math.ceil(effectiveSqFt / 32);

    // Get Base Rate per Sq Ft from official price table
    const isMetallic = colorSeries === "metallic" && selectedProduct.hasMetallic;
    const ratesObject = isMetallic && selectedProduct.rates.metallic
      ? selectedProduct.rates.metallic
      : selectedProduct.rates.solid;

    // Resolve substrate rate (fallback to hdhmr if bwp is not present on product)
    let baseRatePerSqFt = ratesObject[substrate as keyof typeof ratesObject] || ratesObject.hdhmr;

    // Apply Backer adjustments
    if (backer === "bsl") {
      baseRatePerSqFt += selectedProduct.bslAddon;
    } else if (backer === "melamine" && selectedProduct.melamineDiscount) {
      baseRatePerSqFt -= selectedProduct.melamineDiscount;
    }

    // Pre-laminated board material cost
    const prelamBoardCost = Math.round(totalSqFt * baseRatePerSqFt);

    // Edgebanding meters (~1.4 meters per sq.ft of shutter)
    const edgeBandingMeters = selectedProduct.edgebandRatePerMtr > 0 ? Math.round(totalSqFt * 1.4) : 0;
    const edgebandingCost = Math.round(edgeBandingMeters * selectedProduct.edgebandRatePerMtr);

    // Net Ex-Factory Cost
    const subtotalExFactory = prelamBoardCost + edgebandingCost;

    // 18% GST (Official Terms: "18% G.S.T extra")
    const gstAmount = Math.round(subtotalExFactory * 0.18);
    const totalWithGST = subtotalExFactory + gstAmount;

    // Raw Sheet As-Is Cost Benchmark (if ordering raw sheets only)
    const rawSheetRate = isMetallic && selectedProduct.sheetAsIs.metallic
      ? selectedProduct.sheetAsIs.metallic
      : selectedProduct.sheetAsIs.solid;
    const rawSheetsCost = sheetsNeeded * rawSheetRate;

    // Market Comparisons (Prelam board + edgeband benchmarks)
    const standardLaminateCost = Math.round(totalSqFt * 185); // 1mm laminate prelam board + PVC edgeband
    const puPaintCost = Math.round(totalSqFt * 520); // Multi-coat PU Paint on HDMR with sanding

    return {
      totalSqFt,
      sheetsNeeded,
      baseRatePerSqFt,
      prelamBoardCost,
      edgeBandingMeters,
      edgebandingCost,
      subtotalExFactory,
      gstAmount,
      totalWithGST,
      finalEstimatedCost: includeGST ? totalWithGST : subtotalExFactory,
      rawSheetsCost,
      standardLaminateCost,
      puPaintCost,
      savingsVsPUPaint: puPaintCost - (includeGST ? totalWithGST : subtotalExFactory),
    };
  }, [
    appType,
    selectedKitchenLayout,
    selectedWardrobeLayout,
    runningFeet,
    hasLoft,
    wardrobeWidth,
    wardrobeHeight,
    panelWidth,
    panelHeight,
    selectedProduct,
    colorSeries,
    substrate,
    backer,
    includeGST
  ]);

  // Handle Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadPayload = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      inquiryType: "Cost Estimator Cut-List",
      message: `OFFICIAL ESTIMATE (Price List 2026 v2.0):
Application: ${appType.toUpperCase()}
Total Sq Ft: ${calculation.totalSqFt} sq.ft. (~${calculation.sheetsNeeded} Sheets of 8x4)
Product: ${selectedProduct.name} (${selectedProduct.thickness})
Color Tone: ${colorSeries.toUpperCase()}
Substrate: ${substrate.toUpperCase()}
Backer: ${backer.toUpperCase()}
Rate / Sq.Ft: ₹${calculation.baseRatePerSqFt}
Ex-Factory Total: ₹${calculation.subtotalExFactory.toLocaleString("en-IN")}
Total with 18% GST: ₹${calculation.totalWithGST.toLocaleString("en-IN")}
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
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi SurajWood Team, I calculated an official estimate on your 2026 Price List Estimator:
• Project: ${appType.toUpperCase()} (${calculation.totalSqFt} sq.ft. / ~${calculation.sheetsNeeded} sheets)
• Product: ${selectedProduct.name} (${colorSeries.toUpperCase()} on ${substrate.toUpperCase()})
• Backer: ${backer.toUpperCase()}
• Rate: ₹${calculation.baseRatePerSqFt} / sq.ft.
• Total Estimate: ₹${calculation.totalWithGST.toLocaleString("en-IN")} (incl. 18% GST)
Please share the official trade discount and dispatch timeline for ${formData.city || "my city"}.`
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-navy">
      
      {/* ─── Hero Section with Luxury Background & Ken Burns Zoom ─── */}
      <section className="relative text-white pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/gallery/kitchen-1.jpg"
              alt="SurajWood Acrylic Kitchen & Shutter Cost Calculator 2026"
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
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li className="text-white/80 font-medium" aria-current="page">
                Cost Estimator Tool
              </li>
            </ol>
          </nav>

          {/* Frosted Dark Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-5">
            <Calculator className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] sm:text-xs uppercase font-bold">
              OFFICIAL 2026 PRICE LIST ESTIMATOR (VER 2.0)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Acrylic Sheet &amp; Shutter <span className="text-copper-light font-extrabold">Cost Calculator</span>
          </h1>

          <p className="text-gray-200 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed font-light mb-6">
            Calculate accurate factory-direct costs for ACRYLUX, ACRYMATTE, ACRYSILK, and ACRYGLASS prelaminated boards, 8x4 sheets, matching edgebands, and GST in real time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/catalogs/SurajWood_Acrylic_Price_List_2026.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold transition-all backdrop-blur-md"
            >
              <Download size={14} className="text-copper" />
              <span>Download Official 2026 Price List PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Main Configurator & Calculation Engine ─── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN: Interactive Configurator (7 Cols) ── */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
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
                  <h2 className="font-heading font-bold text-lg text-navy">Dimensions &amp; Layout</h2>
                </div>

                {appType === "kitchen" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Kitchen Layout Structure
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
                                ? "border-copper bg-copper/5 text-navy font-semibold ring-1 ring-copper"
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
                          Counter Length (Running Feet)
                        </label>
                        <span className="px-2.5 py-0.5 rounded-lg bg-navy text-white text-xs font-bold font-mono">
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
                        <span>8 ft (Compact 1BHK)</span>
                        <span>20 ft (Standard 2-3BHK)</span>
                        <span>45 ft (Luxury Villa)</span>
                      </div>
                    </div>

                    {/* Loft Checkbox */}
                    <label className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasLoft}
                        onChange={(e) => setHasLoft(e.target.checked)}
                        className="w-4 h-4 rounded text-copper focus:ring-copper"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-navy">Include Overhead Lofts (Ceiling Storage)</span>
                        <p className="text-gray-500 text-[11px]">Calculates full-height shutter panels for upper cabinets</p>
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
                                ? "border-copper bg-copper/5 text-navy font-semibold ring-1 ring-copper"
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
                        <label className="block text-xs font-bold text-gray-500 mb-1">Wardrobe Width (Feet)</label>
                        <input
                          type="number"
                          min="4"
                          max="24"
                          value={wardrobeWidth}
                          onChange={(e) => setWardrobeWidth(Math.max(4, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Wardrobe Height (Feet)</label>
                        <input
                          type="number"
                          min="6"
                          max="11"
                          value={wardrobeHeight}
                          onChange={(e) => setWardrobeHeight(Math.max(6, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {appType === "wall-panel" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Feature Wall Width (Feet)</label>
                        <input
                          type="number"
                          min="4"
                          max="50"
                          value={panelWidth}
                          onChange={(e) => setPanelWidth(Math.max(4, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper font-mono"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-navy focus:outline-none focus:border-copper font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Product Finish, Substrate & Backer Specification */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-copper text-white font-bold text-xs">3</span>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-navy">SurajWood Product &amp; Board Specs</h2>
                    <p className="text-[11px] text-gray-500">Select exact product series from Price List 2026 v2.0</p>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Acrylic Product Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRODUCTS_PRICING.map((p) => {
                      const isSelected = selectedProduct.id === p.id;
                      const activeRate = (colorSeries === "metallic" && p.hasMetallic && p.rates.metallic)
                        ? p.rates.metallic[substrate as keyof typeof p.rates.metallic] || p.rates.metallic.hdhmr
                        : p.rates.solid[substrate as keyof typeof p.rates.solid] || p.rates.solid.hdhmr;

                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedProduct(p)}
                          className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                            isSelected
                              ? "border-copper bg-copper/5 ring-2 ring-copper shadow-sm"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          {p.popular && (
                            <span className="absolute top-2.5 right-2.5 bg-copper text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                              Best Seller
                            </span>
                          )}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-navy">{p.name}</span>
                            <span className="text-[10px] text-gray-500">({p.thickness})</span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-tight mb-2">{p.tagline}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-copper font-mono">
                              ₹{activeRate}/sq.ft.
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                              {p.scratchRating}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Series Selector (Solid vs Metallic/Design) */}
                {selectedProduct.hasMetallic && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Color Shade Series
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setColorSeries("solid")}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          colorSeries === "solid"
                            ? "border-copper bg-copper/5 font-bold text-navy"
                            : "border-gray-200 text-gray-600 bg-white"
                        }`}
                      >
                        <p className="text-xs font-bold">Solid Colors</p>
                        <p className="text-[10px] text-gray-500">Pure whites, greiges, blacks &amp; pastels</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setColorSeries("metallic")}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          colorSeries === "metallic"
                            ? "border-copper bg-copper/5 font-bold text-navy"
                            : "border-gray-200 text-gray-600 bg-white"
                        }`}
                      >
                        <p className="text-xs font-bold">Metallic / Designs (+₹30/sft)</p>
                        <p className="text-[10px] text-gray-500">Gold, copper, champagne &amp; textured glints</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Substrate Core */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Core Substrate (PUR Factory Laminated)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSubstrate("hdhmr")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        substrate === "hdhmr"
                          ? "border-copper bg-copper/5 font-bold text-navy ring-1 ring-copper"
                          : "border-gray-200 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">Action TESA HDHMR</p>
                      <p className="text-[10px] text-gray-500">High Density Moisture Resistant</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubstrate("mdf")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        substrate === "mdf"
                          ? "border-copper bg-copper/5 font-bold text-navy ring-1 ring-copper"
                          : "border-gray-200 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">Calibrated MDF</p>
                      <p className="text-[10px] text-gray-500">Economical Smooth Core (-₹20/sft)</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubstrate("birch")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        substrate === "birch"
                          ? "border-copper bg-copper/5 font-bold text-navy ring-1 ring-copper"
                          : "border-gray-200 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">Birch Plywood</p>
                      <p className="text-[10px] text-gray-500">European Marine Grade (+₹100/sft)</p>
                    </button>
                  </div>
                </div>

                {/* Backer Option */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Backer Finish Option
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setBacker("hips")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        backer === "hips"
                          ? "border-copper bg-copper/5 font-bold text-navy ring-1 ring-copper"
                          : "border-gray-200 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">1mm HIPS Backer</p>
                      <p className="text-[10px] text-gray-500">Standard Same Color / Frosty White</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBacker("bsl")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        backer === "bsl"
                          ? "border-copper bg-copper/5 font-bold text-navy ring-1 ring-copper"
                          : "border-gray-200 text-gray-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold">Both Side Acrylic (BSL)</p>
                      <p className="text-[10px] text-gray-500">+₹{selectedProduct.bslAddon}/sft (Double Face)</p>
                    </button>

                    {selectedProduct.melamineDiscount && (
                      <button
                        type="button"
                        onClick={() => setBacker("melamine")}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          backer === "melamine"
                            ? "border-copper bg-copper/5 font-bold text-navy ring-1 ring-copper"
                            : "border-gray-200 text-gray-600 bg-white"
                        }`}
                      >
                        <p className="text-xs font-bold">Melamine Backer</p>
                        <p className="text-[10px] text-gray-500">-₹{selectedProduct.melamineDiscount}/sft Discount</p>
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* ── RIGHT COLUMN: Official Live Estimate & Breakdown (5 Cols) ── */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-gradient-to-b from-navy via-[#1f2328] to-navy text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-copper/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-gray-700/80 mb-5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-copper">
                      OFFICIAL 2026 PRICE BREAKDOWN
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white">
                      {selectedProduct.name} Estimate
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-copper font-mono font-bold">
                    ₹{calculation.baseRatePerSqFt}/sq.ft.
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-gray-400 block mb-0.5">Total Surface Area</span>
                    <span className="text-2xl font-heading font-bold text-white font-mono">{calculation.totalSqFt}</span>
                    <span className="text-xs text-gray-400 ml-1">sq.ft.</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-gray-400 block mb-0.5">8x4 ft Sheets Approx.</span>
                    <span className="text-2xl font-heading font-bold text-copper font-mono">{calculation.sheetsNeeded}</span>
                    <span className="text-xs text-gray-400 ml-1">Sheets</span>
                  </div>
                </div>

                {/* Itemized Commercial Table */}
                <div className="bg-black/30 rounded-2xl p-4 border border-white/10 mb-5 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Pre-Lam Board ({calculation.totalSqFt} sq.ft. @ ₹{calculation.baseRatePerSqFt}):</span>
                    <span className="font-mono text-white font-bold">₹{calculation.prelamBoardCost.toLocaleString("en-IN")}</span>
                  </div>

                  {calculation.edgeBandingMeters > 0 && (
                    <div className="flex justify-between items-center text-gray-300">
                      <span>
                        {selectedProduct.edgebandType} (~{calculation.edgeBandingMeters}m @ ₹{selectedProduct.edgebandRatePerMtr}/m):
                      </span>
                      <span className="font-mono text-white font-bold">₹{calculation.edgebandingCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-gray-400 pt-2 border-t border-white/10">
                    <span>Ex-Factory Subtotal:</span>
                    <span className="font-mono text-gray-300">₹{calculation.subtotalExFactory.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeGST}
                        onChange={(e) => setIncludeGST(e.target.checked)}
                        className="rounded text-copper focus:ring-copper w-3.5 h-3.5"
                      />
                      <span>18% G.S.T (Itemized extra):</span>
                    </label>
                    <span className="font-mono text-copper">
                      {includeGST ? `+₹${calculation.gstAmount.toLocaleString("en-IN")}` : "Exempt / Extra"}
                    </span>
                  </div>
                </div>

                {/* Grand Total Hero Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-copper/25 to-red-900/30 border border-copper/50 mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-semibold text-gray-300">Estimated Project Total:</span>
                    <span className="text-2xl sm:text-3xl font-heading font-extrabold text-white font-mono">
                      ₹{calculation.finalEstimatedCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    {includeGST ? "*Includes 18% GST as per official terms. Freight & packaging actuals." : "*Ex-factory price before 18% GST."}
                  </p>
                </div>

                {/* Material Comparison Benchmark */}
                <div className="space-y-2 mb-6 text-xs border-t border-gray-700/80 pt-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Market Price Benchmark (vs Laminates &amp; PU Paint)
                  </span>
                  
                  <div className="flex justify-between items-center text-gray-300">
                    <span>1mm Standard Laminate (Merino / Royale):</span>
                    <span className="font-mono text-gray-400">₹{calculation.standardLaminateCost.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-white font-bold bg-white/5 p-2 rounded-lg border border-copper/30">
                    <span className="text-copper">SurajWood {selectedProduct.name}:</span>
                    <span className="font-mono text-copper">₹{calculation.finalEstimatedCost.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span>Multi-Coat PU / Duco Paint:</span>
                    <span className="font-mono text-gray-400">₹{calculation.puPaintCost.toLocaleString("en-IN")}</span>
                  </div>

                  {calculation.savingsVsPUPaint > 0 && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1 font-medium">
                      <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                      <span>Saves ~₹{calculation.savingsVsPUPaint.toLocaleString("en-IN")} vs. PU paint with 3H mirror clarity!</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp & Instant Cut-List Dispatch Gate */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                    <p className="text-xs font-bold text-white mb-2">
                      Get Cut-List &amp; Trade Discount on WhatsApp:
                    </p>

                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name / Architecture Firm"
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
                      {isSubmitting ? "Generating Official Cut-List..." : "Send Instant Cut-List & Quote →"}
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/50 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Estimate Sent to Our Technical Desk!</h4>
                      <p className="text-xs text-gray-300 mt-1">
                        Our regional engineer will connect on WhatsApp with the official PDF cut-list and volume discounts for {formData.city}.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/919009171819?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp Directly</span>
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
                  <h4 className="font-bold text-navy text-xs sm:text-sm">Need Physical Swatches?</h4>
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

      {/* ─── Official Price Matrix Table Section ─── */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 text-copper text-xs font-bold uppercase mb-3">
              <FileSpreadsheet size={13} /> Transparent Factory Pricing
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy">
              Official SurajWood Price List — 2026 Ver 2.0
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Factory-direct prices per square foot on 1mm HIPS Pre-Lam boards, raw 8x4 acrylic sheets, and matching ABS/PMMA edgebands.
            </p>
          </div>

          {/* Pricing Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-8">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy text-white font-bold">
                  <th className="p-4 border-b border-gray-700">Product Range</th>
                  <th className="p-4 border-b border-gray-700">Series / Tone</th>
                  <th className="p-4 border-b border-gray-700 text-center">Calibrated MDF</th>
                  <th className="p-4 border-b border-gray-700 text-center bg-copper text-white">Action TESA HDHMR</th>
                  <th className="p-4 border-b border-gray-700 text-center">Birch Plywood</th>
                  <th className="p-4 border-b border-gray-700">Backer Options</th>
                  <th className="p-4 border-b border-gray-700 text-center">Edgeband Rate</th>
                  <th className="p-4 border-b border-gray-700 text-center">8x4 Sheet As Is</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-navy">ACRYLUX (1mm High Gloss)</td>
                  <td className="p-4">Solid Colors<br /><span className="text-gray-400">Metallic / Designs</span></td>
                  <td className="p-4 text-center font-mono font-semibold">₹340<br />₹370</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹360<br />₹390</td>
                  <td className="p-4 text-center font-mono font-semibold">₹460<br />₹490</td>
                  <td className="p-4">BSL +₹120<br />Melamine -₹50</td>
                  <td className="p-4 text-center font-mono">₹44/m (1x23 ABS)</td>
                  <td className="p-4 text-center font-mono font-bold">₹7,500 / ₹8,500</td>
                </tr>

                <tr className="hover:bg-gray-50 bg-gray-50/50">
                  <td className="p-4 font-bold text-navy">ACRYMATTE (1mm Nano-Matte)</td>
                  <td className="p-4">Solid Colors<br /><span className="text-gray-400">Metallic</span></td>
                  <td className="p-4 text-center font-mono font-semibold">₹340<br />₹370</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹360<br />₹390</td>
                  <td className="p-4 text-center font-mono font-semibold">₹460<br />₹490</td>
                  <td className="p-4">BSL +₹120<br />Melamine -₹50</td>
                  <td className="p-4 text-center font-mono">₹44/m (1x23 ABS)</td>
                  <td className="p-4 text-center font-mono font-bold">₹7,500 / ₹8,500</td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-navy">ACRYSILK (1mm Satin)</td>
                  <td className="p-4">Solid Colors</td>
                  <td className="p-4 text-center font-mono font-semibold">₹370</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹390</td>
                  <td className="p-4 text-center font-mono font-semibold">₹490</td>
                  <td className="p-4">BSL +₹120<br />Melamine -₹50</td>
                  <td className="p-4 text-center font-mono">₹55/m (1x23 ABS)</td>
                  <td className="p-4 text-center font-mono font-bold">₹8,500</td>
                </tr>

                <tr className="hover:bg-gray-50 bg-gray-50/50">
                  <td className="p-4 font-bold text-navy">ACRYGLASS UNO (1.5mm High Gloss)</td>
                  <td className="p-4">Solid Colors<br /><span className="text-gray-400">Metallic</span></td>
                  <td className="p-4 text-center font-mono font-semibold">₹380<br />₹410</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹400<br />₹430</td>
                  <td className="p-4 text-center font-mono font-semibold">₹500<br />₹530</td>
                  <td className="p-4">BSL +₹150</td>
                  <td className="p-4 text-center font-mono">₹30/m (1x23 PVC)</td>
                  <td className="p-4 text-center font-mono font-bold">₹8,000 / ₹9,000</td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-navy">ACRYGLASS UNO (2mm Glass Gloss)</td>
                  <td className="p-4">Solid Colors</td>
                  <td className="p-4 text-center font-mono font-semibold">₹580</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹600</td>
                  <td className="p-4 text-center font-mono font-semibold">₹700</td>
                  <td className="p-4">BSL +₹200</td>
                  <td className="p-4 text-center font-mono">₹100/m (1x25 PMMA)</td>
                  <td className="p-4 text-center font-mono font-bold">₹10,000</td>
                </tr>

                <tr className="hover:bg-gray-50 bg-gray-50/50">
                  <td className="p-4 font-bold text-navy">ACRYGLASS 2mm (Gloss &amp; Matt)</td>
                  <td className="p-4">Solid Colors</td>
                  <td className="p-4 text-center font-mono font-semibold">₹800</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹820</td>
                  <td className="p-4 text-center font-mono font-semibold">₹920</td>
                  <td className="p-4">BSL +₹350</td>
                  <td className="p-4 text-center font-mono">₹100/m (1x25 PMMA)</td>
                  <td className="p-4 text-center font-mono font-bold">₹15,000</td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-navy">UNO (1mm Economy Acrylic)</td>
                  <td className="p-4">Solid / Metallic</td>
                  <td className="p-4 text-center font-mono font-semibold">₹240 / ₹260</td>
                  <td className="p-4 text-center font-mono font-bold bg-copper/5 text-copper">₹260 / ₹280</td>
                  <td className="p-4 text-center font-mono font-semibold">₹360 / ₹380</td>
                  <td className="p-4">BSL +₹100<br />(BWP: ₹280/₹300)</td>
                  <td className="p-4 text-center font-mono">₹30/m (1x23 PVC)</td>
                  <td className="p-4 text-center font-mono font-bold">₹6,500 / ₹7,200</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Commercial Terms Callout */}
          <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
            <Info className="w-5 h-5 text-copper shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-bold text-navy">Official Terms &amp; Conditions (Price List 2026 Ver 2.0):</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                <li>Prices quoted are ex-stocks Rohad Bahadurgarh Factory per sq. ft.</li>
                <li><strong>18% G.S.T extra</strong>. Freight &amp; packaging extra at actuals.</li>
                <li>Payment: 100% advance at the time of order booking.</li>
                <li>Both Side Lamination (BSL) orders require 8–10 working days from order confirmation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
