import type { Collection } from "@/types/product";

export const collections: Collection[] = [
  {
    id: "col-001",
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "The latest additions to The Vault edit.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-001", "prod-002", "prod-004", "prod-006", "prod-010", "prod-012"],
  },
  {
    id: "col-002",
    slug: "essentials",
    name: "Essentials",
    description: "Timeless pieces that form the foundation of your wardrobe.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-003", "prod-005", "prod-007", "prod-009"],
  },
  {
    id: "col-003",
    slug: "the-obsidian-set",
    name: "The Obsidian Set",
    description: "Curated black-on-black ensembles for maximum impact.",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-001", "prod-002", "prod-010"],
  },
];
