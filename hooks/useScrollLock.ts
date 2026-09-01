"use client";

import { useEffect, useCallback } from "react";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

export function useEscKey(callback: () => void, enabled = true) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    },
    [callback]
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, enabled]);
}
