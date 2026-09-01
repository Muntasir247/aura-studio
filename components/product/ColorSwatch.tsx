"use client";

import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types/product";

interface ColorSwatchProps {
  colors: ProductColor[];
  selected: string;
  onSelect: (name: string) => void;
}

export function ColorSwatch({ colors, selected, onSelect }: ColorSwatchProps) {
  return (
    <div className="flex gap-3">
      {colors.map((color) => {
        const isSelected = color.name === selected;
        return (
          <button
            key={color.name}
            onClick={() => onSelect(color.name)}
            aria-label={`Color: ${color.name}`}
            className={cn(
              "w-8 h-8 rounded-full transition-all duration-300",
              isSelected
                ? "border-2 border-surface-container-lowest ring-1 ring-primary"
                : "border border-outline-variant/50 hover:border-primary"
            )}
            style={{ backgroundColor: color.value }}
          />
        );
      })}
    </div>
  );
}
