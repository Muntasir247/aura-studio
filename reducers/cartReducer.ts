import type { CartState, CartAction } from "@/types/cart";

export const INITIAL_CART_STATE: CartState = {
  items: [],
  promoCode: null,
  promoDiscount: 0,
  isOpen: false,
  step: "idle",
};

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, quantity }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }

    case "APPLY_PROMO":
      return {
        ...state,
        promoCode: action.payload.code,
        promoDiscount: action.payload.discount,
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        promoCode: null,
        promoDiscount: 0,
      };

    case "OPEN_DRAWER":
      return { ...state, isOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false, step: "idle" };

    case "SET_STEP":
      return { ...state, step: action.payload };

    default:
      return state;
  }
}
