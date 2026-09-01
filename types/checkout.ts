import type { CartItem } from "./cart";

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentInfo {
  method: "card" | "apple-pay" | "google-pay";
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
}

export type CheckoutStep =
  | "idle"
  | "shipping"
  | "payment"
  | "processing"
  | "confirmation";

export interface CheckoutOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  placedAt: number;
}

export interface CheckoutState {
  step: CheckoutStep;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  order: CheckoutOrder | null;
}

export type CheckoutAction =
  | { type: "SET_STEP"; payload: CheckoutStep }
  | { type: "SET_SHIPPING"; payload: Partial<ShippingInfo> }
  | { type: "SET_PAYMENT"; payload: Partial<PaymentInfo> }
  | { type: "PLACE_ORDER"; payload: CheckoutOrder }
  | { type: "RESET_CHECKOUT" };

export const INITIAL_SHIPPING: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
};

export const INITIAL_PAYMENT: PaymentInfo = {
  method: "card",
  cardNumber: "",
  expiry: "",
  cvv: "",
  nameOnCard: "",
};
