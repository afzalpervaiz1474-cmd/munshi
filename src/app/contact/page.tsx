import { Mail, Clock, ShieldCheck } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { PageShell, SectionHeader } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Contact", `Get in touch with ${siteConfig.name} about collaboration, learning opportunities or projects.`, "/contact");

export default function ContactPage() {
  const links = [
    { href: siteConfig.github.url, label: "GitHub", value: `@${siteConfig.github.username}`, icon: Github },
    { href: siteConfig.email ? `mailto:${siteConfig.email}` : "", label: "Email", value: siteConfig.email, icon: Mail },
  ].filter((l) => l.href);
  return (
    <PageShell>
      <div className="container">
        <SectionHeader as="h1" eyebrow="Contact" title={<>Let’s start a <span className="text-gradient">conversation.</span></>} description="I’m open to collaboration, learning opportunities and interesting projects. Send a message and I’ll respond as soon as I can." />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
          <div className="grid gap-5 self-start">
            <Reveal className="card p-6">
              <h2 className="font-display text-lg font-semibold">Collaboration</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">Whether it’s a side project, an open-source idea or a chance to learn from a team — I’d be glad to hear from you.</p>
              <ul className="mt-6 grid gap-3">
                {links.map(({ href, label, value, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border hairline p-3 transition hover:border-cyan/30">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-line/5"><Icon size={16} /></span>
                      <span><span className="block text-xs text-subtle">{label}</span><span className="text-sm">{value}</span></span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="card grid gap-4 p-6 text-sm">
              <p className="flex items-center gap-3 text-muted"><Clock size={16} className="text-cyan" /> Typically responds within a few days</p>
              <p className="flex items-center gap-3 text-muted"><ShieldCheck size={16} className="text-emerald" /> Validated & spam-protected form</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="card relative p-6 md:p-8">
            <h2 className="mb-6 font-display text-xl font-semibold">Send a message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
