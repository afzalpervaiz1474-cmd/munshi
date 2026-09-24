import type { MetadataRoute } from "next";
import { siteConfig, navItems } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...navItems.map((n) => ({ url: `${siteConfig.url}${n.href === "/" ? "" : n.href}`, lastModified: now, priority: n.href === "/" ? 1 : 0.8 })),
    { url: `${siteConfig.url}/resume`, lastModified: now, priority: 0.7 },
    ...projects.map((p) => ({ url: `${siteConfig.url}/projects/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
