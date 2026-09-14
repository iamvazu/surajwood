import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { ShieldCheck, Lock, UserCheck, RefreshCw, Trash2, HelpCircle, Building2, Mail, Phone, MapPin, Scale } from "lucide-react";
import CookieManageButton from "@/app/cookie-policy/CookieManageButton";

export const metadata: Metadata = {
  title: "Privacy Policy & DPDP Act Compliance | Suraj Wood Products",
  description:
    "Suraj Wood Products' official Privacy Policy compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act). Learn about your rights, consent mechanisms, and data security.",
  alternates: { canonical: "https://www.surajwood.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Privacy Policy", url: "https://www.surajwood.com/privacy-policy" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero Section with Luxury Background Image */}
      <section className="relative text-white pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src="/images/banner/bg3.jpg"
              alt="SurajWood Privacy Policy DPDP Compliance"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Dual Gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/95 via-navy/85 to-navy/90" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/95 via-transparent to-navy/70" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Subtle Breadcrumb Navigation */}
          <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
              <li>
                <Link href="/" className="hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li className="text-white/80 font-medium" aria-current="page">
                Privacy Policy
              </li>
            </ol>
          </nav>

          {/* Frosted Dark Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] sm:text-xs uppercase font-bold">
              DATA PROTECTION &amp; DPDP ACT (INDIA) COMPLIANCE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Privacy <span className="text-copper-light font-extrabold">Policy</span>
          </h1>

          <p className="text-gray-200 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed font-light">
            Suraj Wood Products is dedicated to protecting your digital personal data in strict compliance with India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and applicable information security standards.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-400">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Data Fiduciary: Suraj Wood Products Pvt. Ltd.</span>
            <span>•</span>
            <span>Applies to: India &amp; Global Operations</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-[#FBFBF9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-gray-200/80">
            
            {/* DPDP Compliance Notice Box */}
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy to-[#1a1d22] text-white border border-gray-700/80 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-copper/20 text-copper text-xs font-bold uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" />
                  DPDP Act, 2023 Certified Standards
                </div>
                <h2 className="font-heading font-bold text-lg text-white">
                  Notice under Section 5 &amp; Section 6 of DPDP Act 2023
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  We process your digital personal data with explicit, itemized, and informed consent solely for fulfilling sample requests, technical advisory, factory tours, and B2B dealership agreements.
                </p>
              </div>
              <CookieManageButton />
            </div>

            <div className="space-y-12 text-gray-700 text-sm sm:text-base leading-relaxed">
              
              {/* Clause 1 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">1</span>
                  Data Fiduciary Identification
                </h3>
                <p className="mb-4">
                  Under the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;), the <strong>Data Fiduciary</strong> determining the purpose and means of processing your personal data is:
                </p>
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-navy space-y-1 font-medium">
                  <p className="font-bold text-base">Suraj Wood Products Pvt. Ltd.</p>
                  <p className="text-gray-600">CIN: U36100HR2010PTC041234</p>
                  <p className="text-gray-600">Registered Hub: 45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501, India</p>
                  <p className="text-gray-600">Official Portal: <a href="https://www.surajwood.com" className="text-copper hover:underline">https://www.surajwood.com</a></p>
                </div>
              </div>

              {/* Clause 2 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">2</span>
                  Digital Personal Data We Collect
                </h3>
                <p className="mb-4">
                  We collect digital personal data that you voluntarily provide to us through our web forms, WhatsApp business integrations, and sample ordering portals:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <h4 className="font-heading font-bold text-navy text-sm flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-copper" />
                      Contact &amp; Identity Data
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Full name, business email address, WhatsApp/mobile telephone number, company/firm name, architectural practice details, and GSTIN (for B2B commercial invoices).
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <h4 className="font-heading font-bold text-navy text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-copper" />
                      Dispatch &amp; Delivery Address
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Physical shipping address, building/suite number, landmark, pin code, and recipient mobile number required to courier physical sample boxes &amp; shade swatches.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <h4 className="font-heading font-bold text-navy text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-copper" />
                      Project &amp; Inquiry Specifics
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Type of inquiry (Factory Tour, Sample Box, Dealership, Commercial Project), preferred product series (ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, Membrane, Profiles), and project square footage.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <h4 className="font-heading font-bold text-navy text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-copper" />
                      Technical &amp; Telemetry Data
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Anonymized IP address, browser type, device operating system, referring URL, and session analytics processed in accordance with your cookie consent preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Clause 3 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">3</span>
                  Lawful Grounds &amp; Specified Purposes of Processing
                </h3>
                <p className="mb-4">
                  In compliance with Section 4 and Section 7 of the DPDP Act 2023, we only process personal data based on <strong>explicit, informed consent</strong> or for specified <strong>legitimate uses</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2.5 text-gray-700">
                  <li>
                    <strong>Physical Sample Box Fulfillment:</strong> Processing shipping credentials and coordinating with domestic courier partners (Bluedart, DTDC, Delhivery) to deliver curated acrylic shade folders.
                  </li>
                  <li>
                    <strong>Commercial Inquiries &amp; Quotations:</strong> Generating technical cost estimates, panel cut-list feasibility studies, and routing requests to regional sales engineers.
                  </li>
                  <li>
                    <strong>Factory Tour Scheduling:</strong> Verifying visitor identities and generating security entry passes for the Bahadurgarh manufacturing plant.
                  </li>
                  <li>
                    <strong>Dealership &amp; Distribution Onboarding:</strong> Reviewing trade credentials, dealership territory agreements, and credit evaluations.
                  </li>
                  <li>
                    <strong>Customer Communications &amp; Warranty:</strong> Issuing panel batch certifications, technical bulletins, and handling post-installation queries.
                  </li>
                </ul>
              </div>

              {/* Clause 4 - Data Principal Rights under DPDP Act */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">4</span>
                  Your Rights as a Data Principal (DPDP Act, 2023)
                </h3>
                <p className="mb-6">
                  As a Data Principal residing in India or accessing our services, you hold comprehensive statutory rights under Chapter III of the DPDP Act 2023:
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-copper/10 text-copper flex-shrink-0 mt-0.5">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-navy text-sm mb-1">
                        1. Right to Access Information (Section 11)
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        You have the right to obtain a summary of digital personal data being processed about you, the processing activities undertaken, and the identities of any authorized data processors.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-copper/10 text-copper flex-shrink-0 mt-0.5">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-navy text-sm mb-1">
                        2. Right to Correction and Erasure (Section 12)
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        You have the right to request correction of inaccurate data, completion of incomplete records, or erasure of personal data that is no longer necessary for the purpose it was collected.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-copper/10 text-copper flex-shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-navy text-sm mb-1">
                        3. Right of Grievance Redressal (Section 13)
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        You have the right to readily accessible grievance redressal provided by our appointed Data Protection &amp; Grievance Officer, with response times within 7 business days.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-copper/10 text-copper flex-shrink-0 mt-0.5">
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-navy text-sm mb-1">
                        4. Right to Withdraw Consent &amp; Nominate (Section 6 &amp; 14)
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        You may withdraw your consent at any time as easily as it was given. You also have the right to nominate another individual to exercise your rights in the event of death or incapacity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-cream/80 border border-copper/30 text-xs text-gray-700 flex items-center justify-between gap-4">
                  <span>To exercise any of your statutory rights, please email our Data Protection Officer directly:</span>
                  <a href="mailto:grievance@surajwood.com" className="px-3.5 py-1.5 rounded-lg bg-copper text-white font-bold hover:bg-copper/90 transition-colors flex-shrink-0">
                    Email DPO
                  </a>
                </div>
              </div>

              {/* Clause 5 - Child Safety */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">5</span>
                  Protection of Children &amp; Vulnerable Persons
                </h3>
                <p className="mb-3">
                  In compliance with Section 9 of the DPDP Act 2023:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    SurajWood does not knowingly collect, process, or track the personal data of children under the age of 18 without verifiable parental or legal guardian consent.
                  </li>
                  <li>
                    We do not undertake behavioral monitoring, targeted advertising, or profiling directed at minors.
                  </li>
                </ul>
              </div>

              {/* Clause 6 - Security & Retention */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">6</span>
                  Technical Security Measures &amp; Data Retention
                </h3>
                <p className="mb-4">
                  We enforce stringent technical and organizational measures in accordance with ISO 9001:2015 data governance protocols:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>
                    <strong>Encryption:</strong> All web submissions and API data transfers are encrypted in transit using TLS 1.3 encryption.
                  </li>
                  <li>
                    <strong>Access Control:</strong> Access to customer inquiries within our CRM is restricted strictly to authorized sales and dispatch personnel with multi-factor authentication.
                  </li>
                  <li>
                    <strong>Retention Period:</strong> Personal data is retained only for as long as necessary to fulfill sample delivery, warranty lifecycle, or statutory GST compliance obligations (typically 5 to 7 years for commercial invoices), after which it is securely anonymized or destroyed.
                  </li>
                </ul>
              </div>

              {/* Clause 7 - Cookies & Tracking */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">7</span>
                  Cookies &amp; Consent Management
                </h3>
                <p className="mb-4">
                  We use cookies strictly in alignment with your expressed consent. You can modify your preferences at any time through our interactive banner. For a complete breakdown of essential, analytics, and preference cookies, visit our <Link href="/cookie-policy" className="text-copper font-bold hover:underline">Cookie Policy</Link>.
                </p>
              </div>

              {/* Clause 8 - Grievance Officer */}
              <div>
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">8</span>
                  Data Protection &amp; Grievance Redressal Officer
                </h3>
                <p className="mb-6">
                  In accordance with Section 13(1) of the DPDP Act 2023, Suraj Wood Products has designated a dedicated Grievance Redressal Officer:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="space-y-2">
                    <p className="font-bold text-navy flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-copper" />
                      Grievance Officer
                    </p>
                    <p className="text-sm font-medium text-gray-800">Data Protection &amp; Legal Compliance Team</p>
                    <p className="text-sm text-gray-600">Suraj Wood Products Pvt. Ltd.</p>
                    <p className="text-xs text-gray-500">Official Turnaround: Maximum 7 Working Days</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-copper" />
                      Email: <a href="mailto:grievance@surajwood.com" className="text-copper hover:underline font-semibold">grievance@surajwood.com</a>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-copper" />
                      Helpline: <a href="tel:+919009171819" className="hover:underline font-semibold">+91-9009171819</a>
                    </p>
                    <p className="text-xs text-gray-500 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
                      45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501, India.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
                  <span>If not satisfied with our internal grievance redressal, Data Principals may appeal to the <strong>Data Protection Board of India (DPBI)</strong>.</span>
                  <Link href="/terms-and-conditions" className="text-navy font-bold hover:text-copper transition-colors">
                    View Terms &amp; Conditions →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
