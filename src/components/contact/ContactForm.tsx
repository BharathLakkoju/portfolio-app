"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { type FormEvent, useId, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { profile } from "~/lib/data";
import { duration, ease } from "~/lib/motion";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
	const errors: Errors = {};
	if (!f.name.trim()) errors.name = "Add your name so I know who's writing.";
	if (!f.email.trim()) errors.email = "Add an email so I can reply.";
	else if (!EMAIL_RE.test(f.email.trim()))
		errors.email =
			"That email looks incomplete. Check for a missing @ or domain.";
	if (f.message.trim().length < 10)
		errors.message = "Add a few more words about the role or project.";
	return errors;
}

export function ContactForm() {
	const id = useId();
	const formRef = useRef<HTMLFormElement>(null);
	const [fields, setFields] = useState<Fields>({
		name: "",
		email: "",
		message: "",
	});
	const [touched, setTouched] = useState<
		Partial<Record<keyof Fields, boolean>>
	>({});
	const [sent, setSent] = useState(false);

	const errors = validate(fields);
	const visibleError = (k: keyof Fields) =>
		touched[k] ? errors[k] : undefined;

	function update(k: keyof Fields, v: string) {
		setFields((f) => ({ ...f, [k]: v }));
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		setTouched({ name: true, email: true, message: true });
		const first = (Object.keys(errors) as (keyof Fields)[])[0];
		if (first) {
			formRef.current
				?.querySelector<HTMLElement>(`#${CSS.escape(`${id}-${first}`)}`)
				?.focus();
			return;
		}
		const subject = encodeURIComponent(
			`Portfolio contact from ${fields.name.trim()}`,
		);
		const body = encodeURIComponent(
			`${fields.message.trim()}\n\n${fields.name.trim()} (${fields.email.trim()})`,
		);
		window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
		setSent(true);
	}

	function field(
		k: keyof Fields,
		label: string,
		control: (p: {
			id: string;
			"aria-invalid": boolean;
			"aria-describedby"?: string;
			value: string;
			onBlur: () => void;
		}) => React.ReactNode,
	) {
		const err = visibleError(k);
		const fid = `${id}-${k}`;
		return (
			<div className="flex flex-col gap-1.5">
				<label className="font-medium text-fg-secondary text-sm" htmlFor={fid}>
					{label}
				</label>
				{control({
					id: fid,
					"aria-invalid": Boolean(err),
					"aria-describedby": err ? `${fid}-error` : undefined,
					value: fields[k],
					onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
				})}
				<AnimatePresence initial={false}>
					{err && (
						<motion.p
							animate={{ opacity: 1, height: "auto" }}
							className="overflow-hidden text-danger text-sm"
							exit={{ opacity: 0, height: 0 }}
							id={`${fid}-error`}
							initial={{ opacity: 0, height: 0 }}
							transition={{ duration: duration.micro, ease: ease.standard }}
						>
							{err}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		);
	}

	return (
		<div className="relative rounded-lg border border-border bg-surface p-6 md:p-8">
			<AnimatePresence initial={false} mode="wait">
				{sent ? (
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						className="flex min-h-80 flex-col items-center justify-center gap-4 text-center"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0, scale: 0.96 }}
						key="sent"
						role="status"
						transition={{ duration: duration.ui, ease: ease.out }}
					>
						<CheckCircle2 aria-hidden className="text-success" size={32} />
						<div>
							<p className="text-fg text-h3">Your email app should be open</p>
							<p className="mt-2 max-w-sm text-fg-secondary text-sm">
								The message is pre-filled. Hit send there and it lands in my
								inbox. If nothing opened, email {profile.email} directly.
							</p>
						</div>
						<Button onClick={() => setSent(false)} size="sm" variant="ghost">
							Edit message
						</Button>
					</motion.div>
				) : (
					<motion.form
						animate={{ opacity: 1 }}
						className="flex flex-col gap-5"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						key="form"
						noValidate
						onSubmit={onSubmit}
						ref={formRef}
						transition={{ duration: duration.micro }}
					>
						<div className="grid gap-5 sm:grid-cols-2">
							{field("name", "Name", (p) => (
								<Input
									autoComplete="name"
									onChange={(e) => update("name", e.target.value)}
									{...p}
								/>
							))}
							{field("email", "Email", (p) => (
								<Input
									autoComplete="email"
									inputMode="email"
									onChange={(e) => update("email", e.target.value)}
									placeholder="you@company.com"
									type="email"
									{...p}
								/>
							))}
						</div>
						{field("message", "Message", (p) => (
							<Textarea
								onChange={(e) => update("message", e.target.value)}
								placeholder="The role, the team, or the problem you're solving."
								{...p}
							/>
						))}
						<div className="flex flex-wrap items-center justify-between gap-3">
							<p className="text-fg-muted text-sm">
								Opens your email app with this pre-filled.
							</p>
							<Button type="submit">
								<Send aria-hidden size={15} />
								Send message
							</Button>
						</div>
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	);
}
