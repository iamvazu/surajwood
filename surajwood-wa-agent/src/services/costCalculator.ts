import { SURAJWOOD_CATALOG } from "../knowledge/catalog";

export interface EstimateInput {
  application: "kitchen" | "wardrobe" | "wall-panel";
  productId: string; // acrylux, acrymatte, acrysilk, acryglass-uno-15, acryglass-uno-20, acryglass-20, uno-10, membrane-shutters
  substrate: "hdhmr" | "mdf" | "birch" | "bwp";
  colorSeries?: "solid" | "metallic";
  backer?: "hips" | "bsl" | "melamine";
  includeGst?: boolean;

  // Kitchen dimensions
  kitchenLayout?: "l-shape" | "parallel" | "u-shape" | "straight" | "island";
  runningFeet?: number;
  hasLoft?: boolean;

  // Wardrobe / Wall panel dimensions
  widthFt?: number;
  heightFt?: number;
}

export interface EstimateResult {
  productName: string;
  category: string;
  substrateName: string;
  totalSqFt: number;
  baseRatePerSqFt: number;
  rateWithBackerPerSqFt: number;
  materialCost: number;
  edgebandCost: number;
  subtotal: number;
  gstAmount: number;
  finalTotal: number;
  savingsVsPUPaint: number;
  sheetsNeededApprox: number;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const product =
    SURAJWOOD_CATALOG.find((p) => p.id === input.productId) || SURAJWOOD_CATALOG[0];

  const series = input.colorSeries === "metallic" && product.hasMetallic ? "metallic" : "solid";
  const ratesObj = product.baseRateSqFt[series] || product.baseRateSqFt.solid;
  const baseRate = ratesObj[input.substrate] || ratesObj.hdhmr || 360;

  // Backer calculation
  let backerMod = 0;
  if (input.backer === "bsl") {
    backerMod = product.bslAddon || 120;
  } else if (input.backer === "melamine" && product.melamineDiscount) {
    backerMod = -product.melamineDiscount;
  }
  const effectiveSqFtRate = baseRate + backerMod;

  let totalSqFt = 0;

  if (input.application === "kitchen") {
    const feet = input.runningFeet || 18;
    const layoutMultiplier =
      input.kitchenLayout === "l-shape"
        ? 2.2
        : input.kitchenLayout === "parallel"
        ? 2.3
        : input.kitchenLayout === "u-shape"
        ? 2.4
        : input.kitchenLayout === "island"
        ? 2.6
        : 2.0; // straight

    const baseArea = feet * layoutMultiplier;
    totalSqFt = input.hasLoft ? baseArea * 1.3 : baseArea;
  } else if (input.application === "wardrobe") {
    const width = input.widthFt || 8;
    const height = input.heightFt || 8;
    totalSqFt = width * height;
  } else {
    // Wall panel
    const width = input.widthFt || 12;
    const height = input.heightFt || 9;
    totalSqFt = width * height;
  }

  totalSqFt = Math.round(totalSqFt * 10) / 10;

  const materialCost = Math.round(totalSqFt * effectiveSqFtRate);
  // Edgeband running meters approx: 1.5 meters per sq ft of panel surface
  const edgebandMeters = Math.round(totalSqFt * 1.5);
  const edgebandCost = Math.round(edgebandMeters * (product.id === "membrane-shutters" ? 0 : 44));

  const subtotal = materialCost + edgebandCost;
  const includeGst = input.includeGst !== false;
  const gstAmount = includeGst ? Math.round(subtotal * 0.18) : 0;
  const finalTotal = subtotal + gstAmount;

  // Comparison vs High-Gloss PU Paint (typical ₹750/sq.ft)
  const puPaintCost = Math.round(totalSqFt * 750 * (includeGst ? 1.18 : 1.0));
  const savingsVsPUPaint = Math.max(0, puPaintCost - finalTotal);

  // Sheets count (standard 8x4 sheet = 32 sq ft)
  const sheetsNeededApprox = Math.ceil(totalSqFt / 30); // 30 sq.ft usable per sheet accounting for 6% kerf loss

  return {
    productName: product.name,
    category: product.category,
    substrateName: input.substrate.toUpperCase(),
    totalSqFt,
    baseRatePerSqFt: baseRate,
    rateWithBackerPerSqFt: effectiveSqFtRate,
    materialCost,
    edgebandCost,
    subtotal,
    gstAmount,
    finalTotal,
    savingsVsPUPaint,
    sheetsNeededApprox,
  };
}
