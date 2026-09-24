import { Check, Circle, CircleDot } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { StatusBadge } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

export type TimelineItem = { title: string; description: string; state: "done" | "current" | "next"; badge?: string; tags?: string[] };

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative">
      <span aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-cyan/60 via-violet/40 to-transparent md:left-1/2" />
      {items.map((it, i) => {
        const Icon = it.state === "done" ? Check : it.state === "current" ? CircleDot : Circle;
        const left = i % 2 === 0;
        return (
          <li key={it.title} className="relative mb-8 pl-12 last:mb-0 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
            <span
              className={cn(
                "absolute left-0 top-5 z-10 grid h-8 w-8 place-items-center rounded-full border md:left-1/2 md:-translate-x-1/2",
                it.state === "done" && "border-emerald/40 bg-emerald/15 text-emerald",
                it.state === "current" && "border-cyan/50 bg-cyan/15 text-cyan shadow-[0_0_24px_rgb(var(--cyan)/0.5)]",
                it.state === "next" && "border-line/15 bg-surface text-subtle",
              )}
              aria-hidden
            >
              <Icon size={14} />
            </span>
            <Reveal delay={0.05} className={cn(left ? "md:col-start-1 md:text-right" : "md:col-start-2")}>
              <div className="card p-5 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                  {it.badge && <StatusBadge status={it.badge} />}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.description}</p>
                {it.tags && <div className="mt-3 flex flex-wrap gap-1.5">{it.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
