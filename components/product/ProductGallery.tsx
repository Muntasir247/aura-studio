"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    if (mobileSliderRef.current) {
      mobileSliderRef.current.scrollTo({
        left: index * mobileSliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 relative">
      {/* Thumbnails (desktop) */}
      <div className="hidden md:flex flex-col gap-4 w-24 shrink-0 sticky top-[100px] h-fit max-h-[calc(100vh-140px)] overflow-y-auto hide-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "w-full aspect-[3/4] border overflow-hidden relative cursor-pointer transition-all duration-300 rounded",
              i === activeIndex
                ? "border-primary opacity-100 ring-1 ring-primary"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main images container */}
      <div className="flex-1">
        {/* Mobile: Swipeable Carousel */}
        <div
          ref={mobileSliderRef}
          onScroll={handleMobileScroll}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-lg"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full shrink-0 snap-center aspect-[3/4] bg-surface-container-low relative overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Mobile Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToImage(i)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  i === activeIndex
                    ? "w-6 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-outline-variant hover:bg-on-surface-variant"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Desktop: Full Image Stream */}
        <div className="hidden md:flex flex-col gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full bg-surface-container-low aspect-[3/4] relative overflow-hidden rounded group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
