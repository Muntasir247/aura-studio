"use client";

import { usePathname } from "next/navigation";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AccountTabs } from "@/components/account/AccountTabs";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Mobile tabs */}
        <AccountTabs pathname={pathname} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden md:block md:col-span-3">
            <AccountSidebar pathname={pathname} />
          </aside>

          {/* Main content */}
          <main className="md:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
