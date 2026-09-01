"use client";

import {
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
  icon?: string;
}

export function Accordion({
  title,
  defaultOpen = false,
  icon = "expand_more",
  className,
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div
      className={cn(
        "py-4 cursor-pointer group divide-y divide-outline-variant/30",
        className
      )}
    >
      <div
        className="flex justify-between items-center"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        aria-expanded={isOpen}
      >
        <span className="font-label-caps text-label-caps text-primary tracking-widest">
          {title}
        </span>
        <span
          className={cn(
            "material-symbols-outlined transition-transform duration-300 text-on-surface-variant group-hover:text-primary",
            isOpen && "rotate-180"
          )}
        >
          {icon}
        </span>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 500}px` : "0px",
          paddingBottom: isOpen ? "1rem" : "0px",
        }}
      >
        <div className="pt-4 text-on-surface-variant text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Multi-Accordion wrapper for PDP — only one open at a time */

interface AccordionGroupProps {
  children: ReactNode;
  className?: string;
}

export function AccordionGroup({ children, className }: AccordionGroupProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}
