"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, Mail, Send } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { profile } from "~/lib/data";

type FormState = "idle" | "success";

export default function ContactPage() {
	const [formState, setFormState] = useState<FormState>("idle");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const subject = encodeURIComponent(
			`Portfolio contact from ${formData.name}`,
		);
		const body = encodeURIComponent(
			`${formData.message}\n\n— ${formData.name} (${formData.email})`,
		);
		window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

		setFormState("success");
		setFormData({ name: "", email: "", message: "" });
	};

	const links = [
		{
			href: `mailto:${profile.email}`,
			icon: <Mail size={14} />,
			label: "Email",
			value: profile.email,
			external: false,
		},
		{
			href: profile.github,
			icon: <GithubIcon size={14} />,
			label: "GitHub",
			value: "github.com/BharathLakkoju",
			external: true,
		},
		{
			href: profile.linkedin,
			icon: <LinkedinIcon size={14} />,
			label: "LinkedIn",
			value: "linkedin.com/in/bharathlakkoju",
			external: true,
		},
	];

	return (
		<div className="pt-24 pb-16">
			<div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6">
				{/* ── Header ── */}
				<AnimatedSection>
					<h1 className="mb-2 font-bold text-2xl tracking-tight">
						Get in touch
					</h1>
					<p className="max-w-md text-sm text-text-secondary leading-relaxed">
						Open to full-time roles, contract work, and interesting
						collaborations. Drop a message and I&apos;ll reply within 24 hours.
					</p>
					<div className="mt-4">
						<Button asChild size="sm" variant="outline">
							<a
								download
								href="/resume.pdf"
								rel="noopener noreferrer"
								target="_blank"
							>
								<Download size={13} />
								Download resume
							</a>
						</Button>
					</div>
				</AnimatedSection>

				{/* ── Two-col layout ── */}
				<div className="grid grid-cols-1 gap-8 border-border border-t pt-10 sm:grid-cols-2">
					{/* Left — contact links + availability */}
					<AnimatedSection className="flex flex-col gap-6" delay={0.05}>
						<div className="flex flex-col gap-2">
							{links.map(({ href, icon, label, value, external }) => (
								<a
									href={href}
									key={label}
									{...(external
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors duration-200 hover:border-accent/40"
								>
									<span className="text-text-muted transition-colors group-hover:text-accent">
										{icon}
									</span>
									<div className="min-w-0">
										<p className="mb-0.5 text-[10px] text-text-muted">
											{label}
										</p>
										<p className="truncate font-medium text-text-secondary text-xs transition-colors group-hover:text-accent">
											{value}
										</p>
									</div>
								</a>
							))}
						</div>

						{/* Availability pill */}
						<div className="rounded-lg border border-accent/20 bg-accent-subtle px-4 py-3">
							<div className="mb-1 flex items-center gap-2">
								<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
								<p className="font-semibold text-text-primary text-xs">
									Available for work
								</p>
							</div>
							<p className="text-[11px] text-text-secondary leading-relaxed">
								Open to remote roles globally. Based in Hyderabad, India.
							</p>
						</div>
					</AnimatedSection>

					{/* Right — form */}
					<AnimatedSection delay={0.1}>
						{formState === "success" ? (
							<motion.div
								animate={{ opacity: 1, scale: 1 }}
								className="flex h-full min-h-70 flex-col items-center justify-center gap-3 rounded-lg border border-accent/20 bg-surface p-6 text-center"
								initial={{ opacity: 0, scale: 0.97 }}
							>
								<CheckCircle2 className="text-success" size={32} />
								<div>
									<p className="mb-1 font-semibold text-sm">Almost there!</p>
									<p className="text-text-secondary text-xs">
										Your email client should have opened with your message
										pre-filled — hit send there to reach me directly.
									</p>
								</div>
							</motion.div>
						) : (
							<form
								className="space-y-4 rounded-lg border border-border bg-surface p-5"
								onSubmit={handleSubmit}
							>
								<div className="space-y-1.5">
									<label
										className="font-medium text-[11px] text-text-secondary"
										htmlFor="name"
									>
										Name <span className="text-accent">*</span>
									</label>
									<Input
										id="name"
										onChange={(e) =>
											setFormData((d) => ({ ...d, name: e.target.value }))
										}
										placeholder="Your name"
										required
										value={formData.name}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-[11px] text-text-secondary"
										htmlFor="email"
									>
										Email <span className="text-accent">*</span>
									</label>
									<Input
										id="email"
										onChange={(e) =>
											setFormData((d) => ({ ...d, email: e.target.value }))
										}
										placeholder="you@example.com"
										required
										type="email"
										value={formData.email}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-[11px] text-text-secondary"
										htmlFor="message"
									>
										Message <span className="text-accent">*</span>
									</label>
									<Textarea
										className="min-h-30"
										id="message"
										onChange={(e) =>
											setFormData((d) => ({ ...d, message: e.target.value }))
										}
										placeholder="Tell me about your project or opportunity..."
										required
										value={formData.message}
									/>
								</div>

								<Button className="w-full" size="sm" type="submit">
									<Send size={13} />
									Send message
								</Button>
							</form>
						)}
					</AnimatedSection>
				</div>
			</div>
		</div>
	);
}
