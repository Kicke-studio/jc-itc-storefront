import { MessageSquareText, Rocket, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquareText,
    title: "Tell Us What You Need",
    text: "Share your business problem or idea in plain English.",
  },
  {
    icon: Rocket,
    title: "Test Your Live Working Proposal ($0 Upfront)",
    text: "We build a working version on our preview server before you pay a cent.",
  },
  {
    icon: ThumbsUp,
    title: "Move Forward or Walk Away",
    text: "Pay only if you decide to move forward with the solution.",
  },
];

export default function ProcessStrip() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl border border-white/15 bg-zinc-900/90 p-5 shadow-xl shadow-black/40">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-base font-bold text-zinc-950">
              {i + 1}
            </span>
            <s.icon size={22} className="text-rose-400" />
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{s.title}</h3>
          <p className="mt-1 text-zinc-200">{s.text}</p>
          {i < steps.length - 1 && (
            <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-zinc-950 text-zinc-200 md:grid">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
