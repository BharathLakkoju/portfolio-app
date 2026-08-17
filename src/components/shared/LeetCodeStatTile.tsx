"use client";

import { useEffect, useState } from "react";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import type { LeetCodeStats } from "~/lib/leetcode";

export function LeetCodeStatTile() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <Link href={stats.profileUrl} className="hover:text-text-primary">
      <span className="font-semibold text-text-primary">
        {stats.totalSolved}+
      </span>
      <span className="text-text-muted ml-1.5">LeetCode solved</span>
    </Link>
  );
}
