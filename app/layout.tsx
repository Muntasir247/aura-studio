import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { TopNavBar } from "@/components/nav/TopNavBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA STUDIO | Modern Luxury Fashion",
  description:
    "AURA STUDIO — Defining modern silhouettes. Discover curated collections of luxury fashion for men and women.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface text-on-surface font-sans antialiased overflow-x-hidden selection:bg-secondary-fixed selection:text-[#241a00]">
        <Providers>
          <TopNavBar />
          <CartDrawer />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
