export interface SizeGuide {
  category: string;
  label: string;
  measurements: Record<string, string>;
}

export const sizeGuides: SizeGuide[] = [
  {
    category: "Women — Tops",
    label: "XS",
    measurements: { Chest: '34–36"', Waist: '28–30"', Shoulder: '15.5"' },
  },
  {
    category: "Women — Tops",
    label: "S",
    measurements: { Chest: '36–38"', Waist: '30–32"', Shoulder: '16"' },
  },
  {
    category: "Women — Tops",
    label: "M",
    measurements: { Chest: '38–40"', Waist: '32–34"', Shoulder: '17"' },
  },
  {
    category: "Women — Tops",
    label: "L",
    measurements: { Chest: '40–42"', Waist: '34–36"', Shoulder: '18"' },
  },
  {
    category: "Women — Tops",
    label: "XL",
    measurements: { Chest: '42–44"', Waist: '36–38"', Shoulder: '19"' },
  },
  {
    category: "Women — Bottoms",
    label: "XS",
    measurements: { Waist: '25–26"', Hips: '35–36"', Inseam: '30"' },
  },
  {
    category: "Women — Bottoms",
    label: "S",
    measurements: { Waist: '27–28"', Hips: '37–38"', Inseam: '30"' },
  },
  {
    category: "Women — Bottoms",
    label: "M",
    measurements: { Waist: '29–30"', Hips: '39–40"', Inseam: '30.5"' },
  },
  {
    category: "Women — Bottoms",
    label: "L",
    measurements: { Waist: '31–33"', Hips: '41–43"', Inseam: '31"' },
  },
  {
    category: "Men — Tops",
    label: "S",
    measurements: { Chest: '36–38"', Waist: '30–32"', Neck: '15–15.5"' },
  },
  {
    category: "Men — Tops",
    label: "M",
    measurements: { Chest: '38–40"', Waist: '32–34"', Neck: '16–16.5"' },
  },
  {
    category: "Men — Tops",
    label: "L",
    measurements: { Chest: '40–42"', Waist: '34–36"', Neck: '17–17.5"' },
  },
  {
    category: "Men — Tops",
    label: "XL",
    measurements: { Chest: '42–44"', Waist: '36–38"', Neck: '18–18.5"' },
  },
  {
    category: "Men — Bottoms",
    label: "S",
    measurements: { Waist: '29–31"', Hips: '35–37"', Inseam: '32"' },
  },
  {
    category: "Men — Bottoms",
    label: "M",
    measurements: { Waist: '32–34"', Hips: '38–40"', Inseam: '32"' },
  },
  {
    category: "Men — Bottoms",
    label: "L",
    measurements: { Waist: '34–36"', Hips: '40–42"', Inseam: '32"' },
  },
  {
    category: "Men — Bottoms",
    label: "XL",
    measurements: { Waist: '36–38"', Hips: '42–44"', Inseam: '32"' },
  },
  {
    category: "Accessories",
    label: "S",
    measurements: { Belt: '28–30"' },
  },
  {
    category: "Accessories",
    label: "M",
    measurements: { Belt: '32–34"' },
  },
  {
    category: "Accessories",
    label: "L",
    measurements: { Belt: '36–38"' },
  },
];

export function getSizeGuideByCategory(category: string): SizeGuide[] {
  return sizeGuides.filter((s) => s.category.startsWith(category));
}
