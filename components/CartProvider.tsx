"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/lib/products";

const KEY = "jcitc_cart_v2";
const listeners = new Set<() => void>();

type Stored = { slug: string; customize: boolean };
export type CartItem = { product: Product; customize: boolean };

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}
const getSnapshot = () => localStorage.getItem(KEY) ?? "[]";
const getServerSnapshot = () => "[]";

function write(items: Stored[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  has: (slug: string) => boolean;
  customizeOf: (slug: string) => boolean;
  add: (slug: string, customize: boolean) => void;
  setCustomize: (slug: string, customize: boolean) => void;
  remove: (slug: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stored = useMemo<Stored[]>(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter((s): s is Stored => s && typeof s.slug === "string").map((s) => ({ slug: s.slug, customize: Boolean(s.customize) }))
        : [];
    } catch {
      return [];
    }
  }, [raw]);

  const items = useMemo(
    () =>
      stored
        .map((s) => ({ product: getProduct(s.slug), customize: s.customize }))
        .filter((i): i is CartItem => Boolean(i.product)),
    [stored],
  );

  const add = useCallback(
    (slug: string, customize: boolean) => {
      write([...stored.filter((s) => s.slug !== slug), { slug, customize }]);
      setDrawerOpen(true);
    },
    [stored],
  );
  const setCustomize = useCallback(
    (slug: string, customize: boolean) => write(stored.map((s) => (s.slug === slug ? { ...s, customize } : s))),
    [stored],
  );
  const remove = useCallback((slug: string) => write(stored.filter((s) => s.slug !== slug)), [stored]);
  const clear = useCallback(() => write([]), []);
  const openCart = useCallback(() => setDrawerOpen(true), []);
  const closeCart = useCallback(() => setDrawerOpen(false), []);

  const value: CartCtx = {
    items,
    count: items.length,
    subtotal: items.reduce((sum, i) => sum + i.product.price, 0),
    has: (slug) => stored.some((s) => s.slug === slug),
    customizeOf: (slug) => stored.find((s) => s.slug === slug)?.customize ?? false,
    add,
    setCustomize,
    remove,
    clear,
    drawerOpen,
    openCart,
    closeCart,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
