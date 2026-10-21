"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowUpRight,
	Download,
	FileText,
	FolderGit2,
	Home,
	Keyboard,
	type LucideIcon,
	Mail,
	Moon,
	Search,
	Sun,
	Terminal,
	User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "~/components/providers/NavigationProvider";
import { useToast } from "~/components/providers/ToastProvider";
import { GithubIcon, LinkedinIcon, XIcon } from "~/components/shared/Icons";
import { profile, projects, site } from "~/lib/data";
import { duration, ease, spring } from "~/lib/motion";
import { cn } from "~/lib/utils";
import { usePalette } from "./PaletteProvider";

type Group = "Actions" | "Pages" | "Projects" | "Posts" | "Preferences";

type Item = {
	id: string;
	group: Group;
	label: string;
	icon: LucideIcon | typeof GithubIcon;
	keys?: string[];
	keywords?: string;
	hidden?: boolean;
	run: () => void;
};

const GROUP_ORDER: Group[] = [
	"Actions",
	"Pages",
	"Projects",
	"Posts",
	"Preferences",
];

function score(text: string, query: string) {
	const t = text.toLowerCase();
	const q = query.toLowerCase().trim();
	if (!q) return 1;
	if (t.startsWith(q)) return 100;
	const idx = t.indexOf(q);
	if (idx >= 0) return 80 - idx;
	let ti = 0;
	let gaps = 0;
	for (const ch of q) {
		const found = t.indexOf(ch, ti);
		if (found < 0) return 0;
		gaps += found - ti;
		ti = found + 1;
	}
	return Math.max(1, 40 - gaps);
}

export default function CommandPalette() {
	const {
		open,
		setOpen,
		shortcutsEnabled,
		setShortcutsEnabled,
		toggleTheme,
		hireMe,
		posts,
		isMac,
	} = usePalette();
	const navigate = useNavigate();
	const toast = useToast();
	const isDark = useTheme().resolvedTheme !== "light";
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const listId = useId();
	const inputRef = useRef<HTMLInputElement>(null);

	const items = useMemo<Item[]>(() => {
		const go = (href: string) => () => navigate(href);
		const external = (href: string) => () =>
			window.open(href, "_blank", "noopener");
		const download = (href: string, filename: string) => () => {
			const a = document.createElement("a");
			a.href = href;
			a.download = filename;
			document.body.append(a);
			a.click();
			a.remove();
			toast({ tone: "success", message: "Downloading resume" });
		};
		return [
			{
				id: "resume",
				group: "Actions",
				label: "Download resume",
				icon: Download,
				keywords: "cv pdf",
				run: download(site.resume, site.resumeFile),
			},
			{
				id: "email",
				group: "Actions",
				label: "Copy email",
				icon: Mail,
				keywords: `contact ${profile.email}`,
				run: () => {
					void navigator.clipboard
						.writeText(profile.email)
						.then(() => toast({ tone: "success", message: "Email copied" }));
				},
			},
			{
				id: "linkedin",
				group: "Actions",
				label: "Open LinkedIn",
				icon: LinkedinIcon,
				run: external(profile.linkedin),
			},
			{
				id: "twitter",
				group: "Actions",
				label: "Open X (Twitter)",
				icon: XIcon,
				keywords: `twitter x ${profile.twitterHandle}`,
				run: external(profile.twitter),
			},
			{
				id: "github",
				group: "Actions",
				label: "Open GitHub",
				icon: GithubIcon,
				keys: ["G", "H"],
				run: external(profile.github),
			},
			{
				id: "home",
				group: "Pages",
				label: "Home",
				icon: Home,
				keys: ["H"],
				run: go("/"),
			},
			{
				id: "projects",
				group: "Pages",
				label: "Projects",
				icon: FolderGit2,
				keys: ["P"],
				run: go("/projects"),
			},
			{
				id: "about",
				group: "Pages",
				label: "About",
				icon: User,
				keys: ["A"],
				keywords: "experience work career",
				run: go("/about"),
			},
			{
				id: "blog",
				group: "Pages",
				label: "Blog",
				icon: FileText,
				keys: ["B"],
				keywords: "writing posts",
				run: go("/blog"),
			},
			{
				id: "contact",
				group: "Pages",
				label: "Contact",
				icon: Mail,
				keywords: "hire email",
				run: go("/contact"),
			},
			...projects.map<Item>((p) => ({
				id: `project-${p.slug}`,
				group: "Projects",
				label: p.title,
				icon: ArrowUpRight,
				keywords: `${p.repo} ${p.stack.join(" ")} ${p.outcome}`,
				run: go(`/projects/${p.slug}`),
			})),
			{
				id: "all-projects",
				group: "Projects",
				label: "All projects…",
				icon: FolderGit2,
				run: go("/projects"),
			},
			...posts.map<Item>((p) => ({
				id: `post-${p.slug}`,
				group: "Posts",
				label: p.title,
				icon: FileText,
				hidden: true,
				run: go(`/blog/${p.slug}`),
			})),
			{
				id: "theme",
				group: "Preferences",
				label: isDark ? "Switch to light theme" : "Switch to dark theme",
				icon: isDark ? Sun : Moon,
				keys: ["T"],
				keywords: "dark light",
				run: () => toggleTheme(),
			},
			{
				id: "shortcuts",
				group: "Preferences",
				label: shortcutsEnabled
					? "Turn off single-key shortcuts"
					: "Turn on single-key shortcuts",
				icon: Keyboard,
				keywords: "keyboard",
				run: () => setShortcutsEnabled(!shortcutsEnabled),
			},
			{
				id: "sudo",
				group: "Actions",
				label: "sudo hire me",
				icon: Terminal,
				hidden: true,
				run: hireMe,
			},
		];
	}, [
		navigate,
		toast,
		posts,
		toggleTheme,
		isDark,
		shortcutsEnabled,
		setShortcutsEnabled,
		hireMe,
	]);

	const results = useMemo(() => {
		const q = query.trim();
		const visible = items.filter((item) => {
			if (item.id === "sudo") return q.toLowerCase().startsWith("sudo");
			return q ? true : !item.hidden;
		});
		if (!q) return visible;
		return visible
			.map((item) => ({
				item,
				s: Math.max(
					score(item.label, q),
					item.keywords ? score(item.keywords, q) * 0.6 : 0,
				),
			}))
			.filter((r) => r.s > 0)
			.sort(
				(a, b) =>
					GROUP_ORDER.indexOf(a.item.group) -
						GROUP_ORDER.indexOf(b.item.group) || b.s - a.s,
			)
			.map((r) => r.item);
	}, [items, query]);

	const fallback = useMemo(
		() => items.filter((i) => i.id === "resume" || i.id === "email"),
		[items],
	);
	const shown = results.length ? results : fallback;

	useEffect(() => {
		if (!open) setQuery("");
	}, [open]);

	useEffect(() => {
		document
			.getElementById(`${listId}-${active}`)
			?.scrollIntoView({ block: "nearest" });
	}, [active, listId]);

	function run(item: Item) {
		setOpen(false);
		item.run();
	}

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => (i + 1) % shown.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => (i - 1 + shown.length) % shown.length);
		} else if (e.key === "Enter") {
			e.preventDefault();
			const item = shown[active];
			if (item) run(item);
		}
	}

	let lastGroup: Group | null = null;

	return (
		<Dialog.Root onOpenChange={setOpen} open={open}>
			<AnimatePresence>
				{open && (
					<Dialog.Portal forceMount>
						<Dialog.Overlay asChild forceMount>
							<motion.div
								animate={{ opacity: 1 }}
								className="fixed inset-0 z-[var(--z-overlay)] bg-scrim backdrop-blur-[4px]"
								exit={{ opacity: 0, transition: { duration: duration.micro } }}
								initial={{ opacity: 0 }}
								transition={{ duration: duration.ui, ease: ease.out }}
							/>
						</Dialog.Overlay>
						<Dialog.Content
							aria-describedby={undefined}
							aria-modal="true"
							asChild
							forceMount
							onOpenAutoFocus={(e) => {
								e.preventDefault();
								inputRef.current?.focus();
							}}
						>
							<motion.div
								animate={{ opacity: 1, scale: 1, y: 0 }}
								className="fixed top-[max(1rem,14vh)] left-1/2 z-[var(--z-modal)] flex max-h-[min(520px,72vh)] w-[min(600px,calc(100vw-1.5rem))] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border-strong bg-bg-subtle shadow-[var(--shadow-3)]"
								exit={{
									opacity: 0,
									scale: 0.98,
									transition: { duration: duration.micro, ease: ease.standard },
								}}
								initial={{ opacity: 0, scale: 0.96, y: -8 }}
								transition={{ duration: duration.ui, ease: ease.out }}
							>
								<div
									aria-hidden
									className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent-graphic to-transparent opacity-70"
								/>
								<Dialog.Title className="sr-only">Search site</Dialog.Title>
								<div className="flex items-center gap-3 border-border border-b px-5">
									<Search
										aria-hidden
										className="shrink-0 text-accent"
										size={18}
									/>
									<input
										aria-activedescendant={
											shown.length ? `${listId}-${active}` : undefined
										}
										aria-autocomplete="list"
										aria-controls={listId}
										aria-expanded="true"
										className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg outline-none! placeholder:text-fg-muted"
										onChange={(e) => {
											setQuery(e.target.value);
											setActive(0);
										}}
										onKeyDown={onKeyDown}
										placeholder="Search pages, projects, posts…"
										ref={inputRef}
										role="combobox"
										value={query}
									/>
									<button
										className="rounded-sm border border-border-strong px-1.5 py-0.5 font-mono text-fg-secondary text-label transition-colors hover:text-fg"
										onClick={() => setOpen(false)}
										type="button"
									>
										Esc
									</button>
								</div>

								<div className="mask-fade-b overflow-y-auto overscroll-contain p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
									{results.length === 0 && (
										<p className="px-3 pt-2 pb-1 text-fg-secondary text-sm">
											No results for “{query}”.
										</p>
									)}
									<div aria-label="Results" id={listId} role="listbox">
										{shown.map((item, i) => {
											const header =
												results.length && item.group !== lastGroup
													? item.group
													: null;
											lastGroup = item.group;
											const Icon = item.icon;
											const selected = i === active;
											return (
												<div key={item.id} role="presentation">
													{header && (
														<p
															aria-hidden
															className={cn(
																"label-mono px-3 pb-1.5 text-fg-muted",
																i === 0 ? "pt-1" : "pt-4",
															)}
														>
															{header}
														</p>
													)}
													<motion.div
														animate={{ opacity: 1, y: 0 }}
														aria-selected={selected}
														className={cn(
															"relative flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150",
															selected ? "text-fg" : "text-fg-secondary",
														)}
														id={`${listId}-${i}`}
														initial={{ opacity: 0, y: 4 }}
														onClick={() => run(item)}
														onMouseMove={() => setActive(i)}
														role="option"
														transition={{
															...spring.ui,
															delay: Math.min(i, 7) * 0.02,
														}}
													>
														{selected && (
															<motion.span
																aria-hidden
																className="absolute inset-0 rounded-lg bg-surface-2"
																layoutId="palette-active"
																transition={spring.ui}
															>
																<span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
															</motion.span>
														)}
														<span
															className={cn(
																"relative grid size-7 shrink-0 place-items-center rounded-md border transition-colors duration-150",
																selected
																	? "border-accent/40 text-accent"
																	: "border-border text-fg-secondary",
															)}
														>
															<Icon aria-hidden size={14} />
														</span>
														<span className="relative flex-1 truncate">
															{item.label}
														</span>
														{item.keys && (
															<span className="relative flex gap-1">
																{item.keys.map((k) => (
																	<kbd
																		className="min-w-5 rounded-sm border border-border-strong px-1.5 text-center font-mono text-fg-secondary text-label"
																		key={k}
																	>
																		{k}
																	</kbd>
																))}
															</span>
														)}
													</motion.div>
												</div>
											);
										})}
									</div>
								</div>

								<div className="flex items-center gap-4 border-border border-t px-4 py-2.5 font-mono text-fg-muted text-label">
									<span>↑↓ navigate</span>
									<span>↵ open</span>
									<span>Esc close</span>
									<span className="ml-auto hidden sm:inline">
										{isMac ? "⌘K" : "Ctrl K"} · / to open
									</span>
								</div>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
