import { siteConfig } from "@/config/site";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { education, principles } from "@/data/content";
import { PrintButton } from "@/components/sections/print-button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Resume", `Resume of ${siteConfig.name} — ${siteConfig.role}.`, "/resume");

export default function ResumePage() {
  return (
    <div className="container max-w-4xl pb-24 pt-32 print:max-w-none print:p-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">Printable CV — use “Save as PDF” in the print dialog.</p>
        <PrintButton />
      </div>
      <article className="card p-8 md:p-12 print:border-0 print:bg-white print:p-0 print:text-black print:shadow-none">
        <header className="border-b hairline pb-6">
          <h1 className="text-4xl font-semibold">{siteConfig.name}</h1>
          <p className="mt-1 text-lg text-cyan print:text-black">{siteConfig.role} · {siteConfig.altRole}</p>
          <p className="mt-3 text-sm text-muted print:text-black">
            {siteConfig.github.url.replace("https://", "")}{siteConfig.email && ` · ${siteConfig.email}`}{siteConfig.socials.linkedin && ` · ${siteConfig.socials.linkedin.replace("https://", "")}`}
          </p>
        </header>
        <Block title="Profile">
          <p>Junior Full-Stack Developer focused on the MERN stack, Next.js and TypeScript. Learns by building complete projects, with a growing interest in AI-powered applications. Currently studying 11th Class.</p>
        </Block>
        <Block title="Technical skills">
          <dl className="grid gap-2 text-sm">
            {skillCategories.map((c) => (
              <div key={c.id} className="grid gap-1 sm:grid-cols-[180px_1fr]"><dt className="font-medium text-fg print:text-black">{c.title}</dt><dd>{c.skills.map((s) => s.name + (s.percent ? ` (${s.percent}%)` : "")).join(", ")}</dd></div>
            ))}
          </dl>
        </Block>
        <Block title="Projects">
          <ul className="grid gap-4">
            {projects.map((p) => (
              <li key={p.slug}>
                <p className="font-medium text-fg print:text-black">{p.title} <span className="text-xs font-normal text-subtle">— {p.kind}, {p.status}</span></p>
                <p className="text-sm">{p.tagline} <span className="text-subtle">[{p.stack.join(", ")}]</span></p>
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Education">
          <ul className="grid gap-1 text-sm">{education.map((e) => <li key={e.title}><span className="font-medium text-fg print:text-black">{e.title}</span> — {e.status}</li>)}</ul>
        </Block>
        <Block title="Strengths">
          <p className="text-sm">{principles.map((p) => p.title).join(" · ")}</p>
        </Block>
      </article>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="eyebrow mb-3 print:text-black">{title}</h2>
      <div className="leading-relaxed text-muted print:text-black">{children}</div>
    </section>
  );
}
