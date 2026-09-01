"use client";

import Link from "next/link";

const TABS = [
  { label: "Overview", href: "/account", icon: "person" },
  { label: "Orders", href: "/account/orders", icon: "receipt_long" },
  { label: "Wishlist", href: "/wishlist", icon: "favorite" },
  { label: "Settings", href: "/account/settings", icon: "settings" },
];

interface AccountTabsProps {
  pathname: string;
}

export function AccountTabs({ pathname }: AccountTabsProps) {
  const isActive = (href: string) => {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden mb-8 -mx-margin-mobile px-margin-mobile">
      <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-outline-variant/30">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-3 font-label-caps text-label-caps whitespace-nowrap border-b-2 transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
