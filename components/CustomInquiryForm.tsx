"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/lib/services";
import { PLATFORMS, SCOPES, ui } from "@/lib/site";
import { saveRecord } from "@/lib/submit";

export default function CustomInquiryForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [savedTo, setSavedTo] = useState<"supabase" | "local">("local");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    const res = await saveRecord("custom_inquiries", {
      name: String(f.get("name") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      company_or_website: String(f.get("company") ?? "").trim() || null,
      service_interest: String(f.get("service") ?? ""),
      platform: String(f.get("platform") ?? ""),
      project_scope: String(f.get("scope") ?? ""),
      details: String(f.get("details") ?? "").trim(),
      reference_deal: true,
    });
    if (!res.ok) return setStatus("error");
    setSavedTo(res.saved);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 size={52} className="mb-4 text-emerald-400" />
        <h3 className="text-2xl font-semibold text-white">Thank you — we&apos;ve got your project!</h3>
        <p className="mt-2 max-w-md text-zinc-200">
          We&apos;ll review it and reply by email. If it&apos;s a good fit for one of our monthly reference spots, we&apos;ll start on your
          first working proposal at $0 cost.
        </p>
        {savedTo === "local" && (
          <p className="mt-3 text-xs text-zinc-300">Demo mode: Supabase isn&apos;t connected yet, so this was saved in your browser only.</p>
        )}
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-medium text-white";
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name *</span>
          <input name="name" required autoComplete="name" className={ui.input} placeholder="Jane Smith" />
        </label>
        <label className="block">
          <span className={label}>Email *</span>
          <input name="email" type="email" required autoComplete="email" className={ui.input} placeholder="jane@company.com" />
        </label>
      </div>
      <label className="block">
        <span className={label}>Company / Website URL</span>
        <input name="company" className={ui.input} placeholder="https://yourbusiness.com" />
      </label>
      <label className="block">
        <span className={label}>What do you need?</span>
        <select name="service" className={ui.input} defaultValue={defaultService ?? services[0].title}>
          {services.map((s) => (
            <option key={s.slug} className="bg-zinc-900">
              {s.title}
            </option>
          ))}
          <option className="bg-zinc-900">Something else</option>
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
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
          <select name="scope" required defaultValue={SCOPES[2]} className={ui.input}>
            {SCOPES.map((s) => (
              <option key={s} className="bg-zinc-900">
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className={label}>Describe your project *</span>
        <textarea name="details" required rows={4} className={ui.input} placeholder="What should it do, and what problem should it solve for your business?" />
      </label>
      {status === "error" && <p className="text-sm text-amber-300">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === "sending"} className={`${ui.btnPrimary} w-full py-3`}>
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        {status === "sending" ? "Sending…" : "Request My $0 Proposal"}
      </button>
      <p className="text-center text-sm text-zinc-300">No payment now. You only pay if you decide to move forward.</p>
    </form>
  );
}
