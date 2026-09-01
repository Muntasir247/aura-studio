"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasNewTag = product.tags.includes("new-in");
  const hasExclusiveTag = product.tags.includes("exclusive");
  const isLowStock =
    product.lowStockThreshold !== undefined &&
    product.sizes.some(
      (s) => s.available && s.stock !== undefined && s.stock <= product.lowStockThreshold!
    );

  return (
    <Link href={`/product/${product.slug}`} className="group cursor-pointer block">
      <div className="relative overflow-hidden mb-4 aspect-[3/4]">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {hasNewTag && (
            <Badge variant="new-in" size="sm">
              New In
            </Badge>
          )}
          {hasExclusiveTag && (
            <Badge variant="ochre" size="sm">
              Exclusive
            </Badge>
          )}
        </div>

        {/* Quick add button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-surface/90 text-primary font-button text-xs py-2 px-6 rounded-full">
            Quick Add
          </span>
        </div>

        {/* Image */}
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-body-md text-body-md text-primary group-hover:text-primary/80 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-label-caps text-label-caps text-on-surface-variant">
            {formatPrice(product.price)}
          </p>
          {isLowStock && (
            <span className="text-[10px] text-on-tertiary-container font-label-caps uppercase tracking-widest">
              Low Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
