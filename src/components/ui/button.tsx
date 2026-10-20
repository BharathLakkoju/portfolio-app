import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-standard active:scale-[0.98] active:duration-100 disabled:pointer-events-none disabled:bg-surface-2 disabled:text-fg-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				primary:
					"bg-accent-solid text-on-accent hover:bg-accent-hover hover:shadow-[var(--shadow-glow)]",
				secondary:
					"border border-border-strong bg-surface text-fg hover:bg-surface-2",
				ghost: "text-fg-secondary hover:bg-surface-2 hover:text-fg",
				icon: "text-fg-secondary hover:bg-surface-2 hover:text-fg",
			},
			size: {
				sm: "h-9 px-3",
				md: "h-11 px-4",
				lg: "h-12 px-5",
				icon: "size-11",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
