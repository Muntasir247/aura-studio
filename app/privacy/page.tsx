"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ANCHOR_LINKS = [
  { id: "collection", label: "Information We Collect" },
  { id: "usage", label: "How We Use It" },
  { id: "sharing", label: "Sharing" },
  { id: "security", label: "Security" },
  { id: "cookies", label: "Cookies" },
  { id: "rights", label: "Your Rights" },
  { id: "contact", label: "Contact" },
];

function AnchorNav() {
  const [active, setActive] = useState("collection");

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

export default function PrivacyPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      <section className="py-section-gap bg-surface-container-lowest border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
            Legal
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
            Privacy Policy
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
            <section id="collection" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Information We Collect
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  We collect information you provide directly, information collected
                  automatically, and information from third parties.
                </p>
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-3">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                    Personal Information
                  </h3>
                  <ul className="flex flex-col gap-2">
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      Name, email address, phone number
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      Shipping and billing addresses
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      Payment information (processed securely, not stored)
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      Purchase history and preferences
                    </li>
                  </ul>
                </div>
                <p>
                  We also collect certain information automatically, including IP address,
                  browser type, operating system, referring URLs, and browsing behavior on
                  our site.
                </p>
              </div>
            </section>

            <section id="usage" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                How We Use Your Information
              </h2>
              <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                      check
                    </span>
                    Process and fulfill your orders
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                      check
                    </span>
                    Communicate about orders, products, and services
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                      check
                    </span>
                    Personalize your shopping experience
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                      check
                    </span>
                    Improve our website, products, and services
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                      check
                    </span>
                    Detect and prevent fraud or unauthorized access
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                      check
                    </span>
                    Comply with legal obligations
                  </li>
                </ul>
              </div>
            </section>

            <section id="sharing" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Sharing of Information
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  We do not sell your personal information. We share information only in
                  the following circumstances:
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-primary">Service providers:</strong> Third parties who perform services on our behalf (payment processing, shipping, analytics).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-primary">Legal requirements:</strong> When required by law, regulation, or valid legal process.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-primary">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="security" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Data Security
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  We implement industry-standard security measures to protect your
                  information, including TLS encryption for all data in transit,
                  AES-256 encryption for data at rest, and regular security audits.
                </p>
                <p>
                  While we take reasonable precautions, no method of electronic
                  transmission or storage is completely secure. We cannot guarantee
                  absolute security.
                </p>
              </div>
            </section>

            <section id="cookies" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Cookies & Tracking
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  We use cookies and similar technologies to enhance your experience,
                  analyze site traffic, and personalize content. You can manage cookie
                  preferences through your browser settings.
                </p>
                <p>
                  Essential cookies required for site functionality cannot be disabled.
                  Analytics and marketing cookies are optional and can be toggled in your
                  cookie preferences.
                </p>
              </div>
            </section>

            <section id="rights" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Your Rights
              </h2>
              <div className="flex flex-col gap-4">
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Access the personal information we hold about you
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Correct inaccurate or incomplete information
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Delete your personal information
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Opt out of marketing communications
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Data portability
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, contact our privacy team at the address
                  below. We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            <section id="contact" className="scroll-mt-[88px]">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Contact Us
              </h2>
              <div className="flex flex-col gap-4">
                <p>
                  For privacy-related inquiries, please contact:
                </p>
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
                  <p className="font-body-md text-primary font-medium">
                    AURA STUDIO Privacy & Legal Team
                  </p>
                  <p>privacy@aura-studio.com</p>
                  <p>550 Fifth Avenue, Suite 4200</p>
                  <p>New York, NY 10036</p>
                </div>
              </div>
            </section>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-8 text-center">
              <p className="font-body-md text-on-surface-variant mb-4">
                Questions about this policy?
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
