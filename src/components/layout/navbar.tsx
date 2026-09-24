"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, FileText } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { navItems, siteConfig } from "@/config/site";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const ThemeBtn = (
    <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-line/5 hover:text-fg">
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-5">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">Skip to content</a>
      <nav aria-label="Primary" className={cn("mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 pl-4 transition-all duration-500", scrolled || open ? "glass shadow-[0_20px_60px_-30px_rgb(0_0_0/0.8)]" : "border border-transparent")}>
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan/20 to-violet/20 ring-1 ring-line/10">
            <span className="font-display text-xs font-bold text-fg">{siteConfig.initials}</span>
          </span>
          <span className="hidden font-display text-sm font-semibold sm:block">{siteConfig.name}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="relative">
                <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("relative z-10 block rounded-full px-3.5 py-2 text-[13px] transition-colors", active ? "text-fg" : "text-muted hover:text-fg")}>
                  {item.label}
                </Link>
                {active && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-line/[0.07] ring-1 ring-line/10" transition={{ type: "spring", stiffness: 380, damping: 32 }}>
                    <span className="absolute -bottom-px left-1/2 h-px w-6 -translate-x-1/2 bg-gradient-to-r from-cyan to-violet" />
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          {ThemeBtn}
          <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hidden h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-line/5 hover:text-fg sm:grid"><Github size={16} /></a>
          <Link href={siteConfig.resumePath} className="ml-1 hidden h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-[13px] font-medium text-bg transition hover:opacity-90 active:scale-95 md:inline-flex">
            <FileText size={14} /> Resume
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="grid h-9 w-9 place-items-center rounded-full text-fg lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.25 }} className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden">
            <ul className="grid gap-1">
              {navItems.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg", active ? "bg-line/[0.06] text-fg" : "text-muted")}>
                      {item.label}
                      <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t hairline pt-3">
              <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-line/5 text-sm"><Github size={16} /> GitHub</a>
              <Link href={siteConfig.resumePath} className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-fg text-sm text-bg"><FileText size={16} /> Resume</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
