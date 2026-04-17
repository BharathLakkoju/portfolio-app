import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "~/lib/blog";
import { formatDate } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <div className="pt-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <AnimatedSection className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </Button>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection delay={0.1}>
          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold leading-tight mb-4 sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-5 text-sm text-[var(--color-text-muted)] border-y border-[var(--color-border)] py-4 mb-10">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>
        </AnimatedSection>

        {/* MDX Content */}
        <AnimatedSection delay={0.2}>
          <div
            className="prose prose-invert prose-zinc max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--color-text-primary)]
            prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed
            prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--color-text-primary)] prose-strong:font-semibold
            prose-code:font-mono prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-[var(--color-border)] prose-code:text-sm
            prose-pre:bg-[var(--color-surface)] prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:rounded-xl
            prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:text-[var(--color-text-muted)]
            prose-hr:border-[var(--color-border)]
            prose-ul:text-[var(--color-text-muted)] prose-ol:text-[var(--color-text-muted)]
            prose-li:marker:text-[var(--color-accent)]
          "
          >
            <MDXRemote source={post.content} />
          </div>
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection
          delay={0.3}
          className="mt-16 border-t border-[var(--color-border)] pt-8"
        >
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft size={16} />
              All posts
            </Link>
          </Button>
        </AnimatedSection>
      </article>
    </div>
  );
}
