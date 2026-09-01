import type { WishlistState, WishlistAction } from "@/types/wishlist";

export const INITIAL_WISHLIST_STATE: WishlistState = {
  items: [],
};

export function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const exists = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (exists) {
        return {
          ...state,
          items: state.items.filter(
            (i) => i.productId !== action.payload.productId
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "CLEAR_WISHLIST":
      return { ...state, items: [] };

    case "LOAD_WISHLIST":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}
