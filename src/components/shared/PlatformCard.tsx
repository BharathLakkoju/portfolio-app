import { ExternalLink } from "lucide-react";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";

type PlatformCardProps = {
  name: string;
  profileUrl?: string | null;
  primary?: { value: string | number; label: string };
  stats?: { label: string; value: string | number }[];
  unavailable?: boolean;
};

export function PlatformCard({
  name,
  profileUrl,
  primary,
  stats = [],
  unavailable,
}: PlatformCardProps) {
  if (unavailable || !primary) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5 text-xs text-text-muted">
        {name} stats are temporarily unavailable.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-text-muted mb-1">{name}</p>
          <p className="text-2xl font-bold text-text-primary">
            {primary.value}
            <span className="text-sm font-normal text-text-muted">
              {" "}
              {primary.label}
            </span>
          </p>
        </div>
        {profileUrl && (
          <Link
            href={profileUrl}
            className="flex items-center gap-1 text-xs text-accent hover:underline shrink-0"
          >
            Profile
            <ExternalLink size={11} />
          </Link>
        )}
      </div>

      {stats.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="text-text-muted">{s.label}</span>
              <span className="text-text-secondary font-medium">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
