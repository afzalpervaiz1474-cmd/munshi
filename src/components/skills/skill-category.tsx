import type { SkillCategoryData } from "@/data/skills";
import { TechnologyCard } from "./technology-card";
import { TiltCard } from "@/components/ui/tilt-card";

const dot = { cyan: "bg-cyan", violet: "bg-violet", emerald: "bg-emerald", amber: "bg-amber" };

export function SkillCategory({ category }: { category: SkillCategoryData }) {
  return (
    <TiltCard intensity={2} className="h-full p-6">
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${dot[category.accent]} shadow-[0_0_12px_currentColor]`} aria-hidden />
          <h3 className="font-display text-lg font-semibold">{category.title}</h3>
          <span className="ml-auto font-mono text-xs text-subtle">{category.skills.length}</span>
        </div>
        <p className="mt-1.5 text-sm text-muted">{category.description}</p>
        <div className="mt-5 grid gap-2.5">{category.skills.map((s) => <TechnologyCard key={s.name} skill={s} />)}</div>
      </div>
    </TiltCard>
  );
}
