"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputVariant = "bottom-border" | "enclosed";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  icon?: string;
}

const variantStyles: Record<InputVariant, string> = {
  "bottom-border":
    "bg-transparent border-0 border-b border-outline-variant focus:border-primary rounded-none px-0",
  enclosed:
    "border border-outline-variant/50 rounded bg-surface-container-lowest px-3",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "enclosed",
      label,
      error,
      icon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-label-caps text-label-caps text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full font-body-md text-body-md py-2.5 transition-colors duration-300",
              "focus:outline-none focus:ring-0 placeholder:text-on-surface-variant/50",
              variantStyles[variant],
              icon && "pl-10",
              error && "border-error focus:border-error",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-error text-xs font-body-md mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* Textarea variant for same visual treatment */

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = "enclosed", label, error, className, id, ...props }, ref) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-label-caps text-label-caps text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full font-body-md text-body-md py-2.5 px-3 transition-colors duration-300 resize-none",
            "focus:outline-none focus:ring-0 placeholder:text-on-surface-variant/50",
            variantStyles[variant],
            error && "border-error focus:border-error",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-error text-xs font-body-md mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
