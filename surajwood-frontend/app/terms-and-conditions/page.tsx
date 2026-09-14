import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { FileText, Scale, Building2, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Suraj Wood Products",
  description:
    "Read the official Terms and Conditions governing the use of Suraj Wood Products website, sample box dispatch, technical specifications, and commercial supply agreements.",
  alternates: { canonical: "https://www.surajwood.com/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Terms and Conditions", url: "https://www.surajwood.com/terms-and-conditions" },
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
              alt="SurajWood Terms & Conditions"
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
                Terms &amp; Conditions
              </li>
            </ol>
          </nav>

          {/* Frosted Dark Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-copper/40 shadow-inner mb-5">
            <Scale className="w-3.5 h-3.5 text-copper" />
            <span className="text-copper tracking-[0.2em] text-[10px] sm:text-xs uppercase font-bold">
              LEGAL &amp; COMPLIANCE FRAMEWORK
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Terms &amp; <span className="text-copper-light font-extrabold">Conditions</span>
          </h1>

          <p className="text-gray-200 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed font-light">
            Please read these terms and conditions carefully before accessing our website, requesting physical sample kits, or procuring architectural surface panels from Suraj Wood Products.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-400">
            <span>Effective Date: September 2026</span>
            <span>•</span>
            <span>Entity: Suraj Wood Products Pvt. Ltd.</span>
            <span>•</span>
            <span>Jurisdiction: Haryana, India</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-[#FBFBF9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-gray-200/80">
            
            {/* Quick Summary Box */}
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-cream/60 border border-copper/30 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-copper/10 text-copper flex-shrink-0 mt-1">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-navy">
                  Key Agreement Summary
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  By accessing <strong>surajwood.com</strong>, ordering physical material swatches, or submitting digital inquiries, you enter into a binding agreement with <strong>Suraj Wood Products Pvt. Ltd.</strong> governed by Indian law, including the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.
                </p>
              </div>
            </div>

            <div className="space-y-12 text-gray-700 text-sm sm:text-base leading-relaxed">
              
              {/* Clause 1 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">1</span>
                  Company Information &amp; Scope of Agreement
                </h3>
                <p className="mb-4">
                  These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website operated by <strong>Suraj Wood Products Pvt. Ltd.</strong> (&quot;SurajWood&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), having its primary manufacturing facility at <strong>45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501, India</strong>.
                </p>
                <p>
                  These Terms apply to all visitors, commercial interior designers, architects, OEM modular furniture manufacturers, developers, contractors, and general consumers who browse our catalogue, request material samples, book factory tours, or engage in commercial transactions.
                </p>
              </div>

              {/* Clause 2 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">2</span>
                  Product Specifications, Tolerances &amp; Batch Variations
                </h3>
                <p className="mb-4">
                  SurajWood manufactures high-performance architectural surface panels, including <strong>ACRYLUX</strong> (High-Gloss Mirror PMMA), <strong>ACRYSILK</strong> (Satin-Matte), <strong>ACRYMATTE</strong> (Anti-Fingerprint Nano-Matte), <strong>ACRYGLASS</strong> / <strong>ACRYGLASS MATTE</strong> (2mm Glass-Effect Acrylic), <strong>Membrane Shutters</strong>, and <strong>Aluminium Handle Profiles</strong>.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                  <li>
                    <strong>Dimensional Standards:</strong> Standard acrylic sheet dimensions are 2440 mm × 1220 mm (8 ft × 4 ft) with standard manufacturing thickness tolerances of ±0.15 mm adhering to European DIN EN ISO standards.
                  </li>
                  <li>
                    <strong>Substrates:</strong> Laminated acrylic panels are bonded to E1-grade HDHMR, BWP Plywood, or MDF using European Reactive PUR Hot-Melt Adhesive.
                  </li>
                  <li>
                    <strong>Color &amp; Batch Variance:</strong> While SurajWood maintains strict Delta-E color calibration (ΔE &lt; 0.8), minor perceptual tone differences may occur between different production batches. For large projects, we strongly recommend procuring full lot requirements in a single batch.
                  </li>
                  <li>
                    <strong>Digital Representation:</strong> Screen rendering of shade swatches on mobile and computer screens may vary based on display color gamut. Physical shade cards should always be referenced for exact architectural approval.
                  </li>
                </ul>
              </div>

              {/* Clause 3 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">3</span>
                  Physical Sample Box Requests &amp; Fulfillment
                </h3>
                <p className="mb-4">
                  Architects, interior designers, modular factory owners, and enterprise developers may request physical sample boxes and swatch swatches via our website.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Sample box requests are subject to verification by our sales team. SurajWood reserves the right to qualify or limit sample quantities per enterprise entity.
                  </li>
                  <li>
                    Dispatched sample kits are intended solely for architectural review, finish inspection, and client presentations, not for resale or unauthorized reverse-engineering.
                  </li>
                  <li>
                    Pan-India sample dispatches are facilitated through express courier logistics (Bluedart, DTDC, Delhivery) typically delivering within 3 to 7 business days.
                  </li>
                </ul>
              </div>

              {/* Clause 4 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">4</span>
                  Intellectual Property &amp; Proprietary Rights
                </h3>
                <p className="mb-4">
                  All trademarks, trade names, brand names (including <strong>SURAJWOOD</strong>, <strong>ACRYLUX</strong>, <strong>ACRYSILK</strong>, <strong>ACRYMATTE</strong>, <strong>ACRYGLASS</strong>, <strong>AL-PROFHAN</strong>), shade nomenclature, logos, product imagery, 3D renders, video documentation, CAD cross-sections, and technical copy are the exclusive intellectual property of <strong>Suraj Wood Products Pvt. Ltd.</strong>
                </p>
                <p>
                  No content from this website may be copied, reproduced, republished, modified, downloaded, distributed, or exploited for commercial purposes without prior explicit written permission from Suraj Wood Products.
                </p>
              </div>

              {/* Clause 5 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">5</span>
                  Fabrication Guidelines, Warranty &amp; Limitation of Liability
                </h3>
                <div className="space-y-4">
                  <p>
                    SurajWood provides a limited manufacturer warranty on premium acrylic panels covering manufacturing defects such as surface delamination and premature UV discoloration when fabricated, edge-banded, and maintained in accordance with SurajWood Technical Guidelines:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      <strong>Edge Banding:</strong> All panels must be sealed with matching zero-joint / PUR edge banding tapes to protect substrate cores against extreme ambient humidity.
                    </li>
                    <li>
                      <strong>Cutting &amp; Routing:</strong> High-speed carbide/diamond-tipped saw blades designed for acrylic materials must be utilized to prevent edge micro-chipping.
                    </li>
                    <li>
                      <strong>Storage:</strong> Sheets must be stored flat on horizontal pallets away from direct rain, extreme ground dampness, or direct outdoor sun exposure prior to installation.
                    </li>
                    <li>
                      <strong>Exclusions:</strong> Warranty does not cover damage caused by abrasive chemical scrubbers (acetone, thinners, steel wool), structural building seepage, improper carpenter handling, or unauthorized post-factory modifications.
                    </li>
                  </ul>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600">
                    <strong>Disclaimer:</strong> To the fullest extent permitted by applicable Indian law, Suraj Wood Products Pvt. Ltd. disclaims liability for indirect, incidental, punitive, or consequential damages resulting from project delays, contractor fabrication errors, or improper site installation.
                  </div>
                </div>
              </div>

              {/* Clause 6 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">6</span>
                  Digital Data Protection &amp; Privacy (DPDP Act, 2023)
                </h3>
                <p className="mb-4">
                  Suraj Wood Products processes personal data in strict compliance with India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>. When you provide contact details for sample requests, quotations, dealer onboarding, or factory tour scheduling:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>
                    Your data is processed strictly for the verified purpose for which consent was granted.
                  </li>
                  <li>
                    We do not sell, rent, or trade your personal or corporate data to unvetted third-party commercial data brokers.
                  </li>
                  <li>
                    You maintain complete rights under the DPDP Act, including right to access, correct, erase, or withdraw processing consent at any time by contacting <a href="mailto:grievance@surajwood.com" className="text-copper font-semibold hover:underline">grievance@surajwood.com</a>.
                  </li>
                </ul>
                <p>
                  For complete information on data practices and cookie tracking, please consult our <Link href="/privacy-policy" className="text-copper font-bold hover:underline">Privacy Policy</Link> and <Link href="/cookie-policy" className="text-copper font-bold hover:underline">Cookie Policy</Link>.
                </p>
              </div>

              {/* Clause 7 */}
              <div className="border-b border-gray-100 pb-10">
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">7</span>
                  Governing Law &amp; Dispute Resolution
                </h3>
                <p className="mb-4">
                  These Terms, their interpretation, and any disputes or claims arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the substantive laws of the <strong>Republic of India</strong>.
                </p>
                <p>
                  Any dispute, controversy, or claim arising out of or relating to this contract shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Jhajjar / Bahadurgarh (Haryana) or Delhi NCR, India</strong>.
                </p>
              </div>

              {/* Clause 8 - Contact */}
              <div>
                <h3 className="text-navy font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold">8</span>
                  Contact &amp; Legal Notices
                </h3>
                <p className="mb-6">
                  For legal inquiries, formal notices, or questions regarding these Terms and Conditions, please contact:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="space-y-2">
                    <p className="font-bold text-navy flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-copper" />
                      Legal Department
                    </p>
                    <p className="text-sm">Suraj Wood Products Pvt. Ltd.</p>
                    <p className="text-xs text-gray-500">CIN: U36100HR2010PTC041234</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-copper" />
                      <a href="mailto:sales@surajwood.com" className="text-copper hover:underline font-medium">sales@surajwood.com</a>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-copper" />
                      <a href="tel:+919009171819" className="hover:underline font-medium">+91-9009171819</a>
                    </p>
                    <p className="text-xs text-gray-500 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
                      45 KM Stone, VPO Rohad, Bahadurgarh, Jhajjar, Haryana - 124501, India.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
