"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "~/hooks/use-media-query";

const NODES = [
	{ x: 60, y: 70 },
	{ x: 150, y: 30 },
	{ x: 250, y: 60 },
	{ x: 210, y: 150 },
	{ x: 100, y: 160 },
];
const EDGES: [number, number][] = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 0],
	[1, 3],
];
const STRAY = { x: 330, y: 170 };

/** The Signal graph with one node that never connects. It leans 12px toward the graph. */
export function LostSignal() {
	const reduced = useReducedMotion();
	const target = NODES[3] ?? { x: 0, y: 0 };

	return (
		<svg
			aria-hidden="true"
			className="h-auto w-full max-w-sm"
			fill="none"
			viewBox="0 0 380 210"
		>
			{EDGES.map(([a, b]) => {
				const p = NODES[a];
				const q = NODES[b];
				if (!p || !q) return null;
				return (
					<line
						key={`${a}-${b}`}
						stroke="var(--color-border-strong)"
						strokeWidth={1}
						x1={p.x}
						x2={q.x}
						y1={p.y}
						y2={q.y}
					/>
				);
			})}
			<line
				stroke="var(--color-border-strong)"
				strokeDasharray="3 5"
				strokeWidth={1}
				x1={target.x}
				x2={STRAY.x - 30}
				y1={target.y}
				y2={STRAY.y - 4}
			/>
			{NODES.map((n) => (
				<circle
					cx={n.x}
					cy={n.y}
					fill="var(--color-fg-muted)"
					key={`${n.x}-${n.y}`}
					r={4}
				/>
			))}
			<motion.g
				animate={
					reduced ? undefined : { x: [0, -12, -12, 0], y: [0, -2, -2, 0] }
				}
				transition={{
					duration: 3.2,
					repeat: Number.POSITIVE_INFINITY,
					repeatDelay: 1,
					ease: "easeInOut",
				}}
			>
				<circle
					cx={STRAY.x}
					cy={STRAY.y}
					r={10}
					stroke="var(--color-accent-graphic)"
					strokeOpacity={0.35}
				/>
				<circle
					cx={STRAY.x}
					cy={STRAY.y}
					fill="var(--color-accent-graphic)"
					r={5}
				/>
			</motion.g>
		</svg>
	);
}
