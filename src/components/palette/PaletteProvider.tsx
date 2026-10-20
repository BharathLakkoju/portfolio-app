"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useNavigate } from "~/components/providers/NavigationProvider";
import { profile } from "~/lib/data";
import { duration, ease } from "~/lib/motion";
import { switchTheme } from "~/lib/theme-transition";

const CommandPalette = dynamic(() => import("./CommandPalette"), {
	ssr: false,
});
const HireMe = dynamic(() => import("../easter-egg/HireMe"), { ssr: false });

export type PalettePost = { slug: string; title: string };

type PaletteContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	shortcutsEnabled: boolean;
	setShortcutsEnabled: (enabled: boolean) => void;
	toggleTheme: (origin?: { x: number; y: number }) => void;
	hireMe: () => void;
	posts: PalettePost[];
	isMac: boolean;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function usePalette() {
	const ctx = useContext(PaletteContext);
	if (!ctx) throw new Error("usePalette must be used inside PaletteProvider");
	return ctx;
}

const SHORTCUTS_KEY = "shortcuts-enabled";
const HINT_KEY = "palette-hint-seen";
const HIRE_KEY = "hire-me-seen";
const SECRET = "sudo hire me";

function isSecretInProgress(buffer: string) {
	for (let i = 0; i <= buffer.length - 2; i++) {
		if (SECRET.startsWith(buffer.slice(i))) return true;
	}
	return false;
}

export function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false;
	return (
		target.isContentEditable ||
		target.closest("input, textarea, select, [contenteditable='true']") !== null
	);
}

export function PaletteProvider({
	children,
	posts,
}: {
	children: React.ReactNode;
	posts: PalettePost[];
}) {
	const [open, setOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [shortcutsEnabled, setShortcutsState] = useState(true);
	const [hint, setHint] = useState(false);
	const [hireMe, setHireMe] = useState(0);
	const [isMac, setIsMac] = useState(true);
	const { resolvedTheme, setTheme } = useTheme();
	const navigate = useNavigate();
	const gPressed = useRef(0);
	const typed = useRef("");
	const lastTyped = useRef(0);

	useEffect(() => {
		setIsMac(
			/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent),
		);
		setShortcutsState(localStorage.getItem(SHORTCUTS_KEY) !== "false");

		const warm = () => void import("./CommandPalette");
		if ("requestIdleCallback" in window) window.requestIdleCallback(warm);
		else globalThis.setTimeout(warm, 2000);

		const fine = window.matchMedia(
			"(hover: hover) and (pointer: fine)",
		).matches;
		if (!fine || localStorage.getItem(HINT_KEY)) return;
		const show = window.setTimeout(() => setHint(true), 3000);
		const hide = window.setTimeout(() => {
			setHint(false);
			localStorage.setItem(HINT_KEY, "1");
		}, 9000);
		return () => {
			window.clearTimeout(show);
			window.clearTimeout(hide);
		};
	}, []);

	const openPalette = useCallback((next: boolean) => {
		if (next) {
			setLoaded(true);
			setHint(false);
			localStorage.setItem(HINT_KEY, "1");
		}
		setOpen(next);
	}, []);

	const setShortcutsEnabled = useCallback((enabled: boolean) => {
		setShortcutsState(enabled);
		localStorage.setItem(SHORTCUTS_KEY, String(enabled));
	}, []);

	const toggleTheme = useCallback(
		(origin?: { x: number; y: number }) => {
			switchTheme(
				resolvedTheme === "dark" ? "light" : "dark",
				setTheme,
				origin,
			);
		},
		[resolvedTheme, setTheme],
	);

	const triggerHireMe = useCallback(() => {
		if (sessionStorage.getItem(HIRE_KEY)) return;
		sessionStorage.setItem(HIRE_KEY, "1");
		setHireMe((n) => n + 1);
	}, []);

	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			const key = e.key.toLowerCase();

			if ((e.metaKey || e.ctrlKey) && key === "k") {
				e.preventDefault();
				openPalette(!open);
				return;
			}
			if (open || e.metaKey || e.ctrlKey || e.altKey) return;
			if (isTypingTarget(e.target)) return;

			if (e.key.length === 1) {
				const now = Date.now();
				if (now - lastTyped.current > 1500) typed.current = "";
				lastTyped.current = now;
				typed.current = (typed.current + key).slice(-SECRET.length);
				if (typed.current === SECRET) {
					typed.current = "";
					triggerHireMe();
					return;
				}
			}

			if (key === "/") {
				e.preventDefault();
				openPalette(true);
				return;
			}
			if (!shortcutsEnabled || e.shiftKey) return;

			// Typing the secret phrase shouldn't fire single-key shortcuts along the way.
			if (isSecretInProgress(typed.current)) return;

			if (key === "g") {
				gPressed.current = Date.now();
				return;
			}
			const afterG = Date.now() - gPressed.current < 1000;
			gPressed.current = 0;
			if (afterG && key === "h") {
				window.open(profile.github, "_blank", "noopener");
				return;
			}

			const routes: Record<string, string> = {
				h: "/",
				p: "/projects",
				b: "/blog",
				a: "/about",
			};
			const route = routes[key];
			if (route) {
				navigate(route);
				return;
			}
			if (key === "t") toggleTheme();
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [
		open,
		openPalette,
		shortcutsEnabled,
		navigate,
		toggleTheme,
		triggerHireMe,
	]);

	const value = useMemo<PaletteContextValue>(
		() => ({
			open,
			setOpen: openPalette,
			shortcutsEnabled,
			setShortcutsEnabled,
			toggleTheme,
			hireMe: triggerHireMe,
			posts,
			isMac,
		}),
		[
			open,
			openPalette,
			shortcutsEnabled,
			setShortcutsEnabled,
			toggleTheme,
			triggerHireMe,
			posts,
			isMac,
		],
	);

	return (
		<PaletteContext.Provider value={value}>
			{children}
			{loaded && <CommandPalette />}
			{hireMe > 0 && <HireMe key={hireMe} />}
			<AnimatePresence>
				{hint && (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="pointer-events-none fixed bottom-24 left-1/2 z-[var(--z-toast)] -translate-x-1/2 rounded-md border border-border-strong bg-surface px-3 py-2 font-mono text-fg-secondary text-label shadow-[var(--shadow-2)]"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0, y: 8 }}
						role="status"
						transition={{ duration: duration.ui, ease: ease.out }}
					>
						Press{" "}
						<kbd className="rounded-sm border border-border-strong px-1.5 py-0.5 text-fg">
							{isMac ? "⌘K" : "Ctrl K"}
						</kbd>{" "}
						to jump anywhere
					</motion.div>
				)}
			</AnimatePresence>
		</PaletteContext.Provider>
	);
}
