import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "./project-preview";
import { StatusBadge } from "@/components/ui/misc";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <TiltCard intensity={large ? 3 : 5} className="h-full">
      <Link href={`/projects/${project.slug}`} className={cn("relative flex h-full flex-col rounded-2xl", large && "lg:flex-row")} aria-label={`View details: ${project.title}`}>
        <div className={cn("relative aspect-[16/10] overflow-hidden rounded-t-2xl", large && "lg:aspect-auto lg:w-[58%] lg:rounded-l-2xl lg:rounded-tr-none")}>
          <ProjectPreview type={project.preview} />
          <div className="absolute left-4 top-4 flex gap-2"><StatusBadge status={project.status} className="bg-bg/70 backdrop-blur" /></div>
        </div>
        <div className={cn("relative flex flex-1 flex-col p-6", large && "lg:p-10")}>
          <p className="eyebrow">{project.category} · {project.kind}</p>
          <h3 className={cn("mt-3 font-display font-semibold", large ? "text-2xl lg:text-4xl" : "text-xl")}>{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
          {large && (
            <>
              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-subtle">Problem solved</p>
              <p className="mt-1 text-sm text-muted">{project.problem}</p>
              <ul className="mt-4 grid gap-1.5 text-sm text-muted">
                {project.features.slice(0, 3).map((f) => <li key={f} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />{f}</li>)}
              </ul>
            </>
          )}
          <div className="mt-5 flex flex-wrap gap-1.5">{project.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          <div className="mt-auto flex items-center justify-between pt-6 text-sm">
            <span className="text-subtle">{project.liveUrl ? "Live demo available" : project.repoUrl ? "Source code" : project.status === "In Development" ? "In development" : "Source on GitHub"}</span>
            <span className="inline-flex items-center gap-1 font-medium text-fg">Case study <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
