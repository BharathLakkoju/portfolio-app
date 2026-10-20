import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import {
	IBM_Plex_Mono,
	IBM_Plex_Sans,
	Instrument_Serif,
} from "next/font/google";
import { BackgroundLayers } from "~/components/layout/BackgroundLayers";
import { Footer } from "~/components/layout/Footer";
import { SiteChrome } from "~/components/layout/SiteChrome";
import { AppProviders } from "~/components/providers/AppProviders";
import { getAllPosts } from "~/lib/blog";
import { experience, profile, site } from "~/lib/data";

const plexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	display: "swap",
	variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	display: "swap",
	variable: "--font-plex-mono",
});
const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-instrument-serif",
});

const title = `${profile.name} — AI Engineer & Full Stack Engineer`;
const description = `${profile.bio} Open to AI Engineer, Full-Stack and Applied AI roles. Based in ${profile.location}.`;

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: title, template: `%s | ${profile.name}` },
	description,
	keywords: [
		"AI Engineer",
		"Full Stack Engineer",
		"Applied AI",
		"LangGraph",
		"RAG",
		"Next.js",
		"TypeScript",
		"Hyderabad",
		profile.name,
	],
	authors: [{ name: profile.name }],
	creator: profile.name,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: site.url,
		title,
		description,
		siteName: profile.name,
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		site: profile.twitterHandle,
		creator: profile.twitterHandle,
	},
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
};

/**
 * Runs before first paint. Marks the first home visit of a session so the hero
 * can play its boot sequence without a flash of the final state; the class is
 * removed after 3s regardless, so a slow or failed hydration never hides text.
 */
const bootScript = `(function(){try{var d=document.documentElement;if(location.pathname!=="/")return;if(sessionStorage.getItem("boot-seen"))return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("boot");setTimeout(function(){d.classList.remove("boot")},3000)}catch(e){}})();`;

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	url: site.url,
	email: `mailto:${profile.email}`,
	jobTitle: experience[0]?.title,
	worksFor: { "@type": "Organization", name: profile.company },
	address: {
		"@type": "PostalAddress",
		addressLocality: "Hyderabad",
		addressRegion: "Telangana",
		addressCountry: "IN",
	},
	sameAs: [profile.github, profile.linkedin, profile.twitter],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const posts = getAllPosts().map(({ slug, title }) => ({ slug, title }));

	return (
		<html
			className={`${plexSans.variable} ${plexMono.variable} ${instrumentSerif.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static pre-paint script */}
				<script dangerouslySetInnerHTML={{ __html: bootScript }} />
				<noscript>
					<style>
						{
							"[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}"
						}
					</style>
				</noscript>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
					type="application/ld+json"
				/>
			</head>
			<body className="min-h-screen bg-bg text-fg antialiased">
				<AppProviders posts={posts}>
					<a
						className="sr-only fixed top-2 left-2 z-[var(--z-skip-link)] rounded-md bg-accent-solid px-4 py-3 font-medium text-on-accent text-sm focus:not-sr-only"
						href="#main"
					>
						Skip to content
					</a>
					<BackgroundLayers />
					<div className="relative flex min-h-screen flex-col">
						<SiteChrome />
						<main
							className="flex-1 pt-[var(--header-h)]"
							id="main"
							tabIndex={-1}
						>
							{children}
						</main>
						<Footer />
					</div>
				</AppProviders>
			</body>
		</html>
	);
}
