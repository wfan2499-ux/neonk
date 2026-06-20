export const metadata = {
  title: "تم الدفع بنجاح | Neon-K",
  description: "تم استلام دفعتك بنجاح. سنتواصل معك قريباً.",
};

export default function PaymentSuccess() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 text-center">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center mb-6">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neon-cyan"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        تم <span className="gradient-text">الدفع</span> بنجاح
      </h1>
      <p className="text-text-secondary text-lg mb-8 max-w-md leading-relaxed">
        شكراً لطلبك. سنتواصل معك عبر الواتساب خلال ساعات العمل لتأكيد الطلب
        واستلام الصورة.
      </p>

      <a
        href="/"
        className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
        العودة للمتجر
      </a>
    </div>
  );
}
