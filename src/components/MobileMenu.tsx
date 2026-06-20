"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";

const WHATSAPP = "966581194038";

const links = [
  { href: "/#products", label: "التصاميم" },
  { href: "/#how-it-works", label: "كيف تطلب" },
  { href: "/policies", label: "السياسات" },
  { href: "/policies#returns", label: "الإسترجاع والضمان" },
  { href: "/policies#shipping", label: "الشحن والتوصيل" },
];

export default function MobileMenu({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);

  function toggle() {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  }

  function close() {
    setOpen(false);
    onOpenChange?.(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ☰ Hamburger button */}
      <button
        onClick={toggle}
        aria-label="فتح القائمة"
        className="flex md:hidden items-center justify-center w-11 h-11 rounded-full bg-surface border border-white/15"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <rect width="20" height="2" rx="1" fill="white" />
          <rect y="6" width="20" height="2" rx="1" fill="white" />
          <rect y="12" width="20" height="2" rx="1" fill="white" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex flex-col px-6"
          >
            {/* ✕ Close button — top right */}
            <div className="flex justify-end pt-6 pb-2">
              <button
                onClick={close}
                aria-label="إغلاق القائمة"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links — centered */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-4 -mt-12">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block text-center py-4 text-2xl font-bold text-white/80 hover:text-white active:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* WhatsApp CTA — fixed at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: links.length * 0.06, ease: [0.32, 0.72, 0, 1] }}
              className="w-full max-w-xs mx-auto pb-10"
            >
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("السلام عليكم - عندي استفسار عن اللوحات الجدارية")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#25D366] text-white font-bold text-lg active:scale-95 transition-transform"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                واتساب
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
