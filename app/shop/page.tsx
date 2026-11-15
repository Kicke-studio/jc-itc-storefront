import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop — Ready-Made Tools | JC-ITC (Kicke's Studio)" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Shop</p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Ready-made tools for your online business</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-200">
        Three finished tools you can start using without a big project. Launch prices are 20% off. Try each one in its interactive demo,
        add what you like to your cart and request access — nothing is charged today.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
