import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { fieldClasses } from "./input";

const Textarea = forwardRef<
	HTMLTextAreaElement,
	TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
	<textarea
		className={cn(
			fieldClasses,
			"field-sizing-content max-h-64 min-h-32 py-2.5 leading-relaxed",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
Textarea.displayName = "Textarea";

export { Textarea };
