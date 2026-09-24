/**
 * Skill data. Only HTML, CSS and JavaScript have confirmed percentages.
 * For everything else use an honest proficiency label — never invent numbers.
 */
export type SkillLevel = "Familiar" | "Working Knowledge" | "Learning" | "Focus Area";

export type Skill = {
  name: string;
  /** Only set when an exact, verified value exists */
  percent?: number;
  level?: SkillLevel;
  note?: string;
};

export type SkillCategoryData = {
  id: string;
  title: string;
  description: string;
  accent: "cyan" | "violet" | "emerald" | "amber";
  skills: Skill[];
};

export const skillCategories: SkillCategoryData[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that are fast, accessible and responsive.",
    accent: "cyan",
    skills: [
      { name: "HTML", percent: 95 },
      { name: "CSS", percent: 80 },
      { name: "JavaScript", percent: 85 },
      { name: "React", level: "Working Knowledge" },
      { name: "Next.js", level: "Focus Area" },
      { name: "TypeScript", level: "Learning" },
      { name: "Tailwind CSS", level: "Working Knowledge" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server logic, routing and API design.",
    accent: "violet",
    skills: [
      { name: "Node.js", level: "Working Knowledge" },
      { name: "Express.js", level: "Working Knowledge" },
      { name: "Nest.js", level: "Learning" },
      { name: "REST APIs", level: "Working Knowledge" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Modelling and persisting application data.",
    accent: "emerald",
    skills: [
      { name: "MongoDB", level: "Working Knowledge" },
      { name: "MySQL", level: "Familiar" },
      { name: "Relational Concepts", level: "Familiar" },
    ],
  },
  {
    id: "concepts",
    title: "Programming & Concepts",
    description: "Foundations that make code maintainable.",
    accent: "amber",
    skills: [
      { name: "Python", level: "Familiar" },
      { name: "OOP", level: "Working Knowledge" },
      { name: "Data Structures & Algorithms", level: "Learning", note: "Basics" },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    description: "Shipping, versioning and deploying.",
    accent: "cyan",
    skills: [
      { name: "Git / GitHub", level: "Working Knowledge" },
      { name: "Docker", level: "Learning" },
      { name: "CI/CD", level: "Learning" },
      { name: "Vercel", level: "Working Knowledge" },
      { name: "Render", level: "Familiar" },
    ],
  },
  {
    id: "other",
    title: "Other Areas",
    description: "Cross-cutting skills for real-world apps.",
    accent: "violet",
    skills: [
      { name: "Auth & Authorization", level: "Working Knowledge" },
      { name: "API Integration", level: "Working Knowledge" },
      { name: "Responsive UI", level: "Working Knowledge" },
      { name: "Modern Web Architecture", level: "Learning" },
      { name: "AI-Powered Apps", level: "Focus Area" },
    ],
  },
];

export const levelMeta: Record<SkillLevel, { dots: number; tone: string; description: string }> = {
  "Working Knowledge": { dots: 3, tone: "text-emerald", description: "Used in projects" },
  "Focus Area": { dots: 3, tone: "text-cyan", description: "Actively deepening" },
  Familiar: { dots: 2, tone: "text-violet", description: "Comfortable with basics" },
  Learning: { dots: 1, tone: "text-amber", description: "Currently studying" },
};

export const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.id })));

/** Highlights shown on the home dashboard / orbit */
export const coreStack = ["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind", "Git"];
