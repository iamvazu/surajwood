"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  company: z.string().optional(),
  user_type: z.string().min(1, "Please select your profile"),
  product_interest: z
    .array(z.string())
    .min(1, "Please select at least one product"),
  inquiry_type: z.string().min(1, "Please select an inquiry type"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const dealerSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit number"),
  city: z.string().min(2, "Please enter your city"),
  monthly_volume: z.string().min(1, "Please select an option"),
});

type DealerFormValues = z.infer<typeof dealerSchema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const USER_TYPES = [
  "Architect",
  "Interior Designer",
  "Homeowner",
  "Dealer/Distributor",
  "Contractor",
  "OEM Manufacturer",
  "Other",
];

const PRODUCTS = ["ACRYLUX", "ACRYSILK", "ACRYMATTE", "ACRYGLASS", "ACRYGLASS MATTE"];

const INQUIRY_TYPES = [
  "Request Sample Kit",
  "Get Quote",
  "Dealer Enquiry",
  "Technical Query",
  "Bulk Order",
  "Other",
];

const MONTHLY_VOLUMES = [
  "Less than 50 sheets",
  "50–200 sheets",
  "200–500 sheets",
  "500+ sheets",
];

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Contact Form
// ---------------------------------------------------------------------------

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { product_interest: [] },
  });

  const selectedProducts = watch("product_interest") ?? [];

  function toggleProduct(name: string) {
    const current = selectedProducts;
    const updated = current.includes(name)
      ? current.filter((p) => p !== name)
      : [...current, name];
    setValue("product_interest", updated, { shouldValidate: true });
  }

  async function onSubmit(data: ContactFormValues) {
    setServerError("");
    try {
      const sourcePage = typeof window !== "undefined" ? window.location.href : "";
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source_page: sourcePage,
          utm_source: params.get("utm_source") ?? undefined,
          utm_medium: params.get("utm_medium") ?? undefined,
          utm_campaign: params.get("utm_campaign") ?? undefined,
          honeypot: "",
        }),
      });
      const json: { success: boolean; message?: string } = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setServerError(json.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again or call us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-cream rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-copper/15 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-copper"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-heading font-bold text-navy mb-2">Thank You!</h3>
        <p className="text-navy/70 mb-1">We&apos;ll be in touch within 24 hours.</p>
        <p className="text-navy/60 text-sm">
          You can also WhatsApp us at{" "}
          <a
            href="https://wa.me/919999995553"
            className="text-copper hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            +91-9999995553
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Full name */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-navy mb-1">
          Full Name <span className="text-copper">*</span>
        </label>
        <input
          id="full_name"
          type="text"
          autoComplete="name"
          placeholder="Rajesh Kumar"
          className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
            Email Address <span className="text-copper">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="rajesh@company.com"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">
            Mobile Number <span className="text-copper">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="9876543210"
            maxLength={10}
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-navy mb-1">
          Company / Firm{" "}
          <span className="text-navy/40 font-normal text-xs">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder="Interior Studio Name"
          className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
          {...register("company")}
        />
      </div>

      {/* Profile + Inquiry type */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="user_type" className="block text-sm font-medium text-navy mb-1">
            Your Profile <span className="text-copper">*</span>
          </label>
          <select
            id="user_type"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy bg-white focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("user_type")}
          >
            <option value="">Select profile…</option>
            {USER_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.user_type && (
            <p className="mt-1 text-xs text-red-500">{errors.user_type.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="inquiry_type" className="block text-sm font-medium text-navy mb-1">
            Inquiry Type <span className="text-copper">*</span>
          </label>
          <select
            id="inquiry_type"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy bg-white focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("inquiry_type")}
          >
            <option value="">Select type…</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.inquiry_type && (
            <p className="mt-1 text-xs text-red-500">{errors.inquiry_type.message}</p>
          )}
        </div>
      </div>

      {/* Product interest */}
      <fieldset>
        <legend className="block text-sm font-medium text-navy mb-2">
          Product Interest <span className="text-copper">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {PRODUCTS.map((p) => {
            const active = selectedProducts.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => toggleProduct(p)}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "bg-copper text-white border-copper shadow-copper"
                    : "bg-white text-navy border-cream-dark hover:border-copper hover:text-copper"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
        {errors.product_interest && (
          <p className="mt-1 text-xs text-red-500">{errors.product_interest.message}</p>
        )}
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">
          Message{" "}
          <span className="text-navy/40 font-normal text-xs">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about your project, dimensions, or any specific requirements…"
          className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors resize-none"
          {...register("message")}
        />
      </div>

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-copper hover:bg-copper-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-copper disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>

      <p className="text-xs text-navy/40 text-center">
        By submitting, you agree to receive communications from Suraj Wood Products Pvt. Ltd.
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Dealer Form
// ---------------------------------------------------------------------------

function DealerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DealerFormValues>({
    resolver: zodResolver(dealerSchema),
  });

  async function onSubmit(data: DealerFormValues) {
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          full_name: data.full_name,
          inquiry_type: "Dealer Enquiry",
          source_page: typeof window !== "undefined" ? window.location.href : "",
          honeypot: "",
        }),
      });
      const json: { success: boolean; message?: string } = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setServerError(json.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 rounded-full bg-copper/15 flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-copper"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-navy font-semibold text-lg">Application Received!</p>
        <p className="text-navy/60 text-sm mt-1">Our dealer team will contact you within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dealer_name" className="block text-sm font-medium text-navy mb-1">
            Full Name <span className="text-copper">*</span>
          </label>
          <input
            id="dealer_name"
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("full_name")}
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="dealer_phone" className="block text-sm font-medium text-navy mb-1">
            Mobile Number <span className="text-copper">*</span>
          </label>
          <input
            id="dealer_phone"
            type="tel"
            maxLength={10}
            placeholder="9876543210"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dealer_city" className="block text-sm font-medium text-navy mb-1">
            City <span className="text-copper">*</span>
          </label>
          <input
            id="dealer_city"
            type="text"
            placeholder="Delhi"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("city")}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="monthly_volume" className="block text-sm font-medium text-navy mb-1">
            Expected Monthly Volume <span className="text-copper">*</span>
          </label>
          <select
            id="monthly_volume"
            className="w-full px-4 py-2.5 border border-cream-dark rounded-lg text-navy bg-white focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
            {...register("monthly_volume")}
          >
            <option value="">Select volume…</option>
            {MONTHLY_VOLUMES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          {errors.monthly_volume && (
            <p className="mt-1 text-xs text-red-500">{errors.monthly_volume.message}</p>
          )}
        </div>
      </div>
      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          "Apply as Dealer"
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Page client shell
// ---------------------------------------------------------------------------

export default function ContactPageClient() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-copper">›</li>
              <li className="text-white/90">Contact Us</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Get in Touch
          </h1>
          <p className="mt-3 text-lg text-white/70 max-w-xl">
            Request samples, get a quote, or ask us anything. Our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Main two-column layout                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left: contact form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-heading font-bold text-navy mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Right: contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-cream rounded-2xl p-6 border border-cream-dark">
                <h3 className="text-lg font-heading font-bold text-navy mb-4">
                  Contact Information
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-copper shrink-0" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-navy/50 text-xs mb-0.5 uppercase tracking-wide">Phone</p>
                      <a
                        href="tel:+919999995553"
                        className="text-navy font-medium hover:text-copper transition-colors"
                      >
                        +91-9999995553
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-copper shrink-0" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-navy/50 text-xs mb-0.5 uppercase tracking-wide">Email</p>
                      <a
                        href="mailto:sales@surajwood.com"
                        className="text-navy font-medium hover:text-copper transition-colors"
                      >
                        sales@surajwood.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-copper shrink-0" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-navy/50 text-xs mb-0.5 uppercase tracking-wide">Factory Address</p>
                      <address className="not-italic text-navy font-medium leading-snug">
                        45 KM Stone, VPO Rohad<br />
                        Bahadurgarh, Haryana 124501
                      </address>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-copper shrink-0" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-navy/50 text-xs mb-0.5 uppercase tracking-wide">Business Hours</p>
                      <p className="text-navy font-medium">
                        Monday–Saturday<br />
                        9:00 AM – 6:00 PM
                      </p>
                    </div>
                  </li>
                </ul>

                <a
                  href="https://wa.me/919999995553?text=Hi%2C%20I%20am%20interested%20in%20Suraj%20Wood%20acrylic%20panels."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-cream-dark shadow-sm aspect-[4/3]">
                <iframe
                  src="https://maps.google.com/maps?q=28.6562,76.7219&hl=en&z=14&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SurajWood factory location — Bahadurgarh, Haryana"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Dealer Section                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section id="dealer" className="py-16 bg-cream scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-copper font-medium text-sm uppercase tracking-widest mb-2">
                Partner with Us
              </p>
              <h2 className="text-3xl font-heading font-bold text-navy mb-4">
                Become a Suraj Wood Dealer
              </h2>
              <p className="text-navy/70 leading-relaxed mb-6">
                Join India&apos;s growing network of premium acrylic panel dealers. We offer
                competitive margins, training, sample kits, and dedicated territory support.
              </p>
              <ul className="space-y-3 text-sm text-navy/70">
                {[
                  "Exclusive territory allocation in your city",
                  "Free sample kits and marketing materials",
                  "Technical training and product certification",
                  "Dedicated sales support from our team",
                  "Competitive margins with volume incentives",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="text-copper mt-0.5" aria-hidden="true">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-product">
              <h3 className="text-xl font-heading font-bold text-navy mb-5">
                Dealer Application
              </h3>
              <DealerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
