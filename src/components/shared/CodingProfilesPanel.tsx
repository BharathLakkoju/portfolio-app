"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { CodingPlatformIcon } from "~/components/shared/CodingPlatformIcon";
import type { CodingProfile } from "~/lib/coding-profiles";
import { totalProblemsSolved } from "~/lib/coding-profiles";
import { duration } from "~/lib/motion";
import { cn } from "~/lib/utils";

function DifficultyBar({
	label,
	solved,
	total,
	color,
}: {
	label: string;
	solved: number;
	total: number;
	color: string;
}) {
	const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
	return (
		<div>
			<div className="mb-1.5 flex items-center justify-between font-mono text-label">
				<span className="text-fg-secondary">{label}</span>
				<span className="text-fg-muted tabular-nums">
					{solved}/{total}
				</span>
			</div>
			<div className="h-1.5 w-full overflow-hidden rounded-full bg-bg">
				<div
					className="h-full origin-left rounded-full transition-[width] duration-500 ease-out"
					style={{ width: `${pct}%`, backgroundColor: color }}
				/>
			</div>
		</div>
	);
}

function ProfileDetail({ profile }: { profile: CodingProfile }) {
	return (
		<div className="flex min-h-0 flex-1 flex-col gap-5 sm:gap-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="min-w-0">
					<p className="font-mono text-fg-muted text-label">{profile.name}</p>
					<p
						className="mt-1 font-display text-[clamp(1.75rem,5vw,2.75rem)] text-fg tabular-nums leading-none tracking-tight"
						style={{ color: profile.accent }}
					>
						{profile.headline}
					</p>
					{profile.subhead && (
						<p className="mt-2 max-w-prose text-fg-secondary text-sm leading-relaxed">
							{profile.subhead}
						</p>
					)}
					<p className="mt-2 font-mono text-fg-secondary text-sm">
						@{profile.handle}
					</p>
				</div>
				<a
					aria-label={`Open ${profile.name} profile (new tab)`}
					className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-border px-4 font-mono text-fg-secondary text-label transition-colors hover:border-border-strong hover:text-fg sm:w-auto sm:justify-start"
					href={profile.profileUrl}
					rel="noopener"
					target="_blank"
				>
					Open profile
					<ArrowUpRight aria-hidden size={14} />
				</a>
			</div>

			{profile.difficulties && profile.difficulties.length > 0 && (
				<div className="space-y-3">
					{profile.difficulties.map((d) => (
						<DifficultyBar
							color={d.color}
							key={d.label}
							label={d.label}
							solved={d.solved}
							total={d.total}
						/>
					))}
				</div>
			)}

			{profile.badges && profile.badges.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{profile.badges.slice(0, 8).map((badge) => (
						<span
							className="rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-fg-secondary text-label"
							key={badge.name}
						>
							{badge.name}
							<span className="ml-1.5 text-fg-muted">{badge.detail}</span>
						</span>
					))}
				</div>
			)}

			{profile.metrics.length > 0 && (
				<dl className="mt-auto grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
					{profile.metrics.map((m) => (
						<div
							className="rounded-md border border-border bg-bg-subtle/80 px-3.5 py-3"
							key={`${m.label}-${m.value}`}
						>
							<dt className="font-mono text-fg-muted text-label">{m.label}</dt>
							<dd className="mt-1 font-medium text-fg text-base tabular-nums leading-snug sm:text-sm">
								{m.value}
							</dd>
						</div>
					))}
				</dl>
			)}
		</div>
	);
}

export function CodingProfilesPanel({
	profiles,
}: {
	profiles: CodingProfile[];
}) {
	const baseId = useId();
	const [activeId, setActiveId] = useState(profiles[0]?.id ?? "leetcode");

	useEffect(() => {
		const first = profiles[0];
		if (!first) return;
		if (!profiles.some((p) => p.id === activeId)) {
			setActiveId(first.id);
		}
	}, [profiles, activeId]);

	if (profiles.length === 0) return null;

	const fallback = profiles[0];
	if (!fallback) return null;

	const active = profiles.find((p) => p.id === activeId) ?? fallback;
	const aggregate = totalProblemsSolved(profiles);

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-1)]">
			<div className="flex flex-col gap-2 border-border border-b bg-bg-subtle/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
				<div className="flex items-center gap-3">
					<div aria-hidden className="flex gap-1.5">
						<span className="size-2.5 rounded-full bg-danger/80" />
						<span className="size-2.5 rounded-full bg-warning/80" />
						<span className="size-2.5 rounded-full bg-success/80" />
					</div>
					<p className="font-mono text-fg-muted text-label">practice-stats</p>
				</div>
				<p className="font-mono text-fg-secondary text-label tabular-nums">
					<span className="text-fg">{aggregate.toLocaleString("en-US")}</span>{" "}
					tracked solves · {profiles.length} platforms
				</p>
			</div>

			<div className="flex flex-col md:min-h-[320px] md:flex-row">
				<div
					aria-label="Coding platforms"
					className="grid grid-cols-3 gap-1.5 border-border border-b p-2 sm:gap-2 md:flex md:w-[min(100%,220px)] md:shrink-0 md:flex-col md:gap-1 md:border-r md:border-b-0 md:p-3"
					role="tablist"
				>
					{profiles.map((profile) => {
						const selected = profile.id === active.id;
						const tabId = `${baseId}-tab-${profile.id}`;
						const panelId = `${baseId}-panel-${profile.id}`;
						return (
							<button
								aria-controls={panelId}
								aria-selected={selected}
								className={cn(
									"relative flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-md px-2 py-2.5 text-center transition-colors md:min-h-11 md:flex-row md:items-center md:gap-3 md:px-3 md:text-left",
									selected
										? "bg-surface-2 text-fg"
										: "text-fg-secondary hover:bg-surface-2/60 hover:text-fg",
								)}
								id={tabId}
								key={profile.id}
								onClick={() => setActiveId(profile.id)}
								role="tab"
								type="button"
							>
								{selected && (
									<>
										<span
											aria-hidden
											className="absolute top-0 right-2 left-2 h-0.5 rounded-full md:hidden"
											style={{ backgroundColor: profile.accent }}
										/>
										<span
											aria-hidden
											className="absolute top-2 bottom-2 left-0 hidden w-0.5 rounded-full md:block"
											style={{ backgroundColor: profile.accent }}
										/>
									</>
								)}
								<span
									aria-hidden
									className="grid size-9 shrink-0 place-items-center rounded-md border border-border md:size-8"
									style={{
										color: profile.accent,
										borderColor: `${profile.accent}55`,
										backgroundColor: `${profile.accent}12`,
									}}
								>
									<CodingPlatformIcon id={profile.id} size={20} />
								</span>
								<span className="min-w-0 flex-1 md:min-w-0">
									<span className="hidden font-medium text-sm md:block md:truncate">
										{profile.name}
									</span>
									<span
										className="block font-mono text-[11px] text-fg-muted leading-tight tabular-nums sm:text-label md:mt-0.5"
									>
										<span className="text-fg">{profile.tabStat.value}</span>
										<span className="text-fg-muted md:inline">
											{" "}
											<span className="max-md:block max-md:text-[10px]">
												{profile.tabStat.unit}
											</span>
										</span>
									</span>
								</span>
								<span className="sr-only">{profile.name}</span>
							</button>
						);
					})}
				</div>

				<div
					aria-labelledby={`${baseId}-tab-${active.id}`}
					className="flex flex-1 flex-col p-4 sm:p-6 md:p-7"
					id={`${baseId}-panel-${active.id}`}
					role="tabpanel"
				>
					<AnimatePresence mode="wait">
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 6 }}
							initial={{ opacity: 0, y: -4 }}
							key={active.id}
							transition={{ duration: duration.ui, ease: [0.16, 1, 0.3, 1] }}
						>
							<ProfileDetail profile={active} />
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
