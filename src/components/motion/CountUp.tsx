"use client";

import {
	motion,
	useInView,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "~/hooks/use-media-query";
import { springs } from "~/lib/motion";

/**
 * Counts from 0 to `value` with the soft spring once the number is 40% in view.
 * The final value is server-rendered for crawlers and assistive tech.
 */
export function CountUp({
	value,
	suffix = "",
	className,
}: {
	value: number;
	suffix?: string;
	className?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.4 });
	const reduce = useReducedMotion();
	const target = useMotionValue(value);
	const spring = useSpring(target, springs.soft);
	const text = useTransform(spring, (v) => Math.round(v).toString());

	useEffect(() => {
		const el = ref.current;
		if (reduce || !el) return;
		if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
		target.jump(0);
		spring.jump(0);
	}, [reduce, target, spring]);

	useEffect(() => {
		if (inView) target.set(value);
	}, [inView, target, value]);

	return (
		<span className={className} ref={ref}>
			<span className="sr-only">
				{value}
				{suffix}
			</span>
			<motion.span aria-hidden className="tabular-nums">
				{text}
			</motion.span>
		</span>
	);
}
