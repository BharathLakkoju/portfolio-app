"use client";

import {
	AnimatePresence,
	type MotionValue,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import {
	Download,
	FolderGit2,
	Home,
	type LucideIcon,
	Mail,
	Moon,
	PenLine,
	Search,
	Sun,
	UserRound,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { usePalette } from "~/components/palette/PaletteProvider";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { useFinePointer, useReducedMotion } from "~/hooks/use-media-query";
import { navLinks, profile, site } from "~/lib/data";
import { duration, ease, spring } from "~/lib/motion";
import { cn } from "~/lib/utils";

const ICONS: Record<(typeof navLinks)[number]["href"], LucideIcon> = {
	"/": Home,
	"/about": UserRound,
	"/projects": FolderGit2,
	"/blog": PenLine,
	"/contact": Mail,
};

const BASE = 44;
const MAX = 60;
const RANGE = 150;
const magnifySpring = { mass: 0.1, stiffness: 170, damping: 14 };

function isActive(pathname: string, href: string) {
	return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** `~/blog/a-very-long-post-slug` → `~/…/a-very-long-post`. */
function promptPath(pathname: string) {
	const full = `~${pathname === "/" ? "" : pathname}`;
	if (full.length <= 22) return full === "~" ? "~/" : full;
	const last = pathname.split("/").filter(Boolean).pop() ?? "";
	return `~/…/${last.length > 16 ? `${last.slice(0, 16)}…` : last}`;
}

function useHeroCtaVisible(pathname: string) {
	const [visible, setVisible] = useState(false);
	// biome-ignore lint/correctness/useExhaustiveDependencies: #hero-cta mounts and unmounts with the route
	useEffect(() => {
		const el = document.getElementById("hero-cta");
		if (!el) {
			setVisible(false);
			return;
		}
		const io = new IntersectionObserver(([entry]) =>
			setVisible(entry?.isIntersecting ?? false),
		);
		io.observe(el);
		return () => io.disconnect();
	}, [pathname]);
	return visible;
}

/** Hidden after scrolling down past the fold edge, back on any upward scroll. */
function useHideOnScroll() {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	useMotionValueEvent(scrollY, "change", (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		if (y < 120) setHidden(false);
		else if (y > prev + 4) setHidden(true);
		else if (y < prev - 4) setHidden(false);
	});
	return hidden;
}

function useTypedText(text: string, instant: boolean) {
	const [typed, setTyped] = useState(text);
	useEffect(() => {
		if (instant) {
			setTyped(text);
			return;
		}
		let i = 1;
		setTyped(text.slice(0, 1));
		const id = window.setInterval(() => {
			i += 1;
			setTyped(text.slice(0, i));
			if (i >= text.length) window.clearInterval(id);
		}, 32);
		return () => window.clearInterval(id);
	}, [text, instant]);
	return typed;
}

function DockSlot({
	mouseX,
	magnify,
	label,
	hint,
	className,
	children,
}: {
	mouseX: MotionValue<number>;
	magnify: boolean;
	label: string;
	hint?: string;
	className?: string;
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [tip, setTip] = useState(false);
	const distance = useTransform(mouseX, (x) => {
		const b = ref.current?.getBoundingClientRect();
		return b ? x - (b.left + b.width / 2) : Number.POSITIVE_INFINITY;
	});
	const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
	const size = useSpring(target, magnifySpring);

	return (
		<motion.div
			className={cn("relative size-11 shrink-0 max-[379px]:size-10", className)}
			onBlur={() => setTip(false)}
			onFocus={() => setTip(true)}
			onPointerEnter={() => setTip(true)}
			onPointerLeave={() => setTip(false)}
			ref={ref}
			style={magnify ? { width: size, height: size } : undefined}
		>
			<AnimatePresence>
				{tip && (
					<motion.span
						animate={{ opacity: 1, y: 0, x: "-50%" }}
						aria-hidden
						className="pointer-events-none absolute bottom-full left-1/2 mb-3 flex items-center gap-2 whitespace-nowrap rounded-md border border-border-strong bg-bg-subtle px-2.5 py-1.5 text-fg text-xs shadow-[var(--shadow-2)]"
						exit={{ opacity: 0, y: 4, x: "-50%" }}
						initial={{ opacity: 0, y: 4, x: "-50%" }}
						transition={{ duration: duration.micro, ease: ease.out }}
					>
						{label}
						{hint && (
							<kbd className="rounded-sm border border-border-strong px-1 font-mono text-[10px] text-fg-muted">
								{hint}
							</kbd>
						)}
					</motion.span>
				)}
			</AnimatePresence>
			{children}
		</motion.div>
	);
}

function Divider({ className }: { className?: string }) {
	return (
		<span
			aria-hidden
			className={cn(
				"mx-1 mb-2.5 h-6 w-px shrink-0 bg-border-strong",
				className,
			)}
		/>
	);
}

function Dock() {
	const pathname = usePathname();
	const { setOpen, isMac } = usePalette();
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const magnify = fine && !reduce;
	const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
	const heroCta = useHeroCtaVisible(pathname);
	const typed = useTypedText(promptPath(pathname), reduce);

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[var(--z-sticky)] flex justify-center px-2">
			<nav
				aria-label="Main"
				className="pointer-events-auto relative flex h-[60px] items-end gap-1 rounded-2xl border border-border-strong bg-[color-mix(in_oklab,var(--color-bg-subtle)_90%,transparent)] px-2 pb-2 shadow-[var(--shadow-3)] backdrop-blur-xl backdrop-saturate-150 [view-transition-name:site-dock]"
				data-boot="chrome"
				onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
				onMouseMove={(e) => mouseX.set(e.clientX)}
			>
				<motion.span
					aria-hidden
					className="absolute inset-x-4 top-0 h-px origin-left bg-accent-graphic"
					style={{ scaleX: progress }}
				/>

				<button
					aria-haspopup="dialog"
					aria-label={`Search the site (${isMac ? "⌘K" : "Ctrl K"})`}
					className="group hidden h-11 min-w-[11.5rem] items-center gap-2 rounded-xl px-3 font-mono text-[13px] text-fg-secondary transition-colors duration-150 hover:bg-surface-2 md:flex"
					onClick={() => setOpen(true)}
					type="button"
				>
					<span aria-hidden className="text-accent">
						❯
					</span>
					<span aria-hidden className="text-fg">
						{typed}
					</span>
					<span
						aria-hidden
						className="-ml-1 inline-block h-4 w-[7px] animate-caret bg-accent/80"
					/>
					<kbd className="ml-auto rounded-sm border border-border-strong px-1.5 text-[11px] text-fg-muted transition-colors group-hover:text-fg-secondary">
						{isMac ? "⌘K" : "Ctrl K"}
					</kbd>
				</button>
				<Divider className="hidden md:block" />

				<ul className="flex items-end gap-1">
					{navLinks.map((link) => {
						const active = isActive(pathname, link.href);
						const Icon = ICONS[link.href];
						return (
							<li key={link.href}>
								<DockSlot
									hint={"key" in link ? link.key : undefined}
									label={link.label}
									magnify={magnify}
									mouseX={mouseX}
								>
									<Link
										aria-current={active ? "page" : undefined}
										aria-label={link.label}
										className="relative grid size-full place-items-center rounded-xl text-fg-secondary transition-colors duration-150 hover:bg-surface-2/60 hover:text-fg aria-[current=page]:text-fg"
										href={link.href}
									>
										{active && (
											<motion.span
												aria-hidden
												className="absolute inset-0 rounded-xl border border-border-strong bg-surface-2"
												layoutId="dock-active"
												transition={spring.ui}
											/>
										)}
										<Icon
											aria-hidden
											className="relative size-[42%]"
											strokeWidth={1.75}
										/>
										{active && (
											<motion.span
												aria-hidden
												className="absolute -bottom-[7px] size-1 rounded-full bg-accent"
												layoutId="dock-dot"
												transition={spring.ui}
											/>
										)}
									</Link>
								</DockSlot>
							</li>
						);
					})}
				</ul>

				<Divider />

				<DockSlot
					className="md:hidden"
					label="Search"
					magnify={false}
					mouseX={mouseX}
				>
					<button
						aria-haspopup="dialog"
						aria-label="Search the site"
						className="grid size-full place-items-center rounded-xl text-fg-secondary transition-colors hover:text-fg"
						onClick={() => setOpen(true)}
						type="button"
					>
						<Search aria-hidden className="size-[42%]" strokeWidth={1.75} />
					</button>
				</DockSlot>

				<DockSlot label="Resume (PDF)" magnify={magnify} mouseX={mouseX}>
					<a
						aria-label="Download resume (PDF, opens in new tab)"
						className={cn(
							"grid size-full place-items-center rounded-xl transition-[background-color,color,box-shadow] duration-200",
							heroCta
								? "border border-border-strong text-fg-secondary hover:text-fg"
								: "bg-accent-solid text-on-accent shadow-[var(--shadow-glow)] hover:bg-accent-hover",
						)}
						href={site.resume}
						rel="noopener"
						target="_blank"
					>
						<Download aria-hidden className="size-[42%]" strokeWidth={2} />
					</a>
				</DockSlot>
			</nav>
		</div>
	);
}

function ThemeSwitch() {
	const { resolvedTheme } = useTheme();
	const { toggleTheme } = usePalette();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const isDark = !mounted || resolvedTheme !== "light";

	return (
		<button
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
			className="pointer-events-auto relative flex h-11 items-center gap-0.5 rounded-full border border-border-strong bg-header p-1 shadow-[var(--shadow-2)] backdrop-blur-xl"
			onClick={(e) => {
				const r = e.currentTarget.getBoundingClientRect();
				toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
			}}
			title="Toggle theme (T)"
			type="button"
		>
			{(["light", "dark"] as const).map((mode) => {
				const on = (mode === "dark") === isDark;
				const Icon = mode === "dark" ? Moon : Sun;
				return (
					<span
						className={cn(
							"relative grid size-9 place-items-center rounded-full transition-colors duration-200",
							on ? "text-fg" : "text-fg-muted",
						)}
						key={mode}
					>
						{on && (
							<motion.span
								aria-hidden
								className="absolute inset-0 rounded-full border border-border-strong bg-surface-2"
								layoutId="theme-knob"
								transition={spring.ui}
							/>
						)}
						<Icon aria-hidden className="relative" size={15} />
					</span>
				);
			})}
		</button>
	);
}

function Corners() {
	const hidden = useHideOnScroll();
	return (
		<motion.div
			animate={{ y: hidden ? -88 : 0, opacity: hidden ? 0 : 1 }}
			className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-sticky)] [view-transition-name:site-corners]"
			transition={{ duration: duration.ui, ease: ease.out }}
		>
			<div
				className="container-page flex items-center justify-between pt-3"
				data-boot="chrome"
			>
				<Link
					aria-label={`${profile.name}, home`}
					className="group pointer-events-auto flex h-11 items-center gap-2.5 rounded-full border border-border-strong bg-header p-1 shadow-[var(--shadow-2)] backdrop-blur-xl transition-colors hover:border-fg-muted lg:pr-4"
					href="/"
				>
					<span className="relative">
						<Image
							alt=""
							className="size-9 rounded-full bg-white object-cover ring-1 ring-border-strong transition-transform duration-300 group-hover:rotate-[-8deg]"
							height={36}
							priority
							src="/images/bharath-logo.png"
							unoptimized
							width={36}
						/>
						{profile.openToWork && (
							<span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-success ring-2 ring-bg" />
						)}
					</span>
					<span className="hidden flex-col leading-tight lg:flex">
						<span className="font-medium text-fg text-sm">{profile.name}</span>
						<span className="font-mono text-[11px] text-fg-muted">
							{profile.availability}
						</span>
					</span>
				</Link>
				<ThemeSwitch />
			</div>
		</motion.div>
	);
}

export function SiteChrome() {
	return (
		<>
			<Corners />
			<Dock />
		</>
	);
}
