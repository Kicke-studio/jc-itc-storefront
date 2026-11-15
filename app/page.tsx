import Link from "next/link";
import { ArrowRight, Gift, ShieldCheck } from "lucide-react";
import CustomInquiryForm from "@/components/CustomInquiryForm";
import ProcessStrip from "@/components/ProcessStrip";
import RequestProposalButton from "@/components/RequestProposalButton";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { DEAL_TEXT, ui } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 text-center sm:pt-28">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
          Websites, store tools and{" "}
          <span className="bg-gradient-to-r from-rose-400 via-red-400 to-amber-300 bg-clip-text text-transparent">
            AI helpers
          </span>{" "}
          that make your business easier to run
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-200">
          We build tailored solutions around how your business really works — from ready-made WooCommerce tools to fully custom
          websites and automation.
        </p>

        <Link
          href="#deal"
          className="mx-auto mt-9 block max-w-2xl rounded-2xl border border-amber-400/40 bg-zinc-900/90 p-5 text-left shadow-2xl shadow-red-950/30 transition hover:-translate-y-1 hover:border-amber-400/75"
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-300">
            <Gift size={16} /> End-of-Year Reference Deal · all 6 services
          </span>
          <span className="mt-2 block text-xl font-semibold text-white">$0 upfront until you see your first working proposal.</span>
          <span className="mt-1 block text-zinc-200">{DEAL_TEXT}</span>
        </Link>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/shop" className={`${ui.btnPrimary} px-6 py-3`}>
            Explore Ready-Made Tools <ArrowRight size={16} />
          </Link>
          <Link href="#custom" className={`${ui.btnSecondary} px-6 py-3`}>
            Start a Custom Project
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <ProcessStrip />
      </section>

      {/* 6 services */}
      <section id="solutions" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What we can do for you</h2>
        <p className="mt-3 max-w-2xl text-lg text-zinc-200">Six ways we help businesses sell more and spend less time on busywork. The Reference Deal covers every one of them.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.slug} className={`${ui.card} flex flex-col p-6`}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/35">
                <s.icon size={24} />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 flex-1 text-zinc-200">{s.plain}</p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <RequestProposalButton service={s.title} className={`${ui.btnPrimary} flex-1`} />
                <Link href={`/services/${s.slug}`} className={`${ui.btnSecondary} flex-1`}>
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Deal */}
      <section id="deal" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-zinc-900/90 p-8 shadow-2xl shadow-red-950/30 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-sm font-bold text-amber-200">
              <Gift size={14} /> End-of-Year Reference Deal
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Your first working proposal, built at $0 cost.</h2>
            <p className="mt-4 max-w-3xl text-lg text-zinc-200">{DEAL_TEXT}</p>
            <p className="mt-4 flex max-w-3xl items-start gap-2 text-zinc-200">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-300" />
              The deal applies to all six services below. We take a limited number of reference spots each month so every project gets our full attention.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium text-white hover:border-rose-500/50 hover:bg-white/10">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ProcessStrip />
            </div>
          </div>
        </div>
      </section>

      {/* Shop preview */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready-made tools</h2>
            <p className="mt-3 max-w-2xl text-lg text-zinc-200">Start using something today. Try each one in an interactive demo — launch prices are 20% off.</p>
          </div>
          <Link href="/shop" className={ui.btnSecondary}>
            Visit the full shop <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.slug} href={`/shop/${p.slug}`} className={`${ui.card} block p-6`}>
              <p className="text-sm font-semibold text-amber-300">{p.tagline}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{p.name}</h3>
              <p className="mt-2 text-zinc-200">{p.summary}</p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">${p.price}</span>
                <span className="text-zinc-400 line-through">${p.listPrice}</span>
                <span className="text-xs font-bold text-amber-300">20% off</span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-rose-300">
                Try the demo <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Custom form */}
      <section id="custom" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-16">
        <div className={`${ui.card} p-6 hover:translate-y-0 sm:p-10`}>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-300">
            <Gift size={14} /> Reference Deal · hosted preview first · $0 upfront
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Tell us what you want built</h2>
          <p className="mb-8 mt-3 text-zinc-200">
            Describe your project in plain words. If it&apos;s a good fit for one of our monthly reference spots, we&apos;ll build your first
            working proposal at $0 cost.
          </p>
          <CustomInquiryForm />
        </div>
      </section>
    </>
  );
}
