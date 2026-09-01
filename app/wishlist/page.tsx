"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useDrawer } from "@/hooks/useDrawer";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { state, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const { open: openDrawer } = useDrawer();

  const handleAddToCart = (item: (typeof state.items)[0]) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: `cart-${item.productId}-${Date.now()}`,
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        color: "Default",
        size: "M",
        quantity: 1,
      },
    });
    wishlistDispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
    openDrawer("cart");
  };

  const handleRemove = (id: string) => {
    wishlistDispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-serif text-headline-md md:text-display-lg text-primary mb-2">
              My Wishlist
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              {state.items.length} item{state.items.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {state.items.length > 0 && (
            <button
              onClick={() => wishlistDispatch({ type: "CLEAR_WISHLIST" })}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-error underline underline-offset-4 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty state */}
        {state.items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <span className="material-symbols-outlined text-[56px] text-outline-variant">
              favorite
            </span>
            <h2 className="font-headline-sm text-on-surface-variant">
              Your wishlist is empty
            </h2>
            <p className="font-body-md text-on-surface-variant/70 max-w-md">
              Save items you love to your wishlist and revisit them anytime.
            </p>
            <Link href="/collections">
              <Button variant="primary">Explore Collections</Button>
            </Link>
          </div>
        )}

        {/* Grid */}
        {state.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {state.items.map((item) => (
              <div key={item.id} className="group">
                {/* Image */}
                <div className="relative aspect-[3/4] bg-surface-container-low rounded overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-error transition-all shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      close
                    </span>
                  </button>

                  {/* Quick add overlay */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full sm:w-auto bg-surface/95 text-primary font-button text-xs py-2 px-6 rounded-full hover:bg-primary hover:text-white transition-colors shadow-sm"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/product/${item.productId}`}
                    className="font-body-md text-body-md text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
