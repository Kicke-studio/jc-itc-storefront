-- JC-ITC (Kicke's Studio) schema. Run in the Supabase SQL editor.
-- Safe to re-run: uses "if not exists" and additive column migrations.

create extension if not exists "pgcrypto";

-- Catalog of ready-made products (the app currently reads lib/products.ts)
create table if not exists public.catalog_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text,
  technical_details text,
  price_usd numeric(10,2),
  list_price_usd numeric(10,2),
  category text not null default 'plugin'
    check (category in ('plugin', 'automation', 'custom')),
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.catalog_items add column if not exists price_usd numeric(10,2);
alter table public.catalog_items add column if not exists list_price_usd numeric(10,2);

-- "Request Access" orders from the cart checkout (no payment yet)
create table if not exists public.order_requests (
  id uuid primary key default gen_random_uuid(),
  -- [{ slug, name, price_usd, list_price_usd, customization_requested }]
  items jsonb not null default '[]'::jsonb,
  subtotal_usd numeric(10,2) not null default 0,
  has_customization_request boolean not null default false,
  name text not null,
  email text not null,
  company_or_website text,
  platform text,
  project_scope text,
  notes text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'access_granted', 'closed')),
  created_at timestamptz not null default now()
);
alter table public.order_requests add column if not exists subtotal_usd numeric(10,2) not null default 0;
alter table public.order_requests add column if not exists has_customization_request boolean not null default false;
alter table public.order_requests add column if not exists platform text;
alter table public.order_requests add column if not exists project_scope text;

-- Custom project requests (End-of-Year Reference Deal, all 6 services)
create table if not exists public.custom_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company_or_website text,
  service_interest text,
  platform text,            -- WooCommerce / WordPress, Shopify, Custom / Web App, Starting from Scratch, Other
  project_scope text,       -- Ready-Made Tool Access, Tool + Custom Adaptation, Full Custom Build – $0 Upfront Deal
  details text not null,
  reference_deal boolean not null default true,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'building_proposal', 'proposal_sent', 'won', 'declined')),
  created_at timestamptz not null default now()
);
alter table public.custom_inquiries add column if not exists service_interest text;
alter table public.custom_inquiries add column if not exists platform text;
alter table public.custom_inquiries add column if not exists project_scope text;

create index if not exists order_requests_created_idx on public.order_requests (created_at desc);
create index if not exists custom_inquiries_created_idx on public.custom_inquiries (created_at desc);

-- Row Level Security
alter table public.catalog_items enable row level security;
alter table public.order_requests enable row level security;
alter table public.custom_inquiries enable row level security;

drop policy if exists "Public read active catalog" on public.catalog_items;
create policy "Public read active catalog"
  on public.catalog_items for select using (is_active = true);

-- Visitors can submit, but never read other people's data
drop policy if exists "Anon insert order requests" on public.order_requests;
create policy "Anon insert order requests"
  on public.order_requests for insert to anon, authenticated with check (true);

drop policy if exists "Anon insert custom inquiries" on public.custom_inquiries;
create policy "Anon insert custom inquiries"
  on public.custom_inquiries for insert to anon, authenticated with check (true);

-- Seed (launch prices include the 20% discount)
delete from public.catalog_items where slug in ('flexible-split-payment', 'advisio-ai-chat');
insert into public.catalog_items (slug, name, summary, category, price_usd, list_price_usd, sort_order) values
  ('split-pay', 'Flexible Split & Manual Payment for WooCommerce',
   'Let customers split their order 50/50 or pay in monthly installments with your chosen provider.', 'plugin', 79, 99, 1),
  ('wapf-price-manager', 'WAPF Price Manager for WooCommerce',
   'Edit and manage StudioWombat WAPF lookup table prices inside WooCommerce, no CSV files.', 'plugin', 59, 75, 2),
  ('advisio-ai', 'Advisio AI Website Chat',
   'AI chat that reads your whole website and follows your own manual knowledge and rules.', 'automation', 119, 149, 3)
on conflict (slug) do update set
  name = excluded.name, summary = excluded.summary, category = excluded.category,
  price_usd = excluded.price_usd, list_price_usd = excluded.list_price_usd, sort_order = excluded.sort_order;
