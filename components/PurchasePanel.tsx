"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { CUSTOMIZE_LABEL, getProduct } from "@/lib/products";
import { ui } from "@/lib/site";

/** Price, customization toggle and Add to Cart. Used on cards and product pages. */
export default function PurchasePanel({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const { has, customizeOf, add, setCustomize, openCart } = useCart();
  const [local, setLocal] = useState(false);
  const inCart = has(slug);
  const checked = inCart ? customizeOf(slug) : local;

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-3xl font-bold text-white">${product.price}</span>
        <span className="text-lg text-zinc-400 line-through">${product.listPrice}</span>
        <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-200">
          20% Launch Discount
        </span>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-lg border border-white/15 bg-zinc-950/80 p-3 text-sm text-zinc-100">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => (inCart ? setCustomize(slug, e.target.checked) : setLocal(e.target.checked))}
          className="mt-0.5 h-4 w-4 shrink-0 accent-rose-600"
        />
        <span>{CUSTOMIZE_LABEL}</span>
      </label>

      {inCart ? (
        <button onClick={openCart} className={`${ui.btnSecondary} mt-4 w-full`}>
          <Check size={16} className="text-emerald-400" /> In cart — view cart
        </button>
      ) : (
        <button onClick={() => add(slug, local)} className={`${ui.btnPrimary} mt-4 w-full`}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
      )}
    </div>
  );
}
