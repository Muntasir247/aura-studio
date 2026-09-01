"use client";

import {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import type { DrawerState, UIAction } from "@/types/ui";
import { useScrollLock, useEscKey } from "@/hooks/useScrollLock";

interface DrawerContextValue {
  drawers: DrawerState;
  dispatch: React.Dispatch<UIAction>;
  open: (drawer: keyof DrawerState) => void;
  close: (drawer: keyof DrawerState) => void;
  closeAll: () => void;
  isAnyOpen: boolean;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

const INITIAL_DRAWER_STATE: DrawerState = {
  cart: false,
  mobileMenu: false,
  filterDrawer: false,
  sizeGuide: false,
  quickView: null,
};

function drawerReducer(state: DrawerState, action: UIAction): DrawerState {
  switch (action.type) {
    case "OPEN_CART":
      return { ...INITIAL_DRAWER_STATE, cart: true };
    case "CLOSE_CART":
      return { ...state, cart: false };
    case "OPEN_MOBILE_MENU":
      return { ...INITIAL_DRAWER_STATE, mobileMenu: true };
    case "CLOSE_MOBILE_MENU":
      return { ...state, mobileMenu: false };
    case "OPEN_FILTER_DRAWER":
      return { ...INITIAL_DRAWER_STATE, filterDrawer: true };
    case "CLOSE_FILTER_DRAWER":
      return { ...state, filterDrawer: false };
    case "OPEN_SIZE_GUIDE":
      return { ...INITIAL_DRAWER_STATE, sizeGuide: true };
    case "CLOSE_SIZE_GUIDE":
      return { ...state, sizeGuide: false };
    case "OPEN_QUICK_VIEW":
      return { ...INITIAL_DRAWER_STATE, quickView: action.payload };
    case "CLOSE_QUICK_VIEW":
      return { ...state, quickView: null };
    case "CLOSE_ALL":
      return INITIAL_DRAWER_STATE;
    default:
      return state;
  }
}

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [drawers, dispatch] = useReducer(drawerReducer, INITIAL_DRAWER_STATE);

  const isAnyOpen = useMemo(
    () =>
      drawers.cart ||
      drawers.mobileMenu ||
      drawers.filterDrawer ||
      drawers.sizeGuide ||
      drawers.quickView !== null,
    [drawers]
  );

  useScrollLock(isAnyOpen);

  const closeAll = useCallback(
    () => dispatch({ type: "CLOSE_ALL" }),
    [dispatch]
  );

  useEscKey(closeAll, isAnyOpen);

  const open = useCallback(
    (drawer: keyof DrawerState) => {
      switch (drawer) {
        case "cart":
          return dispatch({ type: "OPEN_CART" });
        case "mobileMenu":
          return dispatch({ type: "OPEN_MOBILE_MENU" });
        case "filterDrawer":
          return dispatch({ type: "OPEN_FILTER_DRAWER" });
        case "sizeGuide":
          return dispatch({ type: "OPEN_SIZE_GUIDE" });
        case "quickView":
          return dispatch({ type: "CLOSE_ALL" });
      }
    },
    [dispatch]
  );

  const close = useCallback(
    (drawer: keyof DrawerState) => {
      switch (drawer) {
        case "cart":
          return dispatch({ type: "CLOSE_CART" });
        case "mobileMenu":
          return dispatch({ type: "CLOSE_MOBILE_MENU" });
        case "filterDrawer":
          return dispatch({ type: "CLOSE_FILTER_DRAWER" });
        case "sizeGuide":
          return dispatch({ type: "CLOSE_SIZE_GUIDE" });
        case "quickView":
          return dispatch({ type: "CLOSE_QUICK_VIEW" });
      }
    },
    [dispatch]
  );

  const value = useMemo(
    () => ({ drawers, dispatch, open, close, closeAll, isAnyOpen }),
    [drawers, dispatch, open, close, closeAll, isAnyOpen]
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}
