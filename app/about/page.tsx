"use client";

import Image from "next/image";

const CRAFTSMANSHIP = [
  {
    icon: "content_cut",
    title: "Precision Cutting",
    description:
      "Every garment begins with a master pattern, hand-drafted to achieve the exact silhouette envisioned by our design team. Each cut is engineered to maximize fabric flow and drape.",
  },
  {
    icon: "straighten",
    title: "Hand Tailoring",
    description:
      "Our atelier artisans bring decades of experience to every seam, dart, and lapel. Hand-finished details ensure a level of quality that machines simply cannot replicate.",
  },
  {
    icon: "palette",
    title: "Artful Dyeing",
    description:
      "We source our dyes from heritage mills in Italy and Japan, employing low-impact processes that produce rich, lasting color while minimizing water usage.",
  },
  {
    icon: "spa",
    title: "Natural Fibers",
    description:
      "We partner exclusively with certified farms and mills that uphold the highest standards of animal welfare and environmental stewardship.",
  },
];

const SUSTAINABILITY_MATRIX = [
  {
    material: "Virgin Wool",
    source: "New Zealand",
    certification: "RWS (Responsible Wool Standard)",
    practices: "Mulesing-free farms, rotational grazing",
  },
  {
    material: "Mulberry Silk",
    source: "Japan",
    certification: "OEKO-TEX Standard 100",
    practices: "Peace silk harvesting, solar-powered mills",
  },
  {
    material: "Calfskin Leather",
    source: "Italy",
    certification: "Leather Working Group (Gold)",
    practices: "Vegetable tanning, water recycling",
  },
  {
    material: "Organic Cotton",
    source: "India",
    certification: "GOTS (Global Organic Textile Standard)",
    practices: "Rain-fed cultivation, fair trade cooperatives",
  },
  {
    material: "Cashmere",
    source: "Mongolia",
    certification: "Sustainable Fibre Alliance",
    practices: "Nomadic herding, habitat restoration",
  },
  {
    material: "Cupro",
    source: "Japan",
    certification: "OEKO-TEX Standard 100",
    practices: "Cotton waste upcycling, closed-loop production",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop"
          alt="The Vault atelier"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-on-primary text-center p-6">
          <p className="font-label-caps text-label-caps tracking-widest opacity-80 mb-4">
            Our Story
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            THE ART OF MODERN DRESSING
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                Est. 2024
              </p>
              <h2 className="font-headline-md text-headline-md text-primary leading-tight">
                Born from a belief that dressing well is an act of self-respect.
              </h2>
              <div className="flex flex-col gap-4 font-body-lg text-on-surface-variant leading-relaxed">
                <p>
                  The Vault was founded with a singular vision: to create clothing that
                  empowers the modern individual through impeccable tailoring, considered
                  materials, and a design language rooted in architectural minimalism.
                </p>
                <p>
                  We reject the noise of fast fashion. Each piece in our collection is the
                  result of months of development, sourced from the finest mills and
                  workshops in Italy, Japan, and New Zealand. Our atelier combines
                  traditional craftsmanship with contemporary sensibility, producing
                  garments that feel as good as they look.
                </p>
                <p>
                  The name AURA speaks to the invisible energy that a well-dressed person
                  carries into a room. Our clothes are designed not to shout, but to radiate
                  quiet authority.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop"
                alt="Tailor at work in AURA atelier"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
              Craftsmanship
            </p>
            <h2 className="font-headline-md text-headline-md text-primary">
              Four Pillars of Excellence
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CRAFTSMANSHIP.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 p-6 bg-surface border border-outline-variant/30 rounded-lg ambient-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  {item.title}
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Matrix */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-12">
            <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
              Sourcing
            </p>
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Sustainable Sourcing Matrix
            </h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              We hold every material partner to the highest environmental and ethical
              standards. Transparency is not optional — it is foundational.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="font-label-caps text-label-caps text-on-surface-variant py-4 pr-6">
                    Material
                  </th>
                  <th className="font-label-caps text-label-caps text-on-surface-variant py-4 pr-6">
                    Origin
                  </th>
                  <th className="font-label-caps text-label-caps text-on-surface-variant py-4 pr-6">
                    Certification
                  </th>
                  <th className="font-label-caps text-label-caps text-on-surface-variant py-4">
                    Practices
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUSTAINABILITY_MATRIX.map((row) => (
                  <tr
                    key={row.material}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="font-body-md text-primary font-medium py-4 pr-6">
                      {row.material}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-4 pr-6">
                      {row.source}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-4 pr-6">
                      {row.certification}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-4">
                      {row.practices}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-4">
            {SUSTAINABILITY_MATRIX.map((row) => (
              <div
                key={row.material}
                className="border border-outline-variant/30 rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-body-md text-primary font-medium">
                    {row.material}
                  </h3>
                  <span className="text-xs text-on-surface-variant">{row.source}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{row.certification}</p>
                <p className="text-xs text-on-surface-variant/70">{row.practices}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-section-gap bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <blockquote className="font-serif text-headline-md md:text-display-lg leading-relaxed max-w-3xl mx-auto">
            &ldquo;Luxury is not about being noticed. It is about being remembered.&rdquo;
          </blockquote>
          <p className="font-label-caps text-label-caps mt-8 opacity-70">
            — The Vault
          </p>
        </div>
      </section>
    </div>
  );
}
