"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, FileText } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { SplitText } from "@/components/ui/reveal";
import { Scene3D } from "@/components/three/scene-3d";
import { HeroFallback } from "@/components/dashboard/hero-fallback";
import { siteConfig } from "@/config/site";

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const } });
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32" aria-labelledby="hero-title">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan/10 via-violet/10 to-transparent blur-[100px]" />
      <div className="container grid items-center gap-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_1fr] 3xl:min-h-[80vh]">
        <div className="relative z-10 order-2 pb-8 lg:order-1 lg:pb-0">
          <motion.div {...fade(0.1)} className="chip mb-6 !py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald motion-safe:animate-pulseDot" />
            {siteConfig.availability}
          </motion.div>
          <h1 id="hero-title" className="text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl xl:text-7xl 3xl:text-8xl">
            <SplitText text="Hello, I’m Afzal —" delay={0.15} className="block" />
            <SplitText text="Full-Stack Developer" delay={0.35} className="text-gradient block" />
          </h1>
          <motion.p {...fade(0.6)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I build modern, scalable and user-focused web applications with the MERN stack, Next.js and TypeScript — and I’m
            growing toward AI-powered products and professional software engineering.
          </motion.p>
          <motion.div {...fade(0.75)} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/projects">View Projects <ArrowRight size={16} /></ButtonLink>
            <ButtonLink href="/skills" variant="secondary"><Sparkles size={15} /> Explore Skills</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact Me</ButtonLink>
          </motion.div>
          <motion.div {...fade(0.9)} className="mt-10 flex items-center gap-5 text-sm text-subtle">
            <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 hover:text-fg"><Github size={15} /> GitHub</a>
            <a href="/resume" className="link-underline inline-flex items-center gap-2 hover:text-fg"><FileText size={15} /> Resume</a>
            <span className="hidden font-mono text-xs sm:inline">// {siteConfig.altRole}</span>
          </motion.div>
        </div>
        <div className="relative order-1 h-[320px] sm:h-[420px] lg:order-2 lg:h-[620px] 3xl:h-[760px]">
          <Scene3D variant="hero" className="h-full w-full" fallback={<HeroFallback />} />
          <div className="glass absolute bottom-4 left-2 hidden rounded-xl px-3 py-2 font-mono text-[11px] text-muted sm:block lg:bottom-16">
            <span className="text-emerald">●</span> build: passing · stack: MERN
          </div>
        </div>
      </div>
    </section>
  );
}
