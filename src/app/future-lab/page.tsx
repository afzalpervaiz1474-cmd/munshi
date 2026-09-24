import { FlaskConical } from "lucide-react";
import { PageShell, SectionHeader, StatusBadge } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CTASection } from "@/components/dashboard/cta-section";
import { futureIdeas } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Future Lab", "Upcoming ideas and planned projects — AI agents, media tools, automation, SaaS and developer tools.", "/future-lab");

export default function FutureLabPage() {
  return (
    <PageShell>
      <div className="container">
        <SectionHeader as="h1" eyebrow="Future Lab" title={<>Ideas on the <span className="text-gradient">drawing board.</span></>} description="Everything here is an idea or a planned project — not completed work." />
        <Reveal className="mb-10 flex items-center gap-3 rounded-2xl border border-dashed border-amber/30 bg-amber/[0.05] px-5 py-4 text-sm text-muted">
          <FlaskConical size={18} className="shrink-0 text-amber" />
          <p><span className="text-fg">Status notice:</span> these concepts are not built yet. Stages are labelled Idea, Researching or Planned.</p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {futureIdeas.map(({ title, category, description, icon: Icon, stage }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06} className="h-full">
              <TiltCard className="h-full border-dashed p-6">
                <div className="relative flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet/20 to-cyan/10 text-violet ring-1 ring-line/10"><Icon size={19} /></span>
                  <StatusBadge status={stage} />
                </div>
                <p className="eyebrow relative mt-5">{category}</p>
                <h2 className="relative mt-2 font-display text-lg font-semibold">{title}</h2>
                <p className="relative mt-2 text-sm text-muted">{description}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
      <CTASection title="Want to build one of these together?" />
    </PageShell>
  );
}
