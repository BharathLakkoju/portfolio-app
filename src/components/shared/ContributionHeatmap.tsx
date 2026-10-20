import { ArrowUpRight } from "lucide-react";
import { profile } from "~/lib/data";
import type { Contributions } from "~/lib/github";
import { ContributionGrid } from "./ContributionGrid";

export function ContributionHeatmap({ data }: { data: Contributions }) {
	return (
		<figure className="rounded-lg border border-border bg-surface p-6">
			<ContributionGrid weeks={data.weeks} />
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
