import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]",
        accent:
          "border-[var(--color-accent)]/30 bg-[var(--color-accent-subtle)] text-[var(--color-accent)]",
        outline:
          "border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)]",
        success:
          "border-green-500/30 bg-green-500/10 text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
