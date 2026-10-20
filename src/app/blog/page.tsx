import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Stagger, StaggerItem } from "~/components/motion/Reveal";
import { SectionHeader } from "~/components/motion/SectionHeader";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { getAllPosts } from "~/lib/blog";
import { formatDate } from "~/lib/utils";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Notes on AI engineering, system design and full-stack development.",
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<div className="container-page pt-12 pb-[var(--space-section)]">
			<SectionHeader
				as="h1"
				description="Notes on AI engineering, system design and full-stack development."
				label="Blog"
				title="Writing"
			/>
			<p className="label-mono -mt-4 mb-8 text-fg-muted">
				{posts.length} {posts.length === 1 ? "post" : "posts"}
			</p>

			<div className="grid-page">
				<Stagger as="ul" className="border-border border-t lg:col-span-8">
					{posts.map((post, i) => (
						<StaggerItem
							as="li"
							className="border-border border-b"
							index={i}
							key={post.slug}
						>
							<Link
								className="group relative grid gap-1 py-5 transition-colors md:grid-cols-[9rem_1fr_auto] md:gap-6"
								href={`/blog/${post.slug}`}
							>
								<time
									className="label-mono pt-1 text-fg-muted tabular-nums"
									dateTime={post.date}
								>
									{formatDate(post.date)}
								</time>
								<span>
									<span className="block text-fg text-h3 transition-colors duration-150 group-hover:text-accent">
										{post.title}
									</span>
									{post.description && (
										<span className="mt-1 line-clamp-2 block text-fg-secondary text-sm">
											{post.description}
										</span>
									)}
								</span>
								<span className="label-mono flex items-center gap-2 pt-1 text-fg-muted">
									{post.readTime} min
									<ArrowRight
										aria-hidden
										className="-translate-x-1 opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-x-0 group-hover:opacity-100"
										size={14}
									/>
								</span>
							</Link>
						</StaggerItem>
					))}
				</Stagger>
			</div>
			{posts.length < 3 && (
				<p className="mt-6 text-fg-secondary text-sm">
					More writing soon. Follow on LinkedIn for updates.
				</p>
			)}
		</div>
	);
}
