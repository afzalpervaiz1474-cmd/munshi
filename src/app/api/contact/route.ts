import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

// Simple in-memory rate limiter (per instance). Use Upstash/Redis for multi-region production.
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const h = hits.get(ip);
    if (h && h.reset > now) {
      if (h.count >= LIMIT) return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
      h.count++;
    } else hits.set(ip, { count: 1, reset: now + WINDOW });

    const body = await req.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Please check the form fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const { name, email, subject, message, company, startedAt } = parsed.data;

    // Spam traps: filled honeypot or submitted impossibly fast → pretend success silently.
    if (company || now - startedAt < 2500) return NextResponse.json({ ok: true });

    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (key && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
        }),
      });
      if (!res.ok) {
        console.error("[contact] delivery failed", res.status);
        return NextResponse.json({ ok: false, error: "Message could not be delivered right now. Please try again later." }, { status: 502 });
      }
    } else {
      console.info("[contact] received (no mail provider configured)", { name, email, subject, length: message.length });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
