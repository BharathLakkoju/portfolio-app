"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer, useReducedMotion } from "~/hooks/use-media-query";
import { springs } from "~/lib/motion";

const GLOW = 560;

/**
 * Blueprint grid drawn on the real 12-column container, plus a soft accent glow
 * that trails the cursor. Both sit behind content and are decorative.
 */
export function BackgroundLayers() {
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const [active, setActive] = useState(false);
	const x = useSpring(useMotionValue(-GLOW), springs.soft);
	const y = useSpring(useMotionValue(-GLOW), springs.soft);
	const glow = fine && !reduce;

	useEffect(() => {
		if (!glow) return;
		function onMove(e: PointerEvent) {
			x.set(e.clientX - GLOW / 2);
			y.set(e.clientY - GLOW / 2);
			setActive(true);
		}
		function onLeave() {
			setActive(false);
		}
		window.addEventListener("pointermove", onMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onLeave);
		return () => {
			window.removeEventListener("pointermove", onMove);
			document.documentElement.removeEventListener("pointerleave", onLeave);
		};
	}, [glow, x, y]);

	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-[var(--z-below)] overflow-hidden"
		>
			<div className="container-page hidden h-full md:block">
				<div className="grid h-full grid-cols-8 gap-x-[var(--gutter)] lg:grid-cols-12">
					{Array.from({ length: 12 }, (_, i) => (
						<div
							className="border-grid-line border-x max-lg:[&:nth-child(n+9)]:hidden"
							// biome-ignore lint/suspicious/noArrayIndexKey: static decorative columns
							key={i}
						/>
					))}
				</div>
			</div>
			{glow && (
				<motion.div
					animate={{ opacity: active ? 1 : 0 }}
					className="absolute top-0 left-0 rounded-full"
					style={{
						x,
						y,
						width: GLOW,
						height: GLOW,
						background:
							"radial-gradient(circle, var(--color-accent-glow) 0%, transparent 65%)",
					}}
					transition={{ duration: 0.5 }}
				/>
			)}
		</div>
	);
}
