import { ArrowRight } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

export function CTASection({ title = "Let’s build something meaningful.", text = "Have an idea, a learning collaboration or an opportunity? I’d love to hear about it." }: { title?: string; text?: string }) {
  return (
    <section className="container py-20" aria-labelledby="cta-title">
      <Reveal className="card relative overflow-hidden px-6 py-14 text-center sm:px-12 md:py-20">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
        <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan/20 to-violet/20 blur-[90px]" />
        <p className="eyebrow relative">Collaboration</p>
        <h2 id="cta-title" className="relative mx-auto mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted">{text}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">Contact Me <ArrowRight size={16} /></ButtonLink>
          <ButtonLink href={siteConfig.github.url} external variant="secondary"><Github size={16} /> GitHub</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
