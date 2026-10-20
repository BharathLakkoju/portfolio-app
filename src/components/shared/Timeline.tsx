"use client";

import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "~/hooks/use-media-query";
import type { TimelineEntry } from "~/lib/data";
import { duration, ease, rise, springs } from "~/lib/motion";
import { cn } from "~/lib/utils";

/**
 * A line that draws as the section scrolls (and un-draws on the way back up);
 * each entry lights up when the line reaches its node. Everything is visible in
 * the server HTML; only entries below the fold at hydration are held back.
 */
export function Timeline({
	entries,
	maxBullets,
}: {
	entries: TimelineEntry[];
	maxBullets?: number;
}) {
	const ref = useRef<HTMLOListElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.8", "end 0.6"],
	});
	const scaleY = useSpring(scrollYProgress, springs.ui);
	const [reached, setReached] = useState(entries.length);
	const [armed, setArmed] = useState<boolean[]>(() => entries.map(() => false));
	const thresholds = useRef<number[]>([]);

	useEffect(() => {
		const list = ref.current;
		if (!list) return;
		const measure = () => {
			const box = list.getBoundingClientRect();
			const total = box.height || 1;
			thresholds.current = Array.from(
				list.querySelectorAll<HTMLElement>("[data-node]"),
			).map((node) => (node.getBoundingClientRect().top - box.top + 6) / total);
		};
		measure();
		if (!reduce) {
			setArmed(
				Array.from(list.querySelectorAll<HTMLElement>("[data-entry]")).map(
					(el) => el.getBoundingClientRect().top > window.innerHeight,
				),
			);
			setReached(
				thresholds.current.filter((t) => t <= scrollYProgress.get()).length,
			);
		}
		const ro = new ResizeObserver(measure);
		ro.observe(list);
		return () => ro.disconnect();
	}, [reduce, scrollYProgress]);

	useMotionValueEvent(scrollYProgress, "change", (p) => {
		if (reduce) return;
		setReached(thresholds.current.filter((t) => t <= p + 0.001).length);
	});

	return (
		<ol className="relative" ref={ref}>
			<span
				aria-hidden
				className="absolute top-2 bottom-2 left-[5px] w-px bg-border md:left-[calc(8rem+2rem+5px)]"
			>
				<motion.span
					className="absolute inset-0 origin-top bg-accent-graphic"
					style={{ scaleY: reduce ? 1 : scaleY }}
				/>
			</span>

			{entries.map((entry, i) => {
				const lit = reduce || i < reached;
				const hidden = armed[i] && !lit;
				const bullets = maxBullets
					? entry.bullets.slice(0, maxBullets)
					: entry.bullets;
				return (
					<li
						className="relative grid gap-x-8 pb-12 pl-8 last:pb-0 md:grid-cols-[8rem_1fr] md:pl-0"
						data-entry
						key={`${entry.org}-${entry.title}`}
					>
						<p className="label-mono pt-1 text-fg-muted md:text-right">
							{entry.dates}
						</p>

						<span
							aria-hidden
							className="absolute top-1.5 left-0 md:left-[calc(8rem+2rem)]"
							data-node
						>
							{entry.current && lit && (
								<span className="absolute inset-0 animate-halo rounded-full bg-accent-graphic" />
							)}
							<motion.span
								animate={lit && !reduce ? { scale: [1, 1.4, 1] } : { scale: 1 }}
								className={cn(
									"relative block size-[11px] rounded-full border-[1.5px] transition-colors duration-[250ms]",
									lit
										? "border-accent-graphic bg-accent-graphic"
										: "border-border-strong bg-bg",
									!entry.current && lit && "bg-bg",
								)}
								transition={{ duration: duration.ui, ease: ease.out }}
							/>
						</span>

						<motion.div
							animate={hidden ? { opacity: 0, y: rise } : { opacity: 1, y: 0 }}
							className="md:pl-8"
							initial={false}
							transition={{ duration: duration.section, ease: ease.out }}
						>
							<h3 className="text-fg text-h3">{entry.title}</h3>
							<p className="mt-1 text-fg-secondary text-sm">
								{entry.org}
								{entry.location && ` · ${entry.location}`}
							</p>
							{bullets.length > 0 && (
								<ul className="mt-4 space-y-2">
									{bullets.map((b, j) => (
										<motion.li
											animate={
												hidden ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }
											}
											className="flex gap-3 text-fg-secondary text-sm"
											initial={false}
											key={b}
											transition={{
												duration: duration.section,
												ease: ease.out,
												delay: hidden ? 0 : 0.1 + j * 0.06,
											}}
										>
											<span
												aria-hidden
												className="mt-2 size-1 shrink-0 rounded-full bg-accent-graphic"
											/>
											{b}
										</motion.li>
									))}
								</ul>
							)}
						</motion.div>
					</li>
				);
			})}
		</ol>
	);
}
