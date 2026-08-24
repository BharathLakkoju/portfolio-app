"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "~/components/shared/ThemeToggle";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
	{ href: "/blog", label: "Blog" },
	{ href: "/contact", label: "Contact" },
];

export function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<header
			className={cn(
				"fixed top-0 z-50 w-full transition-all duration-200",
				scrolled
					? "border-border border-b bg-background/90 backdrop-blur-sm"
					: "bg-transparent",
			)}
		>
			<div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
				{/* Logo */}
				<Link
					aria-label="Bharath Lakkoju — Home"
					className="font-semibold text-sm text-text-primary transition-colors hover:text-text-secondary"
					href="/"
				>
					<Image
						alt="Bharath Lakkoju"
						className="h-8 w-8"
						height={32}
						src="/favicon.ico"
						width={32}
					/>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden items-center gap-0 md:flex">
					{navLinks.map((link) => {
						const isActive =
							link.href === "/"
								? pathname === "/"
								: pathname.startsWith(link.href);
						return (
							<Link
								className={cn(
									"px-3 py-2 text-sm transition-colors duration-150",
									isActive
										? "text-text-primary"
										: "text-text-muted hover:text-text-primary",
								)}
								href={link.href}
								key={link.href}
							>
								{link.label}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<Button
						asChild
						className="hidden sm:inline-flex"
						size="sm"
						variant="outline"
					>
						<a
							download
							href="/resume.pdf"
							rel="noopener noreferrer"
							target="_blank"
						>
							<Download size={13} />
							Resume
						</a>
					</Button>
					<ThemeToggle />

					{/* Mobile hamburger */}
					<button
						aria-expanded={isOpen}
						aria-label="Toggle navigation menu"
						className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-primary md:hidden"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <X size={16} /> : <Menu size={16} />}
					</button>
				</div>
			</div>

			{/* Mobile dropdown */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="border-border border-t bg-background md:hidden"
						exit={{ opacity: 0, y: -6 }}
						initial={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.15 }}
					>
						<nav className="flex flex-col p-3">
							{navLinks.map((link) => {
								const isActive =
									link.href === "/"
										? pathname === "/"
										: pathname.startsWith(link.href);
								return (
									<Link
										className={cn(
											"rounded-md px-3 py-2.5 text-sm transition-colors",
											isActive
												? "text-text-primary"
												: "text-text-muted hover:text-text-primary",
										)}
										href={link.href}
										key={link.href}
									>
										{link.label}
									</Link>
								);
							})}
							<a
								className="flex items-center gap-1.5 rounded-md px-3 py-2.5 text-sm text-text-muted transition-colors hover:text-text-primary"
								download
								href="/resume.pdf"
								rel="noopener noreferrer"
								target="_blank"
							>
								<Download size={13} />
								Resume
							</a>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
