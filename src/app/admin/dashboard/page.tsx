"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────

interface Order {
  id: number;
  order_id: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  items: { title: string; quantity: number; price_halalas: number }[];
  total_halalas: number;
  receipt_url: string;
  status: string;
  created_at: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price_halalas: number;
  image_url: string;
  created_at: string;
}

// ── Main Dashboard ─────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [session, setSession] = useState(false);
  const [checking, setChecking] = useState(true);

  // Auth check
  useEffect(() => {
    getSupabase()
      .auth.getSession()
      .then(({ data }) => {
        if (!data.session) {
          router.replace("/admin/login");
        } else {
          setSession(true);
        }
      })
      .finally(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-neon-cyan" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
        </svg>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-xl border-b border-white/8 px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          Neon-<span className="gradient-text">K</span>
        </h1>
        <button
          onClick={async () => {
            await getSupabase().auth.signOut();
            router.replace("/admin/login");
          }}
          className="text-sm text-text-secondary hover:text-red-400 transition-colors"
        >
          تسجيل خروج
        </button>
      </header>

      {/* Tab content */}
      <div className="px-4 pt-4">
        {tab === "orders" ? <OrdersTab /> : <ProductsTab />}
      </div>

      {/* Sticky bottom tabs */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-bg/95 backdrop-blur-xl border-t border-white/8 flex">
        <button
          onClick={() => setTab("orders")}
          className={`flex-1 py-4 text-sm font-bold transition-colors ${
            tab === "orders"
              ? "text-neon-cyan border-t-2 border-neon-cyan -mt-[2px]"
              : "text-text-secondary"
          }`}
        >
          الطلبات
        </button>
        <button
          onClick={() => setTab("products")}
          className={`flex-1 py-4 text-sm font-bold transition-colors ${
            tab === "products"
              ? "text-neon-cyan border-t-2 border-neon-cyan -mt-[2px]"
              : "text-text-secondary"
          }`}
        >
          المنتجات
        </button>
      </nav>
    </div>
  );
}

// ── Orders Tab ─────────────────────────────────────────

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const { data, error: dbError } = await getSupabase()
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function toggleStatus(order: Order) {
    const newStatus =
      order.status === "قيد التنفيذ" ? "تم التوصيل" : "قيد التنفيذ";

    const { error: dbError } = await getSupabase()
      .from("orders")
      .update({ status: newStatus })
      .eq("id", order.id);

    if (dbError) return;

    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <svg className="animate-spin h-6 w-6 text-neon-cyan" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400">
        <p>{error}</p>
        <button onClick={fetchOrders} className="mt-4 text-neon-cyan underline">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-text-secondary">
        <p>لا توجد طلبات حالياً</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="neon-card p-4 space-y-3"
        >
          {/* Top row: ID + status */}
          <div className="flex items-center justify-between">
            <span className="text-neon-cyan font-bold text-sm">
              {order.order_id}
            </span>
            <button
              onClick={() => toggleStatus(order)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                order.status === "قيد التنفيذ"
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                  : "bg-green-500/10 text-green-400 border border-green-500/30"
              }`}
            >
              {order.status}
            </button>
          </div>

          {/* Customer info */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-text-secondary">الاسم: </span>
              <span className="font-bold">{order.name}</span>
            </div>
            <div>
              <span className="text-text-secondary">الجوال: </span>
              <span className="font-bold" dir="ltr">{order.phone}</span>
            </div>
            <div className="col-span-2">
              <span className="text-text-secondary">المدينة: </span>
              <span>{order.city}</span>
              {" · "}
              <span>{order.address}</span>
            </div>
          </div>

          {/* Items */}
          <div className="text-xs text-text-secondary border-t border-border pt-2">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{item.price_halalas / 100} ر.س</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-white mt-1 pt-1 border-t border-border/50">
              <span>الإجمالي</span>
              <span className="text-neon-cyan">{order.total_halalas / 100} ر.س</span>
            </div>
          </div>

          {/* Receipt button */}
          <a
            href={order.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold text-neon-cyan transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
            عرض الإيصال
          </a>
        </div>
      ))}
    </div>
  );
}

// ── Products Tab ───────────────────────────────────────

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const { data, error: dbError } = await getSupabase()
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <svg className="animate-spin h-6 w-6 text-neon-cyan" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400">
        <p>{error}</p>
        <button onClick={fetchProducts} className="mt-4 text-neon-cyan underline">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Product list */}
      <div className="space-y-3">
        {products.length === 0 ? (
          <div className="text-center py-20 text-text-secondary">
            <p>لا توجد منتجات حالياً</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="neon-card p-4 flex gap-3"
            >
              {/* Thumbnail */}
              <div className="shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-surface">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{product.title}</h3>
                <p className="text-text-secondary text-xs mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-neon-cyan font-bold text-sm mt-1">
                  {product.price_halalas / 100} ر.س
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-20 right-4 z-20 w-14 h-14 rounded-full bg-neon-cyan text-black shadow-[0_0_24px_rgba(0,240,255,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-2xl font-bold"
      >
        +
      </button>

      {/* Add Product Modal */}
      {modalOpen && (
        <AddProductModal
          onClose={() => setModalOpen(false)}
          onAdded={() => {
            setModalOpen(false);
            fetchProducts();
          }}
        />
      )}
    </>
  );
}

// ── Add Product Modal ──────────────────────────────────

function AddProductModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceHalalas, setPriceHalalas] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleAdd() {
    setError("");

    if (!title || !description || !priceHalalas) {
      setError("الرجاء تعبئة جميع الحقول");
      return;
    }
    if (!imageFile) {
      setError("الرجاء اختيار صورة للمنتج");
      return;
    }

    setSaving(true);
    try {
      // Upload image
      const imagePath = `product-${Date.now()}.png`;
      const { error: uploadError } = await getSupabase()
        .storage
        .from("products")
        .upload(imagePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw new Error("فشل رفع الصورة: " + uploadError.message);

      const { data: urlData } = getSupabase()
        .storage
        .from("products")
        .getPublicUrl(imagePath);

      // Insert product
      const { error: dbError } = await getSupabase()
        .from("products")
        .insert({
          title,
          description,
          price_halalas: parseInt(priceHalalas, 10),
          image_url: urlData.publicUrl,
        });

      if (dbError) throw new Error("فشل حفظ المنتج: " + dbError.message);

      onAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 bottom-4 z-50 max-h-[90vh] overflow-y-auto neon-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">إضافة منتج جديد</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">
            اسم المنتج *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            placeholder="لوحة نيون جديدة"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">
            الوصف *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
            placeholder="وصف المنتج..."
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">
            السعر (بالهللة) *
          </label>
          <input
            type="number"
            value={priceHalalas}
            onChange={(e) => setPriceHalalas(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            placeholder="95000"
            dir="ltr"
          />
          <p className="text-xs text-text-secondary mt-1">
            مثال: 95000 = 950 ر.س
          </p>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">
            صورة المنتج *
          </label>
          <div
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) setImageFile(file);
              };
              input.click();
            }}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
              imageFile
                ? "border-neon-cyan/40 bg-neon-cyan/5"
                : "border-border hover:border-neon-cyan/30"
            }`}
          >
            {imageFile ? (
              <p className="text-sm text-neon-cyan font-bold">{imageFile.name}</p>
            ) : (
              <p className="text-sm text-text-secondary">اضغط لاختيار صورة</p>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleAdd}
          disabled={saving}
          className="flex items-center justify-center w-full py-3.5 rounded-xl bg-neon-cyan text-black font-bold text-base hover:bg-neon-cyan/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "جاري الحفظ..." : "حفظ المنتج"}
        </button>
      </div>
    </>
  );
}
