"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CodingPlatformIcon } from "~/components/shared/CodingPlatformIcon";
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
		<motion.ul
			animate={{ opacity: 1 }}
			aria-label="Coding platform snapshot"
			className="m-0 grid w-full max-w-full list-none grid-cols-1 gap-1 rounded-lg border border-border bg-bg-subtle/80 p-1.5 sm:inline-flex sm:w-auto sm:flex-wrap sm:p-1"
			initial={{ opacity: 0 }}
			transition={{ duration: duration.ui }}
		>
			{profiles.map((profile) => (
				<li className="min-w-0" key={profile.id}>
					<a
						className={cn(
							"flex min-h-10 w-full items-center justify-between gap-2 rounded-md px-3 font-mono text-sm tabular-nums transition-colors hover:bg-surface sm:inline-flex sm:min-h-9 sm:w-auto sm:justify-start sm:px-2.5 sm:text-[13px]",
						)}
						href={profile.profileUrl}
						rel="noopener"
						target="_blank"
					>
						<span
							aria-hidden
							className="grid size-7 shrink-0 place-items-center rounded-md border border-border"
							style={{
								color: profile.accent,
								borderColor: `${profile.accent}44`,
								backgroundColor: `${profile.accent}10`,
							}}
						>
							<CodingPlatformIcon id={profile.id} size={16} />
						</span>
						<span className="text-fg-secondary">{profile.name}</span>
						<span className="text-fg-secondary">
							{profile.tabStat.value} ({profile.tabStat.unit})
						</span>
						<span className="sr-only">
							{profile.name}, {profile.tabStat.value} {profile.tabStat.unit}{" "}
							(opens in new tab)
						</span>
					</a>
				</li>
			))}
		</motion.ul>
	);
}
