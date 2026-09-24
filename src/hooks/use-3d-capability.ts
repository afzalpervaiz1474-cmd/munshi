"use client";
import { useEffect, useState } from "react";

export type Capability = "pending" | "full" | "lite" | "none";

/**
 * Decides whether to render WebGL.
 * - none: no WebGL or user prefers reduced motion
 * - lite: small screens / low-end devices / Save-Data (fewer particles, lower DPR)
 * - full: capable desktop
 */
export function use3DCapability(): Capability {
  const [cap, setCap] = useState<Capability>("pending");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    if (!webgl || reduce) return setCap("none");
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowEnd =
      (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || nav.connection?.saveData === true;
    const small = window.innerWidth < 768;
    setCap(lowEnd || small ? "lite" : "full");
  }, []);
  return cap;
}
