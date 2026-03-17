/**
 * GA4 analytics helper functions for SurajWood.
 * All functions are safe — they check for window.gtag before calling.
 * Call these from client components and event handlers.
 */

// Extend Window type to include gtag without breaking SSR
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventNameOrTarget: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

function safeGtag(
  eventName: string,
  params: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// ---------------------------------------------------------------------------
// Lead & conversion events
// ---------------------------------------------------------------------------

/**
 * Fire when any lead form is successfully submitted.
 * @param formType - e.g. "contact", "sample_kit", "dealer", "cta_banner"
 * @param productInterest - comma-separated product slugs the user selected
 * @param city - optional city selected or detected
 * @param userType - optional user type from the form dropdown
 */
export function trackLeadFormSubmit(
  formType: string,
  productInterest: string,
  city?: string,
  userType?: string
): void {
  safeGtag("lead_form_submit", {
    form_type: formType,
    product_interest: productInterest,
    ...(city && { city }),
    ...(userType && { user_type: userType }),
  });
}

/**
 * Fire when a user requests a free sample kit.
 * @param productInterest - product(s) the user is interested in
 * @param city - optional city from form or URL
 */
export function trackSampleKitRequest(
  productInterest: string,
  city?: string
): void {
  safeGtag("sample_kit_request", {
    product_interest: productInterest,
    ...(city && { city }),
  });
}

/**
 * Fire when a user downloads a catalogue or spec sheet.
 * @param productName - e.g. "ACRYLUX"
 * @param userEmail - email provided for gated download (optional, do NOT send PII to GA)
 */
export function trackCatalogueDownload(
  productName: string,
  _userEmail?: string // intentionally not sent to GA
): void {
  safeGtag("catalogue_download", {
    product_name: productName,
  });
}

// ---------------------------------------------------------------------------
// Engagement events
// ---------------------------------------------------------------------------

/**
 * Fire when the floating WhatsApp widget or any WhatsApp CTA is clicked.
 * @param pageUrl - current page URL (window.location.pathname)
 */
export function trackWhatsAppClick(pageUrl: string): void {
  safeGtag("whatsapp_click", {
    page_url: pageUrl,
  });
}

/**
 * Fire when the user clicks a phone number CTA.
 * @param pageUrl - current page URL
 */
export function trackPhoneClick(pageUrl: string): void {
  safeGtag("phone_click", {
    page_url: pageUrl,
  });
}

/**
 * Fire when a product detail page is viewed.
 * @param productSlug - e.g. "acrylux"
 */
export function trackProductView(productSlug: string): void {
  safeGtag("product_view", {
    product_slug: productSlug,
  });
}

/**
 * Fire when a PSEO page is viewed (useful for attribution reporting).
 * @param product - product slug
 * @param application - application slug (kitchens / wardrobes)
 * @param city - city slug
 */
export function trackPSEOPageView(
  product: string,
  application: string,
  city: string
): void {
  safeGtag("pseo_page_view", {
    product_slug: product,
    application_slug: application,
    city_slug: city,
  });
}

/**
 * Fire when a user clicks a colour swatch on a product page.
 * @param productSlug - product slug
 * @param colourName - e.g. "Arctic White"
 */
export function trackColourSwatchClick(
  productSlug: string,
  colourName: string
): void {
  safeGtag("colour_swatch_click", {
    product_slug: productSlug,
    colour_name: colourName,
  });
}

/**
 * Fire when a user expands an FAQ accordion item.
 * @param questionText - the FAQ question text (first 100 chars)
 * @param pageUrl - current page URL
 */
export function trackFAQExpand(questionText: string, pageUrl: string): void {
  safeGtag("faq_expand", {
    question_text: questionText.slice(0, 100),
    page_url: pageUrl,
  });
}

/**
 * Fire at scroll depth thresholds (25%, 50%, 75%, 90%).
 * @param pageUrl - current page URL
 * @param threshold - scroll depth percentage as a number
 */
export function trackScrollDepth(pageUrl: string, threshold: number): void {
  safeGtag("scroll_depth", {
    page_url: pageUrl,
    threshold_percent: threshold,
  });
}

/**
 * Fire when a blog article is read to completion (scroll past 90% of article).
 * @param postSlug - blog post slug
 * @param readingTime - estimated reading time in minutes
 */
export function trackBlogReadComplete(
  postSlug: string,
  readingTime: number
): void {
  safeGtag("blog_read_complete", {
    post_slug: postSlug,
    reading_time_minutes: readingTime,
  });
}
