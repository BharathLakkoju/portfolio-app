// ============================================================
// Portfolio content. Facts follow bharath-portfolio-design-system.md
// (confirmed 20 Oct 2026). Don't add numbers that aren't confirmed.
// ============================================================

export const site = {
	url: "https://bharathlakkoju.vercel.app",
	resume: "/Bharath_Lakkoju_SDEpdf",
	/** Saved-as name, so the download isn't called "resume.pdf". */
	resumeFile: "Bharath_Lakkoju_SDE.pdf",
	resumeLabel: "Download resume (PDF)",
};

export const profile = {
	name: "Bharath Lakkoju",
	firstName: "Bharath",
	roleLine: "AI Engineer · Full Stack Engineer",
	jobTitle: "Software Engineer I",
	location: "Hyderabad, India",
	timeZone: "Asia/Kolkata",
	timeZoneLabel: "IST",
	workMode: "Remote or relocate anywhere in India",
	bio: "I build multi-agent AI systems and the full-stack products around them: RAG pipelines, evaluation harnesses and the Next.js apps people actually use.",
	summary: "AI Engineer building multi-agent systems and full-stack products.",
	email: "lbh.lbharath@gmail.com",
	github: "https://github.com/BharathLakkoju",
	githubUser: "BharathLakkoju",
	linkedin: "https://linkedin.com/in/bharathlakkoju",
	twitter: "https://x.com/twostardev",
	twitterHandle: "@twostardev",
	company: "UST Global",
	targetRoles: ["AI Engineer", "Full-Stack", "Applied AI"],
	/** Set false the day availability changes; the status dot turns grey. */
	openToWork: true,
	availability: "Open to opportunities",
};

/** Rotating hero phrase; the first entry is the server-rendered and resting state. */
export const heroPhrases = [
	"multi-agent systems",
	"RAG pipelines",
	"full-stack products",
	"production-ready software",
];

// ============================================================
// Impact: every number carries a context line
// ============================================================

export type ImpactStat = {
	label: string;
	value: number;
	suffix: string;
	verb: string;
	context: string;
	size: "lead" | "standard" | "wide";
};

export const impactStats: ImpactStat[] = [
	{
		label: "User engagement",
		value: 60,
		suffix: "%",
		verb: "increase",
		context: "Health-tracking app with a reward system",
		size: "lead",
	},
	{
		label: "Data entry accuracy",
		value: 98,
		suffix: "%",
		verb: "accuracy",
		context: "health-tracking app",
		size: "standard",
	},
	{
		label: "Integration effort",
		value: 40,
		suffix: "%",
		verb: "less",
		context: "Contract-driven UI and API (Zod, tRPC, Storybook, MSW)",
		size: "standard",
	},
	{
		label: "Shared components",
		value: 50,
		suffix: "+",
		verb: "shipped",
		context: "Design system for web and mobile member experiences",
		size: "wide",
	},
];

export const marqueeItems: { value?: string; text: string }[] = [
	{ value: "60%", text: "user engagement" },
	{ value: "98%", text: "data entry accuracy" },
	{ value: "50+", text: "shared design system components" },
	{ value: "40%", text: "less integration effort" },
	{ value: "30%", text: "release readiness" },
	{ value: "35%", text: "maintainability" },
	{ value: "40%", text: "AI-integrated engagement" },
	{ value: "11+", text: "projects shipped" },
	{ text: "Software Engineer I at UST Global" },
	{ text: "Based in Hyderabad" },
];

// ============================================================
// Projects: featured work (design system §6.3.1)
// ============================================================

export type ProjectLink = {
	label: string;
	href: string;
	kind: "live" | "code" | "npm" | "site" | "contact";
};

export type ProjectMedia = {
	poster: string;
	mp4?: string;
	webm?: string;
	alt: string;
};

export type Project = {
	slug: string;
	title: string;
	repo: string;
	label: string;
	badge: { text: string; tone: "live" | "neutral" };
	outcome: string;
	roleLine: string;
	stack: string[];
	marginNote: string;
	/** Pipeline steps drawn in the card schematic until a recorded clip exists. */
	steps: string[];
	links: ProjectLink[];
	media?: ProjectMedia;
	caseStudy: {
		problem?: string;
		built: string;
		architecture: string[];
		decisions: string[];
		results?: { title: string; body: string };
		shows?: string;
		next?: string;
	};
};

export const projects: Project[] = [
	{
		slug: "compliance-review-copilot",
		title: "Compliance Review Copilot",
		repo: "complibot",
		label: "Compliance AI",
		badge: { text: "Demo on request", tone: "neutral" },
		outcome:
			"Reviews contracts and policies against GDPR, SOC 2, ISO 27001 and HIPAA; every finding cites a verified span of the source.",
		roleLine: "Solo build · AI review pipeline, full stack, infra",
		stack: [
			"Next.js 16",
			"React 19",
			"Tailwind 4",
			"FastAPI",
			"async SQLAlchemy",
			"Postgres",
			"WebSockets",
			"Docker",
			"AWS EC2",
			"Terraform",
			"Caddy",
		],
		marginNote: "↑ cite it or discard it",
		steps: ["Upload", "Ingest", "Match", "Cite", "Review"],
		links: [
			{ label: "Request a demo", href: "/contact", kind: "contact" },
			{
				label: "Code",
				href: "https://github.com/BharathLakkoju/complibot",
				kind: "code",
			},
		],
		caseStudy: {
			problem:
				"Compliance review means checking long documents against several frameworks, and a reviewer can't trust a finding they can't trace back to the text.",
			built:
				"A review copilot that checks an uploaded contract or policy against versioned framework rule packs, streams findings live over WebSockets, and lets reviewers accept or reject each one.",
			architecture: [
				"Upload",
				"Ingest · FastAPI + worker",
				"Match · versioned rule pack",
				"Cite · span verified or discarded",
				"Stream · WebSocket",
				"Review · accept / reject in Postgres",
			],
			decisions: [
				"Frameworks are versioned rule packs, not prompts.",
				"Citation or discard: a finding without a mechanically verified source span never reaches the reviewer, including control-ID alias normalisation.",
				"Reviewer accept and reject decisions persist.",
				"An eval harness and pluggable model providers.",
				"YAML schemas drive code generation across the monorepo.",
			],
			results: {
				title: "Verified end to end",
				body: "Passed a 5-round QA on 18 Oct 2026. In the full flow, an uploaded policy produced 4 GDPR findings with highlighted citations, and reviewer decisions persisted.",
			},
			next: "Deploy behind auth for pilot reviewers.",
		},
	},
	{
		slug: "youtube-research-agent",
		title: "YouTube Research Agent",
		repo: "tubecp",
		label: "AI product",
		badge: { text: "Live", tone: "live" },
		outcome:
			"Turns a research topic into a chat-able knowledge base, with sources and timestamps.",
		roleLine: "Solo build · AI product, payments, production ops",
		stack: [
			"Next.js",
			"Auth.js",
			"Neon Postgres",
			"Upstash Redis",
			"Polar",
			"Sentry",
			"Resend",
			"OpenRouter",
			"YouTube Data API",
		],
		marginNote: "↑ paid tiers, quotas in Redis",
		steps: ["Topic", "YouTube API", "Knowledge base", "Chat", "Sources"],
		links: [
			{ label: "Live", href: "https://tubecp.vercel.app", kind: "live" },
			{
				label: "Code",
				href: "https://github.com/BharathLakkoju/tubecp",
				kind: "code",
			},
		],
		caseStudy: {
			built:
				"Topic in, videos found through the YouTube Data API, then a knowledge base you can chat with, where every answer points to its source and timestamp.",
			architecture: [
				"Topic",
				"YouTube Data API",
				"Knowledge base · Neon Postgres",
				"Chat · OpenRouter",
				"Answer · source + timestamp",
			],
			decisions: [
				"Tiered quotas (Free, Pro $9, Researcher $19, Team $49) enforced in Redis.",
				"Polar for payments, driven by webhooks.",
				"A pre-deploy validate script, production smoke tests and an /api/health endpoint.",
			],
			shows: "A shipped, paid AI product with production guardrails.",
		},
	},
	{
		slug: "ats-resume-evaluator",
		title: "ATS Resume Evaluator",
		repo: "atsprecise",
		label: "Full stack",
		badge: { text: "Live", tone: "live" },
		outcome:
			"Deterministic, weighted resume-to-job scoring with section-by-section gap analysis. ₹99 per report.",
		roleLine: "Solo build · Full stack, scoring engine",
		stack: [
			"Next.js 16",
			"Supabase",
			"Drizzle",
			"Zod",
			"mammoth",
			"unpdf",
			"jspdf",
		],
		marginNote: "↑ ₹99 per report",
		steps: ["Resume", "Parse", "Match JD", "Score", "PDF report"],
		links: [
			{ label: "Live", href: "https://atsprecise.vercel.app", kind: "live" },
			{
				label: "Code",
				href: "https://github.com/BharathLakkoju/atsprecise",
				kind: "code",
			},
		],
		caseStudy: {
			built:
				"Upload a resume (DOCX or PDF, parsed with mammoth and unpdf), paste a job description, and get a weighted score across keywords, skills, sections and formatting, a gap analysis per section, and a PDF report.",
			architecture: [
				"Resume · DOCX / PDF",
				"Parse · mammoth + unpdf",
				"Validate · Zod",
				"Score · weighted, deterministic",
				"Report · jspdf",
			],
			decisions: [
				"Deterministic scoring, so the same inputs always give the same score.",
				"Zod-validated inputs at every boundary.",
				"A paid per-report model.",
			],
			shows: "A live, paid product with explainable scoring.",
		},
	},
	{
		slug: "nvault",
		title: "Open-source secrets CLI (nvault)",
		repo: "nvault",
		label: "Open source CLI",
		badge: { text: "npm 0.2.0", tone: "neutral" },
		outcome:
			"An open-source secrets CLI published on npm, released through Trusted Publishing (OIDC).",
		roleLine: "Solo build · Open source, CLI, release engineering",
		stack: ["TypeScript", "Node.js", "CLI", "GitHub Actions", "npm OIDC"],
		marginNote: "↑ dry-run publish on every PR",
		steps: ["Pull request", "Dry-run", "OIDC", "npm publish"],
		links: [
			{
				label: "npm",
				href: "https://www.npmjs.com/package/@lbharath/nvault",
				kind: "npm",
			},
			{ label: "Site", href: "https://nvaults.vercel.app", kind: "site" },
			{
				label: "Code",
				href: "https://github.com/BharathLakkoju/nvault",
				kind: "code",
			},
		],
		caseStudy: {
			built:
				"Published as @lbharath/nvault 0.2.0 and released from GitHub Actions with npm Trusted Publishing, so there's no long-lived token to leak.",
			architecture: [
				"Pull request",
				"CI · publish dry-run",
				"Release · GitHub Actions",
				"OIDC · Trusted Publishing",
				"npm · @lbharath/nvault",
			],
			decisions: [
				"npm Trusted Publishing (OIDC) instead of a stored token.",
				"CI runs a publish dry-run on every pull request.",
			],
			shows: "Open-source shipping and supply-chain-safe releases.",
		},
	},
	{
		slug: "depguard",
		title: "Dependency health scanner (DepGuard)",
		repo: "depguard",
		label: "Open source CLI",
		badge: { text: "npm 1.2.0", tone: "neutral" },
		outcome:
			"One command that scans a project for outdated, vulnerable, deprecated and stale packages across npm, pip, Cargo and Go.",
		roleLine: "Solo build · Open source, CLI, multi-ecosystem scanning",
		stack: ["TypeScript", "Node.js", "Commander.js", "tsup", "OSV.dev", "CLI"],
		marginNote: "↑ --fail-on-high gates CI",
		steps: ["Detect", "Scan", "Enrich", "Report"],
		links: [
			{
				label: "npm",
				href: "https://www.npmjs.com/package/@lbharath/depguard",
				kind: "npm",
			},
			{
				label: "Code",
				href: "https://github.com/BharathLakkoju/depguard",
				kind: "code",
			},
		],
		caseStudy: {
			problem:
				"Dependency health is scattered: one tool for outdated versions, another for audits, and nothing at all for deprecated or abandoned packages, least of all across several languages.",
			built:
				"A universal scanner CLI published as @lbharath/depguard. It detects the package manager from the manifest or lockfile, then reports outdated versions, known vulnerabilities, deprecated or yanked releases and stale packages, in a terminal, JSON or Markdown report.",
			architecture: [
				"Detect · package manager from manifest / lockfile",
				"Scan · per-ecosystem engine",
				"Normalise · one dependency model, semver diffing",
				"Enrich · OSV.dev, registry deprecation, publish dates",
				"Report · terminal, JSON or Markdown",
			],
			decisions: [
				"Covers npm, pnpm, yarn and bun, plus pip, Poetry, Pipenv, conda, Cargo and Go modules.",
				"Vulnerabilities come from OSV.dev for every ecosystem, with native audits layered on for JavaScript.",
				"--fail-on-high exits non-zero, so it can gate a CI pipeline.",
				"Monorepo workspace scanning (--workspace) for JavaScript projects.",
				"Known limits are documented in the README rather than hidden.",
			],
			shows:
				"Tooling that works across ecosystems, shipped as an installable package.",
		},
	},
];

export function getProject(slug: string) {
	return projects.find((p) => p.slug === slug);
}

// ============================================================
// Stack: four groups, neutral chips with a colored group dot
// ============================================================

export type StackGroup = {
	label: string;
	dot: "ai" | "lang" | "frontend" | "backend";
	items: string[];
};

export const stackGroups: StackGroup[] = [
	{
		label: "AI & Agents",
		dot: "ai",
		items: [
			"LangChain",
			"LangGraph",
			"CrewAI",
			"RAG pipelines",
			"OpenAI API",
			"Claude",
			"Gemini API",
			"Ollama",
			"pgvector",
		],
	},
	{
		label: "Languages",
		dot: "lang",
		items: ["TypeScript", "JavaScript", "Python", "SQL"],
	},
	{
		label: "Frontend",
		dot: "frontend",
		items: [
			"React",
			"Next.js",
			"Tailwind CSS",
			"Framer Motion",
			"Redux",
			"Zustand",
			"React Native",
		],
	},
	{
		label: "Backend",
		dot: "backend",
		items: [
			"Node.js",
			"NestJS",
			"Express",
			"FastAPI",
			"PostgreSQL",
			"MongoDB",
			"Redis",
			"Docker",
			"GitHub Actions",
			"Terraform",
		],
	},
];

// ============================================================
// Experience
// ============================================================

export type WorkMetric = {
	/** A number counts up; a string (e.g. "Java → NestJS") renders as-is. */
	value: number | string;
	prefix?: string;
	suffix?: string;
	label: string;
};

export type Workstream = {
	id: string;
	name: string;
	metrics: WorkMetric[];
	summary: string;
	stack: string[];
};

export type Role = {
	title: string;
	org: string;
	location: string;
	dates: string;
	/** ISO month the role began; drives the live tenure label. */
	start: string;
	current: boolean;
	summary: string;
	workstreams: Workstream[];
};

export const experience: Role[] = [
	{
		title: "Software Engineer I",
		org: "UST Global",
		location: "Hyderabad, India",
		dates: "Sep 2024 — Present",
		start: "2024-09",
		current: true,
		summary:
			"Full-stack delivery on a multi-tenant healthcare portal—from UI through APIs—with migrations, shared design system work, and contract-driven releases.",
		workstreams: [
			{
				id: "health",
				name: "Health-tracking app",
				metrics: [
					{ value: 60, prefix: "+", suffix: "%", label: "user engagement" },
					{ value: 98, suffix: "%", label: "data entry accuracy" },
				],
				summary:
					"Shipped a full-stack health tracking app with a rewards system on React Native, Node.js, and PostgreSQL.",
				stack: ["React Native", "Node.js", "PostgreSQL"],
			},
			{
				id: "portal",
				name: "Healthcare portal",
				metrics: [
					{ value: "Multi-tenant", label: "feature-flag rollout" },
				],
				summary:
					"Owned UI-to-API delivery for portal features in an Nx monorepo (React Native, NestJS, tRPC) and enabled tenant-by-tenant rollout with feature flags.",
				stack: ["Nx", "React Native", "TypeScript", "NestJS", "tRPC"],
			},
			{
				id: "migration",
				name: "Service migration",
				metrics: [
					{ value: 35, prefix: "+", suffix: "%", label: "maintainability" },
				],
				summary:
					"Moved legacy Java Spring Boot services to NestJS and Node.js microservices, with API security standards and unit tests.",
				stack: ["Spring Boot", "NestJS", "Node.js"],
			},
			{
				id: "rn-migration",
				name: "Cross-platform UI",
				metrics: [
					{ value: "React → RN", label: "member app migration" },
				],
				summary:
					"Ported React.js web components to React Native so members get the same flows on web and mobile, including deep-link navigation fixes.",
				stack: ["React.js", "React Native"],
			},
			{
				id: "design-system",
				name: "Design system",
				metrics: [
					{ value: 50, prefix: "", suffix: "+", label: "shared components" },
				],
				summary:
					"Built 50+ custom shared components for the design system—reusable UI patterns and bilingual copy on web and mobile.",
				stack: ["Design system", "React Native", "React"],
			},
			{
				id: "contracts",
				name: "Contract-driven delivery",
				metrics: [
					{ value: 40, prefix: "−", suffix: "%", label: "integration effort" },
					{
						value: 30,
						prefix: "+",
						suffix: "%",
						label: "release readiness",
					},
				],
				summary:
					"Built contract-driven UI and API layers with Zod and tRPC, documented in Storybook and exercised with MSW before release.",
				stack: ["Zod", "tRPC", "Storybook", "MSW"],
			},
			{
				id: "chatbot",
				name: "AI chatbot",
				metrics: [
					{
						value: 40,
						prefix: "+",
						suffix: "%",
						label: "AI-integrated engagement",
					},
				],
				summary:
					"Designed chatbot experiences on LLM APIs and predictive analytics to increase engagement and speed up support responses.",
				stack: ["LLM APIs", "Predictive analytics"],
			},
		],
	},
];

export const navLinks = [
	{ href: "/", label: "Home", key: "H" },
	{ href: "/about", label: "About", key: "A" },
	{ href: "/projects", label: "Projects", key: "P" },
	{ href: "/blog", label: "Blog", key: "B" },
	{ href: "/contact", label: "Contact" },
] as const;
