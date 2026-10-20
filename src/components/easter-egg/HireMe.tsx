"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "~/hooks/use-media-query";
import { site } from "~/lib/data";
import { duration, ease } from "~/lib/motion";

const LINES = [
	"> sudo hire me",
	"[sudo] password for recruiter: ••••••••",
	"> permission granted",
];

export default function HireMe() {
	const reduce = useReducedMotion();
	const [visible, setVisible] = useState(true);
	const [shown, setShown] = useState(reduce ? LINES.length : 0);

	useEffect(() => {
		if (reduce) return;
		const timers = LINES.map((_, i) =>
			window.setTimeout(() => setShown(i + 1), 250 + i * 350),
		);
		return () => {
			for (const t of timers) window.clearTimeout(t);
		};
	}, [reduce]);

	useEffect(() => {
		const t = window.setTimeout(() => setVisible(false), 12000);
		return () => window.clearTimeout(t);
	}, []);

	const granted = shown >= LINES.length;

	return (
		<>
			{granted && !reduce && <ParticleBurst />}
			<AnimatePresence>
				{visible && (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="fixed bottom-24 left-1/2 z-[var(--z-toast)] w-[min(380px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-md border border-border-strong bg-bg-subtle font-mono text-label shadow-[var(--shadow-3)]"
						exit={{
							opacity: 0,
							y: 16,
							transition: { duration: duration.micro },
						}}
						initial={{ opacity: 0, y: 24 }}
						role="status"
						transition={{ duration: duration.ui, ease: ease.out }}
					>
						<div className="flex items-center gap-1.5 border-border border-b px-3 py-1.5">
							<span className="size-2 rounded-full bg-danger" />
							<span className="size-2 rounded-full bg-warning" />
							<span className="size-2 rounded-full bg-success" />
							<span className="ml-2 text-fg-muted">bharath@portfolio</span>
							<button
								aria-label="Close"
								className="-mr-2 ml-auto grid size-8 place-items-center rounded-sm text-fg-secondary hover:text-fg"
								onClick={() => setVisible(false)}
								type="button"
							>
								<X size={14} />
							</button>
						</div>
						<div className="space-y-1 p-3 text-fg-secondary">
							{LINES.slice(0, shown).map((line, i) => (
								<p
									className={
										i === LINES.length - 1 ? "text-success" : undefined
									}
									key={line}
								>
									{line}
								</p>
							))}
							{granted && (
								<motion.p
									animate={{ opacity: 1 }}
									className="pt-1"
									initial={{ opacity: 0 }}
									transition={{ duration: duration.ui, delay: 0.2 }}
								>
									<a
										className="text-accent underline-offset-4 hover:underline"
										href={site.resume}
										rel="noopener"
										target="_blank"
									>
										→ open resume.pdf
									</a>
								</motion.p>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

function ParticleBurst() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		ctx.scale(dpr, dpr);

		const color =
			getComputedStyle(document.documentElement)
				.getPropertyValue("--color-accent")
				.trim() || "#22d3ee";
		const cx = window.innerWidth / 2;
		const cy = window.innerHeight / 2;
		const particles = Array.from({ length: 40 }, (_, i) => {
			const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
			const speed = 180 + Math.random() * 260;
			return {
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				r: 1.5 + Math.random() * 2.5,
			};
		});

		const start = performance.now();
		let raf = 0;
		const draw = (now: number) => {
			const t = Math.min((now - start) / 900, 1);
			const eased = 1 - (1 - t) ** 3;
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			ctx.fillStyle = color;
			ctx.globalAlpha = 1 - t;
			for (const p of particles) {
				ctx.beginPath();
				ctx.arc(
					cx + p.vx * eased,
					cy + p.vy * eased + 60 * t * t,
					p.r,
					0,
					Math.PI * 2,
				);
				ctx.fill();
			}
			if (t < 1) raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<canvas
			aria-hidden
			className="pointer-events-none fixed inset-0 z-[var(--z-toast)] size-full"
			ref={ref}
		/>
	);
}
