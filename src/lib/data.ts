// ============================================================
// Portfolio data — sourced from profile-content.json + resume.json
// ============================================================

export const profile = {
  name: "Bharath Lakkoju",
  firstName: "Bharath",
  title: "Full Stack Developer & AI Engineer",
  tagline: "Building AI-powered products and scalable web apps",
  bio: "Full Stack Developer with 2+ years of experience architecting scalable web applications and integrating AI-driven predictive analytics. Proficient in React, Next.js, Node.js, TypeScript, PostgreSQL, and MongoDB — with a proven track record of reducing API latency by 40% and increasing user engagement by 60%. I ship fast, test well, and care deeply about developer experience.",
  location: "Hyderabad, India",
  email: "lbh.lbharath@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/73902405?v=4",
  github: "https://github.com/BharathLakkoju",
  linkedin: "https://linkedin.com/in/bharathlakkoju",
  company: "UST Global",
};

// ============================================================
// Projects — only high-weight portfolio projects (importance 5+)
// ============================================================

export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  category: "fullstack" | "ai" | "tools" | "microservices";
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "greensource",
    name: "GreenSource",
    description:
    "Microservices-based agricultural marketplace — 7 Node.js services behind an API gateway, 3 React frontends, MongoDB Atlas, JWT auth, and live Mandi price data. Farmers list produce, consumers order, delivery agents track, admins manage.",
    tech: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Redux", "Microservices", "JWT", "Vite"],
    github: "https://github.com/BharathLakkoju/greensource",
    live: null,
    category: "microservices",
    featured: true,
  },
  {
    id: "flatmate",
    name: "Flatmate",
    description:
    "Full-stack shared living management app — expense splitting, grocery lists, meal planner with OCR receipt scanning, task manager, household calendar, and Google Gemini AI integration. Includes Vitest unit tests and Playwright E2E tests.",
    tech: ["Next.js", "TypeScript", "Supabase", "Drizzle ORM", "Zustand", "shadcn/ui", "Framer Motion", "Playwright", "Vitest"],
    github: "https://github.com/BharathLakkoju/flatmate",
    live: "https://adjustyouflat.vercel.app",
    category: "fullstack",
    featured: true,
  },
  {
    id: "atsprecise",
    name: "ATS Precision",
    description:
    "AI-powered ATS resume evaluator — upload your resume, paste a job description, and get a precision compatibility score with keyword gap analysis, section-by-section feedback, and role-specific improvement suggestions. PDF report download included.",
    tech: ["Next.js", "TypeScript", "Supabase", "Drizzle ORM", "Framer Motion", "Radix UI", "Zustand", "Zod"],
    github: "https://github.com/BharathLakkoju/atsprecise",
    live: "https://atsprecise.vercel.app",
    category: "ai",
    featured: false,
  },
  {
    id: "waigenie",
    name: "Waigenie.tech",
    description:
      "Full-stack SaaS platform — an AI-powered software testing toolkit with 5 AI tools in a protected dashboard: IdeaForge, AutoScribe, CucumberCraft, DomDetective, and WebTrekker. Credit-based billing via Razorpay, full auth (email, Google, GitHub OAuth), and complete marketing site.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Auth.js", "Prisma", "PostgreSQL", "Zustand", "shadcn/ui", "Razorpay"],
    github: null,
    live: null,
    category: "fullstack",
    featured: true,
  },
  {
    id: "job-hunter",
    name: "Job Hunter Web",
    description:
      "Personal job intelligence dashboard — aggregates jobs every 4 hours from Indeed, Naukri, and Wellfound, scores them by hiring probability (0–100%), sends Telegram alerts for top matches (≥ 80%), and tracks application status.",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Drizzle ORM", "Zustand", "shadcn/ui", "Telegraf"],
    github: "https://github.com/BharathLakkoju/job-hunter-web",
    live: "https://job-hunter-web-three.vercel.app",
    category: "ai",
    featured: false,
  },
  {
    id: "swiftmedia",
    name: "SwiftMedia",
    description:
      "Privacy-first browser-based media toolkit — compress images, videos (FFmpeg WebAssembly), and PDFs; merge PDFs; convert images to PDF. Zero server uploads — all processing runs client-side in the browser.",
    tech: ["Next.js", "TypeScript", "WebAssembly", "FFmpeg", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/BharathLakkoju/swiftmedia",
    live: "https://swiftmedia-nine.vercel.app",
    category: "tools",
    featured: false,
  },
  {
    id: "dvelve",
    name: "Dvelve",
    description:
      "Local-first AI research assistant powered by Ollama. Enter a topic and get a structured, multi-source research report generated by a 5-agent AI pipeline — all running on your machine. Built with FastAPI, React, and Go.",
    tech: ["TypeScript", "React", "Python", "FastAPI", "Go", "Ollama", "SQLite", "Zustand", "Vite"],
    github: "https://github.com/BharathLakkoju/Dvelve",
    live: null,
    category: "ai",
    featured: false,
  },
  {
    id: "gitprofolio",
    name: "GitProfolio",
    description:
      "Open-source Astro app that transforms a GitHub profile into a structured, enriched JSON portfolio. Fetches repos, parses READMEs, detects tech stacks, extracts live links, and scores projects using heuristics + LLM analysis.",
    tech: ["Astro", "TypeScript", "GitHub API", "LLM", "AI", "Vercel"],
    github: "https://github.com/BharathLakkoju/gitprofolio",
    live: "https://gitprofolio.vercel.app",
    category: "tools",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// ============================================================
// Skills — from resume.json
// ============================================================

export type SkillCategory = {
  category: string;
  icon: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "code-2",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Zustand", "HTML5/CSS3", "Framer Motion"],
  },
  {
    category: "Backend & APIs",
    icon: "server",
    items: ["Node.js", "Express.js", "RESTful APIs", "Microservices", "GraphQL", "API Security"],
  },
  {
    category: "Databases",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Drizzle ORM", "Supabase"],
  },
  {
    category: "AI / ML",
    icon: "brain",
    items: ["OpenAI API", "Claude AI", "Gemini API", "LLM Integration", "LangChain", "Ollama"],
  },
  {
    category: "DevOps & Tools",
    icon: "git-branch",
    items: ["CI/CD Pipelines", "Docker", "Git", "Vercel", "GitHub Actions", "Agile/Scrum"],
  },
];

// ============================================================
// Experience — from resume.json
// ============================================================

export type Experience = {
  company: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "UST Global",
    title: "Developer I",
    dates: "Sep 2024 – Present",
    location: "Hyderabad, India",
    bullets: [
      "Architected and deployed a full-stack health tracking app using React Native, Node.js, and PostgreSQL — implementing a reward system that increased user engagement by 60% and improved data intake by 98%.",
      "Engineered a scalable Angular + Node.js microservices architecture with WCS data integration, deploying an automated digitization banner that reduced manual processing overhead by 75%.",
      "Developed and integrated an AI-powered chatbot leveraging predictive analytics and LLM APIs, boosting monthly active users by 40% and enhancing real-time customer support.",
      "Spearheaded migration of legacy Java Spring services to Node.js and NestJS microservices — establishing API security standards and improving system maintainability by 35%.",
      "Collaborated in Agile sprints, conducted rigorous code reviews, and optimized CI/CD pipelines to achieve 99% deployment uptime.",
    ],
  },
];

// ============================================================
// Education
// ============================================================

export const education = [
  {
    institution: "MVGR College of Engineering",
    degree: "B.Tech — Information Technology",
    year: "2020 – 2024",
    gpa: "8.10 / 10",
  },
];
