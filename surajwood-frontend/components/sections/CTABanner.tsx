"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  phone: string;
  product_interest: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const PRODUCTS = [
  "ACRYLUX",
  "ACRYSILK",
  "ACRYMATTE",
  "ACRYGLASS",
  "ACRYGLASS MATTE",
] as const;

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  product_interest: "",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function CTABanner() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
          ...form,
          inquiry_type: "Sample Kit",
          source_page: typeof window !== "undefined" ? window.location.href : "/",
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
    "w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white focus:bg-white/20 transition-colors";

  return (
    <section
      className="py-16 px-6"
      style={{
        background: "linear-gradient(135deg, #8B5522 0%, #1B2A4A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white leading-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">
              Get a free sample kit delivered to your doorstep.{" "}
              <span className="text-white font-medium">No obligations.</span>
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {[
                "Choose from 50+ premium finishes",
                "Expert advice from our design team",
                "Pan-India delivery within 3–5 days",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <span className="w-5 h-5 rounded-full bg-copper/30 flex items-center justify-center text-copper text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div>
            {status === "success" ? (
              <div className="bg-white/10 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-heading font-bold text-white text-xl">
                  Thank You!
                </h3>
                <p className="text-white/70 mt-2 text-sm leading-relaxed">
                  Your sample kit request has been received. Our team will get
                  in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClass}
                  />
                </div>

                <select
                  name="product_interest"
                  value={form.product_interest}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" disabled className="text-gray-700 bg-white">
                    Select Product Interest
                  </option>
                  {PRODUCTS.map((p) => (
                    <option key={p} value={p} className="text-gray-700 bg-white">
                      {p}
                    </option>
                  ))}
                </select>

                {status === "error" && (
                  <p className="text-red-300 text-xs text-center">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white text-navy font-heading font-semibold py-3.5 rounded-lg hover:bg-cream transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending…" : "Get Free Sample Kit"}
                </button>

                <p className="text-white/40 text-xs text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
