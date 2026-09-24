"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const lines = ["initialising workspace", "compiling interface", "loading 3D environment", "ready"];

/** Cinematic intro — shown once per session, skipped for reduced motion. */
export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch {}
    if (reduce || seen) { setShow(false); return; }
    const timers = lines.map((_, i) => setTimeout(() => setStep(i), i * 420));
    const done = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("intro-seen", "1"); } catch {}
    }, 1900);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07080b]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid h-20 w-20 place-items-center"
            >
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur" />
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#38d6f0]/60 via-transparent to-[#a084ff]/60 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px" />
              <span className="relative font-display text-2xl font-semibold text-white">{siteConfig.initials}</span>
            </motion.div>
            <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-[#38d6f0] to-[#a084ff]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.7, ease: "easeInOut" }} />
            </div>
            <p className="mt-4 h-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
              <span className="text-[#38d6f0]">›</span> {lines[step]}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
