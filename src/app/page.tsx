"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";
import { featuredProjects, impactStats, profile, skills } from "~/lib/data";

const categoryColors: Record<
	string,
	{ color: string; bg: string; border: string }
> = {
	"Programming Languages": {
		color: "#f59e0b",
		bg: "rgba(245,158,11,0.08)",
		border: "rgba(245,158,11,0.22)",
	},
	Frontend: {
		color: "#06b6d4",
		bg: "rgba(6,182,212,0.08)",
		border: "rgba(6,182,212,0.22)",
	},
	"Backend & APIs": {
		color: "#10b981",
		bg: "rgba(16,185,129,0.08)",
		border: "rgba(16,185,129,0.22)",
	},
	Databases: {
		color: "#8b5cf6",
		bg: "rgba(139,92,246,0.08)",
		border: "rgba(139,92,246,0.22)",
	},
	"AI / ML": {
		color: "#f43f5e",
		bg: "rgba(244,63,94,0.08)",
		border: "rgba(244,63,94,0.22)",
	},
	"DevOps & Tools": {
		color: "#f97316",
		bg: "rgba(249,115,22,0.08)",
		border: "rgba(249,115,22,0.22)",
	},
};

export default function HomePage() {
	const taggedSkills = skills.flatMap((cat) =>
		cat.items.map((item) => ({ item, colors: categoryColors[cat.category] })),
	);

	return (
		<>
			{/* ===== HERO ===== */}
			<section className="pt-28 pb-14">
				<div className="mx-auto max-w-3xl px-4 sm:px-6">
					<div className="flex items-start justify-between gap-6">
						{/* Text */}
						<div className="min-w-0 flex-1">
							<motion.div
								animate={{ opacity: 1 }}
								className="mb-5 flex items-center gap-2"
								initial={{ opacity: 0 }}
								transition={{ duration: 0.35 }}
							>
								<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
								<span className="text-text-muted text-xs">
									Open to opportunities
								</span>
							</motion.div>

							<motion.h1
								animate={{ opacity: 1, y: 0 }}
								className="mb-1 font-bold text-2xl tracking-tight sm:text-3xl"
								initial={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.35, delay: 0.05 }}
							>
								{profile.name}
							</motion.h1>

							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="mb-5 text-sm text-text-muted"
								initial={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.35, delay: 0.1 }}
							>
								{profile.title} &middot; {profile.location}
							</motion.p>

							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="mb-4 max-w-lg text-sm text-text-secondary leading-relaxed"
								initial={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.35, delay: 0.15 }}
							>
								Building multi-agent AI systems and scalable web applications
								with 2+ years of experience. Proficient in React, Next.js,
								Node.js, Python, and LangChain/LangGraph-based LLM integrations.
							</motion.p>

							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="mb-7 flex flex-wrap items-center gap-1.5"
								initial={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.35, delay: 0.18 }}
							>
								<span className="mr-1 text-[10px] text-text-muted uppercase tracking-widest">
									Seeking
								</span>
								{profile.targetRoles.map((role) => (
									<span
										className="rounded-md border border-accent/20 bg-accent-subtle px-2 py-0.5 font-medium text-[11px] text-accent"
										key={role}
									>
										{role}
									</span>
								))}
							</motion.div>

							<motion.div
								animate={{ opacity: 1 }}
								className="mb-5 flex flex-wrap items-center gap-3"
								initial={{ opacity: 0 }}
								transition={{ duration: 0.35, delay: 0.2 }}
							>
								<Button asChild size="sm">
									<a
										download
										href="/resume.pdf"
										rel="noopener noreferrer"
										target="_blank"
									>
										<Download size={14} />
										Download resume
									</a>
								</Button>
								<Button asChild size="sm" variant="outline">
									<Link href="/contact">
										<Mail size={14} />
										Contact me
									</Link>
								</Button>
							</motion.div>

							<motion.div
								animate={{ opacity: 1 }}
								className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
								initial={{ opacity: 0 }}
								transition={{ duration: 0.35, delay: 0.22 }}
							>
								<a
									className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-text-primary"
									href={profile.github}
									rel="noopener noreferrer"
									target="_blank"
								>
									<GithubIcon size={14} />
									GitHub
								</a>
								<a
									className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-text-primary"
									href={profile.linkedin}
									rel="noopener noreferrer"
									target="_blank"
								>
									<LinkedinIcon size={14} />
									LinkedIn
								</a>
								<a
									className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-text-primary"
									href={`mailto:${profile.email}`}
								>
									<Mail size={14} />
									Email
								</a>
							</motion.div>
						</div>

						{/* Avatar */}
						<motion.div
							animate={{ opacity: 1 }}
							className="shrink-0"
							initial={{ opacity: 0 }}
							transition={{ duration: 0.35, delay: 0.1 }}
						>
							<div className="relative h-18 w-18 overflow-hidden rounded-full ring-1 ring-border sm:h-20 sm:w-20">
								<Image
									alt={profile.name}
									className="object-cover"
									fill
									priority
									src={profile.avatar}
								/>
							</div>
						</motion.div>
					</div>

					{/* Stats row */}
					<motion.div
						animate={{ opacity: 1 }}
						className="mt-10 flex flex-wrap items-center gap-6 border-border border-t pt-6 text-sm"
						initial={{ opacity: 0 }}
						transition={{ duration: 0.35, delay: 0.25 }}
					>
						<div>
							<span className="font-semibold text-text-primary">2+</span>
							<span className="ml-1.5 text-text-muted">years experience</span>
						</div>
						<div>
							<span className="font-semibold text-text-primary">11+</span>
							<span className="ml-1.5 text-text-muted">projects built</span>
						</div>
						<div className="hidden sm:block">
							<span className="text-text-muted">Currently at</span>
							<span className="ml-1.5 font-medium text-text-secondary">
								{profile.company}
							</span>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ===== SELECTED WORK ===== */}
			<section className="border-border border-t py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6">
					<div className="mb-7 flex items-center justify-between">
						<h2 className="font-semibold text-text-muted text-xs uppercase tracking-widest">
							Selected work
						</h2>
						<Link
							className="flex items-center gap-1 text-text-muted text-xs transition-colors hover:text-text-primary"
							href="/projects"
						>
							View all <ArrowRight size={11} />
						</Link>
					</div>
					<div className="flex flex-col gap-6">
						{featuredProjects.map((project, i) => (
							<ProjectCard index={i} key={project.id} project={project} />
						))}
					</div>
				</div>
			</section>

			{/* ===== IMPACT ===== */}
			<section className="border-border border-t py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6">
					<div className="mb-7 flex items-center justify-between">
						<h2 className="font-semibold text-text-muted text-xs uppercase tracking-widest">
							Impact
						</h2>
						<Link
							className="flex items-center gap-1 text-text-muted text-xs transition-colors hover:text-text-primary"
							href="/about#experience"
						>
							View experience <ArrowRight size={11} />
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{impactStats.map((stat) => (
							<div
								className="flex flex-col rounded-lg border border-border bg-surface px-4 py-3.5"
								key={stat.label}
							>
								<span className="font-bold text-text-primary text-xl">
									{stat.value}
								</span>
								<span className="mt-0.5 text-text-muted text-xs">
									{stat.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ===== STACK ===== */}
			<section className="border-border border-t py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6">
					<h2 className="mb-5 font-semibold text-text-muted text-xs uppercase tracking-widest">
						Stack
					</h2>
					<div className="flex flex-wrap gap-2">
						{taggedSkills.slice(0, 24).map(({ item, colors }) => (
							<span
								className="rounded-md px-2.5 py-1 font-medium text-[11px] transition-opacity hover:opacity-80"
								key={item}
								style={
									colors
										? {
												color: colors.color,
												background: colors.bg,
												border: `1px solid ${colors.border}`,
											}
										: {
												color: "var(--color-text-muted)",
												border: "1px solid var(--color-border)",
											}
								}
							>
								{item}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ===== CTA ===== */}
			<section className="border-border border-t py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6">
					<h2 className="mb-2 font-semibold text-base">Get in touch</h2>
					<p className="mb-5 max-w-md text-sm text-text-secondary leading-relaxed">
						I&apos;m open to full-time roles and freelance opportunities. If you
						have something interesting, let&apos;s talk.
					</p>
					<div className="flex items-center gap-3">
						<Button asChild size="sm">
							<Link href="/contact">
								<Mail size={14} />
								Contact me
							</Link>
						</Button>
						<Button asChild size="sm" variant="outline">
							<a
								href={profile.github}
								rel="noopener noreferrer"
								target="_blank"
							>
								<GithubIcon size={14} />
								GitHub
							</a>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
