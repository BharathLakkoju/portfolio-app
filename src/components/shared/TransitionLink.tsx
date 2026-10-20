"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { useNavigate } from "~/components/providers/NavigationProvider";

type TransitionLinkProps = ComponentPropsWithoutRef<typeof NextLink>;

/**
 * Drop-in replacement for Next.js `Link`. Internal navigations run through the
 * View Transitions API; external links, hash links and modified clicks behave
 * normally.
 */
export const TransitionLink = forwardRef<
	HTMLAnchorElement,
	TransitionLinkProps
>(function TransitionLink({ href, onClick, children, ...props }, ref) {
	const navigate = useNavigate();
	const pathname = usePathname();

	const hrefStr =
		typeof href === "string" ? href : (href.pathname ?? "").toString();
	const isInternal = hrefStr.startsWith("/") && !hrefStr.startsWith("//");

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
		onClick?.(e);
		if (e.defaultPrevented) return;
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
			return;
		if (!isInternal || props.target === "_blank") return;
		const targetPath = hrefStr.split("?")[0]?.split("#")[0] ?? hrefStr;
		if (targetPath === pathname) return;
		e.preventDefault();
		navigate(hrefStr);
	}

	return (
		<NextLink href={href} onClick={handleClick} ref={ref} {...props}>
			{children}
		</NextLink>
	);
});
