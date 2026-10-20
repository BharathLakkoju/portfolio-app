import { NextResponse } from "next/server";
import { getCodeforcesStats } from "~/lib/codeforces";
import { getLeetCodeStats } from "~/lib/leetcode";

export async function GET() {
	const [leetcode, codeforces] = await Promise.all([
		getLeetCodeStats(),
		getCodeforcesStats(),
	]);

	return NextResponse.json({ leetcode, codeforces });
}
