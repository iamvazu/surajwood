import Anthropic from "@anthropic-ai/sdk";
import { calculateEstimate, EstimateInput } from "../services/costCalculator";
import { saveLead } from "../services/leadStore";
import { SURAJWOOD_CATALOG, CATALOG_IMAGES, ALUMINUM_SERIES } from "../knowledge/catalog";
import { findRequestedShades } from "../knowledge/shades";

// In-memory queue of pending images to send per chat
const pendingImagesMap = new Map<string, { url: string; caption: string }[]>();

export function getPendingImages(chatId: string): { url: string; caption: string }[] {
  return pendingImagesMap.get(chatId) || [];
}

export function popPendingImages(chatId: string): { url: string; caption: string }[] {
  const images = pendingImagesMap.get(chatId) || [];
  pendingImagesMap.delete(chatId);
  return images;
}

export function queueImage(chatId: string, url: string, caption: string) {
  const list = pendingImagesMap.get(chatId) || [];
  if (!list.some((img) => img.url === url)) {
    list.push({ url, caption });
  }
  pendingImagesMap.set(chatId, list);
}

export const CLAUDE_TOOLS: Anthropic.Tool[] = [
  {
    name: "send_catalog_photos",
    description:
      "Sends official high-resolution product photos, shade swatches, and finish catalogs directly to the customer on WhatsApp. Use this whenever the customer asks to see pictures, specific shade codes/colors (e.g., '1302', '3325', '2307', 'White Metallic', 'Urban Grey'), designs, finishes, aluminum profiles, or product options.",
    input_schema: {
      type: "object",
      properties: {
        productIds: {
          type: "array",
          items: {
            type: "string",
          },
          description: "List of shade codes (e.g. '1302', '3325', '2307', '030-WG') or product category IDs ('acrylux', 'acrymatte', 'acryglass', 'membrane', 'ottimo', 'aerolinea', 'luminare', 'velaro') to send photos of.",
        },
      },
      required: ["productIds"],
    },
  },
  {
    name: "calculate_quote",
    description:
      "Calculates the estimated material cost, edgebanding, square footage, sheets needed, and GST for a kitchen, wardrobe, or wall panel project using SurajWood 2026 pricing.",
    input_schema: {
      type: "object",
      properties: {
        application: {
          type: "string",
          enum: ["kitchen", "wardrobe", "wall-panel"],
          description: "Type of joinery application",
        },
        productId: {
          type: "string",
          enum: [
            "acrylux",
            "acrymatte",
            "acrysilk",
            "acryglass-uno-15",
            "acryglass-uno-20",
            "acryglass-20",
            "uno-10",
            "membrane-shutters",
          ],
          description: "Product identifier",
        },
        substrate: {
          type: "string",
          enum: ["hdhmr", "mdf", "birch", "bwp"],
          description: "Core substrate board",
        },
        colorSeries: {
          type: "string",
          enum: ["solid", "metallic"],
          description: "Solid or metallic/sparkle color series",
        },
        backer: {
          type: "string",
          enum: ["hips", "bsl", "melamine"],
          description: "Backer option: hips (standard 1mm), bsl (both side acrylic), melamine",
        },
        kitchenLayout: {
          type: "string",
          enum: ["l-shape", "parallel", "u-shape", "straight", "island"],
          description: "Kitchen layout type",
        },
        runningFeet: {
          type: "number",
          description: "Running feet length of the kitchen counters",
        },
        hasLoft: {
          type: "boolean",
          description: "Whether overhead ceiling lofts are included",
        },
        widthFt: {
          type: "number",
          description: "Width in feet for wardrobe or wall panel",
        },
        heightFt: {
          type: "number",
          description: "Height in feet for wardrobe or wall panel",
        },
      },
      required: ["application", "productId", "substrate"],
    },
  },
  {
    name: "request_sample_kit",
    description:
      "Registers an architect, interior designer, OEM or homeowner for a complimentary 3-swatch physical Acrylic Sample Box delivered by courier.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name of the contact" },
        firmOrStudio: { type: "string", description: "Architecture firm or company name" },
        userType: {
          type: "string",
          enum: ["Architect", "Interior Designer", "OEM Manufacturer", "Contractor", "Homeowner"],
          description: "Role of the inquirer",
        },
        city: { type: "string", description: "City for delivery" },
        fullAddress: { type: "string", description: "Courier shipping address including PIN code" },
        pincode: { type: "string", description: "6-digit postal code" },
        phone: { type: "string", description: "Contact phone number" },
        requestedFinishes: {
          type: "array",
          items: { type: "string" },
          description: "List of requested finishes or colors (e.g. Acrylux Gloss, Acrymatte Sage, Fluted Membrane, Ottimo Profile)",
        },
      },
      required: ["name", "city", "phone"],
    },
  },
  {
    name: "request_human_handover",
    description:
      "Flags the current chat conversation for priority human intervention by SurajWood senior technical sales executive.",
    input_schema: {
      type: "object",
      properties: {
        reason: { type: "string", description: "Why human intervention is requested" },
        customerName: { type: "string", description: "Customer name if known" },
        customerCity: { type: "string", description: "Customer city if known" },
        urgency: { type: "string", enum: ["normal", "high", "urgent"] },
      },
      required: ["reason"],
    },
  },
];

export async function executeTool(
  toolName: string,
  args: any,
  senderPhone: string
): Promise<string> {
  switch (toolName) {
    case "send_catalog_photos": {
      const rawProductIds: string[] = args.productIds || [];
      const dispatched: string[] = [];

      for (const raw of rawProductIds) {
        const query = raw.toLowerCase().trim();

        // 1. Check if specific shade swatches are requested (e.g., '1302', '3325', '2307', 'White Metallic', 'Urban Grey')
        const specificShades = findRequestedShades(raw);
        if (specificShades.length > 0) {
          for (const s of specificShades) {
            queueImage(senderPhone, s.imageUrl, s.caption);
            dispatched.push(`${s.code} ${s.name}`);
          }
          continue;
        }

        let matchedKeys: string[] = [];

        if ((query.includes("acrylic") || query.includes("arcylic") || query.includes("acryl") || query.includes("panel")) && (query.includes("color") || query.includes("shade") || query.includes("swatch") || query.includes("card") || query.includes("pic") || query.includes("photo") || query.includes("finish"))) {
          matchedKeys.push("acrylux_solids_card", "acrymatte_solids_card", "acrylux_wood_card", "acrylux_metallics_card", "acryglass_card");
        } else if (query.includes("membrane") && (query.includes("color") || query.includes("shade") || query.includes("swatch") || query.includes("finish") || query.includes("pic") || query.includes("photo"))) {
          matchedKeys.push("membrane_woodgrain", "membrane_reed_green", "membrane_parisian_blue", "membrane_alpin_white");
        } else if (query.includes("membrane") || query.includes("shaker") || query.includes("fluted")) {
          matchedKeys.push("membrane_shaker", "membrane_fluted", "membrane_woodgrain");
        } else if (query.includes("ottimo")) matchedKeys.push("ottimo");
        else if (query.includes("aerolinea")) matchedKeys.push("aerolinea");
        else if (query.includes("luminare") || query.includes("led")) matchedKeys.push("luminare");
        else if (query.includes("velaro")) matchedKeys.push("velaro");
        else if (query.includes("aluminum") || query.includes("profile")) matchedKeys.push("ottimo", "aerolinea", "luminare", "velaro");
        else if (query.includes("acrylux") || query.includes("gloss")) matchedKeys.push("acrylux_solids_card", "acrylux_metallics_card");
        else if (query.includes("acrymatte") || query.includes("matte")) matchedKeys.push("acrymatte_solids_card");
        else if (query.includes("acryglass") || query.includes("glass")) matchedKeys.push("acryglass_card");
        else if (query.includes("acrysilk") || query.includes("silk")) matchedKeys.push("acrysilk_card");
        else if (query.includes("acrylic") || query.includes("arcylic") || query.includes("acryl") || query.includes("panel")) matchedKeys.push("acrylux_solids_card", "acrymatte_solids_card", "acryglass_card");
        else if (CATALOG_IMAGES[query]) matchedKeys.push(query);

        // Deduplicate
        matchedKeys = Array.from(new Set(matchedKeys));

        for (const key of matchedKeys) {
          const item = CATALOG_IMAGES[key];
          if (item) {
            queueImage(senderPhone, item.url, item.caption);
            dispatched.push(item.title);
          }
        }
      }

      // Default fallback if no specific match
      if (dispatched.length === 0) {
        const defaultItems = [CATALOG_IMAGES.acrylux, CATALOG_IMAGES.acrylic_arctic_white, CATALOG_IMAGES.membrane_shaker];
        for (const item of defaultItems) {
          queueImage(senderPhone, item.url, item.caption);
          dispatched.push(item.title);
        }
      }

      return JSON.stringify({
        status: "success",
        message: `Photos queued for sending: ${dispatched.join(", ")}`,
        dispatchedCount: dispatched.length,
      });
    }

    case "calculate_quote": {
      const result = calculateEstimate(args as EstimateInput);
      saveLead({
        senderPhone,
        inquiryType: "quote",
        details: { input: args, result },
      });
      return JSON.stringify(result, null, 2);
    }

    case "request_sample_kit": {
      const record = saveLead({
        senderPhone,
        senderName: args.name,
        userType: args.userType || "Architect",
        city: args.city,
        inquiryType: "sample_box",
        details: args,
      });
      return JSON.stringify({
        status: "success",
        message: `Sample kit request recorded successfully with ID: ${record.id}`,
        details: args,
      });
    }

    case "request_human_handover": {
      saveLead({
        senderPhone,
        senderName: args.customerName,
        city: args.customerCity,
        inquiryType: "technical",
        details: args,
      });
      return JSON.stringify({
        status: "handed_over",
        message: "Escalated to human technical desk. A regional engineer will review.",
      });
    }

    default:
      return JSON.stringify({ error: `Unknown tool ${toolName}` });
  }
}
