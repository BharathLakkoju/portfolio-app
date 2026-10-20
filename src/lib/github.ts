import "server-only";

import { profile } from "./data";

export type LatestCommit = {
	repo: string;
	url: string;
	date: string;
};

type GitHubEvent = {
	type: string;
	created_at: string;
	repo: { name: string };
};

const headers: HeadersInit = {
	Accept: "application/vnd.github+json",
	...(process.env.GITHUB_TOKEN
		? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
		: {}),
};

export async function getLatestCommit(): Promise<LatestCommit | null> {
	try {
		const res = await fetch(
			`https://api.github.com/users/${profile.githubUser}/events/public?per_page=30`,
			{ headers, next: { revalidate: 600 } },
		);
		if (!res.ok) return null;
		const events = (await res.json()) as GitHubEvent[];
		const push = events.find((e) => e.type === "PushEvent");
		if (!push) return null;
		const repo = push.repo.name.split("/")[1] ?? push.repo.name;
		return {
			repo,
			url: `https://github.com/${push.repo.name}`,
			date: push.created_at,
		};
	} catch {
		return null;
	}
}

export type ContributionDay = { date: string; count: number; level: number };

export type Contributions = {
	total: number;
	weeks: ContributionDay[][];
};

export async function getContributions(): Promise<Contributions | null> {
	try {
		const res = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${profile.githubUser}?y=last`,
			{ next: { revalidate: 86400 } },
		);
		if (!res.ok) return null;
		const data = (await res.json()) as {
			total: Record<string, number>;
			contributions: ContributionDay[];
		};
		const days = data.contributions;
		if (!days?.length) return null;

		const weeks: ContributionDay[][] = [];
		const firstWeekday = new Date(days[0]?.date ?? "").getUTCDay();
		let week: ContributionDay[] = Array.from({ length: firstWeekday }, () => ({
			date: "",
			count: 0,
			level: -1,
		}));
		for (const day of days) {
			week.push(day);
			if (week.length === 7) {
				weeks.push(week);
				week = [];
			}
		}
		if (week.length) weeks.push(week);

		const total = days.reduce((sum, d) => sum + d.count, 0);
		return { total, weeks };
	} catch {
		return null;
	}
}
