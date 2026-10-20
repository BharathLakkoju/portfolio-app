import { ArrowRight } from "lucide-react";
import { ClosingCTA } from "~/components/home/ClosingCTA";
import { Hero } from "~/components/home/Hero";
import { ImpactBento } from "~/components/home/ImpactBento";
import { Marquee } from "~/components/home/Marquee";
import { StackSection } from "~/components/home/StackSection";
import { SectionHeader } from "~/components/motion/SectionHeader";
import { ProjectGrid } from "~/components/projects/ProjectGrid";
import { CodingSnapshot } from "~/components/shared/CodingSnapshot";
import { Timeline } from "~/components/shared/Timeline";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import {
	education,
	experience,
	impactStats,
	projects,
	stackGroups,
} from "~/lib/data";
import { getLatestCommit } from "~/lib/github";

export const revalidate = 600;

export default async function HomePage() {
	const commit = await getLatestCommit();

	return (
		<>
			<Hero commit={commit} />
			<Marquee />

			<section
				aria-labelledby="work-title"
				className="container-page section-y"
				id="work"
			>
				<SectionHeader
					description="Four products, each built solo from architecture to deploy."
					id="work-title"
					index="01"
					label="Selected work"
					link={{ href: "/projects", label: "All projects" }}
					title="Things I've shipped"
				/>
				<ProjectGrid notes projects={projects} />
			</section>

			<section
				aria-labelledby="impact-title"
				className="container-page section-y"
			>
				<SectionHeader
					description="Measured on production systems at UST Global."
					id="impact-title"
					index="02"
					label="Impact"
					title="What changed because of my work"
				/>
				<ImpactBento stats={impactStats} />
				<div className="mt-4 flex flex-wrap items-center justify-between gap-2">
					<CodingSnapshot />
					<Link
						className="group inline-flex min-h-11 items-center gap-1.5 text-fg-secondary text-sm hover:text-fg"
						href="/about#problem-solving"
					>
						Coding profiles
						<ArrowRight
							aria-hidden
							className="transition-transform group-hover:translate-x-0.5"
							size={14}
						/>
					</Link>
				</div>
			</section>

			<section
				aria-labelledby="stack-title"
				className="container-page section-y overflow-x-clip"
			>
				<SectionHeader
					description="What I reach for, grouped the way I use it."
					id="stack-title"
					index="03"
					label="Stack"
					title="Tools I build with"
				/>
				<StackSection groups={stackGroups} />
			</section>

			<section
				aria-labelledby="experience-title"
				className="container-page section-y"
			>
				<SectionHeader
					id="experience-title"
					index="04"
					label="Experience"
					link={{ href: "/about#experience", label: "Full experience" }}
					title="Where I've worked"
				/>
				<div className="grid-page">
					<div className="lg:col-span-8">
						<Timeline entries={[...experience, ...education]} maxBullets={3} />
					</div>
				</div>
			</section>

			<ClosingCTA />
		</>
	);
}
