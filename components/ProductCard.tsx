import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PurchasePanel from "@/components/PurchasePanel";
import type { Product } from "@/lib/products";
import { ui } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className={`${ui.card} flex flex-col p-6`}>
      <p className="text-sm font-semibold text-amber-300">{product.tagline}</p>
      <h3 className="mt-1 text-xl font-semibold leading-snug text-white">{product.name}</h3>
      <p className="mt-3 text-zinc-200">{product.summary}</p>
      <ul className="mt-4 space-y-2 text-zinc-200">
        {product.benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <Check size={18} className="mt-0.5 shrink-0 text-emerald-400" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex-1" />
      <PurchasePanel slug={product.slug} />
      <Link href={`/shop/${product.slug}`} className={`${ui.btnSecondary} mt-3 w-full`}>
        See details &amp; live demo <ArrowRight size={16} />
      </Link>
    </article>
  );
}
