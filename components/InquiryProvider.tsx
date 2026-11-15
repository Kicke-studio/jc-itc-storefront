"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { X } from "lucide-react";
import { useEffect } from "react";
import CustomInquiryForm from "@/components/CustomInquiryForm";

type Ctx = { openInquiry: (service?: string) => void };
const InquiryCtx = createContext<Ctx | null>(null);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; service?: string; nonce: number }>({ open: false, nonce: 0 });
  const openInquiry = useCallback((service?: string) => setState((s) => ({ open: true, service, nonce: s.nonce + 1 })), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <InquiryCtx.Provider value={{ openInquiry }}>
      {children}
      {state.open && <InquiryModal key={state.nonce} service={state.service} onClose={close} />}
    </InquiryCtx.Provider>
  );
}

export function useInquiry() {
  const ctx = useContext(InquiryCtx);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
}

function InquiryModal({ service, onClose }: { service?: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/15 bg-zinc-900 p-6 shadow-2xl sm:rounded-2xl sm:p-8"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="inquiry-title" className="text-2xl font-bold text-white">
              Request a proposal
            </h2>
            <p className="mt-1 text-zinc-200">Describe what you need in plain words. Our End-of-Year Reference Deal covers all six services.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-zinc-200 hover:bg-white/10">
            <X size={20} />
          </button>
        </div>
        <CustomInquiryForm defaultService={service} />
      </div>
    </div>
  );
}
