"use client";

import Link from "next/link";

const FOOTER_NAV = {
  Shop: [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Accessories", href: "/collections/accessories" },
    { label: "Lookbook", href: "/lookbook" },
  ],
  Help: [
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Contact Us", href: "/contact" },
    { label: "About AURA", href: "/about" },
  ],
  Account: [
    { label: "Overview", href: "/account" },
    { label: "Order History", href: "/account/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Settings", href: "/account/settings" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-section-gap border-t border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link
              href="/"
              className="font-serif text-headline-md text-primary uppercase tracking-tight hover:opacity-70 transition-opacity font-bold"
            >
              AURA STUDIO
            </Link>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Quiet luxury tailored for modern authority. Designed with sustainable virgin wool, pure mulberry silk, and Grade-A Mongolian cashmere.
            </p>
            <div className="flex flex-col gap-3">
              <p className="font-label-caps text-xs text-primary font-semibold">
                Join the Studio Newsletter
              </p>
              <form className="flex border-b border-primary pb-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  id="footer-newsletter-email"
                  name="newsletterEmail"
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-none p-0 w-full font-body-md text-sm focus:ring-0 placeholder:text-on-surface-variant/50"
                  required
                />
                <button
                  type="submit"
                  className="font-label-caps text-xs text-primary hover:opacity-70 transition-opacity font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Object.entries(FOOTER_NAV).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-3">
                <h4 className="font-label-caps text-xs text-primary font-semibold">
                  {title}
                </h4>
                <nav className="flex flex-col gap-2 font-body-md text-sm text-on-surface-variant">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-label-caps text-[10px] text-on-surface-variant">
            &copy; 2026 AURA STUDIO. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6 text-primary">
            <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
              <span className="material-symbols-outlined text-[20px]">
                photo_camera
              </span>
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity" aria-label="YouTube">
              <span className="material-symbols-outlined text-[20px]">
                play_circle
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
