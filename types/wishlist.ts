export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: number;
}

export interface WishlistState {
  items: WishlistItem[];
}

export type WishlistAction =
  | { type: "TOGGLE_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] };
