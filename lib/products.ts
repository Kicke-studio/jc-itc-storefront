export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  price: number;
  listPrice: number;
  benefits: string[];
  features: string[];
  technicalSummary: string;
  technicalBadges: string[];
  demoTitle: string;
};

export const CUSTOMIZE_LABEL = "Need this customized or installed for your specific store? (+ Free Custom Proposal Included)";

export const products: Product[] = [
  {
    slug: "split-pay",
    name: "Flexible Split & Manual Payment for WooCommerce",
    tagline: "Let customers pay in parts",
    summary:
      "Let customers split their order payment 50/50 or pay over custom monthly installments with your chosen provider.",
    price: 79,
    listPrice: 99,
    benefits: [
      "Large orders feel easier to say yes to",
      "Customers choose: 50/50 split or monthly installments",
      "Works with your own bank transfer and financing partner",
    ],
    features: [
      "Two payment modes at checkout: Split (50% now, 50% before delivery) and monthly Installments",
      "Installment campaign table (e.g. 3–36 months) with interest, setup fee and monthly fee shown per plan",
      "Live \"estimated monthly cost\" summary for the selected plan",
      "Bank transfer instructions with reference number on the thank-you page and in emails",
      "Customers can upload a payment receipt; it attaches to the order automatically",
      "Admin order panel showing mode, chosen plan and receipt status",
      "Settings: titles, descriptions, minimum order value, receiver, bank details, campaigns",
    ],
    technicalSummary:
      "Native WooCommerce payment gateway supporting 50/50 deposit workflows, flexible monthly installment plans, and B2B manual invoice rules.",
    technicalBadges: ["WC_Payment_Gateway", "50/50 deposit flow", "Installment campaigns", "Order meta & emails", "Receipt upload (AJAX)", "Checkout fragments refresh"],
    demoTitle: "Interactive demo: checkout & admin settings",
  },
  {
    slug: "wapf-price-manager",
    name: "WAPF Price Manager for WooCommerce",
    tagline: "Manage lookup table prices inside WooCommerce",
    summary:
      "Edit and manage StudioWombat WAPF lookup table prices directly inside WooCommerce without touching messy CSV files.",
    price: 59,
    listPrice: 75,
    benefits: [
      "Change prices across many tables in one step",
      "Your original tables are never overwritten",
      "See before-and-after prices before customers do",
    ],
    features: [
      "Pricing folders with a percentage modifier (e.g. +15%, +5.5%, −10%, 0%)",
      "Original (0%) pool automatically collects newly imported tables",
      "Drag & drop or \"Move\" dropdown to assign each table to exactly one folder",
      "Friendly display aliases for tables (admin-only; original names untouched)",
      "Matrix Inspector: original vs. adjusted prices side by side",
      "Rounding mode setting, backup/restore of configuration as JSON",
      "100% non-destructive: adjustments are calculated at runtime; HPOS compatible",
    ],
    technicalSummary:
      "Built for StudioWombat's Advanced Product Fields (WAPF) Lookup Table Pricing. Hooks into the WAPF lookup-table filters and applies a per-folder modifier at runtime with request-level memoization.",
    technicalBadges: ["wapf/lookuptable/data", "wapf/lookuptable/get_price", "wapf/field_price", "O(1) memoization", "Double-application guard", "HPOS compatible"],
    demoTitle: "Interactive demo: the pricing dashboard",
  },
  {
    slug: "advisio-ai",
    name: "Advisio AI Website Chat",
    tagline: "A 24/7 assistant that knows your website",
    summary:
      "An AI chat assistant that reads your entire website automatically and lets you add custom manual knowledge and rules.",
    price: 119,
    listPrice: 149,
    benefits: [
      "Answers customer questions day and night",
      "Learns from your website — no copy-pasting",
      "Your own knowledge and rules always take priority",
    ],
    features: [
      "5-stage website crawler: Homepage, Footer, Menus, Subpages and Products, with live progress",
      "Manual knowledge base: add text entries or upload .txt, .csv, .md and .json files",
      "Manual entries are protected — re-crawling never deletes them",
      "Chat widget with welcome message, typing indicator and guided quick-reply chips",
      "Lead capture: callback button and a customizable dynamic form builder",
      "AI behavior controls: tone, hierarchy and constraints",
      "Widget design with live preview and a dashboard of top customer questions",
    ],
    technicalSummary:
      "WordPress plugin with a sequential site crawler, a knowledge index (RAG) backed by Gemini, manual prompt rules and an embeddable widget.",
    technicalBadges: ["Gemini API", "5-stage crawler", "Knowledge index (RAG)", "Manual knowledge storage + backup", "Lead form builder", "Chat analytics"],
    demoTitle: "Interactive demo: setup & chat widget",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const fmtUSD = (n: number) => `$${n}`;
