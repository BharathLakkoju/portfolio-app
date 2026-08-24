import { Building2, Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import {
	AnimatedSection,
	StaggerChildren,
} from "~/components/shared/AnimatedSection";
import { LeetCodeCard } from "~/components/shared/LeetCodeCard";
import { PlatformCard } from "~/components/shared/PlatformCard";
import { SkillCard } from "~/components/shared/SkillCard";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { getCodeforcesStats } from "~/lib/codeforces";
import { education, experience, profile, skills } from "~/lib/data";
import { getGfgStats } from "~/lib/geeksforgeeks";
import { getHackerRankStats } from "~/lib/hackerrank";
import { getLeetCodeStats } from "~/lib/leetcode";

export const metadata: Metadata = {
	title: "About",
	description: `Learn more about ${profile.name} — AI Engineer and Full Stack Engineer.`,
};

export default async function AboutPage() {
	const [leetcodeStats, codeforcesStats, hackerrankStats, gfgStats] =
		await Promise.all([
			getLeetCodeStats(),
			getCodeforcesStats(),
			getHackerRankStats(),
			getGfgStats(),
		]);

	return (
		<div className="pt-24 pb-16">
			<div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6">
				{/* ── Intro ── */}
				<AnimatedSection>
					<div className="flex items-start gap-5">
						<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
							<Image
								alt={profile.name}
								className="rounded-full object-cover"
								fill
								src={profile.avatar}
							/>
						</div>
						<div>
							<h1 className="mb-1 font-bold text-xl">{profile.name}</h1>
							<p className="mb-3 text-sm text-text-secondary">
								{profile.title}
							</p>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-muted text-xs">
								<span className="flex items-center gap-1">
									<MapPin size={11} />
									{profile.location}
								</span>
								<span className="flex items-center gap-1">
									<Building2 size={11} />
									{profile.company}
								</span>
							</div>
						</div>
					</div>
				</AnimatedSection>

				{/* ── Bio ── */}
				<AnimatedSection delay={0.05}>
					<div className="space-y-3 border-border border-t pt-10 text-sm text-text-secondary leading-relaxed">
						<p>
							AI Engineer and Full Stack Engineer currently at{" "}
							<span className="text-text-primary">UST Global</span> in
							Hyderabad. I specialise in building multi-agent AI systems and
							production-grade web applications using the modern JavaScript and
							Python ecosystems.
						</p>
						<p>
							My work spans AI orchestration platforms, RAG pipelines,
							microservices architectures, and SaaS tools. I care about
							performance, developer experience, and shipping things that work
							at scale.
						</p>
						<p>
							Open-source side projects:{" "}
							<Link
								className="border-text-primary border-b border-dashed text-text-primary"
								href="https://github.com/bharathlakkoju/nexusflow"
							>
								NexusFlow
							</Link>
							,{" "}
							<Link
								className="border-text-primary border-b border-dashed text-text-primary"
								href="https://github.com/bharathlakkoju/gitprofolio"
							>
								GitProfolio
							</Link>
							,{" "}
							<Link
								className="border-text-primary border-b border-dashed text-text-primary"
								href="https://github.com/bharathlakkoju/flatmate"
							>
								Flatmate
							</Link>
							, and{" "}
							<Link
								className="border-text-primary border-b border-dashed text-text-primary"
								href="https://github.com/bharathlakkoju/atsprecise"
							>
								ATS Precision
							</Link>
							.
						</p>
					</div>
				</AnimatedSection>

				{/* ── Skills ── */}
				<AnimatedSection delay={0.05}>
					<div className="border-border border-t pt-10">
						<p className="mb-6 text-[10px] text-text-muted uppercase tracking-widest">
							Stack
						</p>
						<StaggerChildren
							className="grid grid-cols-1 gap-3 sm:grid-cols-2"
							staggerDelay={0.06}
						>
							{skills.map((cat) => (
								<SkillCard cat={cat} key={cat.category} />
							))}
						</StaggerChildren>
					</div>
				</AnimatedSection>

				{/* ── Problem Solving ── */}
				<AnimatedSection delay={0.05}>
					<div
						className="scroll-mt-20 border-border border-t pt-10"
						id="problem-solving"
					>
						<p className="mb-6 text-[10px] text-text-muted uppercase tracking-widest">
							Problem Solving
						</p>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<LeetCodeCard stats={leetcodeStats} />
							<PlatformCard
								name="Codeforces"
								primary={
									codeforcesStats
										? { value: codeforcesStats.solvedCount, label: "solved" }
										: undefined
								}
								profileUrl={codeforcesStats?.profileUrl}
								stats={
									codeforcesStats
										? [
												{
													label: "Rating",
													value: codeforcesStats.rating ?? "Unrated",
												},
												...(codeforcesStats.maxRating
													? [
															{
																label: "Max",
																value: codeforcesStats.maxRating,
															},
														]
													: []),
											]
										: []
								}
								unavailable={!codeforcesStats}
							/>
							<PlatformCard
								name="HackerRank"
								primary={
									hackerrankStats
										? { value: hackerrankStats.level, label: "level" }
										: undefined
								}
								profileUrl={hackerrankStats?.profileUrl}
								stats={
									hackerrankStats
										? hackerrankStats.badges.map((b) => ({
												label: b.name,
												value: `${b.stars}★`,
											}))
										: []
								}
								unavailable={!hackerrankStats}
							/>
							<PlatformCard
								name="GeeksforGeeks"
								primary={
									gfgStats
										? { value: gfgStats.totalSolved, label: "solved" }
										: undefined
								}
								profileUrl={gfgStats?.profileUrl}
								stats={
									gfgStats
										? [
												{ label: "Score", value: gfgStats.score },
												...(gfgStats.instituteRank
													? [
															{
																label: "Institute Rank",
																value: gfgStats.instituteRank,
															},
														]
													: []),
											]
										: []
								}
								unavailable={!gfgStats}
							/>
						</div>
					</div>
				</AnimatedSection>

				{/* ── Experience ── */}
				<AnimatedSection delay={0.05}>
					<div
						className="scroll-mt-20 border-border border-t pt-10"
						id="experience"
					>
						<p className="mb-6 text-[10px] text-text-muted uppercase tracking-widest">
							Experience
						</p>
						<div className="space-y-4">
							{experience.map((exp, i) => (
								<AnimatedSection delay={i * 0.08} key={i}>
									<div className="rounded-lg">
										<div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
											<div>
												<p className="font-semibold text-sm text-text-primary">
													{exp.title}
												</p>
												<p className="text-accent text-xs">{exp.company}</p>
											</div>
											<div className="flex flex-col gap-0.5 text-[10px] text-text-muted sm:text-right">
												<span className="flex items-center gap-1 sm:justify-end">
													<Calendar size={10} />
													{exp.dates}
												</span>
												<span className="flex items-center gap-1 sm:justify-end">
													<MapPin size={10} />
													{exp.location}
												</span>
											</div>
										</div>
										<ul className="space-y-1.5">
											{exp.bullets.map((bullet, j) => (
												<li
													className="flex gap-2 text-sm text-text-secondary leading-relaxed"
													key={j}
												>
													<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
													{bullet}
												</li>
											))}
										</ul>
									</div>
								</AnimatedSection>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* ── Education ── */}
				<AnimatedSection delay={0.05}>
					<div className="border-border border-t pt-10 pb-4">
						<p className="mb-6 text-[10px] text-text-muted uppercase tracking-widest">
							Education
						</p>
						<div className="space-y-4">
							{education.map((edu, i) => (
								<AnimatedSection delay={i * 0.08} key={i}>
									<div className="rounded-lg">
										<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
											<div>
												<p className="font-semibold text-sm text-text-primary">
													{edu.degree}
												</p>
												<p className="text-accent text-xs">{edu.institution}</p>
											</div>
											<div className="text-[10px] text-text-muted sm:text-right">
												<div>{edu.year}</div>
												<div className="font-medium text-text-primary">
													GPA: {edu.gpa}
												</div>
											</div>
										</div>
									</div>
								</AnimatedSection>
							))}
						</div>
					</div>
				</AnimatedSection>
			</div>
		</div>
	);
}
