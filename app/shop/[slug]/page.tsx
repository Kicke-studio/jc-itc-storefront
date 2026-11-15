import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import ProductDemo from "@/components/demos/ProductDemo";
import PurchasePanel from "@/components/PurchasePanel";
import TechDetails from "@/components/TechDetails";
import { getProduct, products } from "@/lib/products";
import { ui } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} | JC-ITC (Kicke's Studio)` : "Product not found", description: p?.summary };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 hover:text-rose-400">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-sm font-semibold text-amber-300">{product.tagline}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-lg text-zinc-100">{product.summary}</p>
          <ul className="mt-6 space-y-3 text-zinc-200">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-2">
                <Check size={18} className="mt-0.5 shrink-0 text-emerald-400" /> {b}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-xl font-semibold text-white">What&apos;s inside</h2>
          <ul className="mt-3 space-y-2 text-zinc-200">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check size={16} className="mt-1 shrink-0 text-rose-400" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <TechDetails summary={product.technicalSummary} badges={product.technicalBadges} />
          </div>
        </div>

        <aside className={`${ui.card} h-fit p-6 hover:translate-y-0 lg:sticky lg:top-24`}>
          <PurchasePanel slug={product.slug} />
          <p className="mt-3 text-sm text-zinc-300">Request access — nothing is charged today.</p>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white">{product.demoTitle}</h2>
        <p className="mb-5 mt-2 text-zinc-200">Based on the real plugin&apos;s screens and workflow. All numbers shown are sample data.</p>
        <ProductDemo slug={product.slug} />
      </section>
    </div>
  );
}
