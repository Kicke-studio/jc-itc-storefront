"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/85 border-b border-white/15">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-950/60">
            <Zap size={15} />
          </span>
          <span className="text-sm sm:text-base">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium text-zinc-200 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-rose-400">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-rose-500/50 hover:bg-white/10"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            <span className="grid min-w-5 place-items-center rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-1.5 text-xs font-bold text-white">
              {count}
            </span>
          </button>
          <button
            onClick={() => setMenu((m) => !m)}
            aria-label="Toggle menu"
            className="rounded-lg border border-white/25 p-2 text-white lg:hidden"
          >
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menu && (
        <ul className="border-t border-white/15 bg-zinc-950/95 px-5 py-3 lg:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setMenu(false)} className="block py-2.5 text-sm font-medium text-zinc-100 hover:text-rose-400">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
