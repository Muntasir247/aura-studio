"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="h-[calc(100vh-72px)] w-full flex flex-col md:flex-row relative">
      {/* Left side: Women */}
      <div className="flex-1 relative group cursor-pointer overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-on-primary text-center">
          <Link
            href="/collections/women"
            className="mt-auto mb-12 px-8 py-3 bg-surface-container-lowest/20 backdrop-blur-sm border border-on-primary/30 rounded-full font-button text-button text-on-primary hover:bg-on-primary hover:text-primary transition-all duration-300"
          >
            Explore Women
          </Link>
        </div>
      </div>

      {/* Right side: Men */}
      <div className="flex-1 relative group cursor-pointer overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-on-primary text-center">
          <Link
            href="/collections/men"
            className="mt-auto mb-12 px-8 py-3 bg-surface-container-lowest/20 backdrop-blur-sm border border-on-primary/30 rounded-full font-button text-button text-on-primary hover:bg-on-primary hover:text-primary transition-all duration-300"
          >
            Explore Men
          </Link>
        </div>
      </div>

      {/* Center headline overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none px-4">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          DEFINING MODERN SILHOUETTES
        </h1>
      </div>
    </section>
  );
}
