"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useId, useState } from "react";
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
		<div className="flex min-h-0 flex-1 flex-col gap-6">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<p
						className="font-display text-[clamp(2rem,4vw,2.75rem)] text-fg leading-none tabular-nums"
						style={{ color: profile.accent }}
					>
						{profile.headline}
					</p>
					{profile.subhead && (
						<p className="mt-2 max-w-prose text-fg-secondary text-sm">
							{profile.subhead}
						</p>
					)}
					<p className="mt-1 font-mono text-fg-muted text-label">
						@{profile.handle}
					</p>
				</div>
				<a
					aria-label={`Open ${profile.name} profile (new tab)`}
					className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md border border-border px-3 font-mono text-label text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
					href={profile.profileUrl}
					rel="noopener"
					target="_blank"
				>
					Open
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
							className="rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-label text-fg-secondary"
							key={badge.name}
						>
							{badge.name}
							<span className="ml-1.5 text-fg-muted">{badge.detail}</span>
						</span>
					))}
				</div>
			)}

			{profile.metrics.length > 0 && (
				<dl className="mt-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{profile.metrics.map((m) => (
						<div
							className="rounded-md border border-border bg-bg-subtle/80 px-3 py-2.5"
							key={`${m.label}-${m.value}`}
						>
							<dt className="font-mono text-fg-muted text-label">{m.label}</dt>
							<dd className="mt-0.5 font-medium text-fg text-sm tabular-nums">
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
		if (profiles.length === 0) return;
		if (!profiles.some((p) => p.id === activeId)) {
			setActiveId(profiles[0]!.id);
		}
	}, [profiles, activeId]);

	if (profiles.length === 0) return null;

	const active = profiles.find((p) => p.id === activeId) ?? profiles[0]!;
	const aggregate = totalProblemsSolved(profiles);

	return (
		<div
			className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-1)]"
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-border border-b bg-bg-subtle/60 px-4 py-3 sm:px-5">
				<div className="flex items-center gap-3">
					<div aria-hidden className="flex gap-1.5">
						<span className="size-2.5 rounded-full bg-danger/80" />
						<span className="size-2.5 rounded-full bg-warning/80" />
						<span className="size-2.5 rounded-full bg-success/80" />
					</div>
					<p className="font-mono text-fg-muted text-label">practice-stats</p>
				</div>
				<p className="font-mono text-fg-secondary text-label tabular-nums">
					<span className="text-fg">{aggregate.toLocaleString("en-US")}</span>
					{" "}
					tracked solves · {profiles.length} platforms
				</p>
			</div>

			<div className="flex flex-col md:min-h-[320px] md:flex-row">
				<div
					className="flex gap-1 overflow-x-auto border-border border-b p-2 md:w-[min(100%,220px)] md:shrink-0 md:flex-col md:overflow-x-visible md:border-r md:border-b-0 md:p-3"
					role="tablist"
					aria-label="Coding platforms"
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
									"flex min-h-11 min-w-[8.5rem] shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors md:min-w-0 md:w-full",
									selected
										? "bg-surface-2 text-fg"
										: "text-fg-secondary hover:bg-surface-2/60 hover:text-fg",
								)}
								id={tabId}
								key={profile.id}
								onClick={() => setActiveId(profile.id)}
								role="tab"
								style={
									selected
										? {
												boxShadow: `inset 3px 0 0 ${profile.accent}`,
											}
										: undefined
								}
								type="button"
							>
								<span
									aria-hidden
									className="grid size-8 shrink-0 place-items-center rounded-md border border-border font-mono text-label"
									style={{
										color: profile.accent,
										borderColor: `${profile.accent}55`,
										backgroundColor: `${profile.accent}12`,
									}}
								>
									{profile.shortName}
								</span>
								<span className="min-w-0 flex-1">
									<span className="block truncate font-medium text-sm">
										{profile.name}
									</span>
									<span className="mt-0.5 block font-mono text-fg-muted text-label tabular-nums">
										<span className="text-fg">{profile.tabStat.value}</span>
										{" "}
										<span className="text-fg-muted">
											({profile.tabStat.unit})
										</span>
									</span>
								</span>
							</button>
						);
					})}
				</div>

				<div
					aria-labelledby={`${baseId}-tab-${active.id}`}
					className="flex flex-1 flex-col p-5 sm:p-6 md:p-7"
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
