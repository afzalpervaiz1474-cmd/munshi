"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { skillCategories, allSkills, levelMeta, type SkillLevel } from "@/data/skills";
import { SkillCategory } from "./skill-category";
import { Scene3D } from "@/components/three/scene-3d";
import { TechOrbit } from "@/components/dashboard/tech-orbit";
import { cn } from "@/lib/utils";

export function SkillsExplorer() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      skillCategories
        .filter((c) => cat === "all" || c.id === cat)
        .map((c) => ({ ...c, skills: c.skills.filter((s) => s.name.toLowerCase().includes(q.trim().toLowerCase())) }))
        .filter((c) => c.skills.length > 0),
    [cat, q],
  );
  const labels = useMemo(() => allSkills.map((s) => s.name), []);
  const highlight = useMemo(() => filtered.flatMap((c) => c.skills.map((s) => s.name)), [filtered]);

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="card relative h-[360px] overflow-hidden sm:h-[440px]">
          <p className="eyebrow absolute left-5 top-5 z-10">3D stack map · drag to rotate</p>
          <Scene3D variant="tech" labels={labels} highlight={cat === "all" && !q ? undefined : highlight} className="h-full w-full" fallback={<div className="grid h-full place-items-center"><TechOrbit /></div>} />
        </div>
        <div className="card flex flex-col justify-between p-6">
          <div>
            <h2 className="font-display text-xl font-semibold">How to read this</h2>
            <p className="mt-2 text-sm text-muted">Percentages are shown only where a verified value exists. Everything else uses an honest proficiency label.</p>
            <ul className="mt-5 grid gap-3">
              {(Object.keys(levelMeta) as SkillLevel[]).map((l) => (
                <li key={l} className="flex items-center justify-between rounded-xl border hairline px-4 py-3 text-sm">
                  <span className={cn("font-mono text-xs uppercase tracking-wider", levelMeta[l].tone)}>{l}</span>
                  <span className="text-subtle">{levelMeta[l].description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-line/[0.03] p-3"><p className="font-display text-2xl font-semibold">{allSkills.length}</p><p className="text-[11px] text-subtle">Technologies</p></div>
            <div className="rounded-xl bg-line/[0.03] p-3"><p className="font-display text-2xl font-semibold">{skillCategories.length}</p><p className="text-[11px] text-subtle">Categories</p></div>
            <div className="rounded-xl bg-line/[0.03] p-3"><p className="font-display text-2xl font-semibold">95%</p><p className="text-[11px] text-subtle">HTML</p></div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {[{ id: "all", title: "All" }, ...skillCategories].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={cn("relative rounded-full px-4 py-2 text-sm transition", cat === c.id ? "text-bg" : "glass text-muted hover:text-fg")}>
              {cat === c.id && <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{c.title}</span>
            </button>
          ))}
        </div>
        <label className="relative block md:w-64">
          <span className="sr-only">Search technologies</span>
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search technologies…" className="field rounded-full py-2.5 pl-10" />
        </label>
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((c) => (
            <motion.div key={c.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
              <SkillCategory category={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="mt-8 text-center text-muted">No technologies match “{q}”.</p>}
    </div>
  );
}
