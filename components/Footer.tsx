import Link from "next/link";
import { Gift, Mail } from "lucide-react";
import RequestProposalButton from "@/components/RequestProposalButton";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { DEAL_TEXT, NAV_LINKS, SITE, ui } from "@/lib/site";

const head = "text-sm font-semibold uppercase tracking-wider text-white";
const link = "text-zinc-200 transition hover:text-rose-400";

export default function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/15 bg-zinc-950/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-lg font-semibold text-white">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-zinc-200">
            Practical tools, smart automation and custom websites that help growing businesses sell more and work less.
          </p>
          <Link
            href="/#deal"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/20"
          >
            <Gift size={14} /> End-of-Year Reference Deal — $0 upfront
          </Link>
          <p className="mt-3 max-w-sm text-sm text-zinc-200">{DEAL_TEXT} Applies to all six services.</p>

          <p className={`${head} mt-8`}>Direct contact</p>
          <a href={`mailto:${SITE.email}`} className="mt-3 inline-flex items-center gap-2 text-zinc-100 hover:text-rose-400">
            <Mail size={16} /> {SITE.email}
          </a>
          <div>
            <RequestProposalButton label="Send an Inquiry" className={`${ui.btnPrimary} mt-4`} />
          </div>
        </div>

        <div>
          <p className={head}>Services</p>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={head}>Shop</p>
          <ul className="mt-4 space-y-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/shop/${p.slug}`} className={link}>
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" className={link}>
                All products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className={head}>Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-zinc-300">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
