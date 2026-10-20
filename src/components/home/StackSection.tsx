"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Stagger, StaggerItem } from "~/components/motion/Reveal";
import { Chip } from "~/components/ui/badge";
import { useReducedMotion } from "~/hooks/use-media-query";
import type { StackGroup } from "~/lib/data";
import { cn } from "~/lib/utils";

/** Oversized outline type that drifts sideways as the section scrolls past. */
function ParallaxRow({
	words,
	direction,
	progress,
}: {
	words: string[];
	direction: 1 | -1;
	progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
	const reduce = useReducedMotion();
	const x = useTransform(
		progress,
		[0, 1],
		reduce ? ["0%", "0%"] : direction > 0 ? ["-12%", "0%"] : ["0%", "-12%"],
	);
	const text = [...words, ...words].join(" · ");
	return (
		<motion.p
			aria-hidden
			className={cn(
				"whitespace-nowrap font-display text-[clamp(3rem,2rem+6vw,7rem)] italic leading-[1.1] [-webkit-text-stroke-width:1.5px]",
				direction > 0
					? "text-fg/[0.04] [-webkit-text-stroke-color:var(--color-fg-muted)]"
					: "text-accent-graphic/[0.06] [-webkit-text-stroke-color:var(--color-accent-graphic)]",
			)}
			style={{ x }}
		>
			{text}
		</motion.p>
	);
}

export function StackSection({ groups }: { groups: StackGroup[] }) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const top = groups.flatMap((g) => g.items.slice(0, 3));
	const bottom = groups.flatMap((g) => g.items.slice(3, 6));

	return (
		<div className="relative" ref={ref}>
			<div className="pointer-events-none -mx-[var(--page-margin)] mb-10 select-none overflow-hidden">
				<ParallaxRow direction={1} progress={scrollYProgress} words={top} />
				<ParallaxRow direction={-1} progress={scrollYProgress} words={bottom} />
			</div>
			<Stagger className="grid grid-cols-1 gap-[var(--gutter)] md:grid-cols-2">
				{groups.map((group, i) => (
					<StaggerItem
						className="rounded-lg border border-border bg-surface/70 p-6 backdrop-blur-sm"
						index={i}
						key={group.label}
					>
						<h3 className="label-mono mb-4 flex items-center gap-2 text-fg-secondary">
							<span
								aria-hidden
								className="size-1.5 rounded-full"
								style={{ background: `var(--color-group-${group.dot})` }}
							/>
							{group.label}
						</h3>
						<ul className="flex flex-wrap gap-2">
							{group.items.map((item) => (
								<li key={item}>
									<Chip>{item}</Chip>
								</li>
							))}
						</ul>
					</StaggerItem>
				))}
			</Stagger>
		</div>
	);
}
