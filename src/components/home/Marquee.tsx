"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { marqueeItems } from "~/lib/data";

const PAUSE_KEY = "marquee-paused";

function Items({ hidden = false }: { hidden?: boolean }) {
	return (
		<ul
			aria-hidden={hidden || undefined}
			className={
				hidden
					? "marquee-dup flex shrink-0 items-center gap-12 pr-12"
					: "flex shrink-0 items-center gap-12 pr-12"
			}
		>
			{marqueeItems.map((item) => (
				<li
					className="flex items-center gap-2 whitespace-nowrap font-mono text-fg-secondary text-sm tabular-nums"
					key={item.text}
				>
					<span aria-hidden className="size-1 rounded-full bg-accent-graphic" />
					{item.value && <span className="text-fg">{item.value}</span>}
					{item.text}
				</li>
			))}
		</ul>
	);
}

export function Marquee() {
	const ref = useRef<HTMLDivElement>(null);
	const [paused, setPaused] = useState(false);
	const [offscreen, setOffscreen] = useState(false);

	useEffect(() => {
		setPaused(localStorage.getItem(PAUSE_KEY) === "true");
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) =>
			setOffscreen(!(e?.isIntersecting ?? true)),
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	function toggle() {
		setPaused((p) => {
			localStorage.setItem(PAUSE_KEY, String(!p));
			return !p;
		});
	}

	return (
		<section
			aria-label="Highlights"
			className="marquee relative border-border border-y bg-bg/60 backdrop-blur-sm"
			data-offscreen={offscreen}
			data-paused={paused}
			ref={ref}
		>
			<div className="container-page flex h-11 items-center gap-2 md:h-12">
				<div className="marquee-viewport mask-fade-x min-w-0 flex-1 overflow-hidden">
					<div className="marquee-track flex w-max">
						<Items />
						<Items hidden />
					</div>
				</div>
				<button
					aria-label={paused ? "Play highlights" : "Pause highlights"}
					aria-pressed={paused}
					className="-mr-2 grid size-11 shrink-0 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
					onClick={toggle}
					type="button"
				>
					{paused ? <Play size={14} /> : <Pause size={14} />}
				</button>
			</div>
		</section>
	);
}
