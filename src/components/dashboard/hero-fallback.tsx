/** Static, zero-JS fallback visual for the hero 3D scene. */
export function HeroFallback() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2.5rem] border border-cyan/30 bg-gradient-to-br from-cyan/10 to-violet/10 shadow-[0_0_80px_-10px_rgb(var(--cyan)/0.4)] backdrop-blur-xl" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-2xl bg-gradient-to-br from-violet/60 to-cyan/40 blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/10" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line/[0.07]" />
    </div>
  );
}
