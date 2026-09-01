"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeBar } from "@/components/home/MarqueeBar";
import { NewArrivals } from "@/components/home/NewArrivals";
import { EditorialSection } from "@/components/home/EditorialSection";

export default function Home() {
  return (
    <main className="pt-[72px]">
      <HeroSection />
      <MarqueeBar />
      <NewArrivals />
      <EditorialSection />
    </main>
  );
}
