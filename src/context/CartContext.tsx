"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

// ── Types ──────────────────────────────────────────────

export interface CartProduct {
  id: string;
  title: string;
  desc: string;
  img: string;
  price: number; // halalas
  quantity: number;
}

interface CartState {
  items: CartProduct[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Omit<CartProduct, "quantity"> }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR" };

interface CartContextValue extends CartState {
  addToCart: (product: Omit<CartProduct, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalHalalas: number;
  itemCount: number;
}

// ── Reducer ─────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product: Omit<CartProduct, "quantity">) =>
    dispatch({ type: "ADD_ITEM", product });

  const removeFromCart = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", id });

  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });

  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalHalalas = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalHalalas,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
