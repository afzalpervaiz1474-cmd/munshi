import { Activity } from "lucide-react";
import { currentlyBuilding, exploring } from "@/data/content";
import { StatusBadge } from "@/components/ui/misc";

export function ActivityCard() {
  return (
    <div className="card h-full p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold"><Activity size={17} className="text-cyan" /> Currently Building</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">live feed</span>
      </div>
      <ul className="mt-5 grid gap-3">
        {currentlyBuilding.map((b, i) => (
          <li key={b.title} className="flex items-center gap-4 rounded-xl border hairline bg-line/[0.02] p-3.5">
            <span className="font-mono text-xs text-subtle">0{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{b.title}</p>
              <p className="truncate text-xs text-subtle">{b.detail}</p>
            </div>
            <StatusBadge status={b.progress} />
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-6">Exploring now</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{exploring.map((e) => <span key={e} className="chip">{e}</span>)}</div>
    </div>
  );
}
