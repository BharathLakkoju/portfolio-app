"use client";

import { motion } from "framer-motion";
import { revealVariants, viewportOnce } from "~/lib/motion";

type RevealProps = {
	children: React.ReactNode;
	className?: string;
	/** Position in a stagger sequence (60ms steps, capped at 8). */
	index?: number;
	amount?: number;
};

/** Rise 16px and fade in once when scrolled into view. */
export function Reveal({
	children,
	className,
	index = 0,
	amount,
}: RevealProps) {
	return (
		<motion.div
			className={className}
			custom={index}
			data-reveal
			initial="hidden"
			variants={revealVariants}
			viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
			whileInView="visible"
		>
			{children}
		</motion.div>
	);
}

/** Parent for `StaggerItem`s: one in-view trigger, children delay by index. */
export function Stagger({
	children,
	className,
	as = "div",
	amount,
}: {
	children: React.ReactNode;
	className?: string;
	as?: "div" | "ul" | "ol";
	amount?: number;
}) {
	const Comp = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
	return (
		<Comp
			className={className}
			initial="hidden"
			// Stacked grids on mobile can be several viewports tall, so 30% of the
			// container may never be on screen at once.
			viewport={{ ...viewportOnce, amount: amount ?? 0.1 }}
			whileInView="visible"
		>
			{children}
		</Comp>
	);
}

export function StaggerItem({
	children,
	className,
	index,
	as = "div",
}: {
	children: React.ReactNode;
	className?: string;
	index: number;
	as?: "div" | "li";
}) {
	const Comp = as === "li" ? motion.li : motion.div;
	return (
		<Comp
			className={className}
			custom={index}
			data-reveal
			variants={revealVariants}
		>
			{children}
		</Comp>
	);
}
