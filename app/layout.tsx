import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import { InquiryProvider } from "@/components/InquiryProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JC-ITC (Kicke's Studio) — Websites, store tools and AI that save you time",
  description:
    "Custom websites, WooCommerce tools and AI assistants for growing businesses. This year: we build your working proposal first — $0 upfront — test the live preview and only pay if you move forward.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col text-zinc-200">
        <CartProvider>
          <InquiryProvider>
            <Background3D />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </InquiryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
