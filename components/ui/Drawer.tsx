"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  children,
  side = "right",
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Glassmorphism backdrop */}
      <div
        className="absolute inset-0 bg-surface/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Click-away area */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          "relative w-full max-w-md h-full bg-surface flex flex-col",
          "shadow-2xl border-l border-outline-variant/30",
          "animate-slide-in-right",
          side === "left" && "origin-left",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* Sub-components for consistent drawer layout */

interface DrawerHeaderProps {
  title: string;
  itemCount?: number;
  onClose: () => void;
}

export function DrawerHeader({ title, itemCount, onClose }: DrawerHeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 border-b border-outline-variant/30 shrink-0">
      <h2 className="font-headline-sm text-headline-sm text-primary">
        {title}
        {itemCount !== undefined && <span> ({itemCount})</span>}
      </h2>
      <button
        onClick={onClose}
        aria-label="Close"
        className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-variant/50"
      >
        <span className="material-symbols-outlined text-[24px]">close</span>
      </button>
    </header>
  );
}

interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
}

export function DrawerBody({ children, className }: DrawerBodyProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)}>
      {children}
    </div>
  );
}

interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

export function DrawerFooter({ children, className }: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "p-6 bg-surface-container-lowest border-t border-outline-variant/30 shrink-0",
        className
      )}
    >
      {children}
    </div>
  );
}
