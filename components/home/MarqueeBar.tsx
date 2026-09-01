"use client";

const ITEMS = [
  "FREE GLOBAL SHIPPING",
  "SEASONAL DROP",
  "AURA STUDIO EXCLUSIVES",
  "FREE GLOBAL SHIPPING",
  "SEASONAL DROP",
  "AURA STUDIO EXCLUSIVES",
];

export function MarqueeBar() {
  return (
    <section className="bg-surface-container-high py-3 border-y border-outline-variant/30">
      <div className="w-full overflow-hidden">
        <div className="marquee-content font-label-caps text-label-caps text-on-surface-variant flex gap-8 whitespace-nowrap animate-marquee">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="px-8 flex items-center gap-8">
              <span>{item}</span>
              <span className="text-outline-variant">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
