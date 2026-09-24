"use client";
import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Common = { children: ReactNode; variant?: Variant; className?: string; magnetic?: boolean };
type LinkProps = Common & { href: string; external?: boolean; download?: boolean; "aria-label"?: string };

const styles: Record<Variant, string> = {
  primary:
    "text-[#05070a] bg-gradient-to-r from-cyan to-violet shadow-[0_10px_40px_-12px_rgb(var(--cyan)/0.6)] hover:shadow-[0_14px_50px_-10px_rgb(var(--violet)/0.7)]",
  secondary: "glass text-fg hover:border-cyan/40",
  ghost: "text-muted hover:text-fg",
};

/** Magnetic link-button with tactile press feedback. */
export function ButtonLink({ children, href, variant = "primary", className, external, magnetic = true, ...rest }: LinkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  const onMove = (e: MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls = cn(
    "group relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[box-shadow,border-color,color,transform] duration-300 active:scale-[0.97] select-none",
    styles[variant],
    className,
  );
  const inner = (
    <motion.span ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} className="inline-flex">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{children}</a>
      ) : (
        <Link href={href} className={cls} {...rest}>{children}</Link>
      )}
    </motion.span>
  );
  return inner;
}
