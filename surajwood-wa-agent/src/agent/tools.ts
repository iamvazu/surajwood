import Anthropic from "@anthropic-ai/sdk";
import { calculateEstimate, EstimateInput } from "../services/costCalculator";
import { saveLead } from "../services/leadStore";
import { SURAJWOOD_CATALOG } from "../knowledge/catalog";

export const CLAUDE_TOOLS: Anthropic.Tool[] = [
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
          description: "List of requested finishes or colors (e.g. Acrylux Gloss, Acrymatte Sage, Fluted Membrane)",
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
