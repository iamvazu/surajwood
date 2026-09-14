import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const CONFIG = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
  anthropicModel: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022",
  adminNumbers: (process.env.ADMIN_WHATSAPP_NUMBERS || "919009171819@c.us")
    .split(",")
    .map((num) => num.trim())
    .filter(Boolean),
  port: parseInt(process.env.PORT || "3005", 10),
  sessionDataPath: path.resolve(process.env.SESSION_DATA_PATH || "./data/session"),
  debounceDelayMs: parseInt(process.env.DEBOUNCE_DELAY_MS || "4000", 10),
  humanTakeoverMinutes: parseInt(process.env.HUMAN_TAKEOVER_MINUTES || "45", 10),
  companyName: "Suraj Wood Products Pvt. Ltd.",
  companyLocation: "Indore, Madhya Pradesh, India",
  dispatchTime: "48 - 72 Hours Pan-India",
  primaryContact: "+91 90091 71819",
  websiteUrl: "https://surajwood.com",
};
