import { ArrowUpRight } from "lucide-react";
import type { LeetCodeStats } from "~/lib/leetcode";

function DifficultyBar({
	label,
	solved,
	total,
	color,
}: {
	label: string;
	solved: number;
	total: number;
	color: string;
}) {
	const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
	return (
		<div>
			<div className="mb-1.5 flex items-center justify-between font-mono text-label">
				<span className="text-fg-secondary">{label}</span>
				<span className="text-fg-muted tabular-nums">
					{solved}/{total}
				</span>
			</div>
			<div className="h-1.5 w-full overflow-hidden rounded-full bg-bg">
				<div
					className="h-full origin-left rounded-full"
					style={{ width: `${pct}%`, backgroundColor: color }}
				/>
			</div>
		</div>
	);
}

export function LeetCodeCard({ stats }: { stats: LeetCodeStats | null }) {
	if (!stats) return null;

	return (
		<div className="flex w-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
			<div className="mb-5 flex items-start justify-between gap-3">
				<div>
					<p className="label-mono mb-2 text-fg-muted">LeetCode</p>
					<p className="font-semibold text-fg text-stat tabular-nums leading-none">
						{stats.totalSolved}
						<span className="ml-2 font-normal text-fg-muted text-sm">
							of {stats.totalQuestions} solved
						</span>
					</p>
					<p className="mt-2 font-mono text-fg-muted text-label tabular-nums">
						Rank {stats.ranking.toLocaleString("en-US")}
					</p>
				</div>
				<a
					aria-label="LeetCode profile (opens in new tab)"
					className="grid size-11 place-items-center rounded-md text-fg-secondary hover:bg-surface-2 hover:text-fg"
					href={stats.profileUrl}
					rel="noopener"
					target="_blank"
				>
					<ArrowUpRight size={16} />
				</a>
			</div>
			<div className="space-y-3">
				<DifficultyBar
					color="var(--color-success)"
					label="Easy"
					solved={stats.easySolved}
					total={stats.easyTotal}
				/>
				<DifficultyBar
					color="var(--color-warning)"
					label="Medium"
					solved={stats.mediumSolved}
					total={stats.mediumTotal}
				/>
				<DifficultyBar
					color="var(--color-danger)"
					label="Hard"
					solved={stats.hardSolved}
					total={stats.hardTotal}
				/>
			</div>
		</div>
	);
}
