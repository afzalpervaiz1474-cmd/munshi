import type { LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/misc";
import { TiltCard } from "@/components/ui/tilt-card";

type Props = { label: string; icon: LucideIcon; value?: number; suffix?: string; text?: string; hint: string; accent?: "cyan" | "violet" | "emerald" | "amber" };

const accentCls = { cyan: "text-cyan bg-cyan/10", violet: "text-violet bg-violet/10", emerald: "text-emerald bg-emerald/10", amber: "text-amber bg-amber/10" };

/** StatCard: numeric values count up; text values render as labels (no invented numbers). */
export function StatCard({ label, icon: Icon, value, suffix, text, hint, accent = "cyan" }: Props) {
  return (
    <TiltCard className="p-5" intensity={4}>
      <div className="relative flex items-start justify-between">
        <p className="eyebrow">{label}</p>
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${accentCls[accent]}`}><Icon size={15} /></span>
      </div>
      <p className="relative mt-4 font-display text-3xl font-semibold sm:text-4xl">
        {typeof value === "number" ? <CountUp to={value} suffix={suffix} /> : text}
      </p>
      <p className="relative mt-1 text-xs text-subtle">{hint}</p>
    </TiltCard>
  );
}
