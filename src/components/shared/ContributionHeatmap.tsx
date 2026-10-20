import { ArrowUpRight } from "lucide-react";
import { profile } from "~/lib/data";
import type { Contributions } from "~/lib/github";

const LEVEL_OPACITY = [0, 0.25, 0.5, 0.75, 1];

export function ContributionHeatmap({ data }: { data: Contributions }) {
	return (
		<figure className="rounded-lg border border-border bg-surface p-6">
			<div aria-hidden className="mask-fade-x -mx-2 overflow-x-auto px-2">
				<div className="flex w-max gap-[3px]">
					{data.weeks.map((week) => (
						<div
							className="flex flex-col gap-[3px]"
							key={week.find((d) => d.date)?.date}
						>
							{week.map((day, i) => (
								<span
									className="size-[10px] rounded-[2px] bg-bg"
									// biome-ignore lint/suspicious/noArrayIndexKey: padding cells have no date
									key={day.date || `pad-${i}`}
									style={
										day.level > 0
											? {
													background: `color-mix(in oklab, var(--color-accent-graphic) ${(LEVEL_OPACITY[day.level] ?? 1) * 100}%, var(--color-bg))`,
												}
											: day.level < 0
												? { visibility: "hidden" }
												: undefined
									}
									title={day.date ? `${day.count} on ${day.date}` : undefined}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-fg-secondary text-sm">
				<span>
					<span className="font-medium text-fg tabular-nums">
						{data.total.toLocaleString("en-US")}
					</span>{" "}
					contributions in the last year
				</span>
				<a
					className="inline-flex min-h-11 items-center gap-1 text-accent hover:text-accent-hover"
					href={profile.github}
					rel="noopener"
					target="_blank"
				>
					GitHub
					<ArrowUpRight aria-hidden size={14} />
					<span className="sr-only"> (opens in new tab)</span>
				</a>
			</figcaption>
		</figure>
	);
}
