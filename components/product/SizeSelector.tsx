"use client";

import { cn } from "@/lib/utils";
import type { ProductSize } from "@/types/product";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected: string;
  onSelect: (label: string) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {sizes.map((size) => {
        const isSelected = size.label === selected;
        return (
          <button
            key={size.label}
            onClick={() => size.available && onSelect(size.label)}
            disabled={!size.available}
            className={cn(
              "py-3 text-center transition-all duration-300 font-body-md text-sm",
              isSelected
                ? "border-2 border-primary text-primary font-medium"
                : "border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary",
              !size.available &&
                "opacity-30 cursor-not-allowed line-through hover:border-outline-variant/30 hover:text-on-surface-variant"
            )}
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
}
