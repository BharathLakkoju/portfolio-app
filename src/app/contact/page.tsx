import { ArrowUpRight, Download } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "~/components/contact/ContactForm";
import { Reveal } from "~/components/motion/Reveal";
import { SectionHeader } from "~/components/motion/SectionHeader";
import { CopyEmail } from "~/components/shared/CopyEmail";
import { GithubIcon, LinkedinIcon, XIcon } from "~/components/shared/Icons";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { profile, site } from "~/lib/data";

export const metadata: Metadata = {
	title: "Contact",
	description: `Get in touch with ${profile.name} about AI engineering and full-stack roles.`,
};

const socials = [
	{
		href: profile.linkedin,
		label: "LinkedIn",
		value: "in/bharathlakkoju",
		Icon: LinkedinIcon,
	},
	{
		href: profile.github,
		label: "GitHub",
		value: "BharathLakkoju",
		Icon: GithubIcon,
	},
	{
		href: profile.twitter,
		label: "X",
		value: profile.twitterHandle,
		Icon: XIcon,
	},
];

export default function ContactPage() {
	return (
		<div className="container-page pt-12 pb-[var(--space-section)]">
			<SectionHeader
				as="h1"
				description="Hiring for an AI engineering or full-stack role? Email is fastest."
				label="Contact"
				title="Let's talk"
			/>

			<div className="grid-page gap-y-10">
				<Reveal className="flex flex-col gap-8 lg:col-span-4">
					<div>
						<p className="label-mono mb-1 text-fg-muted">Email</p>
						<CopyEmail className="-ml-0.5" />
					</div>

					<ul className="flex flex-col border-border border-t">
						{socials.map(({ href, label, value, Icon }) => (
							<li className="border-border border-b" key={label}>
								<a
									className="group flex min-h-14 items-center gap-3 text-fg-secondary transition-colors hover:text-fg"
									href={href}
									rel="noopener"
									target="_blank"
								>
									<Icon
										aria-hidden
										className="text-fg-muted group-hover:text-accent"
										size={16}
									/>
									<span className="w-20 font-mono text-fg-muted text-label">
										{label}
									</span>
									<span className="text-sm">{value}</span>
									<ArrowUpRight
										aria-hidden
										className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										size={15}
									/>
									<span className="sr-only"> (opens in new tab)</span>
								</a>
							</li>
						))}
					</ul>

					<div className="flex flex-col items-start gap-3">
						<Badge variant={profile.openToWork ? "live" : "neutral"}>
							{profile.availability}
						</Badge>
						<p className="text-fg-secondary text-sm">
							{profile.location}. {profile.workMode}.
						</p>
					</div>

					<Button asChild className="self-start" variant="secondary">
						<a href={site.resume} rel="noopener" target="_blank">
							<Download aria-hidden size={15} />
							Download resume
							<span className="sr-only"> (PDF, opens in new tab)</span>
						</a>
					</Button>
				</Reveal>

				<Reveal className="lg:col-span-8" index={1}>
					<ContactForm />
				</Reveal>
			</div>
		</div>
	);
}
