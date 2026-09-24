import type { ReactElement } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Generated, lightweight UI mockups used as project previews (no heavy images).
 * Replace with <Image src=... /> screenshots when real ones are available.
 */
export function ProjectPreview({ type, className }: { type: Project["preview"]; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-gradient-to-br from-elevated to-surface", className)} aria-hidden>
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-x-[8%] bottom-0 top-[14%] rounded-t-xl border border-b-0 border-line/10 bg-bg/80 shadow-2xl backdrop-blur transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
        <div className="flex items-center gap-1.5 border-b border-line/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400/70" /><span className="h-2 w-2 rounded-full bg-amber/70" /><span className="h-2 w-2 rounded-full bg-emerald/70" />
          <span className="ml-3 h-3 flex-1 rounded bg-line/5" />
        </div>
        <div className="p-3">{mocks[type]}</div>
      </div>
    </div>
  );
}

const bar = (w: string, c = "bg-line/10") => <span className={cn("block h-2 rounded", c)} style={{ width: w }} />;

const mocks: Record<Project["preview"], ReactElement> = {
  store: (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-line/10 p-1.5">
          <div className={cn("aspect-square rounded-md", i % 2 ? "bg-gradient-to-br from-cyan/30 to-transparent" : "bg-gradient-to-br from-violet/30 to-transparent")} />
          <div className="mt-1.5 space-y-1">{bar("80%")}{bar("40%", "bg-cyan/40")}</div>
        </div>
      ))}
    </div>
  ),
  marketplace: (
    <div className="space-y-2">
      <div className="flex gap-2"><span className="h-4 w-10 rounded bg-amber/50" /><span className="h-4 flex-1 rounded bg-line/10" /><span className="h-4 w-6 rounded bg-amber/40" /></div>
      <div className="h-12 rounded-md bg-gradient-to-r from-amber/25 via-violet/20 to-cyan/20" />
      <div className="grid grid-cols-4 gap-1.5">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[3/4] rounded bg-line/[0.07]" />)}</div>
    </div>
  ),
  music: (
    <div className="flex gap-2">
      <div className="w-1/4 space-y-1.5">{["70%", "90%", "60%", "80%", "50%"].map((w, i) => <span key={i}>{bar(w)}</span>)}</div>
      <div className="flex-1 space-y-2">
        <div className="flex items-end gap-2"><div className="h-14 w-14 rounded-md bg-gradient-to-br from-emerald/60 to-cyan/30" /><div className="flex-1 space-y-1">{bar("60%", "bg-line/20")}{bar("35%")}</div></div>
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-line/10" />{bar(`${70 - i * 12}%`)}</div>)}
        <div className="flex items-center gap-1.5 pt-1"><span className="h-4 w-4 rounded-full bg-emerald/70" /><span className="h-1 flex-1 rounded bg-line/10"><span className="block h-1 w-1/3 rounded bg-emerald/70" /></span></div>
      </div>
    </div>
  ),
  calculator: (
    <div className="mx-auto w-[58%]">
      <div className="mb-2 rounded-md bg-line/5 p-2 text-right font-mono text-sm text-fg/80">128 × 4</div>
      <div className="grid grid-cols-4 gap-1">
        {["C", "÷", "×", "−", "7", "8", "9", "+", "4", "5", "6", "="].map((k) => (
          <span key={k} className={cn("grid aspect-square place-items-center rounded font-mono text-[9px]", "+−×÷=".includes(k) ? "bg-cyan/25 text-cyan" : "bg-line/[0.07] text-muted")}>{k}</span>
        ))}
      </div>
    </div>
  ),
  agent: (
    <div className="space-y-2 font-mono text-[9px]">
      <div className="ml-auto w-2/3 rounded-lg bg-violet/20 p-2 text-violet">› summarise today’s tasks</div>
      <div className="w-3/4 space-y-1 rounded-lg border border-line/10 p-2">
        <p className="text-cyan">⚙ calling tool: tasks.list()</p>
        {bar("90%")}{bar("70%")}
      </div>
      <div className="flex gap-1">{["plan", "act", "observe"].map((s) => <span key={s} className="rounded-full border border-cyan/30 px-2 py-0.5 text-cyan">{s}</span>)}</div>
    </div>
  ),
};
