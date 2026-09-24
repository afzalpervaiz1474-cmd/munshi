import { PageShell, SectionHeader } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { AISection } from "@/components/sections/ai-section";
import { CTASection } from "@/components/dashboard/cta-section";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Projects", "Personal and learning projects — full-stack, frontend, e-commerce and AI experiments.", "/projects");

export default function ProjectsPage() {
  const featured = projects.find((p) => p.featured);
  return (
    <PageShell>
      <div className="container">
        <SectionHeader as="h1" eyebrow="Projects" title={<>Work that shows <span className="text-gradient">how I think.</span></>} description="Personal projects, learning projects and experiments — each clearly labelled with its real status." />
        {featured && (
          <Reveal className="mb-16">
            <p className="eyebrow mb-4">Featured</p>
            <ProjectCard project={featured} large />
          </Reveal>
        )}
        <h2 className="mb-6 font-display text-2xl font-semibold">All projects</h2>
        <ProjectsExplorer />
      </div>
      <AISection />
      <CTASection />
    </PageShell>
  );
}
