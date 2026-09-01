export interface Banner {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

export const banners: Banner[] = [
  {
    id: "banner-001",
    slug: "women",
    title: "WOMEN'S COLLECTION",
    subtitle: "Refined silhouettes for the modern wardrobe",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Shop Women",
    ctaHref: "/collections/women",
  },
  {
    id: "banner-002",
    slug: "men",
    title: "MEN'S COLLECTION",
    subtitle: "Tailored precision meets contemporary edge",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Shop Men",
    ctaHref: "/collections/men",
  },
  {
    id: "banner-003",
    slug: "accessories",
    title: "ACCESSORIES",
    subtitle: "The details that define your style",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Shop Accessories",
    ctaHref: "/collections/accessories",
  },
  {
    id: "banner-004",
    slug: "new-arrivals",
    title: "NEW ARRIVALS",
    subtitle: "Fresh from the atelier",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Discover Now",
    ctaHref: "/collections/new-arrivals",
  },
  {
    id: "banner-005",
    slug: "essentials",
    title: "ESSENTIALS",
    subtitle: "Timeless pieces for every wardrobe",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Shop Essentials",
    ctaHref: "/collections/essentials",
  },
  {
    id: "banner-006",
    slug: "the-obsidian-set",
    title: "THE OBSIDIAN SET",
    subtitle: "Curated black-on-black ensembles",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Explore the Edit",
    ctaHref: "/collections/the-obsidian-set",
  },
];

export function getBannerBySlug(slug: string): Banner | undefined {
  return banners.find((b) => b.slug === slug);
}
