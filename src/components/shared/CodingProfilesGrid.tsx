"use client";

import { useEffect, useState } from "react";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";

type Profiles = {
  leetcode: { totalSolved: number; profileUrl: string } | null;
  codeforces: {
    solvedCount: number;
    rating: number | null;
    profileUrl: string;
  } | null;
  hackerrank: { level: number; profileUrl: string } | null;
  gfg: { totalSolved: number; profileUrl: string } | null;
};

function Tile({
  href,
  value,
  label,
}: {
  href: string;
  value: string | number;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-lg border border-border bg-surface px-4 py-3.5 hover:border-accent/40 transition-colors"
    >
      <span className="text-xl font-bold text-text-primary">{value}</span>
      <span className="text-xs text-text-muted mt-0.5">{label}</span>
    </Link>
  );
}

export function CodingProfilesGrid() {
  const [profiles, setProfiles] = useState<Profiles | null>(null);

  useEffect(() => {
    fetch("/api/coding-profiles")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setProfiles(data))
      .catch(() => {});
  }, []);

  if (!profiles) return null;

  const tiles = [
    profiles.leetcode && {
      href: profiles.leetcode.profileUrl,
      value: profiles.leetcode.totalSolved,
      label: "LeetCode solved",
    },
    profiles.codeforces && {
      href: profiles.codeforces.profileUrl,
      value:
        profiles.codeforces.rating ?? profiles.codeforces.solvedCount,
      label: profiles.codeforces.rating
        ? "Codeforces rating"
        : "Codeforces solved",
    },
    profiles.hackerrank && {
      href: profiles.hackerrank.profileUrl,
      value: profiles.hackerrank.level,
      label: "HackerRank level",
    },
    profiles.gfg && {
      href: profiles.gfg.profileUrl,
      value: profiles.gfg.totalSolved,
      label: "GFG solved",
    },
  ].filter(Boolean) as { href: string; value: string | number; label: string }[];

  if (tiles.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiles.map((t) => (
        <Tile key={t.label} href={t.href} value={t.value} label={t.label} />
      ))}
    </div>
  );
}
