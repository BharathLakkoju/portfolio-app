"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling for the whole document. Skipped when the user prefers
 * reduced motion. Nested scroll containers (e.g. the command palette list) opt out
 * with `data-lenis-prevent`.
 */
export function SmoothScroll() {
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		let lenis: Lenis | null = null;
		let frame = 0;

		const raf = (time: number) => {
			lenis?.raf(time);
			frame = requestAnimationFrame(raf);
		};

		const start = () => {
			if (lenis) return;
			lenis = new Lenis({ anchors: true });
			frame = requestAnimationFrame(raf);
		};

		const stop = () => {
			cancelAnimationFrame(frame);
			lenis?.destroy();
			lenis = null;
		};

		const sync = () => (query.matches ? stop() : start());
		sync();
		query.addEventListener("change", sync);

		return () => {
			query.removeEventListener("change", sync);
			stop();
		};
	}, []);

	return null;
}
