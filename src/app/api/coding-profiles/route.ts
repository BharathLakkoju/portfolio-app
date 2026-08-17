import { NextResponse } from "next/server";
import { getLeetCodeStats } from "~/lib/leetcode";
import { getCodeforcesStats } from "~/lib/codeforces";
import { getHackerRankStats } from "~/lib/hackerrank";
import { getGfgStats } from "~/lib/geeksforgeeks";

export async function GET() {
  const [leetcode, codeforces, hackerrank, gfg] = await Promise.all([
    getLeetCodeStats(),
    getCodeforcesStats(),
    getHackerRankStats(),
    getGfgStats(),
  ]);

  return NextResponse.json({ leetcode, codeforces, hackerrank, gfg });
}
