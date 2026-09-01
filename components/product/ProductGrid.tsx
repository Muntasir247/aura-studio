"use client";

import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <span className="material-symbols-outlined text-[48px] text-outline-variant">
          search_off
        </span>
        <p className="font-headline-sm text-on-surface-variant">
          No products found
        </p>
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-gutter">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
