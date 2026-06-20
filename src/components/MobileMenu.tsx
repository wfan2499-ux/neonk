"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const WHATSAPP = "966581194038";

const links = [
  { href: "/#products", label: "التصاميم" },
  { href: "/#how-it-works", label: "كيف تطلب" },
  { href: "/policies", label: "السياسات" },
  { href: "/policies#returns", label: "الإسترجاع والضمان" },
  { href: "/policies#shipping", label: "الشحن والتوصيل" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        onClick={toggle}
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        className="relative z-[200] flex md:hidden items-center justify-center w-11 h-11 rounded-full bg-surface border border-white/15 hover:border-white/25 active:scale-95 transition-all duration-200"
      >
        <div className="relative w-[18px] h-[14px]">
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-0 left-0 w-full h-[2px] rounded-full bg-white origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-1/2 left-0 w-full h-[2px] rounded-full bg-white -translate-y-1/2 origin-center"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-white origin-center"
          />
        </div>
      </button>

      {/* Overlay menu — original style, fixed scroll/position */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-xl"
              onClick={close}
            />

            {/* Content — scrollable, starts from top */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[160] flex flex-col items-center overflow-y-auto pt-24 pb-12 px-6"
              onClick={close}
            >
              <nav
                className="flex flex-col items-center gap-3 w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? undefined : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.06,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block text-center py-4 text-2xl font-bold text-white/80 hover:text-white active:text-neon-cyan transition-colors active:scale-[0.97]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* WhatsApp CTA */}
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: links.length * 0.06, ease: [0.32, 0.72, 0, 1] }}
                  className="mt-6 w-full"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("السلام عليكم - عندي استفسار عن اللوحات الجدارية")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#25D366] text-white font-bold text-lg active:scale-[0.97] transition-transform"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    واتساب
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
