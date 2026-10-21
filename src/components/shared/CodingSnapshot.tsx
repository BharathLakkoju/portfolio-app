"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CodingProfile } from "~/lib/coding-profiles";
import { duration } from "~/lib/motion";
import { cn } from "~/lib/utils";

export function CodingSnapshot() {
	const [profiles, setProfiles] = useState<CodingProfile[] | null>(null);

	useEffect(() => {
		fetch("/api/coding-stats")
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => data?.profiles && setProfiles(data.profiles))
			.catch(() => {});
	}, []);

	if (!profiles || profiles.length === 0) return null;

	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-border bg-bg-subtle/80 p-1"
			initial={{ opacity: 0 }}
			role="list"
			aria-label="Coding platform snapshot"
			transition={{ duration: duration.ui }}
		>
			{profiles.map((profile) => (
				<a
					className={cn(
						"inline-flex min-h-9 items-center gap-2 rounded-md px-2.5 font-mono text-[13px] tabular-nums transition-colors hover:bg-surface",
					)}
					href={profile.profileUrl}
					key={profile.id}
					rel="noopener"
					role="listitem"
					target="_blank"
				>
					<span
						aria-hidden
						className="size-1.5 shrink-0 rounded-full"
						style={{ backgroundColor: profile.accent }}
					/>
					<span className="text-fg-secondary">{profile.shortName}</span>
					<span className="text-fg-secondary">
						{profile.tabStat.value} ({profile.tabStat.unit})
					</span>
					<span className="sr-only">
						{profile.name}, {profile.tabStat.value} {profile.tabStat.unit}{" "}
						(opens in new tab)
					</span>
				</a>
			))}
		</motion.div>
	);
}
