export interface DrawerState {
  cart: boolean;
  mobileMenu: boolean;
  filterDrawer: boolean;
  sizeGuide: boolean;
  quickView: string | null;
}

export type UIAction =
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "OPEN_MOBILE_MENU" }
  | { type: "CLOSE_MOBILE_MENU" }
  | { type: "OPEN_FILTER_DRAWER" }
  | { type: "CLOSE_FILTER_DRAWER" }
  | { type: "OPEN_SIZE_GUIDE" }
  | { type: "CLOSE_SIZE_GUIDE" }
  | { type: "OPEN_QUICK_VIEW"; payload: string }
  | { type: "CLOSE_QUICK_VIEW" }
  | { type: "CLOSE_ALL" };
