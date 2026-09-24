"use client";
import { useReducedMotion } from "framer-motion";
import { coreStack } from "@/data/skills";

/** TechOrbit: 2D CSS orbit of the core stack. Lightweight (no WebGL); static for reduced motion. */
export function TechOrbit({ items = coreStack }: { items?: string[] }) {
  const reduce = useReducedMotion();
  const inner = items.slice(0, 4);
  const outer = items.slice(4);
  const ring = (list: string[], radius: number, duration: number, reverse = false) => (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-line/10"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, animation: reduce ? undefined : `spinSlow ${duration}s linear infinite ${reverse ? "reverse" : ""}` }}
    >
      {list.map((label, i) => {
        const angle = (i / list.length) * Math.PI * 2;
        return (
          <span
            key={label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)` }}
          >
            <span
              className="glass block whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] text-fg shadow-lg"
              style={{ animation: reduce ? undefined : `spinSlow ${duration}s linear infinite ${reverse ? "" : "reverse"}` }}
            >
              {label}
            </span>
          </span>
        );
      })}
    </div>
  );
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px] scale-[0.8] sm:scale-100" role="img" aria-label={`Core stack: ${items.join(", ")}`}>
      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-gradient-to-br from-cyan/25 to-violet/25 ring-1 ring-line/15 shadow-[0_0_60px_-10px_rgb(var(--cyan)/0.5)]">
        <span className="font-display text-sm font-semibold">MERN+</span>
      </div>
      {ring(inner, 105, 50)}
      {ring(outer, 180, 70, true)}
    </div>
  );
}
