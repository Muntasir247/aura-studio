export interface FilterState {
  category: string | null;
  subcategory: string | null;
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: "newest" | "price-asc" | "price-desc" | "popular";
  searchQuery: string;
}

export type FilterAction =
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_SUBCATEGORY"; payload: string | null }
  | { type: "TOGGLE_COLOR"; payload: string }
  | { type: "TOGGLE_SIZE"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_SORT"; payload: FilterState["sortBy"] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "CLEAR_FILTERS" }
  | { type: "RESET_FILTERS" };
