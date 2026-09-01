"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface LookbookItem {
  id: string;
  season: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  productSlug: string;
  productName: string;
  price: string;
  alignment: "left" | "right";
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-01",
    season: "Autumn / Winter 2026",
    title: "Monolithic Tailoring",
    subtitle: "The Obsidian Gabardine Ensemble",
    description:
      "Sculptural shoulder pads paired with fluid Italian virgin wool gabardine. A masterclass in minimalist restraint that commands authority in every room.",
    image:
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop",
    productSlug: "structured-oversized-blazer",
    productName: "Structured Oversized Blazer",
    price: "$450",
    alignment: "left",
  },
  {
    id: "look-02",
    season: "The Outerwear Edit",
    title: "Architectural Volume",
    subtitle: "Double-Breasted Wool Coat in Camel",
    description:
      "Cut from heavyweight double-faced Italian wool, providing immaculate structure and warmth while preserving effortless mobility.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
    productSlug: "tailored-wool-coat",
    productName: "Tailored Wool Coat",
    price: "$890",
    alignment: "right",
  },
  {
    id: "look-03",
    season: "Sensory Essentials",
    title: "Pure Mulberry Fluidity",
    subtitle: "The Silk Cowl Layer",
    description:
      "Delicate cowl drape crafted from 100% organic mulberry silk. An indispensable foundational garment designed for effortless day-to-evening transitions.",
    image:
      "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?q=80&w=1200&auto=format&fit=crop",
    productSlug: "silk-camisole",
    productName: "Silk Camisole",
    price: "$150",
    alignment: "left",
  },
  {
    id: "look-04",
    season: "Modern Menswear",
    title: "Sartorial Precision",
    subtitle: "Italian Wool Blend Double-Breasted Jacket",
    description:
      "Tapered waist with hand-finished horn buttons and satin lapels. Tailored for sharp formal presence without rigidity.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    productSlug: "double-breasted-wool-blazer",
    productName: "Double-Breasted Wool Blazer",
    price: "$520",
    alignment: "right",
  },
];

export default function LookbookPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      {/* Hero Header */}
      <section className="py-20 md:py-28 bg-surface-container-lowest border-b border-outline-variant/30 text-center">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.25em] mb-4">
            AURA STUDIO Editorial
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary tracking-tight mb-6">
            The Autumn / Winter Edit
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            An exploration of architectural tailoring, sensory textures, and disciplined silhouettes. Designed in New York, crafted across master ateliers in Italy and Mongolia.
          </p>
        </div>
      </section>

      {/* Editorial Looks */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-24 md:gap-36">
          {LOOKBOOK_ITEMS.map((item, index) => {
            const isReverse = item.alignment === "right";

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center ${
                  isReverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section */}
                <div
                  className={`lg:col-span-7 ${
                    isReverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[3/4] bg-surface-container-low rounded-lg overflow-hidden group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-label-caps text-[10px] bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full uppercase tracking-wider">
                        Look {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Product Tag */}
                <div
                  className={`lg:col-span-5 flex flex-col gap-6 ${
                    isReverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest block mb-2">
                      {item.season}
                    </span>
                    <h2 className="font-serif text-headline-lg md:text-display-md text-primary font-medium tracking-tight mb-2">
                      {item.title}
                    </h2>
                    <p className="font-label-caps text-xs text-ochre font-medium tracking-wider">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>

                  {/* Featured Product Pill */}
                  <div className="p-5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-body-md text-sm font-semibold text-primary">
                        {item.productName}
                      </h3>
                      <p className="font-label-caps text-xs text-on-surface-variant">
                        {item.price}
                      </p>
                    </div>
                    <Link href={`/product/${item.productSlug}`}>
                      <Button variant="primary" size="sm">
                        Shop Piece
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-surface-container-lowest border-t border-outline-variant/30 text-center">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-serif text-headline-md md:text-headline-lg text-primary mb-4">
            Explore All Collections
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">
            Discover the complete wardrobe edit for Women, Men, and Accessories.
          </p>
          <Link href="/collections">
            <Button variant="primary" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
