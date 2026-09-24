/** Central editable content for About, Education, Future Lab, Services and the dashboard. */
import type { LucideIcon } from "lucide-react";
import {
  Layers, Server, ShieldCheck, LayoutDashboard, Sparkles, MonitorSmartphone, ShoppingBag, Database, Plug,
  Code2, Puzzle, Hammer, Smartphone, Lock, Network, Bot, Wand2, Workflow, Rocket, Wrench, BrainCircuit,
  Film, Globe,
} from "lucide-react";

export type IconItem = { title: string; description: string; icon: LucideIcon };

export const whatIBuild: IconItem[] = [
  { title: "Full-Stack Applications", description: "End-to-end MERN apps — React interfaces, Node/Express services and MongoDB.", icon: Layers },
  { title: "REST APIs", description: "Clean, predictable endpoints with validation and sensible error handling.", icon: Server },
  { title: "Authentication Systems", description: "Sign-up, login, sessions/tokens and role-based access control.", icon: ShieldCheck },
  { title: "Dashboards", description: "Data-dense admin and analytics interfaces that stay readable.", icon: LayoutDashboard },
  { title: "AI-Powered Applications", description: "Web apps that use AI APIs and agent workflows to do useful work.", icon: Sparkles },
  { title: "Responsive Interfaces", description: "Layouts designed for every screen, from small phones to 4K.", icon: MonitorSmartphone },
];

export const services: IconItem[] = [
  { title: "Responsive Websites", description: "Fast, accessible sites that adapt to any device.", icon: MonitorSmartphone },
  { title: "Full-Stack Web Apps", description: "Frontend, backend and database working as one product.", icon: Layers },
  { title: "REST APIs", description: "Structured Node.js / Express APIs ready for any client.", icon: Server },
  { title: "Authentication", description: "Secure login flows and protected routes.", icon: Lock },
  { title: "Admin Dashboards", description: "Management panels for content, users and data.", icon: LayoutDashboard },
  { title: "E-Commerce Systems", description: "Catalogues, carts and order flows.", icon: ShoppingBag },
  { title: "Database-Driven Apps", description: "MongoDB and SQL-backed applications.", icon: Database },
  { title: "AI-Powered Interfaces", description: "UIs on top of AI models and agents.", icon: Sparkles },
  { title: "API Integrations", description: "Connecting third-party services safely server-side.", icon: Plug },
];

export const principles: IconItem[] = [
  { title: "Clean Code", description: "Readable, well-named, small units that are easy to change.", icon: Code2 },
  { title: "Problem Solving", description: "Break problems down, reason about them, then build.", icon: Puzzle },
  { title: "Learning by Building", description: "Every new concept becomes a working project.", icon: Hammer },
  { title: "Responsive Design", description: "Mobile is a first-class citizen, not an afterthought.", icon: Smartphone },
  { title: "API Integration", description: "Designing and consuming APIs with clear contracts.", icon: Plug },
  { title: "Security Awareness", description: "Validate input, keep secrets server-side, least privilege.", icon: ShieldCheck },
  { title: "Scalable Architecture", description: "Structure code so it can grow without rewrites.", icon: Network },
];

/** Development journey — ordered stages, no invented dates. */
export type JourneyStage = { title: string; status: "done" | "current" | "next"; description: string; tags: string[] };

export const journey: JourneyStage[] = [
  { title: "Web Foundations", status: "done", description: "Started with the fundamentals of the web — semantic HTML, modern CSS and layout.", tags: ["HTML", "CSS", "Responsive Layout"] },
  { title: "JavaScript & Interactivity", status: "done", description: "Learned JavaScript by building interactive projects like a calculator and media interfaces.", tags: ["JavaScript", "DOM", "Events"] },
  { title: "React & Modern Frontend", status: "done", description: "Moved to component-driven UI with React and utility-first styling with Tailwind CSS.", tags: ["React", "Tailwind CSS"] },
  { title: "Backend & Databases", status: "current", description: "Building REST APIs with Node.js and Express, persisting data in MongoDB and learning SQL.", tags: ["Node.js", "Express", "MongoDB", "MySQL"] },
  { title: "Production Full-Stack", status: "current", description: "Next.js, TypeScript, authentication, Docker and CI/CD — shipping apps like a professional.", tags: ["Next.js", "TypeScript", "Auth", "Docker"] },
  { title: "AI-Enabled Development", status: "next", description: "Designing intelligent web apps and AI agents that call tools and automate workflows.", tags: ["AI APIs", "Agents", "Automation"] },
];

export const currentlyBuilding = [
  { title: "E-Commerce Store", detail: "Full-stack MERN store — API & cart flows", progress: "In Development" },
  { title: "AI Agent Experiments", detail: "Agent workflows with server-side AI calls", progress: "In Development" },
  { title: "This Portfolio", detail: "Next.js · TypeScript · R3F · Framer Motion", progress: "Live" },
];

export const exploring = ["Next.js App Router", "TypeScript", "Nest.js", "Docker", "CI/CD", "AI Agents"];

/** Education — accurate status only. Add school names / details here if desired. */
export type EducationItem = { title: string; status: "Completed" | "Current" | "Upcoming"; description: string };

export const education: EducationItem[] = [
  { title: "9th Class", status: "Completed", description: "Secondary education — completed." },
  { title: "10th Class", status: "Completed", description: "Secondary education — completed." },
  { title: "11th Class", status: "Current", description: "Higher secondary education — currently studying." },
  { title: "12th Class", status: "Upcoming", description: "Higher secondary education — next step." },
];

export const learningFocus: IconItem[] = [
  { title: "Programming", description: "JavaScript, TypeScript and Python fundamentals.", icon: Code2 },
  { title: "Web Development", description: "Full-stack apps with the MERN stack and Next.js.", icon: Globe },
  { title: "CS Fundamentals", description: "OOP, data structures and algorithms.", icon: BrainCircuit },
  { title: "Mathematics & Statistics", description: "Logical reasoning and quantitative thinking.", icon: Puzzle },
  { title: "Software Engineering", description: "Architecture, testing, version control and deployment.", icon: Wrench },
];

/** AI & Automation — clearly labelled by status. */
export type AIItem = { title: string; description: string; status: "In Development" | "Concept" | "Exploring"; icon: LucideIcon };

export const aiAreas: AIItem[] = [
  { title: "AI Agents", description: "Goal-driven assistants that plan steps and call tools/APIs.", status: "In Development", icon: Bot },
  { title: "Automation Workflows", description: "Chaining services so repetitive tasks run on their own.", status: "Exploring", icon: Workflow },
  { title: "AI Content Workflows", description: "Pipelines that draft, refine and organise content.", status: "Concept", icon: Wand2 },
  { title: "Media Processing Apps", description: "Tools that transform audio, image and video with AI.", status: "Concept", icon: Film },
  { title: "Intelligent Web Apps", description: "Interfaces that adapt, summarise and assist the user.", status: "Exploring", icon: BrainCircuit },
];

/** Future Lab — ideas only. */
export type FutureIdea = { title: string; category: string; description: string; icon: LucideIcon; stage: "Idea" | "Planned" | "Researching" };

export const futureIdeas: FutureIdea[] = [
  { title: "Autonomous Research Agent", category: "AI Agents", description: "An agent that gathers sources, summarises findings and cites them.", icon: Bot, stage: "Researching" },
  { title: "AI Media Studio", category: "AI Media Tools", description: "Browser tools for captioning, trimming and enhancing media with AI.", icon: Film, stage: "Idea" },
  { title: "Workflow Automation Platform", category: "Automation", description: "Visual builder to connect APIs and trigger automated tasks.", icon: Workflow, stage: "Idea" },
  { title: "Multi-Tenant SaaS Starter", category: "Advanced SaaS", description: "Auth, billing-ready structure, teams and roles out of the box.", icon: Rocket, stage: "Planned" },
  { title: "API Playground CLI", category: "Developer Tools", description: "A developer tool to test, document and mock REST APIs.", icon: Wrench, stage: "Planned" },
  { title: "Smart Study Assistant", category: "Intelligent Web Apps", description: "Helps students plan, revise and quiz themselves with AI.", icon: BrainCircuit, stage: "Idea" },
];
