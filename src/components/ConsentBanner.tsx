"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "neonk_consent";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem(STORAGE_KEY);
    if (!consented) {
      const t = setTimeout(() => setShow(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const agree = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop — z-index from design-token scale */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: "var(--z-consent)" }}
          />

          {/* Banner — one layer above backdrop */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 p-4 md:p-6 pointer-events-none"
            style={{ zIndex: "calc(var(--z-consent) + 1)" }}
          >
            <div className="max-w-2xl mx-auto double-bezel pointer-events-auto">
              <div className="double-bezel-inner p-5 md:p-7 bg-surface/95 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  {/* Document/legal icon */}
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                    <DocumentIcon />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1.5">
                      الشروط والأحكام
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      باستمرارك في استخدام موقع Neon-K، أنت توافق على
                      {" "}
                      <a
                        href="/terms-en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-cyan underline underline-offset-2 hover:text-white transition-colors"
                      >
                        الشروط والأحكام
                      </a>
                      {" "}
                      وسياسة الخصوصية الخاصة بنا.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={agree}
                        className="glow-btn px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        أوافق وأكمل التصفح
                      </button>
                      <a
                        href="/terms-en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-white/20 text-white/70 text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors duration-200 text-center"
                      >
                        عرض الشروط كاملة
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}
