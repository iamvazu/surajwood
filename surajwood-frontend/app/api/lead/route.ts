import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const leadSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  company: z.string().optional(),
  user_type: z.string().optional(),
  product_interest: z.union([z.string(), z.array(z.string())]).optional(),
  inquiry_type: z.string().optional(),
  message: z.string().optional(),
  city: z.string().optional(),
  source_page: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  // Honeypot: must be empty — bots typically fill this
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type LeadPayload = Omit<z.infer<typeof leadSchema>, "honeypot">;

// ---------------------------------------------------------------------------
// POST /api/lead
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // -----------------------------------------------------------------------
    // Parse + validate
    // -----------------------------------------------------------------------
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.issues,
        },
        { status: 400 }
      );
    }

    // Destructure out the honeypot — never forward it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { honeypot, ...leadData } = result.data;

    // -----------------------------------------------------------------------
    // Forward to Perfex CRM if configured
    // -----------------------------------------------------------------------
    const perfexUrl = process.env.PERFEX_API_URL;
    const perfexKey = process.env.PERFEX_API_KEY;

    if (perfexUrl && perfexKey) {
      try {
        // Normalise product_interest to an array — Perfex controller expects array
        const productInterestArray = Array.isArray(leadData.product_interest)
          ? leadData.product_interest
          : leadData.product_interest
          ? [leadData.product_interest]
          : [];

        const perfexResponse = await fetch(perfexUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": perfexKey,
          },
          // Send exactly what Perfex Website_leads controller expects (top-level fields)
          body: JSON.stringify({
            full_name: leadData.full_name,
            email: leadData.email,
            phone: leadData.phone,
            company: leadData.company ?? "",
            user_type: leadData.user_type ?? "",
            product_interest: productInterestArray,
            inquiry_type: leadData.inquiry_type ?? "Other",
            city: leadData.city ?? "",
            message: leadData.message ?? "",
            source_page: leadData.source_page ?? "",
            utm_source: leadData.utm_source ?? "",
            utm_medium: leadData.utm_medium ?? "",
            utm_campaign: leadData.utm_campaign ?? "",
            consent: true, // validated client-side; forwarding as true
            honeypot: "",  // already blocked above
          }),
          signal: AbortSignal.timeout(5000),
        });

        if (!perfexResponse.ok) {
          console.error(
            "Perfex CRM error:",
            perfexResponse.status,
            await perfexResponse.text()
          );
        }
      } catch (crmError) {
        // CRM unavailability must never surface as an error to the user
        console.error("Perfex CRM submission failed:", crmError);
      }
    }

    // -----------------------------------------------------------------------
    // Local logging (replace with DB write / email notification as needed)
    // -----------------------------------------------------------------------
    console.log("[SurajWood] New lead received:", JSON.stringify(leadData as LeadPayload, null, 2));

    // -----------------------------------------------------------------------
    // Success
    // -----------------------------------------------------------------------
    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch (error) {
    console.error("Lead API unhandled error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
