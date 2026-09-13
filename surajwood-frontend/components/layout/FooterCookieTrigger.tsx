"use client";

import { Cookie } from "lucide-react";

export default function FooterCookieTrigger() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCookieSettings"));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-500 hover:text-copper text-xs transition-colors inline-flex items-center gap-1 font-light"
      aria-label="Manage Cookie & DPDP Consent Preferences"
    >
      <Cookie size={12} className="text-copper" />
      <span>Cookie Settings</span>
    </button>
  );
}
