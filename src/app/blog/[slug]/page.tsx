import { ArrowLeft, ArrowRight, Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Chip } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { getAllPosts, getAllSlugs, getPostBySlug } from "~/lib/blog";
import { site } from "~/lib/data";
import { formatDate } from "~/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) return {};
	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			tags: post.tags,
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) notFound();

	const posts = getAllPosts();
	const index = posts.findIndex((p) => p.slug === slug);
	const nextPost = posts[index + 1];

	return (
		<article className="container-page pt-10 pb-[var(--space-section)]">
			<div className="max-w-[var(--container-prose)]">
				<Link
					className="-ml-3 inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-fg-secondary text-sm hover:text-fg"
					href="/blog"
				>
					<ArrowLeft aria-hidden size={14} />
					All posts
				</Link>

				<header className="mt-6 mb-10 border-border border-b pb-8">
					<h1 className="text-fg text-h1 tracking-[-0.02em]">{post.title}</h1>
					{post.description && (
						<p className="mt-4 text-body-lg text-fg-secondary">
							{post.description}
						</p>
					)}
					<p className="label-mono mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-fg-muted">
						<time dateTime={post.date}>{formatDate(post.date)}</time>
						<span aria-hidden>·</span>
						<span>{post.readTime} min read</span>
					</p>
					{post.tags.length > 0 && (
						<ul className="mt-4 flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<li key={tag}>
									<Chip>{tag}</Chip>
								</li>
							))}
						</ul>
					)}
				</header>

				<div className="prose prose-site max-w-none prose-pre:rounded-lg prose-headings:font-semibold prose-headings:text-fg prose-headings:tracking-[-0.01em] prose-a:underline-offset-4">
					<MDXRemote source={post.content} />
				</div>

				<footer className="mt-16 flex flex-col gap-6 border-border border-t pt-8">
					{nextPost && (
						<Link
							className="group flex flex-col gap-1 rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong"
							href={`/blog/${nextPost.slug}`}
						>
							<span className="label-mono text-fg-muted">Next post</span>
							<span className="flex items-center gap-2 text-fg text-h3 group-hover:text-accent">
								{nextPost.title}
								<ArrowRight
									aria-hidden
									className="transition-transform group-hover:translate-x-0.5"
									size={16}
								/>
							</span>
						</Link>
					)}
					<div className="flex flex-wrap gap-3">
						<Button asChild>
							<a href={site.resume} rel="noopener" target="_blank">
								<Download aria-hidden size={15} />
								Download resume
								<span className="sr-only"> (PDF, opens in new tab)</span>
							</a>
						</Button>
						<Button asChild variant="secondary">
							<Link href="/contact">
								<Mail aria-hidden size={15} />
								Contact me
							</Link>
						</Button>
					</div>
				</footer>
			</div>
		</article>
	);
}
