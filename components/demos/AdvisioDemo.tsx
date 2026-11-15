"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Check, Globe, PhoneCall, Send, Trash2, User } from "lucide-react";

const STAGES = ["Homepage", "Footer", "Menus", "Subpages", "Products"];
const FEED = [
  "Read homepage — Demo Store: handmade home goods",
  "Read footer — contact details & policy links",
  "Mapped menus — Shop, About, Shipping, Returns",
  "Read 14 subpages — shipping, returns, FAQ",
  "Indexed 38 products with prices and descriptions",
];

const siteFacts = [
  { keys: ["return", "refund", "exchange"], text: "You can return items within 30 days of delivery in their original condition.", source: "Website · Subpages" },
  { keys: ["ship", "delivery", "deliver"], text: "Standard shipping takes 3–5 business days. Free shipping on orders over $75.", source: "Website · Subpages" },
  { keys: ["open", "hours", "contact", "phone", "email"], text: "Our support team is available Monday–Friday, 9:00–17:00 at support@demostore.com.", source: "Website · Footer" },
  { keys: ["price", "cost", "how much", "product"], text: "Our ceramic mugs start at $18 and our linen cushions at $34. See the Shop page for the full range.", source: "Website · Products" },
];

const SAMPLE_QUESTIONS = ["What is your return policy?", "How long does shipping take?", "Do you offer bulk discounts?"];

type Msg = { from: "bot" | "user"; text: string; source?: string };
type Entry = { id: number; title: string; content: string };

export default function AdvisioDemo() {
  const [tab, setTab] = useState<"widget" | "setup">("setup");
  const [progress, setProgress] = useState(0);
  const [crawling, setCrawling] = useState(false);
  const [manual, setManual] = useState<Entry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi! Welcome to our customer service. How can I help you today?" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const idRef = useRef(1);
  const bodyRef = useRef<HTMLDivElement>(null);

  const indexed = progress >= 100;
  const stage = Math.min(STAGES.length, Math.floor(progress / 20) + (progress >= 100 ? 0 : 1));

  useEffect(() => {
    if (!crawling) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setCrawling(false);
          return 100;
        }
        return p + 4;
      });
    }, 160);
    return () => clearInterval(t);
  }, [crawling]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, typing]);

  function answer(q: string): Msg {
    const lower = q.toLowerCase();
    const m = manual.find((e) => (e.title + " " + e.content).toLowerCase().split(/\W+/).some((w) => w.length > 3 && lower.includes(w)));
    if (m) return { from: "bot", text: m.content, source: `Manual knowledge · ${m.title}` };
    if (!indexed) return { from: "bot", text: "I haven't read your website yet. Open Setup and run Full Indexing, or add a manual knowledge entry.", source: "No knowledge yet" };
    const f = siteFacts.find((x) => x.keys.some((k) => lower.includes(k)));
    if (f) return { from: "bot", text: f.text, source: f.source };
    return { from: "bot", text: "I couldn't find that on the website. Would you like our team to call you back?", source: "No match — hand-off offered" };
  }

  function send(text: string) {
    const q = text.trim();
    if (!q || typing) return;
    setStarted(true);
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, answer(q)]);
      setTyping(false);
    }, 700);
  }

  function addEntry() {
    if (!title.trim() || !content.trim()) return;
    setManual((m) => [...m, { id: idRef.current++, title: title.trim(), content: content.trim() }]);
    setTitle("");
    setContent("");
  }

  const tabBtn = (a: boolean) =>
    `flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
      a ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-950/50" : "text-zinc-200 hover:bg-white/10"
    }`;
  const input_ = "w-full rounded-md border border-white/20 bg-zinc-950 px-2.5 py-2 text-sm text-white placeholder:text-zinc-400 outline-none focus:border-rose-500";

  return (
    <div className="rounded-xl border border-white/15 bg-zinc-950 p-4 sm:p-5">
      <div className="flex gap-1 rounded-lg border border-white/15 bg-zinc-900 p-1">
        <button onClick={() => setTab("setup")} className={tabBtn(tab === "setup")}>
          1. Setup &amp; Knowledge Base
        </button>
        <button onClick={() => setTab("widget")} className={tabBtn(tab === "widget")}>
          2. Chat widget
        </button>
      </div>

      {tab === "setup" ? (
        <div className="mt-4 space-y-4">
          <section className="rounded-lg border border-white/15 bg-zinc-900 p-4">
            <h4 className="font-semibold text-white">5-Stage Website Crawler</h4>
            <button
              onClick={() => {
                setProgress(0);
                setCrawling(true);
              }}
              disabled={crawling}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-950/50 hover:from-red-500 hover:to-rose-500 disabled:opacity-60"
            >
              <Globe size={15} /> {crawling ? "Indexing…" : indexed ? "Re-run Full Indexing" : "Full Indexing"}
            </button>

            <ol className="mt-4 grid grid-cols-5 gap-1.5">
              {STAGES.map((s, i) => {
                const done = progress >= (i + 1) * 20;
                const current = !done && crawling && i + 1 === stage;
                return (
                  <li key={s} className={`rounded-md border px-1 py-2 text-center text-xs font-semibold ${done ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200" : current ? "border-rose-400 bg-rose-500/20 text-white" : "border-white/15 text-zinc-300"}`}>
                    <span className="block text-sm">{done ? "✓" : i + 1}</span>
                    {s}
                  </li>
                );
              })}
            </ol>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1.5 text-sm text-zinc-200">
              {progress}% — {crawling ? `Reading: ${STAGES[Math.min(stage, 5) - 1]}` : indexed ? "Indexing complete" : "Waiting to start…"}
            </p>
            {progress > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-zinc-200">
                {FEED.slice(0, Math.floor(progress / 20)).map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check size={14} className="mt-1 shrink-0 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-lg border border-white/15 bg-zinc-900 p-4">
            <h4 className="font-semibold text-white">Manual Knowledge ({manual.length})</h4>
            <p className="mt-1 text-sm text-zinc-200">Your own answers and rules. They take priority over website content and are never deleted by a re-crawl.</p>
            <div className="mt-3 space-y-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title, e.g. Bulk discounts" className={input_} />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={2} placeholder="Answer, e.g. Orders of 10+ get 15% off — ask for a quote." className={input_} />
              <button onClick={addEntry} className="rounded-md bg-gradient-to-r from-red-600 to-rose-600 px-3 py-2 text-sm font-semibold text-white hover:from-red-500 hover:to-rose-500">
                Save entry
              </button>
            </div>
            {manual.length > 0 && (
              <ul className="mt-3 space-y-2">
                {manual.map((e) => (
                  <li key={e.id} className="flex items-start justify-between gap-2 rounded-md border border-white/15 bg-zinc-950 p-3 text-sm">
                    <div>
                      <p className="font-semibold text-white">{e.title}</p>
                      <p className="text-zinc-200">{e.content}</p>
                    </div>
                    <button onClick={() => setManual((m) => m.filter((x) => x.id !== e.id))} aria-label="Delete entry" className="rounded p-1 text-zinc-300 hover:bg-white/10 hover:text-white">
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <div className="mt-4">
          <p className="mb-2 text-xs text-zinc-300">
            Knowledge: {indexed ? "website indexed" : "website not indexed yet"} · {manual.length} manual entr{manual.length === 1 ? "y" : "ies"}
          </p>
          <div className="overflow-hidden rounded-xl border border-white/15 bg-zinc-900">
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3 text-white">
              <Bot size={18} /> <span className="font-semibold">Demo Store Assistant</span>
              <span className="ml-auto flex items-center gap-1 text-xs"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Online</span>
            </div>
            <div ref={bodyRef} className="h-72 space-y-3 overflow-y-auto p-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
                  {m.from === "bot" && <Bot size={16} className="mt-2 shrink-0 text-rose-400" />}
                  <div className="max-w-[85%]">
                    <p className={`rounded-xl px-3 py-2 text-sm ${m.from === "user" ? "rounded-tr-sm bg-gradient-to-r from-red-600 to-rose-600 text-white" : "rounded-tl-sm border border-white/15 bg-zinc-800 text-zinc-100"}`}>{m.text}</p>
                    {m.source && <p className="mt-1 text-xs text-zinc-300">Source: {m.source}</p>}
                  </div>
                  {m.from === "user" && <User size={16} className="mt-2 shrink-0 text-zinc-300" />}
                </div>
              ))}
              {typing && <p className="text-sm italic text-zinc-300">Thinking…</p>}
              {started && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SAMPLE_QUESTIONS.map((q) => (
                    <button key={q} onClick={() => send(q)} className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-medium text-white hover:bg-rose-500/25">
                      {q}
                    </button>
                  ))}
                  <button onClick={() => setMsgs((m) => [...m, { from: "bot", text: "Thanks! Leave your number and we'll call you back." }])} className="inline-flex items-center gap-1 rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white hover:bg-white/10">
                    <PhoneCall size={12} /> Request a callback
                  </button>
                </div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-white/15 p-3"
            >
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={typing ? "Thinking..." : "Type your message..."} className={input_} />
              <button type="submit" aria-label="Send" className="rounded-md bg-gradient-to-r from-red-600 to-rose-600 px-3 text-white hover:from-red-500 hover:to-rose-500">
                <Send size={16} />
              </button>
            </form>
          </div>
          {!started && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-zinc-300">Try:</span>
              {SAMPLE_QUESTIONS.map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-medium text-white hover:border-rose-500/50 hover:bg-white/15">
                  {q}
                </button>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-zinc-300">Tip: ask about bulk discounts, add a manual entry in Setup, then ask again — your rule wins.</p>
        </div>
      )}
    </div>
  );
}
