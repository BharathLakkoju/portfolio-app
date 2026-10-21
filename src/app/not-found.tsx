import { Download, Home } from "lucide-react";
import { Reveal } from "~/components/motion/Reveal";
import { OpenPaletteButton } from "~/components/palette/OpenPaletteButton";
import { ProjectCard } from "~/components/projects/ProjectCard";
import { LostSignal } from "~/components/shared/LostSignal";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";
import { projects, site } from "~/lib/data";

export default function NotFound() {
	return (
		<div className="container-page flex flex-col gap-[var(--space-section)] pt-16 pb-[var(--space-section)]">
			<section className="grid-page items-center gap-y-10">
				<div className="lg:col-span-8">
					<p className="label-mono mb-4 text-fg-muted">404 · Signal lost</p>
					<h1 className="text-display text-fg tracking-[-0.03em]">
						This page isn&apos;t{" "}
						<span className="font-normal font-serif text-accent italic">
							connected.
						</span>
					</h1>
					<p className="mt-6 max-w-md text-body-lg text-fg-secondary">
						The link may be old or mistyped. The work is still here.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Button asChild size="lg">
							<a download={site.resumeFile} href={site.resume}>
								<Download aria-hidden size={16} />
								Download resume
								<span className="sr-only"> (PDF)</span>
							</a>
						</Button>
						<Button asChild size="lg" variant="secondary">
							<Link href="/">
								<Home aria-hidden size={16} />
								Back home
							</Link>
						</Button>
						<OpenPaletteButton />
					</div>
				</div>
				<div className="flex justify-center lg:col-span-4">
					<LostSignal />
				</div>
			</section>

			<section aria-labelledby="nf-work">
				<h2 className="label-mono mb-6 text-fg-muted" id="nf-work">
					Selected work
				</h2>
				<div className="grid gap-[var(--gutter)] md:grid-cols-2">
					{projects.slice(0, 2).map((p, i) => (
						<Reveal index={i} key={p.slug}>
							<ProjectCard
								className="h-full"
								headingLevel="h3"
								index={i}
								project={p}
							/>
						</Reveal>
					))}
				</div>
			</section>
		</div>
	);
}
