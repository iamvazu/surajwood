"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, Settings2, Check, X } from "lucide-react";

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_CONSENT_KEY = "surajwood_cookie_consent_v1";

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    functional: true,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        // Show banner after brief delay for smooth entry
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const updated = { ...prefs, timestamp: new Date().toISOString() };
    setPreferences(updated);
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updated));
      // Dispatch custom event so analytics or other scripts can react
      window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: updated }));
    } catch {
      // Storage unavailable
    }
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      timestamp: "",
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: "",
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  // Expose global function to re-open modal from footer
  useEffect(() => {
    const handleOpenCookieSettings = () => {
      setShowPreferences(true);
      setIsOpen(true);
    };
    window.addEventListener("openCookieSettings", handleOpenCookieSettings);
    return () => window.removeEventListener("openCookieSettings", handleOpenCookieSettings);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop for Preference Modal */}
      {showPreferences && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setShowPreferences(false)}
        />
      )}

      {/* Main Banner / Modal */}
      <div className="fixed bottom-0 inset-x-0 sm:bottom-6 sm:inset-x-auto sm:right-6 sm:left-6 md:left-auto md:max-w-xl z-50 p-4 sm:p-0">
        <div className="bg-[#181a1d]/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl sm:rounded-3xl shadow-2xl text-white p-5 sm:p-6 transition-all duration-300">
          
          {!showPreferences ? (
            /* Compact Consent Banner */
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-copper/10 border border-copper/30 text-copper flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                      Your Privacy &amp; Data Protection (DPDP Act 2023)
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Suraj Wood Products complies with India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>. 
                    We use cookies to deliver seamless acrylic sample orders, secure inquiries, and analyze website performance.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-800 text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <Link href="/privacy-policy" className="hover:text-copper underline underline-offset-2 transition-colors">
                    Privacy Policy
                  </Link>
                  <span>•</span>
                  <Link href="/cookie-policy" className="hover:text-copper underline underline-offset-2 transition-colors">
                    Cookie Policy
                  </Link>
                  <span>•</span>
                  <Link href="/terms-and-conditions" className="hover:text-copper underline underline-offset-2 transition-colors">
                    Terms
                  </Link>
                </div>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="inline-flex items-center gap-1.5 text-copper hover:text-white font-medium transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                <button
                  onClick={handleRejectNonEssential}
                  className="px-3 py-2 sm:py-2.5 rounded-xl border border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-all text-center"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="hidden sm:block px-3 py-2 sm:py-2.5 rounded-xl border border-copper/40 bg-copper/10 hover:bg-copper/20 text-copper text-xs font-semibold transition-all text-center"
                >
                  Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="col-span-1 sm:col-span-1 px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-copper to-[#B91C1C] hover:brightness-110 text-white text-xs font-bold shadow-md shadow-copper/20 transition-all text-center"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            /* Granular Preferences Modal */
            <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-copper" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Consent Preferences (DPDP Act, 2023)
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                In compliance with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong>, 
                you have complete autonomy over the personal data and cookies we process. You can toggle optional categories below.
              </p>

              {/* Toggles */}
              <div className="space-y-3">
                {/* 1. Necessary */}
                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Strictly Necessary Cookies</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                        Always Active
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Required for secure website navigation, form submissions (sample requests, dealer inquiries), CSRF tokens, and remembering your consent state.
                    </p>
                  </div>
                  <div className="p-1 text-emerald-400 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                </div>

                {/* 2. Analytics */}
                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-2">
                    <span className="text-xs font-bold text-white">Analytics &amp; Performance</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Helps us analyze visitor counts, shade popularity, and page load speeds using anonymized IP tracking (Google Analytics &amp; Vercel Web Analytics).
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-copper"></div>
                  </label>
                </div>

                {/* 3. Functional */}
                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-2">
                    <span className="text-xs font-bold text-white">Functional &amp; Experience</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Stores user preferences such as your favorite shades list, sample inquiry draft state, and regional city filters.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-copper"></div>
                  </label>
                </div>

                {/* 4. Marketing */}
                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-2">
                    <span className="text-xs font-bold text-white">Marketing &amp; Product Updates</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Allows personalized communication regarding new shade launches, architectural catalogues, and exhibition invitations.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-copper"></div>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-copper to-[#B91C1C] hover:brightness-110 text-white text-xs font-bold shadow-md shadow-copper/20 transition-all"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
