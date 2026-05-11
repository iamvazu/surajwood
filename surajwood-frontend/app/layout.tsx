import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.surajwood.com"),
  title: {
    default: "SurajWood | Premium Acrylic Panels – ACRYLUX, ACRYSILK, ACRYMATTE",
    template: "%s | SurajWood – Premium Acrylic Panels",
  },
  description:
    "India's premium acrylic panel manufacturer. ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS panels for kitchens & wardrobes. European technology, pan-India delivery. Call +91-9999995553.",
  keywords: [
    "acrylic panels India",
    "acrylic kitchen panels",
    "ACRYLUX panels",
    "premium acrylic panels",
    "acrylic wardrobe panels",
    "modular kitchen acrylic",
    "Suraj Wood",
    "SurajWood panels",
    "acrylic panel manufacturer India",
  ],
  authors: [{ name: "Suraj Wood Products Pvt. Ltd." }],
  creator: "Suraj Wood Products Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.surajwood.com",
    siteName: "SurajWood",
    title: "SurajWood | Premium Acrylic Panels",
    description:
      "India's premium acrylic panel manufacturer. ACRYLUX, ACRYSILK, ACRYMATTE panels for modern kitchens and wardrobes.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "SurajWood Premium Acrylic Panels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SurajWood | Premium Acrylic Panels",
    description: "India's premium acrylic panel manufacturer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        {/* Schema markup placeholder — import SchemaMarkup + schema generators when lib/schema.ts is ready */}
      </head>
      <body className="font-[family-name:var(--font-dm-sans)] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
        <Analytics />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
