"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ShoppingCart, Trash2, Wrench, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { PLATFORMS, SCOPES, ui } from "@/lib/site";
import { saveRecord } from "@/lib/submit";

export default function CartDrawer() {
  const { drawerOpen } = useCart();
  // Mounted fresh on each open so the flow resets.
  return drawerOpen ? <DrawerContent /> : null;
}

function DrawerContent() {
  const { items, subtotal, remove, setCustomize, clear, closeCart } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [savedTo, setSavedTo] = useState<"supabase" | "local">("local");
  const [orderItems, setOrderItems] = useState<string[]>([]);

  const anyCustom = items.some((i) => i.customize);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [closeCart]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const names = items.map((i) => i.product.name);
    setSending(true);
    setError("");
    const res = await saveRecord("order_requests", {
      items: items.map((i) => ({
        slug: i.product.slug,
        name: i.product.name,
        price_usd: i.product.price,
        list_price_usd: i.product.listPrice,
        customization_requested: i.customize,
      })),
      subtotal_usd: subtotal,
      has_customization_request: anyCustom,
      platform: String(f.get("platform") ?? ""),
      project_scope: String(f.get("scope") ?? ""),
      name: String(f.get("name") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      company_or_website: String(f.get("company") ?? "").trim() || null,
      notes: String(f.get("notes") ?? "").trim() || null,
    });
    setSending(false);
    if (!res.ok) {
      setError("Something went wrong while sending your request. Please try again.");
      return;
    }
    setSavedTo(res.saved);
    setOrderItems(names);
    clear();
    setStep("done");
  }

  const label = "mb-1.5 block text-sm font-medium text-white";
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/75 backdrop-blur-sm" onClick={closeCart} role="presentation">
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col border-l border-white/15 bg-zinc-950 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/15 p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <ShoppingCart size={18} className="text-rose-400" />
            {step === "cart" ? "Your cart" : step === "checkout" ? "Request access" : "Request received"}
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="rounded-md p-1.5 text-zinc-200 hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {step === "cart" &&
            (items.length === 0 ? (
              <p className="py-12 text-center text-zinc-200">Your cart is empty. Browse the shop to add a tool.</p>
            ) : (
              <ul className="space-y-3">
                {items.map(({ product, customize }) => (
                  <li key={product.slug} className="rounded-xl border border-white/15 bg-zinc-900 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{product.name}</p>
                        <p className="mt-1 text-sm text-zinc-200">
                          <span className="font-bold text-white">${product.price}</span>{" "}
                          <span className="text-zinc-400 line-through">${product.listPrice}</span>
                        </p>
                      </div>
                      <button onClick={() => remove(product.slug)} aria-label={`Remove ${product.name}`} className="rounded-md p-1.5 text-zinc-300 hover:bg-white/10 hover:text-white">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm text-zinc-200">
                      <input type="checkbox" checked={customize} onChange={(e) => setCustomize(product.slug, e.target.checked)} className="mt-0.5 h-4 w-4 accent-rose-600" />
                      <span>Customized / installed for my store (free custom proposal included)</span>
                    </label>
                  </li>
                ))}
              </ul>
            ))}

          {step === "checkout" && (
            <form id="checkout-form" onSubmit={submit} className="space-y-4">
              <p className="text-sm text-zinc-200">No payment needed right now. Tell us who you are and we&apos;ll get in touch to set up your access.</p>
              <ul className="space-y-1 rounded-lg border border-white/15 bg-zinc-900 p-3 text-sm text-zinc-200">
                {items.map((i) => (
                  <li key={i.product.slug} className="flex items-start justify-between gap-2">
                    <span>
                      {i.product.name}
                      {i.customize && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded bg-rose-500/20 px-1.5 py-0.5 text-xs font-semibold text-rose-200">
                          <Wrench size={11} /> customization
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-white">${i.product.price}</span>
                  </li>
                ))}
              </ul>
              <label className="block">
                <span className={label}>Name *</span>
                <input name="name" required autoComplete="name" className={ui.input} placeholder="Jane Smith" />
              </label>
              <label className="block">
                <span className={label}>Email *</span>
                <input name="email" type="email" required autoComplete="email" className={ui.input} placeholder="jane@company.com" />
              </label>
              <label className="block">
                <span className={label}>Company / Website URL</span>
                <input name="company" className={ui.input} placeholder="https://yourstore.com" />
              </label>
              <label className="block">
                <span className={label}>Current platform / setup *</span>
                <select name="platform" required defaultValue="" className={ui.input}>
                  <option value="" disabled className="bg-zinc-900">
                    Select…
                  </option>
                  {PLATFORMS.map((p) => (
                    <option key={p} className="bg-zinc-900">
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={label}>Project scope *</span>
                <select name="scope" required defaultValue={anyCustom ? SCOPES[1] : SCOPES[0]} className={ui.input}>
                  {SCOPES.map((s) => (
                    <option key={s} className="bg-zinc-900">
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={label}>Notes (optional)</span>
                <textarea name="notes" rows={3} className={ui.input} placeholder="Anything we should know?" />
              </label>
              {error && <p className="text-sm text-amber-300">{error}</p>}
            </form>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 size={48} className="mb-4 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">Thank you — your request is in!</h3>
              <p className="mt-2 text-zinc-200">We&apos;ll email you shortly with the next steps for:</p>
              <ul className="mt-3 space-y-1 text-sm font-medium text-white">
                {orderItems.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
              {savedTo === "local" && (
                <p className="mt-4 text-xs text-zinc-300">Demo mode: Supabase isn&apos;t connected yet, so this request was saved in your browser only.</p>
              )}
              <button onClick={closeCart} className={`${ui.btnPrimary} mt-6`}>
                Close
              </button>
            </div>
          )}
        </div>

        {step === "cart" && items.length > 0 && (
          <div className="border-t border-white/15 p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-zinc-200">Listed total</span>
              <span className="text-xl font-bold text-white">${subtotal}</span>
            </div>
            <p className="mb-3 text-xs text-zinc-300">Nothing is charged now — you&apos;re requesting access.</p>
            <button onClick={() => setStep("checkout")} className={`${ui.btnPrimary} w-full`}>
              Proceed to Checkout / Request Access
            </button>
          </div>
        )}
        {step === "checkout" && (
          <div className="flex gap-3 border-t border-white/15 p-5">
            <button onClick={() => setStep("cart")} className={ui.btnSecondary}>
              Back
            </button>
            <button type="submit" form="checkout-form" disabled={sending} className={`${ui.btnPrimary} flex-1`}>
              {sending && <Loader2 size={16} className="animate-spin" />}
              {sending ? "Sending…" : "Complete Order (Request Access)"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
