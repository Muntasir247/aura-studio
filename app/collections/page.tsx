"use client";

import { useFilters } from "@/hooks/useFilters";
import { useDrawer } from "@/hooks/useDrawer";
import { FilterBar } from "@/components/filters/FilterBar";
import { FilterDrawer } from "@/components/filters/FilterDrawer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Chip } from "@/components/ui/Chip";

export default function CollectionsPage() {
  const { state, dispatch, filteredProducts, activeFilterCount, hasActiveFilters, clearFilters } =
    useFilters();
  const { open } = useDrawer();

  return (
    <div className="pt-[72px]">
      {/* Page header */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-serif text-headline-md md:text-display-lg text-primary mb-2">
            Collections
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Explore our curated edit of modern luxury essentials.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-surface pb-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Mobile filter trigger + active chips */}
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
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {state.category && (
                  <Chip
                    active
                    onRemove={() =>
                      dispatch({ type: "SET_CATEGORY", payload: null })
                    }
                  >
                    {state.category}
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
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </section>

      <FilterDrawer />
    </div>
  );
}
