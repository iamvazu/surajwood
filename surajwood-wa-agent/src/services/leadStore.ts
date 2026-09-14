import fs from "fs";
import path from "path";

export interface LeadRecord {
  id: string;
  timestamp: string;
  senderPhone: string;
  senderName?: string;
  userType?: string; // Architect, Interior Designer, OEM, Contractor, Homeowner
  city?: string;
  inquiryType: "quote" | "sample_box" | "technical" | "general";
  details: Record<string, any>;
  status: "new" | "contacted" | "dispatched" | "closed";
}

const LEADS_FILE = path.resolve("./data/leads.json");

function ensureFileExists() {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export function saveLead(lead: Omit<LeadRecord, "id" | "timestamp" | "status">): LeadRecord {
  ensureFileExists();
  const raw = fs.readFileSync(LEADS_FILE, "utf-8");
  let leads: LeadRecord[] = [];
  try {
    leads = JSON.parse(raw);
  } catch (e) {
    leads = [];
  }

  const newRecord: LeadRecord = {
    id: `LEAD-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: "new",
    ...lead,
  };

  leads.unshift(newRecord);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return newRecord;
}

export function getRecentLeads(limit = 20): LeadRecord[] {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads: LeadRecord[] = JSON.parse(raw);
    return leads.slice(0, limit);
  } catch (e) {
    return [];
  }
}
