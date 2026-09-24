"use client";
import { motion, useReducedMotion } from "framer-motion";
import { levelMeta, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

/** TechnologyCard: shows a % bar only when a verified value exists; otherwise an honest label. */
export function TechnologyCard({ skill }: { skill: Skill }) {
  const reduce = useReducedMotion();
  const meta = skill.level ? levelMeta[skill.level] : null;
  return (
    <div className="group relative rounded-xl border border-line/10 bg-line/[0.02] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan/30 hover:bg-line/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{skill.name}{skill.note && <span className="ml-1.5 text-xs text-subtle">({skill.note})</span>}</p>
        {typeof skill.percent === "number" ? (
          <span className="font-mono text-xs text-cyan">{skill.percent}%</span>
        ) : meta ? (
          <span className={cn("flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider", meta.tone)} title={meta.description}>
            <span className="flex gap-0.5" aria-hidden>{[1, 2, 3].map((d) => <span key={d} className={cn("h-1.5 w-1.5 rounded-full", d <= meta.dots ? "bg-current" : "bg-line/15")} />)}</span>
            {skill.level}
          </span>
        ) : null}
      </div>
      {typeof skill.percent === "number" && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/10" role="progressbar" aria-valuenow={skill.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
            initial={reduce ? { width: `${skill.percent}%` } : { width: 0 }}
            whileInView={{ width: `${skill.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </div>
  );
}
