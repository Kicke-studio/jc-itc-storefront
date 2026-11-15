import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Wrench } from "lucide-react";
import ProcessStrip from "@/components/ProcessStrip";
import RequestProposalButton from "@/components/RequestProposalButton";
import { getProduct } from "@/lib/products";
import { getService, services } from "@/lib/services";
import { DEAL_TEXT, ui } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return { title: s ? `${s.title} | JC-ITC (Kicke's Studio)` : "Service not found", description: s?.plain };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = (service.relatedProducts ?? []).map(getProduct).filter((p) => p !== undefined);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/#solutions" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 hover:text-rose-400">
        <ArrowLeft size={16} /> All services
      </Link>

      {/* Overview */}
      <header className="mt-8 max-w-3xl">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/35">
          <service.icon size={28} />
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">{service.title}</h1>
        <p className="mt-4 text-xl text-zinc-100">{service.plain}</p>
        <p className="mt-4 text-lg text-zinc-200">{service.overview}</p>
        <div className="mt-7">
          <RequestProposalButton service={service.title} className={`${ui.btnPrimary} px-6 py-3`} />
        </div>
      </header>

      {/* Examples */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Real-world examples</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {service.examples.map((e) => (
            <div key={e.title} className={`${ui.card} p-5`}>
              <h3 className="text-lg font-semibold text-white">{e.title}</h3>
              <p className="mt-2 text-zinc-200">{e.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deal strip */}
      <section className="mt-16">
        <div className="rounded-3xl border border-amber-400/40 bg-zinc-900/90 p-6 shadow-2xl shadow-red-950/30 sm:p-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">End-of-Year Reference Deal — $0 upfront</h2>
          <p className="mb-6 mt-2 max-w-3xl text-zinc-200">{DEAL_TEXT} This applies to this service and all five others.</p>
          <ProcessStrip />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready-made tools in this area</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className={`${ui.card} block p-5`}>
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-zinc-200">{p.summary}</p>
                <p className="mt-3 flex items-center gap-2 font-semibold text-white">
                  ${p.price} <span className="font-normal text-zinc-400 line-through">${p.listPrice}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-sm text-rose-300">
                    View <ArrowRight size={14} />
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Under the hood */}
      <section className="mt-16">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
          <Wrench size={26} className="text-rose-400" /> Under the Hood / Technical Capabilities
        </h2>
        <p className="mt-2 text-zinc-200">For technical teams and curious minds — what we work with.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {service.capabilities.map((c) => (
            <div key={c.heading} className="rounded-2xl border border-white/15 bg-zinc-950/80 p-5">
              <h3 className="font-semibold text-white">{c.heading}</h3>
              <ul className="mt-3 space-y-2 text-zinc-200">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check size={16} className="mt-1 shrink-0 text-rose-400" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Want this for your business?</h2>
        <p className="mx-auto mt-2 max-w-xl text-zinc-200">Tell us what you need and we&apos;ll build your first working proposal at $0 cost.</p>
        <div className="mt-6">
          <RequestProposalButton service={service.title} className={`${ui.btnPrimary} px-8 py-3`} />
        </div>
      </section>
    </div>
  );
}
