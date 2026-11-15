"use client";

import { useState } from "react";
import { Landmark, Settings, ShoppingBag, Upload } from "lucide-react";

const ORDER_TOTAL = 2400;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Mirrors the plugin's default campaign tiers (3/6/12/24/36 months). Fee values are sample data.
const campaigns = [
  { name: "3 months interest-free", months: 3, interest: "0%", setup: "$29", monthly: "$3", max: "$5,000" },
  { name: "6 months interest-free", months: 6, interest: "0%", setup: "$29", monthly: "$3", max: "$10,000" },
  { name: "12 months interest-free", months: 12, interest: "0%", setup: "$29", monthly: "$3", max: "$10,000" },
  { name: "24 months interest-free", months: 24, interest: "0%", setup: "$29", monthly: "$3", max: "$10,000" },
  { name: "36 months interest-free", months: 36, interest: "0%", setup: "$29", monthly: "$3", max: "$10,000" },
];

export default function SplitPayDemo() {
  const [tab, setTab] = useState<"checkout" | "admin">("checkout");
  const [mode, setMode] = useState<"split" | "installments">("split");
  const [idx, setIdx] = useState(0);
  const [cfg, setCfg] = useState({
    title: "Bank Transfer & Installments",
    description: "Pay securely by installments or manual bank transfer.",
    splitOn: true,
    instOn: true,
    receiver: "Your Store Inc.",
    bank: "123-4567",
    minOrder: 500,
  });
  const [receipt, setReceipt] = useState(false);

  const activeMode = mode === "split" ? (cfg.splitOn ? "split" : "installments") : cfg.instOn ? "installments" : "split";
  const belowMin = ORDER_TOTAL < cfg.minOrder;
  const camp = campaigns[idx];

  const tabBtn = (a: boolean) =>
    `inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
      a ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-950/50" : "text-zinc-200 hover:bg-white/10"
    }`;
  const input = "w-full rounded-md border border-white/20 bg-zinc-950 px-2.5 py-2 text-sm text-white outline-none focus:border-rose-500";

  return (
    <div className="rounded-xl border border-white/15 bg-zinc-950 p-4 sm:p-5">
      <div className="flex gap-1 rounded-lg border border-white/15 bg-zinc-900 p-1">
        <button onClick={() => setTab("checkout")} className={tabBtn(tab === "checkout")}>
          <ShoppingBag size={15} /> Customer checkout
        </button>
        <button onClick={() => setTab("admin")} className={tabBtn(tab === "admin")}>
          <Settings size={15} /> Admin settings
        </button>
      </div>

      {tab === "checkout" ? (
        <div className="mt-4">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
            <span className="text-zinc-200">Order total (sample)</span>
            <span className="text-xl font-bold text-white">{usd(ORDER_TOTAL)}</span>
          </div>

          <div className="mt-4 rounded-lg border border-white/15 bg-zinc-900 p-4">
            <p className="flex items-center gap-2 font-semibold text-white">
              <Landmark size={16} className="text-rose-400" /> {cfg.title}
            </p>
            <p className="mt-1 text-sm text-zinc-200">{cfg.description}</p>

            {belowMin ? (
              <p className="mt-4 rounded-md bg-amber-500/10 p-3 text-sm text-amber-200">This method is available for orders from {usd(cfg.minOrder)}.</p>
            ) : (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {cfg.splitOn && (
                    <ModeCard selected={activeMode === "split"} onClick={() => setMode("split")} title="Split payment (50/50)" subtitle="50% when you order, 50% before delivery" />
                  )}
                  {cfg.instOn && (
                    <ModeCard selected={activeMode === "installments"} onClick={() => setMode("installments")} title="Installments" subtitle="Monthly payments via our financing partner" />
                  )}
                </div>

                {activeMode === "split" ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="text-zinc-200">Pay 50% now and the remaining 50% before delivery by bank transfer.</p>
                    <Row k="Pay now (50%)" v={usd(ORDER_TOTAL / 2)} strong />
                    <Row k="Before delivery (50%)" v={usd(ORDER_TOTAL / 2)} />
                    <div className="rounded-md border border-white/15 bg-zinc-950 p-3 text-zinc-200">
                      <p className="font-semibold text-white">Bank transfer instructions</p>
                      <p>Receiver: {cfg.receiver}</p>
                      <p>Bank account: {cfg.bank}</p>
                      <p>Reference: Order #1042</p>
                    </div>
                    <button
                      onClick={() => setReceipt(true)}
                      className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-3 py-2 font-semibold text-white hover:border-rose-500/50 hover:bg-white/10"
                    >
                      <Upload size={15} /> {receipt ? "Receipt uploaded ✓" : "Upload payment receipt"}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 text-sm">
                    <p className="mb-2 text-zinc-200">Choose a plan:</p>
                    <div className="overflow-x-auto rounded-md border border-white/15">
                      <table className="w-full min-w-[420px] text-left">
                        <thead className="bg-zinc-800 text-white">
                          <tr>
                            <th className="p-2">Plan</th>
                            <th className="p-2">Interest</th>
                            <th className="p-2">Setup fee</th>
                            <th className="p-2">Invoice fee</th>
                            <th className="p-2">Max</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaigns.map((c, i) => (
                            <tr
                              key={c.name}
                              onClick={() => setIdx(i)}
                              className={`cursor-pointer border-t border-white/10 text-zinc-100 ${i === idx ? "bg-rose-500/20 font-semibold text-white" : "hover:bg-white/5"}`}
                            >
                              <td className="p-2">{c.name}</td>
                              <td className="p-2">{c.interest}</td>
                              <td className="p-2">{c.setup}</td>
                              <td className="p-2">{c.monthly}</td>
                              <td className="p-2">{c.max}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3 rounded-md border border-rose-500/40 bg-rose-500/10 p-3 text-zinc-100">
                      <p>
                        Selected plan: <strong className="text-white">{camp.name}</strong> — Estimated monthly cost{" "}
                        <strong className="text-white">approx. {usd(Math.round(ORDER_TOTAL / camp.months))}/mo</strong>{" "}
                        <span className="text-zinc-300">
                          ({usd(ORDER_TOTAL)} / {camp.months} mo)
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-zinc-300">
                        Interest: {camp.interest} | Setup fee: {camp.setup} | Invoice fee: {camp.monthly}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <button disabled className="mt-4 w-full rounded-lg bg-emerald-600/90 py-2.5 text-sm font-semibold text-white">
            Place order (preview)
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-4 text-sm">
          <p className="text-zinc-200">WooCommerce → Settings → Payments. Change a setting and switch back to the customer checkout to see it update.</p>
          <Toggle label="Enable Split (50/50)" on={cfg.splitOn} onChange={(v) => setCfg({ ...cfg, splitOn: v })} />
          <Toggle label="Enable Installments" on={cfg.instOn} onChange={(v) => setCfg({ ...cfg, instOn: v })} />
          <Field label="Checkout title">
            <input value={cfg.title} onChange={(e) => setCfg({ ...cfg, title: e.target.value })} className={input} />
          </Field>
          <Field label="Description">
            <textarea value={cfg.description} rows={2} onChange={(e) => setCfg({ ...cfg, description: e.target.value })} className={input} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Receiver name">
              <input value={cfg.receiver} onChange={(e) => setCfg({ ...cfg, receiver: e.target.value })} className={input} />
            </Field>
            <Field label="Bank account number">
              <input value={cfg.bank} onChange={(e) => setCfg({ ...cfg, bank: e.target.value })} className={input} />
            </Field>
          </div>
          <Field label="Minimum order value (USD)">
            <input type="number" value={cfg.minOrder} onChange={(e) => setCfg({ ...cfg, minOrder: Number(e.target.value) || 0 })} className={input} />
          </Field>
          <div>
            <p className="mb-1.5 font-medium text-white">Installment campaigns</p>
            <ul className="space-y-1 rounded-md border border-white/15 bg-zinc-900 p-3 text-zinc-200">
              {campaigns.map((c) => (
                <li key={c.name} className="flex justify-between">
                  <span>{c.name}</span>
                  <span>max {c.max}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeCard({ selected, onClick, title, subtitle }: { selected: boolean; onClick: () => void; title: string; subtitle: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-lg border p-3 text-left transition ${selected ? "border-rose-500 bg-rose-500/20" : "border-white/15 bg-zinc-950 hover:bg-white/5"}`}
    >
      <span className="flex items-center gap-2 font-semibold text-white">
        <span className={`grid h-4 w-4 place-items-center rounded-full border ${selected ? "border-rose-300" : "border-zinc-400"}`}>
          {selected && <span className="h-2 w-2 rounded-full bg-rose-300" />}
        </span>
        {title}
      </span>
      <span className="mt-1 block text-sm text-zinc-200">{subtitle}</span>
    </button>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex justify-between rounded-md bg-zinc-950 px-3 py-2">
      <span className="text-zinc-200">{k}</span>
      <span className={strong ? "font-bold text-white" : "font-semibold text-zinc-100"}>{v}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-white">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-white/15 bg-zinc-900 px-3 py-2.5">
      <span className="font-medium text-white">{label}</span>
      <button role="switch" aria-checked={on} onClick={() => onChange(!on)} className={`relative h-6 w-11 rounded-full transition ${on ? "bg-rose-600" : "bg-zinc-600"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
