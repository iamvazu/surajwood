import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// POST /api/revalidate
//
// Webhook called by Sanity (via the surajwood-crm-bridge plugin) whenever
// content is published or updated.  The secret must match SANITY_REVALIDATION_SECRET.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const { secret, type, slug } = (await request.json()) as {
      secret?: string;
      type?: string;
      slug?: string;
    };

    // -----------------------------------------------------------------------
    // Auth check
    // -----------------------------------------------------------------------
    if (!process.env.SANITY_REVALIDATION_SECRET) {
      console.warn("SANITY_REVALIDATION_SECRET is not set — revalidation endpoint is disabled.");
      return NextResponse.json({ message: "Revalidation not configured" }, { status: 503 });
    }

    if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // -----------------------------------------------------------------------
    // Revalidation logic
    // -----------------------------------------------------------------------
    const revalidated: string[] = [];

    switch (type) {
      case "product": {
        // Revalidate the specific product page and the homepage (which shows
        // a product grid / featured products section).
        if (slug) {
          revalidatePath(`/products/${slug}`);
          revalidated.push(`/products/${slug}`);
        }
        revalidatePath("/");
        revalidated.push("/");
        break;
      }

      case "post": {
        // Blog post and blog index both need refreshing.
        if (slug) {
          revalidatePath(`/blog/${slug}`);
          revalidated.push(`/blog/${slug}`);
        }
        revalidatePath("/blog");
        revalidatePath("/");
        revalidated.push("/blog", "/");
        break;
      }

      case "testimonial": {
        // Testimonials appear on the homepage.
        revalidatePath("/");
        revalidated.push("/");
        break;
      }

      case "faq": {
        // FAQs can appear on product pages and the FAQ page.
        if (slug) {
          revalidatePath(`/products/${slug}`);
          revalidated.push(`/products/${slug}`);
        }
        revalidatePath("/faq");
        revalidated.push("/faq");
        break;
      }

      case "all": {
        // Nuclear option — revalidates the full layout tree.
        revalidatePath("/", "layout");
        revalidated.push("all paths");
        break;
      }

      default: {
        // Unknown type — safe fallback: revalidate the homepage only.
        revalidatePath("/");
        revalidated.push("/");
        break;
      }
    }

    console.log("[SurajWood] ISR revalidated:", revalidated.join(", "));

    return NextResponse.json({ revalidated: true, paths: revalidated });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }
}
