"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

interface Props {
  city: string;
  productInterest: string;
  sourcePage: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function PSEOLeadForm({ city, productInterest, sourcePage }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          city,
          product_interest: [productInterest],
          inquiry_type: "Request Quote",
          source_page: sourcePage,
          user_type: "Other",
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

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-green-600"
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
        <h3 className="font-heading font-bold text-navy text-xl mb-2">
          Quote Request Received
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Thank you! Our {city} team will contact you within 4 business hours
          with pricing and availability for {productInterest}.
        </p>
        <p className="text-gray-500 text-xs mt-3">
          Need faster response? Call us at{" "}
          <a
            href="tel:+919999995553"
            className="text-copper font-medium hover:underline"
          >
            +91-9999995553
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-cream rounded-2xl p-7 border border-gray-100 space-y-4"
    >
      {/* Pre-filled context chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="inline-block bg-navy/10 text-navy text-xs font-medium px-3 py-1 rounded-full">
          City: {city}
        </span>
        <span className="inline-block bg-copper/10 text-copper text-xs font-medium px-3 py-1 rounded-full">
          Product: {productInterest}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pseo-name" className="block text-xs font-medium text-gray-600 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="pseo-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Rahul Sharma"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pseo-phone" className="block text-xs font-medium text-gray-600 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="pseo-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="pseo-email" className="block text-xs font-medium text-gray-600 mb-1.5">
          Email Address
        </label>
        <input
          id="pseo-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="rahul@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="pseo-message" className="block text-xs font-medium text-gray-600 mb-1.5">
          Project Details (optional)
        </label>
        <textarea
          id="pseo-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder={`Tell us about your ${productInterest.toLowerCase()} project in ${city} — room size, number of shutters, timeline, etc.`}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-xs text-center bg-red-50 border border-red-100 rounded-lg p-3">
          Something went wrong. Please try again or call us at{" "}
          <a href="tel:+919999995553" className="font-medium underline">
            +91-9999995553
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-copper hover:bg-copper-light text-white font-heading font-semibold py-3.5 rounded-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending your request…" : `Get Quote for ${city}`}
      </button>

      <p className="text-gray-400 text-xs text-center">
        We will respond within 4 business hours. No spam, ever.
      </p>
    </form>
  );
}
