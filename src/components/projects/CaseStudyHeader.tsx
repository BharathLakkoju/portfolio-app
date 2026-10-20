"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";
import { GithubIcon } from "~/components/shared/Icons";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Badge, Chip } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { Project } from "~/lib/data";
import { duration, ease, rise } from "~/lib/motion";
import { ProjectMedia } from "./ProjectMedia";

const icons = {
	code: GithubIcon,
	live: ArrowUpRight,
	site: ArrowUpRight,
	npm: Package,
	contact: ArrowUpRight,
};

/**
 * Title and media carry the same view-transition names as the clicked card, so
 * they morph into place; the rest rises in once they've landed.
 */
export function CaseStudyHeader({ project }: { project: Project }) {
	const after = (delay: number) => ({
		initial: { opacity: 0, y: rise },
		animate: { opacity: 1, y: 0 },
		transition: { duration: duration.ui, ease: ease.out, delay: 0.25 + delay },
	});

	return (
		<header className="grid-page gap-y-8">
			<div className="flex flex-col gap-4 lg:col-span-8">
				<nav aria-label="Breadcrumb" className="label-mono text-fg-muted">
					<Link className="hover:text-fg" href="/projects">
						Projects
					</Link>{" "}
					/ <span aria-current="page">{project.repo}</span>
				</nav>
				<div className="flex flex-wrap items-center gap-2">
					<Badge variant={project.badge.tone === "live" ? "live" : "status"}>
						{project.badge.text}
					</Badge>
					<span className="label-mono text-fg-muted">{project.label}</span>
				</div>
				<h1
					className="w-fit text-fg text-h1 tracking-[-0.02em]"
					style={{ viewTransitionName: `project-title-${project.slug}` }}
				>
					{project.title}
				</h1>
				<motion.p className="text-body-lg text-fg-secondary" {...after(0)}>
					{project.outcome}
				</motion.p>
				<motion.p className="label-mono text-fg-muted" {...after(0.06)}>
					{project.roleLine}
				</motion.p>
				<motion.ul className="flex flex-wrap gap-2" {...after(0.12)}>
					{project.stack.map((s) => (
						<li key={s}>
							<Chip>{s}</Chip>
						</li>
					))}
				</motion.ul>
				<motion.div className="flex flex-wrap gap-2 pt-2" {...after(0.18)}>
					{project.links.map((link, i) => {
						const Icon = icons[link.kind];
						const variant = i === 0 ? "secondary" : "ghost";
						return link.kind === "contact" ? (
							<Button asChild key={link.label} variant={variant}>
								<Link href={link.href}>{link.label}</Link>
							</Button>
						) : (
							<Button asChild key={link.label} variant={variant}>
								<a href={link.href} rel="noopener" target="_blank">
									<Icon aria-hidden size={15} />
									{link.label}
									<span className="sr-only"> (opens in new tab)</span>
								</a>
							</Button>
						);
					})}
				</motion.div>
			</div>
			<div
				className="aspect-[16/10] overflow-hidden rounded-lg border border-border lg:col-span-4 lg:self-start"
				style={{ viewTransitionName: `project-media-${project.slug}` }}
			>
				<ProjectMedia active project={project} />
			</div>
		</header>
	);
}
