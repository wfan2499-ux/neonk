"use client";

import { useState } from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {children}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CartFAB onClick={() => setCartOpen(true)} />
    </CartProvider>
  );
}

// ── Floating cart button with item count badge ─────────

function CartFAB({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-neon-cyan text-black shadow-[0_0_24px_rgba(0,240,255,0.3)] hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
      aria-label={`فتح السلة - ${itemCount} منتجات`}
    >
      <CartIcon />

      {/* Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center px-1 border-2 border-bg animate-in">
          {itemCount}
        </span>
      )}
    </button>
  );
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
