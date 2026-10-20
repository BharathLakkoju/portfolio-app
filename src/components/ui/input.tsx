import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const fieldClasses =
	"w-full rounded-md border border-border-input bg-surface px-3 text-fg text-sm transition-colors duration-150 placeholder:text-fg-muted hover:border-fg-muted focus-visible:border-accent read-only:opacity-80 aria-[invalid=true]:border-danger";

const Input = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
	<input className={cn(fieldClasses, "h-11", className)} ref={ref} {...props} />
));
Input.displayName = "Input";

export { Input };
