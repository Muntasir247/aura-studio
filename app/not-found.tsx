"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex flex-col">
        <div className="flex-1 relative w-full min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
            alt="AURA STUDIO boutique"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="material-symbols-outlined text-[80px] text-primary mb-6">
            diamond
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            404
          </h1>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">
            This page has wandered off.
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-md mb-10">
            The page you are looking for may have been moved, removed, or never
            existed. Let us guide you back.
          </p>
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              icon="arrow_forward"
              iconPosition="right"
            >
              Return to Boutique
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 border-t border-outline-variant/30 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest text-center mb-6">
            Explore
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/collections/women"
              className="px-6 py-3 rounded-full border border-outline-variant/50 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              Women
            </Link>
            <Link
              href="/collections/men"
              className="px-6 py-3 rounded-full border border-outline-variant/50 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              Men
            </Link>
            <Link
              href="/collections/accessories"
              className="px-6 py-3 rounded-full border border-outline-variant/50 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/collections/new-arrivals"
              className="px-6 py-3 rounded-full border border-outline-variant/50 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-outline-variant/50 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
