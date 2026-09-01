"use client";

import {
  createContext,
  useReducer,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem, CartState, CartAction } from "@/types/cart";
import {
  cartReducer,
  INITIAL_CART_STATE,
} from "@/reducers/cartReducer";

const FREE_SHIPPING_THRESHOLD = 300;
const STORAGE_KEY = "the-vault-cart";

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  freeShippingRemaining: number;
  qualifiesForFreeShipping: boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartState {
  if (typeof window === "undefined") return INITIAL_CART_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...INITIAL_CART_STATE,
        items: parsed.items ?? [],
        promoCode: parsed.promoCode ?? null,
        promoDiscount: parsed.promoDiscount ?? 0,
      };
    }
  } catch {
    // ignore
  }
  return INITIAL_CART_STATE;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: state.items,
          promoCode: state.promoCode,
          promoDiscount: state.promoDiscount,
        })
      );
    } catch {
      // ignore
    }
  }, [state.items, state.promoCode, state.promoDiscount]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const shipping = useMemo(
    () => (qualifiesForFreeShipping ? 0 : 25),
    [qualifiesForFreeShipping]
  );

  const total = useMemo(
    () => Math.max(0, subtotal + shipping - state.promoDiscount),
    [subtotal, shipping, state.promoDiscount]
  );

  const freeShippingRemaining = useMemo(
    () => Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    [subtotal]
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
      subtotal,
      shipping,
      total,
      itemCount,
      freeShippingRemaining,
      qualifiesForFreeShipping,
    }),
    [
      state,
      dispatch,
      subtotal,
      shipping,
      total,
      itemCount,
      freeShippingRemaining,
      qualifiesForFreeShipping,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
