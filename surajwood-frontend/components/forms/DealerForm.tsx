"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormState {
  dealer_name: string;
  business_name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  monthly_volume: string;
  current_brands: string;
  // honeypot
  website_url: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = {
  dealer_name: "",
  business_name: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  monthly_volume: "",
  current_brands: "",
  website_url: "",
};

const VOLUME_OPTIONS = [
  "Under 50 sheets/month",
  "50–200 sheets/month",
  "200–500 sheets/month",
  "500+ sheets/month",
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DealerForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check — if filled, silently reject
    if (form.website_url) {
      setStatus("success");
      return;
    }

    if (
      !form.dealer_name.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.business_name.trim()
    ) {
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.dealer_name,
          email: form.email,
          phone: form.phone,
          company: form.business_name,
          city: form.city,
          inquiry_type: "Dealer Enquiry",
          message: `Business: ${form.business_name}\nCity: ${form.city}, ${form.state}\nMonthly Volume: ${form.monthly_volume}\nCurrent Brands: ${form.current_brands}`,
          user_type: "Dealer",
          product_interest: ["ACRYLUX", "ACRYSILK", "ACRYMATTE", "ACRYGLASS", "ACRYGLASS MATTE"],
          source_page: "/dealers",
          consent: true,
        }),
      });

      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/30 focus:border-copper transition-colors bg-white";

  const labelClass = "block text-xs font-medium text-gray-600 mb-1.5";

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-navy text-2xl mb-2">
          Application Received!
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
          Thank you for your interest in partnering with Suraj Wood. Our dealer
          partnership team will review your application and contact you within
          48 hours.
        </p>
        <p className="text-gray-500 text-sm mt-5">
          Need immediate assistance?{" "}
          <a
            href="tel:+919009171819"
            className="text-copper font-medium hover:underline"
          >
            Call +91-9009171819
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5"
    >
      {/* Honeypot field — hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_url"
          value={form.website_url}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Contact details */}
      <div>
        <h3 className="font-heading font-semibold text-navy text-base mb-4 pb-2 border-b border-gray-100">
          Your Contact Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dealer_name" className={labelClass}>
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="dealer_name"
              type="text"
              name="dealer_name"
              value={form.dealer_name}
              onChange={handleChange}
              required
              placeholder="Rajesh Kumar"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="business_name" className={labelClass}>
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              id="business_name"
              type="text"
              name="business_name"
              value={form.business_name}
              onChange={handleChange}
              required
              placeholder="Kumar Interiors & Hardware"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="rajesh@kumarhardware.com"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Location details */}
      <div>
        <h3 className="font-heading font-semibold text-navy text-base mb-4 pb-2 border-b border-gray-100">
          Business Location
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className={labelClass}>
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              placeholder="e.g. Pune"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="state" className={labelClass}>
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Select State
              </option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Business details */}
      <div>
        <h3 className="font-heading font-semibold text-navy text-base mb-4 pb-2 border-b border-gray-100">
          Business Details
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="monthly_volume" className={labelClass}>
              Expected Monthly Volume <span className="text-red-500">*</span>
            </label>
            <select
              id="monthly_volume"
              name="monthly_volume"
              value={form.monthly_volume}
              onChange={handleChange}
              required
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Select expected monthly volume
              </option>
              {VOLUME_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="current_brands" className={labelClass}>
              Current Brands / Products You Carry
            </label>
            <textarea
              id="current_brands"
              name="current_brands"
              value={form.current_brands}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. CenturyPly, GreenPly laminates, Merino boards, local acrylic brands..."
              className={`${inputClass} resize-none`}
            />
            <p className="text-gray-400 text-xs mt-1">
              This helps us understand your market and customer profile.
            </p>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-700 text-sm">
          Something went wrong submitting your application. Please try again or
          call us directly at{" "}
          <a href="tel:+919009171819" className="font-medium underline">
            +91-9009171819
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-copper hover:bg-copper-light text-white font-heading font-semibold py-4 rounded-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        {status === "loading"
          ? "Submitting your application…"
          : "Submit Dealer Application"}
      </button>

      <p className="text-gray-400 text-xs text-center leading-relaxed">
        By submitting this form you agree to be contacted by our dealer
        partnership team. We do not share your information with third parties.
      </p>
    </form>
  );
}
