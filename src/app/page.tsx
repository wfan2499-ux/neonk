"use client";

import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import SaudiRiyalPrice from "@/components/SaudiRiyalPrice";
import { useCart } from "@/context/CartContext";

const WHATSAPP = "966581194038";
const EMAIL = "nneon.kk@gmail.com";

const products = [
  {
    id: "no-smoking",
    title: 'لوحة نيون "ممنوع التدخين"',
    desc: "تصميم نيون أحمر داخل صندوق شبكي بستايل ريترو - يضيف جو الأماكن القديمة لأي ركن",
    img: "https://github.com/user-attachments/assets/3a7a63bc-c783-4da2-8d0a-0a3137173db5",
    color: "rgba(255,40,40,0.15)",
    price: 95000, // 950 SAR
  },
  {
    id: "what-if",
    title: 'لوحة نيون "What if it all works out"',
    desc: "خط نيون أبيض بستايل عناوين الصحف - تفاصيل دقيقة بدون تعقيد",
    img: "https://github.com/user-attachments/assets/2483e7dd-fdb6-4ca1-bde1-e331e4f639d0",
    color: "rgba(255,255,255,0.10)",
    price: 120000, // 1200 SAR
  },
  {
    id: "yellow-portrait",
    title: "بورتريه نيون أصفر",
    desc: "رسمة خط واحد بإضاءة صفراء دافئة - لمسة فنية بسيطة وهادئة",
    img: "https://github.com/user-attachments/assets/9ac48701-cf9b-4aa5-b7df-a288e7890c5d",
    color: "rgba(255,230,0,0.15)",
    price: 100000, // 1000 SAR
  },
];

export default function Home() {
  const reduce = useReducedMotion();

  // Page-level scroll — nav fades over first 400px of scrolling
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <>
      <Nav style={reduce ? {} : { opacity: navOpacity }} />
      <main>
        {/* Hero */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-end pb-16 md:pb-24 overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.jpg"
              alt="Neon-K wall art"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Neon glow accents over hero */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-cyan/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neon-magenta/8 blur-[100px] rounded-full" />
          </div>

          {/* Hero tagline */}
          <div className="relative z-[2] text-center px-4 mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              نيون يوصلك بسرعة. بدون انتظار من برّه.
            </h1>
          </div>

          {/* Bottom fade to bg */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-bg to-transparent z-[1] pointer-events-none" />
        </section>

        {/* Products */}
        <ProductsSection />
        {/* How it works */}
        <HowItWorks />
        {/* CTA */}
        <CTASection />
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

function Nav({ style }: { style?: { opacity?: MotionValue<number> } }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-40 flex justify-center pt-3 md:pt-5 px-4 pointer-events-none">
      {/* Floating glass pill */}
      <AnimatePresence>
        {!menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 md:gap-5 w-full sm:w-auto sm:min-w-[420px] max-w-xl rounded-full bg-bg/75 backdrop-blur-2xl border border-white/8 px-4 md:px-5 py-2.5 shadow-[0_4px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.04)_inset] pointer-events-auto"
            style={style}
          >
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <img
            src="/logo.svg"
            alt="Neon-K"
            className="h-7 w-auto"
          />
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* WhatsApp (desktop only) */}
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("السلام عليكم، عندي استفسار عن اللوحات الجدارية")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-bold hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <WhatsAppIcon />
          واتساب
        </a>

        {/* Mobile hamburger */}
        <div className="shrink-0">
          <MobileMenu onOpenChange={setMenuOpen} />
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ProductsSection() {
  const { addToCart } = useCart();

  return (
    <section id="products" className="py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-20 px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">التصاميم</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            كل تصميم له شخصيته الخاصة - اختر اللي يناسب ذوقك ومكانك
          </p>
        </motion.div>

        {/* Product grid — CSS Grid, equal column widths */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-4 md:px-0 pb-2"
        >
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="double-bezel group max-w-sm mx-auto md:max-w-none"
            >
              <div className="double-bezel-inner overflow-hidden flex flex-col h-full">
                {/* Product image */}
                <div className="relative aspect-[4/5] md:aspect-[9/16] overflow-hidden">
                  {'contain' in p ? (
                    <>
                      {/* Blurred background fill */}
                      <Image
                        src={p.img}
                        alt=""
                        fill
                        className="object-cover scale-110 blur-[20px] saturate-150"
                        sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Foreground — fully visible, no crop */}
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-contain relative z-10"
                        sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </>
                  ) : (
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {/* Hover color overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-end p-4 z-20"
                    style={{ background: `linear-gradient(to top, ${p.color}, transparent 60%)` }}
                  />
                </div>

                {/* Info */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

                  {/* Price */}
                  <p className="text-base font-bold text-neon-cyan mb-4">
                    <SaudiRiyalPrice amount={p.price / 100} />
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {/* Add to Cart */}
                    <button
                      onClick={() => addToCart({ id: p.id, title: p.title, desc: p.desc, img: p.img, price: p.price })}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-neon-cyan/40 text-neon-cyan font-bold text-sm hover:bg-neon-cyan/10 active:scale-[0.98] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      <PlusIcon />
                      أضف للسلة
                    </button>
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`مرحباً، عندي سؤال عن "${p.title}"`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#25D366]/90 active:scale-[0.98] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      <WhatsAppIcon />
                      واتساب
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "اختر تصميمك",
      desc: "اختر تصميمك من المجموعة",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
    },
    {
      title: "ادفع أونلاين بأمان",
      desc: "ادفع أونلاين بأمان",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <path d="M1 10h22" />
        </svg>
      ),
    },
    {
      title: "يوصلك بسرعة",
      desc: "يوصلك بسرعة داخل السعودية - بدون انتظار شحن دولي",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-36 px-4 bg-surface/20">
      <div className="max-w-6xl mx-auto">
        {/* Editorial split — headline left, timeline right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

          {/* Left block — large headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              كيف <span className="gradient-text">تطلب؟</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xs">
              ثلاث خطوات بسيطة وتكون لوحتك عندك
            </p>
          </motion.div>

          {/* Right block — vertical timeline */}
          <div className="md:col-span-7">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute top-0 bottom-0 right-[27px] w-px bg-gradient-to-b from-neon-cyan/40 via-neon-cyan/20 to-transparent"
                aria-hidden="true"
              />

              <div className="space-y-12 md:space-y-16">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-5 md:gap-8"
                  >
                    {/* Step node — sits on the timeline */}
                    <div className="relative z-10 shrink-0 w-[54px] h-[54px] rounded-2xl bg-surface border border-neon-cyan/25 flex items-center justify-center text-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.06)]">
                      {step.icon}
                    </div>

                    {/* Step content */}
                    <div className="pt-1">
                      <span className="inline-block text-[11px] font-bold text-neon-cyan/40 mb-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px] bg-neon-cyan/5 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            عندك سؤال عن أي تصميم؟
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto leading-relaxed">
            تواصلنا واتساب ونرد عليك بسرعة.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("السلام عليكم - أبغى أطلب لوحة جدارية")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group glow-btn inline-flex items-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-[#25D366] text-white font-bold text-lg sm:text-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <span className="btn-icon-wrap-light">
              <WhatsAppIcon />
            </span>
            تواصل معنا واتساب
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo & contact */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src="/logo.svg"
              alt="Neon-K"
              className="h-7 w-auto opacity-80"
            />
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon />
                <span dir="ltr">+966 58 119 4038</span>
              </a>
              <span className="text-border">|</span>
              <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-text-secondary">
            <Link href="/policies" className="hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/policies#returns" className="hover:text-white transition-colors">
              الإسترجاع والضمان
            </Link>
            <Link href="/policies#shipping" className="hover:text-white transition-colors">
              الشحن والتوصيل
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-text-secondary/50 pt-6 border-t border-border/50">
          © 2026 Neon-K. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

// Icons
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
