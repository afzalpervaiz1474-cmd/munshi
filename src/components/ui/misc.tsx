"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeader({ eyebrow, title, description, align = "left", as = "h2" }: {
  eyebrow: string; title: ReactNode; description?: ReactNode; align?: "left" | "center"; as?: "h1" | "h2";
}) {
  const H = as;
  return (
    <Reveal className={cn("mb-10 max-w-2xl md:mb-14", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow mb-4 flex items-center gap-2 [&]:justify-start">
        <span className="h-px w-6 bg-gradient-to-r from-cyan to-violet" aria-hidden />
        {eyebrow}
      </p>
      <H className={cn("font-semibold text-fg", as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]")}>
        {title}
      </H>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}

/** Counts up once when visible. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) { setVal(to); return; }
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>;
}

const statusTone: Record<string, string> = {
  Completed: "text-emerald border-emerald/30 bg-emerald/10",
  Live: "text-emerald border-emerald/30 bg-emerald/10",
  Current: "text-cyan border-cyan/30 bg-cyan/10",
  "In Development": "text-cyan border-cyan/30 bg-cyan/10",
  Exploring: "text-violet border-violet/30 bg-violet/10",
  Researching: "text-violet border-violet/30 bg-violet/10",
  Planned: "text-violet border-violet/30 bg-violet/10",
  Upcoming: "text-subtle border-line/15 bg-line/5",
  Concept: "text-amber border-amber/30 bg-amber/10",
  Idea: "text-amber border-amber/30 bg-amber/10",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", statusTone[status] ?? statusTone.Upcoming, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current motion-safe:animate-pulseDot" aria-hidden />
      {status}
    </span>
  );
}

export function GlowOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-cyan/10 blur-[120px]" />
      <div className="absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-violet/10 blur-[140px]" />
    </div>
  );
}

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative pb-24 pt-32 md:pt-40", className)}><GlowOrbs />{children}</div>;
}
