import Link from "next/link";
import { FileText, Mail, MapPin } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { coreStack } from "@/data/skills";

export function ProfileCard() {
  return (
    <div className="card overflow-hidden p-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-cyan/15 via-transparent to-violet/15" />
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan/30 to-violet/30 ring-1 ring-line/15">
            <span className="font-display text-xl font-bold">{siteConfig.initials}</span>
          </div>
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface bg-emerald" aria-label="Active" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">{siteConfig.name}</h2>
          <p className="text-sm text-muted">{siteConfig.role}</p>
          <p className="mt-0.5 font-mono text-[11px] text-subtle">{siteConfig.altRole}</p>
        </div>
      </div>
      <dl className="relative mt-6 grid gap-3 text-sm">
        <div className="flex items-center justify-between border-b hairline pb-3"><dt className="text-subtle">Focus</dt><dd>MERN · Next.js · AI apps</dd></div>
        <div className="flex items-center justify-between border-b hairline pb-3"><dt className="text-subtle">Status</dt><dd className="flex items-center gap-1.5 text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-current motion-safe:animate-pulseDot" />Learning & building</dd></div>
        <div className="flex items-center justify-between"><dt className="text-subtle">Education</dt><dd>11th Class (current)</dd></div>
      </dl>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {coreStack.slice(0, 6).map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="relative mt-6 grid grid-cols-3 gap-2">
        <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-line/5 text-xs ring-1 ring-line/10 transition hover:bg-line/10 active:scale-95"><Github size={14} /> GitHub</a>
        <Link href="/resume" className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-line/5 text-xs ring-1 ring-line/10 transition hover:bg-line/10 active:scale-95"><FileText size={14} /> CV</Link>
        <Link href="/contact" className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-fg text-xs text-bg transition hover:opacity-90 active:scale-95"><Mail size={14} /> Contact</Link>
      </div>
    </div>
  );
}
