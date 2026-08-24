"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "~/components/shared/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Project } from "~/lib/data";
import { cn } from "~/lib/utils";

type ProjectCardProps = {
	project: Project;
	index?: number;
	className?: string;
};

export function ProjectCard({
	project,
	index = 0,
	className,
}: ProjectCardProps) {
	return (
		<Card
			className={cn(
				"group flex flex-col transition-colors duration-200 hover:border-border/80",
				className,
			)}
		>
			<CardHeader className="px-4 pt-4 pb-2">
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="font-semibold text-sm leading-snug transition-colors duration-200 group-hover:text-accent">
						{project.name}
					</CardTitle>
					<div className="flex shrink-0 items-center gap-2 pt-0.5">
						{project.github ? (
							<a
								aria-label={`${project.name} GitHub`}
								className="text-text-muted transition-colors hover:text-text-primary"
								href={project.github}
								onClick={(e) => e.stopPropagation()}
								rel="noopener noreferrer"
								target="_blank"
							>
								<GithubIcon size={13} />
							</a>
						) : (
							<span className="cursor-not-allowed text-text-muted opacity-30">
								<GithubIcon size={13} />
							</span>
						)}
						{project.live ? (
							<a
								aria-label={`${project.name} live site`}
								className="text-text-muted transition-colors hover:text-text-primary"
								href={project.live}
								onClick={(e) => e.stopPropagation()}
								rel="noopener noreferrer"
								target="_blank"
							>
								<ExternalLink size={13} />
							</a>
						) : (
							<span className="cursor-not-allowed text-text-muted opacity-30">
								<ExternalLink size={13} />
							</span>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col px-4 pt-0 pb-4">
				{project.role && (
					<p className="mb-2 text-[11px] text-accent leading-relaxed">
						{project.role}
					</p>
				)}
				<p className="mb-4 flex-1 text-text-secondary text-xs leading-relaxed">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-1">
					{project.tech.map((tech) => (
						<span
							className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-secondary"
							key={tech}
						>
							{tech}
						</span>
					))}
					{/* {project.tech.length > 5 && (
            <span className="text-[10px] font-mono text-text-muted border border-border rounded px-1.5 py-0.5">
              +{project.tech.length - 5}
            </span>
          )} */}
				</div>
			</CardContent>
		</Card>
	);
}
