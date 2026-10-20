"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "~/components/providers/ToastProvider";
import { profile } from "~/lib/data";
import { cn } from "~/lib/utils";

/** The email as visible text plus a copy button. */
export function CopyEmail({ className }: { className?: string }) {
	const toast = useToast();
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
			toast({ tone: "success", message: "Email copied" });
			window.setTimeout(() => setCopied(false), 1500);
		} catch {
			toast({
				tone: "danger",
				message: `Couldn't copy. It's ${profile.email}`,
			});
		}
	}

	return (
		<span className={cn("inline-flex items-center gap-1", className)}>
			<a
				className="inline-flex min-h-11 items-center font-mono text-fg text-sm underline-offset-4 hover:text-accent hover:underline"
				href={`mailto:${profile.email}`}
			>
				{profile.email}
			</a>
			<button
				aria-label="Copy email address"
				className="grid size-11 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
				onClick={copy}
				type="button"
			>
				{copied ? (
					<Check aria-hidden className="text-success" size={15} />
				) : (
					<Copy aria-hidden size={15} />
				)}
			</button>
		</span>
	);
}
