"use client";

import { Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { LostSignal } from "~/components/shared/LostSignal";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="container-page grid-page items-center gap-y-10 pt-16 pb-[var(--space-section)]">
			<div className="lg:col-span-8">
				<p className="label-mono mb-4 text-fg-muted">
					Error{error.digest ? ` · ${error.digest}` : ""}
				</p>
				<h1 className="text-fg text-h1 tracking-[-0.02em]">
					Something broke on this page.
				</h1>
				<p className="mt-4 max-w-md text-body-lg text-fg-secondary">
					It&apos;s on my side, not yours. Try again, or head home.
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Button onClick={reset} size="lg">
						<RotateCcw aria-hidden size={16} />
						Try again
					</Button>
					<Button asChild size="lg" variant="secondary">
						<Link href="/">
							<Home aria-hidden size={16} />
							Back home
						</Link>
					</Button>
				</div>
			</div>
			<div className="flex justify-center lg:col-span-4">
				<LostSignal />
			</div>
		</div>
	);
}
