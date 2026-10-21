import { Stagger, StaggerItem } from "~/components/motion/Reveal";
import type { Project } from "~/lib/data";
import { cn } from "~/lib/utils";
import { ProjectCard } from "./ProjectCard";

/**
 * Three-up row, then the rest in pairs (half width each). An odd leftover
 * becomes one full-width card, so the last row is never ragged. Built on six
 * columns at `lg`: thirds span 2, halves span 3, full width spans 6.
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
				"grid grid-cols-1 gap-[var(--gutter)] md:grid-cols-2 lg:grid-cols-6",
				notes && "lg:gap-y-[calc(var(--gutter)*2)]",
			)}
		>
			{row.map((project, i) => (
				<StaggerItem
					className={
						i === 2
							? "flex flex-col gap-3 md:col-span-2 lg:col-span-2"
							: "flex flex-col gap-3 lg:col-span-2"
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
			{rest.map((project, i) => {
				const wide = rest.length % 2 === 1 && i === rest.length - 1;
				return (
					<StaggerItem
						className={wide ? "md:col-span-2 lg:col-span-6" : "lg:col-span-3"}
						index={i}
						key={project.slug}
					>
						<ProjectCard
							className={wide ? undefined : "h-full"}
							headingLevel={headingLevel}
							index={i + 3}
							project={project}
							wide={wide}
						/>
					</StaggerItem>
				);
			})}
		</Stagger>
	);
}
