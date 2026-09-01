export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: "rev-001",
    productId: "prod-001",
    author: "Margaux D.",
    rating: 5,
    title: "Impeccable tailoring",
    body: "The shoulder structure on this blazer is extraordinary. Fits true to size and the wool gabardine has a beautiful drape. Worth every penny.",
    date: "2024-08-10",
    verified: true,
    helpful: 14,
  },
  {
    id: "rev-002",
    productId: "prod-001",
    author: "James T.",
    rating: 5,
    title: "Statement piece",
    body: "Bought this for my partner and she hasn't stopped wearing it. The quality is on par with pieces costing twice as much.",
    date: "2024-07-22",
    verified: true,
    helpful: 9,
  },
  {
    id: "rev-003",
    productId: "prod-001",
    author: "Sofia R.",
    rating: 4,
    title: "Beautiful but runs slightly large",
    body: "The craftsmanship is undeniable. I'm typically a size S but needed an XS for the intended oversized look. The sand color is stunning in person.",
    date: "2024-06-15",
    verified: true,
    helpful: 7,
  },
  {
    id: "rev-004",
    productId: "prod-003",
    author: "Elena V.",
    rating: 5,
    title: "The silk is divine",
    body: "This camisole has the most beautiful luster. The cowl neckline drapes perfectly and the adjustable straps are a thoughtful detail. I ordered the ivory and immediately came back for the champagne.",
    date: "2024-08-05",
    verified: true,
    helpful: 21,
  },
  {
    id: "rev-005",
    productId: "prod-003",
    author: "Catherine L.",
    rating: 5,
    title: "A wardrobe essential",
    body: "Goes under everything from blazers to cardigans. The silk quality is exceptional for this price point. Hand washes beautifully.",
    date: "2024-07-18",
    verified: true,
    helpful: 16,
  },
  {
    id: "rev-006",
    productId: "prod-005",
    author: "Amara K.",
    rating: 5,
    title: "Impossibly soft",
    body: "This is real cashmere — you can feel the difference immediately. The oatmeal color is perfect for layering. I've worn it at least three times a week since it arrived.",
    date: "2024-08-12",
    verified: true,
    helpful: 18,
  },
  {
    id: "rev-007",
    productId: "prod-005",
    author: "David M.",
    rating: 4,
    title: "Great quality, slightly roomy",
    body: "The cashmere quality is outstanding. The relaxed fit is intentional but I would have preferred a slightly trimmer cut. Still, one of the best sweaters I own.",
    date: "2024-07-01",
    verified: true,
    helpful: 11,
  },
  {
    id: "rev-008",
    productId: "prod-010",
    author: "Isabelle F.",
    rating: 5,
    title: "The only bag you need",
    body: "Structured, chic, and surprisingly spacious. The suede lining is a luxurious touch. I get compliments every time I carry it.",
    date: "2024-08-08",
    verified: true,
    helpful: 23,
  },
  {
    id: "rev-009",
    productId: "prod-010",
    author: "Lauren W.",
    rating: 5,
    title: "Investment piece",
    body: "The calfskin leather is buttery soft and the hardware has a beautiful weight to it. The magnetic closure is satisfying. This bag elevates every outfit.",
    date: "2024-06-28",
    verified: true,
    helpful: 15,
  },
  {
    id: "rev-010",
    productId: "prod-006",
    author: "Marcus H.",
    rating: 5,
    title: "Perfect layering piece",
    body: "The merino is incredibly fine and the turtleneck sits perfectly without being restrictive. Layers beautifully under the double-breasted blazer.",
    date: "2024-07-14",
    verified: true,
    helpful: 8,
  },
  {
    id: "rev-011",
    productId: "prod-008",
    author: "Oliver P.",
    rating: 4,
    title: "Sharp and commanding",
    body: "The structured shoulder gives an incredible silhouette. The satin lapel trim is a subtle detail that elevates the whole piece. Navy is the way to go.",
    date: "2024-08-01",
    verified: true,
    helpful: 12,
  },
  {
    id: "rev-012",
    productId: "prod-012",
    author: "Nina S.",
    rating: 5,
    title: "Lightweight and elegant",
    body: "The titanium frame is so light I forget I'm wearing them. The green lenses are beautiful and the polarized coating works perfectly. The leather case is a nice touch.",
    date: "2024-07-20",
    verified: true,
    helpful: 10,
  },
];

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getReviewsByProduct(productId);
  if (productReviews.length === 0) return 0;
  return (
    productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
  );
}
