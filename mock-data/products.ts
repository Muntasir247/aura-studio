import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "structured-oversized-blazer",
    name: "Structured Oversized Blazer",
    subtitle: "Tailored Wool gabardine",
    price: 450,
    currency: "USD",
    description:
      "A masterclass in modern tailoring. This blazer features an exaggerated shoulder line and a relaxed, draped silhouette, crafted from premium Italian wool gabardine. Designed to anchor your wardrobe with effortless authority.",
    fabricAndCare: [
      "Main: 100% Virgin Wool",
      "Lining: 100% Cupro",
      "Dry clean only. Do not tumble dry.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "women",
    subcategory: "outerwear",
    tags: ["new-in", "bestseller"],
    colors: [
      { name: "Obsidian", value: "#000000" },
      { name: "Sand", value: "#d2b48c" },
      { name: "Slate", value: "#708090" },
    ],
    sizes: [
      { label: "XS", available: true, stock: 12 },
      { label: "S", available: true, stock: 8 },
      { label: "M", available: true, stock: 3 },
      { label: "L", available: true, stock: 6 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
        alt: "Structured oversized blazer in obsidian black on invisible mannequin",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
        alt: "Model wearing structured oversized blazer side angle",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop",
        alt: "Back view of structured oversized blazer showing tailored seams",
        isThumbnail: false,
      },
    ],
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    lowStockThreshold: 5,
    relatedProducts: ["prod-002", "prod-003", "prod-004"],
    bundleWith: ["prod-002"],
  },
  {
    id: "prod-002",
    slug: "tailored-wide-leg-trouser",
    name: "Tailored Wide-Leg Trouser",
    subtitle: "Fluid drape silhouette",
    price: 280,
    currency: "USD",
    description:
      "Precision-cut from fluid Italian crepe, these wide-leg trousers deliver a sweeping silhouette with a high-rise waist. Finished with a concealed side zip and pressed center crease for a sharp, editorial line.",
    fabricAndCare: [
      "Main: 98% Virgin Wool, 2% Elastane",
      "Lining: 100% Cupro",
      "Dry clean only.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "women",
    subcategory: "bottoms",
    tags: ["new-in"],
    colors: [
      { name: "Sand", value: "#d2b48c" },
      { name: "Obsidian", value: "#000000" },
      { name: "Ivory", value: "#fffff0" },
    ],
    sizes: [
      { label: "XS", available: true, stock: 10 },
      { label: "S", available: true, stock: 14 },
      { label: "M", available: true, stock: 9 },
      { label: "L", available: true, stock: 7 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
        alt: "Tailored wide-leg trouser in sand tone on hanger",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop",
        alt: "Model wearing wide-leg trousers full length editorial shot",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        alt: "Detail of wide-leg trouser fabric drape",
        isThumbnail: false,
      },
    ],
    rating: 4.6,
    reviewCount: 28,
    inStock: true,
    relatedProducts: ["prod-001", "prod-003"],
    bundleWith: ["prod-001"],
  },
  {
    id: "prod-003",
    slug: "silk-camisole",
    name: "Silk Camisole",
    subtitle: "Pure mulberry silk",
    price: 150,
    currency: "USD",
    description:
      "An essential layering piece crafted from 100% mulberry silk with a delicate cowl neckline and adjustable spaghetti straps. The lustrous drape makes it equally stunning worn alone or beneath a structured blazer.",
    fabricAndCare: [
      "Main: 100% Mulberry Silk",
      "Hand wash cold. Lay flat to dry.",
      "Iron on low heat.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "women",
    subcategory: "tops",
    tags: ["bestseller"],
    colors: [
      { name: "Ivory", value: "#fffff0" },
      { name: "Champagne", value: "#f7e7ce" },
      { name: "Black", value: "#000000" },
    ],
    sizes: [
      { label: "XS", available: true, stock: 20 },
      { label: "S", available: true, stock: 18 },
      { label: "M", available: true, stock: 15 },
      { label: "L", available: true, stock: 12 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop",
        alt: "Silk camisole in ivory laid flat on minimal surface",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
        alt: "Model wearing silk camisole with blazer editorial",
        isThumbnail: true,
      },
    ],
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    relatedProducts: ["prod-001", "prod-002"],
  },
  {
    id: "prod-004",
    slug: "tailored-wool-coat",
    name: "Tailored Wool Coat",
    subtitle: "Double-breasted silhouette",
    price: 890,
    currency: "USD",
    description:
      "A commanding double-breasted coat cut from heavyweight Italian wool. Features a sharp peak lapel, horn buttons, and a knee-length hem. The definitive outerwear piece for the modern wardrobe.",
    fabricAndCare: [
      "Main: 100% Italian Wool",
      "Lining: 100% Viscose",
      "Dry clean only.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "women",
    subcategory: "outerwear",
    tags: ["new-in", "exclusive"],
    colors: [
      { name: "Camel", value: "#c19a6b" },
      { name: "Obsidian", value: "#000000" },
    ],
    sizes: [
      { label: "XS", available: true, stock: 5 },
      { label: "S", available: true, stock: 4 },
      { label: "M", available: true, stock: 2 },
      { label: "L", available: true, stock: 3 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
        alt: "Tailored wool coat in camel on model editorial shot",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1200&auto=format&fit=crop",
        alt: "Wool coat detail showing peak lapel and horn buttons",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1200&auto=format&fit=crop",
        alt: "Back view of tailored wool coat in motion",
        isThumbnail: false,
      },
    ],
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    lowStockThreshold: 3,
    relatedProducts: ["prod-001", "prod-002"],
  },
  {
    id: "prod-005",
    slug: "cashmere-crewneck-sweater",
    name: "Cashmere Crewneck Sweater",
    subtitle: "Grade-A Mongolian cashmere",
    price: 320,
    currency: "USD",
    description:
      "Pure grade-A Mongolian cashmere in a relaxed crewneck silhouette. Ribbed cuffs and hem with a slightly oversized fit. Impossibly soft, endlessly versatile.",
    fabricAndCare: [
      "Main: 100% Grade-A Mongolian Cashmere",
      "Hand wash cold. Lay flat to dry.",
      "Do not hang.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "women",
    subcategory: "tops",
    tags: ["bestseller"],
    colors: [
      { name: "Oatmeal", value: "#d3c5a0" },
      { name: "Heather Grey", value: "#9e9e9e" },
      { name: "Midnight", value: "#191970" },
      { name: "Camel", value: "#c19a6b" },
    ],
    sizes: [
      { label: "XS", available: true, stock: 14 },
      { label: "S", available: true, stock: 16 },
      { label: "M", available: true, stock: 11 },
      { label: "L", available: true, stock: 9 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
        alt: "Cashmere crewneck sweater in oatmeal folded neatly",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a75?q=80&w=1200&auto=format&fit=crop",
        alt: "Model wearing cashmere sweater with relaxed fit",
        isThumbnail: true,
      },
    ],
    rating: 4.8,
    reviewCount: 53,
    inStock: true,
    relatedProducts: ["prod-002", "prod-006"],
  },
  {
    id: "prod-006",
    slug: "merino-ribbed-turtleneck",
    name: "Merino Ribbed Turtleneck",
    subtitle: "Extra-fine merino wool",
    price: 195,
    currency: "USD",
    description:
      "A sleek ribbed turtleneck in extra-fine Australian merino. The slim-fit silhouette layers perfectly under blazers and coats, while the roll-neck adds a refined finishing touch.",
    fabricAndCare: [
      "Main: 100% Extra-Fine Merino Wool",
      "Hand wash cold. Lay flat to dry.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "men",
    subcategory: "tops",
    tags: ["new-in"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Charcoal", value: "#36454f" },
      { name: "Cream", value: "#fffdd0" },
    ],
    sizes: [
      { label: "S", available: true, stock: 10 },
      { label: "M", available: true, stock: 14 },
      { label: "L", available: true, stock: 12 },
      { label: "XL", available: true, stock: 8 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a75?q=80&w=1200&auto=format&fit=crop",
        alt: "Merino turtleneck in black on model",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=1200&auto=format&fit=crop",
        alt: "Detail of merino ribbed turtleneck texture",
        isThumbnail: true,
      },
    ],
    rating: 4.5,
    reviewCount: 31,
    inStock: true,
    relatedProducts: ["prod-007", "prod-008"],
  },
  {
    id: "prod-007",
    slug: "oversized-cotton-poplin-shirt",
    name: "Oversized Cotton Poplin Shirt",
    subtitle: "Washed organic cotton",
    price: 165,
    currency: "USD",
    description:
      "An oversized shirt cut from crisp washed organic cotton poplin. Features a relaxed drop shoulder, a boxy hem, and mother-of-pearl buttons. A modern essential that transcends seasons.",
    fabricAndCare: [
      "Main: 100% Organic Cotton Poplin",
      "Machine wash cold. Tumble dry low.",
      "Iron on medium heat.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "men",
    subcategory: "tops",
    tags: [],
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Sky Blue", value: "#87ceeb" },
    ],
    sizes: [
      { label: "S", available: true, stock: 18 },
      { label: "M", available: true, stock: 22 },
      { label: "L", available: true, stock: 16 },
      { label: "XL", available: true, stock: 10 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
        alt: "Oversized cotton poplin shirt in white on model",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
        alt: "Cotton shirt detail showing mother-of-pearl buttons",
        isThumbnail: true,
      },
    ],
    rating: 4.4,
    reviewCount: 22,
    inStock: true,
    relatedProducts: ["prod-006", "prod-008"],
  },
  {
    id: "prod-008",
    slug: "double-breasted-wool-blazer",
    name: "Double-Breasted Wool Blazer",
    subtitle: "Italian wool blend",
    price: 520,
    currency: "USD",
    description:
      "A sharp double-breasted blazer in Italian wool blend with a structured shoulder and a tapered waist. Horn buttons and a satin-trimmed notch lapel complete the commanding silhouette.",
    fabricAndCare: [
      "Main: 80% Wool, 20% Polyester",
      "Lining: 100% Cupro",
      "Dry clean only.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "men",
    subcategory: "outerwear",
    tags: ["exclusive"],
    colors: [
      { name: "Navy", value: "#000080" },
      { name: "Charcoal", value: "#36454f" },
    ],
    sizes: [
      { label: "S", available: true, stock: 6 },
      { label: "M", available: true, stock: 8 },
      { label: "L", available: true, stock: 5 },
      { label: "XL", available: true, stock: 4 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
        alt: "Double-breasted wool blazer in navy on model",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200&auto=format&fit=crop",
        alt: "Blazer detail showing horn buttons and satin lapel",
        isThumbnail: true,
      },
    ],
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    lowStockThreshold: 3,
    relatedProducts: ["prod-006", "prod-007", "prod-009"],
  },
  {
    id: "prod-009",
    slug: "tailored-chinos",
    name: "Tailored Chinos",
    subtitle: "Stretch cotton twill",
    price: 185,
    currency: "USD",
    description:
      "Slim-fit chinos in premium stretch cotton twill with a tailored leg. Features a flat front, side pockets, and a concealed zip fly. The ideal bridge between casual and formal.",
    fabricAndCare: [
      "Main: 97% Cotton, 3% Elastane",
      "Machine wash cold. Hang dry.",
      "Iron on low heat.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "men",
    subcategory: "bottoms",
    tags: [],
    colors: [
      { name: "Khaki", value: "#c3b091" },
      { name: "Navy", value: "#000080" },
      { name: "Olive", value: "#556b2f" },
    ],
    sizes: [
      { label: "S", available: true, stock: 14 },
      { label: "M", available: true, stock: 18 },
      { label: "L", available: true, stock: 12 },
      { label: "XL", available: true, stock: 8 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200&auto=format&fit=crop",
        alt: "Tailored chinos in khaki on model",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
        alt: "Chinos detail showing fabric texture",
        isThumbnail: true,
      },
    ],
    rating: 4.3,
    reviewCount: 38,
    inStock: true,
    relatedProducts: ["prod-007", "prod-008"],
  },
  {
    id: "prod-010",
    slug: "structured-box-bag",
    name: "Structured Box Bag",
    subtitle: "Full-grain calfskin leather",
    price: 650,
    currency: "USD",
    description:
      "A structured box silhouette in full-grain Italian calfskin with polished hardware. Features a detachable shoulder strap, magnetic closure, and suede-lined interior with organizational pockets.",
    fabricAndCare: [
      "Main: 100% Full-Grain Calfskin Leather",
      "Interior: 100% Suede",
      "Wipe clean with a soft damp cloth.",
      "Store in provided dust bag.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "accessories",
    subcategory: "bags",
    tags: ["exclusive", "new-in"],
    colors: [
      { name: "Obsidian", value: "#000000" },
      { name: "Cognac", value: "#834a25" },
      { name: "Ivory", value: "#fffff0" },
    ],
    sizes: [
      { label: "One Size", available: true, stock: 10 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
        alt: "Structured box bag in obsidian black on white surface",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
        alt: "Box bag detail showing polished hardware",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38ef6d88c?q=80&w=1200&auto=format&fit=crop",
        alt: "Box bag interior showing suede lining",
        isThumbnail: false,
      },
    ],
    rating: 4.9,
    reviewCount: 24,
    inStock: true,
    lowStockThreshold: 3,
    relatedProducts: ["prod-011", "prod-012"],
    bundleWith: ["prod-001"],
  },
  {
    id: "prod-011",
    slug: "minimalist-leather-belt",
    name: "Minimalist Leather Belt",
    subtitle: "Vegetable-tanned leather",
    price: 95,
    currency: "USD",
    description:
      "A clean-line belt in vegetable-tanned Italian leather with a brushed silver buckle. The 3cm width strikes the perfect balance between formal and casual. Ages beautifully with wear.",
    fabricAndCare: [
      "Main: 100% Vegetable-Tanned Leather",
      "Buckle: Brushed Silver",
      "Avoid prolonged water exposure.",
      "Condition leather periodically.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "accessories",
    subcategory: "belts",
    tags: [],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Tan", value: "#d2b48c" },
    ],
    sizes: [
      { label: "S", available: true, stock: 12 },
      { label: "M", available: true, stock: 15 },
      { label: "L", available: true, stock: 10 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
        alt: "Minimalist leather belt in black coiled on surface",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop",
        alt: "Belt detail showing brushed silver buckle",
        isThumbnail: true,
      },
    ],
    rating: 4.6,
    reviewCount: 41,
    inStock: true,
    relatedProducts: ["prod-010"],
  },
  {
    id: "prod-012",
    slug: "aviator-sunglasses",
    name: "Aviator Sunglasses",
    subtitle: "Titanium frame, polarized",
    price: 245,
    currency: "USD",
    description:
      "Classic aviator silhouette reimagined with a lightweight titanium frame and polarized CR-39 lenses. UV400 protection with anti-reflective coating. Includes premium leather case.",
    fabricAndCare: [
      "Frame: Titanium",
      "Lenses: Polarized CR-39",
      "UV400 Protection",
      "Wipe lenses with provided microfiber cloth.",
    ],
    shippingInfo:
      "Complimentary express shipping on orders over $300. Returns accepted within 14 days of delivery in original condition.",
    category: "accessories",
    subcategory: "eyewear",
    tags: ["new-in"],
    colors: [
      { name: "Gold / Green", value: "#c5a55a" },
      { name: "Silver / Blue", value: "#a8b5c2" },
      { name: "Matte Black", value: "#28282b" },
    ],
    sizes: [
      { label: "One Size", available: true, stock: 16 },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
        alt: "Aviator sunglasses in gold with green lenses",
        isThumbnail: true,
      },
      {
        src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop",
        alt: "Aviator sunglasses detail showing titanium frame",
        isThumbnail: true,
      },
    ],
    rating: 4.5,
    reviewCount: 33,
    inStock: true,
    relatedProducts: ["prod-010", "prod-011"],
  },
];

export const collections = [
  {
    id: "col-001",
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "The latest additions to the AURA STUDIO edit.",
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

export const categories = [
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
