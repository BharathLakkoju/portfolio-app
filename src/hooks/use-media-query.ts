"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
	return useSyncExternalStore(
		(onChange) => {
			const mql = window.matchMedia(query);
			mql.addEventListener("change", onChange);
			return () => mql.removeEventListener("change", onChange);
		},
		() => window.matchMedia(query).matches,
		() => serverValue,
	);
}

/**
 * Use instead of framer-motion's `useReducedMotion`, which reads the media query
 * during hydration and makes the client's first render disagree with the server.
 */
export function useReducedMotion() {
	return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Mouse or trackpad: hover effects, tilt, magnetic pull and spotlights apply. */
export function useFinePointer() {
	return useMediaQuery("(hover: hover) and (pointer: fine)");
}
