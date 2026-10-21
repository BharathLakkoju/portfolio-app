import type { GfgStats } from "~/lib/geeksforgeeks";
import type { HackerRankStats } from "~/lib/hackerrank";
import type { LeetCodeStats } from "~/lib/leetcode";

export type CodingPlatformId = "leetcode" | "hackerrank" | "gfg";

export type CodingProfileMetric = { label: string; value: string };

export type CodingProfileDifficulty = {
	label: string;
	solved: number;
	total: number;
	color: string;
};

export type CodingProfileBadge = { name: string; detail: string };

export type CodingProfileTabStat = {
	value: string;
	unit: "problems" | "levels";
};

export type CodingProfile = {
	id: CodingPlatformId;
	name: string;
	shortName: string;
	handle: string;
	profileUrl: string;
	accent: string;
	tabStat: CodingProfileTabStat;
	chipValue: string;
	headline: string;
	subhead?: string;
	metrics: CodingProfileMetric[];
	difficulties?: CodingProfileDifficulty[];
	badges?: CodingProfileBadge[];
};

export function buildCodingProfiles(input: {
	leetcode: LeetCodeStats | null;
	hackerrank: HackerRankStats | null;
	gfg: GfgStats | null;
}): CodingProfile[] {
	const profiles: CodingProfile[] = [];

	if (input.leetcode) {
		const lc = input.leetcode;
		profiles.push({
			id: "leetcode",
			name: "LeetCode",
			shortName: "LC",
			handle: lc.username,
			profileUrl: lc.profileUrl,
			accent: "#ffa116",
			tabStat: {
				value: String(lc.totalSolved),
				unit: "problems",
			},
			chipValue: String(lc.totalSolved),
			headline: `${lc.totalSolved} solved`,
			subhead: `Global rank ${lc.ranking.toLocaleString("en-US")}`,
			metrics: [
				{ label: "Pool", value: `${lc.totalQuestions} questions` },
				{ label: "Rank", value: lc.ranking.toLocaleString("en-US") },
			],
			difficulties: [
				{
					label: "Easy",
					solved: lc.easySolved,
					total: lc.easyTotal,
					color: "var(--color-success)",
				},
				{
					label: "Medium",
					solved: lc.mediumSolved,
					total: lc.mediumTotal,
					color: "var(--color-warning)",
				},
				{
					label: "Hard",
					solved: lc.hardSolved,
					total: lc.hardTotal,
					color: "var(--color-danger)",
				},
			],
		});
	}

	if (input.hackerrank) {
		const hr = input.hackerrank;
		const topBadges = hr.badges.slice(0, 4);
		profiles.push({
			id: "hackerrank",
			name: "HackerRank",
			shortName: "HR",
			handle: hr.username,
			profileUrl: hr.profileUrl,
			accent: "#00b533",
			tabStat: {
				value: String(hr.level),
				unit: "levels",
			},
			chipValue: String(hr.level),
			headline: `Level ${hr.level}`,
			subhead: `${hr.badges.length} skill badges`,
			metrics: topBadges.map((b) => ({
				label: b.name,
				value: `${b.stars}★ · ${b.solved}/${b.total}`,
			})),
			badges: hr.badges.map((b) => ({
				name: b.name,
				detail: `${b.stars}★`,
			})),
		});
	}

	if (input.gfg) {
		const gfg = input.gfg;
		profiles.push({
			id: "gfg",
			name: "GeeksforGeeks",
			shortName: "GFG",
			handle: gfg.username,
			profileUrl: gfg.profileUrl,
			accent: "#2f8d46",
			tabStat: {
				value: String(gfg.totalSolved),
				unit: "problems",
			},
			chipValue: String(gfg.totalSolved),
			headline: `${gfg.totalSolved} solved`,
			subhead: `Coding score ${gfg.score.toLocaleString("en-US")}`,
			metrics: [
				{ label: "Score", value: gfg.score.toLocaleString("en-US") },
				...(gfg.instituteRank
					? [{ label: "Institute", value: `#${gfg.instituteRank}` }]
					: []),
			],
		});
	}

	return profiles;
}

export function totalProblemsSolved(profiles: CodingProfile[]): number {
	let sum = 0;
	for (const p of profiles) {
		if (p.id === "leetcode" || p.id === "gfg") {
			sum += Number.parseInt(p.chipValue, 10) || 0;
		}
	}
	return sum;
}
