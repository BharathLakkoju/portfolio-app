"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { duration, ease, rise, viewportOnce } from "~/lib/motion";
import { cn } from "~/lib/utils";

type SectionHeaderProps = {
	index?: string;
	label: string;
	title: string;
	description?: string;
	link?: { href: string; label: string };
	as?: "h1" | "h2";
	className?: string;
	id?: string;
};

const item = (delay: number, blur = false) => ({
	hidden: {
		opacity: 0,
		y: blur ? rise : 0,
		filter: blur ? "blur(6px)" : "blur(0px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: duration.section, ease: ease.out, delay },
	},
});

/** Hairline, index label, then a heading that sharpens out of a blur. */
export function SectionHeader({
	index,
	label,
	title,
	description,
	link,
	as = "h2",
	className,
	id,
}: SectionHeaderProps) {
	const Heading = as === "h1" ? motion.h1 : motion.h2;
	return (
		<motion.header
			className={cn(
				"mb-[var(--space-section-head)] flex flex-col gap-3 border-border border-t pt-6 md:flex-row md:items-end md:justify-between",
				className,
			)}
			initial="hidden"
			viewport={viewportOnce}
			whileInView="visible"
		>
			<div className="max-w-2xl">
				<motion.p
					className="label-sans mb-3 text-fg-muted"
					data-reveal
					variants={item(0)}
				>
					{index ? `${index} / ${label}` : `/ ${label}`}
				</motion.p>
				<Heading
					className={cn(
						"text-fg",
						as === "h1"
							? "text-h1 tracking-[-0.02em]"
							: "text-h2 tracking-[-0.015em]",
					)}
					data-reveal
					id={id}
					variants={item(0.06, true)}
				>
					{title}
				</Heading>
				{description && (
					<motion.p
						className="mt-3 max-w-[60ch] text-fg-secondary"
						data-reveal
						variants={item(0.12)}
					>
						{description}
					</motion.p>
				)}
			</div>
			{link && (
				<motion.div data-reveal variants={item(0.12)}>
					<Link
						className="group -mx-3 inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 font-medium text-fg-secondary text-sm transition-colors duration-150 hover:text-fg"
						href={link.href}
					>
						{link.label}
						<ArrowRight
							aria-hidden
							className="transition-transform duration-150 group-hover:translate-x-0.5"
							size={14}
						/>
					</Link>
				</motion.div>
			)}
		</motion.header>
	);
}
