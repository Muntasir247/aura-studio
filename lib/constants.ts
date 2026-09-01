export const SITE_NAME = "The Vault";
export const SITE_TAGLINE = "Modern Luxury Fashion";
export const SITE_DESCRIPTION =
  "The Vault — Defining modern silhouettes. Discover curated collections of luxury fashion for men and women.";
export const SITE_URL = "https://thevault.com";

export const FREE_SHIPPING_THRESHOLD = 300;
export const STANDARD_SHIPPING_COST = 25;
export const EXPRESS_SHIPPING_COST = 45;
export const NEXT_DAY_SHIPPING_COST = 75;
export const GIFT_WRAP_COST = 15;

export const RETURN_WINDOW_DAYS = 14;
export const PROCESSING_DELAY_MS = 2000;

export const NAV_LINKS = [
  { label: "New In", href: "/collections/new-arrivals" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Studio", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

export const FOOTER_NAV = {
  Shop: [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Accessories", href: "/collections/accessories" },
  ],
  Help: [
    { label: "Shipping", href: "/shipping-returns" },
    { label: "Returns", href: "/shipping-returns" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Wishlist", href: "/wishlist" },
  ],
} as const;

export const PROMO_CODES: Record<string, number> = {
  VAULT10: 10,
  AURA10: 10,
  WELCOME15: 15,
  VIP20: 20,
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/thevault", icon: "photo_camera" },
  { label: "YouTube", href: "https://youtube.com/thevault", icon: "play_circle" },
] as const;
