"use client";

import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export const QuantityStepper = forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      value,
      onValueChange,
      min = 1,
      max = 99,
      disabled = false,
      className,
    },
    ref
  ) => {
    const handleDecrement = () => {
      if (value > min) onValueChange(value - 1);
    };

    const handleIncrement = () => {
      if (value < max) onValueChange(value + 1);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center w-fit border border-outline-variant/50 rounded-full bg-surface-container-lowest px-1 py-0.5",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min || disabled}
          aria-label="Decrease quantity"
          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">remove</span>
        </button>
        <span className="font-body-md text-xs font-semibold px-2 min-w-[24px] text-center select-none text-primary">
          {value}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max || disabled}
          aria-label="Increase quantity"
          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
        </button>
      </div>
    );
  }
);

QuantityStepper.displayName = "QuantityStepper";
