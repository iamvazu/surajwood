/**
 * Perfex CRM submission helper for SurajWood.
 * Provides a typed submitLead() function that POSTs to /api/lead,
 * which in turn forwards to the Perfex CRM instance.
 */

export interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  user_type?: string;
  product_interest?: string | string[];
  inquiry_type?: string;
  message?: string;
  city?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** Honeypot — must be left empty; bots typically fill it */
  honeypot?: string;
}

export interface LeadResponse {
  success: boolean;
  leadId?: string;
  message: string;
  error?: string;
}

/**
 * Submit a lead form to the /api/lead route.
 * Handles network errors gracefully — always returns a LeadResponse.
 */
export async function submitLead(data: LeadFormData): Promise<LeadResponse> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Attempt to parse JSON; if the server returns non-JSON, handle gracefully
    let result: LeadResponse;
    try {
      result = (await response.json()) as LeadResponse;
    } catch {
      result = {
        success: false,
        message: response.ok
          ? "Request completed but response was not JSON."
          : `Server error ${response.status}.`,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
      error: String(error),
    };
  }
}

/**
 * Helper to collect UTM params from the current URL (client-side only).
 * Returns an object with utm_source, utm_medium, utm_campaign fields.
 */
export function getUtmParams(): Pick<
  LeadFormData,
  "utm_source" | "utm_medium" | "utm_campaign"
> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
  };
}
