"use client";

import { useReducer, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice, generateOrderId, getEstimatedDelivery } from "@/lib/utils";
import type {
  CheckoutStep,
  ShippingInfo,
  PaymentInfo,
  CheckoutOrder,
} from "@/types/checkout";
import {
  INITIAL_SHIPPING,
  INITIAL_PAYMENT,
} from "@/types/checkout";

/* ── State Machine ── */

interface CheckoutState {
  step: CheckoutStep;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  order: CheckoutOrder | null;
}

type CheckoutAction =
  | { type: "SET_STEP"; payload: CheckoutStep }
  | { type: "SET_SHIPPING"; payload: Partial<ShippingInfo> }
  | { type: "SET_PAYMENT"; payload: Partial<PaymentInfo> }
  | { type: "PLACE_ORDER"; payload: CheckoutOrder }
  | { type: "RESET" };

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_SHIPPING":
      return { ...state, shipping: { ...state.shipping, ...action.payload } };
    case "SET_PAYMENT":
      return { ...state, payment: { ...state.payment, ...action.payload } };
    case "PLACE_ORDER":
      return { ...state, step: "confirmation", order: action.payload };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

const INITIAL_STATE: CheckoutState = {
  step: "shipping",
  shipping: INITIAL_SHIPPING,
  payment: INITIAL_PAYMENT,
  order: null,
};

/* ── Steps ── */

const STEPS: { key: CheckoutStep; label: string; number: number }[] = [
  { key: "shipping", label: "Shipping", number: 1 },
  { key: "payment", label: "Payment", number: 2 },
  { key: "confirmation", label: "Confirmation", number: 3 },
];

function StepIndicator({ current }: { current: CheckoutStep }) {
  const currentNum =
    STEPS.find((s) => s.key === current)?.number ?? 0;

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-button text-sm transition-colors ${
              step.number <= currentNum
                ? "bg-primary text-on-primary"
                : "bg-surface-variant text-on-surface-variant"
            }`}
          >
            {step.number}
          </div>
          <span
            className={`font-label-caps text-label-caps hidden sm:inline ${
              step.number <= currentNum ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-[1px] ${
                step.number < currentNum ? "bg-primary" : "bg-outline-variant/50"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ── */

export default function CheckoutPage() {
  const { state: cart, subtotal, shipping, total, dispatch: cartDispatch } = useCart();
  const [checkout, dispatch] = useReducer(checkoutReducer, INITIAL_STATE);

  const tax = useMemo(() => Math.round(subtotal * 0.08 * 100) / 100, [subtotal]);

  const handlePlaceOrder = useCallback(() => {
    const order: CheckoutOrder = {
      id: generateOrderId(),
      items: cart.items,
      subtotal,
      shipping,
      tax,
      discount: cart.promoDiscount,
      total: total + tax,
      estimatedDelivery: getEstimatedDelivery(5),
      placedAt: Date.now(),
    };
    dispatch({ type: "PLACE_ORDER", payload: order });
    cartDispatch({ type: "CLEAR_CART" });
  }, [cart, subtotal, shipping, tax, total, cartDispatch]);

  /* Empty cart redirect */
  if (cart.items.length === 0 && checkout.step !== "confirmation") {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <span className="material-symbols-outlined text-[56px] text-outline-variant">
          shopping_bag
        </span>
        <h1 className="font-headline-md text-headline-md text-primary">
          Your bag is empty
        </h1>
        <p className="font-body-md text-on-surface-variant text-center max-w-md">
          Add some items to your bag before proceeding to checkout.
        </p>
        <Link href="/collections">
          <Button variant="primary">Browse Collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <h1 className="font-serif text-headline-md md:text-display-lg text-primary text-center mb-8">
          Checkout
        </h1>

        {checkout.step !== "confirmation" && (
          <StepIndicator current={checkout.step} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Forms */}
          <div className="lg:col-span-7">
            {/* ── IDLE ── */}
            {checkout.step === "idle" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Order Summary
                </h2>
                <div className="flex flex-col gap-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 shrink-0 bg-surface-container-low rounded overflow-hidden relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-body-md text-sm text-primary">
                          {item.name}
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          {item.color} / {item.size} &times; {item.quantity}
                        </p>
                      </div>
                      <span className="font-label-caps text-label-caps text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  className="py-4"
                  icon="arrow_forward"
                  iconPosition="right"
                  onClick={() => dispatch({ type: "SET_STEP", payload: "shipping" })}
                >
                  Continue to Shipping
                </Button>
              </div>
            )}

            {/* ── SHIPPING ── */}
            {checkout.step === "shipping" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    variant="enclosed"
                    label="First Name"
                    placeholder="Alexandra"
                    value={checkout.shipping.firstName}
                    onChange={(e) =>
                      dispatch({ type: "SET_SHIPPING", payload: { firstName: e.target.value } })
                    }
                  />
                  <Input
                    variant="enclosed"
                    label="Last Name"
                    placeholder="Sterling"
                    value={checkout.shipping.lastName}
                    onChange={(e) =>
                      dispatch({ type: "SET_SHIPPING", payload: { lastName: e.target.value } })
                    }
                  />
                </div>
                <Input
                  variant="enclosed"
                  label="Email"
                  type="email"
                  placeholder="alex@studio.com"
                  value={checkout.shipping.email}
                  onChange={(e) =>
                    dispatch({ type: "SET_SHIPPING", payload: { email: e.target.value } })
                  }
                />
                <Input
                  variant="enclosed"
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={checkout.shipping.phone}
                  onChange={(e) =>
                    dispatch({ type: "SET_SHIPPING", payload: { phone: e.target.value } })
                  }
                />
                <Input
                  variant="enclosed"
                  label="Address"
                  placeholder="123 Fashion Ave"
                  value={checkout.shipping.address}
                  onChange={(e) =>
                    dispatch({ type: "SET_SHIPPING", payload: { address: e.target.value } })
                  }
                />
                <Input
                  variant="enclosed"
                  label="Apartment, suite, etc."
                  placeholder="Apt 4B"
                  value={checkout.shipping.apartment}
                  onChange={(e) =>
                    dispatch({ type: "SET_SHIPPING", payload: { apartment: e.target.value } })
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    variant="enclosed"
                    label="City"
                    placeholder="New York"
                    value={checkout.shipping.city}
                    onChange={(e) =>
                      dispatch({ type: "SET_SHIPPING", payload: { city: e.target.value } })
                    }
                  />
                  <Input
                    variant="enclosed"
                    label="State"
                    placeholder="NY"
                    value={checkout.shipping.state}
                    onChange={(e) =>
                      dispatch({ type: "SET_SHIPPING", payload: { state: e.target.value } })
                    }
                  />
                  <Input
                    variant="enclosed"
                    label="ZIP"
                    placeholder="10001"
                    value={checkout.shipping.zip}
                    onChange={(e) =>
                      dispatch({ type: "SET_SHIPPING", payload: { zip: e.target.value } })
                    }
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <Button variant="secondary" onClick={() => dispatch({ type: "SET_STEP", payload: "idle" })}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 py-4"
                    icon="arrow_forward"
                    iconPosition="right"
                    onClick={() => dispatch({ type: "SET_STEP", payload: "payment" })}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* ── PAYMENT ── */}
            {checkout.step === "payment" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Payment Method
                </h2>

                {/* Method selector */}
                <div className="grid grid-cols-3 gap-3">
                  {(["card", "apple-pay", "google-pay"] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => dispatch({ type: "SET_PAYMENT", payload: { method } })}
                      className={`py-3 rounded-full font-button text-button border transition-colors ${
                        checkout.payment.method === method
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant/50 text-primary hover:border-primary"
                      }`}
                    >
                      {method === "card" ? "Card" : method === "apple-pay" ? "Apple Pay" : "Google Pay"}
                    </button>
                  ))}
                </div>

                {/* Card form */}
                {checkout.payment.method === "card" && (
                  <div className="flex flex-col gap-4">
                    <Input
                      variant="enclosed"
                      label="Name on Card"
                      placeholder="Alexandra Sterling"
                      value={checkout.payment.nameOnCard}
                      onChange={(e) =>
                        dispatch({ type: "SET_PAYMENT", payload: { nameOnCard: e.target.value } })
                      }
                    />
                    <Input
                      variant="enclosed"
                      label="Card Number"
                      placeholder="4242 4242 4242 4242"
                      value={checkout.payment.cardNumber}
                      onChange={(e) =>
                        dispatch({ type: "SET_PAYMENT", payload: { cardNumber: e.target.value } })
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        variant="enclosed"
                        label="Expiry"
                        placeholder="MM / YY"
                        value={checkout.payment.expiry}
                        onChange={(e) =>
                          dispatch({ type: "SET_PAYMENT", payload: { expiry: e.target.value } })
                        }
                      />
                      <Input
                        variant="enclosed"
                        label="CVV"
                        placeholder="123"
                        value={checkout.payment.cvv}
                        onChange={(e) =>
                          dispatch({ type: "SET_PAYMENT", payload: { cvv: e.target.value } })
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Express pay */}
                {checkout.payment.method !== "card" && (
                  <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                    <span className="material-symbols-outlined text-[48px] text-on-surface-variant">
                      {checkout.payment.method === "apple-pay" ? "phone_iphone" : "smartphone"}
                    </span>
                    <p className="font-body-md text-on-surface-variant">
                      You will be redirected to {checkout.payment.method === "apple-pay" ? "Apple Pay" : "Google Pay"} to complete your purchase.
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <Button variant="secondary" onClick={() => dispatch({ type: "SET_STEP", payload: "shipping" })}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 py-4"
                    onClick={() => {
                      dispatch({ type: "SET_STEP", payload: "processing" });
                      setTimeout(() => handlePlaceOrder(), 2000);
                    }}
                  >
                    Pay {formatPrice(total + tax)}
                  </Button>
                </div>
              </div>
            )}

            {/* ── PROCESSING ── */}
            {checkout.step === "processing" && (
              <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
                <span className="material-symbols-outlined text-[56px] text-primary animate-spin">
                  progress_activity
                </span>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Processing your order...
                </h2>
                <p className="font-body-md text-on-surface-variant">
                  Please do not close this page.
                </p>
              </div>
            )}
            {/* ── CONFIRMATION ── */}
            {checkout.step === "confirmation" && checkout.order && (
              <div className="flex flex-col gap-6 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-8">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[48px] text-primary">
                    verified
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-primary">
                      Thank you for your order
                    </h2>
                    <p className="font-label-caps text-xs text-on-surface-variant">
                      Order #{checkout.order.id}
                    </p>
                  </div>
                </div>

                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Your order has been placed successfully. A confirmation email has been sent to{" "}
                  <span className="text-primary font-medium">{checkout.shipping.email || "your email"}</span>.
                </p>

                <div className="p-4 bg-surface-container-low rounded-lg flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Shipping to:</span>
                    <span className="text-primary font-medium text-right">
                      {checkout.shipping.firstName} {checkout.shipping.lastName}, {checkout.shipping.city || "New York"}, {checkout.shipping.country || "United States"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Estimated Delivery:</span>
                    <span className="text-primary font-medium">
                      {checkout.order.estimatedDelivery}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  <Link href="/collections">
                    <Button variant="primary">Continue Shopping</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="secondary">Back to Home</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[100px] bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 ambient-shadow">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
                Order Summary
              </h3>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto">
                {(checkout.order?.items ?? cart.items).map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-18 shrink-0 bg-surface-container-low rounded overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body-md text-sm text-primary truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {item.color} / {item.size} &times; {item.quantity}
                      </p>
                    </div>
                    <span className="font-label-caps text-label-caps text-primary shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-outline-variant/30 mb-4" />

              {/* Totals */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-primary font-medium">
                    {formatPrice(checkout.order?.subtotal ?? subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-primary font-medium">
                    {(checkout.order?.shipping ?? shipping) === 0
                      ? "Complimentary"
                      : formatPrice(checkout.order?.shipping ?? shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Tax</span>
                  <span className="text-primary font-medium">
                    {formatPrice(checkout.order?.tax ?? tax)}
                  </span>
                </div>
                {(checkout.order?.discount ?? cart.promoDiscount) > 0 && (
                  <div className="flex justify-between text-on-tertiary-container">
                    <span>Discount</span>
                    <span>-{formatPrice(checkout.order?.discount ?? cart.promoDiscount)}</span>
                  </div>
                )}
                <div className="h-px bg-outline-variant/30 my-2" />
                <div className="flex justify-between">
                  <span className="font-headline-sm text-headline-sm text-primary">Total</span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    {formatPrice(checkout.order?.total ?? total + tax)}
                  </span>
                </div>
              </div>

              {/* Confirmation details */}
              {checkout.step === "confirmation" && checkout.order && (
                <div className="mt-6 p-4 bg-surface-container-low rounded">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      check_circle
                    </span>
                    <span className="font-label-caps text-label-caps text-primary">
                      Order Confirmed
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-1">
                    Order ID: <span className="text-primary font-medium">{checkout.order.id}</span>
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Estimated delivery: <span className="text-primary">{checkout.order.estimatedDelivery}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
