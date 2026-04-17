"use client";

import { type ComponentPropsWithoutRef, forwardRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransitionContext";

type TransitionLinkProps = ComponentPropsWithoutRef<typeof NextLink>;

/**
 * Drop-in replacement for Next.js `Link`.
 * Internal hrefs (starting with "/") trigger the full-screen overlay transition.
 * External hrefs, hash-only links, and modifier-key clicks behave normally.
 */
export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink({ href, onClick, children, ...props }, ref) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const hrefStr =
    typeof href === "string"
      ? href
      : ((href as { pathname?: string }).pathname ?? "");

  const isInternal = hrefStr.startsWith("/") && !hrefStr.startsWith("//");

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e as React.MouseEvent<HTMLAnchorElement>);
    if (e.defaultPrevented) return;
    // Let browser/OS handle modifier-key clicks (open in new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!isInternal) return;

    // Normalise: strip query/hash for same-page check
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
