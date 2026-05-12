import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
  title: "Technical Resources & Shade Cards",
  description: "Download SurajWood ACRYLUX shade cards, AL-PROFHAN hardware catalogs, and technical installation guides for premium interior projects.",
};

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.surajwood.com" },
      { name: "Downloads", url: "https://www.surajwood.com/downloads" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      {children}
    </>
  );
}
