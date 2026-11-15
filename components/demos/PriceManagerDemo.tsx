"use client";

import { useState } from "react";
import { Check, Database, Folder, FolderOpen, Search, X } from "lucide-react";

type PFolder = { id: string; name: string; pct: number };
type Table = { id: string; alias: string; folder: string; matrix: number[][] };

// Matrix: row 0 / column 0 are header axes (sizes) and are never modified, as in the real plugin.
const initialFolders: PFolder[] = [
  { id: "f1", name: "Premium Range", pct: 15 },
  { id: "f2", name: "Summer Sale", pct: -10 },
];
const initialTables: Table[] = [
  { id: "lookup-1042", alias: "Roller blinds", folder: "f1", matrix: [[0, 50, 100, 150], [50, 24, 38, 52], [100, 36, 55, 74], [150, 48, 72, 96]] },
  { id: "lookup-1077", alias: "Curtains", folder: "f2", matrix: [[0, 50, 100, 150], [50, 30, 44, 60], [100, 42, 62, 84], [150, 55, 80, 108]] },
  { id: "lookup-1103", alias: "", folder: "original", matrix: [[0, 50, 100, 150], [50, 18, 28, 40], [100, 27, 41, 58], [150, 36, 54, 76]] },
];

export default function PriceManagerDemo() {
  const [folders, setFolders] = useState<PFolder[]>(initialFolders);
  const [tables, setTables] = useState(initialTables);
  const [rounding, setRounding] = useState<"round" | "none">("round");
  const [active, setActive] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [inspect, setInspect] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");

  const pctOf = (folderId: string) => folders.find((f) => f.id === folderId)?.pct ?? 0;
  const adjust = (v: number, pct: number) => {
    const n = v * (1 + pct / 100);
    return rounding === "round" ? Math.round(n) : Math.round(n * 100) / 100;
  };

  const visible = tables.filter(
    (t) =>
      (active === "all" || t.folder === active) &&
      (t.id + t.alias).toLowerCase().includes(search.toLowerCase()),
  );
  const withMods = tables.filter((t) => pctOf(t.folder) !== 0).length;
  const inspected = tables.find((t) => t.id === inspect);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 1800);
  };
  const saveFolder = (f: PFolder) => {
    const n = Number(draft[f.id]);
    if (!Number.isFinite(n)) return;
    setFolders((fs) => fs.map((x) => (x.id === f.id ? { ...x, pct: n } : x)));
    setDraft((d) => {
      const { [f.id]: _removed, ...rest } = d;
      void _removed;
      return rest;
    });
    flash(`Saved ${f.name}: ${n > 0 ? "+" : ""}${n}%`);
  };

  const nav = (id: string, label: string, pct?: string) => (
    <button
      key={id}
      onClick={() => setActive(id)}
      className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium transition ${
        active === id ? "bg-rose-500/20 text-white" : "text-zinc-200 hover:bg-white/10"
      }`}
    >
      <span className="flex items-center gap-2">
        {active === id ? <FolderOpen size={15} className="text-rose-400" /> : <Folder size={15} />} {label}
      </span>
      {pct && <span className="text-xs font-bold text-amber-300">{pct}</span>}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-white/15 bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3">
        <h4 className="text-base font-bold text-white">Pricing manager for lookuptables</h4>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {[
          ["Total Lookup Blocks", String(tables.length)],
          ["Pricing Folders", String(folders.length)],
          ["Blocks with Modifiers", String(withMods)],
          ["Database Status", "Connected"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/15 bg-zinc-900 p-3">
            <p className="flex items-center gap-1 text-lg font-bold text-white">
              {k === "Database Status" && <Database size={14} className="text-emerald-400" />}
              {v}
            </p>
            <p className="text-xs text-zinc-300">{k}</p>
          </div>
        ))}
      </div>

      <div className="mx-3 mb-3 flex flex-wrap items-center gap-3 rounded-lg border border-white/15 bg-zinc-900 p-3 text-sm">
        <span className="font-semibold text-white">Global Settings · Rounding Mode</span>
        <select value={rounding} onChange={(e) => setRounding(e.target.value as "round" | "none")} className="rounded-md border border-white/20 bg-zinc-950 px-2 py-1.5 text-white">
          <option value="round">Standard Rounding</option>
          <option value="none">No Rounding</option>
        </select>
      </div>

      <div className="grid gap-3 p-3 pt-0 md:grid-cols-[210px_1fr]">
        <aside className="space-y-1 rounded-lg border border-white/15 bg-zinc-900 p-2">
          {nav("all", "All Tables")}
          {nav("original", "Original (0%)", "0%")}
          <p className="px-2.5 pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">Folders</p>
          {folders.map((f) => nav(f.id, f.name, `${f.pct > 0 ? "+" : ""}${f.pct}%`))}
        </aside>

        <div className="space-y-3">
          {folders.some((f) => f.id === active) && (
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/15 bg-zinc-900 p-3 text-sm">
              {(() => {
                const f = folders.find((x) => x.id === active)!;
                return (
                  <>
                    <span className="font-semibold text-white">Edit folder: {f.name}</span>
                    <label className="ml-auto flex items-center gap-2 text-zinc-200">
                      Price modifier %
                      <input
                        type="number"
                        step="0.5"
                        value={draft[f.id] ?? String(f.pct)}
                        onChange={(e) => setDraft({ ...draft, [f.id]: e.target.value })}
                        className="w-20 rounded-md border border-white/20 bg-zinc-950 px-2 py-1.5 text-white"
                      />
                    </label>
                    <button onClick={() => saveFolder(f)} className="rounded-md bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1.5 font-semibold text-white hover:from-red-500 hover:to-rose-500">
                      Save Folder
                    </button>
                  </>
                );
              })()}
            </div>
          )}

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blocks by ID or alias..."
              className="w-full rounded-lg border border-white/20 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-400 outline-none focus:border-rose-500"
            />
          </div>

          <ul className="space-y-2">
            {visible.length === 0 && <li className="rounded-lg border border-white/15 bg-zinc-900 p-4 text-sm text-zinc-200">No lookup tables found matching your search.</li>}
            {visible.map((t) => {
              const pct = pctOf(t.folder);
              return (
                <li key={t.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-white/15 bg-zinc-900 p-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{t.alias || "No alias"}</p>
                    <p className="font-mono text-xs text-zinc-300">{t.id}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${pct === 0 ? "bg-zinc-700 text-zinc-100" : "bg-rose-500/20 text-rose-200"}`}>
                    {pct > 0 ? "+" : ""}
                    {pct}%
                  </span>
                  <select
                    value={t.folder}
                    onChange={(e) => setTables((ts) => ts.map((x) => (x.id === t.id ? { ...x, folder: e.target.value } : x)))}
                    aria-label={`Move ${t.id}`}
                    className="rounded-md border border-white/20 bg-zinc-950 px-2 py-1.5 text-white"
                  >
                    <option value="original">Move: Original (0%)</option>
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        Move: {f.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => setInspect(t.id)} className="rounded-md border border-white/25 bg-white/5 px-3 py-1.5 font-semibold text-white hover:border-rose-500/50 hover:bg-white/10">
                    Inspect
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-zinc-300">Tip: move a table to another folder, change a folder&apos;s modifier, then press Inspect to compare prices.</p>
        </div>
      </div>

      {toast && (
        <p className="mx-3 mb-3 flex items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-200">
          <Check size={15} /> {toast}
        </p>
      )}

      {inspected && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4" onClick={() => setInspect(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl border border-white/15 bg-zinc-900 p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Matrix Inspector</h3>
                <p className="text-sm text-zinc-200">
                  {inspected.alias || inspected.id} · modifier {pctOf(inspected.folder) > 0 ? "+" : ""}
                  {pctOf(inspected.folder)}%
                </p>
              </div>
              <button onClick={() => setInspect(null)} aria-label="Close" className="rounded-md p-1.5 text-zinc-200 hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <MatrixView title="Original" matrix={inspected.matrix} />
              <MatrixView title="Adjusted" matrix={inspected.matrix} map={(v) => adjust(v, pctOf(inspected.folder))} highlight />
            </div>
            <p className="mt-4 rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-200">
              Final Price = Base Lookup Price × (1 + price_modifier_percent / 100)
            </p>
            <button onClick={() => setInspect(null)} className="mt-4 rounded-lg border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-rose-500/50 hover:bg-white/10">
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatrixView({ title, matrix, map, highlight }: { title: string; matrix: number[][]; map?: (v: number) => number; highlight?: boolean }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-white">{title}</p>
      <table className="w-full border-collapse text-sm">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((v, j) => {
                const header = i === 0 || j === 0;
                if (i === 0 && j === 0) return <td key={j} className="border border-white/15 bg-zinc-800 p-2" />;
                return (
                  <td key={j} className={`border border-white/15 p-2 ${header ? "bg-zinc-800 font-semibold text-white" : highlight ? "bg-rose-500/15 font-semibold text-white" : "bg-zinc-950 text-zinc-100"}`}>
                    {header ? `${v}cm` : `$${map ? map(v) : v}`}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
