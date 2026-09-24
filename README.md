# Afzal Pervaiz — Portfolio

A cinematic, dark-first developer portfolio built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis · React Three Fiber**.

## Quick start
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Edit content (no component changes needed)
| What | File |
|---|---|
| Name, role, URLs, GitHub, email, socials | `src/config/site.ts` |
| Skills & honest proficiency labels | `src/data/skills.ts` |
| Projects (stack, features, links, status) | `src/data/projects.ts` |
| Journey, education, services, AI areas, Future Lab | `src/data/content.ts` |

Empty links (email, LinkedIn, repo/live URLs) are hidden automatically — never add placeholder data.
To use real screenshots, replace `ProjectPreview` in `ProjectCard` with `next/image`.

## Environment variables (see `.env.example`)
- `NEXT_PUBLIC_SITE_URL` — canonical URL for metadata, sitemap, OG.
- `GITHUB_TOKEN` *(server-only, optional)* — higher GitHub API rate limit. Falls back to static project cards.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` *(server-only, optional)* — deliver contact messages. Without them, messages are validated and logged server-side.

## Highlights
- Capability-aware 3D (`Scene3D`): lazy-loaded, paused offscreen, "lite" mode on mobile/low-end, static fallback for no-WebGL and `prefers-reduced-motion`.
- Contact API: zod validation + sanitisation, honeypot, time-trap, rate limit, generic error messages.
- SEO: metadata per page, Open Graph image, JSON-LD (Person + WebSite), `sitemap.xml`, `robots.txt`.
- Dark/light theme persisted in `localStorage` with no flash.
- Printable CV at `/resume` (Download → Save as PDF).

## Deploy
Push to GitHub and import on Vercel. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
