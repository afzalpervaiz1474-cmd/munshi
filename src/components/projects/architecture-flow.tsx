"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Animated left-to-right data flow diagram built from a project's `flow` steps. */
export function ArchitectureFlow({ steps }: { steps: string[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="card overflow-x-auto p-6" role="img" aria-label={`Data flow: ${steps.join(" to ")}`}>
      <ol className="flex min-w-max items-center gap-0 md:min-w-0 md:justify-between">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative rounded-xl border border-line/10 bg-line/[0.03] px-4 py-3 text-center"
            >
              <span className="block font-mono text-[10px] text-subtle">0{i + 1}</span>
              <span className="text-sm font-medium">{s}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <svg width="56" height="12" viewBox="0 0 56 12" className="mx-1 shrink-0" aria-hidden>
                <line x1="2" y1="6" x2="48" y2="6" stroke="rgb(var(--cyan))" strokeOpacity=".6" strokeWidth="1.5" strokeDasharray="4 6" className="motion-safe:animate-dash" />
                <path d="M48 2 L54 6 L48 10" fill="none" stroke="rgb(var(--violet))" strokeWidth="1.5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
