import type { Transition, Variants } from "framer-motion";

export const duration = {
	micro: 0.15,
	ui: 0.25,
	section: 0.5,
	hero: 0.9,
} as const;

export const ease = {
	out: [0.16, 1, 0.3, 1],
	standard: [0.4, 0, 0.2, 1],
} as const;

/** Raw spring options, for `useSpring`. */
export const springs = {
	ui: { stiffness: 300, damping: 30 },
	soft: { stiffness: 120, damping: 20 },
	magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
} as const;

/** The same springs as transitions, for `transition={...}`. */
export const spring = {
	ui: { type: "spring", ...springs.ui },
	soft: { type: "spring", ...springs.soft },
	magnetic: { type: "spring", ...springs.magnetic },
} as const satisfies Record<string, Transition>;

export const rise = 16;

export const stagger = {
	step: 0.06,
	max: 8,
} as const;

export function staggerDelay(index: number, step: number = stagger.step) {
	return Math.min(index, stagger.max - 1) * step;
}

export const revealVariants: Variants = {
	hidden: { opacity: 0, y: rise },
	visible: (index: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: duration.section,
			ease: ease.out,
			delay: staggerDelay(index),
		},
	}),
};

export const viewportOnce = {
	once: true,
	amount: 0.3,
	margin: "0px 0px -10% 0px",
} as const;
