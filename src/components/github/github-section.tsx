import { Star, ArrowUpRight, GitBranch } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { getRepos } from "@/lib/github";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";

/** Server component: live repos when the API is reachable; clean static fallback otherwise. */
export async function GithubSection() {
  const repos = await getRepos();
  const hasRepos = repos && repos.length > 0;
  return (
    <section className="container py-20" aria-labelledby="gh-title">
      <SectionHeader eyebrow="Open source" title={<span id="gh-title">On GitHub</span>} description="Code, experiments and learning projects — all public." />
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Reveal className="card flex flex-col p-6">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-line/5 ring-1 ring-line/10"><Github size={22} /></span>
          <p className="mt-5 font-display text-lg font-semibold">@{siteConfig.github.username}</p>
          <p className="mt-1 text-sm text-muted">Where every project in this portfolio lives.</p>
          <div className="mt-6 flex items-end gap-1" aria-hidden>
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} className="w-full rounded-sm bg-cyan" style={{ height: 6 + ((i * 37) % 26), opacity: 0.15 + ((i * 13) % 10) / 14 }} />
            ))}
          </div>
          <p className="mt-2 font-mono text-[10px] text-subtle">decorative activity visual</p>
          <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-fg text-sm font-medium text-bg transition hover:opacity-90 active:scale-95">
            Visit profile <ArrowUpRight size={15} />
          </a>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {hasRepos
            ? repos!.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.04}>
                  <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="card group flex h-full flex-col p-5 transition hover:border-cyan/30">
                    <div className="flex items-center justify-between"><p className="flex items-center gap-2 truncate font-mono text-sm"><GitBranch size={14} className="text-cyan" />{r.name}</p><ArrowUpRight size={15} className="text-subtle transition group-hover:text-fg" /></div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{r.description || "No description yet."}</p>
                    <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-subtle">
                      {r.language && <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet" />{r.language}</span>}
                      <span className="flex items-center gap-1"><Star size={12} />{r.stargazers_count}</span>
                      <span>Updated {new Date(r.updated_at).toLocaleDateString("en", { month: "short", year: "numeric" })}</span>
                    </div>
                  </a>
                </Reveal>
              ))
            : projects.slice(0, 4).map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.04}>
                  <a href={p.repoUrl || siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="card group flex h-full flex-col p-5 transition hover:border-cyan/30">
                    <div className="flex items-center justify-between"><p className="flex items-center gap-2 font-mono text-sm"><GitBranch size={14} className="text-cyan" />{p.slug}</p><ArrowUpRight size={15} className="text-subtle group-hover:text-fg" /></div>
                    <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                    <p className="mt-auto pt-4 text-xs text-subtle">{p.stack.slice(0, 3).join(" · ")}</p>
                  </a>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
