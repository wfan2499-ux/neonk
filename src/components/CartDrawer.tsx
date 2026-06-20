"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCart, type CartProduct } from "@/context/CartContext";
import SaudiRiyalPrice from "@/components/SaudiRiyalPrice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, totalHalalas, itemCount } =
    useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer — slides from right (RTL) */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0d0d14] border-l border-white/8 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h2 className="text-lg font-bold">
                السلة{" "}
                {itemCount > 0 && (
                  <span className="text-neon-cyan">({itemCount})</span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="إغلاق"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-text-secondary gap-3">
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
                  <p className="text-sm">السلة فارغة</p>
                </div>
              ) : (
                items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))
              )}
            </div>

            {/* Footer — total + checkout */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-white/8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">الإجمالي</span>
                  <span className="text-lg font-bold text-neon-cyan">
                    <SaudiRiyalPrice amount={totalHalalas / 100} />
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-neon-cyan text-black font-bold text-base hover:bg-neon-cyan/90 active:scale-[0.98] transition-all duration-200"
                >
                  متابعة الدفع
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Cart Item Row ──────────────────────────────────────

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartProduct;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
}) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
      {/* Thumbnail */}
      <div className="shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-surface">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info + controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold truncate">{item.title}</h4>
          <p className="text-neon-cyan text-sm font-bold mt-0.5">
            <SaudiRiyalPrice amount={item.price / 100} />
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition-colors"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-bold">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition-colors"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            className="text-text-secondary/60 hover:text-red-400 transition-colors text-xs"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
