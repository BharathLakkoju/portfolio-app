import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { profile } from "~/lib/data";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-border border-t">
			<div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
					{/* Brand + nav */}
					<div className="flex flex-col gap-2.5">
						<Link
							className="w-fit font-semibold text-sm text-text-primary transition-colors hover:text-accent"
							href="/"
						>
							Bharath Lakkoju
						</Link>
						<nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
							{[
								{ href: "/", label: "Home" },
								{ href: "/about", label: "About" },
								{ href: "/projects", label: "Projects" },
								{ href: "/blog", label: "Blog" },
								{ href: "/contact", label: "Contact" },
							].map(({ href, label }) => (
								<Link
									className="text-text-muted text-xs transition-colors hover:text-text-primary"
									href={href}
									key={href}
								>
									{label}
								</Link>
							))}
							<a
								className="text-text-muted text-xs transition-colors hover:text-text-primary"
								download
								href="/resume.pdf"
								rel="noopener noreferrer"
								target="_blank"
							>
								Resume
							</a>
						</nav>
					</div>

					{/* Social icons */}
					<div className="flex items-center gap-3">
						<a
							aria-label="GitHub"
							className="text-text-muted transition-colors hover:text-text-primary"
							href={profile.github}
							rel="noopener noreferrer"
							target="_blank"
						>
							<GithubIcon size={15} />
						</a>
						<a
							aria-label="LinkedIn"
							className="text-text-muted transition-colors hover:text-text-primary"
							href={profile.linkedin}
							rel="noopener noreferrer"
							target="_blank"
						>
							<LinkedinIcon size={15} />
						</a>
						<a
							aria-label="Email"
							className="text-text-muted transition-colors hover:text-text-primary"
							href={`mailto:${profile.email}`}
						>
							<Mail size={15} />
						</a>
					</div>
				</div>

				<p className="mt-6 border-border border-t pt-5 text-[10px] text-text-muted">
					© {year} {profile.name}
				</p>
			</div>
		</footer>
	);
}
