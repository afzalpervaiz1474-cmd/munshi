/**
 * Project data — edit freely. Fields marked optional are hidden when empty.
 * IMPORTANT: Only list features, stacks and links that are actually true.
 * `repoUrl` / `liveUrl` are intentionally empty until verified.
 */
export type ProjectStatus = "Completed" | "In Development" | "Concept";
export type ProjectCategory = "Full-Stack" | "Frontend" | "E-Commerce" | "AI & Automation";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  kind: "Personal Project" | "Learning Project" | "Experiment";
  status: ProjectStatus;
  featured?: boolean;
  /** Visual theme for the generated preview */
  preview: "store" | "music" | "calculator" | "marketplace" | "agent";
  stack: string[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture?: { frontend?: string[]; backend?: string[]; database?: string[]; auth?: string[] };
  flow?: string[];
  challenges?: string[];
  learnings?: string[];
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "ecommerce-store",
    title: "E-Commerce Store",
    tagline: "A full-stack online store built to practice real commerce flows.",
    category: "Full-Stack",
    kind: "Personal Project",
    status: "In Development",
    featured: true,
    preview: "store",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    overview:
      "An online store application used to learn how the pieces of a MERN application fit together — from browsing a catalogue to managing a cart.",
    problem:
      "Tutorial-sized apps rarely show how frontend state, APIs and a database work together in a single product.",
    solution:
      "Build a store end-to-end: a React interface talking to an Express REST API backed by MongoDB.",
    features: ["Product listing and product detail views", "Shopping cart", "Responsive layout for mobile and desktop"],
    architecture: {
      frontend: ["React", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "REST API"],
      database: ["MongoDB"],
    },
    flow: ["Client (React)", "REST API (Express)", "Business logic", "MongoDB"],
    challenges: ["Keeping cart state consistent across pages", "Structuring API routes cleanly"],
    learnings: ["Designing REST endpoints", "Connecting a React client to a Node backend"],
  },
  {
    slug: "spotify-style-music-app",
    title: "Spotify-Style Music App",
    tagline: "A music player interface inspired by Spotify.",
    category: "Frontend",
    kind: "Learning Project",
    status: "Completed",
    preview: "music",
    stack: ["HTML", "CSS", "JavaScript"],
    overview:
      "A Spotify-inspired music application focused on recreating a polished, familiar media interface in the browser.",
    problem: "Media interfaces combine layout complexity with interactive state — a great way to practise DOM work.",
    solution: "Recreate the core player layout and controls with semantic HTML, modern CSS and vanilla JavaScript.",
    features: ["Music player layout with playlist/sidebar UI", "Play / pause controls", "Responsive styling"],
    architecture: { frontend: ["HTML", "CSS", "JavaScript"] },
    flow: ["UI events", "Player state", "Audio element", "UI update"],
    learnings: ["Working with the HTML audio API", "Complex CSS layouts"],
  },
  {
    slug: "amazon-style-ecommerce",
    title: "Amazon-Style E-Commerce",
    tagline: "A marketplace interface modelled on Amazon.",
    category: "E-Commerce",
    kind: "Learning Project",
    status: "Completed",
    preview: "marketplace",
    stack: ["HTML", "CSS", "JavaScript"],
    overview: "An Amazon-inspired storefront interface built to practise dense, content-heavy commercial layouts.",
    problem: "Large marketplace pages need a clear visual hierarchy across many products and sections.",
    solution: "Recreate the storefront structure with reusable sections and a responsive grid.",
    features: ["Header with navigation and search bar UI", "Product grid sections", "Responsive layout"],
    architecture: { frontend: ["HTML", "CSS", "JavaScript"] },
    learnings: ["CSS grid & flexbox at scale", "Reusable UI sections"],
  },
  {
    slug: "calculator-app",
    title: "Calculator Application",
    tagline: "A clean calculator with keyboard-friendly interaction.",
    category: "Frontend",
    kind: "Learning Project",
    status: "Completed",
    preview: "calculator",
    stack: ["HTML", "CSS", "JavaScript"],
    overview: "A calculator application built to practise JavaScript logic, event handling and UI state.",
    problem: "Turning button presses into correct arithmetic requires careful input and state handling.",
    solution: "A small, well-structured JavaScript state model that drives a responsive calculator UI.",
    features: ["Basic arithmetic operations", "Clear and delete controls", "Responsive button grid"],
    architecture: { frontend: ["HTML", "CSS", "JavaScript"] },
    flow: ["Button input", "Parse expression", "Compute", "Render result"],
    learnings: ["Event handling", "Managing UI state without a framework"],
  },
  {
    slug: "ai-agent-projects",
    title: "AI Agent Projects",
    tagline: "Experiments with AI agents and intelligent workflows.",
    category: "AI & Automation",
    kind: "Experiment",
    status: "In Development",
    featured: true,
    preview: "agent",
    stack: ["Next.js", "TypeScript", "Node.js", "AI APIs"],
    overview:
      "An ongoing set of experiments exploring AI agents — applications that take a goal, call tools and APIs, and return useful results.",
    problem: "Most AI demos stop at a chat box; real products need structured workflows, tools and good UX.",
    solution:
      "Explore agent patterns in a web app: a Next.js interface, server-side API routes that keep keys private, and third-party AI APIs.",
    features: ["Web interface for interacting with an agent", "Server-side API calls (keys never reach the browser)"],
    architecture: {
      frontend: ["Next.js", "TypeScript"],
      backend: ["Next.js API routes", "Node.js"],
      auth: ["Server-side environment variables for API keys"],
    },
    flow: ["User goal", "Server route", "AI model / tools", "Structured response"],
    challenges: ["Designing reliable prompts and tool calls", "Handling latency and errors gracefully"],
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = ["All", "Full-Stack", "Frontend", "E-Commerce", "AI & Automation"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
