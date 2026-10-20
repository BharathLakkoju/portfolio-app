"use client";

import { useSyncExternalStore } from "react";

export function usePageVisible() {
	return useSyncExternalStore(
		(onChange) => {
			document.addEventListener("visibilitychange", onChange);
			return () => document.removeEventListener("visibilitychange", onChange);
		},
		() => document.visibilityState === "visible",
		() => true,
	);
}
