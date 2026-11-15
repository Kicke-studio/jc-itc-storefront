# JC-ITC (Kicke's Studio) – Basecamp

Storefront for 3 priced ready-made tools plus 6 service pillars. 100% English. Will grow with Supabase tables, payments/invoicing and automation dashboards.

## Tech stack
- Next.js 16 (App Router) + TypeScript, React 19, Tailwind CSS v4, `lucide-react`
- Supabase (`@supabase/supabase-js`) – `lib/supabase.ts` (client is `null` if env vars missing)
- `npm run dev` (http://localhost:3000), `npm run build`, `npm run lint`

## Structure
```
app/layout.tsx                 Providers (Cart, Inquiry), 3D circuit background, sticky Navbar, Footer, CartDrawer
app/page.tsx                   Home: hero, 3-step strip, 3x2 services grid, deal section, shop preview, inquiry form
app/services/[slug]/page.tsx   6 service subpages (overview, examples, 3-step deal strip, Under the Hood, CTA)
app/shop/page.tsx              Product grid (prices, launch discount, customization toggle)
app/shop/[slug]/page.tsx       Product page + authentic interactive demo
components/                    Navbar, Footer, Background3D (SVG circuits + pulses), ProcessStrip, CartProvider,
                               CartDrawer, InquiryProvider (modal), RequestProposalButton, PurchasePanel,
                               ProductCard, CustomInquiryForm, TechDetails, demos/*
lib/                           site.ts (brand, nav, PLATFORMS/SCOPES, DEAL_TEXT, ui classes), services.ts, products.ts,
                               submit.ts (saveRecord with local fallback), supabase.ts
supabase/schema.sql            catalog_items, order_requests, custom_inquiries (+RLS, additive migrations, seed)
```

## Color System (Crimson, Ruby & Dark Carbon)
- **No purple/indigo/blue-slate:** Never use `indigo-*`, `violet-*`, `purple-*`, or `slate-*` classes.
- **Base Surfaces (Dark Carbon & Obsidian):**
  - Main background: `#08080a` / `bg-zinc-950` with deep wine/crimson radial depth underlays (`from-red-950/30 via-zinc-950 to-zinc-950`).
  - Elevated cards & modals: `bg-zinc-900/90` and `bg-zinc-950` with crisp `border-white/15` resting borders.
- **Primary Red-Toned Accents (Crimson & Ruby):**
  - Primary CTA buttons & active states: `bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-950/50`.
  - Card hover states: `hover:-translate-y-1 hover:border-rose-500/60 hover:shadow-red-950/40` with subtle top-edge rose specular highlight.
- **Secondary Harmonizing Accents (Warm Ember / Copper & Crisp Metallic):**
  - Badges, step indicators & taglines: warm ember/copper (`amber-300` / `amber-400` / `orange-500`).
  - Secondary UI controls: clean metallic zinc (`zinc-300` / `zinc-400`).
  - Typography: pure white (`text-white`) for headings, bright neutral (`text-zinc-200`) for body copy.
- **3D Circuit & Automation Background (`components/Background3D.tsx`):**
  - Perspective floor/ceiling grids & SVG circuit traces: `rgba(225, 29, 72, 0.14)` (dark crimson) and `rgba(255, 255, 255, 0.05)` (warm graphite).
  - Glowing nodes & moving data pulses: crimson (`#e11d48`), ruby (`#dc2626`), and warm ember (`#f97316` / `#f59e0b`).

## Brand & copy rules
- Brand: **JC-ITC (Kicke's Studio)**. Contact email in `lib/site.ts` is a placeholder (`contact@kicke.studio`).
- Plain-English first; technical specs live in "Technical Details" / "Under the Hood" sections. No rush/48h/72h badges.
- Prices appear only on the 3 shop products (launch prices below). Demo figures are sample data.
- **End-of-Year Reference Deal applies to ALL 6 services.** Always use this wording (`DEAL_TEXT`): *"We build your first working proposal upfront at $0 cost. Test the live preview, and you only pay if you decide to move forward."* Never say "only pay if you love it". Limited monthly reference spots.
- 3-step strip (`ProcessStrip`): Tell Us What You Need → Test Your Live Working Proposal ($0 Upfront) → Move Forward or Walk Away.

## 6 services (`lib/services.ts`, `/services/[slug]`)
1. WordPress & WooCommerce Plugins – `wordpress-plugins`
2. Business Automation & AI – `automation-ai`
3. Custom Web & E-Commerce Builds – `custom-web`
4. Custom Web, Mobile & Internal Apps – `custom-apps`
5. Speed, Checkout & Store Optimization – `store-optimization`
6. System Integrations & Custom Dashboards – `integrations-dashboards`

Homepage cards: "Request Proposal" (opens inquiry modal with the service preselected) + "Read More".

## 3 products (`lib/products.ts`, `/shop/[slug]`)
| Slug | Product | Price | List |
|---|---|---|---|
| `split-pay` | Flexible Split & Manual Payment for WooCommerce | $79 | $99 |
| `wapf-price-manager` | WAPF Price Manager for WooCommerce | $59 | $75 |
| `advisio-ai` | Advisio AI Website Chat | $119 | $149 |

All show a "20% Launch Discount". Every card/page has the checkbox *"Need this customized or installed for your specific store? (+ Free Custom Proposal Included)"*; the flag is saved with the cart item (`customize`) and sent in `order_requests.items[].customization_requested` plus `has_customization_request`.

## Source reference (READ-ONLY – never modify, create or delete anything here)
- Advisio AI: `C:\Users\kicke\Desktop\Antigravity Projects\The new folder\Advisio AI\2`
- WAPF Price Manager: `C:\Users\kicke\Desktop\Antigravity Projects\The new folder\Price manager\wapf-lookup-pricing-manager`
- Split Pay: `C:\Users\kicke\Desktop\Antigravity Projects\The new folder\Woo-SplitPay-50-50-manual\Woo-SplitPay-50-50-manual`

## Cart / Request-Access flow
- `CartProvider` stores `{slug, customize}` in `localStorage` (`jcitc_cart_v2`) via `useSyncExternalStore`.
- Navbar cart -> slide-over `CartDrawer`: cart (prices, per-item customization checkbox, listed total) -> checkout (name, email, company/URL, **platform**, **project scope**, notes) -> confirmation. No payment gateway.
- Forms (`CustomInquiryForm` also in the global modal, and cart checkout) both require **Current Platform / Setup** (`PLATFORMS`) and **Project Scope** (`SCOPES`).
- `saveRecord()` inserts into Supabase `order_requests` / `custom_inquiries`; without env keys it falls back to `localStorage` (`jcitc_pending_<table>`).

## Database setup
1. Copy `.env.local.example` to `.env.local`; set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Run `supabase/schema.sql` (re-runnable). RLS: anon can INSERT into `order_requests` and `custom_inquiries` only.
