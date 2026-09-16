import Anthropic from "@anthropic-ai/sdk";
import { CONFIG } from "../config";
import { getSystemPrompt } from "./prompt";
import { CLAUDE_TOOLS, executeTool, popPendingImages, queueImage } from "./tools";
import { formatForWhatsApp } from "../utils/formatter";
import { CATALOG_IMAGES } from "../knowledge/catalog";
import { findRequestedShades } from "../knowledge/shades";
import { calculateEstimate } from "../services/costCalculator";

let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    if (!CONFIG.anthropicApiKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured in .env");
    }
    anthropicClient = new Anthropic({
      apiKey: CONFIG.anthropicApiKey,
    });
  }
  return anthropicClient;
}

// Convert Claude tools to OpenAI / OpenRouter format
const OPENROUTER_TOOLS = CLAUDE_TOOLS.map((t) => ({
  type: "function" as const,
  function: {
    name: t.name,
    description: t.description,
    parameters: t.input_schema,
  },
}));

// In-memory conversation history & context state per WhatsApp chat ID
interface SessionState {
  history: { role: "user" | "assistant" | "system"; content: any; tool_calls?: any; tool_call_id?: string; name?: string }[];
  lastTopic?: "acrylic" | "membrane" | "aluminum" | "sample" | "factory" | "quote";
  selectedShades?: string[];
  application?: "kitchen" | "wardrobe" | "vanity" | "wall-panel";
  substrate?: "hdhmr" | "mdf" | "birch";
  awaitingField?: "application" | "dimensions" | "sample_details";
  userName?: string;
  userCity?: string;
  firmOrStudio?: string;
}

const conversationSessions = new Map<string, SessionState>();

const MAX_HISTORY = 16;

function getOrCreateSession(chatId: string): SessionState {
  let session = conversationSessions.get(chatId);
  if (!session) {
    session = { history: [] };
    conversationSessions.set(chatId, session);
  }
  return session;
}

export function clearChatHistory(chatId: string) {
  conversationSessions.delete(chatId);
}

export interface AgentResult {
  text: string;
  images: { url: string; caption: string }[];
}

/**
 * Intelligent Context-Aware BD / Pre-Sales Conversational Engine
 * Keeps track of customer state, selected shades, application (kitchen/wardrobe),
 * calculates instant estimates, and handles sample dispatches.
 */
function getSmartFallbackResponse(
  chatId: string,
  userText: string,
  senderName?: string
): string {
  const session = getOrCreateSession(chatId);
  const query = userText.toLowerCase().trim();

  // 1. Off-topic check (coding, homework, unrelated questions)
  if (
    query.includes("python") ||
    query.includes("java") ||
    query.includes("javascript") ||
    query.includes("bubble sort") ||
    query.includes("algorithm") ||
    query.includes("homework") ||
    query.includes("weather") ||
    query.includes("write a script") ||
    query.includes("code for")
  ) {
    return "I'm dedicated exclusively to assisting with SurajWood's premium acrylic panels, membrane shutters, and aluminum profiles. Let's talk about your interior or joinery project! 😊";
  }

  // 2. Specific Shade Swatch Request (e.g., "1302 whitw 3325 urban grey and 2307 white metallic", "show me 1302")
  const specificShades = findRequestedShades(userText);
  if (specificShades.length > 0) {
    session.selectedShades = specificShades.map((s) => `${s.code} ${s.name}`);
    session.lastTopic = specificShades[0].category === "membrane" ? "membrane" : "acrylic";
    session.awaitingField = "application";

    for (const shade of specificShades) {
      queueImage(chatId, shade.imageUrl, shade.caption);
    }
    const shadeLines = specificShades
      .map((s) => `• *${s.code} ${s.name}*: ${s.finish} (${s.collection})`)
      .join("\n");

    return `Here are the exact swatches you requested 💎📸

${shadeLines}

*(I've sent the high-resolution shade swatch photos above ✨)*

Are you planning kitchen, wardrobe, or vanity shutters? Let me know which application you're designing so I can recommend the right substrate core and calculate your estimate! 😊`;
  }

  // 3. Application: Kitchen Detection
  const isAskingKitchen = /\b(kitchen|kitchens|modular kitchen|base cabinet|overhead|countertop)\b/i.test(query);
  if (isAskingKitchen) {
    session.application = "kitchen";
    session.substrate = "hdhmr";
    session.awaitingField = "dimensions";

    const shadesMention =
      session.selectedShades && session.selectedShades.length > 0
        ? `The shades you selected (*${session.selectedShades.join(", ")}*) create a stunning two-tone modern kitchen! ✨\n\n`
        : "";

    return `Awesome! For kitchen shutters, we highly recommend our *18mm HDHMR (High Density High Moisture Resistance)* substrate with *1mm Acrylux / Acrymatte* (anti-scratch >90 GU & 100% boiling waterproof sealed edges).

${shadesMention}What is the approximate size or running feet of your kitchen (e.g., straight 12 ft, L-shape 15 ft, or U-shape)? Share the length and I'll calculate an instant material estimate with sheet count for you! 📊`;
  }

  // 4. Application: Wardrobe / Vanity Detection
  const isAskingWardrobe = /\b(wardrobe|wardrobes|closet|walk-in|almirah|cupboard|vanity|washbasin|wall panel)\b/i.test(query);
  if (isAskingWardrobe) {
    session.application = "wardrobe";
    session.substrate = "mdf";
    session.awaitingField = "dimensions";

    const shadesMention =
      session.selectedShades && session.selectedShades.length > 0
        ? `The shades you picked (*${session.selectedShades.join(", ")}*) give a sleek, luxury floor-to-ceiling look! ✨\n\n`
        : "";

    return `Great choice! For wardrobe facades and shutters, our *18mm MDF / HDHMR* with *Acrylux Mirror Gloss / Acrymatte Nano-Matte* or *AL-PROFHAN Velaro Glass Profiles* delivers a super-flat finish with zero warping.

${shadesMention}What is the approximate width and height of your wardrobe (e.g., 6x7 ft, 8x9 ft)? Share the dimensions and I'll calculate the sheet count and pricing for you! 📊`;
  }

  // 5. Dimensions / Running Feet / Sizing Calculation
  const rftMatch = query.match(/(\d+(\.\d+)?)\s*(?:running\s*feet|rft|feet|ft)/i);
  const dimMatch = query.match(/(\d+(\.\d+)?)\s*(?:x|\*|by)\s*(\d+(\.\d+)?)/i);
  const numOnly = query.match(/^(\d+(\.\d+)?)$/);

  if (rftMatch || dimMatch || (session.awaitingField === "dimensions" && numOnly)) {
    let runningFeet = 0;
    let widthFt = 0;
    let heightFt = 0;

    if (dimMatch) {
      widthFt = parseFloat(dimMatch[1]);
      heightFt = parseFloat(dimMatch[3]);
    } else if (rftMatch) {
      runningFeet = parseFloat(rftMatch[1]);
    } else if (numOnly) {
      if (session.application === "kitchen") runningFeet = parseFloat(numOnly[1]);
      else {
        widthFt = parseFloat(numOnly[1]);
        heightFt = 7;
      }
    }

    if (runningFeet > 0 || (widthFt > 0 && heightFt > 0)) {
      session.lastTopic = "quote";
      session.awaitingField = "sample_details";

      const isKitchen = session.application === "kitchen" || runningFeet > 0;
      const hasMetallic = session.selectedShades?.some((s) => s.toLowerCase().includes("metallic"));

      const quote = calculateEstimate({
        application: isKitchen ? "kitchen" : "wardrobe",
        productId: "acrylux",
        substrate: isKitchen ? "hdhmr" : "mdf",
        colorSeries: hasMetallic ? "metallic" : "solid",
        backer: "hips",
        kitchenLayout: "l-shape",
        runningFeet: runningFeet > 0 ? runningFeet : 15,
        widthFt: widthFt > 0 ? widthFt : 6,
        heightFt: heightFt > 0 ? heightFt : 7,
      });

      const appName = isKitchen
        ? `${runningFeet || 15} Running Feet Kitchen`
        : `${widthFt}x${heightFt} ft Wardrobe`;
      const shadesMention =
        session.selectedShades && session.selectedShades.length > 0
          ? ` (${session.selectedShades.join(", ")})`
          : "";

      return `Here is your direct-from-factory material estimate for **${appName}** 📊✨

• *Product*: 1mm ACRYLUX / ACRYMATTE${shadesMention}
• *Substrate Core*: 18mm ${quote.substrateName} (Calibrated)
• *Backer*: 1mm High-Impact Poly Styrene (HIPS)
• *Estimated Shutter Area*: ~${quote.totalSqFt} sq. ft.
• *Rate*: ₹${quote.baseRatePerSqFt} / sq. ft.
• *Material Cost*: ₹${quote.materialCost.toLocaleString("en-IN")}
• *Approx Sheets Required*: ~${quote.sheetsNeededApprox} sheets (8x4 ft)
• *Matching 1x23 ABS Edgeband*: ~48 meters included
• *GST (18%)*: ₹${quote.gstAmount.toLocaleString("en-IN")}
• *Total Estimate*: **₹${quote.finalTotal.toLocaleString("en-IN")}**

*(Savings vs On-Site PU Paint: ~₹${quote.savingsVsPUPaint.toLocaleString("en-IN")} with factory mirror finish & 10-yr warranty!)*

Would you like us to courier a complimentary 3-swatch physical Sample Box to your address so you can review these finishes in person? 📦😊`;
    }
  }

  // 6. Correction detection (e.g., "I asked for acrylic and not membrane", "not membrane", "no acrylic please")
  const isCorrectingMembrane =
    (query.includes("not") || query.includes("dont") || query.includes("don't") || query.includes("instead")) &&
    query.includes("membrane");

  const isAskingAcrylicExplicit =
    /a[rc]{2}ylic|acryl|akrylic|arcylic|acrylux|acrymatte|acryglass|acrysilk/i.test(query);

  const isAskingMembraneExplicit =
    /membrane|membrne|membran|shaker|fluted|reeded|thermoform/i.test(query) && !isCorrectingMembrane;

  const isAskingAluminum =
    /alumin|allumin|gola|ottimo|aerolinea|luminare|velaro|profile|t-patti|handle profile/i.test(query);

  const isAskingColors =
    /colou?r|shade|swatch|hue|tone|palette|finish|photo|pic|image|see|show/i.test(query);

  // Exact word match for sample / kit (preventing matching 'kitchen')
  const isAskingSamples =
    /\b(sample|samples|swatch box|sample box|courier|send me sample|send samples|get samples|yes samples|yes please)\b/i.test(
      query
    ) && !isAskingKitchen && !isAskingWardrobe;

  const isAskingFactory =
    /factory|plant|where|address|location|haryana|bahadurgarh|bangalore|bengaluru|delhi|mumbai|pune|hub/i.test(query);

  const isAskingPricing =
    /price|cost|rate|sqft|sq ft|how much|estimate|quote|rate card|discount/i.test(query);

  const isGreeting =
    /^(hi|hello|hey|namaste|good morning|good afternoon|good evening|hola|salaam)/i.test(query);

  const isThanks =
    /^(thanks|thank you|thx|great|awesome|perfect|super|got it|ok|okay)$/i.test(query);

  // 6. Correction detection (e.g., "I asked for acrylic and not membrane", "not membrane")
  if (isCorrectingMembrane) {
    session.lastTopic = "acrylic";
    queueImage(chatId, CATALOG_IMAGES.acrylux_solids_card.url, CATALOG_IMAGES.acrylux_solids_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrymatte_solids_card.url, CATALOG_IMAGES.acrymatte_solids_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrylux_wood_card.url, CATALOG_IMAGES.acrylux_wood_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrylux_metallics_card.url, CATALOG_IMAGES.acrylux_metallics_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acryglass_card.url, CATALOG_IMAGES.acryglass_card.caption);

    return `Ah, my apologies! Here are our official *SurajWood 2025 Acrylic Panels & Shade Cards* 💎✨

We manufacture 4 distinct surface collections (over 45+ European shades):

• *ACRYLUX (High Gloss Solids)*: 1302 White, 1305 Black, 1301 Red, 2304 Wine Red, 1303 Cream, 1318 Verde Gloss (New), 1319 Rosso Gloss (New), 1330 Designer White, 1323 Dark Grey, 1327 Turquoise, 1331 Feather Blue, 1332 Cobalt Blue, 1333 Sea Green, 1337 Cashmere
• *ACRYMATTE (Super Smooth Nano-Matte)*: 3302 White, 3305 Black, 3318 Verde, 3319 Rosso, 3325 Urban Grey, 3334 Royal Blue, 3335 Light Grey (Velvety anti-fingerprint)
• *Designs & Wood Grains*: 2320 Light Zebrano, 2321 Dark Zebrano, 2328 ELM Black, 2309 Brushed Aluminium, 2311 Textile, 2313 Copper Textile
• *ACRYLUX Metallics*: 2307 White Metallic, 1306 Metallic Grey, 1314 Metallic Blue, 1322 Anthrasite, 1338 Metallic Beige
• *ACRYGLASS UNO (2mm Polymer Glass)*: 402/302 White, 403/303 Cream, 415/315 Beige, 418/318 Sea Green, 423/323 Dark Grey (with 45° chamfered edges)

*(I've shared the official 2025 Shade Card pages above 📸)*

Are you planning kitchen or wardrobe shutters? Let me know which shade codes or finishes catch your eye! 😊`;
  }

  // 7. Explicit Acrylic Inquiries (Colors, Finishes, Specs, Pictures)
  if (isAskingAcrylicExplicit) {
    session.lastTopic = "acrylic";
    queueImage(chatId, CATALOG_IMAGES.acrylux_solids_card.url, CATALOG_IMAGES.acrylux_solids_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrymatte_solids_card.url, CATALOG_IMAGES.acrymatte_solids_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrylux_wood_card.url, CATALOG_IMAGES.acrylux_wood_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrylux_metallics_card.url, CATALOG_IMAGES.acrylux_metallics_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acryglass_card.url, CATALOG_IMAGES.acryglass_card.caption);

    return `Here are our official *SurajWood 2025 Acrylic Panels & Shade Cards* 💎✨

We manufacture 4 distinct surface collections (over 45+ European shades):

• *ACRYLUX (High Gloss Solids)*: 1302 White, 1305 Black, 1301 Red, 2304 Wine Red, 1303 Cream, 1318 Verde Gloss (New), 1319 Rosso Gloss (New), 1330 Designer White, 1323 Dark Grey, 1327 Turquoise, 1331 Feather Blue, 1332 Cobalt Blue, 1333 Sea Green, 1337 Cashmere
• *ACRYMATTE (Super Smooth Nano-Matte)*: 3302 White, 3305 Black, 3318 Verde, 3319 Rosso, 3325 Urban Grey, 3334 Royal Blue, 3335 Light Grey (Velvety anti-fingerprint)
• *Designs & Wood Grains*: 2320 Light Zebrano, 2321 Dark Zebrano, 2328 ELM Black, 2309 Brushed Aluminium, 2311 Textile, 2313 Copper Textile
• *ACRYLUX Metallics*: 2307 White Metallic, 1306 Metallic Grey, 1314 Metallic Blue, 1322 Anthrasite, 1338 Metallic Beige
• *ACRYGLASS UNO (2mm Polymer Glass)*: 402/302 White, 403/303 Cream, 415/315 Beige, 418/318 Sea Green, 423/323 Dark Grey (with 45° chamfered edges)

*(I've shared the official 2025 Shade Card pages above 📸)*

Are you designing a kitchen, wardrobe, or vanity? Let me know which shade codes you like or if you'd like physical samples! 😊`;
  }

  // 8. Explicit Membrane Shutters & Colors
  if (isAskingMembraneExplicit) {
    session.lastTopic = "membrane";
    queueImage(chatId, CATALOG_IMAGES.membrane_woodgrain.url, CATALOG_IMAGES.membrane_woodgrain.caption);
    queueImage(chatId, CATALOG_IMAGES.membrane_reed_green.url, CATALOG_IMAGES.membrane_reed_green.caption);
    queueImage(chatId, CATALOG_IMAGES.membrane_parisian_blue.url, CATALOG_IMAGES.membrane_parisian_blue.caption);
    queueImage(chatId, CATALOG_IMAGES.membrane_alpin_white.url, CATALOG_IMAGES.membrane_alpin_white.caption);
    queueImage(chatId, CATALOG_IMAGES.membrane_shaker.url, CATALOG_IMAGES.membrane_shaker.caption);

    return `Here is our *Continental 3D Membrane Shutter* color collection (36 European shades) 🚪✨

• *Wood Grain (WG)*: Natural synchronized timber grains (*Artisan Oak Nature 030-WG, Wotan Eiche 032-WG, Nussbaum Columbia 035-WG, Pino Aurelo 028-WG*)
• *Porcelain Touch (PT)*: Velvety ultra-matte (*Alpin Weiß 008-PT, Parisian Blue 017-PT, Fjord Blue 016-PT, Indigo 019-PT, Denim 018-PT, Stone Grey 014-PT, Black 020-PT*)
• *Perfect Silk (PS)*: Soft-sheen silk solids (*Reed Green 004-PS, Estate Green 005-PS, Frost White 001-PS, Kaschmir 002-PS, Rusty Red 003-PS*)
• *Ceramic Satin (CS)*: Mineral textured satins (*Kaschmir 021-CS, Dakar 023-CS, Stone Grey 024-CS*)

All pressed on 18mm HDMR with seamless 3D wrap — 100% moisture sealed edges with zero edge-banding seams! Profiles available in Seamless Shaker (5-piece look), 3D Fluted, and Handleless J-Groove.

Would you like to see sample swatches of these shades? 😊`;
  }

  // 9. Handle Aluminum Profiles
  if (isAskingAluminum) {
    session.lastTopic = "aluminum";
    queueImage(chatId, CATALOG_IMAGES.ottimo.url, CATALOG_IMAGES.ottimo.caption);
    queueImage(chatId, CATALOG_IMAGES.aerolinea.url, CATALOG_IMAGES.aerolinea.caption);
    queueImage(chatId, CATALOG_IMAGES.luminare.url, CATALOG_IMAGES.luminare.caption);
    queueImage(chatId, CATALOG_IMAGES.velaro.url, CATALOG_IMAGES.velaro.caption);

    return `Here is our *AL-PROFHAN Aluminum Profiles & Hardware Ecosystem* (6063-T5 Architectural Alloy, 3m lengths) 🌟

• *Ottimo Series*: Integrated Gola & Profile Handles (L, C & Wall Gola profiles with gasket)
• *Aerolinea Series*: Slim-line architectural frames for glass shutters & T-patti edge profiles
• *Luminare Series*: 45° & Flat LED Integrated Lighting Profiles with frosted diffusers
• *Velaro Series*: Luxury sliding & fixed glass shutter systems (Champagne, Black Brush, Bronze Brush, Coffee Painted)

Which profile series would you like specifications or samples for? 😊`;
  }

  // 10. Handle Sample Kit Request
  if (isAskingSamples) {
    session.lastTopic = "sample";
    session.awaitingField = "sample_details";

    const finishesPref =
      session.selectedShades && session.selectedShades.length > 0
        ? session.selectedShades.join(", ")
        : "e.g., Acrylux 1302 White, Acrymatte 3325 Urban Grey, 2307 White Metallic";

    return `We'd love to dispatch a complimentary 3-swatch physical Acrylic / Membrane Sample Box to you! 📦✨

Please share your shipping details:
• *Your Name*
• *City*
• *Firm / Studio Name* (if applicable)
• *Full Delivery Address (including PIN code)*
• *Phone Number*
• *Preferred Finishes* (${finishesPref})

We'll dispatch your box via express courier within 48 hours! 🚚`;
  }

  // 11. Handle Factory / Locations
  if (isAskingFactory) {
    session.lastTopic = "factory";
    return `Here are our manufacturing plant and distribution hubs 🏭

• *Primary Manufacturing Facility & Hub*:
  45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501
• *South India Regional Hub*: Bangalore, Karnataka
• *North & West Regional Hubs*: Delhi NCR, Mumbai & Pune
• *Pan-India Dispatch*: Fast 48 to 72 Hours for cut-to-size shutters and full panels

Would you like to schedule a visit or request physical samples? 😊`;
  }

  // 12. Handle Price / Quote Overview
  if (isAskingPricing) {
    session.lastTopic = "quote";
    return `Here is an overview of our direct-from-factory pricing 📊✨

• *Continental 3D Membrane Shutters*: ₹230 – ₹240 / sq. ft. (18mm HDMR with seamless wrap)
• *ACRYLUX & ACRYMATTE (1mm)*: ₹340 – ₹360 / sq. ft. on HDHMR/MDF (Solid) | ₹370 – ₹390 / sq. ft. (Metallic)
• *ACRYGLASS UNO (1.5mm & 2mm)*: ₹380 – ₹600 / sq. ft. (Solid crystal polymer glass)
• *AL-PROFHAN Aluminum Profiles*: Gola, LED & glass shutter systems in 3-meter lengths

Share your kitchen running feet or wardrobe dimensions, and I'll calculate an exact estimate with GST and sheet count for you! 😊`;
  }

  // 13. Follow-up Color Request based on active topic
  if (isAskingColors) {
    if (session.lastTopic === "membrane") {
      queueImage(chatId, CATALOG_IMAGES.membrane_woodgrain.url, CATALOG_IMAGES.membrane_woodgrain.caption);
      queueImage(chatId, CATALOG_IMAGES.membrane_reed_green.url, CATALOG_IMAGES.membrane_reed_green.caption);
      queueImage(chatId, CATALOG_IMAGES.membrane_parisian_blue.url, CATALOG_IMAGES.membrane_parisian_blue.caption);
      queueImage(chatId, CATALOG_IMAGES.membrane_alpin_white.url, CATALOG_IMAGES.membrane_alpin_white.caption);

      return `Here are our *Continental Membrane Shutter* colors (36 European shades) 🚪✨
• *Wood Grain (WG)*: Artisan Oak Nature 030-WG, Wotan Eiche 032-WG, Nussbaum Columbia 035-WG
• *Porcelain Touch (PT)*: Alpin Weiß 008-PT, Parisian Blue 017-PT, Fjord Blue 016-PT, Indigo 019-PT
• *Perfect Silk (PS)*: Reed Green 004-PS, Estate Green 005-PS, Frost White 001-PS
• *Ceramic Satin (CS)*: Kaschmir 021-CS, Dakar 023-CS

*(Swatches sent above 📸)* Would you like physical samples? 😊`;
    }

    // Default to Acrylic Colors
    session.lastTopic = "acrylic";
    queueImage(chatId, CATALOG_IMAGES.acrylux_solids_card.url, CATALOG_IMAGES.acrylux_solids_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrymatte_solids_card.url, CATALOG_IMAGES.acrymatte_solids_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrylux_wood_card.url, CATALOG_IMAGES.acrylux_wood_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acrylux_metallics_card.url, CATALOG_IMAGES.acrylux_metallics_card.caption);
    queueImage(chatId, CATALOG_IMAGES.acryglass_card.url, CATALOG_IMAGES.acryglass_card.caption);

    return `Here are our official *SurajWood 2025 Acrylic Panels & Shade Cards* 💎✨
• *ACRYLUX High Gloss*: 1302 White, 1305 Black, 1301 Red, 2304 Wine Red, 1318 Verde Gloss (New), 1330 Designer White, 1327 Turquoise
• *ACRYMATTE Super Smooth*: 3302 White, 3305 Black, 3318 Verde, 3319 Rosso, 3325 Urban Grey, 3334 Royal Blue, 3335 Light Grey
• *Designs & Wood Grains*: 2320 Light Zebrano, 2321 Dark Zebrano, 2328 ELM Black, 2309 Brushed Aluminium
• *ACRYLUX Metallics*: 2307 White Metallic, 1306 Metallic Grey, 1314 Metallic Blue, 1322 Anthrasite
• *ACRYGLASS 2mm*: 402/302 White, 403/303 Cream, 418/318 Sea Green, 423/323 Dark Grey

*(Official 2025 Shade Card pages sent above 📸)* Which finish or shade code fits your design best? 😊`;
  }

  // Handle Thanks / Appreciation
  if (isThanks) {
    return "You're most welcome! 😊 Feel free to ask whenever you need shade swatches, pricing estimates, or sample boxes for your project.";
  }

  // Handle Greetings / General
  return `Hello${senderName ? ` ${senderName}` : ""}! 👋 Welcome to *Suraj Wood Products*.

We manufacture:
• *1mm & 2mm Acrylic Panels & Sheets* (Acrylux Mirror Gloss, Acrymatte Velvet, Acryglass Crystal)
• *Continental 3D Membrane Shutters* (36 European colors, Shaker & Fluted profiles)
• *AL-PROFHAN Aluminum Profiles* (Gola handles, LED lighting profiles)

How can I assist you with your project today? 😊`;
}

/**
 * Process message using OpenRouter API (OpenAI format with tool calling)
 */
async function processWithOpenRouter(
  chatId: string,
  userText: string,
  senderName?: string
): Promise<string> {
  const apiKey = CONFIG.openRouterApiKey;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured in .env");
  }

  const systemPrompt = getSystemPrompt();
  const session = getOrCreateSession(chatId);

  const userContent = senderName
    ? `[From: ${senderName}] ${userText}`
    : userText;

  session.history.push({
    role: "user",
    content: userContent,
  });

  if (session.history.length > MAX_HISTORY) {
    session.history = session.history.slice(session.history.length - MAX_HISTORY);
  }

  const messages: any[] = [
    { role: "system", content: systemPrompt },
    ...session.history.map((h) => ({
      role: h.role,
      content: h.content,
      ...(h.tool_calls ? { tool_calls: h.tool_calls } : {}),
      ...(h.tool_call_id ? { tool_call_id: h.tool_call_id } : {}),
      ...(h.name ? { name: h.name } : {}),
    })),
  ];

  let iterations = 0;
  const maxIterations = 5;
  const candidateModels = [
    CONFIG.openRouterModel || "openrouter/free",
    "nex-agi/nex-n2.5-pro:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
  ];

  while (iterations < maxIterations) {
    iterations++;
    let data: any = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "https://surajwood.com",
            "X-Title": "SurajWood WhatsApp Assistant",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages,
            tools: OPENROUTER_TOOLS,
          }),
        });

        if (res.ok) {
          data = await res.json();
          break;
        } else {
          const errText = await res.text();
          lastError = new Error(`OpenRouter API error (${res.status} on ${model}): ${errText}`);
          if (res.status === 429) {
            await new Promise((r) => setTimeout(r, 1000));
            continue;
          }
        }
      } catch (fetchErr) {
        lastError = fetchErr;
      }
    }

    if (!data) {
      throw lastError || new Error("Failed to get response from all OpenRouter models");
    }

    const choice = data?.choices?.[0];
    if (!choice) {
      throw new Error("No response choices from OpenRouter");
    }

    const message = choice.message;

    // Check for tool calls
    if (message.tool_calls && message.tool_calls.length > 0) {
      messages.push(message);

      for (const toolCall of message.tool_calls) {
        const fnName = toolCall.function?.name;
        let fnArgs = {};
        try {
          fnArgs = JSON.parse(toolCall.function?.arguments || "{}");
        } catch {
          fnArgs = {};
        }

        const toolResult = await executeTool(fnName, fnArgs, chatId);

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: fnName,
          content: toolResult,
        });
      }
      continue;
    }

    const replyText = formatForWhatsApp((message.content || "").trim());

    // Store in session history
    session.history.push({
      role: "assistant",
      content: replyText,
    });

    return replyText;
  }

  return getSmartFallbackResponse(chatId, userText, senderName);
}

/**
 * Process message using Anthropic Claude
 */
async function processWithAnthropic(
  chatId: string,
  userText: string,
  senderName?: string
): Promise<string> {
  const client = getAnthropicClient();
  const systemPrompt = getSystemPrompt();
  const session = getOrCreateSession(chatId);

  const userContent = senderName
    ? `[From: ${senderName}] ${userText}`
    : userText;

  session.history.push({
    role: "user",
    content: userContent,
  });

  if (session.history.length > MAX_HISTORY) {
    session.history = session.history.slice(session.history.length - MAX_HISTORY);
  }

  let messages: Anthropic.MessageParam[] = session.history.map((h) => ({
    role: h.role as "user" | "assistant",
    content: h.content,
  }));

  let response = await client.messages.create({
    model: CONFIG.anthropicModel,
    max_tokens: 1500,
    system: systemPrompt,
    tools: CLAUDE_TOOLS,
    messages,
  });

  while (response.stop_reason === "tool_use") {
    const toolUseBlocks = response.content.filter(
      (b) => b.type === "tool_use"
    ) as Anthropic.ToolUseBlock[];

    if (toolUseBlocks.length === 0) break;

    messages.push({
      role: "assistant",
      content: response.content,
    });

    const toolResultBlocks: Anthropic.ToolResultBlockParam[] = [];
    for (const toolBlock of toolUseBlocks) {
      const resultStr = await executeTool(
        toolBlock.name,
        toolBlock.input,
        chatId
      );
      toolResultBlocks.push({
        type: "tool_result",
        tool_use_id: toolBlock.id,
        content: resultStr,
      });
    }

    messages.push({
      role: "user",
      content: toolResultBlocks,
    });

    response = await client.messages.create({
      model: CONFIG.anthropicModel,
      max_tokens: 1500,
      system: systemPrompt,
      tools: CLAUDE_TOOLS,
      messages,
    });
  }

  const textBlocks = response.content.filter(
    (b) => b.type === "text"
  ) as Anthropic.TextBlock[];
  const rawReplyText = textBlocks.map((b) => b.text).join("\n\n").trim();
  const replyText = formatForWhatsApp(rawReplyText);

  session.history.push({
    role: "assistant",
    content: replyText,
  });

  return replyText;
}

let onlineRateLimitedUntil = 0;

/**
 * Universal Entry Point for WhatsApp Messages
 */
export async function processUserMessage(
  chatId: string,
  userText: string,
  senderName?: string
): Promise<{ text: string; images: { url: string; caption: string }[] }> {
  try {
    let replyText = "";
    const isOnlineAvailable = Date.now() > onlineRateLimitedUntil;

    if (isOnlineAvailable && CONFIG.openRouterApiKey) {
      try {
        console.log(`[AIAgent] Processing message with OpenRouter model: ${CONFIG.openRouterModel}`);
        replyText = await processWithOpenRouter(chatId, userText, senderName);
      } catch (orErr: any) {
        if (orErr?.message?.includes("429") || orErr?.message?.includes("Rate limit")) {
          console.warn("[AIAgent] OpenRouter rate limited (429). Enabling 5-minute local smart engine circuit breaker.");
          onlineRateLimitedUntil = Date.now() + 5 * 60 * 1000;
        }
        throw orErr;
      }
    } else if (isOnlineAvailable && CONFIG.anthropicApiKey) {
      try {
        console.log(`[AIAgent] Processing message with Anthropic Claude model: ${CONFIG.anthropicModel}`);
        replyText = await processWithAnthropic(chatId, userText, senderName);
      } catch (antErr: any) {
        if (antErr?.message?.includes("credit balance is too low") || antErr?.message?.includes("429")) {
          console.warn("[AIAgent] Anthropic account quota exceeded. Enabling 5-minute local smart engine circuit breaker.");
          onlineRateLimitedUntil = Date.now() + 5 * 60 * 1000;
        }
        throw antErr;
      }
    } else {
      replyText = getSmartFallbackResponse(chatId, userText, senderName);
    }

    // Ensure any requested shade swatches are always queued
    const requestedShades = findRequestedShades(userText);
    if (requestedShades.length > 0) {
      for (const s of requestedShades) {
        queueImage(chatId, s.imageUrl, s.caption);
      }
    }

    // Retrieve any images queued during tool execution or fallback
    const images = popPendingImages(chatId);

    return {
      text: formatForWhatsApp(replyText),
      images,
    };
  } catch (error: any) {
    console.error(`[AIAgent] Error processing message for ${chatId}:`, error?.response?.data || error?.message || error);

    // If online providers fail, immediately invoke smart local fallback with full photo queue!
    const fallbackText = getSmartFallbackResponse(chatId, userText, senderName);
    const images = popPendingImages(chatId);

    return {
      text: formatForWhatsApp(fallbackText),
      images,
    };
  }
}
