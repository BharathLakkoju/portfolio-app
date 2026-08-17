import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageTransitionProvider } from "~/components/shared/PageTransitionContext";
import { ThemeProvider } from "~/components/shared/ThemeProvider";
import { profile } from "~/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — AI Engineer & Full Stack Engineer`,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "AI Engineer",
    "Full Stack Engineer",
    "LangChain",
    "LangGraph",
    "React",
    "Next.js",
    "TypeScript",
    "Hyderabad",
    "Bharath Lakkoju",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bharath-lakkoju-portfolio.vercel.app",
    title: `${profile.name} — AI Engineer & Full Stack Engineer`,
    description: profile.bio,
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer & Full Stack Engineer`,
    description: profile.bio,
    creator: "@bharathlakkoju",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PageTransitionProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
