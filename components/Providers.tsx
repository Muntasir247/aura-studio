"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { DrawerProvider } from "@/context/DrawerContext";
import { FilterProvider } from "@/context/FilterContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <DrawerProvider>
          <FilterProvider>{children}</FilterProvider>
        </DrawerProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
