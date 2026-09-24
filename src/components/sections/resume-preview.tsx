import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/misc";

export function ResumePreview() {
  return (
    <section className="container py-20" aria-labelledby="cv-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeader eyebrow="Resume / CV" title={<span id="cv-title">A compact, honest CV.</span>} description="Skills, projects and education — no inflated titles or invented experience. Open the full version to print or save as PDF." />
          <div className="flex flex-wrap gap-3">
            <Link href="/resume?print=1" className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 text-sm font-medium text-[#05070a] transition active:scale-95"><Download size={15} /> Download CV</Link>
            <Link href="/resume" className="glass inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm transition hover:border-cyan/40"><FileText size={15} /> View full resume</Link>
          </div>
        </div>
        <Reveal>
          <div className="card relative mx-auto max-w-lg rotate-[-1.5deg] p-7 transition duration-500 hover:rotate-0" aria-label="Resume preview">
            <div className="flex items-start justify-between border-b hairline pb-5">
              <div><p className="font-display text-xl font-semibold">{siteConfig.name}</p><p className="text-sm text-cyan">{siteConfig.role} · {siteConfig.altRole}</p></div>
              <span className="font-mono text-[10px] text-subtle">CV.pdf</span>
            </div>
            <p className="eyebrow mt-5">Technical skills</p>
            <div className="mt-2 flex flex-wrap gap-1">{skillCategories.slice(0, 3).flatMap((c) => c.skills).slice(0, 12).map((s) => <span key={s.name} className="rounded bg-line/5 px-1.5 py-0.5 text-[11px] text-muted">{s.name}</span>)}</div>
            <p className="eyebrow mt-5">Projects</p>
            <ul className="mt-2 space-y-1 text-sm text-muted">{projects.slice(0, 4).map((p) => <li key={p.slug}>▹ {p.title}</li>)}</ul>
            <p className="eyebrow mt-5">Education</p>
            <p className="mt-2 text-sm text-muted">Currently studying 11th Class</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
