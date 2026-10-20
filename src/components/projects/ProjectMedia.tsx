"use client";

import { motion, useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "~/hooks/use-media-query";
import type { ProjectMedia as Media, Project } from "~/lib/data";
import { duration, ease } from "~/lib/motion";

const W = 400;
const H = 250;

/** Blueprint schematic of the project's pipeline; the pulse runs while active. */
function Schematic({ project, active }: { project: Project; active: boolean }) {
	const reduce = useReducedMotion();
	const n = project.steps.length;
	const points = project.steps.map((label, i) => ({
		label,
		x: 64 + (i * (W - 128)) / Math.max(1, n - 1),
		y: i % 2 === 0 ? 108 : 152,
	}));
	const path = points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
	const animate = active && !reduce;

	return (
		<svg
			aria-hidden="true"
			className="size-full"
			preserveAspectRatio="xMidYMid meet"
			viewBox={`0 0 ${W} ${H}`}
		>
			<defs>
				<pattern
					height="20"
					id={`grid-${project.slug}`}
					patternUnits="userSpaceOnUse"
					width="20"
				>
					<path
						d="M20 0H0V20"
						fill="none"
						stroke="var(--color-grid-line)"
						strokeWidth="1"
					/>
				</pattern>
			</defs>
			<rect
				fill="var(--color-bg-subtle)"
				height={H * 3}
				width={W * 3}
				x={-W}
				y={-H}
			/>
			<rect
				fill={`url(#grid-${project.slug})`}
				height={H * 3}
				width={W * 3}
				x={-W}
				y={-H}
			/>
			<text
				fill="var(--color-fg-muted)"
				fontFamily="var(--font-mono)"
				fontSize="14"
				x="20"
				y="34"
			>
				~/{project.repo}
			</text>

			<path
				d={path}
				fill="none"
				stroke="var(--color-border-strong)"
				strokeWidth="1.5"
			/>
			<motion.path
				animate={{ pathLength: active || reduce ? 1 : 0 }}
				d={path}
				fill="none"
				initial={false}
				stroke="var(--color-accent-graphic)"
				strokeWidth="1.5"
				transition={{ duration: reduce ? 0 : 0.6, ease: ease.out }}
			/>

			{points.map((p, i) => (
				<g key={p.label}>
					<motion.circle
						animate={{
							fill: active ? "var(--color-accent-graphic)" : "var(--color-bg)",
						}}
						cx={p.x}
						cy={p.y}
						initial={false}
						r="5"
						stroke="var(--color-accent-graphic)"
						strokeWidth="1.5"
						transition={{
							duration: duration.micro,
							delay: active ? i * 0.12 : 0,
						}}
					/>
					<text
						fill="var(--color-fg-secondary)"
						fontFamily="var(--font-mono)"
						fontSize="14"
						textAnchor="middle"
						x={p.x}
						y={i % 2 === 0 ? p.y - 18 : p.y + 30}
					>
						{p.label.toUpperCase()}
					</text>
				</g>
			))}

			{animate && (
				<motion.circle
					animate={{
						cx: points.map((p) => p.x),
						cy: points.map((p) => p.y),
						opacity: [0, 1, 1, 0],
					}}
					fill="var(--color-accent)"
					r="4"
					style={{ filter: "drop-shadow(0 0 6px var(--color-accent))" }}
					transition={{
						duration: 1.4,
						ease: "linear",
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: 0.4,
						opacity: {
							duration: 1.4,
							times: [0, 0.08, 0.92, 1],
							repeat: Number.POSITIVE_INFINITY,
							repeatDelay: 0.4,
						},
					}}
				/>
			)}
		</svg>
	);
}

/**
 * Poster first. The clip loads on first hover (desktop) or when the card nears
 * the viewport (touch), plays muted while hovered or mostly in view, and never
 * autoplays under reduced motion.
 */
function Video({ media, active }: { media: Media; active: boolean }) {
	const ref = useRef<HTMLVideoElement>(null);
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const near = useInView(ref, { margin: "100% 0px" });
	const mostlyVisible = useInView(ref, { amount: 0.6 });
	const [load, setLoad] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [manual, setManual] = useState(false);

	const wantPlay = reduce ? manual : fine ? active : mostlyVisible;

	useEffect(() => {
		if (wantPlay || (!fine && near)) setLoad(true);
	}, [wantPlay, fine, near]);

	useEffect(() => {
		const v = ref.current;
		if (!v || !load) return;
		if (wantPlay) void v.play().catch(() => {});
		else v.pause();
	}, [wantPlay, load]);

	return (
		<div className="relative size-full">
			<Image
				alt={media.alt}
				className="object-cover"
				fill
				sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
				src={media.poster}
			/>
			<video
				aria-hidden
				className="absolute inset-0 size-full object-cover transition-opacity duration-[250ms]"
				loop
				muted
				onPause={() => setPlaying(false)}
				onPlaying={() => setPlaying(true)}
				playsInline
				poster={media.poster}
				preload="none"
				ref={ref}
				style={{ opacity: playing ? 1 : 0 }}
			>
				{load && media.webm && <source src={media.webm} type="video/webm" />}
				{load && media.mp4 && <source src={media.mp4} type="video/mp4" />}
			</video>
			{reduce && (
				<button
					aria-label={manual ? "Pause preview" : "Play preview"}
					className="absolute bottom-3 left-3 z-[var(--z-raised)] grid size-11 place-items-center rounded-full border border-border-strong bg-surface/90 text-fg"
					onClick={() => setManual((m) => !m)}
					type="button"
				>
					{manual ? <Pause size={16} /> : <Play size={16} />}
				</button>
			)}
		</div>
	);
}

export function ProjectMedia({
	project,
	active,
}: {
	project: Project;
	active: boolean;
}) {
	return project.media ? (
		<Video active={active} media={project.media} />
	) : (
		<Schematic active={active} project={project} />
	);
}
