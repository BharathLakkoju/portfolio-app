"use client";

import { useEffect, useRef, useState } from "react";
import type { ContributionDay } from "~/lib/github";
import { cn } from "~/lib/utils";

const LEVEL_OPACITY = [0, 0.25, 0.5, 0.75, 1];
const MOBILE_WEEKS = 26;
/** Half the widest tooltip, so it never pokes out of the card edges. */
const EDGE_PAD = 76;
const TOUCH_HIDE_MS = 2400;

const dateFormat = new Intl.DateTimeFormat("en-US", {
	weekday: "short",
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

type Tip = {
	x: number;
	y: number;
	count: number;
	level: number;
	date: string;
};

function swatch(level: number) {
	return level > 0
		? `color-mix(in oklab, var(--color-accent-graphic) ${(LEVEL_OPACITY[level] ?? 1) * 100}%, var(--color-bg))`
		: undefined;
}

function countLabel(count: number) {
	if (count === 0) return "No contributions";
	return `${count.toLocaleString("en-US")} contribution${count === 1 ? "" : "s"}`;
}

export function ContributionGrid({ weeks }: { weeks: ContributionDay[][] }) {
	const box = useRef<HTMLDivElement>(null);
	const hideTimer = useRef<number | undefined>(undefined);
	const [tip, setTip] = useState<Tip | null>(null);
	const [shown, setShown] = useState(false);
	const mobileStart = weeks.length - MOBILE_WEEKS;

	useEffect(() => () => window.clearTimeout(hideTimer.current), []);

	function show(e: React.PointerEvent) {
		const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-date]");
		const container = box.current;
		if (!cell || !container) return;

		window.clearTimeout(hideTimer.current);
		const c = cell.getBoundingClientRect();
		const b = container.getBoundingClientRect();
		const x = c.left - b.left + c.width / 2;
		setTip({
			x: Math.min(Math.max(x, EDGE_PAD), b.width - EDGE_PAD),
			y: c.top - b.top,
			count: Number(cell.dataset.count),
			level: Number(cell.dataset.level),
			date: cell.dataset.date ?? "",
		});
		setShown(true);

		// Touch has no hover-out, so let the tooltip time out instead.
		if (e.pointerType !== "mouse") {
			hideTimer.current = window.setTimeout(
				() => setShown(false),
				TOUCH_HIDE_MS,
			);
		}
	}

	function hide(e: React.PointerEvent) {
		if (e.pointerType === "mouse") setShown(false);
	}

	return (
		<div
			aria-hidden
			className="relative"
			onPointerDown={show}
			onPointerLeave={hide}
			onPointerMove={show}
			ref={box}
		>
			<div className="grid auto-cols-fr grid-flow-col gap-[3px]">
				{weeks.map((week, w) => (
					<div
						className={cn(
							"grid grid-rows-7 gap-[3px]",
							w < mobileStart && "max-md:hidden",
						)}
						key={week.find((d) => d.date)?.date}
					>
						{week.map((day, i) => (
							<span
								className={cn(
									"aspect-square w-full rounded-[2px] bg-bg",
									day.date &&
										"hover:outline hover:outline-fg-secondary hover:outline-offset-1",
								)}
								data-count={day.date ? day.count : undefined}
								data-date={day.date || undefined}
								data-level={day.date ? day.level : undefined}
								key={day.date || `pad-${i}`}
								style={
									day.level > 0
										? { background: swatch(day.level) }
										: day.level < 0
											? { visibility: "hidden" }
											: undefined
								}
							/>
						))}
					</div>
				))}
			</div>

			<div
				className={cn(
					"pointer-events-none absolute z-[var(--z-dropdown)] flex w-max -translate-x-1/2 -translate-y-full flex-col gap-0.5 rounded-md border border-border-strong bg-bg-subtle px-2.5 py-1.5 shadow-[var(--shadow-2)] transition-opacity duration-150 ease-out motion-reduce:transition-none",
					shown ? "opacity-100" : "opacity-0",
				)}
				style={{ left: tip?.x ?? 0, top: (tip?.y ?? 0) - 8 }}
			>
				<span className="flex items-center gap-2 font-medium text-fg text-xs tabular-nums">
					<span
						className="size-2 shrink-0 rounded-[2px] border border-border-strong bg-bg"
						style={{ background: swatch(tip?.level ?? 0) }}
					/>
					{countLabel(tip?.count ?? 0)}
				</span>
				<span className="label-mono text-fg-muted">
					{tip?.date ? dateFormat.format(new Date(tip.date)) : ""}
				</span>
			</div>
		</div>
	);
}
