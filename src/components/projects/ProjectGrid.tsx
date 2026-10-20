import { Stagger, StaggerItem } from "~/components/motion/Reveal";
import type { Project } from "~/lib/data";
import { cn } from "~/lib/utils";
import { ProjectCard } from "./ProjectCard";

/**
 * Three-up row, then every further project as a full-width card, so four
 * projects never leave an orphan in the last row.
 */
export function ProjectGrid({
	projects,
	headingLevel,
	notes = false,
}: {
	projects: Project[];
	headingLevel?: "h2" | "h3";
	notes?: boolean;
}) {
	const row = projects.slice(0, 3);
	const rest = projects.slice(3);

	return (
		<Stagger
			className={cn(
				"grid grid-cols-1 gap-[var(--gutter)] md:grid-cols-2 lg:grid-cols-3",
				notes && "lg:gap-y-[calc(var(--gutter)*2)]",
			)}
		>
			{row.map((project, i) => (
				<StaggerItem
					className={
						i === 2
							? "flex flex-col gap-3 md:col-span-2 lg:col-span-1"
							: "flex flex-col gap-3"
					}
					index={i}
					key={project.slug}
				>
					<ProjectCard
						className="flex-1"
						headingLevel={headingLevel}
						index={i}
						project={project}
					/>
					{notes && (
						<p
							aria-hidden
							className="hidden truncate font-mono text-fg-muted text-label lg:block"
						>
							<span className="mr-2 inline-block h-px w-6 bg-border-strong align-middle" />
							{project.marginNote}
						</p>
					)}
				</StaggerItem>
			))}
			{rest.map((project, i) => (
				<StaggerItem
					className="md:col-span-2 lg:col-span-3"
					index={i}
					key={project.slug}
				>
					<ProjectCard
						headingLevel={headingLevel}
						index={i + 3}
						project={project}
						wide
					/>
				</StaggerItem>
			))}
		</Stagger>
	);
}
