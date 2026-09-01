"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary rounded-full hover:bg-inverse-surface active:scale-[0.98] shadow-sm",
  secondary:
    "border border-outline-variant/50 text-primary bg-transparent rounded-full hover:bg-surface-variant/30 active:scale-[0.98]",
  ghost:
    "bg-surface-container-lowest/20 backdrop-blur-sm border border-on-primary/30 text-on-primary rounded-full hover:bg-on-primary hover:text-primary",
  text: "font-label-caps hover:opacity-70 border-b border-outline-variant pb-1 bg-transparent p-0 h-auto",
  icon: "w-10 h-10 rounded-full hover:bg-surface-variant/50 flex items-center justify-center bg-transparent p-0",
};

const sizeStyles: Record<Exclude<ButtonSize, "sm"> | "sm", string> = {
  sm: "px-5 py-2.5 text-button",
  md: "px-6 py-3 text-button",
  lg: "px-8 py-4 text-button",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "right",
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "font-button inline-flex items-center justify-center gap-2 transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          variantStyles[variant],
          variant !== "icon" && variant !== "text" && sizeStyles[size],
          fullWidth && "w-full",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="material-symbols-outlined text-[18px] animate-spin">
            progress_activity
          </span>
        ) : (
          icon && iconPosition === "left" && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === "right" && (
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
