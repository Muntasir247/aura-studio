"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { products } from "@/mock-data/products";
import { formatPrice } from "@/lib/utils";

interface CrossSellGridProps {
  productIds: string[];
}

export function CrossSellGrid({ productIds }: CrossSellGridProps) {
  const related = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  if (related.length === 0) return null;

  return (
    <section className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop mt-8">
      <div className="max-w-container-max mx-auto">
        <h2 className="font-headline-md text-headline-sm md:text-headline-md text-center text-primary mb-12">
          Complete the Look
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {related.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group block"
            >
              <div className="aspect-[3/4] bg-surface-container overflow-hidden mb-4 relative">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/90 text-primary font-button text-xs py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-sm pointer-events-none">
                  Quick View
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps text-primary mb-1">
                {product.name}
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
