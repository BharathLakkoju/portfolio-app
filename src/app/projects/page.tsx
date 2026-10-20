import type { Metadata } from "next";
import { SectionHeader } from "~/components/motion/SectionHeader";
import { ProjectGrid } from "~/components/projects/ProjectGrid";
import { projects } from "~/lib/data";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"AI products, a compliance review copilot, a paid resume evaluator and an open-source CLI, each built solo from architecture to deploy.",
};

export default function ProjectsPage() {
	return (
		<div className="container-page pt-12 pb-[var(--space-section)]">
			<SectionHeader
				as="h1"
				description="AI and full-stack products, each built solo from architecture to deploy."
				label="Projects"
				title="Projects"
			/>
			<p className="label-mono -mt-4 mb-8 text-fg-muted">
				{projects.length} projects
			</p>
			<ProjectGrid headingLevel="h2" projects={projects} />
		</div>
	);
}
