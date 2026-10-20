"use client";

import { motion } from "framer-motion";
import { CountUp } from "~/components/motion/CountUp";
import { Stagger, StaggerItem } from "~/components/motion/Reveal";
import { useReducedMotion } from "~/hooks/use-media-query";
import type { ImpactStat } from "~/lib/data";
import { viewportOnce } from "~/lib/motion";
import { cn } from "~/lib/utils";

const SPARK = [
	[8, 70],
	[60, 62],
	[112, 66],
	[164, 48],
	[216, 40],
	[268, 22],
	[312, 12],
] as const;

/** A static line of Signal nodes that one pulse crosses on reveal. */
function Sparkline() {
	const reduce = useReducedMotion();
	const d = SPARK.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
	return (
		<svg
			aria-hidden="true"
			className="mt-auto h-20 w-full max-w-[320px]"
			fill="none"
			viewBox="0 0 320 80"
		>
			<path d={d} stroke="var(--color-border-strong)" strokeWidth="1.5" />
			{SPARK.map(([x, y]) => (
				<circle
					cx={x}
					cy={y}
					fill="var(--color-bg)"
					key={x}
					r="3.5"
					stroke="var(--color-accent-graphic)"
					strokeWidth="1.5"
				/>
			))}
			{!reduce && (
				<motion.circle
					fill="var(--color-accent)"
					initial={{ opacity: 0 }}
					r="4"
					style={{ filter: "drop-shadow(0 0 6px var(--color-accent))" }}
					transition={{ duration: 1.2, ease: "linear", delay: 0.3 }}
					viewport={viewportOnce}
					whileInView={{
						cx: SPARK.map(([x]) => x),
						cy: SPARK.map(([, y]) => y),
						opacity: [0, 1, 1, 0],
					}}
				/>
			)}
		</svg>
	);
}

const sizeClass: Record<ImpactStat["size"], string> = {
	lead: "lg:col-span-6 lg:row-span-2 p-8",
	standard: "lg:col-span-3 p-6",
	wide: "sm:col-span-2 lg:col-span-6 p-6",
};

export function ImpactBento({ stats }: { stats: ImpactStat[] }) {
	return (
		<Stagger
			as="div"
			className="grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-12"
		>
			{stats.map((stat, i) => (
				<StaggerItem
					className={cn(
						"flex flex-col gap-2 rounded-lg border border-border bg-surface shadow-[var(--shadow-1)] transition-colors duration-300 hover:border-border-strong",
						sizeClass[stat.size],
						stat.size === "lead" && "sm:col-span-2 lg:col-span-6",
					)}
					index={i}
					key={stat.label}
				>
					<p className="label-mono text-fg-muted">{stat.label}</p>
					<p
						className={cn(
							"font-semibold text-fg tracking-[-0.02em]",
							stat.size === "lead"
								? "text-[clamp(3.5rem,2.5rem+4vw,6rem)] leading-none"
								: "text-stat",
						)}
					>
						<CountUp suffix={stat.suffix} value={stat.value} />
						<span aria-hidden className="text-[0.6em] text-fg-secondary">
							{stat.suffix}
						</span>{" "}
						<span className="font-normal text-body-lg text-fg-secondary tracking-normal">
							{stat.verb}
						</span>
					</p>
					<p className="text-fg-secondary text-sm">{stat.context}</p>
					{stat.size === "lead" && <Sparkline />}
				</StaggerItem>
			))}
		</Stagger>
	);
}
