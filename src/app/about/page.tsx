import { PageShell, SectionHeader } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { Timeline } from "@/components/dashboard/timeline";
import { FeatureGrid } from "@/components/dashboard/feature-grid";
import { CTASection } from "@/components/dashboard/cta-section";
import { JourneyDashboard } from "@/components/sections/journey-dashboard";
import { journey, principles } from "@/data/content";
import { siteConfig } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("About", `About ${siteConfig.name} — a developer on the path to becoming a confident professional software engineer.`, "/about");

export default function AboutPage() {
  return (
    <PageShell>
      <div className="container">
        <SectionHeader as="h1" eyebrow="About" title={<>Building toward <span className="text-gradient">professional engineering.</span></>} />
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="card p-7 md:p-9">
            <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p><span className="text-fg">I’m {siteConfig.name}</span>, a {siteConfig.role.toLowerCase()} focused on the MERN stack. My goal is clear: to become a confident, professional software engineer who builds products people rely on.</p>
              <p>I learn by building. Every concept — from CSS layout to REST APIs, authentication and databases — turns into a working project. That habit keeps my knowledge practical and my portfolio honest.</p>
              <p>I’m especially interested in modern web technologies like Next.js and TypeScript, and in the growing space of AI-powered applications and agent systems.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="card p-7">
            <h2 className="font-display text-lg font-semibold">Mindset</h2>
            <ul className="mt-5 grid gap-4 text-sm">
              {[["Curious", "I ask why things work, not just how."], ["Consistent", "Small daily progress compounds."], ["Product-minded", "Code exists to serve real users."], ["Honest", "I represent my skills as they really are."]].map(([t, d]) => (
                <li key={t} className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" /><div><p className="font-medium">{t}</p><p className="text-muted">{d}</p></div></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <section className="container py-20" aria-labelledby="tl">
        <SectionHeader eyebrow="Journey" title={<span id="tl">How I got here</span>} description="Stages of growth — no invented dates or employers." />
        <Timeline items={journey.map((j) => ({ title: j.title, description: j.description, state: j.status, tags: j.tags, badge: j.status === "done" ? "Completed" : j.status === "current" ? "Current" : "Upcoming" }))} />
      </section>

      <section className="container py-10" aria-labelledby="pr">
        <SectionHeader eyebrow="Principles" title={<span id="pr">How I build software</span>} />
        <FeatureGrid items={principles} cols={4} />
      </section>
      <JourneyDashboard />
      <CTASection />
    </PageShell>
  );
}
