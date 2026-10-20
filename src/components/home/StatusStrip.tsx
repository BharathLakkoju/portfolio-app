"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GitCommitHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "~/lib/data";
import type { LatestCommit } from "~/lib/github";
import { duration, ease } from "~/lib/motion";

const timeFormat = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit",
	timeZone: profile.timeZone,
});

function timeAgo(iso: string) {
	const minutes = Math.max(0, (Date.now() - new Date(iso).getTime()) / 60000);
	if (minutes < 60) return `${Math.max(1, Math.round(minutes))}m ago`;
	const hours = minutes / 60;
	if (hours < 24) return `${Math.round(hours)}h ago`;
	const days = hours / 24;
	if (days < 30) return `${Math.round(days)}d ago`;
	return `${Math.round(days / 30)}mo ago`;
}

/** Only the characters that change slide up; the rest stay still. */
function Clock() {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
		const id = window.setInterval(() => setNow(new Date()), 30000);
		return () => window.clearInterval(id);
	}, []);

	const text = now ? timeFormat.format(now) : "";

	return (
		<time
			className="inline-flex min-w-[7.5ch] tabular-nums"
			dateTime={now?.toISOString()}
		>
			{text.split("").map((ch, i) => (
				<span
					className="relative inline-block overflow-hidden"
					// biome-ignore lint/suspicious/noArrayIndexKey: position is the identity of a clock digit
					key={i}
				>
					<AnimatePresence initial={false} mode="popLayout">
						<motion.span
							animate={{ y: 0, opacity: 1 }}
							className="inline-block whitespace-pre"
							exit={{ y: -6, opacity: 0 }}
							initial={{ y: 6, opacity: 0 }}
							key={ch}
							transition={{ duration: duration.micro, ease: ease.out }}
						>
							{ch}
						</motion.span>
					</AnimatePresence>
				</span>
			))}
		</time>
	);
}

function Divider() {
	return <span aria-hidden className="h-3 w-px bg-border-strong" />;
}

export function StatusStrip({ commit }: { commit: LatestCommit | null }) {
	const [ago, setAgo] = useState<string | null>(null);

	useEffect(() => {
		if (commit) setAgo(timeAgo(commit.date));
	}, [commit]);

	return (
		<div
			className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[13px] text-fg-muted"
			data-boot="aux"
		>
			<span className="inline-flex items-center gap-1.5">
				{profile.location.split(",")[0]} ·
				<Clock />
				<abbr className="no-underline" title="India Standard Time, UTC+5:30">
					{profile.timeZoneLabel}
				</abbr>
			</span>
			<Divider />
			<span>2+ yrs · {profile.company}</span>
			{commit && ago && (
				<>
					<Divider />
					<motion.a
						animate={{ opacity: 1 }}
						className="inline-flex min-h-11 items-center gap-1.5 underline-offset-4 transition-colors duration-150 hover:text-fg hover:underline sm:min-h-0"
						href={commit.url}
						initial={{ opacity: 0 }}
						rel="noopener"
						target="_blank"
						transition={{ duration: duration.ui }}
					>
						<GitCommitHorizontal aria-hidden size={14} />
						Last commit · {commit.repo} · {ago}
						<span className="sr-only"> (opens in new tab)</span>
					</motion.a>
				</>
			)}
		</div>
	);
}
