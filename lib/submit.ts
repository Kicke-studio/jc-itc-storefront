import { supabase } from "@/lib/supabase";

export type SaveResult = { ok: boolean; saved: "supabase" | "local" };

function triggerDiscordNotify(
  table: "order_requests" | "custom_inquiries",
  payload: Record<string, unknown>,
) {
  fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: table, ...payload }),
  }).catch(() => {
    /* ignore notification errors so they never block database save or UI confirmation */
  });
}

/**
 * Inserts a row into a Supabase table. If Supabase isn't configured yet
 * (no .env.local keys) the record is kept in localStorage so the flow still works.
 */
export async function saveRecord(
  table: "order_requests" | "custom_inquiries",
  payload: Record<string, unknown>,
): Promise<SaveResult> {
  if (supabase) {
    const { error } = await supabase.from(table).insert(payload);
    if (!error) {
      triggerDiscordNotify(table, payload);
    }
    return { ok: !error, saved: "supabase" };
  }
  try {
    const key = `jcitc_pending_${table}`;
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
    existing.push({ ...payload, created_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* ignore storage errors */
  }
  triggerDiscordNotify(table, payload);
  console.info(`[JC-ITC] Supabase not configured — saved "${table}" locally:`, payload);
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true, saved: "local" };
}
