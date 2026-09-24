/**
 * Central site configuration. Edit these values to update the whole site.
 * Only add real links — any empty value is hidden automatically.
 */
export const siteConfig = {
  name: "Afzal Pervaiz",
  shortName: "Afzal",
  initials: "AP",
  role: "Junior Full-Stack Developer",
  altRole: "MERN Stack Developer",
  tagline: "I build modern, scalable and user-focused web applications.",
  description:
    "Afzal Pervaiz is a Junior Full-Stack Developer focused on the MERN stack, Next.js and TypeScript — building modern, scalable, user-focused web applications and exploring AI-powered software.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  keywords: [
    "Afzal Pervaiz", "Full-Stack Developer", "MERN Stack Developer", "Next.js", "React",
    "TypeScript", "Node.js", "MongoDB", "Portfolio", "Web Developer",
  ],
  /** Status line shown across the dashboard */
  availability: "Open to learning opportunities & collaboration",
  github: {
    username: "afzalpervaiz1474-cmd",
    url: "https://github.com/afzalpervaiz1474-cmd",
  },
  /** Leave empty strings for anything not configured — UI will hide it. */
  email: "" as string,
  socials: {
    linkedin: "" as string,
    twitter: "" as string,
  },
  resumePath: "/resume",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
  { label: "Future Lab", href: "/future-lab" },
  { label: "Contact", href: "/contact" },
] as const;
