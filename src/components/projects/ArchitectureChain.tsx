"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "~/hooks/use-media-query";
import { spring } from "~/lib/motion";
import { cn } from "~/lib/utils";

/** The pipeline as Signal nodes; a highlight walks the chain while in view. */
export function ArchitectureChain({ steps }: { steps: string[] }) {
	const ref = useRef<HTMLOListElement>(null);
	const inView = useInView(ref, { amount: 0.5 });
	const reduce = useReducedMotion();
	const [active, setActive] = useState(-1);

	useEffect(() => {
		if (!inView || reduce) return;
		const id = window.setInterval(
			() => setActive((i) => (i + 1) % (steps.length + 2)),
			650,
		);
		return () => window.clearInterval(id);
	}, [inView, reduce, steps.length]);

	return (
		<ol
			aria-label="Architecture, in order"
			className="relative my-6 rounded-lg border border-border bg-bg-subtle p-5"
			ref={ref}
		>
			<span
				aria-hidden
				className="absolute top-8 bottom-8 left-[calc(1.25rem+5px)] w-px bg-border-strong"
			/>
			{steps.map((step, i) => {
				const [name, detail] = step.split(" · ");
				const on = i === active;
				const past = i < active;
				return (
					<li className="relative flex items-center gap-4 py-2" key={step}>
						<span className="relative grid size-[11px] shrink-0 place-items-center">
							{on && (
								<motion.span
									aria-hidden
									className="absolute -inset-1.5 rounded-full bg-accent-glow"
									layoutId="arch-pulse"
									transition={spring.ui}
								/>
							)}
							<span
								className={cn(
									"relative size-[11px] rounded-full border-[1.5px] border-accent-graphic transition-colors duration-150",
									on || past ? "bg-accent-graphic" : "bg-bg",
								)}
							/>
						</span>
						<span className="font-mono text-sm">
							<span
								className={cn(
									"uppercase tracking-[0.04em] transition-colors duration-150",
									on ? "text-fg" : "text-fg-secondary",
								)}
							>
								{name}
							</span>
							{detail && <span className="text-fg-muted"> · {detail}</span>}
						</span>
					</li>
				);
			})}
		</ol>
	);
}
