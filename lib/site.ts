export const SITE = {
  name: "JC-ITC (Kicke's Studio)",
  shortName: "JC-ITC",
  // Placeholder contact address
  email: "contact@kicke.studio",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/shop", label: "Shop" },
  { href: "/#deal", label: "End-of-Year Deal" },
  { href: "/#custom", label: "Custom Inquiry" },
];

export const PLATFORMS = ["WooCommerce / WordPress", "Shopify", "Custom / Web App", "Starting from Scratch", "Other"];

export const SCOPES = ["Ready-Made Tool Access", "Tool + Custom Adaptation", "Full Custom Build – $0 Upfront Deal"];

export const DEAL_TEXT =
  "We build your first working proposal upfront at $0 cost. Test the live preview, and you only pay if you decide to move forward.";

/** Shared Tailwind class strings (Crimson, Ruby & Dark Carbon theme). */
export const ui = {
  card:
    "relative rounded-2xl border border-white/15 bg-zinc-900/90 shadow-2xl shadow-black/50 transition duration-300 hover:-translate-y-1 hover:border-rose-500/60 hover:shadow-red-950/40 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-rose-400/50 before:to-transparent",
  input:
    "w-full rounded-lg border border-white/20 bg-zinc-950/80 px-3 py-2.5 text-sm text-white placeholder:text-zinc-400 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/50 transition hover:from-red-500 hover:to-rose-500 disabled:opacity-60",
  btnSecondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-rose-500/50 hover:bg-white/10",
};
