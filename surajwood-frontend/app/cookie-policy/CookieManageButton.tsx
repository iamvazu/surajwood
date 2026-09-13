"use client";

import { Settings2 } from "lucide-react";

export default function CookieManageButton() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCookieSettings"));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-copper hover:bg-copper/90 text-white text-xs sm:text-sm font-bold shadow-md shadow-copper/20 transition-all flex-shrink-0"
    >
      <Settings2 className="w-4 h-4" />
      <span>Open Consent Settings</span>
    </button>
  );
}
