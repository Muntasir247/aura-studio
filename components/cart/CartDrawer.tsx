"use client";

import Image from "next/image";
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
                <div className="w-24 h-32 shrink-0 bg-surface-container-low rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={128}
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
              <button className="w-full py-3 bg-black text-white rounded-full font-button text-button flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors border border-black">
                <span className="material-symbols-outlined text-[18px]">
                  file_download
                </span>{" "}
                Pay
              </button>
              <button className="w-full py-3 bg-surface-container-highest text-primary rounded-full font-button text-button flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px]">
                  google
                </span>{" "}
                Pay
              </button>
            </div>
          </div>
        </DrawerFooter>
      )}
    </Drawer>
  );
}
