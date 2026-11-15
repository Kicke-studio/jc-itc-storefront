import { ChevronDown } from "lucide-react";

export default function TechDetails({
  summary,
  badges,
  open = false,
}: {
  summary: string;
  badges: string[];
  open?: boolean;
}) {
  return (
    <details open={open} className="group rounded-xl border border-white/15 bg-zinc-950/80">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-white">
        Technical Details
        <ChevronDown size={16} className="transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-white/10 px-4 pb-4 pt-3">
        <p className="text-sm text-zinc-200">{summary}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {badges.map((b) => (
            <li key={b} className="rounded-md border border-rose-500/35 bg-rose-500/10 px-2 py-1 text-xs font-medium text-rose-200">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
