"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Badge, Chip } from "~/components/ui/badge";
import { useReducedMotion } from "~/hooks/use-media-query";
import type { Role, WorkMetric } from "~/lib/data";
import { duration, ease, spring } from "~/lib/motion";
import { cn } from "~/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** Headline of a tab, as plain text: "+69%" or "Java → NestJS". */
function headline(m: WorkMetric) {
	return typeof m.value === "number"
		? `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}`
		: m.value;
}

/**
 * Counts up each time its tab is opened. The final value is server-rendered
 * (and read by assistive tech); the first paint never animates.
 */
function MetricValue({
	metric,
	active,
	reduce,
}: {
	metric: WorkMetric;
	active: boolean;
	reduce: boolean;
}) {
	const target = typeof metric.value === "number" ? metric.value : 0;
	const mv = useMotionValue(target);
	const text = useTransform(mv, (v) => Math.round(v).toString());
	const mounted = useRef(false);

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
			return;
		}
		if (!active || reduce || typeof metric.value !== "number") {
			mv.set(target);
			return;
		}
		mv.set(0);
		const controls = animate(mv, target, {
			duration: 0.9,
			ease: ease.out,
		});
		return () => controls.stop();
	}, [active, reduce, metric.value, mv, target]);

	if (typeof metric.value !== "number") {
		return <span>{metric.value}</span>;
	}

	return (
		<>
			<span className="sr-only">{headline(metric)}</span>
			<span aria-hidden className="tabular-nums">
				{metric.prefix}
				<motion.span>{text}</motion.span>
				{metric.suffix}
			</span>
		</>
	);
}

export function ExperienceShowcase({
	role,
	tenure,
}: {
	role: Role;
	tenure: string;
}) {
	const uid = useId();
	const reduce = useReducedMotion();
	const [active, setActive] = useState(0);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);
	const count = role.workstreams.length;

	function select(next: number, focus = false) {
		const i = (next + count) % count;
		setActive(i);
		if (focus) tabs.current[i]?.focus();
	}

	function onKeyDown(e: React.KeyboardEvent) {
		const step: Record<string, number> = {
			ArrowDown: 1,
			ArrowRight: 1,
			ArrowUp: -1,
			ArrowLeft: -1,
		};
		if (e.key in step) {
			e.preventDefault();
			select(active + (step[e.key] ?? 0), true);
		} else if (e.key === "Home") {
			e.preventDefault();
			select(0, true);
		} else if (e.key === "End") {
			e.preventDefault();
			select(count - 1, true);
		}
	}

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-1)]">
			<header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 border-border border-b p-6">
				<div className="max-w-[var(--measure-prose)]">
					<h3 className="text-fg text-h3">{role.title}</h3>
					<p className="mt-1 text-fg-secondary text-sm">
						{role.org} · {role.location}
					</p>
					<p className="mt-3 text-fg-secondary text-sm">{role.summary}</p>
				</div>
				<div className="flex flex-col items-start gap-2 sm:items-end">
					{role.current && (
						<Badge variant="live">
							<span
								aria-hidden
								className="size-1.5 animate-pulse rounded-full bg-success motion-reduce:animate-none"
							/>
							Current
						</Badge>
					)}
					<p className="label-mono text-fg-muted">
						{role.dates} · {tenure}
					</p>
				</div>
			</header>

			<div className="grid md:grid-cols-12">
				<div
					aria-label={`${role.title} highlights`}
					aria-orientation="vertical"
					className="flex flex-col gap-1 border-border border-b p-2 md:col-span-5 md:border-r md:border-b-0"
					onKeyDown={onKeyDown}
					role="tablist"
				>
					{role.workstreams.map((w, i) => {
						const selected = i === active;
						return (
							<button
								aria-controls={`${uid}-panel-${i}`}
								aria-selected={selected}
								className={cn(
									"group relative flex min-h-14 w-full items-center gap-3 rounded-md px-3 text-left transition-colors duration-150",
									selected
										? "bg-surface-2 text-fg"
										: "text-fg-secondary hover:bg-surface-2/60 hover:text-fg",
								)}
								id={`${uid}-tab-${i}`}
								key={w.id}
								onClick={() => select(i)}
								ref={(el) => {
									tabs.current[i] = el;
								}}
								role="tab"
								tabIndex={selected ? 0 : -1}
								type="button"
							>
								{selected && (
									<motion.span
										aria-hidden
										className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent-graphic"
										layoutId={`${uid}-tab-bar`}
										transition={reduce ? { duration: 0 } : spring.ui}
									/>
								)}
								<span
									className={cn(
										"label-mono w-5 shrink-0 transition-colors duration-150",
										selected ? "text-accent" : "text-fg-muted",
									)}
								>
									{pad(i + 1)}
								</span>
								<span className="min-w-0 flex-1 truncate font-medium text-sm">
									{w.name}
								</span>
								<span
									className={cn(
										"label-mono shrink-0 tabular-nums transition-colors duration-150",
										selected ? "text-fg" : "text-fg-muted",
									)}
								>
									{w.metrics[0] ? headline(w.metrics[0]) : ""}
								</span>
							</button>
						);
					})}
				</div>

				<div className="relative min-h-[17rem] p-6 md:col-span-7 md:p-8">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_100%_0%,var(--color-accent-glow),transparent_70%)] opacity-60"
					/>
					<div className="relative flex h-full flex-col">
						{role.workstreams.map((w, i) => {
							const selected = i === active;
							return (
								<div
									aria-labelledby={`${uid}-tab-${i}`}
									className="flex flex-1 flex-col"
									hidden={!selected}
									id={`${uid}-panel-${i}`}
									key={w.id}
									role="tabpanel"
								>
									<motion.div
										animate={
											selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
										}
										className="flex flex-1 flex-col"
										initial={false}
										transition={{
											duration: reduce ? 0 : duration.section,
											ease: ease.out,
										}}
									>
										<p className="label-mono text-fg-muted">
											{pad(i + 1)} / {pad(count)} · {w.name}
										</p>

										<dl className="mt-5 flex flex-wrap gap-x-10 gap-y-5">
											{w.metrics.map((m) => (
												<div key={m.label}>
													<dt className="sr-only">{m.label}</dt>
													<dd
														className={cn(
															"font-semibold text-fg leading-none tracking-tight",
															typeof m.value === "number"
																? "text-stat"
																: "text-h2",
														)}
													>
														<MetricValue
															active={selected}
															metric={m}
															reduce={reduce}
														/>
													</dd>
													<p
														aria-hidden
														className="label-mono mt-2 text-fg-muted"
													>
														{m.label}
													</p>
												</div>
											))}
										</dl>

										<p className="mt-6 max-w-[40ch] text-fg-secondary">
											{w.summary}
										</p>

										<ul className="mt-auto flex flex-wrap gap-2 pt-6">
											{w.stack.map((s) => (
												<li key={s}>
													<Chip>{s}</Chip>
												</li>
											))}
										</ul>
									</motion.div>
								</div>
							);
						})}

						<div className="mt-6 flex items-center justify-between border-border border-t pt-3">
							<p className="label-mono hidden text-fg-muted md:block">
								Use ↑ ↓ to browse
							</p>
							<div className="ml-auto flex items-center gap-1">
								<button
									aria-label="Previous highlight"
									className="grid size-11 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
									onClick={() => select(active - 1)}
									type="button"
								>
									<ChevronLeft aria-hidden size={16} />
								</button>
								<button
									aria-label="Next highlight"
									className="grid size-11 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
									onClick={() => select(active + 1)}
									type="button"
								>
									<ChevronRight aria-hidden size={16} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
