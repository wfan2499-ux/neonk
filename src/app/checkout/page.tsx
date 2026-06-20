"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getSupabase } from "@/lib/supabase";
import SaudiRiyalPrice from "@/components/SaudiRiyalPrice";

const WHATSAPP = "966581194038";
const IBAN = "SA00 0000 0000 0000 0000 0000"; // placeholder
const STC_PAY = "966581194038";

interface ShippingInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalHalalas, clearCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    phone: "",
    city: "",
    address: "",
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  // Redirect to home if cart is empty (and not yet submitted)
  if (items.length === 0 && !orderId) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center gap-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-30"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
        </svg>
        <p className="text-text-secondary text-lg">السلة فارغة</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-neon-cyan text-black font-bold hover:bg-neon-cyan/90 transition-colors"
        >
          تصفح التصاميم
        </Link>
      </div>
    );
  }

  // ── Confirmation screen ────────────────────────────────

  if (orderId) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neon-cyan"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">تم إرسال طلبك بنجاح!</h1>
        <p className="text-text-secondary max-w-md leading-relaxed">
          رقم الطلب: <span className="text-neon-cyan font-bold">{orderId}</span>
        </p>
        <p className="text-text-secondary max-w-md leading-relaxed">
          سيتم مراجعة طلبك والتواصل معك قريباً عبر الواتساب لتأكيد الشحن.
        </p>
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-neon-cyan text-black font-bold hover:bg-neon-cyan/90 transition-colors"
        >
          العودة للمتجر
        </Link>
      </div>
    );
  }

  // ── Helpers ────────────────────────────────────────────

  function updateShipping(field: keyof ShippingInfo, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  function generateOrderId(): string {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `#NK-${num}`;
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback silently
    }
  }

  // ── Submit ─────────────────────────────────────────────

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    // Validate
    if (!shipping.name || !shipping.phone || !shipping.city || !shipping.address) {
      setError("الرجاء تعبئة جميع بيانات الشحن");
      return;
    }
    if (!receiptFile) {
      setError("الرجاء رفع صورة إيصال التحويل");
      return;
    }

    setSubmitting(true);

    try {
      const newOrderId = generateOrderId();

      // 1. Upload receipt to Supabase Storage — foolproof path
      const cleanPath = `receipt-${Date.now()}.png`;

      // --- RUNTIME DIAGNOSTIC: verify env vars reach the browser ---
      console.log(
        "[neonk:checkout] Supabase URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        "| Key length:",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
        "| Key starts with:",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 15)
      );

      const { data: uploadData, error: uploadError } = await getSupabase().storage
        .from("receipts")
        .upload(cleanPath, receiptFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("[neonk:checkout] Full Supabase upload error:", JSON.stringify(uploadError, null, 2));
        throw new Error("فشل رفع الإيصال: " + uploadError.message);
      }

      // 2. Get public URL
      const { data: urlData } = getSupabase().storage
        .from("receipts")
        .getPublicUrl(cleanPath);

      const receiptUrl = urlData.publicUrl;

      // 3. Insert order into Supabase orders table
      const { error: dbError } = await getSupabase()
        .from("orders")
        .insert({
          order_id: newOrderId,
          name: shipping.name,
          phone: shipping.phone,
          city: shipping.city,
          address: shipping.address,
          items: items.map((i) => ({
            title: i.title,
            quantity: i.quantity,
            price_halalas: i.price,
          })),
          total_halalas: totalHalalas,
          receipt_url: receiptUrl,
          status: "قيد التنفيذ",
        });

      if (dbError) {
        console.error("[neonk:checkout] DB insert error:", JSON.stringify(dbError, null, 2));
        throw new Error("فشل حفظ الطلب: " + dbError.message);
      }

      // 4. Build WhatsApp message
      const productsList = items
        .map(
          (item) =>
            `- ${item.title} × ${item.quantity} = ${item.price / 100} ر.س`
        )
        .join("\n");

      const message = [
        `مرحباً، طلب جديد ${newOrderId}`,
        "",
        `👤 الاسم: ${shipping.name}`,
        `📱 الجوال: ${shipping.phone}`,
        `📍 المدينة: ${shipping.city}`,
        `🏠 العنوان: ${shipping.address}`,
        "",
        "🛒 المنتجات:",
        productsList,
        "",
        `💰 الإجمالي: ${totalHalalas / 100} ر.س`,
        "",
        `📎 صورة الإيصال: ${receiptUrl}`,
      ].join("\n");

      // 5. Open WhatsApp
      const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

      // 6. Clear cart and show confirmation
      clearCart();
      setOrderId(newOrderId);

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          العودة للمتجر
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left: Shipping form ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Shipping info */}
            <div className="neon-card p-6 space-y-4">
              <h2 className="text-lg font-bold mb-2">بيانات الشحن</h2>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  value={shipping.name}
                  onChange={(e) => updateShipping("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  placeholder="محمد أحمد"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  رقم الجوال *
                </label>
                <input
                  type="tel"
                  value={shipping.phone}
                  onChange={(e) => updateShipping("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  المدينة *
                </label>
                <input
                  type="text"
                  value={shipping.city}
                  onChange={(e) => updateShipping("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  placeholder="الرياض"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  العنوان التفصيلي *
                </label>
                <input
                  type="text"
                  value={shipping.address}
                  onChange={(e) => updateShipping("address", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  placeholder="الحي، الشارع، رقم المبنى"
                />
              </div>
            </div>

            {/* Payment info */}
            <div className="neon-card p-6 space-y-4">
              <h2 className="text-lg font-bold mb-2">طريقة الدفع</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                حول المبلغ إلى أحد الحسابات التالية، ثم ارفع صورة الإيصال أدناه:
              </p>

              {/* Bank Transfer */}
              <div className="bg-surface-hover rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-bold text-neon-cyan">
                  تحويل بنكي
                </h3>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm text-text-secondary" dir="ltr">
                    {IBAN}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(IBAN)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                  >
                    نسخ
                  </button>
                </div>
              </div>

              {/* STC Pay */}
              <div className="bg-surface-hover rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-bold text-neon-cyan">STC Pay</h3>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm text-text-secondary" dir="ltr">
                    {STC_PAY}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(STC_PAY)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                  >
                    نسخ
                  </button>
                </div>
              </div>

              {/* Receipt upload */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  رفع صورة الإيصال *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    receiptFile
                      ? "border-neon-cyan/40 bg-neon-cyan/5"
                      : "border-border hover:border-neon-cyan/30"
                  }`}
                >
                  {receiptFile ? (
                    <div className="space-y-1">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mx-auto text-neon-cyan"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                      <p className="text-sm text-neon-cyan font-bold">
                        {receiptFile.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        اضغط للتغيير
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mx-auto text-text-secondary/40"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <p className="text-sm text-text-secondary">
                        اضغط لاختيار صورة الإيصال
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setReceiptFile(file);
                    }}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-neon-cyan text-black font-bold text-base hover:bg-neon-cyan/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M4 12a8 8 0 018-8"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="opacity-75"
                      />
                    </svg>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <WhatsAppIconSmall />
                    تأكيد الطلب وإرسال عبر الواتساب
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ── Right: Order summary ── */}
          <aside className="lg:col-span-2">
            <div className="neon-card p-6 sticky top-24 space-y-4">
              <h2 className="text-lg font-bold">ملخص الطلب</h2>

              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3 first:pt-0"
                  >
                    <div className="shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-surface">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.title}</p>
                      <p className="text-xs text-text-secondary">
                        العدد: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-neon-cyan whitespace-nowrap">
                      <SaudiRiyalPrice amount={(item.price * item.quantity) / 100} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-bold">الإجمالي</span>
                <span className="text-xl font-bold text-neon-cyan">
                  <SaudiRiyalPrice amount={totalHalalas / 100} />
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIconSmall() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
