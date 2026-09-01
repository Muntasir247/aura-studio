"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useDrawer } from "@/hooks/useDrawer";
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/Drawer";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
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
  const { drawers, close } = useDrawer();

  const progressPercent = Math.min((subtotal / 300) * 100, 100);

  return (
    <Drawer isOpen={drawers.cart} onClose={() => close("cart")}>
      <DrawerHeader title="Your Bag" itemCount={itemCount} onClose={() => close("cart")} />

      {/* Free shipping progress */}
      <div className="p-6 bg-surface-container-lowest border-b border-outline-variant/30 shrink-0 flex flex-col gap-3">
        <p className="font-label-caps text-label-caps text-on-surface-variant text-center">
          {qualifiesForFreeShipping
            ? "You've unlocked free express shipping!"
            : `Add ${formatPrice(freeShippingRemaining)} more for Free Express Shipping`}
        </p>
        <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <DrawerBody>
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline-variant">
              shopping_bag
            </span>
            <p className="font-body-lg text-on-surface-variant">
              Your bag is empty
            </p>
            <Button variant="secondary" onClick={() => close("cart")}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-32 shrink-0 bg-surface-container-low rounded overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-body-lg text-body-lg text-primary">
                        {item.name}
                      </h3>
                      <p className="font-label-caps text-label-caps text-primary">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <QuantityStepper
                      value={item.quantity}
                      onValueChange={(qty) =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: qty },
                        })
                      }
                      min={1}
                      max={10}
                    />
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
                      }
                      className="font-label-caps text-[10px] text-on-surface-variant hover:text-error underline underline-offset-4 decoration-outline-variant/30 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DrawerBody>

      {state.items.length > 0 && (
        <DrawerFooter>
          {/* Promo code */}
          <div className="relative mb-4">
            <input
              id="cart-drawer-promo-code"
              name="promoCode"
              type="text"
              placeholder="Promo code"
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 font-body-md text-body-md py-2 px-0 placeholder-on-surface-variant/50 transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 font-label-caps text-label-caps text-primary hover:opacity-70 transition-opacity">
              Apply
            </button>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center mb-1">
            <span className="font-body-lg text-body-lg text-on-surface-variant">
              Subtotal
            </span>
            <span className="font-headline-sm text-headline-sm text-primary">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="font-body-md text-sm text-on-surface-variant/70 mb-4">
            Taxes and shipping calculated at checkout.
          </p>

          {/* Checkout actions */}
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              fullWidth
              className="py-4"
              onClick={() => {
                close("cart");
                router.push("/checkout");
              }}
            >
              Checkout
            </Button>
            <div className="flex items-center gap-4 my-2">
              <div className="h-[1px] flex-1 bg-outline-variant/30" />
              <span className="font-label-caps text-[10px] text-on-surface-variant">
                Or
              </span>
              <div className="h-[1px] flex-1 bg-outline-variant/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  close("cart");
                  router.push("/checkout");
                }}
                className="w-full py-3 bg-black text-white rounded-full font-button text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors border border-black"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.83-12-14.36-5.67-8.6-10.15-18.72-13.44-30.37-3.29-11.64-4.94-22.75-4.94-33.32 0-14.13 3.58-25.79 10.74-34.98 7.16-9.19 16.03-13.88 26.6-14.08 4.79 0 10.08 1.25 15.86 3.75 5.78 2.5 9.77 3.86 11.97 4.08 1.95-.22 6.13-1.63 12.54-4.23 6.41-2.6 11.97-3.79 16.68-3.56 12.39.87 22.09 5.34 29.11 13.41-10.88 6.53-16.21 15.77-16 27.74.22 9.57 3.82 17.52 10.8 23.83 6.98 6.31 15.22 9.9 24.72 10.77-2.17 6.53-4.78 12.94-7.82 19.24zM119.22 31.81c0-7.39 2.66-14.28 7.98-20.67 5.32-6.39 11.97-10.36 19.95-11.91.87 6.74-.84 13.5-5.13 20.28-4.29 6.78-10.05 10.87-17.28 12.28-.76-.77-1.52-1.54-2.28-2.31-.87-1.09-1.96-2.58-3.24-4.47v6.8z" />
                </svg>
                Pay
              </button>
              <button
                onClick={() => {
                  close("cart");
                  router.push("/checkout");
                }}
                className="w-full py-3 bg-surface-container-highest text-primary rounded-full font-button text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors border border-outline-variant/30"
              >
                <span className="font-bold text-sm tracking-tight text-neutral-800">G</span>Pay
              </button>
            </div>
          </div>
        </DrawerFooter>
      )}
    </Drawer>
  );
}
