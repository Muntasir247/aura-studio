"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useDrawer } from "@/hooks/useDrawer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const CATEGORY_LINKS = [
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
];

export function TopNavBar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { open } = useDrawer();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="bg-surface/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-outline-variant/30 shadow-sm transition-transform duration-300">
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
          <nav className="hidden md:flex gap-6 font-label-caps text-label-caps items-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-200 py-1 ${
                    active
                      ? "text-primary border-b-2 border-primary font-medium"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Brand logo */}
          <Link
            href="/"
            className="font-serif text-[22px] md:text-[24px] tracking-tight text-primary uppercase hover:opacity-80 transition-opacity duration-300 font-bold"
          >
            THE VAULT
          </Link>

          {/* Trailing icons */}
          <div className="flex items-center gap-2 sm:gap-4 text-primary">
            <Link
              href="/search"
              className={`p-2 hover:opacity-70 transition-opacity duration-300 ${
                isActive("/search") ? "text-primary font-bold" : "text-primary"
              }`}
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[24px]">
                search
              </span>
            </Link>

            <Link
              href="/account"
              className="hover:opacity-70 transition-opacity duration-300 active:scale-95 p-2"
              aria-label="Account"
            >
              <span className="material-symbols-outlined text-[24px]">
                person
              </span>
            </Link>

            <Link
              href="/wishlist"
              className="relative hover:opacity-70 transition-opacity duration-300 active:scale-95 p-2"
              aria-label={`Wishlist (${mounted ? wishlistCount : 0})`}
            >
              <span className="material-symbols-outlined text-[24px]">
                favorite
              </span>
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => open("cart")}
              className="relative hover:opacity-70 transition-opacity duration-300 active:scale-95 p-2"
              aria-label={`Cart (${mounted ? itemCount : 0})`}
            >
              <span className="material-symbols-outlined text-[24px]">
                shopping_bag
              </span>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-[72px] left-0 w-full max-h-[calc(100vh-72px)] overflow-y-auto bg-surface border-b border-outline-variant/30 shadow-xl p-6 flex flex-col gap-6 font-body-md animate-in slide-in-from-top-4 duration-300">
            {/* Quick Search */}
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 bg-surface-container-low rounded-full text-on-surface-variant text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
              <span>Search collections, garments...</span>
            </Link>

            {/* Categories */}
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORY_LINKS.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-3 bg-surface-container-lowest rounded border border-outline-variant/20 font-label-caps text-xs text-primary hover:border-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Links */}
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                Navigation
              </p>
              <nav className="flex flex-col font-label-caps text-label-caps divide-y divide-outline-variant/10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 flex justify-between items-center transition-colors ${
                      isActive(link.href)
                        ? "text-primary font-bold"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward_ios
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Shortcuts */}
            <div className="pt-4 border-t border-outline-variant/20 flex justify-around text-center">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex flex-col items-center gap-1 text-xs text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[22px]">
                  person
                </span>
                <span>Account</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex flex-col items-center gap-1 text-xs text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[22px]">
                  favorite
                </span>
                <span>Wishlist {mounted && wishlistCount > 0 ? `(${wishlistCount})` : ""}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
