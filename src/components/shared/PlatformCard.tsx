import { ArrowUpRight } from "lucide-react";

type PlatformCardProps = {
	name: string;
	profileUrl?: string | null;
	primary?: { value: string | number; label: string };
	stats?: { label: string; value: string | number }[];
};

/** Renders nothing when a platform's stats are unavailable. */
export function PlatformCard({
	name,
	profileUrl,
	primary,
	stats = [],
}: PlatformCardProps) {
	if (!primary) return null;

	return (
		<div className="flex w-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
			<div className="mb-4 flex items-start justify-between gap-3">
				<div>
					<p className="label-mono mb-2 text-fg-muted">{name}</p>
					<p className="font-semibold text-fg text-stat tabular-nums leading-none">
						{primary.value}
						<span className="ml-2 font-normal text-fg-muted text-sm">
							{primary.label}
						</span>
					</p>
				</div>
				{profileUrl && (
					<a
						aria-label={`${name} profile (opens in new tab)`}
						className="grid size-11 place-items-center rounded-md text-fg-secondary hover:bg-surface-2 hover:text-fg"
						href={profileUrl}
						rel="noopener"
						target="_blank"
					>
						<ArrowUpRight size={16} />
					</a>
				)}
			</div>
			{stats.length > 0 && (
				<dl className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-label">
					{stats.map((s) => (
						<div className="flex gap-1.5" key={s.label}>
							<dt className="text-fg-muted">{s.label}</dt>
							<dd className="text-fg-secondary tabular-nums">{s.value}</dd>
						</div>
					))}
				</dl>
			)}
		</div>
	);
}
