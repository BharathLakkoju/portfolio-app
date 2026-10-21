import { NextResponse } from "next/server";
import { buildCodingProfiles } from "~/lib/coding-profiles";
import { getGfgStats } from "~/lib/geeksforgeeks";
import { getHackerRankStats } from "~/lib/hackerrank";
import { getLeetCodeStats } from "~/lib/leetcode";

export async function GET() {
	const [leetcode, hackerrank, gfg] = await Promise.all([
		getLeetCodeStats(),
		getHackerRankStats(),
		getGfgStats(),
	]);

	const profiles = buildCodingProfiles({
		leetcode,
		hackerrank,
		gfg,
	});

	return NextResponse.json({ profiles });
}
