"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

const ANCHOR_LINKS = [
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "exchanges", label: "Exchanges" },
  { id: "care", label: "Care" },
];

const SHIPPING_METHODS = [
  { method: "Standard", time: "5–7 business days", cost: "$25.00", threshold: null },
  { method: "Express", time: "2–3 business days", cost: "$45.00", threshold: null },
  { method: "Next Day", time: "1 business day", cost: "$75.00", threshold: null },
  { method: "Standard (over $300)", time: "5–7 business days", cost: "Complimentary", threshold: 300 },
];

function AnchorNav() {
  const [active, setActive] = useState("shipping");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    ANCHOR_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden lg:block sticky top-[88px] self-start w-48 shrink-0">
      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
        On This Page
      </p>
      <ul className="flex flex-col gap-1 border-l border-outline-variant/30">
        {ANCHOR_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={`block pl-4 py-2 font-body-md transition-colors border-l -ml-[1px] ${
                active === link.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ShippingReturnsPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      {/* Hero */}
      <section className="py-section-gap bg-surface-container-lowest border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
            Policies
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
            Shipping & Returns
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-4 max-w-xl mx-auto">
            Everything you need to know about delivery, returns, and exchanges.
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="flex gap-16">
          <AnchorNav />

          <div className="flex-1 max-w-3xl flex flex-col gap-24">
            {/* Shipping */}
            <section id="shipping" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Shipping
              </h2>
              <div className="flex flex-col gap-6 font-body-md text-on-surface-variant leading-relaxed">
                <p>
                  All orders are processed within 1–2 business days. Orders placed on
                  weekends or holidays will be processed the next business day. You will
                  receive a shipping confirmation email with tracking information once your
                  order has been dispatched.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/30">
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-3 pr-6">
                          Method
                        </th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-3 pr-6">
                          Delivery
                        </th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-3">
                          Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SHIPPING_METHODS.map((row) => (
                        <tr key={row.method} className="border-b border-outline-variant/10">
                          <td className="font-body-md text-primary font-medium py-3 pr-6">
                            {row.method}
                          </td>
                          <td className="font-body-md text-on-surface-variant py-3 pr-6">
                            {row.time}
                          </td>
                          <td className="font-body-md text-on-surface-variant py-3">
                            {row.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p>
                  <strong className="text-primary">International orders</strong> may be
                  subject to import duties and taxes, which are imposed once the shipment
                  reaches your country. These charges are the responsibility of the
                  recipient. We ship to over 60 countries worldwide.
                </p>

                <p>
                  We cannot ship to P.O. boxes or freight forwarding addresses. A signature
                  may be required for orders over $500.
                </p>
              </div>
            </section>

            {/* Returns */}
            <section id="returns" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Returns
              </h2>
              <div className="flex flex-col gap-6 font-body-md text-on-surface-variant leading-relaxed">
                <p>
                  We want you to love your purchase. If you are not completely satisfied,
                  you may return eligible items within <strong className="text-primary">14 days</strong> of
                  delivery for a full refund or exchange.
                </p>

                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-4">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                    Return Conditions
                  </h3>
                  <ul className="flex flex-col gap-2 font-body-md">
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      Items must be unworn, unwashed, and in original condition
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      All original tags must be attached
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      Items must be free of marks, stains, or fragrances
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      Return in original AURA packaging when possible
                    </li>
                  </ul>
                </div>

                <p>
                  <strong className="text-primary">Final sale items</strong> include
                  products purchased during promotional events, sample sales, and items
                  marked as &quot;Final Sale&quot; on the product page. These items are not eligible
                  for return or exchange.
                </p>

                <p>
                  To initiate a return, visit your{" "}
                  <Link href="/account" className="underline text-primary hover:text-accent transition-colors">
                    Account
                  </Link>{" "}
                  page and select the order containing the item(s) you wish to return, or
                  contact our concierge team.
                </p>
              </div>
            </section>

            {/* Exchanges */}
            <section id="exchanges" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Exchanges
              </h2>
              <div className="flex flex-col gap-6 font-body-md text-on-surface-variant leading-relaxed">
                <p>
                  We are happy to exchange items for a different size or color, subject to
                  availability. Exchanges follow the same conditions as returns and must be
                  initiated within 14 days of delivery.
                </p>
                <p>
                  If the desired replacement is unavailable, we will process a full refund
                  to your original payment method. Complimentary exchange shipping is
                  provided for domestic orders.
                </p>
                <p>
                  For international exchanges, please contact our concierge team to arrange
                  a return and place a new order for the desired item.
                </p>
              </div>
            </section>

            {/* Care */}
            <section id="care" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Garment Care
              </h2>
              <div className="flex flex-col gap-6 font-body-md text-on-surface-variant leading-relaxed">
                <p>
                  Each Vault garment is crafted from premium materials and deserves
                  proper care to preserve its beauty and longevity. Specific care
                  instructions are found on the garment label.
                </p>
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-4">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                    General Guidelines
                  </h3>
                  <ul className="flex flex-col gap-2 font-body-md">
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      <span><strong className="text-primary">Wool &amp; Tailored:</strong> Dry clean only. Store on wide, padded hangers.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      <span><strong className="text-primary">Silk:</strong> Hand wash cold or dry clean. Avoid direct sunlight when drying.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      <span><strong className="text-primary">Cashmere &amp; Knits:</strong> Hand wash cold, lay flat to dry. Store folded, never hung.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                        check
                      </span>
                      <span><strong className="text-primary">Leather:</strong> Wipe with a damp cloth. Condition periodically. Store in dust bag.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-8 text-center">
              <p className="font-headline-sm text-headline-sm text-primary mb-3">
                Still have questions?
              </p>
              <p className="font-body-md text-on-surface-variant mb-6">
                Our concierge team is available to assist with any inquiries.
              </p>
              <Link href="/contact">
                <Button variant="primary" icon="chat" iconPosition="left">
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
