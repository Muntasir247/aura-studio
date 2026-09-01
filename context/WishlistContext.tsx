"use client";

import {
  createContext,
  useReducer,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import type { WishlistItem, WishlistState, WishlistAction } from "@/types/wishlist";
import {
  wishlistReducer,
  INITIAL_WISHLIST_STATE,
} from "@/reducers/wishlistReducer";

const STORAGE_KEY = "the-vault-wishlist";

interface WishlistContextValue {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

export const WishlistContext = createContext<WishlistContextValue | null>(null);

function loadFromStorage(): WishlistState {
  if (typeof window === "undefined") return INITIAL_WISHLIST_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { items: parsed.items ?? [] };
    }
  } catch {
    // ignore
  }
  return INITIAL_WISHLIST_STATE;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, null, loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items })
      );
    } catch {
      // ignore
    }
  }, [state.items]);

  const isInWishlist = useMemo(
    () => (productId: string) =>
      state.items.some((item) => item.productId === productId),
    [state.items]
  );

  const wishlistCount = useMemo(() => state.items.length, [state.items]);

  const value = useMemo(
    () => ({ state, dispatch, isInWishlist, wishlistCount }),
    [state, dispatch, isInWishlist, wishlistCount]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
