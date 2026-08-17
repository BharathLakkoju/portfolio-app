import { ExternalLink, Trophy } from "lucide-react";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import type { LeetCodeStats } from "~/lib/leetcode";

function DifficultyBar({
  label,
  solved,
  total,
  colorVar,
}: {
  label: string;
  solved: number;
  total: number;
  colorVar: string;
}) {
  const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-muted">
          {solved}
          <span className="text-text-muted/70">/{total}</span>
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: colorVar }}
        />
      </div>
    </div>
  );
}

export function LeetCodeCard({ stats }: { stats: LeetCodeStats | null }) {
  if (!stats) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5 text-xs text-text-muted">
        LeetCode stats are temporarily unavailable.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-2xl font-bold text-text-primary">
            {stats.totalSolved}
            <span className="text-sm font-normal text-text-muted">
              {" "}
              / {stats.totalQuestions} solved
            </span>
          </p>
          <p className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
            <Trophy size={11} />
            Rank {stats.ranking.toLocaleString("en-US")}
          </p>
        </div>
        <Link
          href={stats.profileUrl}
          className="flex items-center gap-1 text-xs text-accent hover:underline shrink-0"
        >
          Profile
          <ExternalLink size={11} />
        </Link>
      </div>

      <div className="space-y-3">
        <DifficultyBar
          label="Easy"
          solved={stats.easySolved}
          total={stats.easyTotal}
          colorVar="var(--color-success)"
        />
        <DifficultyBar
          label="Medium"
          solved={stats.mediumSolved}
          total={stats.mediumTotal}
          colorVar="var(--color-warning)"
        />
        <DifficultyBar
          label="Hard"
          solved={stats.hardSolved}
          total={stats.hardTotal}
          colorVar="var(--color-error)"
        />
      </div>
    </div>
  );
}
