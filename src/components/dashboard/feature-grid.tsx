import type { IconItem } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function FeatureGrid({ items, cols = 3 }: { items: IconItem[]; cols?: 3 | 4 }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map(({ title, description, icon: Icon }, i) => (
        <Reveal key={title} delay={(i % 3) * 0.06} className="h-full">
          <div className="h-full">
            <TiltCard className="h-full p-6">
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 text-cyan ring-1 ring-line/10 transition group-hover:shadow-[0_0_30px_-4px_rgb(var(--cyan)/0.5)]">
                <Icon size={19} />
              </span>
              <h3 className="relative mt-5 font-display text-base font-semibold">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </TiltCard>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
