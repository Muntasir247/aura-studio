"use client";

import { Suspense, useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/mock-data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/* ── Recommendation carousel (shown on empty state) ── */

const RECOMMENDED = products.filter((p) =>
  ["bestseller", "new-in"].some((t) => p.tags.includes(t))
);

function RecommendedCarousel() {
  const scrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - node.offsetLeft;
        scrollLeft = node.scrollLeft;
      };
      const onMouseUp = () => (isDown = false);
      const onMouseLeave = () => (isDown = false);
      const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - node.offsetLeft;
        node.scrollLeft = scrollLeft - (x - startX) * 1.5;
      };

      node.addEventListener("mousedown", onMouseDown);
      node.addEventListener("mouseup", onMouseUp);
      node.addEventListener("mouseleave", onMouseLeave);
      node.addEventListener("mousemove", onMouseMove);
      return () => {
        node.removeEventListener("mousedown", onMouseDown);
        node.removeEventListener("mouseup", onMouseUp);
        node.removeEventListener("mouseleave", onMouseLeave);
        node.removeEventListener("mousemove", onMouseMove);
      };
    },
    []
  );

  return (
    <div className="mt-12">
      <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
        Recommended For You
      </h2>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4"
      >
        {RECOMMENDED.map((product) => (
          <div key={product.id} className="min-w-[260px] max-w-[260px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Search form (uses useSearchParams, must be in Suspense) ── */

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [localCategory, setLocalCategory] = useState<string | null>(null);
  const [localColors, setLocalColors] = useState<string[]>([]);
  const [localSizes, setLocalSizes] = useState<string[]>([]);

  /* Live search: filter products as user types */
  const results = useMemo(() => {
    let result = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (localCategory) {
      result = result.filter((p) => p.category === localCategory);
    }
    if (localColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => localColors.includes(c.name))
      );
    }
    if (localSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => localSizes.includes(s.label) && s.available)
      );
    }

    return result;
  }, [query, localCategory, localColors, localSizes]);

  /* Sync URL */
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    const newUrl = params.toString() ? `/search?${params.toString()}` : "/search";
    router.replace(newUrl, { scroll: false });
  }, [query, router]);

  const toggleColor = (color: string) =>
    setLocalColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  const toggleSize = (size: string) =>
    setLocalSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const clearAll = () => {
    setQuery("");
    setLocalCategory(null);
    setLocalColors([]);
    setLocalSizes([]);
  };

  const hasActiveFilters =
    localCategory !== null || localColors.length > 0 || localSizes.length > 0;

  const isSearching = query.trim().length > 0;

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      {/* Search header */}
      <section className="border-b border-outline-variant/30 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
          {/* Search input */}
          <div className="relative max-w-2xl mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[24px] text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories, colors..."
              className="w-full bg-surface border border-outline-variant/50 rounded-full py-3.5 pl-12 pr-12 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-on-surface-variant/50"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          {/* Quick category chips */}
          <div className="flex justify-center gap-3 mt-6">
            {[
              { label: "All", value: null },
              { label: "Women", value: "women" },
              { label: "Men", value: "men" },
              { label: "Accessories", value: "accessories" },
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => setLocalCategory(cat.value)}
                className={`px-4 py-2 rounded-full font-label-caps text-label-caps border transition-colors ${
                  localCategory === cat.value
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Result count + active tags */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <p className="font-body-md text-sm text-on-surface-variant">
              {isSearching ? (
                <>
                  {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
                  <span className="text-primary font-medium">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                <>
                  {results.length} product{results.length !== 1 ? "s" : ""} available
                </>
              )}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="font-label-caps text-[10px] text-on-surface-variant hover:text-primary underline underline-offset-4 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {localCategory && (
                <Chip active onRemove={() => setLocalCategory(null)}>
                  {localCategory}
                </Chip>
              )}
              {localColors.map((c) => (
                <Chip key={c} active onRemove={() => toggleColor(c)}>
                  {c}
                </Chip>
              ))}
              {localSizes.map((s) => (
                <Chip key={s} active onRemove={() => toggleSize(s)}>
                  {s}
                </Chip>
              ))}
            </div>
          )}
        </div>

        {/* Results grid or empty state */}
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : isSearching ? (
          /* No results for query */
          <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
            <span className="material-symbols-outlined text-[56px] text-outline-variant">
              search_off
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface-variant">
              No results found
            </h2>
            <p className="font-body-md text-on-surface-variant/70 max-w-md">
              We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a
              different search term or browse our collections.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={clearAll}>
                Clear Search
              </Button>
              <Button variant="primary" onClick={() => router.push("/collections")}>
                Browse Collections
              </Button>
            </div>
          </div>
        ) : (
          /* Empty initial state — show recommendations */
          <div>
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center mb-8">
              <span className="material-symbols-outlined text-[48px] text-outline-variant">
                explore
              </span>
              <h2 className="font-headline-sm text-on-surface-variant">
                Start exploring
              </h2>
              <p className="font-body-md text-on-surface-variant/70 max-w-md">
                Type in the search bar above to find exactly what you&apos;re looking for.
              </p>
            </div>
            <RecommendedCarousel />
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Page export with Suspense boundary ── */

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-[72px] min-h-screen flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px] text-on-surface-variant animate-spin">
            progress_activity
          </span>
        </div>
      }
    >
      <SearchForm />
    </Suspense>
  );
}
