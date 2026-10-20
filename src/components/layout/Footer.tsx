import { Download } from "lucide-react";
import { CopyEmail } from "~/components/shared/CopyEmail";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { navLinks, profile, site } from "~/lib/data";

const updated = new Date().toLocaleDateString("en-US", {
	month: "short",
	year: "numeric",
});

export function Footer() {
	return (
		<footer className="border-border border-t bg-bg-subtle">
			<div className="container-page flex flex-col gap-8 pt-12 pb-28">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div>
						<p className="font-display text-3xl text-fg">{profile.name}</p>
						<p className="mt-1 text-fg-secondary text-sm">{profile.summary}</p>
					</div>
					<a
						className="inline-flex min-h-11 items-center gap-2 font-medium text-accent text-sm hover:text-accent-hover"
						href={site.resume}
						rel="noopener"
						target="_blank"
					>
						<Download aria-hidden size={15} />
						Download resume
						<span className="sr-only"> (PDF, opens in new tab)</span>
					</a>
				</div>

				<div className="flex flex-col justify-between gap-4 border-border border-t pt-6 md:flex-row md:items-center">
					<nav aria-label="Footer">
						<ul className="-mx-3 flex flex-wrap">
							{navLinks.map((link) => (
								<li key={link.href}>
									<Link
										className="flex min-h-11 items-center px-3 text-fg-secondary text-sm transition-colors duration-150 hover:text-fg"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex flex-wrap items-center gap-1">
						<CopyEmail />
						<a
							aria-label="GitHub (opens in new tab)"
							className="grid size-11 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
							href={profile.github}
							rel="noopener"
							target="_blank"
						>
							<GithubIcon size={16} />
						</a>
						<a
							aria-label="LinkedIn (opens in new tab)"
							className="grid size-11 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
							href={profile.linkedin}
							rel="noopener"
							target="_blank"
						>
							<LinkedinIcon size={16} />
						</a>
					</div>
				</div>

				<p className="label-mono flex flex-wrap gap-x-3 gap-y-1 text-fg-muted">
					<span>
						© {new Date().getFullYear()} {profile.name}
					</span>
					<span aria-hidden>·</span>
					<span>Built with Next.js</span>
					<span aria-hidden>·</span>
					<span>/ to search</span>
					<span aria-hidden>·</span>
					<span>Updated {updated}</span>
					<span aria-hidden>·</span>
					<span className="normal-case tracking-normal">
						psst, try typing something
					</span>
				</p>
			</div>
		</footer>
	);
}
