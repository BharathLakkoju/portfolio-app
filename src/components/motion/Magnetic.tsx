"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "~/hooks/use-media-query";
import { springs } from "~/lib/motion";
import { cn } from "~/lib/utils";

/**
 * Pulls its child toward the cursor when the pointer is within `radius` px of
 * the element's edge, by at most `max` px. Off on touch and reduced motion.
 */
export function Magnetic({
	children,
	radius = 80,
	max = 12,
	className,
}: {
	children: React.ReactNode;
	radius?: number;
	max?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const x = useSpring(useMotionValue(0), springs.magnetic);
	const y = useSpring(useMotionValue(0), springs.magnetic);
	const enabled = fine && !reduce;

	useEffect(() => {
		const el = ref.current;
		if (!enabled || !el) return;

		function onMove(e: PointerEvent) {
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const outsideX = Math.max(0, Math.abs(dx) - rect.width / 2);
			const outsideY = Math.max(0, Math.abs(dy) - rect.height / 2);
			if (Math.hypot(outsideX, outsideY) > radius) {
				x.set(0);
				y.set(0);
				return;
			}
			const clamp = (v: number) => Math.max(-max, Math.min(max, v));
			x.set(clamp(dx * 0.25));
			y.set(clamp(dy * 0.35));
		}

		function reset() {
			x.set(0);
			y.set(0);
		}

		window.addEventListener("pointermove", onMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", reset);
		return () => {
			window.removeEventListener("pointermove", onMove);
			document.documentElement.removeEventListener("pointerleave", reset);
		};
	}, [enabled, radius, max, x, y]);

	return (
		<motion.div
			className={cn("inline-block", className)}
			ref={ref}
			style={enabled ? { x, y } : undefined}
		>
			{children}
		</motion.div>
	);
}
