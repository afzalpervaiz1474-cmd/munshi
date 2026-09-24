import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/icons";
import { navItems, siteConfig } from "@/config/site";

export function Footer() {
  const socials = [
    { href: siteConfig.github.url, label: "GitHub", icon: Github },
    { href: siteConfig.socials.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: siteConfig.socials.twitter, label: "Twitter / X", icon: Twitter },
    { href: siteConfig.email ? `mailto:${siteConfig.email}` : "", label: "Email", icon: Mail },
  ].filter((s) => s.href);

  return (
    <footer className="no-print relative mt-10 overflow-hidden border-t hairline">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent bg-[length:200%_100%] motion-safe:animate-shimmer" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[120px]" />
      <div className="container relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.role} building modern, scalable and user-focused web applications — and learning something new with every project.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald motion-safe:animate-pulseDot" /> {siteConfig.availability}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((n) => (
              <li key={n.href}><Link href={n.href} className="link-underline text-muted hover:text-fg">{n.label}</Link></li>
            ))}
            <li><Link href="/resume" className="link-underline text-muted hover:text-fg">Resume</Link></li>
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="grid gap-2 text-sm">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-muted hover:text-fg">
                  <Icon size={15} /> <span className="link-underline">{label}</span>
                  <ArrowUpRight size={13} className="opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
            ))}
            <li><Link href="/contact" className="inline-flex items-center gap-2 text-muted hover:text-fg"><Mail size={15} /> <span className="link-underline">Contact form</span></Link></li>
          </ul>
        </div>
      </div>
      <div className="container relative flex flex-col justify-between gap-2 border-t hairline py-6 text-xs text-subtle sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p className="font-mono">Built with Next.js · TypeScript · Three.js</p>
      </div>
    </footer>
  );
}
