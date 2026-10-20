"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "~/hooks/use-media-query";
import { heroPhrases } from "~/lib/data";
import { ease } from "~/lib/motion";

const HOLD_MS = 1300;

/**
 * "builds <phrase>". Cycles through the phrases once and comes to rest on the
 * first, so it stops on its own in about five seconds. Hover pauses it. Screen
 * readers get one static sentence.
 */
export function RoleRotator({ start }: { start: boolean }) {
	const reduce = useReducedMotion();
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [done, setDone] = useState(false);

	useEffect(() => {
		if (!start || reduce || paused || done) return;
		const t = window.setTimeout(() => {
			const next = (index + 1) % heroPhrases.length;
			setIndex(next);
			if (next === 0) setDone(true);
		}, HOLD_MS);
		return () => window.clearTimeout(t);
	}, [start, reduce, paused, done, index]);

	const phrase = heroPhrases[index] ?? heroPhrases[0];
	const all = `${heroPhrases.slice(0, -1).join(", ")} and ${heroPhrases.at(-1)}`;

	return (
		<p
			className="text-body-lg text-fg-secondary"
			data-boot="rotator"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<span className="sr-only">Builds {all}.</span>
			<span aria-hidden className="inline-flex items-baseline gap-2">
				<span>builds</span>
				<span className="inline-grid font-display text-[1.75em] text-fg italic leading-[1.15]">
					{heroPhrases.map((p) => (
						<span className="invisible col-start-1 row-start-1" key={p}>
							{p}
						</span>
					))}
					<AnimatePresence initial={false} mode="wait">
						<motion.span
							animate={{
								y: 0,
								opacity: 1,
								filter: "blur(0px)",
								transition: { duration: 0.35, ease: ease.out },
							}}
							className="col-start-1 row-start-1"
							exit={{
								y: -12,
								opacity: 0,
								filter: "blur(4px)",
								transition: { duration: 0.25, ease: ease.standard },
							}}
							initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
							key={phrase}
						>
							{phrase}
						</motion.span>
					</AnimatePresence>
				</span>
			</span>
		</p>
	);
}
