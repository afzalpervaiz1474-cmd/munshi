import { aiAreas } from "@/data/content";
import { SectionHeader, StatusBadge } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AISection() {
  const aiProjects = projects.filter((p) => p.category === "AI & Automation");
  return (
    <section className="relative py-20" aria-labelledby="ai-title">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet/[0.06] to-transparent" />
      <div className="container">
        <SectionHeader eyebrow="AI & Automation" title={<span id="ai-title">Intelligent software is the next frontier.</span>} description="A current and future focus. Every item is labelled honestly — in development, exploring or concept." />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="card relative overflow-hidden p-7">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet/20 blur-[80px]" />
            <p className="eyebrow relative">Agent loop</p>
            <div className="relative mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
              {["Goal", "Plan", "Call tools", "Observe"].map((s, i) => (
                <div key={s} className="rounded-xl border border-line/10 bg-line/[0.03] p-4">
                  <span className="text-subtle">0{i + 1}</span>
                  <p className="mt-1 text-sm text-fg">{s}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-6 space-y-3">
              {aiProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex items-center justify-between rounded-xl border border-cyan/20 bg-cyan/[0.05] p-4 transition hover:border-cyan/40">
                  <div><p className="text-sm font-medium">{p.title}</p><p className="text-xs text-subtle">{p.tagline}</p></div>
                  <div className="flex items-center gap-2"><StatusBadge status={p.status} /><ArrowUpRight size={15} className="text-subtle group-hover:text-fg" /></div>
                </Link>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiAreas.map(({ title, description, status, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 0.05} className={i === 0 ? "sm:col-span-2" : ""}>
                <div className="card group h-full p-5 transition hover:border-violet/30">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet ring-1 ring-violet/20"><Icon size={18} /></span>
                    <StatusBadge status={status} />
                  </div>
                  <h3 className="mt-4 font-display font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
