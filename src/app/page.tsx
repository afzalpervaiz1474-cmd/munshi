import Link from "next/link";
import { FolderGit2, Cpu, Layers, GraduationCap, ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { FeatureGrid } from "@/components/dashboard/feature-grid";
import { TechOrbit } from "@/components/dashboard/tech-orbit";
import { CTASection } from "@/components/dashboard/cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { AISection } from "@/components/sections/ai-section";
import { JourneyDashboard } from "@/components/sections/journey-dashboard";
import { ResumePreview } from "@/components/sections/resume-preview";
import { GithubSection } from "@/components/github/github-section";
import { SectionHeader } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { whatIBuild, services } from "@/data/content";
import { projects } from "@/data/projects";
import { allSkills, skillCategories } from "@/data/skills";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured).slice(0, 3);
  return (
    <>
      <Hero />

      {/* Command center */}
      <section className="container py-16 md:py-24" aria-labelledby="dash-title">
        <SectionHeader eyebrow="Command center" title={<span id="dash-title">Developer dashboard</span>} description="A snapshot of what I’m working with, building and learning right now." />
        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <Reveal><ProfileCard /></Reveal>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
              <StatCard label="Projects" icon={FolderGit2} value={projects.length} hint="Listed in this portfolio" />
              <StatCard label="Technologies" icon={Cpu} value={allSkills.length} hint={`Across ${skillCategories.length} categories`} accent="violet" />
              <StatCard label="Full-Stack" icon={Layers} text="MERN" hint="Primary focus stack" accent="emerald" />
              <StatCard label="Learning" icon={GraduationCap} text="Active" hint="Building every week" accent="amber" />
            </div>
            <Reveal className="h-full"><ActivityCard /></Reveal>
          </div>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="build-title">
        <SectionHeader eyebrow="Capabilities" title={<span id="build-title">What I build</span>} description="The kinds of software I design and develop — end to end." />
        <FeatureGrid items={whatIBuild} />
      </section>

      <section className="container py-16" aria-labelledby="stack-title">
        <div className="card grid items-center gap-10 overflow-hidden p-6 md:p-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Stack" title={<span id="stack-title">A connected technology orbit.</span>} description="React and Next.js on the surface, Node.js and Express in the middle, MongoDB underneath — tied together with TypeScript and Git." />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skillCategories.map((c) => (
                <Link key={c.id} href="/skills" className="rounded-xl border hairline bg-line/[0.02] p-3 transition hover:border-cyan/30">
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-subtle">{c.skills.length} tools</p>
                </Link>
              ))}
            </div>
          </div>
          <TechOrbit />
        </div>
      </section>

      <section className="container py-16" aria-labelledby="proj-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Selected work" title={<span id="proj-title">Featured projects</span>} />
          <Link href="/projects" className="link-underline mb-14 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">All projects <ArrowRight size={14} /></Link>
        </div>
        <div className="grid gap-5">
          {featured.slice(0, 1).map((p) => <Reveal key={p.slug}><ProjectCard project={p} large /></Reveal>)}
          <div className="grid gap-5 md:grid-cols-3">{others.map((p, i) => <Reveal key={p.slug} delay={i * 0.06} className="h-full"><ProjectCard project={p} /></Reveal>)}</div>
        </div>
      </section>

      <AISection />

      <section className="container py-16" aria-labelledby="svc-title">
        <SectionHeader eyebrow="Services" title={<span id="svc-title">What I can build</span>} description="Application types I build or am actively developing skills toward. Personal and learning projects — not client claims." />
        <FeatureGrid items={services} />
      </section>

      <JourneyDashboard />
      <GithubSection />
      <ResumePreview />
      <CTASection />
    </>
  );
}
