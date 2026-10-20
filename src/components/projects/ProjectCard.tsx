"use client";

import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Package } from "lucide-react";
import { useRef, useState } from "react";
import { GithubIcon } from "~/components/shared/Icons";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Badge, Chip } from "~/components/ui/badge";
import { useFinePointer, useReducedMotion } from "~/hooks/use-media-query";
import type { Project, ProjectLink } from "~/lib/data";
import { duration, ease, springs } from "~/lib/motion";
import { cn } from "~/lib/utils";
import { ProjectMedia } from "./ProjectMedia";

const MAX_TILT = 4;
const MAX_CHIPS = 5;

const linkIcon = {
	code: GithubIcon,
	live: ArrowUpRight,
	site: ArrowUpRight,
	npm: Package,
	contact: ArrowRight,
} as const;

function SecondaryLink({ link }: { link: ProjectLink }) {
	const Icon = linkIcon[link.kind];
	const cls =
		"relative z-[var(--z-raised)] inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 font-medium text-fg-secondary text-sm transition-colors duration-150 hover:bg-surface-2 hover:text-fg";
	if (link.kind === "contact") {
		return (
			<Link className={cls} href={link.href}>
				{link.label}
				<Icon aria-hidden size={14} />
			</Link>
		);
	}
	return (
		<a className={cls} href={link.href} rel="noopener" target="_blank">
			<Icon aria-hidden size={14} />
			{link.label}
			<span className="sr-only"> (opens in new tab)</span>
		</a>
	);
}

export function ProjectCard({
	project,
	index,
	wide = false,
	headingLevel = "h3",
	className,
}: {
	project: Project;
	index: number;
	wide?: boolean;
	headingLevel?: "h2" | "h3";
	className?: string;
}) {
	const ref = useRef<HTMLElement>(null);
	const mediaRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const interactive = fine && !reduce;
	const [active, setActive] = useState(false);
	const intent = useRef<number | undefined>(undefined);

	const mx = useMotionValue(-1000);
	const my = useMotionValue(-1000);
	const rotateX = useSpring(0, springs.soft);
	const rotateY = useSpring(0, springs.soft);
	const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, var(--color-accent-glow), transparent 70%)`;
	const rim = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, var(--color-accent-graphic), transparent 70%)`;

	function onPointerMove(e: React.PointerEvent) {
		if (!interactive || !ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		mx.set(x);
		my.set(y);
		// Tilting a full-width card swings its edges into the neighbouring rows.
		if (wide) return;
		rotateX.set(-(y / rect.height - 0.5) * 2 * MAX_TILT);
		rotateY.set((x / rect.width - 0.5) * 2 * MAX_TILT);
	}

	function onPointerEnter(e: React.PointerEvent) {
		if (e.pointerType !== "mouse") return;
		window.clearTimeout(intent.current);
		intent.current = window.setTimeout(() => setActive(true), 150);
	}

	function onPointerLeave() {
		window.clearTimeout(intent.current);
		setActive(false);
		rotateX.set(0);
		rotateY.set(0);
		mx.set(-1000);
		my.set(-1000);
	}

	/**
	 * Only the clicked card gets view-transition names, so it alone morphs into
	 * the case-study header; the rest of the page cross-fades.
	 */
	function nameSharedElements() {
		if (mediaRef.current)
			mediaRef.current.style.viewTransitionName = `project-media-${project.slug}`;
		if (titleRef.current)
			titleRef.current.style.viewTransitionName = `project-title-${project.slug}`;
	}

	const Heading = headingLevel;
	const chips = project.stack.slice(0, MAX_CHIPS);
	const overflow = project.stack.length - chips.length;

	return (
		<motion.article
			className={cn(
				"group relative isolate flex flex-col rounded-lg border border-border bg-surface shadow-[var(--shadow-1)] transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-[var(--shadow-2)] has-[.card-link:focus-visible]:border-border-strong has-[.card-link:focus-visible]:outline-2 has-[.card-link:focus-visible]:outline-focus has-[.card-link:focus-visible]:outline-offset-2",
				wide && "lg:flex-row",
				className,
			)}
			data-index={index}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node))
					setActive(false);
			}}
			onFocus={() => setActive(true)}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
			onPointerMove={onPointerMove}
			ref={ref}
			style={
				interactive
					? { rotateX, rotateY, transformPerspective: 1000 }
					: undefined
			}
			transition={{ duration: duration.micro, ease: ease.out }}
			whileTap={{ scale: 0.98 }}
		>
			{interactive && (
				<>
					<motion.div
						aria-hidden
						className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						style={{ background: spotlight }}
					/>
					<motion.div
						aria-hidden
						className="mask-border pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						style={{ background: rim }}
					/>
				</>
			)}

			<div
				className={cn(
					"relative m-1 aspect-[16/10] overflow-hidden rounded-md border border-border",
					wide && "lg:aspect-auto lg:w-[44%] lg:shrink-0",
				)}
				ref={mediaRef}
			>
				<ProjectMedia active={active} project={project} />
				<span
					aria-hidden
					className="absolute top-3 right-3 grid size-8 translate-x-[-4px] translate-y-[4px] place-items-center rounded-full border border-border-strong bg-surface/90 text-fg opacity-0 backdrop-blur-sm transition-[opacity,translate] duration-150 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
				>
					<ArrowUpRight size={14} />
				</span>
			</div>

			<div className="flex flex-1 flex-col gap-3 p-5 pt-4">
				<div className="flex items-center justify-between gap-3">
					<p className="label-mono truncate text-fg-muted">
						{String(index + 1).padStart(2, "0")} · {project.label}
					</p>
					<Badge variant={project.badge.tone === "live" ? "live" : "status"}>
						{project.badge.tone === "live" && (
							<span aria-hidden className="size-1.5 rounded-full bg-success" />
						)}
						{project.badge.text}
					</Badge>
				</div>

				<div aria-hidden className="relative h-px bg-border">
					<motion.span
						animate={{ scaleX: active || reduce ? 1 : 0 }}
						className="absolute inset-0 origin-left bg-accent-graphic"
						initial={false}
						transition={{ duration: reduce ? 0 : 0.3, ease: ease.out }}
					/>
					{!reduce && (
						<motion.span
							animate={
								active
									? { x: ["0%", "100%"], opacity: [1, 1, 0] }
									: { x: "0%", opacity: 0 }
							}
							className="absolute inset-0"
							initial={false}
							transition={{ duration: 0.56, delay: 0.1, ease: "linear" }}
						>
							<span className="absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
						</motion.span>
					)}
				</div>

				<Heading
					className="w-fit text-fg text-h3 tracking-[-0.005em]"
					ref={titleRef}
				>
					<Link
						className="card-link inline-flex items-center gap-2 outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']"
						href={`/projects/${project.slug}`}
						onClick={nameSharedElements}
					>
						{project.title}
						<ArrowRight
							aria-hidden
							className="shrink-0 text-fg-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
							size={16}
						/>
					</Link>
				</Heading>

				<p className="line-clamp-2 min-h-[2lh] text-fg-secondary text-sm">
					{project.outcome}
				</p>
				<p className="label-mono line-clamp-2 min-h-[2lh] text-fg-muted">
					{project.roleLine}
				</p>

				<ul
					aria-label="Stack"
					className={cn(
						"flex flex-wrap content-start gap-2",
						!wide && "min-h-14",
					)}
				>
					{chips.map((tech) => (
						<li key={tech}>
							<Chip>{tech}</Chip>
						</li>
					))}
					{overflow > 0 && (
						<li>
							<Chip>+{overflow}</Chip>
						</li>
					)}
				</ul>

				<div className="-mx-3 mt-auto flex flex-wrap pt-1">
					{project.links.map((link) => (
						<SecondaryLink key={link.label} link={link} />
					))}
				</div>
			</div>
		</motion.article>
	);
}
