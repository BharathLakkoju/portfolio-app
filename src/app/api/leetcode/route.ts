import { NextResponse } from "next/server";
import { getLeetCodeStats } from "~/lib/leetcode";

export async function GET() {
  const stats = await getLeetCodeStats();
  if (!stats) {
    return NextResponse.json({ error: "Unavailable" }, { status: 502 });
  }
  return NextResponse.json(stats);
}
