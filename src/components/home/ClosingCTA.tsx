"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Magnetic } from "~/components/motion/Magnetic";
import { CopyEmail } from "~/components/shared/CopyEmail";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { profile, site } from "~/lib/data";
import { duration, ease, viewportOnce } from "~/lib/motion";

const LINE = "Still scrolling? Let's build something.";

export function ClosingCTA() {
	const words = LINE.split(" ");
	return (
		<section
			aria-labelledby="closing-title"
			className="relative isolate overflow-hidden border-border border-t"
		>
			<div
				aria-hidden
				className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-[420px] max-w-4xl animate-drift rounded-full bg-[radial-gradient(ellipse_at_bottom,var(--color-accent-glow),transparent_65%)]"
			/>
			<div className="container-page flex flex-col items-center py-[var(--space-section)] text-center">
				<p className="label-mono mb-6 flex items-center gap-2 text-fg-muted">
					<span className="relative grid size-2 place-items-center">
						<span className="absolute inset-0 animate-halo rounded-full bg-status-live" />
						<span className="relative size-2 rounded-full bg-status-live" />
					</span>
					{profile.availability} · {profile.targetRoles.join(" · ")}
				</p>

				<motion.h2
					aria-label={LINE}
					className="max-w-4xl font-display text-[clamp(2.5rem,1.6rem+4.5vw,5.5rem)] text-fg leading-[1.02] tracking-[-0.02em]"
					id="closing-title"
					initial="hidden"
					viewport={viewportOnce}
					whileInView="visible"
				>
					{words.map((word, i) => (
						<motion.span
							aria-hidden
							className="inline-block"
							data-reveal
							// biome-ignore lint/suspicious/noArrayIndexKey: words can repeat
							key={i}
							variants={{
								hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
								visible: {
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
									transition: {
										duration: duration.section,
										ease: ease.out,
										delay: i * 0.04,
									},
								},
							}}
						>
							{i === words.length - 1 ? <em>{word}</em> : word}
							{i < words.length - 1 && "\u00a0"}
						</motion.span>
					))}
				</motion.h2>

				<p className="mt-6 max-w-[52ch] text-body-lg text-fg-secondary">
					Hiring for AI or full-stack? I reply within two working days.
				</p>

				<Magnetic className="mt-10">
					<Link
						className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent-solid px-8 font-medium text-base text-on-accent shadow-[var(--shadow-glow)] transition-colors duration-150 hover:bg-accent-hover active:scale-[0.98]"
						href="/contact"
					>
						Start a conversation
						<ArrowRight
							aria-hidden
							className="transition-transform duration-150 group-hover:translate-x-1"
							size={18}
						/>
					</Link>
				</Magnetic>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
					<CopyEmail />
					<a
						className="inline-flex min-h-11 items-center gap-2 text-fg-secondary text-sm hover:text-fg"
						download={site.resumeFile}
						href={site.resume}
					>
						<Download aria-hidden size={14} />
						Resume
						<span className="sr-only"> (PDF)</span>
					</a>
				</div>
			</div>
		</section>
	);
}
