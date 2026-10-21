import { Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import { ExperienceShowcase } from "~/components/experience/ExperienceShowcase";
import { Reveal, Stagger, StaggerItem } from "~/components/motion/Reveal";
import { SectionHeader } from "~/components/motion/SectionHeader";
import { ContributionHeatmap } from "~/components/shared/ContributionHeatmap";
import { LeetCodeCard } from "~/components/shared/LeetCodeCard";
import { PlatformCard } from "~/components/shared/PlatformCard";
import { SwapAvatar } from "~/components/shared/SwapAvatar";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";
import { getCodeforcesStats } from "~/lib/codeforces";
import { experience, profile, site } from "~/lib/data";
import { getGfgStats } from "~/lib/geeksforgeeks";
import { getContributions } from "~/lib/github";
import { getHackerRankStats } from "~/lib/hackerrank";
import { getLeetCodeStats } from "~/lib/leetcode";
import { cn, formatTenure } from "~/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "About",
	description: `${profile.name}: ${profile.jobTitle} at ${profile.company}, building multi-agent AI systems and full-stack products in ${profile.location}.`,
};

const shortcuts = [
	{ keys: ["⌘K", "Ctrl K"], action: "Open the command palette" },
	{ keys: ["/"], action: "Open the command palette" },
	{ keys: ["H", "P", "B", "A"], action: "Home, Projects, Blog, About" },
	{ keys: ["G", "H"], action: "Open GitHub (press G, then H)" },
	{ keys: ["T"], action: "Toggle theme" },
	{ keys: ["Esc"], action: "Close the palette or menu" },
];

const principles = [
	{
		title: "Evidence over vibes",
		body: "If an AI system can't show where an answer came from, it doesn't ship. Citations, evals and logs come first.",
	},
	{
		title: "Boring infrastructure",
		body: "Postgres, queues, typed schemas and CI that runs on every pull request. The interesting part should be the product.",
	},
	{
		title: "Ship, then measure",
		body: "Small releases behind real numbers: engagement, uptime, time saved. Then the next iteration.",
	},
];

export default async function AboutPage() {
	const [leetcode, codeforces, hackerrank, gfg, contributions] =
		await Promise.all([
			getLeetCodeStats(),
			getCodeforcesStats(),
			getHackerRankStats(),
			getGfgStats(),
			getContributions(),
		]);
	const profileCards = [
		leetcode && {
			key: "leetcode",
			node: <LeetCodeCard stats={leetcode} />,
		},
		codeforces && {
			key: "codeforces",
			node: (
				<PlatformCard
					name="Codeforces"
					primary={{ value: codeforces.solvedCount, label: "solved" }}
					profileUrl={codeforces.profileUrl}
					stats={[
						{ label: "Rating", value: codeforces.rating ?? "Unrated" },
						...(codeforces.maxRating
							? [{ label: "Max", value: codeforces.maxRating }]
							: []),
					]}
				/>
			),
		},
		hackerrank && {
			key: "hackerrank",
			node: (
				<PlatformCard
					name="HackerRank"
					primary={{ value: hackerrank.level, label: "level" }}
					profileUrl={hackerrank.profileUrl}
					stats={hackerrank.badges.map((b) => ({
						label: b.name,
						value: `${b.stars}★`,
					}))}
				/>
			),
		},
		gfg && {
			key: "gfg",
			node: (
				<PlatformCard
					name="GeeksforGeeks"
					primary={{ value: gfg.totalSolved, label: "solved" }}
					profileUrl={gfg.profileUrl}
					stats={[
						{ label: "Score", value: gfg.score },
						...(gfg.instituteRank
							? [{ label: "Institute rank", value: gfg.instituteRank }]
							: []),
					]}
				/>
			),
		},
	].filter((c): c is { key: string; node: React.JSX.Element } => Boolean(c));
	const hasProfiles = profileCards.length > 0;

	return (
		<div className="container-page flex flex-col gap-[var(--space-section)] pt-12 pb-[var(--space-section)]">
			<section>
				<SectionHeader as="h1" label="About" title="About" />
				<div className="grid-page gap-y-10">
					<Reveal className="flex max-w-[var(--measure-prose)] flex-col gap-4 text-body-lg text-fg-secondary lg:col-span-8">
						<p>
							I&apos;m {profile.firstName}, a {profile.jobTitle} at{" "}
							<span className="text-fg">{profile.company}</span> in Hyderabad. I
							build multi-agent AI systems and the full-stack products that put
							them in front of people.
						</p>
						<p>
							At work that has meant a health-tracking app whose reward system
							lifted engagement 69%, automation that removed 86% of manual data
							processing, and CI/CD that holds 99% deployment uptime.
						</p>
						<p>
							On my own time I ship complete products: a compliance review
							copilot that cites every finding, a paid YouTube research agent, a
							deterministic resume scorer, and an open-source secrets CLI.
						</p>
					</Reveal>
					<Reveal className="flex justify-start lg:col-span-4 lg:justify-end">
						<SwapAvatar
							className="aspect-square w-full max-w-[220px]"
							priority
							rounded="lg"
							sizes="220px"
						/>
					</Reveal>
				</div>
			</section>

			<section aria-labelledby="experience" id="experience-section">
				<SectionHeader
					id="experience"
					index="01"
					label="Experience"
					title="Experience"
				/>
				{experience.map((role) => (
					<ExperienceShowcase
						key={`${role.org}-${role.title}`}
						role={role}
						tenure={formatTenure(role.start)}
					/>
				))}
			</section>

			{contributions && (
				<section aria-labelledby="activity">
					<SectionHeader
						id="activity"
						index="02"
						label="Activity"
						title="Shipping, week by week"
					/>
					<Reveal>
						<ContributionHeatmap data={contributions} />
					</Reveal>
				</section>
			)}

			{hasProfiles && (
				<section
					aria-labelledby="problem-solving"
					className="scroll-mt-24"
					id="problem-solving-section"
				>
					<SectionHeader
						id="problem-solving"
						index="03"
						label="Problem solving"
						title="Practice, in public"
					/>
					<Stagger className="grid grid-cols-1 gap-[var(--gutter)] md:grid-cols-2">
						{profileCards.map((card, i) => (
							<StaggerItem
								className={cn(
									"flex",
									profileCards.length % 2 === 1 &&
										i === profileCards.length - 1 &&
										"md:col-span-2",
								)}
								index={i}
								key={card.key}
							>
								{card.node}
							</StaggerItem>
						))}
					</Stagger>
				</section>
			)}

			<section aria-labelledby="how-i-work">
				<SectionHeader
					id="how-i-work"
					index="04"
					label="How I work"
					title="How I work"
				/>
				<Stagger className="grid gap-[var(--gutter)] md:grid-cols-3">
					{principles.map((p, i) => (
						<StaggerItem
							className="rounded-lg border border-border bg-surface p-6"
							index={i}
							key={p.title}
						>
							<h3 className="mb-2 text-fg text-h3">{p.title}</h3>
							<p className="text-fg-secondary text-sm">{p.body}</p>
						</StaggerItem>
					))}
				</Stagger>
			</section>

			<section aria-labelledby="shortcuts">
				<SectionHeader
					id="shortcuts"
					index="05"
					label="Keyboard"
					title="Keyboard shortcuts"
				/>
				<div className="grid-page">
					<Reveal className="lg:col-span-8">
						<table className="w-full text-sm">
							<thead className="sr-only">
								<tr>
									<th>Keys</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{shortcuts.map((s) => (
									<tr
										className="border-border border-b"
										key={s.action + s.keys.join()}
									>
										<td className="py-3 pr-6">
											<span className="flex flex-wrap gap-1.5">
												{s.keys.map((k) => (
													<kbd
														className="min-w-7 rounded-sm border border-border-strong bg-surface px-1.5 py-0.5 text-center font-mono text-fg-secondary text-label"
														key={k}
													>
														{k}
													</kbd>
												))}
											</span>
										</td>
										<td className="py-3 text-fg-secondary">{s.action}</td>
									</tr>
								))}
							</tbody>
						</table>
						<p className="mt-3 text-fg-muted text-sm">
							Single-key shortcuts never fire while you&apos;re typing, and you
							can turn them off from the palette.
						</p>
					</Reveal>
				</div>
			</section>

			<Reveal className="flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-surface p-8 md:flex-row md:items-center">
				<div>
					<p className="text-fg text-h3">Hiring for AI or full-stack?</p>
					<p className="mt-1 text-fg-secondary text-sm">{profile.workMode}.</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<Button asChild size="lg">
						<a download={site.resumeFile} href={site.resume}>
							<Download aria-hidden size={16} />
							Download resume
							<span className="sr-only"> (PDF)</span>
						</a>
					</Button>
					<Button asChild size="lg" variant="secondary">
						<Link href="/contact">
							<Mail aria-hidden size={16} />
							Contact me
						</Link>
					</Button>
				</div>
			</Reveal>
		</div>
	);
}
