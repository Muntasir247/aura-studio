"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/mock-data/products";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

const newArrivals = products
  .filter((p) => p.tags.includes("new-in"))
  .slice(0, 3);

export function NewArrivals() {
  return (
    <section className="py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif text-headline-md md:text-display-lg text-primary">
            New Arrivals
          </h2>
          <Link
            href="/collections/new-arrivals"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors border-b border-outline-variant pb-1"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {newArrivals.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                {product.tags.includes("new-in") && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="new-in" size="sm">
                      New In
                    </Badge>
                  </div>
                )}
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-body-md text-body-md text-primary">
                  {product.name}
                </h3>
                <p className="font-label-caps text-label-caps text-on-surface-variant">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
