import type { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Cookie, ShieldCheck, Settings, CheckCircle2, Lock, HelpCircle, Mail, Building2 } from "lucide-react";
import CookieManageButton from "./CookieManageButton";

export const metadata: Metadata = {
  title: "Cookie Policy & Tracking Technologies | Suraj Wood Products",
  description:
    "Learn about how Suraj Wood Products uses cookies and similar tracking technologies in compliance with India's Digital Personal Data Protection Act, 2023 (DPDP Act).",
  alternates: { canonical: "https://www.surajwood.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Cookie Policy", url: "https://www.surajwood.com/cookie-policy" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#111315] via-[#1a1c1e] to-[#111315] text-white pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-copper/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* Frosted Dark Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-6">
            <Cookie className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold">
              DPDP ACT 2023 COMPLIANT COOKIE POLICY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
            Cookie <span className="text-copper">Policy</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Understanding how Suraj Wood Products utilizes essential, analytical, and preference cookies to deliver a fast, secure, and personalized architectural surface browsing experience.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Standard: DPDP Act (India)</span>
            <span>•</span>
            <span>Suraj Wood Products Pvt. Ltd.</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-[#FBFBF9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-gray-200/80">
            
            {/* Interactive Preference CTA */}
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy to-[#1f2328] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-copper" />
                  <h2 className="font-heading font-bold text-lg text-white">
                    Manage Your Cookie Preferences
                  </h2>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  You have full autonomy under the DPDP Act 2023 to accept or reject non-essential cookies at any time.
                </p>
              </div>
              <CookieManageButton />
            </div>

            <div className="space-y-12 text-gray-700 text-sm sm:text-base leading-relaxed">
              
              {/* Section 1 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">1</span>
                  What Are Cookies and Local Storage?
                </h3>
                <p className="mb-4">
                  Cookies are small text files placed on your device (computer, smartphone, or tablet) by websites you visit. They are widely used to make websites function securely and efficiently, remember your customized selections (such as selected shade swatches or catalog downloads), and provide aggregated analytics to website operators.
                </p>
                <p>
                  In addition to cookies, we may use modern web browser storage mechanisms such as <code>localStorage</code> to store your consent preferences locally without transmitting unnecessary telemetry.
                </p>
              </div>

              {/* Section 2 - Categories */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">2</span>
                  Categories of Cookies We Use
                </h3>

                <div className="space-y-6">
                  
                  {/* Necessary */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h4 className="font-heading font-bold text-navy text-base flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-600" />
                        1. Strictly Necessary / Essential Cookies
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Always Active
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                      These cookies are essential for core website functionality, security protocols, load balancing, preventing cross-site forgery (CSRF), and recording your DPDP Act consent decisions. The website cannot function properly without these cookies.
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-white p-3 rounded-xl border border-gray-200">
                      Examples: <code>surajwood_cookie_consent_v1</code>, <code>__session</code>, security tokens.
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h4 className="font-heading font-bold text-navy text-base flex items-center gap-2">
                        <Settings className="w-4 h-4 text-copper" />
                        2. Analytical &amp; Performance Cookies
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                        Optional / Consent Required
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                      These cookies collect aggregated, anonymized metrics on how visitors navigate between product pages (e.g. ACRYLUX vs. ACRYGLASS), which shade filters are most viewed, page rendering speeds, and referral paths. We use Google Analytics 4 (configured with IP anonymization) and Vercel Analytics.
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-white p-3 rounded-xl border border-gray-200">
                      Examples: <code>_ga</code>, <code>_ga_*</code>, <code>_va</code>.
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h4 className="font-heading font-bold text-navy text-base flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        3. Functional &amp; Preference Cookies
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                        Optional / Consent Required
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                      Enable enhanced website features such as remembering your regional city selection (e.g. SurajWood in Mumbai / Delhi), saved shade swatch comparisons, and sample cart draft state so you don&apos;t have to re-enter information.
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h4 className="font-heading font-bold text-navy text-base flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        4. Communications &amp; Inquiry Tracking
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                        Optional / Consent Required
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                      Allows integration with our official WhatsApp business inquiry bridge and ensures you receive relevant architectural updates, new shade shade-card dispatches, and exhibition invitations when you explicitly opt in.
                    </p>
                  </div>

                </div>
              </div>

              {/* Section 3 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">3</span>
                  How to Control &amp; Withdraw Consent
                </h3>
                <p className="mb-4">
                  Under the <strong>Digital Personal Data Protection Act, 2023</strong>, you have the right to withdraw or modify your consent at any time without any degradation of basic website browsing. You can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>
                    Click the <strong>&quot;Cookie &amp; DPDP Settings&quot;</strong> button at the bottom-left of any page or use the button at the top of this policy to re-open your preferences modal.
                  </li>
                  <li>
                    Configure your web browser to block or alert you about cookies. Note that blocking essential cookies may impact form submissions for sample requests or dealer logins.
                  </li>
                </ul>

                {/* Browser Guides */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                  <h4 className="font-heading font-bold text-navy text-sm mb-3">
                    Browser-Specific Cookie Management Guides:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-copper hover:text-copper transition-colors text-center font-medium block"
                    >
                      Google Chrome
                    </a>
                    <a
                      href="https://support.apple.com/en-in/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-copper hover:text-copper transition-colors text-center font-medium block"
                    >
                      Apple Safari
                    </a>
                    <a
                      href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-copper hover:text-copper transition-colors text-center font-medium block"
                    >
                      Mozilla Firefox
                    </a>
                    <a
                      href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-copper hover:text-copper transition-colors text-center font-medium block"
                    >
                      Microsoft Edge
                    </a>
                  </div>
                </div>
              </div>

              {/* Section 4 - DPO Contact */}
              <div>
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">4</span>
                  Data Protection &amp; Grievance Redressal
                </h3>
                <p className="mb-6">
                  If you have inquiries regarding our cookie practices, data telemetry, or wish to exercise your rights under the DPDP Act 2023, please reach out to our Grievance Officer:
                </p>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-copper" />
                    Data Protection &amp; Grievance Officer
                  </p>
                  <p className="text-sm">Suraj Wood Products Pvt. Ltd.</p>
                  <p className="text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-copper" />
                    Email: <a href="mailto:grievance@surajwood.com" className="text-copper hover:underline font-medium">grievance@surajwood.com</a> (cc: <a href="mailto:sales@surajwood.com" className="text-copper hover:underline font-medium">sales@surajwood.com</a>)
                  </p>
                  <p className="text-xs text-gray-500">
                    Address: 45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501, India.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
