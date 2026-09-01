"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useDrawer } from "@/hooks/useDrawer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Products", href: "/collections" },
];

export function TopNavBar() {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { open } = useDrawer();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="bg-surface/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-outline-variant/30 shadow-sm transition-transform duration-300">
        <div className="flex justify-between items-center h-[72px] px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden text-primary hover:opacity-70 transition-opacity duration-300 p-2 -ml-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex gap-6 font-label-caps text-label-caps">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-70 duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Brand logo */}
          <Link
            href="/"
            className="font-serif text-[24px] md:text-[24px] tracking-tighter text-primary uppercase hover:opacity-70 transition-opacity duration-300"
          >
            THE VAULT
          </Link>

          {/* Trailing icons */}
          <div className="flex items-center gap-4 text-primary">
            <Link
              href="/account"
              className="hover:opacity-70 transition-opacity duration-300 active:scale-95 transition-transform duration-200 p-2"
              aria-label="Account"
            >
              <span className="material-symbols-outlined text-[24px]">
                person
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="relative hover:opacity-70 transition-opacity duration-300 active:scale-95 transition-transform duration-200 p-2"
              aria-label={`Wishlist (${wishlistCount})`}
            >
              <span className="material-symbols-outlined text-[24px]">
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-on-primary text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => open("cart")}
              className="relative hover:opacity-70 transition-opacity duration-300 active:scale-95 transition-transform duration-200 p-2"
              aria-label={`Cart (${itemCount})`}
            >
              <span className="material-symbols-outlined text-[24px]">
                shopping_bag
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-on-primary text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-surface/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-[72px] left-0 w-full bg-surface border-b border-outline-variant/30 shadow-lg p-6 flex flex-col gap-4 font-label-caps text-label-caps">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
