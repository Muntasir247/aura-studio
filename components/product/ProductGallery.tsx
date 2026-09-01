"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4 relative">
      {/* Thumbnails (desktop) */}
      <div className="hidden md:flex flex-col gap-4 w-24 shrink-0 sticky top-[100px] h-fit max-h-[calc(100vh-140px)] overflow-y-auto hide-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "w-full aspect-[3/4] border overflow-hidden relative cursor-pointer transition-all duration-300",
              i === activeIndex
                ? "border-outline-variant/30 opacity-100"
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

      {/* Main images */}
      <div className="flex-1 flex flex-col gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="w-full bg-surface-container-low aspect-[3/4] relative overflow-hidden group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              priority={i === 0}
            />
            <button className="absolute top-4 right-4 p-2 bg-surface-container-lowest/50 backdrop-blur-sm rounded-full text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[20px]">
                zoom_in
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Mobile indicators */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === activeIndex ? "bg-primary" : "bg-outline-variant"
            )}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
