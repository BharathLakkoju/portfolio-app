import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 font-medium font-mono text-label",
	{
		variants: {
			variant: {
				neutral: "border border-border text-fg-secondary",
				accent: "bg-accent-subtle text-accent-subtle-fg",
				live: "bg-success-subtle text-success uppercase",
				status: "border border-border text-fg-secondary uppercase",
			},
		},
		defaultVariants: { variant: "neutral" },
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

const dotColor = {
	ai: "bg-group-ai",
	lang: "bg-group-lang",
	frontend: "bg-group-frontend",
	backend: "bg-group-backend",
} as const;

export function Chip({
	children,
	dot,
	className,
}: {
	children: React.ReactNode;
	dot?: keyof typeof dotColor;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-sm border border-border px-2 font-mono text-fg-secondary text-label",
				className,
			)}
		>
			{dot && (
				<span
					aria-hidden
					className={cn("size-1.5 rounded-full", dotColor[dot])}
				/>
			)}
			{children}
		</span>
	);
}
