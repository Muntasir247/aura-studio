"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, categories, collections } from "@/mock-data/products";
import { useFilters } from "@/hooks/useFilters";
import { useDrawer } from "@/hooks/useDrawer";
import { FilterBar } from "@/components/filters/FilterBar";
import { FilterDrawer } from "@/components/filters/FilterDrawer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Chip } from "@/components/ui/Chip";

/* ── Banner data ── */

const BANNERS: Record<string, { headline: string; subline: string; image: string }> = {
  women: {
    headline: "Women",
    subline: "Refined essentials designed for the modern woman.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
  },
  men: {
    headline: "Men",
    subline: "Sharp tailoring and understated luxury for men.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop",
  },
  accessories: {
    headline: "Accessories",
    subline: "The finishing touches that define your look.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1600&auto=format&fit=crop",
  },
  "new-arrivals": {
    headline: "New Arrivals",
    subline: "The latest additions to The Vault edit.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1600&auto=format&fit=crop",
  },
  essentials: {
    headline: "Essentials",
    subline: "Timeless pieces that form the foundation of your wardrobe.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
  },
  "the-obsidian-set": {
    headline: "The Obsidian Set",
    subline: "Curated black-on-black ensembles for maximum impact.",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1600&auto=format&fit=crop",
  },
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.collection as string;

  const { state, dispatch, filteredProducts, activeFilterCount, hasActiveFilters, clearFilters } =
    useFilters();
  const { open } = useDrawer();

  /* Determine if slug is a category or a named collection */
  const isCategory = categories.some((c) => c.slug === slug);
  const isNamedCollection = collections.some((c) => c.slug === slug);

  const category = useMemo(
    () => categories.find((c) => c.slug === slug),
    [slug]
  );

  const collection = useMemo(
    () => collections.find((c) => c.slug === slug),
    [slug]
  );

  const banner = BANNERS[slug];

  /* Pre-filter: set category on mount */
  useEffect(() => {
    if (isCategory) {
      dispatch({ type: "SET_CATEGORY", payload: slug });
    } else if (isNamedCollection) {
      // Named collections filter by product IDs, handled below
    }
    return () => {
      dispatch({ type: "SET_CATEGORY", payload: null });
    };
  }, [slug, isCategory, isNamedCollection, dispatch]);

  /* For named collections, filter by productIds */
  const displayProducts = useMemo(() => {
    if (isNamedCollection && collection) {
      return filteredProducts.filter((p) =>
        collection.productIds.includes(p.id)
      );
    }
    return filteredProducts;
  }, [isNamedCollection, collection, filteredProducts]);

  /* Valid slugs check */
  if (!isCategory && !isNamedCollection) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-6 text-center">
        <span className="material-symbols-outlined text-[56px] text-outline-variant">
          category
        </span>
        <h1 className="font-headline-md text-headline-md text-primary">
          Collection not found
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-md">
          The collection &ldquo;{slug}&rdquo; doesn&apos;t exist.
        </p>
        <Link
          href="/collections"
          className="font-button text-button bg-primary text-on-primary px-6 py-3 rounded-full hover:bg-inverse-surface transition-colors"
        >
          View All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">
      {/* Hero banner */}
      {banner && (
        <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
          <Image
            src={banner.image}
            alt={banner.headline}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-on-primary text-center p-6">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {banner.headline}
            </h1>
            <p className="font-body-lg mt-4 opacity-90 max-w-lg drop-shadow">
              {banner.subline}
            </p>
          </div>
        </section>
      )}

      {/* Subcategory nav (for categories only) */}
      {category && (
        <section className="border-b border-outline-variant/30 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <nav className="flex gap-6 py-4 overflow-x-auto hide-scrollbar">
              <button
                onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: null })}
                className={`font-label-caps text-label-caps whitespace-nowrap transition-colors pb-1 ${
                  state.subcategory === null
                    ? "text-primary border-b border-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                All {category.name}
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() =>
                    dispatch({ type: "SET_SUBCATEGORY", payload: sub.slug })
                  }
                  className={`font-label-caps text-label-caps whitespace-nowrap transition-colors pb-1 ${
                    state.subcategory === sub.slug
                      ? "text-primary border-b border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </nav>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-surface pb-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12">
          {/* Mobile filter trigger + count */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => open("filterDrawer")}
                className="md:hidden flex items-center gap-2 font-label-caps text-label-caps text-primary border border-outline-variant/50 rounded-full px-4 py-2 hover:bg-surface-variant/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  tune
                </span>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-primary text-on-primary text-[10px] rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <p className="font-body-md text-sm text-on-surface-variant">
                {displayProducts.length} product
                {displayProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {state.subcategory && (
                  <Chip
                    active
                    onRemove={() =>
                      dispatch({ type: "SET_SUBCATEGORY", payload: null })
                    }
                  >
                    {state.subcategory}
                  </Chip>
                )}
                {state.colors.map((c) => (
                  <Chip
                    key={c}
                    active
                    onRemove={() =>
                      dispatch({ type: "TOGGLE_COLOR", payload: c })
                    }
                  >
                    {c}
                  </Chip>
                ))}
                {state.sizes.map((s) => (
                  <Chip
                    key={s}
                    active
                    onRemove={() =>
                      dispatch({ type: "TOGGLE_SIZE", payload: s })
                    }
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Grid + Sidebar */}
          <div className="flex gap-12">
            <FilterBar />
            <div className="flex-1">
              <ProductGrid products={displayProducts} />
            </div>
          </div>
        </div>
      </section>

      <FilterDrawer />
    </div>
  );
}
