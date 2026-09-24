import { journey, exploring } from "@/data/content";
import { projects } from "@/data/projects";
import { SectionHeader, StatusBadge } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Learning & Building dashboard — progression without invented employment history. */
export function JourneyDashboard() {
  const done = journey.filter((j) => j.status === "done").length;
  return (
    <section className="container py-20" aria-labelledby="journey-title">
      <SectionHeader eyebrow="Learning & Building" title={<span id="journey-title">Development journey</span>} description="From frontend fundamentals toward full-stack and AI-enabled development — every stage backed by projects." />
      <Reveal className="card p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Progress</p>
            <p className="mt-2 font-display text-2xl font-semibold">{done} of {journey.length} stages complete</p>
          </div>
          <div className="flex flex-wrap gap-1.5">{exploring.map((e) => <span key={e} className="chip">{e}</span>)}</div>
        </div>
        <div className="mt-8 grid gap-2 md:grid-cols-6" role="list">
          {journey.map((j, i) => (
            <div key={j.title} role="listitem" className="relative">
              <div className={cn("h-1.5 rounded-full", j.status === "done" ? "bg-gradient-to-r from-cyan to-violet" : j.status === "current" ? "bg-cyan/40" : "bg-line/10")}>
                {j.status === "current" && <div className="h-full w-1/2 rounded-full bg-cyan motion-safe:animate-pulseDot" />}
              </div>
              <div className="mt-4 flex items-start gap-3 md:block">
                <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                <div>
                  <p className="text-sm font-medium md:mt-1">{j.title}</p>
                  <p className="mt-1 text-xs capitalize text-subtle">{j.status === "next" ? "up next" : j.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t hairline pt-6">
          <p className="eyebrow mb-4">Projects used for practical learning</p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-3 rounded-xl bg-line/[0.03] px-4 py-3 text-sm">
                <span className="truncate">{p.title}</span><StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
