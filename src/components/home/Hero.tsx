"use client";

import {
	type AnimationPlaybackControls,
	motion,
	stagger,
	useAnimate,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { GithubIcon, LinkedinIcon, XIcon } from "~/components/shared/Icons";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { useReducedMotion } from "~/hooks/use-media-query";
import { profile, site } from "~/lib/data";
import type { LatestCommit } from "~/lib/github";
import { ease } from "~/lib/motion";
import { cn } from "~/lib/utils";
import { RoleRotator } from "./RoleRotator";
import { SignalFigure } from "./SignalFigure";
import { StatusStrip } from "./StatusStrip";

const COMMAND = "whoami";

/**
 * Boot sequence for the first home visit of a session (html.boot is set by the
 * inline script in layout.tsx). Any click or key press skips to the end.
 */
function useBootSequence() {
	const [scope, animate] = useAnimate<HTMLElement>();
	const [typed, setTyped] = useState("");
	const [ready, setReady] = useState(false);

	useLayoutEffect(() => {
		const root = document.documentElement;
		const finish = () => {
			root.classList.remove("boot");
			try {
				sessionStorage.setItem("boot-seen", "1");
			} catch {}
			setReady(true);
		};

		if (!root.classList.contains("boot") || performance.now() > 1500) {
			finish();
			return;
		}

		const k = window.matchMedia("(max-width: 767px)").matches ? 0.7 : 1;
		const timers = COMMAND.split("").map((_, i) =>
			window.setTimeout(
				() => setTyped(COMMAND.slice(0, i + 1)),
				(100 + i * 80) * k,
			),
		);
		const rise = { opacity: [0, 1], y: [16, 0] };
		const chrome = document.querySelectorAll<HTMLElement>(
			'[data-boot="chrome"]',
		);
		const controls: AnimationPlaybackControls[] = [
			animate(
				"[data-boot-cmd]",
				{ opacity: [1, 0] },
				{ duration: 0.15, delay: 0.65 * k },
			),
			animate(
				'[data-boot="name"]',
				{
					opacity: [0, 1],
					filter: ["blur(8px)", "blur(0px)"],
					letterSpacing: ["0.08em", "-0.02em"],
				},
				{ duration: 0.6 * k, delay: 0.65 * k, ease: ease.out },
			),
			animate('[data-boot="rotator"], [data-boot="role"]', rise, {
				duration: 0.5,
				delay: stagger(0.04, { startDelay: 0.8 * k }),
				ease: ease.out,
			}),
			animate('[data-boot="cta"]', rise, {
				duration: 0.5,
				delay: stagger(0.06, { startDelay: 0.95 * k }),
				ease: ease.out,
			}),
			animate(
				'[data-boot="aux"]',
				{ opacity: [0, 1] },
				{ duration: 0.25, delay: 1.1 * k },
			),
		];
		if (chrome.length) {
			controls.push(
				animate(
					chrome,
					{ opacity: [0, 1] },
					{ duration: 0.25, delay: 1.1 * k },
				),
			);
		}

		let skipped = false;
		const skip = () => {
			if (skipped) return;
			skipped = true;
			for (const t of timers) window.clearTimeout(t);
			setTyped(COMMAND);
			for (const c of controls) c.complete();
		};
		window.addEventListener("pointerdown", skip, { once: true });
		window.addEventListener("keydown", skip, { once: true });

		Promise.all(controls.map((c) => c.finished)).then(finish, finish);

		return () => {
			for (const t of timers) window.clearTimeout(t);
			window.removeEventListener("pointerdown", skip);
			window.removeEventListener("keydown", skip);
		};
	}, [animate]);

	return { scope, typed, ready };
}

export function Hero({ commit }: { commit: LatestCommit | null }) {
	const { scope, typed, ready } = useBootSequence();
	const reduce = useReducedMotion();
	const { scrollY } = useScroll();
	const figureY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 90]);
	const glowY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 220]);
	const textY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -40]);
	const [rotate, setRotate] = useState(false);

	useEffect(() => {
		if (!ready) return;
		const t = window.setTimeout(() => setRotate(true), 1200);
		return () => window.clearTimeout(t);
	}, [ready]);

	return (
		<section
			aria-labelledby="hero-name"
			className="relative isolate overflow-hidden"
			ref={scope}
		>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{ y: glowY }}
			>
				<div className="absolute -top-48 left-[-10%] size-[640px] animate-drift rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_62%)]" />
				<div className="absolute top-[20%] right-[-15%] size-[560px] animate-drift-slow rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_60%)] opacity-70" />
			</motion.div>

			<div className="container-page grid-page min-h-[calc(100svh-var(--header-h))] content-center gap-y-8 py-8 lg:items-center lg:py-16">
				<motion.div
					className="flex flex-col gap-5 lg:col-span-7"
					style={{ y: textY }}
				>
					<Link
						className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1 pr-3 pl-2.5 backdrop-blur-sm transition-colors duration-150 hover:border-border-strong"
						data-boot="role"
						href="/contact"
					>
						<span className="relative grid size-2 place-items-center">
							{profile.openToWork && (
								<span className="absolute inset-0 animate-halo rounded-full bg-status-live" />
							)}
							<span
								className={cn(
									"relative size-2 rounded-full",
									profile.openToWork ? "bg-status-live" : "bg-fg-muted",
								)}
							/>
						</span>
						<span className="label-mono text-fg-secondary group-hover:text-fg">
							{profile.availability}
						</span>
					</Link>

					<div className="relative">
						<div
							aria-hidden
							className="boot-cmd absolute inset-0 items-center font-mono text-[clamp(1.25rem,1rem+1.5vw,2rem)] text-fg-secondary"
							data-boot-cmd
						>
							<span className="text-accent">&gt;</span>&nbsp;{typed}
							<span className="ml-1 inline-block h-[1.1em] w-[0.6em] animate-caret bg-accent" />
						</div>
						<h1
							className="font-display text-display text-fg tracking-[-0.02em]"
							data-boot="name"
							id="hero-name"
						>
							{profile.name}
						</h1>
					</div>

					<div className="-mt-2">
						<RoleRotator start={rotate} />
					</div>

					<p className="text-fg-secondary text-sm" data-boot="role">
						{profile.roleLine} · {profile.location}
						<span className="block text-fg-muted lg:inline">
							<span aria-hidden className="mx-1.5 hidden lg:inline">
								·
							</span>
							{profile.workMode}
						</span>
					</p>

					<p
						className="max-w-[56ch] text-body-lg text-fg-secondary"
						data-boot="role"
					>
						{profile.bio}
					</p>

					<div className="flex flex-wrap items-center gap-2" data-boot="role">
						<span className="label-mono mr-1 text-fg-muted">Seeking</span>
						{profile.targetRoles.map((role) => (
							<Badge key={role} variant="accent">
								{role}
							</Badge>
						))}
					</div>

					<div className="flex flex-wrap gap-3">
						<Button asChild data-boot="cta" id="hero-cta" size="lg">
							<a download={site.resumeFile} href={site.resume}>
								<Download aria-hidden size={16} />
								Download resume
								<span className="sr-only"> (PDF)</span>
							</a>
						</Button>
						<Button asChild data-boot="cta" size="lg" variant="secondary">
							<Link className="group" href="/contact">
								Contact me
								<ArrowRight
									aria-hidden
									className="transition-transform duration-150 group-hover:translate-x-0.5"
									size={16}
								/>
							</Link>
						</Button>
					</div>

					<div className="flex flex-col gap-3">
						<ul className="-ml-3 flex flex-wrap items-center" data-boot="aux">
							{[
								{
									href: profile.github,
									label: "GitHub",
									Icon: GithubIcon,
									ext: true,
								},
								{
									href: profile.linkedin,
									label: "LinkedIn",
									Icon: LinkedinIcon,
									ext: true,
								},
								{
									href: profile.twitter,
									label: "X",
									Icon: XIcon,
									ext: true,
								},
								{
									href: `mailto:${profile.email}`,
									label: "Email",
									Icon: Mail,
									ext: false,
								},
							].map(({ href, label, Icon, ext }) => (
								<li key={label}>
									<a
										aria-label={ext ? `${label} (opens in new tab)` : label}
										className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 text-fg-secondary text-sm transition-colors duration-150 hover:text-fg"
										href={href}
										{...(ext ? { target: "_blank", rel: "noopener" } : {})}
									>
										<Icon aria-hidden size={16} />
										<span className="hidden lg:inline">{label}</span>
									</a>
								</li>
							))}
						</ul>
						<StatusStrip commit={commit} />
					</div>
				</motion.div>

				<motion.div
					className="-order-1 lg:order-none lg:col-span-5"
					data-boot="aux"
					style={{ y: figureY }}
				>
					<SignalFigure />
				</motion.div>
			</div>
		</section>
	);
}
