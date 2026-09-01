"use client";

import { useFilters } from "@/hooks/useFilters";
import { Chip } from "@/components/ui/Chip";
import { categories } from "@/mock-data/products";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

const ALL_COLORS = [
  "Obsidian",
  "Sand",
  "Slate",
  "Ivory",
  "Camel",
  "Oatmeal",
  "Heather Grey",
  "Navy",
  "Charcoal",
  "White",
  "Khaki",
  "Olive",
  "Cognac",
];

const ALL_COLORS_HEX: Record<string, string> = {
  Obsidian: "#000000",
  Sand: "#d2b48c",
  Slate: "#708090",
  Ivory: "#fffff0",
  Camel: "#c19a6b",
  Oatmeal: "#d3c5a0",
  "Heather Grey": "#9e9e9e",
  Navy: "#000080",
  Charcoal: "#36454f",
  White: "#ffffff",
  Khaki: "#c3b091",
  Olive: "#556b2f",
  Cognac: "#834a25",
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "One Size"];

export function FilterBar() {
  const { state, dispatch, activeFilterCount, hasActiveFilters, clearFilters } =
    useFilters();

  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-[100px] flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-label-caps text-label-caps text-primary">
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="font-label-caps text-[10px] text-on-surface-variant hover:text-primary underline underline-offset-4 transition-colors"
            >
              Clear All ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant">
            Category
          </h4>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => dispatch({ type: "SET_CATEGORY", payload: null })}
              className={`text-left font-body-md text-sm py-1 transition-colors ${
                state.category === null
                  ? "text-primary font-medium"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  dispatch({ type: "SET_CATEGORY", payload: cat.slug })
                }
                className={`text-left font-body-md text-sm py-1 transition-colors ${
                  state.category === cat.slug
                    ? "text-primary font-medium"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant">
            Color
          </h4>
          <div className="flex flex-wrap gap-2">
            {ALL_COLORS.map((color) => (
              <button
                key={color}
                onClick={() =>
                  dispatch({ type: "TOGGLE_COLOR", payload: color })
                }
                className={`w-7 h-7 rounded-full border transition-all duration-300 ${
                  state.colors.includes(color)
                    ? "border-2 border-primary ring-1 ring-primary scale-110"
                    : "border-outline-variant/50 hover:border-primary hover:scale-105"
                }`}
                style={{ backgroundColor: ALL_COLORS_HEX[color] }}
                aria-label={color}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant">
            Size
          </h4>
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <Chip
                key={size}
                active={state.sizes.includes(size)}
                onClick={() =>
                  dispatch({ type: "TOGGLE_SIZE", payload: size })
                }
              >
                {size}
              </Chip>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant">
            Sort By
          </h4>
          <select
            value={state.sortBy}
            onChange={(e) =>
              dispatch({
                type: "SET_SORT",
                payload: e.target.value as typeof state.sortBy,
              })
            }
            className="font-body-md text-sm border border-outline-variant/50 rounded bg-surface-container-lowest px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
