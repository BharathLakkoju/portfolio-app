import { CheckCircle2, Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "~/components/motion/Reveal";
import { ArchitectureChain } from "~/components/projects/ArchitectureChain";
import { CaseStudyHeader } from "~/components/projects/CaseStudyHeader";
import { ProjectCard } from "~/components/projects/ProjectCard";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";
import { getProject, projects, site } from "~/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return {};
	return { title: project.title, description: project.outcome };
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<Reveal className="border-border border-t pt-8">
			<h2 className="mb-4 text-fg text-h3">{title}</h2>
			{children}
		</Reveal>
	);
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();

	const i = projects.indexOf(project);
	const prev = projects[(i - 1 + projects.length) % projects.length];
	const next = projects[(i + 1) % projects.length];
	const cs = project.caseStudy;

	return (
		<article className="container-page pt-10 pb-[var(--space-section)]">
			<CaseStudyHeader project={project} />

			<div className="grid-page mt-16 gap-y-12">
				<div className="flex flex-col gap-10 text-fg-secondary lg:col-span-8 [&_p]:max-w-[var(--measure-prose)]">
					{cs.problem && (
						<Section title="Problem">
							<p>{cs.problem}</p>
						</Section>
					)}
					<Section title="What I built">
						<p>{cs.built}</p>
					</Section>
					<Section title="Architecture">
						<ArchitectureChain steps={cs.architecture} />
					</Section>
					<Section title="Hard parts and decisions">
						<ul className="space-y-3">
							{cs.decisions.map((d) => (
								<li className="flex gap-3" key={d}>
									<span
										aria-hidden
										className="mt-2.5 size-1 shrink-0 rounded-full bg-accent-graphic"
									/>
									{d}
								</li>
							))}
						</ul>
					</Section>
					{cs.results ? (
						<Section title="Results">
							<div className="rounded-lg border border-success/40 bg-success-subtle p-6">
								<p className="label-mono mb-2 flex items-center gap-2 text-success">
									<CheckCircle2 aria-hidden size={14} />
									{cs.results.title}
								</p>
								<p className="text-fg">{cs.results.body}</p>
							</div>
						</Section>
					) : (
						cs.shows && (
							<Section title="What it shows">
								<p>{cs.shows}</p>
							</Section>
						)
					)}
					{cs.next && (
						<Section title="What I'd do next">
							<p>{cs.next}</p>
						</Section>
					)}
				</div>

				<aside className="lg:col-span-4">
					<div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
						<p className="label-mono text-fg-muted">At a glance</p>
						<dl className="space-y-3 text-sm">
							<div>
								<dt className="text-fg-muted">Role</dt>
								<dd className="text-fg">{project.roleLine}</dd>
							</div>
							<div>
								<dt className="text-fg-muted">Repo</dt>
								<dd className="font-mono text-fg">{project.repo}</dd>
							</div>
							<div>
								<dt className="text-fg-muted">Stack</dt>
								<dd className="text-fg-secondary">
									{project.stack.join(" · ")}
								</dd>
							</div>
						</dl>
						<div className="flex flex-col gap-2 border-border border-t pt-4">
							<Button asChild>
								<a href={site.resume} rel="noopener" target="_blank">
									<Download aria-hidden size={15} />
									Download resume
									<span className="sr-only"> (PDF, opens in new tab)</span>
								</a>
							</Button>
							<Button asChild variant="secondary">
								<Link href="/contact">
									<Mail aria-hidden size={15} />
									Contact me
								</Link>
							</Button>
						</div>
					</div>
				</aside>
			</div>

			<nav
				aria-label="More projects"
				className="mt-20 border-border border-t pt-8"
			>
				<p className="label-mono mb-6 text-fg-muted">More work</p>
				<div className="grid gap-[var(--gutter)] md:grid-cols-2">
					{[prev, next].map(
						(p) =>
							p &&
							p.slug !== project.slug && (
								<ProjectCard
									className="h-full"
									headingLevel="h2"
									index={projects.indexOf(p)}
									key={p.slug}
									project={p}
								/>
							),
					)}
				</div>
			</nav>
		</article>
	);
}
