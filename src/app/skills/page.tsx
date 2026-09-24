import { PageShell, SectionHeader } from "@/components/ui/misc";
import { SkillsExplorer } from "@/components/skills/skills-explorer";
import { CTASection } from "@/components/dashboard/cta-section";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Skills", "Developer stack — frontend, backend, databases, tools and AI-powered development, with honest proficiency levels.", "/skills");

export default function SkillsPage() {
  return (
    <PageShell>
      <div className="container">
        <SectionHeader as="h1" eyebrow="Developer stack" title={<>The tools I <span className="text-gradient">build with.</span></>} description="An interactive map of my stack. Filter by category, search, and explore the 3D visualization." />
        <SkillsExplorer />
      </div>
      <CTASection title="Need these skills on a project?" />
    </PageShell>
  );
}
