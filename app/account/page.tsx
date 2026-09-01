"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getInitials } from "@/lib/utils";

const MOCK_USER = {
  firstName: "Alexandra",
  lastName: "Sterling",
  email: "alex@studioclient.com",
  phone: "+880 1878927350",
  memberSince: "January 2024",
  tier: "Obsidian",
};

const RECENT_ORDERS = [
  {
    id: "AST-M1K2-A8B3",
    date: "Aug 15, 2024",
    items: 3,
    total: 1180,
    status: "Delivered",
  },
  {
    id: "AST-J9L1-C4D7",
    date: "Jul 28, 2024",
    items: 1,
    total: 450,
    status: "Delivered",
  },
  {
    id: "AST-H5F3-E2G9",
    date: "Jun 10, 2024",
    items: 2,
    total: 635,
    status: "Delivered",
  },
];

const ACCOUNT_NAV = [
  { label: "Overview", href: "/account", icon: "person", active: true },
  { label: "Orders", href: "/account/orders", icon: "receipt_long" },
  { label: "Wishlist", href: "/wishlist", icon: "favorite" },
  { label: "Settings", href: "/account/settings", icon: "settings" },
  { label: "Shipping & Returns", href: "/shipping-returns", icon: "local_shipping" },
  { label: "Contact Us", href: "/contact", icon: "mail" },
];

export default function AccountPage() {
  const initials = getInitials(`${MOCK_USER.firstName} ${MOCK_USER.lastName}`);

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="hidden md:block md:col-span-3">
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
                {ACCOUNT_NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body-md transition-colors ${
                      item.active
                        ? "bg-surface-container-low text-primary font-medium"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="md:col-span-9">
            <h1 className="font-headline-md text-headline-md text-primary mb-8">
              My Account
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  Total Orders
                </p>
                <p className="font-headline-md text-headline-md text-primary">3</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  Member Since
                </p>
                <p className="font-body-lg text-primary">{MOCK_USER.memberSince}</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  Loyalty Tier
                </p>
                <p className="font-body-lg text-primary flex items-center gap-2">
                  {MOCK_USER.tier}
                  <span className="material-symbols-outlined text-[18px] text-ochre" style={{ fontVariationSettings: "'FILL' 1" }}>
                    diamond
                  </span>
                </p>
              </div>
            </div>

            {/* Personal Info */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Personal Information
                </h2>
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                      Name
                    </p>
                    <p className="font-body-md text-primary">
                      {MOCK_USER.firstName} {MOCK_USER.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                      Email
                    </p>
                    <p className="font-body-md text-primary">{MOCK_USER.email}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                      Phone
                    </p>
                    <p className="font-body-md text-primary">{MOCK_USER.phone}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                      Loyalty Tier
                    </p>
                    <p className="font-body-md text-primary">{MOCK_USER.tier}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Orders */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Recent Orders
                </h2>
                <Link
                  href="/account/orders"
                  className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors border-b border-outline-variant pb-1"
                >
                  View All
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {RECENT_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="font-body-md text-primary font-medium">
                        Order {order.id}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        {order.date} &middot; {order.items} item{order.items > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label-caps bg-surface-container-low border border-outline-variant/30 text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {order.status}
                      </span>
                      <span className="font-label-caps text-label-caps text-primary">
                        ${order.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
