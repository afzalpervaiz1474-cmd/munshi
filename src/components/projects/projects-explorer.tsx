"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, projectCategories } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

export function ProjectsExplorer() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const list = projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
        {projectCategories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} className={cn("relative rounded-full px-4 py-2 text-sm transition", filter === c ? "text-bg" : "text-muted hover:text-fg glass")}>
              {filter === c && <motion.span layoutId="proj-filter" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{c} <span className="opacity-60">{count}</span></span>
            </button>
          );
        })}
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="text-muted">No projects in this category yet.</p>}
    </div>
  );
}
