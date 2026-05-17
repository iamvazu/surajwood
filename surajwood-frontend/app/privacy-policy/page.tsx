import type { Metadata } from "next";
import Link from "next/link";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy | Suraj Wood Products",
  description: "Read our privacy policy to understand how Suraj Wood Products collects, uses, and protects your personal information when you visit our website.",
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

      {/* Hero Section */}
      <section className="bg-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-copper/20 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="mb-8 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-white/40">›</li>
              <li className="text-white font-medium" aria-current="page">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Privacy <span className="text-copper">Policy</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Your privacy is important to us. This policy outlines how we handle and protect your information at Suraj Wood Products.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-navy prose-lg">
            <p className="text-gray-500 text-sm mb-12">Last Updated: May 11, 2026</p>

            <div className="space-y-16">
              {/* Introduction */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to Suraj Wood Products (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <a href="mailto:sales@surajwood.com" className="text-copper font-semibold hover:underline">sales@surajwood.com</a>.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">2. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Request a physical sample through our website.</li>
                  <li>Fill out a contact form or inquiry through our Website Leads portal.</li>
                  <li>Subscribe to our newsletter for design trends and product updates.</li>
                  <li>Contact us directly via phone or email for commercial inquiries.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  The personal information we collect may include names, phone numbers, email addresses, mailing addresses (for sample delivery), and business names.
                </p>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">3. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Provide Services:</strong> Deliver requested acrylic samples and process your product inquiries.</li>
                  <li><strong>Communication:</strong> Respond to your requests, provide technical support, and send administrative information.</li>
                  <li><strong>Marketing:</strong> With your consent, send you marketing communications regarding new product launches like the AL-PROFHAN series or ACRYLUX color updates.</li>
                  <li><strong>CRM Integration:</strong> Manage your lead information within our secure Perfex CRM system to improve our service delivery.</li>
                </ul>
              </div>

              {/* Data Protection */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">4. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. For example, website leads are transferred via secure API protocols to our internal management systems. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">5. Cookies and Tracking</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. This helps us understand how you use our site and improve your experience—for example, by remembering your preferred language or region.
                </p>
              </div>

              {/* Third-Party Disclosure */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">6. Third-Party Disclosure</h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, such as our hosting providers (Vercel) or sample delivery partners, so long as those parties agree to keep this information confidential.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-navy font-heading font-bold text-3xl mb-6">7. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed">
                  Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request a review of your information, please submit a request to our support team.
                </p>
              </div>

              {/* Contact Us */}
              <div className="bg-cream/50 p-8 rounded-3xl border border-cream">
                <h2 className="text-navy font-heading font-bold text-2xl mb-4">8. Contact Us</h2>
                <p className="text-gray-600 mb-6">
                  If you have questions or comments about this policy, you may contact our data protection officer:
                </p>
                <div className="space-y-2 text-navy">
                  <p className="font-bold">Suraj Wood Products</p>
                  <p>45 KM Stone, Bahadurgarh, Haryana, India</p>
                  <p>Email: <a href="mailto:sales@surajwood.com" className="text-copper hover:underline">sales@surajwood.com</a></p>
                  <p>Phone: +91-9009171819</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-cream border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 mb-8">Need more information about our business practices?</p>
          <div className="flex justify-center gap-6">
            <Link href="/about" className="text-navy font-bold hover:text-copper transition-colors">About Us</Link>
            <Link href="/contact" className="text-navy font-bold hover:text-copper transition-colors">Contact Support</Link>
            <Link href="/faq" className="text-navy font-bold hover:text-copper transition-colors">FAQs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
