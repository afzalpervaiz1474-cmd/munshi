import { PageShell, SectionHeader } from "@/components/ui/misc";
import { Timeline } from "@/components/dashboard/timeline";
import { FeatureGrid } from "@/components/dashboard/feature-grid";
import { CTASection } from "@/components/dashboard/cta-section";
import { education, learningFocus } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Education", "Education timeline and learning focus — programming, web development, CS fundamentals and mathematics.", "/education");

export default function EducationPage() {
  return (
    <PageShell>
      <div className="container">
        <SectionHeader as="h1" eyebrow="Education" title={<>Learning in the classroom <span className="text-gradient">and beyond.</span></>} description="Formal education alongside continuous, self-driven learning in software development." />
        <Timeline items={education.map((e) => ({ title: e.title, description: e.description, badge: e.status, state: e.status === "Completed" ? "done" : e.status === "Current" ? "current" : "next" }))} />
      </div>
      <section className="container py-20" aria-labelledby="lf">
        <SectionHeader eyebrow="Learning focus" title={<span id="lf">What I’m studying on my own</span>} />
        <FeatureGrid items={learningFocus} />
      </section>
      <CTASection />
    </PageShell>
  );
}
