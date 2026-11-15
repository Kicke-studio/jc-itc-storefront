import { NextResponse } from "next/server";

// Crimson #E11D48 in decimal
const CRIMSON_COLOR = 14753096;

type CartItemPayload = {
  slug?: string;
  name?: string;
  price_usd?: number;
  list_price_usd?: number;
  customization_requested?: boolean;
};

type NotifyBody = {
  type?: "order_requests" | "custom_inquiries";
  name?: string;
  email?: string;
  company_or_website?: string | null;
  platform?: string;
  project_scope?: string;
  service_interest?: string;
  details?: string | null;
  notes?: string | null;
  items?: CartItemPayload[];
  subtotal_usd?: number;
  has_customization_request?: boolean;
};

export async function POST(req: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, reason: "missing_webhook_url" });
  }

  try {
    const body = (await req.json()) as NotifyBody;
    const isOrder = body.type === "order_requests";

    const fields: { name: string; value: string; inline?: boolean }[] = [
      { name: "Name", value: body.name || "—", inline: true },
      { name: "Email", value: body.email || "—", inline: true },
      { name: "Company / Website", value: body.company_or_website || "—", inline: true },
      { name: "Platform / Setup", value: body.platform || "—", inline: true },
      { name: "Project Scope", value: body.project_scope || "—", inline: true },
    ];

    if (!isOrder && body.service_interest) {
      fields.push({ name: "Service Interest", value: body.service_interest, inline: true });
    }

    if (isOrder && Array.isArray(body.items) && body.items.length > 0) {
      const itemLines = body.items
        .map(
          (i) =>
            `• **${i.name ?? i.slug}** — $${i.price_usd ?? 0}${
              i.customization_requested ? " *(+ Custom Installation / Proposal)*" : ""
            }`,
        )
        .join("\n");
      fields.push({
        name: `Cart Items (Subtotal: $${body.subtotal_usd ?? 0})`,
        value: itemLines,
      });
    }

    const messageText = (isOrder ? body.notes : body.details)?.trim();
    if (messageText) {
      fields.push({
        name: isOrder ? "Order Notes" : "Project Details",
        value: messageText.slice(0, 1024),
      });
    }

    const embed = {
      title: isOrder
        ? "🛒 New Shop Order Request (Request Access)"
        : "🚀 New Custom Project Inquiry ($0 Upfront Deal)",
      color: CRIMSON_COLOR,
      fields,
      footer: { text: "JC-ITC (Kicke's Studio) • Storefront Notification" },
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    return NextResponse.json({ ok: res.ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
