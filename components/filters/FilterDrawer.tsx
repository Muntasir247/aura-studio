"use client";

import { useFilters } from "@/hooks/useFilters";
import { useDrawer } from "@/hooks/useDrawer";
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { categories } from "@/mock-data/products";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

const ALL_COLORS = [
  "Obsidian", "Sand", "Slate", "Ivory", "Champagne", "Black",
  "Camel", "Oatmeal", "Heather Grey", "Midnight", "Charcoal", "Cream",
  "White", "Sky Blue", "Navy", "Khaki", "Olive", "Cognac", "Tan",
];

const ALL_COLORS_HEX: Record<string, string> = {
  Obsidian: "#000000", Sand: "#d2b48c", Slate: "#708090", Ivory: "#fffff0",
  Champagne: "#f7e7ce", Black: "#000000", Camel: "#c19a6b", Oatmeal: "#d3c5a0",
  "Heather Grey": "#9e9e9e", Midnight: "#191970", Charcoal: "#36454f",
  Cream: "#fffdd0", White: "#ffffff", "Sky Blue": "#87ceeb", Navy: "#000080",
  Khaki: "#c3b091", Olive: "#556b2f", Cognac: "#834a25", Tan: "#d2b48c",
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "One Size"];

export function FilterDrawer() {
  const { state, dispatch, activeFilterCount, hasActiveFilters, clearFilters } =
    useFilters();
  const { drawers, close } = useDrawer();

  return (
    <Drawer isOpen={drawers.filterDrawer} onClose={() => close("filterDrawer")}>
      <DrawerHeader title="Filters" onClose={() => close("filterDrawer")} />

      <DrawerBody>
        <div className="flex flex-col gap-8">
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

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-caps text-label-caps text-on-surface-variant">
              Category
            </h4>
            <div className="flex flex-wrap gap-2">
              <Chip
                active={state.category === null}
                onClick={() =>
                  dispatch({ type: "SET_CATEGORY", payload: null })
                }
              >
                All
              </Chip>
              {categories.map((cat) => (
                <Chip
                  key={cat.id}
                  active={state.category === cat.slug}
                  onClick={() =>
                    dispatch({ type: "SET_CATEGORY", payload: cat.slug })
                  }
                >
                  {cat.name}
                </Chip>
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
                  className={`w-8 h-8 rounded-full border transition-all duration-300 ${
                    state.colors.includes(color)
                      ? "border-2 border-primary ring-1 ring-primary"
                      : "border-outline-variant/50 hover:border-primary"
                  }`}
                  style={{ backgroundColor: ALL_COLORS_HEX[color] }}
                  aria-label={color}
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
        </div>
      </DrawerBody>

      <DrawerFooter>
        <div className="flex gap-3">
          {hasActiveFilters && (
            <Button variant="secondary" onClick={clearFilters}>
              Clear ({activeFilterCount})
            </Button>
          )}
          <Button
            variant="primary"
            fullWidth
            onClick={() => close("filterDrawer")}
          >
            Show Results
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  );
}
