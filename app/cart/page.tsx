"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";

const PROMO_CODES: Record<string, number> = {
  AURA10: 10,
  WELCOME15: 15,
  VIP20: 20,
};

export default function CartPage() {
  const {
    state,
    dispatch,
    subtotal,
    shipping,
    total,
    itemCount,
    freeShippingRemaining,
    qualifiesForFreeShipping,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
  };

  const handleRemove = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: itemId } });
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const discount = PROMO_CODES[code];
    if (discount) {
      dispatch({ type: "APPLY_PROMO", payload: { code, discount } });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const giftWrapFee = giftWrap ? 15 : 0;
  const finalTotal = total + giftWrapFee;

  if (state.items.length === 0) {
    return (
      <div className="pt-[72px] min-h-screen bg-surface flex flex-col items-center justify-center px-6">
        <span className="material-symbols-outlined text-[72px] text-outline-variant/40 mb-6">
          shopping_bag
        </span>
        <h1 className="font-headline-md text-headline-md text-primary mb-3">
          Your Bag is Empty
        </h1>
        <p className="font-body-lg text-on-surface-variant mb-8 max-w-md text-center">
          Discover our latest collections and find something that speaks to you.
        </p>
        <Link href="/collections">
          <Button variant="primary" icon="arrow_forward" iconPosition="right">
            Browse Collections
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      {/* Header */}
      <section className="py-12 border-b border-outline-variant/30 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-2">
            Shopping Bag
          </p>
          <h1 className="font-headline-md text-headline-md text-primary">
            Your Bag{" "}
            <span className="font-body-lg text-on-surface-variant font-normal">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Cart Items */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-0">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant/30">
                <div className="col-span-6">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    PRODUCT
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    PRICE
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    QUANTITY
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    TOTAL
                  </span>
                </div>
              </div>

              {/* Items */}
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-outline-variant/10 items-start"
                >
                  {/* Product */}
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <div className="relative w-20 h-24 rounded bg-surface-container-high overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-body-md text-primary font-medium hover:underline transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-on-surface-variant">
                        Color: {item.color}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Size: {item.size}
                      </p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-sm text-on-surface-variant hover:text-error transition-colors mt-1 self-start flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-4 md:col-span-2 flex items-center">
                    <span className="font-body-md text-on-surface-variant md:text-center">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-4 md:col-span-2 flex items-center md:justify-center">
                    <QuantityStepper
                      value={item.quantity}
                      onValueChange={(q) => handleQuantityChange(item.id, q)}
                      min={1}
                      max={10}
                    />
                  </div>

                  {/* Total */}
                  <div className="col-span-4 md:col-span-2 flex items-center md:justify-end">
                    <span className="font-body-md text-primary font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-8">
              <Link href="/collections">
                <Button variant="text" icon="arrow_back" iconPosition="left">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-[88px] flex flex-col gap-8">
              {/* Summary */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-4">
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 py-4 border-b border-outline-variant/30">
                  <div className="flex justify-between">
                    <span className="font-body-md text-on-surface-variant">
                      Subtotal
                    </span>
                    <span className="font-body-md text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body-md text-on-surface-variant">
                      Shipping
                    </span>
                    <span className="font-body-md text-primary">
                      {qualifiesForFreeShipping
                        ? "Complimentary"
                        : formatPrice(shipping)}
                    </span>
                  </div>
                  {state.promoCode && (
                    <div className="flex justify-between text-on-tertiary-container">
                      <span className="font-body-md">Discount ({state.promoCode})</span>
                      <span className="font-body-md">
                        -{formatPrice(state.promoDiscount)}
                      </span>
                    </div>
                  )}
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="font-body-md text-on-surface-variant">
                        Gift Wrapping
                      </span>
                      <span className="font-body-md text-primary">
                        {formatPrice(giftWrapFee)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="font-headline-sm text-headline-sm text-primary">
                    Total
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                {/* Free shipping progress */}
                {!qualifiesForFreeShipping && (
                  <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
                    <p className="text-sm text-on-surface-variant">
                      Add <strong className="text-primary">{formatPrice(freeShippingRemaining)}</strong> more for complimentary shipping
                    </p>
                    <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, ((subtotal) / 300) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-3">
                <p className="font-label-caps text-label-caps text-on-surface-variant">
                  PROMO CODE
                </p>
                <div className="flex gap-2">
                  <input
                    id="cart-promo-input"
                    name="promoCode"
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Enter code"
                    className="flex-1 font-body-md text-body-md px-3 py-2.5 border border-outline-variant/50 rounded bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={!promoInput.trim()}
                  >
                    Apply
                  </Button>
                </div>
                {promoError && (
                  <p className="text-error text-sm">{promoError}</p>
                )}
              </div>

              {/* Gift Options */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-4">
                <p className="font-label-caps text-label-caps text-on-surface-variant">
                  GIFT OPTIONS
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded border-outline-variant"
                  />
                  <div className="flex flex-col">
                    <span className="font-body-md text-primary">
                      Add Gift Wrapping
                    </span>
                    <span className="text-sm text-on-surface-variant">
                      Signature black box with ribbon — {formatPrice(15)}
                    </span>
                  </div>
                </label>
                {giftWrap && (
                  <Textarea
                    variant="enclosed"
                    label="Gift Message (optional)"
                    placeholder="Add a personal note..."
                    rows={3}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                  />
                )}
              </div>

              {/* Order Notes */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-3">
                <p className="font-label-caps text-label-caps text-on-surface-variant">
                  ORDER NOTES
                </p>
                <Textarea
                  variant="enclosed"
                  placeholder="Special instructions for delivery or packaging..."
                  rows={3}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout">
                <Button
                  variant="primary"
                  fullWidth
                  className="py-4"
                  icon="arrow_forward"
                  iconPosition="right"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Trust signals */}
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">
                    lock
                  </span>
                  <span className="text-sm">Secure Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">
                    local_shipping
                  </span>
                  <span className="text-sm">Free Returns Within 14 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
