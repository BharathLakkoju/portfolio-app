"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { duration } from "~/lib/motion";

type Stats = {
	leetcode: { totalSolved: number; profileUrl: string } | null;
	codeforces: {
		solvedCount: number;
		rating: number | null;
		profileUrl: string;
	} | null;
};

export function CodingSnapshot() {
	const [stats, setStats] = useState<Stats | null>(null);

	useEffect(() => {
		fetch("/api/coding-stats")
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => data && setStats(data))
			.catch(() => {});
	}, []);

	if (!stats) return null;

	const items = [
		stats.leetcode && {
			href: stats.leetcode.profileUrl,
			label: "LeetCode",
			value: `${stats.leetcode.totalSolved} solved`,
		},
		stats.codeforces && {
			href: stats.codeforces.profileUrl,
			label: "Codeforces",
			value: stats.codeforces.rating
				? `${stats.codeforces.rating} rating`
				: `${stats.codeforces.solvedCount} solved`,
		},
	].filter(Boolean) as { href: string; label: string; value: string }[];

	if (items.length === 0) return null;

	return (
		<motion.ul
			animate={{ opacity: 1 }}
			className="flex flex-wrap items-center gap-x-1"
			initial={{ opacity: 0 }}
			transition={{ duration: duration.ui }}
		>
			{items.map((item) => (
				<li key={item.label}>
					<a
						className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-mono text-[13px] text-fg-muted tabular-nums transition-colors duration-150 hover:text-fg"
						href={item.href}
						rel="noopener"
						target="_blank"
					>
						<span className="text-fg-secondary">{item.label}</span>
						{item.value}
						<span className="sr-only"> (opens in new tab)</span>
					</a>
				</li>
			))}
		</motion.ul>
	);
}
