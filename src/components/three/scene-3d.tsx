"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { use3DCapability } from "@/hooks/use-3d-capability";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });
const TechSphere = dynamic(() => import("./tech-sphere"), { ssr: false });

/** Pauses rendering when offscreen; mounts only when first near the viewport (lazy). */
function useVisibility<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setMounted(true);
    }, { rootMargin: "150px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, visible, mounted };
}

type Props = { className?: string; fallback: ReactNode } & (
  | { variant: "hero" }
  | { variant: "tech"; labels: string[]; highlight?: string[] }
);

/** 3DScene: capability-aware wrapper with graceful static fallback (no WebGL / reduced motion). */
export function Scene3D(props: Props) {
  const cap = use3DCapability();
  const { ref, visible, mounted } = useVisibility<HTMLDivElement>();
  const show3D = cap === "full" || cap === "lite";
  return (
    <div ref={ref} className={cn("relative", props.className)}>
      {(!show3D || !mounted) && <div className="absolute inset-0">{props.fallback}</div>}
      {show3D && mounted && (
        <div className="absolute inset-0 animate-[fadeIn_1s_ease]">
          {props.variant === "hero" ? (
            <HeroScene quality={cap === "full" ? "full" : "lite"} active={visible} />
          ) : (
            <TechSphere labels={props.labels} highlight={props.highlight} active={visible} />
          )}
        </div>
      )}
    </div>
  );
}
