import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "cat-001",
    slug: "women",
    name: "Women",
    subcategories: [
      { id: "sub-001", slug: "outerwear", name: "Outerwear" },
      { id: "sub-002", slug: "tops", name: "Tops" },
      { id: "sub-003", slug: "bottoms", name: "Bottoms" },
    ],
  },
  {
    id: "cat-002",
    slug: "men",
    name: "Men",
    subcategories: [
      { id: "sub-004", slug: "outerwear", name: "Outerwear" },
      { id: "sub-005", slug: "tops", name: "Tops" },
      { id: "sub-006", slug: "bottoms", name: "Bottoms" },
    ],
  },
  {
    id: "cat-003",
    slug: "accessories",
    name: "Accessories",
    subcategories: [
      { id: "sub-007", slug: "bags", name: "Bags" },
      { id: "sub-008", slug: "belts", name: "Belts" },
      { id: "sub-009", slug: "eyewear", name: "Eyewear" },
    ],
  },
];
