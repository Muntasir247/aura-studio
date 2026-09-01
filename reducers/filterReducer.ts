import type { FilterState, FilterAction } from "@/types/filters";

export const INITIAL_FILTER_STATE: FilterState = {
  category: null,
  subcategory: null,
  colors: [],
  sizes: [],
  priceRange: [0, 1000],
  sortBy: "newest",
  searchQuery: "",
};

export function filterReducer(
  state: FilterState,
  action: FilterAction
): FilterState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload, subcategory: null };

    case "SET_SUBCATEGORY":
      return { ...state, subcategory: action.payload };

    case "TOGGLE_COLOR": {
      const exists = state.colors.includes(action.payload);
      return {
        ...state,
        colors: exists
          ? state.colors.filter((c) => c !== action.payload)
          : [...state.colors, action.payload],
      };
    }

    case "TOGGLE_SIZE": {
      const exists = state.sizes.includes(action.payload);
      return {
        ...state,
        sizes: exists
          ? state.sizes.filter((s) => s !== action.payload)
          : [...state.sizes, action.payload],
      };
    }

    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "SET_SORT":
      return { ...state, sortBy: action.payload };

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "CLEAR_FILTERS":
      return {
        ...state,
        colors: [],
        sizes: [],
        priceRange: [0, 1000],
        searchQuery: "",
      };

    case "RESET_FILTERS":
      return INITIAL_FILTER_STATE;

    default:
      return state;
  }
}
