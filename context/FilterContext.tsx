"use client";

import {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import type { FilterState, FilterAction } from "@/types/filters";
import { products } from "@/mock-data/products";
import {
  filterReducer,
  INITIAL_FILTER_STATE,
} from "@/reducers/filterReducer";

interface FilterContextValue {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  activeFilterCount: number;
  hasActiveFilters: boolean;
  filteredProducts: typeof products;
  clearFilters: () => void;
}

export const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_FILTER_STATE);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (state.category) {
      result = result.filter((p) => p.category === state.category);
    }
    if (state.subcategory) {
      result = result.filter((p) => p.subcategory === state.subcategory);
    }
    if (state.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => state.colors.includes(c.name))
      );
    }
    if (state.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => state.sizes.includes(s.label) && s.available)
      );
    }
    result = result.filter(
      (p) =>
        p.price >= state.priceRange[0] && p.price <= state.priceRange[1]
    );
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (state.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        result.sort((a, b) =>
          b.tags.includes("new-in") ? 1 : a.tags.includes("new-in") ? -1 : 0
        );
        break;
    }

    return result;
  }, [state]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (state.category) count++;
    if (state.subcategory) count++;
    count += state.colors.length;
    count += state.sizes.length;
    if (state.priceRange[0] > 0 || state.priceRange[1] < 1000) count++;
    if (state.searchQuery) count++;
    return count;
  }, [state]);

  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      activeFilterCount,
      hasActiveFilters,
      filteredProducts,
      clearFilters,
    }),
    [state, dispatch, activeFilterCount, hasActiveFilters, filteredProducts, clearFilters]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
