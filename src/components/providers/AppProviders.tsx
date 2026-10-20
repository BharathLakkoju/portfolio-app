"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import {
	type PalettePost,
	PaletteProvider,
} from "~/components/palette/PaletteProvider";
import { NavigationProvider } from "./NavigationProvider";
import { ToastProvider } from "./ToastProvider";

export function AppProviders({
	children,
	posts,
}: {
	children: React.ReactNode;
	posts: PalettePost[];
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange
			enableSystem={false}
			storageKey="bl-theme"
		>
			<MotionConfig reducedMotion="user">
				<NavigationProvider>
					<ToastProvider>
						<PaletteProvider posts={posts}>{children}</PaletteProvider>
					</ToastProvider>
				</NavigationProvider>
			</MotionConfig>
		</ThemeProvider>
	);
}
