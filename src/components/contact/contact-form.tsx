"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "loading" | "success" | "error";
type Fields = "name" | "email" | "subject" | "message";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""),
      startedAt: startedAt.current || Date.now(),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      const next: Partial<Record<Fields, string>> = {};
      (["name", "email", "subject", "message"] as Fields[]).forEach((k) => { if (fe[k]?.[0]) next[k] = fe[k]![0]; });
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const field = (name: Fields, label: string, props: Record<string, unknown> = {}, textarea = false) => {
    const err = errors[name];
    const common = { id: name, name, "aria-invalid": err ? true : undefined, "aria-describedby": err ? `${name}-error` : undefined, className: "field", ...props };
    return (
      <div>
        <label htmlFor={name} className="mb-2 block text-xs font-medium text-muted">{label}</label>
        {textarea ? <textarea rows={6} {...common} className="field resize-y" /> : <input {...common} />}
        <AnimatePresence>
          {err && <motion.p id={`${name}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-rose-400">{err}</motion.p>}
        </AnimatePresence>
      </div>
    );
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-16 text-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald/15 text-emerald ring-1 ring-emerald/30"><CheckCircle2 size={28} /></span>
        <h3 className="mt-6 font-display text-2xl font-semibold">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">Thanks for reaching out — I’ll get back to you as soon as I can.</p>
        <button onClick={() => { setStatus("idle"); startedAt.current = Date.now(); }} className="mt-8 rounded-full px-5 py-2.5 text-sm glass hover:border-cyan/40">Send another message</button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name", placeholder: "Your name", maxLength: 80 })}
        {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@example.com", maxLength: 120 })}
      </div>
      {field("subject", "Subject", { placeholder: "What’s this about?", maxLength: 120 })}
      {field("message", "Message", { placeholder: "Tell me about your idea or opportunity…", maxLength: 4000 }, true)}
      {/* Honeypot — hidden from humans and assistive tech */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div id="form-status" aria-live="polite">
        {status === "error" && (
          <p className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300"><AlertCircle size={16} /> {serverError}</p>
        )}
      </div>
      <button type="submit" disabled={status === "loading"} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-6 text-sm font-medium text-[#05070a] shadow-[0_10px_40px_-12px_rgb(var(--cyan)/0.6)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
        {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send message <Send size={15} className="transition-transform group-hover:translate-x-0.5" /></>}
      </button>
    </form>
  );
}
