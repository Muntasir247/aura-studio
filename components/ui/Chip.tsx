"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  onRemove?: () => void;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ active = false, onRemove, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-label-caps text-label-caps",
          "px-3 py-1.5 transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          active
            ? "bg-primary text-on-primary"
            : "bg-surface-container-lowest border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onRemove();
              }
            }}
            className="material-symbols-outlined text-[14px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            close
          </span>
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";
