import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Construction } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { projects, getProject } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { PageShell, StatusBadge } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { ProjectPreview } from "@/components/projects/project-preview";
import { ArchitectureFlow } from "@/components/projects/architecture-flow";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? pageMeta(p.title, p.tagline, `/projects/${p.slug}`) : { title: "Project not found" };
}

export default async function ProjectDetailPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const arch = project.architecture ?? {};
  const archRows = ([["Frontend", arch.frontend], ["Backend", arch.backend], ["Database", arch.database], ["Auth / API", arch.auth]] as const).filter(([, v]) => v && v.length);

  return (
    <PageShell>
      <article className="container">
        <Link href="/projects" className="link-underline inline-flex items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeft size={14} /> All projects</Link>
        <header className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2"><StatusBadge status={project.status} /><span className="chip">{project.kind}</span><span className="chip">{project.category}</span></div>
            <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 text-sm font-medium text-[#05070a]"><ExternalLink size={15} /> Live demo</a>}
            <a href={project.repoUrl || siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="glass inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm hover:border-cyan/40"><Github size={15} /> {project.repoUrl ? "Source code" : "View on GitHub"}</a>
            {!project.liveUrl && project.status === "In Development" && <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-line/15 px-5 text-sm text-subtle"><Construction size={15} /> In development</span>}
          </div>
        </header>

        <Reveal className="card mt-10 aspect-[16/9] overflow-hidden sm:aspect-[21/9]"><div className="group h-full"><ProjectPreview type={project.preview} /></div></Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <Section title="Overview"><p>{project.overview}</p></Section>
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal className="card p-6"><p className="eyebrow">Problem</p><p className="mt-3 text-muted">{project.problem}</p></Reveal>
              <Reveal delay={0.08} className="card p-6"><p className="eyebrow">Solution</p><p className="mt-3 text-muted">{project.solution}</p></Reveal>
            </div>
            {project.flow && <Section title="Architecture flow"><ArchitectureFlow steps={project.flow} /></Section>}
            <Section title="Key features">
              <ul className="grid gap-3 sm:grid-cols-2">{project.features.map((f) => <li key={f} className="card flex gap-3 p-4 text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />{f}</li>)}</ul>
            </Section>
            {project.challenges && <Section title="Challenges"><ul className="list-disc space-y-2 pl-5">{project.challenges.map((c) => <li key={c}>{c}</li>)}</ul></Section>}
            {project.learnings && <Section title="What I learned"><ul className="list-disc space-y-2 pl-5">{project.learnings.map((c) => <li key={c}>{c}</li>)}</ul></Section>}
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow">Tech stack</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{project.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
            {archRows.length > 0 && (
              <div className="card p-6">
                <p className="eyebrow">Architecture</p>
                <dl className="mt-3 grid gap-3 text-sm">{archRows.map(([k, v]) => <div key={k}><dt className="text-subtle">{k}</dt><dd>{v!.join(", ")}</dd></div>)}</dl>
              </div>
            )}
            <p className="px-1 text-xs text-subtle">Details reflect the project’s actual scope and will be updated as it evolves.</p>
          </aside>
        </div>

        <Link href={`/projects/${next.slug}`} className="card group mt-20 flex items-center justify-between p-6 transition hover:border-cyan/30 md:p-8">
          <div><p className="eyebrow">Next project</p><p className="mt-2 font-display text-2xl font-semibold">{next.title}</p></div>
          <ArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </article>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="mb-4 font-display text-2xl font-semibold">{title}</h2>
      <div className="leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}
