import Link from "next/link";

const FOOTER_NAV = {
  Shop: [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Accessories", href: "/collections/accessories" },
  ],
  Help: [
    { label: "Shipping", href: "/shipping-returns" },
    { label: "Returns", href: "/shipping-returns" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sustainability", href: "/sustainability" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-section-gap border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-16">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <Link
              href="/"
              className="font-serif text-headline-md text-primary uppercase tracking-tighter hover:opacity-70 transition-opacity"
            >
              AURA STUDIO
            </Link>
            <div className="flex flex-col gap-4">
              <p className="font-label-caps text-label-caps text-primary">
                Join the Studio
              </p>
              <form className="flex border-b border-primary pb-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-none p-0 w-full font-body-md focus:ring-0 placeholder:text-on-surface-variant/50"
                />
                <button
                  type="submit"
                  className="font-label-caps text-label-caps hover:opacity-70 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(FOOTER_NAV).map(([title, links], i) => (
            <div
              key={title}
              className={`md:col-span-2 flex flex-col gap-4 ${
                i === 0 ? "md:col-start-7" : ""
              }`}
            >
              <h4 className="font-label-caps text-label-caps text-primary">
                {title}
              </h4>
              <nav className="flex flex-col gap-2 font-body-md text-on-surface-variant">
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

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-label-caps text-[10px] text-on-surface-variant">
            &copy; 2024 AURA STUDIO. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
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
