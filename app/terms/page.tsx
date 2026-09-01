"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ANCHOR_LINKS = [
  { id: "acceptance", label: "Acceptance" },
  { id: "eligibility", label: "Eligibility" },
  { id: "accounts", label: "Accounts" },
  { id: "orders", label: "Orders & Pricing" },
  { id: "ip", label: "Intellectual Property" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "governing", label: "Governing Law" },
];

function AnchorNav() {
  const [active, setActive] = useState("acceptance");

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

export default function TermsPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      <section className="py-section-gap bg-surface-container-lowest border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
            Legal
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
            Terms of Service
          </h1>
          <p className="font-body-md text-on-surface-variant mt-4">
            Last updated: September 1, 2026
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="flex gap-16">
          <AnchorNav />

          <div className="flex-1 max-w-3xl flex flex-col gap-24 font-body-md text-on-surface-variant leading-relaxed">
            <section id="acceptance" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Acceptance of Terms
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  By accessing or using The Vault website (thevault.com) and
                  related services, you agree to be bound by these Terms of Service. If
                  you do not agree, please do not use our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Continued use
                  after changes constitutes acceptance of the revised terms.
                </p>
              </div>
            </section>

            <section id="eligibility" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Eligibility
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  Our services are intended for individuals who are at least 18 years of
                  age and capable of forming a binding contract. By using our services,
                  you represent and warrant that you meet these requirements.
                </p>
              </div>
            </section>

            <section id="accounts" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Accounts
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  When you create an account, you must provide accurate and complete
                  information. You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities under your account.
                </p>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these
                  terms, or that we reasonably believe are being used for unauthorized
                  purposes.
                </p>
              </div>
            </section>

            <section id="orders" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Orders & Pricing
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  All orders are subject to acceptance and availability. We reserve the
                  right to refuse or cancel any order for any reason, including product
                  availability, errors in pricing, or suspected fraudulent activity.
                </p>
                <p>
                  Prices are displayed in USD and are inclusive of applicable taxes where
                  required. International orders may be subject to additional duties and
                  taxes imposed by the destination country.
                </p>
                <p>
                  We strive for accuracy in all product descriptions and imagery. However,
                  slight variations in color, texture, or dimensions may occur. Such
                  differences do not constitute a defect.
                </p>
              </div>
            </section>

            <section id="ip" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Intellectual Property
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  All content on this website, including but not limited to text,
                  graphics, logos, images, designs, and software, is the property of THE
                  VAULT or its licensors and is protected by copyright, trademark, and
                  other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works
                  from any content without our express written consent. Product images and
                  descriptions are for personal, non-commercial use only.
                </p>
              </div>
            </section>

            <section id="liability" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Limitation of Liability
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  To the maximum extent permitted by law, The Vault shall not be liable
                  for any indirect, incidental, special, consequential, or punitive
                  damages arising from your use of our services or products.
                </p>
                <p>
                  Our total liability for any claim arising from or related to our
                  services or products shall not exceed the amount you paid for the
                  specific product or service giving rise to the claim.
                </p>
              </div>
            </section>

            <section id="governing" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Governing Law
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  These Terms of Service are governed by and construed in accordance with
                  the laws of the State of New York, United States, without regard to
                  conflict of law principles.
                </p>
                <p>
                  Any dispute arising from these terms shall be resolved in the state or
                  federal courts located in New York County, New York, and you consent to
                  the personal jurisdiction of such courts.
                </p>
              </div>
            </section>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-8 text-center">
              <p className="font-body-md text-on-surface-variant mb-4">
                Questions about our terms?
              </p>
              <Link href="/contact" className="underline text-primary hover:text-accent transition-colors font-medium">
                Contact our legal team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
