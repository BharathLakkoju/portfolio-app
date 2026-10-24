"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "~/hooks/use-media-query";
import { springs } from "~/lib/motion";
import { cn } from "~/lib/utils";

const avatarSrc = "/images/bharath-avatar.jpg";

/**
 * Portrait with a second "blueprint" state: cross-fades on hover or focus with a
 * 3° spring tilt; on touch, a tap swaps it for 1.5s. Both layers use the same
 * file, so the second state never flashes in.
 */
export function SwapAvatar({
	className,
	sizes,
	priority = false,
	rounded = "full",
}: {
	className?: string;
	sizes: string;
	priority?: boolean;
	rounded?: "full" | "lg";
}) {
	const [alt, setAlt] = useState(false);
	const fine = useFinePointer();
	const reduce = useReducedMotion();
	const timer = useRef<number | undefined>(undefined);

	function tap() {
		if (fine) return;
		setAlt(true);
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setAlt(false), 1500);
	}

	return (
		<motion.button
			animate={{ rotate: alt && !reduce ? 3 : 0 }}
			aria-label="Portrait of Bharath Lakkoju. Activate to see the blueprint version."
			aria-pressed={alt}
			className={cn(
				"relative overflow-hidden border border-border-strong bg-white shadow-[var(--shadow-2)]",
				rounded === "full" ? "rounded-full" : "rounded-lg",
				className,
			)}
			onBlur={() => setAlt(false)}
			onClick={tap}
			onFocus={() => setAlt(true)}
			onHoverEnd={() => fine && setAlt(false)}
			onHoverStart={() => fine && setAlt(true)}
			transition={{ type: "spring", ...springs.soft }}
			type="button"
		>
			<Image
				alt=""
				className="object-cover"
				fill
				priority={priority}
				sizes={sizes}
				src={avatarSrc}
			/>
			<Image
				alt=""
				className="object-cover transition-opacity duration-[250ms] ease-standard [filter:invert(1)_sepia(1)_saturate(4)_hue-rotate(150deg)]"
				fill
				sizes={sizes}
				src={avatarSrc}
				style={{ opacity: alt ? 1 : 0 }}
			/>
		</motion.button>
	);
}
