"use client";

import Image from "next/image";
import Link from "next/link";

const EDITORIAL_ITEMS = [
  {
    title: "The Art of Layering",
    subtitle: "FW24 Editorial",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200&auto=format&fit=crop",
    href: "/collections/essentials",
  },
  {
    title: "Structured Elegance",
    subtitle: "Studio Collection",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop",
    href: "/collections/new-arrivals",
  },
];

export function EditorialSection() {
  return (
    <section className="py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif text-headline-md md:text-display-lg text-primary">
            Editorial
          </h2>
          <Link
            href="/lookbook"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors border-b border-outline-variant pb-1"
          >
            View Lookbook
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {EDITORIAL_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-on-primary">
                <p className="font-label-caps text-label-caps mb-2 opacity-80">
                  {item.subtitle}
                </p>
                <h3 className="font-headline-sm text-headline-sm md:text-headline-md">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
