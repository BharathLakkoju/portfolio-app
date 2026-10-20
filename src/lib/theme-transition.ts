"use client";

/**
 * Swap the theme with a circular reveal centred on `origin` (the toggle, or the
 * viewport centre for the `T` shortcut). Falls back to an instant swap without
 * View Transitions or under reduced motion.
 */
export function switchTheme(
	next: "light" | "dark",
	setTheme: (theme: string) => void,
	origin?: { x: number; y: number },
) {
	const root = document.documentElement;
	const apply = () => {
		root.classList.remove("light", "dark");
		root.classList.add(next);
		root.style.colorScheme = next;
		setTheme(next);
	};

	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (typeof document.startViewTransition !== "function" || reduce) {
		apply();
		return;
	}

	const x = origin?.x ?? window.innerWidth / 2;
	const y = origin?.y ?? window.innerHeight / 2;
	const radius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y),
	);

	root.dataset.vt = "theme";
	const transition = document.startViewTransition(apply);
	transition.ready
		.then(() => {
			root.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${radius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 450,
					easing: "cubic-bezier(0.65, 0, 0.35, 1)",
					pseudoElement: "::view-transition-new(root)",
				},
			);
		})
		.catch(() => {});
	transition.finished.finally(() => {
		if (root.dataset.vt === "theme") delete root.dataset.vt;
	});
}
