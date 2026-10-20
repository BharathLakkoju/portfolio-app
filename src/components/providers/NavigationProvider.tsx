"use client";

import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";

type Navigate = (href: string) => void;

const NavigationContext = createContext<Navigate | null>(null);

/**
 * Wraps client navigations in the View Transitions API. Elements that share a
 * `view-transition-name` on both pages (project card → case study header) morph;
 * everything else gets the root cross-fade from globals.css. Browsers without the
 * API navigate normally.
 */
export function NavigationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const settle = useRef<(() => void) | null>(null);

	useEffect(() => {
		if (!pathname) return;
		settle.current?.();
		settle.current = null;
	}, [pathname]);

	const navigate = useCallback<Navigate>(
		(href) => {
			if (typeof document.startViewTransition !== "function") {
				router.push(href);
				return;
			}
			const root = document.documentElement;
			root.dataset.vt = "page";
			const transition = document.startViewTransition(
				() =>
					new Promise<void>((resolve) => {
						settle.current = resolve;
						router.push(href);
						window.setTimeout(resolve, 1500);
					}),
			);
			transition.finished.finally(() => {
				if (root.dataset.vt === "page") delete root.dataset.vt;
			});
		},
		[router],
	);

	return (
		<NavigationContext.Provider value={navigate}>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigate(): Navigate {
	const navigate = useContext(NavigationContext);
	const router = useRouter();
	return navigate ?? router.push;
}
