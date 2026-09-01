"use client";

import Link from "next/link";
import { getInitials } from "@/lib/utils";

const MOCK_USER = {
  firstName: "Alexandra",
  lastName: "Sterling",
  email: "alex@studioclient.com",
  tier: "Obsidian",
};

const SIDEBAR_NAV = [
  { label: "Overview", href: "/account", icon: "person" },
  { label: "Orders", href: "/account/orders", icon: "receipt_long" },
  { label: "Wishlist", href: "/wishlist", icon: "favorite" },
  { label: "Settings", href: "/account/settings", icon: "settings" },
  { label: "Shipping & Returns", href: "/shipping-returns", icon: "local_shipping" },
  { label: "Contact Us", href: "/contact", icon: "mail" },
];

interface AccountSidebarProps {
  pathname: string;
}

export function AccountSidebar({ pathname }: AccountSidebarProps) {
  const initials = getInitials(`${MOCK_USER.firstName} ${MOCK_USER.lastName}`);

  const isActive = (href: string) => {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  };

  return (
    <div className="sticky top-[100px] flex flex-col gap-8">
      {/* User card */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm">
          {initials}
        </div>
        <div>
          <p className="font-body-lg text-primary font-medium">
            {MOCK_USER.firstName}
          </p>
          <p className="font-label-caps text-[10px] text-ochre">
            {MOCK_USER.tier} Member
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {SIDEBAR_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body-md transition-colors ${
                active
                  ? "bg-surface-container-low text-primary font-medium"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
