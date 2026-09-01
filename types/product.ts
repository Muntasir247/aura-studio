export interface ProductColor {
  name: string;
  value: string;
  image?: string;
}

export interface ProductSize {
  label: string;
  available: boolean;
  stock?: number;
}

export interface ProductImage {
  src: string;
  alt: string;
  isThumbnail: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  description: string;
  fabricAndCare: string[];
  shippingInfo: string;
  category: "women" | "men" | "accessories";
  subcategory: string;
  tags: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  lowStockThreshold?: number;
  relatedProducts: string[];
  bundleWith?: string[];
}
