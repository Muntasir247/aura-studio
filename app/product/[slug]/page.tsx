"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/mock-data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useDrawer } from "@/hooks/useDrawer";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ColorSwatch } from "@/components/product/ColorSwatch";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ProductAccordions } from "@/components/product/ProductAccordions";
import { CrossSellGrid } from "@/components/product/CrossSellGrid";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  const { dispatch: cartDispatch } = useCart();
  const { isInWishlist, dispatch: wishlistDispatch } = useWishlist();
  const { open: openDrawer } = useDrawer();

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name ?? ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);

  if (!product) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-outlined text-[48px] text-outline-variant">
          search_off
        </span>
        <p className="font-headline-sm text-on-surface-variant">
          Product not found
        </p>
        <Link href="/collections">
          <Button variant="secondary">Back to Collections</Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const inStock = product.inStock;

  const handleAddToBag = () => {
    if (!selectedSize) return;
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].src,
        color: selectedColor,
        size: selectedSize,
        quantity,
      },
    });
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
    openDrawer("cart");
  };

  const handleWishlistToggle = () => {
    wishlistDispatch({
      type: "TOGGLE_ITEM",
      payload: {
        id: `wish-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].src,
        addedAt: Date.now(),
      },
    });
  };

  return (
    <div className="pt-[96px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          HOME
        </Link>
        <span>/</span>
        <Link
          href="/collections"
          className="hover:text-primary transition-colors"
        >
          COLLECTIONS
        </Link>
        <span>/</span>
        <span className="text-primary uppercase">{product.subcategory}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
        {/* Left: Gallery */}
        <div className="md:col-span-7 lg:col-span-8">
          <ProductGallery images={product.images} />
        </div>

        {/* Right: Sticky info rail */}
        <div className="md:col-span-5 lg:col-span-4 mt-8 md:mt-0">
          <div className="md:sticky md:top-[100px] flex flex-col gap-6">
            {/* Title & Price */}
            <div>
              <div className="flex justify-between items-start">
                <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
                  {product.name}
                </h1>
                <button
                  onClick={handleWishlistToggle}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                  aria-label="Toggle wishlist"
                >
                  <span
                    className="material-symbols-outlined"
                    style={
                      wishlisted
                        ? { fontVariationSettings: "'FILL' 1" }
                        : undefined
                    }
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <span className="font-body-lg text-body-lg text-primary font-medium">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined text-[16px]"
                        style={{
                          fontVariationSettings:
                            star <= Math.round(product.rating)
                              ? "'FILL' 1"
                              : undefined,
                          color:
                            star <= Math.round(product.rating)
                              ? "var(--color-primary)"
                              : "var(--color-outline-variant)",
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-sm">({product.reviewCount})</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-outline-variant/30 w-full" />

            {/* Color */}
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  COLOR:{" "}
                  <span className="text-primary ml-1">{selectedColor}</span>
                </span>
              </div>
              <ColorSwatch
                colors={product.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            </div>

            {/* Size */}
            <div>
              <div className="flex justify-between mb-3 items-end">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  SIZE
                </span>
                <button
                  onClick={() => openDrawer("sizeGuide")}
                  className="text-xs text-on-surface-variant hover:text-primary underline decoration-outline-variant underline-offset-4 transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>

            {/* Low stock warning */}
            {product.lowStockThreshold &&
              product.sizes.some(
                (s) =>
                  s.label === selectedSize &&
                  s.stock !== undefined &&
                  s.stock <= product.lowStockThreshold!
              ) && (
                <div className="flex items-center gap-2 text-on-tertiary-container bg-error-container/30 px-3 py-2 rounded-sm text-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    local_fire_department
                  </span>
                  <span>
                    Only{" "}
                    {
                      product.sizes.find((s) => s.label === selectedSize)
                        ?.stock
                    }{" "}
                    left in Size {selectedSize}
                  </span>
                </div>
              )}

            {/* Quantity */}
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-3 block">
                QUANTITY
              </span>
              <QuantityStepper
                value={quantity}
                onValueChange={setQuantity}
                min={1}
                max={10}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-2">
              <Button
                variant="primary"
                fullWidth
                className="py-4"
                icon="arrow_forward"
                iconPosition="right"
                disabled={!selectedSize || !inStock}
                onClick={handleAddToBag}
              >
                {addedToBag ? "Added!" : inStock ? "Add to Bag" : "Sold Out"}
              </Button>
              {!selectedSize && inStock && (
                <p className="text-xs text-on-surface-variant/70 text-center font-body-md">
                  Please select a size above to add to bag
                </p>
              )}
              <Button
                variant="secondary"
                fullWidth
                className="py-3"
                disabled={!selectedSize || !inStock}
                onClick={() => {
                  handleAddToBag();
                  router.push("/checkout");
                }}
              >
                Express Checkout
              </Button>
            </div>

            <div className="h-px bg-outline-variant/30 w-full mt-2" />

            {/* Accordions */}
            <ProductAccordions
              description={product.description}
              fabricAndCare={product.fabricAndCare}
              shippingInfo={product.shippingInfo}
            />
          </div>
        </div>
      </div>

      {/* Cross-sell */}
      <CrossSellGrid productIds={product.relatedProducts} />
    </div>
  );
}
